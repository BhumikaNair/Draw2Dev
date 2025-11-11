"use client";
import Image from "next/image";
import Authentication from "./_components/Authentication";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "./provider";
import { Github, Sparkles, Code2, Zap, Palette, LogOut } from "lucide-react";
import Link from "next/link";
import { auth } from "@/configs/firebaseConfig";
import { signOut } from "firebase/auth";
import { CometCard } from "@/components/ui/comet-card";

export default function Home() {
  const user = useAuthContext();

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F4EC] md:h-screen md:overflow-hidden">
      {/* Header */}
      <header className="w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-6 flex-shrink-0">
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

          <div className="flex items-center gap-3 sm:gap-4">
            <a
              href="https://github.com/BhumikaNair/Draw2Dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#43334C]/70 hover:text-[#E83C91] transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5 sm:w-6 sm:h-6" />
            </a>

            {user?.user?.email ? (
              <Button
                onClick={handleLogout}
                className="bg-gradient-to-r from-[#FF8FB7] to-[#E83C91] hover:from-[#E83C91] hover:to-[#43334C] text-white shadow-lg"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            ) : (
              <Authentication>
                <Button className="bg-gradient-to-r from-[#FF8FB7] to-[#E83C91] hover:from-[#E83C91] hover:to-[#43334C] text-white shadow-lg">
                  Sign In
                </Button>
              </Authentication>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-8 md:py-16 overflow-y-auto md:overflow-hidden">
        <div className="max-w-4xl mx-auto text-center space-y-4 sm:space-y-6 w-full">
          <div className="inline-block">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white/80 backdrop-blur-sm rounded-full border border-[#FF8FB7] shadow-sm">
              <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-[#E83C91]" />
              <span className="text-xs sm:text-sm font-medium text-[#43334C]">
                AI-Powered Design to Code
              </span>
            </div>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            <span className="text-[#43334C]">Transform </span>
            <span className="inline-block animate-gradient bg-gradient-to-r from-[#FF8FB7] via-[#E83C91] to-[#43334C] bg-clip-text text-transparent">
              Wireframes
            </span>
            <br />
            <span className="text-[#43334C]">Into </span>
            <span className="inline-block animate-gradient bg-gradient-to-r from-[#E83C91] via-[#FF8FB7] to-[#43334C] bg-clip-text text-transparent">
              Production Code
            </span>
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-[#43334C]/80 max-w-2xl mx-auto px-4">
            Upload your design wireframes and let AI instantly convert them into
            clean, production-ready code. Save hours of development time.
          </p>

          <div className="pt-4 sm:pt-6">
            {user?.user?.email ? (
              <Link href="/dashboard">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-[#FF8FB7] to-[#E83C91] hover:from-[#E83C91] hover:to-[#43334C] text-white shadow-2xl hover:shadow-[#FF8FB7]/50 transition-all duration-300 text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 h-auto"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Start Creating Now
                </Button>
              </Link>
            ) : (
              <Authentication>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-[#FF8FB7] to-[#E83C91] hover:from-[#E83C91] hover:to-[#43334C] text-white shadow-2xl hover:shadow-[#FF8FB7]/50 transition-all duration-300 text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 h-auto"
                >
                  Get Started Free
                </Button>
              </Authentication>
            )}
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 pt-8 sm:pt-12 max-w-3xl mx-auto">
            <CometCard className="w-full">
              <div className="flex flex-col items-center gap-3 sm:gap-4 p-6 sm:p-8 bg-white/80 backdrop-blur-sm rounded-2xl border border-[#FF8FB7]/30 h-full">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-[#FF8FB7] to-[#E83C91] flex items-center justify-center shadow-lg">
                  <Code2 className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-[#43334C]">
                  Clean Code
                </h3>
                <p className="text-sm sm:text-base text-[#43334C]/70 text-center">
                  Production ready code generated instantly
                </p>
              </div>
            </CometCard>

            <CometCard className="w-full">
              <div className="flex flex-col items-center gap-3 sm:gap-4 p-6 sm:p-8 bg-white/80 backdrop-blur-sm rounded-2xl border border-[#FF8FB7]/30 h-full">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-[#E83C91] to-[#43334C] flex items-center justify-center shadow-lg">
                  <Zap className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-[#43334C]">
                  Lightning Fast
                </h3>
                <p className="text-sm sm:text-base text-[#43334C]/70 text-center">
                  Get instant results with our AI-powered engine
                </p>
              </div>
            </CometCard>

            <CometCard className="w-full">
              <div className="flex flex-col items-center gap-3 sm:gap-4 p-6 sm:p-8 bg-white/80 backdrop-blur-sm rounded-2xl border border-[#FF8FB7]/30 h-full">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-[#FF8FB7] via-[#E83C91] to-[#43334C] flex items-center justify-center shadow-lg">
                  <Palette className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-[#43334C]">
                  AI Powered
                </h3>
                <p className="text-sm sm:text-base text-[#43334C]/70 text-center">
                  Smart conversion using advanced AI models
                </p>
              </div>
            </CometCard>
          </div>
        </div>
      </main>
    </div>
  );
}
