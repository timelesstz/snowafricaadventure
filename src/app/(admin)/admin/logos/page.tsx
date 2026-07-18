import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import { Plus, Edit, BadgeCheck, ImageOff } from "lucide-react";

const PLACEMENT_LABELS: Record<string, string> = {
  homepage: "Homepage",
  about: "About Us",
  footer: "Footer",
};

async function getLogos() {
  return prisma.logo.findMany({ orderBy: [{ order: "asc" }, { name: "asc" }] });
}

export default async function LogosPage() {
  const logos = await getLogos();
  const active = logos.filter((l) => l.isActive).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Logos</h1>
          <p className="text-slate-600 mt-1">
            Accreditation and partner logos, shared across the homepage, About Us and footer
          </p>
        </div>
        <Link
          href="/admin/logos/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
        >
          <Plus className="w-4 h-4" />
          Add Logo
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-5">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-100 rounded-lg">
            <BadgeCheck className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-900">
              {active}
              <span className="text-base font-normal text-slate-500"> of {logos.length}</span>
            </p>
            <p className="text-sm text-slate-600">Logos live on the site</p>
          </div>
        </div>
      </div>

      {logos.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-12 text-center">
          <ImageOff className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-600">No logos yet.</p>
          <Link
            href="/admin/logos/new"
            className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
          >
            <Plus className="w-4 h-4" />
            Add your first logo
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {logos.map((logo) => (
            <div
              key={logo.id}
              className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden flex flex-col"
            >
              {/* Checkerboard reveals transparency problems in the artwork */}
              <div
                className="h-28 flex items-center justify-center p-4 border-b border-slate-100"
                style={{
                  backgroundImage:
                    "linear-gradient(45deg,#f1f5f9 25%,transparent 25%),linear-gradient(-45deg,#f1f5f9 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#f1f5f9 75%),linear-gradient(-45deg,transparent 75%,#f1f5f9 75%)",
                  backgroundSize: "16px 16px",
                  backgroundPosition: "0 0,0 8px,8px -8px,-8px 0px",
                }}
              >
                <Image
                  src={logo.image}
                  alt={logo.name}
                  width={160}
                  height={80}
                  className="max-h-20 w-auto object-contain"
                />
              </div>

              <div className="p-5 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-slate-900">{logo.name}</h3>
                  <span
                    className={`shrink-0 px-2 py-0.5 text-xs rounded-full ${
                      logo.isActive ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {logo.isActive ? "Active" : "Hidden"}
                  </span>
                </div>

                <div className="flex flex-wrap gap-1.5 mt-3">
                  {logo.placements.length === 0 ? (
                    <span className="px-2 py-0.5 text-xs rounded-full bg-amber-100 text-amber-700">
                      Not shown anywhere
                    </span>
                  ) : (
                    logo.placements.map((p) => (
                      <span
                        key={p}
                        className="px-2 py-0.5 text-xs rounded-full bg-slate-100 text-slate-600"
                      >
                        {PLACEMENT_LABELS[p] ?? p}
                      </span>
                    ))
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between px-5 py-4 border-t border-slate-100">
                <span className="text-xs text-slate-400">Order: {logo.order}</span>
                <Link
                  href={`/admin/logos/${logo.id}`}
                  className="inline-flex items-center gap-2 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-100 rounded-lg"
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
