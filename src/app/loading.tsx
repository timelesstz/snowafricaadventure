import { Mountain } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <div className="relative">
          {/* Animated Mountain Icon */}
          <div className="animate-bounce">
            <Mountain className="w-16 h-16 text-amber-500" />
          </div>
          {/* Loading Dots */}
          <div className="flex justify-center gap-1 mt-4">
            <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" style={{ animationDelay: "0ms" }} />
            <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" style={{ animationDelay: "150ms" }} />
            <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" style={{ animationDelay: "300ms" }} />
          </div>
        </div>
        <p className="mt-4 text-slate-500 text-sm">Loading...</p>
      </div>
    </div>
  );
}
