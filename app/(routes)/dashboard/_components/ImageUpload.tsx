"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CloudUpload, Loader2Icon, WandSparkles, X } from "lucide-react";
import Image from "next/image";
//@ts-ignore
import uuid4 from "uuid4";
import React, { ChangeEvent, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { useAuthContext } from "@/app/provider";
import { useRouter } from "next/navigation";
import Constants from "@/data/Constants";
import { toast } from "sonner";
function ImageUpload() {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [file, setFile] = useState<any>();
  const [model, setModel] = useState<string>("gemini-2.0-flash-001");
  const [description, setDescription] = useState<string>("");
  const { user } = useAuthContext();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const isFormValid = file && model && description.trim().length > 0;

  const OnImageSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const file = files[0];
      setFile(file);

      // Create preview URL for display
      const imageUrl = URL.createObjectURL(file);
      setPreviewUrl(imageUrl);
    }
  };

  const OnConverToCodeButtonClick = async () => {
    if (!file || !model || !description) {
      toast("Please select an image, model, and provide a description");
      return;
    }
    setLoading(true);
    try {
      // Convert image to base64 instead of uploading to server
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result as string;
        const uid = uuid4();

        // Store record locally with base64 image
        const record = {
          uid,
          description,
          imageUrl: base64Image,
          model,
          email: user?.email,
        };
        const existing = JSON.parse(
          sessionStorage.getItem("w2c-records") || "[]"
        );
        existing.push(record);
        sessionStorage.setItem("w2c-records", JSON.stringify(existing));
        setLoading(false);
        router.push("/view-code/" + uid);
      };
      reader.onerror = () => {
        toast("Failed to process image");
        setLoading(false);
      };
      reader.readAsDataURL(file);
    } catch (e) {
      console.error(e);
      toast("Unexpected error");
      setLoading(false);
    }
  };

  return (
    <div className="mt-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        {!previewUrl ? (
          <div className="p-8 sm:p-10 border-2 border-dashed border-[#FF8FB7]/40 rounded-2xl bg-white/50 backdrop-blur-sm flex flex-col items-center justify-center min-h-[350px] transition-all hover:border-[#E83C91]/60 hover:bg-white/70">
            <CloudUpload className="h-16 w-16 text-[#E83C91] mb-4" />
            <h2 className="font-bold text-xl text-[#43334C] mb-2">
              Upload Wireframe
            </h2>
            <p className="text-[#43334C]/60 text-center mb-6">
              Click below to select your wireframe image
            </p>
            <label htmlFor="imageSelect" className="cursor-pointer">
              <div className="px-8 py-3 bg-gradient-to-r from-[#FF8FB7] to-[#E83C91] hover:from-[#E83C91] hover:to-[#43334C] text-white font-semibold rounded-lg transition-all shadow-lg hover:shadow-xl">
                Select Image
              </div>
            </label>
            <input
              type="file"
              id="imageSelect"
              className="hidden"
              multiple={false}
              accept="image/*"
              onChange={OnImageSelect}
            />
          </div>
        ) : (
          <div className="relative p-6 border-2 border-[#FF8FB7]/40 rounded-2xl bg-white/50 backdrop-blur-sm">
            <button
              onClick={() => setPreviewUrl(null)}
              className="absolute top-3 right-3 z-10 p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all hover:scale-110"
              aria-label="Remove image"
            >
              <X className="w-5 h-5 text-[#E83C91]" />
            </button>
            <Image
              src={previewUrl}
              alt="preview"
              width={500}
              height={500}
              className="w-full h-[300px] object-contain rounded-lg"
            />
          </div>
        )}

        <div className="p-8 sm:p-10 border-2 border-[#FF8FB7]/40 rounded-2xl bg-white/50 backdrop-blur-sm space-y-6">
          <div>
            <h3 className="font-bold text-lg text-[#43334C] mb-3">
              Select AI Model
            </h3>
            <Select
              onValueChange={(value) => setModel(value)}
              defaultValue="gemini-2.0-flash-001"
            >
              <SelectTrigger className="w-full h-12 border-[#FF8FB7]/40 focus:border-[#E83C91] bg-white/70">
                <SelectValue placeholder="Choose an AI model" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gemini-2.0-flash-001">
                  <div className="flex items-center gap-3">
                    <Image
                      src="/google.png"
                      alt="Gemini 2.0 Flash"
                      width={24}
                      height={24}
                    />
                    <span className="font-medium">Gemini 2.0 Flash</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <h3 className="font-bold text-lg text-[#43334C] mb-3">
              Describe Your Webpage
            </h3>
            <Textarea
              onChange={(event) => setDescription(event?.target.value)}
              value={description}
              className="h-[180px] border-[#FF8FB7]/40 focus:border-[#E83C91] bg-white/70 resize-none"
              placeholder="Describe the purpose and features of your webpage..."
            />
          </div>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-center">
        <Button
          onClick={OnConverToCodeButtonClick}
          disabled={loading || !isFormValid}
          size="lg"
          className="bg-gradient-to-r from-[#FF8FB7] to-[#E83C91] hover:from-[#E83C91] hover:to-[#43334C] text-white shadow-2xl hover:shadow-[#FF8FB7]/50 transition-all duration-300 text-base sm:text-lg px-8 sm:px-10 py-6 h-auto disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2Icon className="w-5 h-5 mr-2 animate-spin" />
              Generating Code...
            </>
          ) : (
            <>
              <WandSparkles className="w-5 h-5 mr-2" />
              Convert to Code
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

export default ImageUpload;
