"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Save, BookOpen, Users, Heart, Sparkles, Loader2 } from "lucide-react";
import ImageUploadField from "@/components/admin/ImageUploadField";

// Default about page settings
const DEFAULT_SETTINGS: Record<string, string> = {
  // Hero Section
  "about.hero.title": "About Snow Africa Adventure",
  "about.hero.subtitle": "Snow Africa Adventure was founded by Florent and Caroline, a passionate husband-and-wife team who share a deep love for Tanzania's wildlife, culture, and natural wonders.",
  "about.hero.image": "",
  "about.hero.imagePositionX": "50",
  "about.hero.imagePositionY": "50",

  // Our Story
  "about.story.title": "Our Story",
  "about.story.content": "Snow Africa Adventure was founded by Florent and Caroline, a passionate husband-and-wife team who share a deep love for Tanzania's wildlife, culture, and natural wonders. Florent began his career working with established safari companies, gaining hands-on experience and in-depth knowledge of the land. Together, he and Caroline have nurtured Snow Africa Adventure into a leading specialist for safaris, mountain treks, and cultural encounters.",
  "about.story.image": "",

  // What We Offer
  "about.offer.title": "What We Offer",
  "about.offer.intro": "From exhilarating Mount Kilimanjaro climbs to breathtaking wildlife safaris and serene beach getaways, our curated packages cater to a wide range of interests and budgets. Whether you are a first-time traveler seeking a budget-friendly option or a seasoned explorer in search of a luxurious, private experience, our handpicked itineraries ensure your adventure is safe, comfortable, and truly unforgettable.",
  "about.offer.service1.title": "Mount Kilimanjaro Treks",
  "about.offer.service1.desc": "Conquer Africa's highest peak with expert guides and top-notch support.",
  "about.offer.service2.title": "Classic Wildlife Safaris",
  "about.offer.service2.desc": "Experience the iconic Serengeti, Ngorongoro Crater, Tarangire, and beyond.",
  "about.offer.service3.title": "Beach Holidays",
  "about.offer.service3.desc": "Relax on the pristine shores of Zanzibar or other hidden coastal gems.",
  "about.offer.service4.title": "Tailored Itineraries",
  "about.offer.service4.desc": "Enjoy personalized trips designed to match your interests and travel style.",
  "about.offer.image": "",

  // Commitment
  "about.commitment.title": "Our Commitment to Fairness and Community",
  "about.commitment.content": "We are proud members of the Kilimanjaro Porters Assistance Project (KPAP), reflecting our dedication to treating our mountain crew fairly and ethically. We believe in responsible tourism that benefits not only our guests but also our local communities. By choosing Snow Africa Adventure, you support a sustainable approach that ensures porters, guides, and local families all thrive alongside our growing tourism industry.",
  "about.commitment.image": "",
  "about.commitment.logo1": "",
  "about.commitment.logo2": "",
  "about.commitment.logo3": "",
  "about.commitment.logo4": "",

  // Meet Your Hosts
  "about.hosts.title": "Meet Your Hosts",
  "about.hosts.content": "As the founders of Snow Africa Adventure, Florent and Caroline are the driving force behind every journey we create. Their knowledge, experience, and genuine hospitality set the tone for our company culture, ensuring every traveler feels at home from the moment they arrive in Tanzania. They look forward to welcoming you, sharing their love for this spectacular land, and creating memories that will last a lifetime.",
  "about.hosts.name1": "Florent",
  "about.hosts.role1": "Co-Founder & Safari Expert",
  "about.hosts.image1": "",
  "about.hosts.name2": "Caroline",
  "about.hosts.role2": "Co-Founder & Operations",
  "about.hosts.image2": "",

  // CTA
  "about.cta.title": "Ready to Begin Your Tanzanian Adventure?",
  "about.cta.content": "Contact us today to start planning your dream safari or trek. Our dedicated team will guide you every step of the way, ensuring a seamless, safe, and life-changing experience in the heart of Africa.",
  "about.cta.tagline": "Welcome to Snow Africa Adventure—where every journey tells a story and every traveler becomes part of our extended Tanzanian family.",
};

export default function AboutUsSettingsPage() {
  const [settings, setSettings] = useState<Record<string, string>>(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // Fetch settings on mount
  useEffect(() => {
    async function fetchSettings() {
      try {
        const res = await fetch("/api/admin/site-settings?prefix=about.");
        if (res.ok) {
          const data = await res.json();
          const merged = { ...DEFAULT_SETTINGS };
          data.forEach((s: { key: string; value: string }) => {
            merged[s.key] = s.value;
          });
          setSettings(merged);
        }
      } catch (error) {
        console.error("Failed to fetch settings:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchSettings();
  }, []);

  const handleChange = (key: string, value: string | null) => {
    setSettings((prev) => ({ ...prev, [key]: value || "" }));
    setSaved(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);

    try {
      const res = await fetch("/api/admin/site-settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ settings }),
      });

      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } catch (error) {
      console.error("Failed to save settings:", error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-amber-600" />
      </div>
    );
  }

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
            <h1 className="text-2xl font-bold text-slate-900">About Us Page</h1>
            <p className="text-slate-600 mt-1">
              Manage about page content and images
            </p>
          </div>
        </div>
        <Link
          href="/about-us/"
          target="_blank"
          className="text-amber-600 hover:text-amber-700 text-sm font-medium"
        >
          View Page →
        </Link>
      </div>

      {saved && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-green-800">
          About page settings saved successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Hero Section */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-200">
            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Hero Section</h2>
              <p className="text-sm text-slate-500">Main banner at the top of the page</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Hero Title
                </label>
                <input
                  type="text"
                  value={settings["about.hero.title"]}
                  onChange={(e) => handleChange("about.hero.title", e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Hero Subtitle
                </label>
                <textarea
                  rows={4}
                  value={settings["about.hero.subtitle"]}
                  onChange={(e) => handleChange("about.hero.subtitle", e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                />
              </div>
            </div>

            <div className="space-y-4">
              <ImageUploadField
                name="about.hero.image"
                value={settings["about.hero.image"]}
                onChange={(url) => handleChange("about.hero.image", url)}
                folder="about"
                label="Hero Background Image"
                helpText="Recommended: 1920x800px. Leave empty for gradient background."
                previewSize="lg"
                deleteFromR2
              />

              {settings["about.hero.image"] && (
                <>
                  {/* Live Preview with focal point */}
                  <div className="rounded-xl overflow-hidden border border-slate-200 shadow-sm">
                    <div className="bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600 border-b flex items-center justify-between">
                      <span>Hero Preview</span>
                      <span className="text-xs text-slate-400">
                        Click image to set focal point ({settings["about.hero.imagePositionX"]}%, {settings["about.hero.imagePositionY"]}%)
                      </span>
                    </div>
                    <div
                      className="relative overflow-hidden cursor-crosshair"
                      style={{ height: "200px" }}
                      onClick={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const x = Math.round(((e.clientX - rect.left) / rect.width) * 100);
                        const y = Math.round(((e.clientY - rect.top) / rect.height) * 100);
                        handleChange("about.hero.imagePositionX", String(x));
                        handleChange("about.hero.imagePositionY", String(y));
                      }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={settings["about.hero.image"]}
                        alt="Hero preview"
                        className="absolute inset-0 w-full h-full object-cover"
                        style={{ objectPosition: `${settings["about.hero.imagePositionX"]}% ${settings["about.hero.imagePositionY"]}%` }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
                      {/* Focal point indicator */}
                      <div
                        className="absolute w-6 h-6 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20"
                        style={{ left: `${settings["about.hero.imagePositionX"]}%`, top: `${settings["about.hero.imagePositionY"]}%` }}
                      >
                        <div className="absolute inset-0 rounded-full border-2 border-white shadow-[0_0_0_1px_rgba(0,0,0,0.3)]" />
                        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white -translate-x-1/2 shadow-[0_0_1px_rgba(0,0,0,0.5)]" />
                        <div className="absolute top-1/2 left-0 right-0 h-px bg-white -translate-y-1/2 shadow-[0_0_1px_rgba(0,0,0,0.5)]" />
                      </div>
                      {/* Preview text overlay */}
                      <div className="absolute inset-0 flex items-center p-6 z-10 pointer-events-none">
                        <div className="max-w-xs">
                          <h3 className="text-lg font-bold text-white leading-tight">
                            {settings["about.hero.title"] || "Hero Title"}
                          </h3>
                          {settings["about.hero.subtitle"] && (
                            <p className="text-white/70 text-xs mt-1 line-clamp-2">
                              {settings["about.hero.subtitle"]}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Focal Point Sliders */}
                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                    <label className="block text-sm font-medium text-slate-700 mb-3">
                      Image Focal Point
                    </label>
                    <p className="text-xs text-slate-500 mb-3">
                      Click the preview above or drag the sliders to reposition the image.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-slate-600 mb-1">
                          Horizontal: {settings["about.hero.imagePositionX"]}%
                        </label>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={settings["about.hero.imagePositionX"]}
                          onChange={(e) => handleChange("about.hero.imagePositionX", e.target.value)}
                          title="Horizontal focal point position"
                          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
                        />
                        <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
                          <span>Left</span>
                          <span>Center</span>
                          <span>Right</span>
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-600 mb-1">
                          Vertical: {settings["about.hero.imagePositionY"]}%
                        </label>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={settings["about.hero.imagePositionY"]}
                          onChange={(e) => handleChange("about.hero.imagePositionY", e.target.value)}
                          title="Vertical focal point position"
                          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
                        />
                        <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
                          <span>Top</span>
                          <span>Center</span>
                          <span>Bottom</span>
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        handleChange("about.hero.imagePositionX", "50");
                        handleChange("about.hero.imagePositionY", "50");
                      }}
                      className="mt-3 text-xs text-amber-600 hover:text-amber-700 font-medium"
                    >
                      Reset to center
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Our Story Section */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-200">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Our Story</h2>
              <p className="text-sm text-slate-500">Company founding story</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Section Title
                </label>
                <input
                  type="text"
                  value={settings["about.story.title"]}
                  onChange={(e) => handleChange("about.story.title", e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Story Content
                </label>
                <textarea
                  rows={6}
                  value={settings["about.story.content"]}
                  onChange={(e) => handleChange("about.story.content", e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                />
              </div>
            </div>

            <ImageUploadField
              name="about.story.image"
              value={settings["about.story.image"]}
              onChange={(url) => handleChange("about.story.image", url)}
              folder="about"
              label="Story Section Image"
              helpText="Image shown alongside the story text. Recommended: 800x600px."
              previewSize="lg"
              deleteFromR2
            />
          </div>
        </div>

        {/* What We Offer Section */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-200">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900">What We Offer</h2>
              <p className="text-sm text-slate-500">Services overview section</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Section Title
                </label>
                <input
                  type="text"
                  value={settings["about.offer.title"]}
                  onChange={(e) => handleChange("about.offer.title", e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Introduction
                </label>
                <textarea
                  rows={4}
                  value={settings["about.offer.intro"]}
                  onChange={(e) => handleChange("about.offer.intro", e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                />
              </div>
            </div>

            <ImageUploadField
              name="about.offer.image"
              value={settings["about.offer.image"]}
              onChange={(url) => handleChange("about.offer.image", url)}
              folder="about"
              label="Services Section Image"
              helpText="Featured image for this section. Recommended: 600x800px (portrait)."
              previewSize="lg"
              deleteFromR2
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-200">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-2 p-4 bg-slate-50 rounded-lg">
                <label className="block text-sm font-medium text-slate-700">
                  Service {i} Title
                </label>
                <input
                  type="text"
                  value={settings[`about.offer.service${i}.title`]}
                  onChange={(e) => handleChange(`about.offer.service${i}.title`, e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none text-sm"
                />
                <label className="block text-sm font-medium text-slate-700">
                  Service {i} Description
                </label>
                <textarea
                  rows={2}
                  value={settings[`about.offer.service${i}.desc`]}
                  onChange={(e) => handleChange(`about.offer.service${i}.desc`, e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none text-sm"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Commitment Section */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-200">
            <div className="w-10 h-10 bg-rose-100 rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-rose-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Commitment Section</h2>
              <p className="text-sm text-slate-500">KPAP and community commitment</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Section Title
                </label>
                <input
                  type="text"
                  value={settings["about.commitment.title"]}
                  onChange={(e) => handleChange("about.commitment.title", e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Content
                </label>
                <textarea
                  rows={6}
                  value={settings["about.commitment.content"]}
                  onChange={(e) => handleChange("about.commitment.content", e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                />
              </div>
            </div>

            <ImageUploadField
              name="about.commitment.image"
              value={settings["about.commitment.image"]}
              onChange={(url) => handleChange("about.commitment.image", url)}
              folder="about"
              label="Commitment Section Image"
              helpText="Image showing porters or community work. Recommended: 800x600px."
              previewSize="lg"
              deleteFromR2
            />
          </div>

          {/* Partner/Certification Logos */}
          <div className="pt-4 border-t border-slate-200">
            <label className="block text-sm font-medium text-slate-700 mb-4">
              Partner & Certification Logos
            </label>
            <p className="text-sm text-slate-500 mb-4">
              Upload logos for KPAP, TATO, TripAdvisor, etc. These will display below the commitment text.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <ImageUploadField
                  key={i}
                  name={`about.commitment.logo${i}`}
                  value={settings[`about.commitment.logo${i}`] || ""}
                  onChange={(url) => handleChange(`about.commitment.logo${i}`, url)}
                  folder="about/logos"
                  label={`Logo ${i}`}
                  helpText="PNG with transparency recommended"
                  previewSize="sm"
                  deleteFromR2
                />
              ))}
            </div>
          </div>
        </div>

        {/* Meet Your Hosts Section */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-200">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Meet Your Hosts</h2>
              <p className="text-sm text-slate-500">Founders information</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Section Title
              </label>
              <input
                type="text"
                value={settings["about.hosts.title"]}
                onChange={(e) => handleChange("about.hosts.title", e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Content
              </label>
              <textarea
                rows={4}
                value={settings["about.hosts.content"]}
                onChange={(e) => handleChange("about.hosts.content", e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
              />
            </div>

            {/* Individual Host Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-200">
              {/* Host 1 - Florent */}
              <div className="p-5 bg-slate-50 rounded-xl space-y-4">
                <h3 className="font-medium text-slate-900">Host 1</h3>
                <ImageUploadField
                  name="about.hosts.image1"
                  value={settings["about.hosts.image1"] || ""}
                  onChange={(url) => handleChange("about.hosts.image1", url)}
                  folder="about/hosts"
                  label="Photo"
                  helpText="Square photo recommended (400x400px)"
                  previewSize="sm"
                  deleteFromR2
                />
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    value={settings["about.hosts.name1"]}
                    onChange={(e) => handleChange("about.hosts.name1", e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Role
                  </label>
                  <input
                    type="text"
                    value={settings["about.hosts.role1"]}
                    onChange={(e) => handleChange("about.hosts.role1", e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none text-sm"
                  />
                </div>
              </div>

              {/* Host 2 - Caroline */}
              <div className="p-5 bg-slate-50 rounded-xl space-y-4">
                <h3 className="font-medium text-slate-900">Host 2</h3>
                <ImageUploadField
                  name="about.hosts.image2"
                  value={settings["about.hosts.image2"] || ""}
                  onChange={(url) => handleChange("about.hosts.image2", url)}
                  folder="about/hosts"
                  label="Photo"
                  helpText="Square photo recommended (400x400px)"
                  previewSize="sm"
                  deleteFromR2
                />
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    value={settings["about.hosts.name2"]}
                    onChange={(e) => handleChange("about.hosts.name2", e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Role
                  </label>
                  <input
                    type="text"
                    value={settings["about.hosts.role2"]}
                    onChange={(e) => handleChange("about.hosts.role2", e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-200">
            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Call to Action</h2>
              <p className="text-sm text-slate-500">Bottom CTA section</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                CTA Title
              </label>
              <input
                type="text"
                value={settings["about.cta.title"]}
                onChange={(e) => handleChange("about.cta.title", e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                CTA Content
              </label>
              <textarea
                rows={3}
                value={settings["about.cta.content"]}
                onChange={(e) => handleChange("about.cta.content", e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Tagline
              </label>
              <input
                type="text"
                value={settings["about.cta.tagline"]}
                onChange={(e) => handleChange("about.cta.tagline", e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                Save All Settings
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
