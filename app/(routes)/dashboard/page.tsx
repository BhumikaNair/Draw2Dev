import React from "react";
import ImageUpload from "./_components/ImageUpload";
import Image from "next/image";
import Link from "next/link";

function Dashboard() {
  return (
    <div className="min-h-screen bg-[#F8F4EC] p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="font-bold text-3xl sm:text-4xl lg:text-5xl mb-3">
            <span className="text-[#43334C]">Transform Your </span>
            <span className="inline-block animate-gradient bg-gradient-to-r from-[#FF8FB7] via-[#E83C91] to-[#43334C] bg-clip-text text-transparent">
              Wireframe
            </span>
          </h2>
          <p className="text-[#43334C]/70 text-sm sm:text-base mb-20">
            Upload your design and let AI generate production-ready code
          </p>
        </div>
        <ImageUpload />
      </div>

      <Link
        href="/"
        className="fixed bottom-6 left-6 flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity"
      >
        <Image
          src="/logo.svg"
          alt="Draw2Dev"
          width={32}
          height={32}
          className="h-8 w-auto"
        />
      </Link>
    </div>
  );
}

export default Dashboard;
