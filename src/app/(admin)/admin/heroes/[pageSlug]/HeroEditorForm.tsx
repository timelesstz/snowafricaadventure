"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import ImageUploadField from "@/components/admin/ImageUploadField";

interface HeroData {
  pageSlug: string;
  pageName: string;
  heroType: string;
  title: string;
  subtitle: string;
  badgeText: string;
  ctaPrimaryText: string;
  ctaPrimaryUrl: string;
  ctaSecondaryText: string;
  ctaSecondaryUrl: string;
  backgroundImage: string;
  imagePositionX: number;
  imagePositionY: number;
  overlayGradient: string;
  overlayDirection: string;
  overlayOpacity: number;
  gradientFrom: string;
  gradientTo: string;
  minHeight: string;
  textAlignment: string;
  textColor: string;
  showScrollIndicator: boolean;
  isActive: boolean;
}

interface HeroEditorFormProps {
  hero: HeroData;
  action: (formData: FormData) => Promise<void>;
}

const OVERLAY_PRESETS = [
  { label: "Standard Dark", value: "from-black/70 via-black/50 to-transparent" },
  { label: "Heavy Dark", value: "from-black/80 via-black/50 to-transparent" },
  { label: "Extra Dark", value: "from-black/90 via-black/50 to-black/30" },
  { label: "Light", value: "from-black/40 via-black/20 to-transparent" },
  { label: "Soft", value: "from-black/60 via-black/20 to-transparent" },
  { label: "Full Cover", value: "from-black/60 via-black/40 to-black/30" },
];

const MIN_HEIGHT_OPTIONS = [
  { label: "Auto (Content)", value: "auto" },
  { label: "60vh", value: "60vh" },
  { label: "70vh (Default)", value: "70vh" },
  { label: "75vh", value: "75vh" },
  { label: "80vh (Full)", value: "80vh" },
];

export function HeroEditorForm({ hero, action }: HeroEditorFormProps) {
  const [heroType, setHeroType] = useState(hero.heroType);
  const [title, setTitle] = useState(hero.title);
  const [subtitle, setSubtitle] = useState(hero.subtitle);
  const [badgeText, setBadgeText] = useState(hero.badgeText);
  const [bgImage, setBgImage] = useState(hero.backgroundImage);
  const [posX, setPosX] = useState(hero.imagePositionX);
  const [posY, setPosY] = useState(hero.imagePositionY);
  const [overlayGradient, setOverlayGradient] = useState(hero.overlayGradient);
  const [overlayDirection, setOverlayDirection] = useState(hero.overlayDirection);
  const [overlayOpacity, setOverlayOpacity] = useState(hero.overlayOpacity);
  const [gradientFrom, setGradientFrom] = useState(hero.gradientFrom);
  const [gradientTo, setGradientTo] = useState(hero.gradientTo);
  const [minHeight, setMinHeight] = useState(hero.minHeight);
  const [textAlignment, setTextAlignment] = useState(hero.textAlignment);
  const [showScroll, setShowScroll] = useState(hero.showScrollIndicator);
  const [textColor, setTextColor] = useState(hero.textColor);
  const [isActive, setIsActive] = useState(hero.isActive);

  const isImage = heroType === "image";

  return (
    <form action={action} className="space-y-8">
      {/* Hidden fields */}
      <input type="hidden" name="pageName" value={hero.pageName} />
      <input type="hidden" name="heroType" value={heroType} />
      <input type="hidden" name="backgroundImage" value={bgImage} />
      <input type="hidden" name="imagePositionX" value={posX} />
      <input type="hidden" name="imagePositionY" value={posY} />
      <input type="hidden" name="overlayGradient" value={overlayGradient} />
      <input type="hidden" name="overlayDirection" value={overlayDirection} />
      <input type="hidden" name="overlayOpacity" value={overlayOpacity} />
      <input type="hidden" name="gradientFrom" value={gradientFrom} />
      <input type="hidden" name="gradientTo" value={gradientTo} />
      <input type="hidden" name="minHeight" value={minHeight} />
      <input type="hidden" name="textAlignment" value={textAlignment} />
      <input type="hidden" name="textColor" value={textColor} />
      <input type="hidden" name="showScrollIndicator" value={String(showScroll)} />
      <input type="hidden" name="isActive" value={String(isActive)} />

      {/* Live Preview */}
      <div className="rounded-xl overflow-hidden border border-slate-200 shadow-sm">
        <div className="bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600 border-b flex items-center justify-between">
          <span>Live Preview</span>
          {isImage && bgImage && (
            <span className="text-xs text-slate-400">Click image to set focal point ({posX}%, {posY}%)</span>
          )}
        </div>
        <div className="relative overflow-hidden" style={{ height: isImage ? "280px" : "200px" }}>
          {isImage && bgImage ? (
            <>
              <Image
                src={bgImage}
                alt="Preview"
                fill
                className="object-cover"
                style={{ objectPosition: `${posX}% ${posY}%` }}
                sizes="100vw"
              />
              <div className={`absolute inset-0 bg-gradient-${overlayDirection} ${overlayGradient}`} />
              {/* Focal point click area */}
              <div
                className="absolute inset-0 z-20 cursor-crosshair"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = Math.round(((e.clientX - rect.left) / rect.width) * 100);
                  const y = Math.round(((e.clientY - rect.top) / rect.height) * 100);
                  setPosX(x);
                  setPosY(y);
                }}
              >
                {/* Focal point indicator */}
                <div
                  className="absolute w-6 h-6 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                  style={{ left: `${posX}%`, top: `${posY}%` }}
                >
                  <div className="absolute inset-0 rounded-full border-2 border-white shadow-[0_0_0_1px_rgba(0,0,0,0.3)]" />
                  <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white -translate-x-1/2 shadow-[0_0_1px_rgba(0,0,0,0.5)]" />
                  <div className="absolute top-1/2 left-0 right-0 h-px bg-white -translate-y-1/2 shadow-[0_0_1px_rgba(0,0,0,0.5)]" />
                </div>
              </div>
            </>
          ) : (
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(to bottom right, ${gradientFrom || "var(--primary-dark)"}, ${gradientTo || "var(--text)"})`,
              }}
            />
          )}
          <div className={`absolute inset-0 flex ${
            textAlignment === "center" ? "items-center justify-center text-center" :
            textAlignment === "bottom" ? "items-end" : "items-center"
          } p-8`}>
            <div className="max-w-lg">
              {badgeText && (
                <span className="inline-block px-3 py-1 bg-amber-500 text-white rounded-full text-xs font-semibold mb-2">
                  {badgeText}
                </span>
              )}
              <h2 className="text-2xl md:text-3xl font-bold text-white whitespace-pre-line leading-tight" style={{ color: textColor || "white" }}>
                {title || "Hero Title"}
              </h2>
              {subtitle && (
                <p className="text-white/80 text-sm mt-2 line-clamp-2">
                  {subtitle}
                </p>
              )}
            </div>
          </div>
          {showScroll && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-white/50 flex flex-col items-center">
              <span className="text-[10px] tracking-widest uppercase">Scroll</span>
              <ChevronDown className="w-4 h-4" />
            </div>
          )}
        </div>
      </div>

      {/* Hero Type */}
      <div className="bg-white border border-slate-200 rounded-xl p-6">
        <h3 className="font-semibold text-lg mb-4">Type & Layout</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Hero Type</label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setHeroType("image")}
                className={`flex-1 px-4 py-3 rounded-lg border-2 text-sm font-medium transition-colors ${
                  isImage
                    ? "border-amber-500 bg-amber-50 text-amber-700"
                    : "border-slate-200 text-slate-600 hover:border-slate-300"
                }`}
              >
                Image Background
              </button>
              <button
                type="button"
                onClick={() => setHeroType("gradient")}
                className={`flex-1 px-4 py-3 rounded-lg border-2 text-sm font-medium transition-colors ${
                  !isImage
                    ? "border-amber-500 bg-amber-50 text-amber-700"
                    : "border-slate-200 text-slate-600 hover:border-slate-300"
                }`}
              >
                Gradient Only
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Text Alignment</label>
            <div className="flex gap-2">
              {["left", "center", "bottom"].map((align) => (
                <button
                  key={align}
                  type="button"
                  onClick={() => setTextAlignment(align)}
                  className={`flex-1 px-3 py-2 rounded-lg border-2 text-sm font-medium capitalize transition-colors ${
                    textAlignment === align
                      ? "border-amber-500 bg-amber-50 text-amber-700"
                      : "border-slate-200 text-slate-600 hover:border-slate-300"
                  }`}
                >
                  {align}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Minimum Height</label>
            <select
              value={minHeight}
              onChange={(e) => setMinHeight(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
            >
              {MIN_HEIGHT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showScroll}
                onChange={(e) => setShowScroll(e.target.checked)}
                className="w-4 h-4 text-amber-600 border-slate-300 rounded focus:ring-amber-500"
              />
              <span className="text-sm text-slate-700">Show scroll indicator</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                className="w-4 h-4 text-amber-600 border-slate-300 rounded focus:ring-amber-500"
              />
              <span className="text-sm text-slate-700">Active</span>
            </label>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white border border-slate-200 rounded-xl p-6">
        <h3 className="font-semibold text-lg mb-4">Content</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Title *</label>
            <textarea
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              rows={2}
              required
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
              placeholder="Use newlines for line breaks"
            />
            <p className="text-xs text-slate-400 mt-1">Use new lines for line breaks in the title</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Subtitle</label>
            <textarea
              name="subtitle"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Badge Text</label>
            <input
              type="text"
              name="badgeText"
              value={badgeText}
              onChange={(e) => setBadgeText(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
              placeholder="e.g., 2025-2026 Season"
            />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Primary CTA Text</label>
              <input
                type="text"
                name="ctaPrimaryText"
                defaultValue={hero.ctaPrimaryText}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                placeholder="e.g., Start Planning"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Primary CTA URL</label>
              <input
                type="text"
                name="ctaPrimaryUrl"
                defaultValue={hero.ctaPrimaryUrl}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                placeholder="e.g., #inquiry-form or /trekking/"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Secondary CTA Text</label>
              <input
                type="text"
                name="ctaSecondaryText"
                defaultValue={hero.ctaSecondaryText}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                placeholder="e.g., View Packages"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Secondary CTA URL</label>
              <input
                type="text"
                name="ctaSecondaryUrl"
                defaultValue={hero.ctaSecondaryUrl}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                placeholder="e.g., /tanzania-safaris/"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Media & Overlay (Image type) */}
      {isImage && (
        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <h3 className="font-semibold text-lg mb-4">Background Image & Overlay</h3>
          <div className="space-y-6">
            <ImageUploadField
              name="backgroundImageUpload"
              value={bgImage || null}
              onChange={(url) => setBgImage(url || "")}
              folder="homepage"
              label="Background Image"
              helpText="Recommended: High-resolution landscape image (1920x1080+)"
              previewSize="lg"
              deleteFromR2
            />

            {bgImage && (
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                <label className="block text-sm font-medium text-slate-700 mb-3">
                  Image Focal Point
                </label>
                <p className="text-xs text-slate-500 mb-3">
                  Click on the preview above to set the focal point, or adjust manually below.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      Horizontal: {posX}%
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={posX}
                      onChange={(e) => setPosX(parseInt(e.target.value))}
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
                      Vertical: {posY}%
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={posY}
                      onChange={(e) => setPosY(parseInt(e.target.value))}
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
                  onClick={() => { setPosX(50); setPosY(50); }}
                  className="mt-3 text-xs text-amber-600 hover:text-amber-700 font-medium"
                >
                  Reset to center
                </button>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Overlay Preset</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {OVERLAY_PRESETS.map((preset) => (
                  <button
                    key={preset.value}
                    type="button"
                    onClick={() => setOverlayGradient(preset.value)}
                    className={`px-3 py-2 rounded-lg border-2 text-xs font-medium transition-colors ${
                      overlayGradient === preset.value
                        ? "border-amber-500 bg-amber-50 text-amber-700"
                        : "border-slate-200 text-slate-600 hover:border-slate-300"
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Gradient Direction</label>
                <select
                  value={overlayDirection}
                  onChange={(e) => setOverlayDirection(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                >
                  <option value="to-r">Left to Right</option>
                  <option value="to-l">Right to Left</option>
                  <option value="to-t">Bottom to Top</option>
                  <option value="to-b">Top to Bottom</option>
                  <option value="to-br">Top-Left to Bottom-Right</option>
                  <option value="to-bl">Top-Right to Bottom-Left</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Overlay Opacity: {overlayOpacity}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={overlayOpacity}
                  onChange={(e) => setOverlayOpacity(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
                <div className="flex justify-between text-xs text-slate-400 mt-1">
                  <span>Transparent</span>
                  <span>Opaque</span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Custom Overlay CSS (Advanced)</label>
              <input
                type="text"
                value={overlayGradient}
                onChange={(e) => setOverlayGradient(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none font-mono text-sm"
                placeholder="from-black/70 via-black/50 to-transparent"
              />
            </div>
          </div>
        </div>
      )}

      {/* Gradient Colors (Gradient type) */}
      {!isImage && (
        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <h3 className="font-semibold text-lg mb-4">Gradient Colors</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">From Color</label>
              <input
                type="text"
                value={gradientFrom}
                onChange={(e) => setGradientFrom(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none font-mono text-sm"
                placeholder="var(--primary-dark) or #1e293b"
              />
              <p className="text-xs text-slate-400 mt-1">Use CSS variables or hex colors</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">To Color</label>
              <input
                type="text"
                value={gradientTo}
                onChange={(e) => setGradientTo(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none font-mono text-sm"
                placeholder="var(--text) or #0f172a"
              />
            </div>
          </div>
        </div>
      )}

      {/* Text Styling */}
      <div className="bg-white border border-slate-200 rounded-xl p-6">
        <h3 className="font-semibold text-lg mb-4">Text Styling</h3>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Custom Text Color</label>
          <input
            type="text"
            value={textColor}
            onChange={(e) => setTextColor(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none font-mono text-sm"
            placeholder="Leave empty for default white"
          />
          <p className="text-xs text-slate-400 mt-1">CSS color value. Leave empty to use white (default)</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">
        <button
          type="submit"
          className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg transition-colors shadow-sm"
        >
          Save Hero
        </button>
        <a
          href="/admin/heroes/"
          className="px-6 py-3 border border-slate-300 text-slate-600 font-semibold rounded-lg hover:bg-slate-50 transition-colors"
        >
          Cancel
        </a>
      </div>
    </form>
  );
}
