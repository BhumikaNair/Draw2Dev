"use client";
import Constants from "@/data/Constants";
import { Loader2, Download, Eye, RefreshCcw, Code2 } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import CodeEditor from "../_components/CodeEditor";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export interface RECORD {
  id: number;
  description: string;
  code: any;
  imageUrl: string;
  model: string;
  createdBy: string;
  uid: string;
}

function ViewCode() {
  const { uid } = useParams();
  const [loading, setLoading] = useState(false);
  const [codeResp, setCodeResp] = useState("");
  const [record, setRecord] = useState<RECORD | null>();
  const [isReady, setIsReady] = useState(false);
  const [showPreview, setShowPreview] = useState(true);

  const downloadCode = () => {
    const element = document.createElement("a");
    const file = new Blob([codeResp], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `${record?.uid || "code"}.jsx`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  useEffect(() => {
    if (typeof window !== undefined) {
      uid && GetRecordInfo();
    }
  }, [uid]);

  const GetRecordInfo = async (regen = false) => {
    setIsReady(false);
    setCodeResp("");
    setLoading(true);
    const stored = JSON.parse(sessionStorage.getItem("w2c-records") || "[]");
    const rec = stored.find((r: any) => r.uid === uid);
    setRecord(rec);
    if (rec) {
      GenerateCode(rec);
    } else {
      setLoading(false);
    }
  };

  const GenerateCode = async (record: RECORD) => {
    setLoading(true);
    const res = await fetch("/api/ai-model", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        description: record?.description + ":" + Constants.PROMPT,
        model: record.model,
        imageUrl: record?.imageUrl,
      }),
    });

    if (!res.body) return;
    setLoading(false);
    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const text = decoder
        .decode(value)
        .replace("```jsx", "")
        .replace("```javascript", "")
        .replace("javascript", "")
        .replace("jsx", "")
        .replace("```", "");
      setCodeResp((prev) => prev + text);
    }

    setIsReady(true);
  };

  return (
    <div className="min-h-screen bg-[#F8F4EC]">
      {/* Header */}
      <div className="bg-white/50 backdrop-blur-sm border-b border-[#FF8FB7]/20 px-4 sm:px-6 lg:px-8 py-2 sm:py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 sm:gap-3">
            <Image
              src="/title.svg"
              alt="Draw2Dev"
              width={120}
              height={40}
              className="h-8 sm:h-10 w-auto"
            />
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            <Button
              onClick={downloadCode}
              disabled={!isReady || !codeResp}
              variant="outline"
              size="sm"
              className="border-[#FF8FB7]/40 hover:bg-[#FF8FB7]/10 hover:border-[#E83C91]"
            >
              <Download className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Download</span>
            </Button>
            <Button
              onClick={() => GetRecordInfo(true)}
              disabled={!isReady || loading}
              variant="outline"
              size="sm"
              className="border-[#FF8FB7]/40 hover:bg-[#FF8FB7]/10 hover:border-[#E83C91]"
            >
              <RefreshCcw className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Regenerate</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-3 sm:p-4 lg:p-5">
        {loading ? (
          <div className="flex items-center justify-center min-h-[70vh]">
            <div className="text-center">
              <Loader2 className="w-16 h-16 animate-spin text-[#E83C91] mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-[#43334C] mb-2">
                Analyzing Wireframe...
              </h2>
              <p className="text-[#43334C]/60">
                AI is generating your production-ready code
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Wireframe Preview - Left Side */}
            <div className="lg:col-span-3">
              <div className="sticky top-3 space-y-3">
                <div className="bg-white/50 backdrop-blur-sm border-2 border-[#FF8FB7]/40 rounded-2xl p-4">
                  <h3 className="font-bold text-lg text-[#43334C] mb-3">
                    Original Wireframe
                  </h3>
                  {record?.imageUrl && (
                    <Image
                      src={record.imageUrl}
                      alt="Wireframe"
                      width={300}
                      height={400}
                      className="rounded-lg object-contain w-full border-2 border-dashed border-[#FF8FB7]/30 p-2 bg-white"
                    />
                  )}
                  <div className="mt-3 space-y-2">
                    <div>
                      <p className="text-xs font-semibold text-[#43334C]/60 mb-1">
                        AI Model
                      </p>
                      <p className="text-sm text-[#43334C] font-medium">
                        {record?.model || "Gemini 2.0 Flash"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[#43334C]/60 mb-1">
                        Description
                      </p>
                      <p className="text-sm text-[#43334C] line-clamp-3">
                        {record?.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Code Editor - Right Side */}
            <div className="lg:col-span-9">
              <div className="bg-white/50 backdrop-blur-sm border-2 border-[#FF8FB7]/40 rounded-2xl overflow-hidden">
                {/* Toggle Buttons */}
                <div className="flex items-center gap-2 p-3 border-b border-[#FF8FB7]/20 bg-white/70">
                  <button
                    onClick={() => setShowPreview(true)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                      showPreview
                        ? "bg-gradient-to-r from-[#FF8FB7] to-[#E83C91] text-white shadow-lg"
                        : "text-[#43334C] hover:bg-white/50"
                    }`}
                  >
                    <Eye className="w-4 h-4" />
                    Preview
                  </button>
                  <button
                    onClick={() => setShowPreview(false)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                      !showPreview
                        ? "bg-gradient-to-r from-[#FF8FB7] to-[#E83C91] text-white shadow-lg"
                        : "text-[#43334C] hover:bg-white/50"
                    }`}
                  >
                    <Code2 className="w-4 h-4" />
                    Code
                  </button>
                </div>

                {/* Code Display */}
                <div className="p-3">
                  <CodeEditor
                    codeResp={codeResp}
                    isReady={isReady}
                    showPreview={showPreview}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ViewCode;
