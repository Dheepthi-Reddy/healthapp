"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";

type Unit = "metric" | "imperial";
type Category = "underweight" | "normal" | "overweight" | "obese";

interface CategoryData {
  label: string;
  color: string;
  bg: string;
  border: string;
  tips: string[];
  symptomTitle: string;
  symptomText: string;
}

const CATEGORIES: Record<Category, CategoryData> = {
  underweight: {
    label: "Underweight",
    color: "#185FA5",
    bg: "#E6F1FB",
    border: "#B5D4F4",
    tips: [
      "Increase caloric intake with nutrient-dense foods like nuts, legumes, whole grains, and dairy.",
      "Aim for 3 balanced meals and 2–3 snacks per day to build healthy weight gradually.",
      "Strength training 2–3 times per week can help build muscle mass.",
      "Consider a blood test to rule out underlying conditions affecting weight.",
    ],
    symptomTitle: "When to seek consultation",
    symptomText:
      "If you experience persistent fatigue, hair loss, feeling cold often, irregular heartbeat, or have lost weight unintentionally — please consult a physician. These may indicate nutritional deficiencies or an underlying condition.",
  },
  normal: {
    label: "Healthy weight",
    color: "#0F6E56",
    bg: "#E1F5EE",
    border: "#9FE1CB",
    tips: [
      "Maintain your current habits — balanced diet, regular physical activity, and adequate sleep.",
      "Aim for at least 150 minutes of moderate aerobic exercise per week.",
      "Keep hydrated with 8–10 glasses of water daily.",
      "Schedule annual health check-ups even when feeling well.",
    ],
    symptomTitle: "You are in a healthy range",
    symptomText:
      "Your BMI falls within the normal range. Focus on maintaining this through consistent lifestyle habits. If you experience any unusual symptoms unrelated to weight, do not hesitate to consult your doctor.",
  },
  overweight: {
    label: "Overweight",
    color: "#854F0B",
    bg: "#FAEEDA",
    border: "#FAC775",
    tips: [
      "Reduce portion sizes and limit highly processed foods, sugary beverages, and refined carbs.",
      "Aim for 30 minutes of brisk walking or equivalent activity most days of the week.",
      "Focus on fibre-rich vegetables, lean proteins, and complex carbohydrates.",
      "Track meals for a week — awareness of intake often leads to natural reduction.",
    ],
    symptomTitle: "Symptoms to watch for",
    symptomText:
      "Consult a doctor if you experience shortness of breath during mild activity, joint pain, sleep disturbances, elevated blood pressure, or blood sugar irregularities — these can be early signs of weight-related conditions.",
  },
  obese: {
    label: "Obese",
    color: "#A32D2D",
    bg: "#FCEBEB",
    border: "#F7C1C1",
    tips: [
      "Consult a physician or registered dietitian before starting any weight-loss programme.",
      "Set small, sustainable goals — losing 0.5–1 kg per week is safe and effective.",
      "Prioritise low-impact exercise (swimming, cycling, walking) to protect joints.",
      "Address emotional eating patterns — speaking with a counsellor or therapist can help.",
    ],
    symptomTitle: "Please consider a consultation",
    symptomText:
      "A BMI in the obese range is associated with increased risk of type 2 diabetes, heart disease, sleep apnoea, and joint problems. We strongly recommend speaking with one of our doctors. If you experience chest pain, difficulty breathing, or sudden swelling — seek immediate care.",
  },
};

function getCategory(bmi: number): Category {
  if (bmi < 18.5) return "underweight";
  if (bmi < 25) return "normal";
  if (bmi < 30) return "overweight";
  return "obese";
}

function getMarkerLeft(bmi: number): number {
  if (bmi <= 15) return 2;
  if (bmi >= 40) return 98;
  if (bmi < 18.5) return 2 + ((bmi - 15) / 3.5) * 20;
  if (bmi < 25) return 22 + ((bmi - 18.5) / 6.5) * 28;
  if (bmi < 30) return 50 + ((bmi - 25) / 5) * 22;
  return 72 + ((bmi - 30) / 10) * 24;
}

export default function BMIPage() {
  const [unit, setUnit] = useState<Unit>("metric");
  const [heightCm, setHeightCm] = useState("");
  const [weightKg, setWeightKg] = useState("");
  const [heightFt, setHeightFt] = useState("");
  const [heightIn, setHeightIn] = useState("");
  const [weightLbs, setWeightLbs] = useState("");
  const [result, setResult] = useState<{
    bmi: number;
    category: Category;
    healthyLow: number;
    healthyHigh: number;
    diff: number;
    markerLeft: number;
  } | null>(null);
  const [error, setError] = useState("");

  function calculate() {
    setError("");
    let heightM: number;
    let weightKgVal: number;

    if (unit === "metric") {
      const h = parseFloat(heightCm);
      const w = parseFloat(weightKg);
      if (!h || !w || h < 50 || h > 300 || w < 10) {
        setError("Please enter valid height and weight.");
        return;
      }
      heightM = h / 100;
      weightKgVal = w;
    } else {
      const ft = parseFloat(heightFt) || 0;
      const ins = parseFloat(heightIn) || 0;
      const lbs = parseFloat(weightLbs);
      if (!lbs || (!ft && !ins)) {
        setError("Please enter valid height and weight.");
        return;
      }
      heightM = (ft * 12 + ins) * 0.0254;
      weightKgVal = lbs * 0.453592;
    }

    const bmi = weightKgVal / (heightM * heightM);
    const category = getCategory(bmi);
    const healthyLow = 18.5 * heightM * heightM;
    const healthyHigh = 24.9 * heightM * heightM;
    const target = category === "underweight" ? healthyLow : healthyHigh;
    const diff = Math.abs(weightKgVal - target);

    setResult({
      bmi,
      category,
      healthyLow,
      healthyHigh,
      diff,
      markerLeft: getMarkerLeft(bmi),
    });
  }

  const cat = result ? CATEGORIES[result.category] : null;

  const formatWeight = (kg: number) =>
    unit === "metric"
      ? `${kg.toFixed(1)} kg`
      : `${(kg * 2.20462).toFixed(1)} lbs`;

  return (
    <main className="min-h-screen bg-stone-50 py-12 px-4">
      <div className="max-w-lg mx-auto mb-6">
        <Navbar />
      </div>
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-medium text-stone-800 mb-1">
            BMI Calculator
          </h1>
          <p className="text-sm text-stone-500">
            Get your body mass index with personalised health guidance
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm">
          {/* Unit Toggle */}
          <div className="flex rounded-lg border border-stone-200 overflow-hidden w-fit mb-6">
            {(["metric", "imperial"] as Unit[]).map((u) => (
              <button
                key={u}
                onClick={() => { setUnit(u); setResult(null); setError(""); }}
                className={`px-5 py-2 text-sm transition-colors capitalize ${
                  unit === u
                    ? "bg-stone-100 text-stone-800 font-medium"
                    : "text-stone-400 hover:text-stone-600"
                }`}
              >
                {u}
              </button>
            ))}
          </div>

          {/* Inputs */}
          {unit === "metric" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
              <div>
                <label className="block text-xs text-stone-400 mb-1">Height (cm)</label>
                <input
                  type="number"
                  placeholder="e.g. 170"
                  value={heightCm}
                  onChange={(e) => setHeightCm(e.target.value)}
                  className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm text-stone-800 focus:outline-none focus:border-stone-400"
                />
              </div>
              <div>
                <label className="block text-xs text-stone-400 mb-1">Weight (kg)</label>
                <input
                  type="number"
                  placeholder="e.g. 70"
                  value={weightKg}
                  onChange={(e) => setWeightKg(e.target.value)}
                  className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm text-stone-800 focus:outline-none focus:border-stone-400"
                />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
              <div>
                <label className="block text-xs text-stone-400 mb-1">Feet</label>
                <input
                  type="number"
                  placeholder="5"
                  value={heightFt}
                  onChange={(e) => setHeightFt(e.target.value)}
                  className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm text-stone-800 focus:outline-none focus:border-stone-400"
                />
              </div>
              <div>
                <label className="block text-xs text-stone-400 mb-1">Inches</label>
                <input
                  type="number"
                  placeholder="7"
                  value={heightIn}
                  onChange={(e) => setHeightIn(e.target.value)}
                  className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm text-stone-800 focus:outline-none focus:border-stone-400"
                />
              </div>
              <div>
                <label className="block text-xs text-stone-400 mb-1">Pounds (lbs)</label>
                <input
                  type="number"
                  placeholder="154"
                  value={weightLbs}
                  onChange={(e) => setWeightLbs(e.target.value)}
                  className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm text-stone-800 focus:outline-none focus:border-stone-400"
                />
              </div>
            </div>
          )}

          {error && (
            <p className="text-xs text-red-500 mb-4">{error}</p>
          )}

          <button
            onClick={calculate}
            className="w-full bg-stone-700 hover:bg-stone-800 text-white rounded-lg py-3 text-sm font-medium transition-colors"
          >
            Calculate my BMI
          </button>
        </div>

        {/* Result */}
        {result && cat && (
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm mt-4">
            {/* BMI number + category */}
            <div className="flex items-start justify-between mb-5">
              <div>
                <div className="text-5xl font-medium text-stone-800 leading-none">
                  {result.bmi.toFixed(1)}
                </div>
                <span
                  className="inline-block mt-2 px-3 py-1 rounded-md text-xs font-medium"
                  style={{ background: cat.bg, color: cat.color }}
                >
                  {cat.label}
                </span>
              </div>
            </div>

            {/* Range bar */}
            <div className="relative h-2 rounded-full mb-1 overflow-visible"
              style={{ background: "linear-gradient(to right, #378ADD 0%, #639922 25%, #1D9E75 42%, #BA7517 62%, #E24B4A 80%)" }}
            >
              <div
                className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-white shadow transition-all duration-500"
                style={{ left: `${result.markerLeft}%`, background: cat.color, transform: "translateX(-50%) translateY(-50%)" }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-stone-400 mb-5">
              <span>Underweight</span>
              <span>Normal</span>
              <span>Overweight</span>
              <span>Obese</span>
            </div>

            {/* Info tiles */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              <div className="bg-stone-50 rounded-xl p-3">
                <p className="text-xs text-stone-400 mb-1">Healthy weight range</p>
                <p className="text-sm font-medium text-stone-700">
                  {formatWeight(result.healthyLow)} – {formatWeight(result.healthyHigh)}
                </p>
              </div>
              <div className="rounded-xl p-3" style={{ background: cat.bg }}>
                <p className="text-xs mb-1" style={{ color: cat.color }}>
                  {result.category === "normal" ? "Status" : result.category === "underweight" ? "Weight to gain" : "Weight to lose"}
                </p>
                <p className="text-sm font-medium" style={{ color: cat.color }}>
                  {result.category === "normal" ? "✓ On track" : formatWeight(result.diff)}
                </p>
              </div>
            </div>

            {/* Health tips */}
            <div className="mb-5">
              <p className="text-xs font-medium text-stone-400 uppercase tracking-wide mb-3">
                Health tips for you
              </p>
              <ul className="space-y-2">
                {cat.tips.map((tip, i) => (
                  <li key={i} className="flex gap-2 text-sm text-stone-600 leading-relaxed">
                    <span className="text-stone-600 flex-shrink-0 mt-0.5">→</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>

            {/* Symptom box */}
            <div
              className="rounded-xl p-4"
              style={{ background: cat.bg, border: `1px solid ${cat.border}` }}
            >
              <p className="text-xs font-medium mb-1" style={{ color: cat.color }}>
                {cat.symptomTitle}
              </p>
              <p className="text-sm leading-relaxed" style={{ color: cat.color }}>
                {cat.symptomText}
              </p>
            </div>
          </div>
        )}

        {/* Disclaimer */}
        <p className="text-center text-xs text-stone-400 mt-6">
          This calculator is for informational purposes only and does not constitute medical advice.
        </p>
      </div>
    </main>
  );
}