import { NextRequest } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import path from "node:path";
import fs from "node:fs";

export const runtime = "nodejs";
export const maxDuration = 300;

function getMimeTypeFromPath(p: string) {
  const ext = path.extname(p).toLowerCase();
  if (ext === ".jpg" || ext === ".jpeg") return "image/jpeg";
  if (ext === ".webp") return "image/webp";
  if (ext === ".gif") return "image/gif";
  return "image/png";
}

export async function POST(req: NextRequest) {
  const { description, imageUrl } = await req.json();

  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    return new Response("Missing GOOGLE_API_KEY in environment", {
      status: 500,
    });
  }

  // Resolve image path on disk if it's a local upload URL
  let imagePart: any = null;
  try {
    if (typeof imageUrl === "string" && imageUrl.startsWith("/")) {
      const absPath = path.join(
        process.cwd(),
        "public",
        imageUrl.replace(/^\//, "")
      );
      const fileBytes = fs.readFileSync(absPath);
      const b64 = fileBytes.toString("base64");
      const mimeType = getMimeTypeFromPath(absPath);
      imagePart = { inlineData: { data: b64, mimeType } };
    } else if (typeof imageUrl === "string") {
      // Fallback: external URL not supported without Google file API; ignore image.
      imagePart = null;
    }
  } catch (e) {
    console.warn("Failed to read local image:", e);
    imagePart = null;
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-001" });

  const inputParts = imagePart ? [description, imagePart] : [description];

  const result = await model.generateContentStream(inputParts as any);

  const stream = new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of result.stream) {
          const text = chunk.text();
          if (text) controller.enqueue(new TextEncoder().encode(text));
        }
        controller.close();
      } catch (err) {
        console.error("Gemini stream error:", err);
        controller.error(err);
      }
    },
  });

  return new Response(stream, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
