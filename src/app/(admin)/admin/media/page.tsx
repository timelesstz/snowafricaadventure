import { Suspense } from "react";
import MediaLibrary from "./MediaLibrary";

export const metadata = {
  title: "Media Library | Snow Africa Admin",
};

export default function MediaPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Media Library</h1>
        <p className="text-slate-600 mt-1">
          Manage all uploaded images and files
        </p>
      </div>

      <Suspense
        fallback={
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600" />
          </div>
        }
      >
        <MediaLibrary />
      </Suspense>
    </div>
  );
}
