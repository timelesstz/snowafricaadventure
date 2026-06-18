"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Mountain,
  TrendingUp,
  Activity,
  Calendar,
  Users,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

interface CalculatorResult {
  percentage: number;
  label: string;
  color: string;
  bgColor: string;
  recommendation: string;
  routeSuggestion: string;
  routeSlug: string;
}

const fitnessLevels = [
  { value: 1, label: "Sedentary", desc: "Little to no regular exercise" },
  { value: 2, label: "Light", desc: "Walk or exercise 1-2 times per week" },
  { value: 3, label: "Moderate", desc: "Exercise 3-4 times per week" },
  { value: 4, label: "Active", desc: "Exercise 5+ times per week, cardio & strength" },
  { value: 5, label: "Very Fit", desc: "Endurance athlete, hiker, or regular mountaineer" },
];

const ageRanges = [
  { value: "10-19", label: "10-19", factor: 1.0 },
  { value: "20-29", label: "20-29", factor: 1.02 },
  { value: "30-39", label: "30-39", factor: 1.0 },
  { value: "40-49", label: "40-49", factor: 0.97 },
  { value: "50-59", label: "50-59", factor: 0.93 },
  { value: "60-69", label: "60-69", factor: 0.88 },
  { value: "70+", label: "70+", factor: 0.80 },
];

const routes = [
  { value: "marangu-5", label: "Marangu (5 days)", days: 5, baseRate: 62 },
  { value: "machame-6", label: "Machame (6 days)", days: 6, baseRate: 73 },
  { value: "machame-7", label: "Machame (7 days)", days: 7, baseRate: 83 },
  { value: "rongai-7", label: "Rongai (7 days)", days: 7, baseRate: 85 },
  { value: "lemosho-7", label: "Lemosho (7 days)", days: 7, baseRate: 85 },
  { value: "lemosho-8", label: "Lemosho (8 days)", days: 8, baseRate: 92 },
  { value: "northern-9", label: "Northern Circuit (9 days)", days: 9, baseRate: 95 },
];

const altitudeExperience = [
  { value: "none", label: "None", factor: 0.95 },
  { value: "moderate", label: "Hiked above 3,000m", factor: 1.0 },
  { value: "high", label: "Hiked above 4,500m", factor: 1.04 },
  { value: "extreme", label: "Summited 5,000m+ peaks", factor: 1.07 },
];

function calculateSuccess(
  fitness: number,
  age: string,
  route: string,
  altitude: string
): CalculatorResult {
  const routeData = routes.find((r) => r.value === route) || routes[5];
  const ageData = ageRanges.find((a) => a.value === age) || ageRanges[2];
  const altData = altitudeExperience.find((a) => a.value === altitude) || altitudeExperience[0];

  const fitnessBonus = (fitness - 3) * 2.5;
  const raw = routeData.baseRate * ageData.factor * altData.factor + fitnessBonus;
  const percentage = Math.min(98, Math.max(35, Math.round(raw)));

  let label: string;
  let color: string;
  let bgColor: string;
  let recommendation: string;
  let routeSuggestion: string;
  let routeSlug: string;

  if (percentage >= 90) {
    label = "Excellent";
    color = "text-emerald-700";
    bgColor = "bg-emerald-50 border-emerald-200";
    recommendation = "Your profile is ideal for this route. With proper preparation and acclimatization, you have an excellent chance of reaching Uhuru Peak.";
    routeSuggestion = "8 Days Lemosho Route";
    routeSlug = "8-days-lemosho-route";
  } else if (percentage >= 80) {
    label = "Very Good";
    color = "text-blue-700";
    bgColor = "bg-blue-50 border-blue-200";
    recommendation = "Strong chances of success. Consider adding an extra acclimatization day if your schedule allows — it makes a noticeable difference.";
    routeSuggestion = "8 Days Lemosho Route";
    routeSlug = "8-days-lemosho-route";
  } else if (percentage >= 70) {
    label = "Good";
    color = "text-amber-700";
    bgColor = "bg-amber-50 border-amber-200";
    recommendation = "Good prospects, but a longer route would significantly improve your odds. We strongly recommend choosing a 7-8 day itinerary for the best acclimatization.";
    routeSuggestion = "7 Days Machame Route";
    routeSlug = "7-days-machame-route";
  } else if (percentage >= 55) {
    label = "Moderate";
    color = "text-orange-700";
    bgColor = "bg-orange-50 border-orange-200";
    recommendation = "Your success rate could be improved. We recommend a longer route (8+ days), starting a training programme at least 12 weeks before your climb, and considering Diamox for acclimatization support.";
    routeSuggestion = "8 Days Lemosho Route";
    routeSlug = "8-days-lemosho-route";
  } else {
    label = "Challenging";
    color = "text-red-700";
    bgColor = "bg-red-50 border-red-200";
    recommendation = "The current combination of factors suggests a tougher climb. We recommend the longest possible route (8-9 days), a dedicated 16-week training programme, medical consultation, and choosing a reputable operator with strong safety protocols.";
    routeSuggestion = "9 Days Northern Circuit";
    routeSlug = "9-days-northern-circuit-route";
  }

  return { percentage, label, color, bgColor, recommendation, routeSuggestion, routeSlug };
}

export function SuccessCalculator() {
  const [fitness, setFitness] = useState(3);
  const [age, setAge] = useState("30-39");
  const [route, setRoute] = useState("lemosho-8");
  const [altitude, setAltitude] = useState("none");
  const [showResult, setShowResult] = useState(false);

  const result = calculateSuccess(fitness, age, route, altitude);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg border border-[var(--border)] overflow-hidden">
        <div className="bg-gradient-to-r from-[var(--primary-dark)] to-[var(--primary)] p-6 text-white">
          <div className="flex items-center gap-3 mb-2">
            <Mountain className="w-8 h-8 text-[var(--secondary)]" />
            <h3 className="font-heading text-2xl font-bold">Summit Success Calculator</h3>
          </div>
          <p className="text-white/80 text-sm">
            Estimate your Kilimanjaro summit probability based on route, fitness, age, and altitude experience. Based on data from 800+ expeditions.
          </p>
        </div>

        <div className="p-6 space-y-6">
          {/* Fitness Level */}
          <div>
            <label className="flex items-center gap-2 font-semibold text-sm mb-3">
              <Activity className="w-4 h-4 text-[var(--primary)]" />
              Fitness Level
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
              {fitnessLevels.map((level) => (
                <button
                  key={level.value}
                  onClick={() => { setFitness(level.value); setShowResult(false); }}
                  className={`p-3 rounded-lg border-2 text-left transition-all ${
                    fitness === level.value
                      ? "border-[var(--primary)] bg-[var(--primary)]/5"
                      : "border-[var(--border)] hover:border-[var(--primary)]/30"
                  }`}
                >
                  <p className="font-semibold text-xs">{level.label}</p>
                  <p className="text-[10px] text-[var(--text-muted)] mt-0.5 leading-tight">{level.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Age Range */}
          <div>
            <label className="flex items-center gap-2 font-semibold text-sm mb-3">
              <Calendar className="w-4 h-4 text-[var(--primary)]" />
              Age Range
            </label>
            <div className="flex flex-wrap gap-2">
              {ageRanges.map((a) => (
                <button
                  key={a.value}
                  onClick={() => { setAge(a.value); setShowResult(false); }}
                  className={`px-4 py-2 rounded-lg border-2 font-semibold text-sm transition-all ${
                    age === a.value
                      ? "border-[var(--primary)] bg-[var(--primary)]/5"
                      : "border-[var(--border)] hover:border-[var(--primary)]/30"
                  }`}
                >
                  {a.label}
                </button>
              ))}
            </div>
          </div>

          {/* Route */}
          <div>
            <label className="flex items-center gap-2 font-semibold text-sm mb-3">
              <TrendingUp className="w-4 h-4 text-[var(--primary)]" />
              Route &amp; Duration
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
              {routes.map((r) => (
                <button
                  key={r.value}
                  onClick={() => { setRoute(r.value); setShowResult(false); }}
                  className={`p-3 rounded-lg border-2 text-left transition-all ${
                    route === r.value
                      ? "border-[var(--primary)] bg-[var(--primary)]/5"
                      : "border-[var(--border)] hover:border-[var(--primary)]/30"
                  }`}
                >
                  <p className="font-semibold text-xs">{r.label}</p>
                  <p className="text-[10px] text-[var(--text-muted)]">Base rate: {r.baseRate}%</p>
                </button>
              ))}
            </div>
          </div>

          {/* Altitude Experience */}
          <div>
            <label className="flex items-center gap-2 font-semibold text-sm mb-3">
              <Mountain className="w-4 h-4 text-[var(--primary)]" />
              Altitude Experience
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
              {altitudeExperience.map((a) => (
                <button
                  key={a.value}
                  onClick={() => { setAltitude(a.value); setShowResult(false); }}
                  className={`p-3 rounded-lg border-2 text-left transition-all ${
                    altitude === a.value
                      ? "border-[var(--primary)] bg-[var(--primary)]/5"
                      : "border-[var(--border)] hover:border-[var(--primary)]/30"
                  }`}
                >
                  <p className="font-semibold text-xs">{a.label}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Calculate Button */}
          <button
            onClick={() => setShowResult(true)}
            className="w-full bg-[var(--secondary)] hover:bg-[var(--secondary-dark)] text-[var(--primary-dark)] py-4 rounded-xl font-bold text-lg transition-colors shadow-md"
          >
            Calculate My Success Rate
          </button>

          {/* Result */}
          {showResult && (
            <div className={`rounded-xl border-2 p-6 ${result.bgColor} transition-all`}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm font-semibold text-[var(--text-muted)]">Estimated Summit Success Rate</p>
                  <div className="flex items-baseline gap-3 mt-1">
                    <span className={`text-5xl font-bold font-heading ${result.color}`}>
                      {result.percentage}%
                    </span>
                    <span className={`text-lg font-bold ${result.color}`}>{result.label}</span>
                  </div>
                </div>
                <div className="hidden sm:block">
                  <div className="w-20 h-20 rounded-full border-4 border-current flex items-center justify-center" style={{ borderColor: 'currentColor' }}>
                    <span className={`text-2xl font-bold ${result.color}`}>{result.percentage}%</span>
                  </div>
                </div>
              </div>

              <p className="text-sm text-[var(--text-muted)] mb-4 leading-relaxed">
                {result.recommendation}
              </p>

              <div className="bg-white/60 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <p className="font-semibold text-sm">Recommended Route</p>
                </div>
                <Link
                  href={`/trekking/${result.routeSlug}/`}
                  className="inline-flex items-center gap-2 text-[var(--primary)] font-semibold hover:underline"
                >
                  {result.routeSuggestion}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/trekking/"
                  className="inline-flex items-center gap-2 bg-[var(--primary)] text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-[var(--primary-dark)] transition-colors"
                >
                  View All Routes
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/kilimanjaro-join-group-departures/"
                  className="inline-flex items-center gap-2 border-2 border-[var(--border)] px-5 py-2.5 rounded-lg font-semibold text-sm hover:border-[var(--primary)] transition-colors"
                >
                  <Users className="w-4 h-4" />
                  Join a Group Departure
                </Link>
              </div>
            </div>
          )}
        </div>

        <div className="bg-[var(--surface)] px-6 py-3 text-center">
          <p className="text-xs text-[var(--text-muted)]">
            Based on aggregated data from Snow Africa&apos;s 800+ Kilimanjaro expeditions. Individual results vary — this is an estimate, not a guarantee.
          </p>
        </div>
      </div>
    </div>
  );
}
