import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Home, Info, BarChart3, Building2, Star } from "lucide-react";

// Default homepage settings
const DEFAULT_SETTINGS = {
  // Hero Section
  "homepage.hero.badge": "Tanzania's Trusted Adventure Partner",
  "homepage.hero.title": "Climb Kilimanjaro.\nSafari Tanzania.",
  "homepage.hero.subtitle": "Summit Africa's highest peak. Witness the Great Migration. Relax on Zanzibar beaches. Your adventure of a lifetime starts with Tanzania's most trusted local operator.",
  "homepage.hero.image": "https://pub-cf9450d27ca744f1825d1e08b392f592.r2.dev/wp-content/uploads/2024/07/kilitrekkers.webp",

  // Stats
  "homepage.stats.experience": "15+",
  "homepage.stats.experienceLabel": "Years Experience",
  "homepage.stats.travelers": "5,000+",
  "homepage.stats.travelersLabel": "Happy Travelers",
  "homepage.stats.success": "93%",
  "homepage.stats.successLabel": "Summit Success",
  "homepage.stats.rating": "4.9",
  "homepage.stats.ratingLabel": "TripAdvisor Rating",

  // Company Info
  "homepage.company.tagline": "Travelling More Easy With Snow Africa Adventure",
  "homepage.company.description": "Snow Africa Adventure is the authentic African safari specialist having its head office in Arusha, Tanzania. Being one of the reliable names in safari industry Snow Africa has arranged thousands of successful safari & trekking trips. We are a specialist of every aspect of Tanzania.",
  "homepage.company.valueProposition": "We are offering some of the finest and handpicked pricing packages that are suitable for all types of budget. We are constantly researching on improving our services as well our aim is to provide our clients with the best services within their pocket-friendly budget.",

  // Registration Details
  "homepage.registration.name": "Snow Africa Adventures Limited",
  "homepage.registration.incorporationNo": "90147",
  "homepage.registration.vatNo": "40311448-A",
  "homepage.registration.tinNo": "116-858-398",
  "homepage.registration.talaLicense": "023178",
  "homepage.registration.trekkingLicense": "022690",

  // TripAdvisor
  "homepage.tripadvisor.rating": "5",
  "homepage.tripadvisor.reviews": "500",
  "homepage.tripadvisor.url": "https://www.tripadvisor.com/Attraction_Review-g317084-d17523583-Reviews-Snow_Africa_Adventure-Arusha_Arusha_Region.html",
};

async function getHomepageSettings() {
  const settings = await prisma.siteSetting.findMany({
    where: {
      key: { startsWith: "homepage." },
    },
  });

  // Merge database settings with defaults
  const merged: Record<string, string> = { ...DEFAULT_SETTINGS };
  settings.forEach((s) => {
    merged[s.key] = s.value;
  });

  return merged;
}

async function saveHomepageSettings(formData: FormData) {
  "use server";

  const keys = Object.keys(DEFAULT_SETTINGS);

  for (const key of keys) {
    const value = formData.get(key) as string;
    if (value !== null && value !== undefined) {
      await prisma.siteSetting.upsert({
        where: { key },
        create: { key, value },
        update: { value },
      });
    }
  }

  redirect("/admin/homepage?saved=1");
}

export default async function HomepageSettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const params = await searchParams;
  const settings = await getHomepageSettings();
  const saved = params.saved === "1";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin"
            className="p-2 hover:bg-slate-100 rounded-lg"
          >
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Homepage Settings</h1>
            <p className="text-slate-600 mt-1">
              Manage homepage content and company information
            </p>
          </div>
        </div>
      </div>

      {saved && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-green-800">
          Homepage settings saved successfully!
        </div>
      )}

      <form action={saveHomepageSettings} className="space-y-6">
        {/* Hero Section */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-200">
            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
              <Home className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Hero Section</h2>
              <p className="text-sm text-slate-500">Main banner at the top of homepage</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Badge Text
              </label>
              <input
                type="text"
                name="homepage.hero.badge"
                defaultValue={settings["homepage.hero.badge"]}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Hero Title (use \n for line breaks)
              </label>
              <textarea
                name="homepage.hero.title"
                rows={2}
                defaultValue={settings["homepage.hero.title"]}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none font-mono"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Hero Subtitle
              </label>
              <textarea
                name="homepage.hero.subtitle"
                rows={3}
                defaultValue={settings["homepage.hero.subtitle"]}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Hero Background Image URL
              </label>
              <input
                type="url"
                name="homepage.hero.image"
                defaultValue={settings["homepage.hero.image"]}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-200">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Statistics</h2>
              <p className="text-sm text-slate-500">Key numbers displayed in hero section</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Experience Value
              </label>
              <input
                type="text"
                name="homepage.stats.experience"
                defaultValue={settings["homepage.stats.experience"]}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
              />
              <input
                type="text"
                name="homepage.stats.experienceLabel"
                defaultValue={settings["homepage.stats.experienceLabel"]}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none mt-2"
                placeholder="Label"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Travelers Value
              </label>
              <input
                type="text"
                name="homepage.stats.travelers"
                defaultValue={settings["homepage.stats.travelers"]}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
              />
              <input
                type="text"
                name="homepage.stats.travelersLabel"
                defaultValue={settings["homepage.stats.travelersLabel"]}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none mt-2"
                placeholder="Label"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Success Rate Value
              </label>
              <input
                type="text"
                name="homepage.stats.success"
                defaultValue={settings["homepage.stats.success"]}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
              />
              <input
                type="text"
                name="homepage.stats.successLabel"
                defaultValue={settings["homepage.stats.successLabel"]}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none mt-2"
                placeholder="Label"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Rating Value
              </label>
              <input
                type="text"
                name="homepage.stats.rating"
                defaultValue={settings["homepage.stats.rating"]}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
              />
              <input
                type="text"
                name="homepage.stats.ratingLabel"
                defaultValue={settings["homepage.stats.ratingLabel"]}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none mt-2"
                placeholder="Label"
              />
            </div>
          </div>
        </div>

        {/* Company Info Section */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-200">
            <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
              <Info className="w-5 h-5 text-slate-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Company Information</h2>
              <p className="text-sm text-slate-500">About section content</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Tagline
              </label>
              <input
                type="text"
                name="homepage.company.tagline"
                defaultValue={settings["homepage.company.tagline"]}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Main Description
              </label>
              <textarea
                name="homepage.company.description"
                rows={4}
                defaultValue={settings["homepage.company.description"]}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Value Proposition
              </label>
              <textarea
                name="homepage.company.valueProposition"
                rows={4}
                defaultValue={settings["homepage.company.valueProposition"]}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Registration Details */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-200">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Building2 className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Registration Details</h2>
              <p className="text-sm text-slate-500">Legal company information</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Company Name
              </label>
              <input
                type="text"
                name="homepage.registration.name"
                defaultValue={settings["homepage.registration.name"]}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Incorporation No.
              </label>
              <input
                type="text"
                name="homepage.registration.incorporationNo"
                defaultValue={settings["homepage.registration.incorporationNo"]}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                VAT No.
              </label>
              <input
                type="text"
                name="homepage.registration.vatNo"
                defaultValue={settings["homepage.registration.vatNo"]}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                TIN
              </label>
              <input
                type="text"
                name="homepage.registration.tinNo"
                defaultValue={settings["homepage.registration.tinNo"]}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                TALA License No.
              </label>
              <input
                type="text"
                name="homepage.registration.talaLicense"
                defaultValue={settings["homepage.registration.talaLicense"]}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Trekking License No.
              </label>
              <input
                type="text"
                name="homepage.registration.trekkingLicense"
                defaultValue={settings["homepage.registration.trekkingLicense"]}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
              />
            </div>
          </div>
        </div>

        {/* TripAdvisor */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-200">
            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
              <Star className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900">TripAdvisor</h2>
              <p className="text-sm text-slate-500">Review platform information</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Rating (out of 5)
              </label>
              <input
                type="text"
                name="homepage.tripadvisor.rating"
                defaultValue={settings["homepage.tripadvisor.rating"]}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Number of Reviews
              </label>
              <input
                type="text"
                name="homepage.tripadvisor.reviews"
                defaultValue={settings["homepage.tripadvisor.reviews"]}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                TripAdvisor URL
              </label>
              <input
                type="url"
                name="homepage.tripadvisor.url"
                defaultValue={settings["homepage.tripadvisor.url"]}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
          >
            <Save className="w-5 h-5" />
            Save All Settings
          </button>
        </div>
      </form>
    </div>
  );
}
