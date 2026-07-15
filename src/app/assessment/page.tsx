"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Send,
  ChevronLeft,
  Brain,
  Lightbulb,
  Info,
  Wrench,
  FlaskConical,
  Palette,
  Users,
  Rocket,
  ClipboardList,
  Compass,
  GraduationCap,
  CheckSquare,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import questionsData from "@/data/questions.json";

// ── Types ─────────────────────────────────────────────────────────────────────
type Category =
  | "Realistic"
  | "Investigative"
  | "Artistic"
  | "Social"
  | "Enterprising"
  | "Conventional";

interface Question {
  id: number;
  text: string;
  category: Category;
}

// ── Question Bank loaded from JSON ───────────────────────────────────────────
const questions: Question[] = questionsData as Question[];

// ── Likert Options ────────────────────────────────────────────────────────────
interface LikertOption {
  value: number;
  label: string;
}

const likertOptions: LikertOption[] = [
  { value: 1, label: "Sangat Tidak Sesuai" },
  { value: 2, label: "Tidak Sesuai" },
  { value: 3, label: "Netral" },
  { value: 4, label: "Sesuai" },
  { value: 5, label: "Sangat Sesuai" },
];

// ── Category display data ─────────────────────────────────────────────────────
const categoryMeta: Record<Category, { icon: LucideIcon; color: string }> = {
  Realistic: { icon: Wrench, color: "#006b2c" },
  Investigative: { icon: FlaskConical, color: "#006591" },
  Artistic: { icon: Palette, color: "#825100" },
  Social: { icon: Users, color: "#166534" },
  Enterprising: { icon: Rocket, color: "#0369a1" },
  Conventional: { icon: ClipboardList, color: "#3e4a3d" },
};

// ── Segment metadata ──────────────────────────────────────────────────────────
interface SegmentMeta {
  title: string;
  icon: LucideIcon;
}

// ── Option Styling Helper ─────────────────────────────────────────────────────
const getOptionStyles = (value: number) => {
  switch (value) {
    case 1: // Sangat Tidak Sesuai (Red)
      return {
        unselected: "border-red-300 bg-red-50/50 text-red-500",
        selected: "border-red-500 bg-red-500 text-white shadow-lg shadow-red-500/20"
      };
    case 2: // Tidak Sesuai (Orange)
      return {
        unselected: "border-orange-300 bg-orange-50/50 text-orange-500",
        selected: "border-orange-500 bg-orange-500 text-white shadow-lg shadow-orange-500/20"
      };
    case 3: // Netral (Slate/Grey)
      return {
        unselected: "border-slate-300 bg-slate-50 text-slate-500",
        selected: "border-slate-500 bg-slate-500 text-white shadow-lg shadow-slate-500/20"
      };
    case 4: // Sesuai (Green)
      return {
        unselected: "border-emerald-300 bg-emerald-50/50 text-emerald-600",
        selected: "border-emerald-500 bg-emerald-500 text-white shadow-lg shadow-emerald-500/20"
      };
    case 5: // Sangat Sesuai (Teal)
      return {
        unselected: "border-teal-300 bg-teal-50/50 text-teal-600",
        selected: "border-teal-500 bg-teal-500 text-white shadow-lg shadow-teal-500/20"
      };
    default:
      return {
        unselected: "border-slate-300 bg-slate-50 text-slate-500",
        selected: "border-slate-500 bg-slate-500 text-white shadow-lg shadow-slate-500/20"
      };
  }
};

// ── Component ─────────────────────────────────────────────────────────────────
export default function AssessmentPage() {
  const router = useRouter();
  const [showStartScreen, setShowStartScreen] = useState(true);
  const [studentName, setStudentName] = useState("");
  const [activePage, setActivePage] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<"forward" | "backward">("forward");

  const totalQuestions = questions.length;
  const questionsPerPage = 5;
  const totalPages = Math.ceil(totalQuestions / questionsPerPage);

  const startIndex = activePage * questionsPerPage;
  const currentPageQuestions = questions.slice(startIndex, startIndex + questionsPerPage);

  const isFirstPage = activePage === 0;
  const isLastPage = activePage === totalPages - 1;

  const answeredCount = Object.keys(answers).length;
  const allAnswered = answeredCount === totalQuestions;
  const isPageComplete = currentPageQuestions.every((q) => answers[q.id] !== undefined);
  const progress = (answeredCount / totalQuestions) * 100;



  // ── Handlers ────────────────────────────────────────────────────────────────
  const navigatePage = (dir: "forward" | "backward") => {
    if (animating) return;
    setDirection(dir);
    setAnimating(true);
    setTimeout(() => {
      if (dir === "forward") {
        setActivePage((p) => Math.min(p + 1, totalPages - 1));
      } else {
        setActivePage((p) => Math.max(p - 1, 0));
      }
      setAnimating(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 300);
  };

  const handleSubmit = () => {
    // ── Step 1: Count questions per category ──────────────────────────────────
    const categoryCounts: Record<Category, number> = {
      Realistic: 0, Investigative: 0, Artistic: 0,
      Social: 0, Enterprising: 0, Conventional: 0,
    };
    questions.forEach((q) => {
      categoryCounts[q.category]++;
    });

    // ── Step 2: Compute raw total scores per category ─────────────────────────
    const totalScores: Record<Category, number> = {
      Realistic: 0, Investigative: 0, Artistic: 0,
      Social: 0, Enterprising: 0, Conventional: 0,
    };
    questions.forEach((q) => {
      if (answers[q.id]) totalScores[q.category] += answers[q.id];
    });

    // ── Step 3: Person-Mean Centering (removes acquiescence bias) ─────────────
    // Calculate the respondent's overall mean score across ALL answers.
    // Then subtract (mean × questions_in_category) from each category total.
    // This way, a category only "wins" if it's genuinely higher than the
    // person's own baseline — not just because they rated everything high.
    const totalAnswerSum = Object.values(answers).reduce((a, b) => a + b, 0);
    const totalAnsweredCount = Object.values(answers).length;
    const personMean = totalAnswerSum / totalAnsweredCount; // overall mean per question

    const centeredScores = {} as Record<Category, number>;
    (Object.keys(totalScores) as Category[]).forEach((cat) => {
      const count = categoryCounts[cat] || 1;
      // Centered score = raw sum - (person's mean × number of questions in category)
      centeredScores[cat] = totalScores[cat] - (personMean * count);
    });

    // ── Step 4: Determine dominant category from centered scores ──────────────
    const dominant = (Object.entries(centeredScores) as [Category, number][])
      .sort(([, a], [, b]) => b - a)[0][0];

    // ── Step 5: Scale raw totals to max-20 for visual display on hasil page ───
    // (Display uses raw totals scaled to 20; centered scores only used for ranking)
    const scaledScores = {} as Record<Category, number>;
    (Object.keys(totalScores) as Category[]).forEach((cat) => {
      const count = categoryCounts[cat] || 1;
      const avg = totalScores[cat] / count; // normalized avg (1–5 scale)
      scaledScores[cat] = Math.round(avg * 4); // 5.0 × 4 = 20 max
    });

    // ── Step 6: Navigate to hasil page ────────────────────────────────────────
    const params = new URLSearchParams({
      result: dominant,
      name: studentName,
      ...Object.fromEntries(
        Object.entries(scaledScores).map(([k, v]) => [k, String(v)])
      ),
    });
    router.push(`/assessment/hasil?${params.toString()}`);
  };

  if (showStartScreen) {
    return (
      <div className="min-h-screen" style={{ background: "var(--color-background)" }}>
        {/* ── Glassmorphic Nav ── */}
        <nav
          className="fixed top-0 left-0 right-0 z-50 border-b"
          style={{
            background: "rgba(255,255,255,0.72)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderColor: "rgba(255,255,255,0.5)",
          }}
        >
          <div className="max-w-6xl mx-auto px-5 md:px-12 h-16 flex items-center justify-between relative">
            <Link
              href="/"
              className="flex items-center gap-1 text-sm font-semibold transition-colors z-10"
              style={{ color: "var(--color-on-surface-variant)" }}
            >
              <ChevronLeft size={18} />
              <span className="hidden sm:inline">Kembali ke Beranda</span>
            </Link>

            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="flex items-center gap-2 pointer-events-auto">
                <Brain size={18} style={{ color: "var(--color-primary)" }} />
                <span className="font-bold text-sm" style={{ color: "var(--color-primary)" }}>
                  Asesmen Minat & Bakat
                </span>
              </div>
            </div>

            <div className="w-8 sm:w-16"></div>
          </div>
        </nav>

        {/* ── Main Content ── */}
        <main className="pt-28 pb-24 px-5 md:px-12">
          <div className="max-w-2xl mx-auto">
            {/* ── Page Header ── */}
            <div className="text-center mb-8">
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-3"
                style={{
                  background: "var(--color-green-light)",
                  color: "var(--color-green-dark)",
                }}
              >
                <Lightbulb size={13} />
                Persiapan Asesmen
              </div>
              <h1
                className="text-3xl md:text-4xl font-extrabold leading-tight mb-2"
                style={{ color: "var(--color-on-surface)", letterSpacing: "-0.02em" }}
              >
                Pemetaan Minat &amp; Bakat (RIASEC)
              </h1>
              <p className="text-sm md:text-base" style={{ color: "var(--color-on-surface-variant)" }}>
                Sebelum memulai, pahami petunjuk dan cara pengerjaan kuis berikut agar hasil rekomendasimu lebih akurat.
              </p>
            </div>

            {/* ── Instruction Card ── */}
            <div className="bg-white rounded-[32px] p-8 md:p-10 border border-outline-variant shadow-xl space-y-6">
              {/* Quick Info Grid */}
              <div className="grid grid-cols-2 gap-4 pb-6 border-b border-border-subtle">
                <div className="flex items-center gap-3 p-4 rounded-2xl bg-surface-variant/40">
                  <span className="text-2xl">⏱️</span>
                  <div>
                    <p className="text-xs text-on-surface-variant font-medium">Estimasi Waktu</p>
                    <p className="text-sm font-bold text-on-surface">~60 Menit</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-2xl bg-surface-variant/40">
                  <span className="text-2xl">📝</span>
                  <div>
                    <p className="text-xs text-on-surface-variant font-medium">Jumlah Soal</p>
                    <p className="text-sm font-bold text-on-surface">60 Pertanyaan</p>
                  </div>
                </div>
              </div>

              {/* Instructions List */}
              <div className="space-y-5">
                <h3 className="font-bold text-base text-on-surface">Tata Cara &amp; Aturan Pengerjaan:</h3>

                <div className="flex gap-4 items-start">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-on-surface">Jujur pada Diri Sendiri</h4>
                    <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                      Pilihlah opsi jawaban yang paling menggambarkan dirimu yang sebenarnya, bukan opsi yang dirasa "paling hebat" atau ideal di mata orang lain.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-on-surface">Tidak Ada Jawaban Salah</h4>
                    <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                      Semua jawaban adalah benar dan menggambarkan keunikan potensimu. Isi dengan santai, percaya diri, dan tanpa keraguan.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-on-surface">Skala Penilaian Likert</h4>
                    <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                      Anda akan memilih salah satu tingkat kesesuaian dari **Sangat Tidak Sesuai** hingga **Sangat Sesuai** untuk setiap aktivitas kuis.
                    </p>
                  </div>
                </div>
              </div>

              {/* Input Nama Siswa */}
              <div className="pt-4 border-t border-border-subtle">
                <label className="block text-xs font-bold text-on-surface-variant mb-2 uppercase tracking-wider">
                  Nama Lengkap Siswa
                </label>
                <input
                  type="text"
                  required
                  placeholder="Masukkan nama lengkap Anda..."
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="w-full px-5 py-4 rounded-2xl border border-outline-variant bg-surface focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm font-semibold"
                />
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <button
                  disabled={!studentName.trim()}
                  onClick={() => {
                    if (!studentName.trim()) return;
                    setShowStartScreen(false);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="w-full py-4.5 rounded-2xl font-bold text-base text-white transition-all duration-200 hover:scale-[1.02] active:scale-95 shadow-xl flex items-center justify-center gap-2"
                  style={{
                    background: studentName.trim() ? "var(--color-primary)" : "var(--color-outline)",
                    cursor: studentName.trim() ? "pointer" : "not-allowed",
                    boxShadow: studentName.trim() ? "0 8px 30px var(--color-primary-light)" : "none",
                  }}
                >
                  <span>Mulai Asesmen Sekarang</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "var(--color-background)" }}>
      {/* ── Glassmorphic Nav ── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 border-b"
        style={{
          background: "rgba(255,255,255,0.72)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderColor: "rgba(255,255,255,0.5)",
        }}
      >
        <div className="max-w-6xl mx-auto px-5 md:px-12 h-16 flex items-center justify-between relative">
          <Link
            href="/"
            className="flex items-center gap-1 text-sm font-semibold transition-colors z-10"
            style={{ color: "var(--color-on-surface-variant)" }}
          >
            <ChevronLeft size={18} />
            <span className="hidden sm:inline">Kembali ke Beranda</span>
          </Link>

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="flex items-center gap-2 pointer-events-auto">
              <Brain size={18} style={{ color: "var(--color-primary)" }} />
              <span className="font-bold text-sm" style={{ color: "var(--color-primary)" }}>
                Asesmen Minat & Bakat
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* ── Main Content ── */}
      <main className="pt-24 pb-24 px-5 md:px-12">
        <div className="max-w-3xl mx-auto">
          {/* ── Page Header ── */}
          <div className="text-center mb-8">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-3"
              style={{
                background: "var(--color-green-light)",
                color: "var(--color-green-dark)",
              }}
            >
              <Lightbulb size={13} />
              Kenali Potensimu
            </div>
            <h1
              className="text-3xl md:text-4xl font-extrabold leading-tight mb-2"
              style={{ color: "var(--color-on-surface)", letterSpacing: "-0.02em" }}
            >
              Asesmen Minat & Bakat
            </h1>
            <p className="text-sm md:text-base" style={{ color: "var(--color-on-surface-variant)" }}>
              Kenali potensi, minat, dan bakatmu untuk merencanakan masa depan pendidikan dan karier sejak dini!
            </p>
          </div>

          {/* ── Progress & Segment Indicators ── */}
          <div className="mb-8 bg-white/50 backdrop-blur-md p-6 rounded-3xl border border-white/60 shadow-sm">
            <div className="text-center mb-3">
              <span className="font-extrabold text-sm text-primary">
                {Math.round(progress)}% Selesai
              </span>
            </div>
            <div
              className="w-full h-3 rounded- overflow-hidden mb-4"
              style={{ background: "var(--color-surface-variant)" }}
            >
              <div
                className="h-full rounded-full transition-all duration-500 ease-out"
                style={{
                  width: `${Math.max(progress, 3)}%`,
                  background: "linear-gradient(90deg, var(--color-primary) 0%, #0284c7 100%)",
                }}
              />
            </div>
          </div>

          {/* ── Questions Card with transition ── */}
          <div
            className="rounded-[32px] overflow-hidden mb-6"
            style={{
              background: "rgba(255,255,255,0.85)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.6)",
              boxShadow: "0 8px 40px rgba(0,0,0,0.03), 0 2px 12px rgba(0,0,0,0.02)",
              opacity: animating ? 0 : 1,
              transform: animating
                ? `translateX(${direction === "forward" ? "-25px" : "25px"})`
                : "translateX(0)",
              transition: "opacity 0.3s ease, transform 0.3s ease",
            }}
          >
            <div className="p-6 md:p-10 space-y-10">
              {currentPageQuestions.map((q, qIndex) => {
                const answer = answers[q.id];
                return (
                  <div key={q.id} className="pb-8 border-b border-outline-variant last:border-b-0 last:pb-0">

                    {/* Question text */}
                    <h3
                      className="text-base md:text-lg font-bold leading-snug mb-6"
                      style={{ color: "var(--color-on-surface)" }}
                    >
                      {q.text}
                    </h3>

                    {/* Likert Options */}
                    <div className="flex justify-between items-start gap-1 xs:gap-2 sm:gap-4 px-1 py-2 w-full">
                      {likertOptions.map((opt) => {
                        const isSelected = answer === opt.value;
                        const optStyles = getOptionStyles(opt.value);
                        return (
                          <button
                            key={opt.value}
                            onClick={() => {
                              setAnswers((prev) => ({ ...prev, [q.id]: opt.value }));
                            }}
                            className="flex flex-col items-center flex-1 min-w-0 group cursor-pointer focus:outline-none"
                          >
                            <span
                              className={`w-10 h-10 xs:w-11 xs:h-11 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-xs xs:text-sm sm:text-base font-bold border-2 transition-all duration-200 group-active:scale-95 group-hover:scale-105 ${isSelected ? optStyles.selected : optStyles.unselected
                                }`}
                            >
                              {opt.value}
                            </span>
                            <span
                              className={`mt-2 text-[9px] xs:text-[10px] sm:text-xs font-semibold text-center leading-tight transition-colors duration-200 break-words max-w-[60px] xs:max-w-[70px] sm:max-w-[95px] ${isSelected
                                ? "text-slate-800 font-bold"
                                : "text-slate-400 group-hover:text-slate-600"
                                }`}
                            >
                              {opt.label}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Navigation Bottom Bar ── */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
            <button
              onClick={() => navigatePage("backward")}
              disabled={isFirstPage}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl font-semibold text-sm transition-all duration-200 border"
              style={{
                borderColor: isFirstPage ? "var(--color-outline-variant)" : "var(--color-outline-variant)",
                color: isFirstPage ? "var(--color-outline)" : "var(--color-on-surface-variant)",
                background: isFirstPage ? "transparent" : "white",
                opacity: isFirstPage ? 0.4 : 1,
                cursor: isFirstPage ? "not-allowed" : "pointer",
              }}
            >
              <ArrowLeft size={16} />
              Sebelumnya
            </button>

            {isLastPage ? (
              <button
                onClick={handleSubmit}
                disabled={!allAnswered}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-10 py-3.5 rounded-2xl font-bold text-sm transition-all duration-200"
                style={{
                  background: allAnswered
                    ? "linear-gradient(135deg, var(--color-primary) 0%, #0284c7 100%)"
                    : "var(--color-outline-variant)",
                  color: "white",
                  cursor: allAnswered ? "pointer" : "not-allowed",
                  boxShadow: allAnswered ? "0 8px 20px rgba(0,107,44,0.15)" : "none",
                  transform: allAnswered ? "scale(1)" : "scale(0.98)",
                }}
              >
                <Send size={16} />
                {allAnswered ? "Kirim & Lihat Hasil Jurusan!" : `Jawab ${totalQuestions - answeredCount} soal lagi`}
              </button>
            ) : (
              <button
                onClick={() => navigatePage("forward")}
                disabled={!isPageComplete}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-10 py-3.5 rounded-2xl font-bold text-sm transition-all duration-200"
                style={{
                  background: isPageComplete
                    ? "linear-gradient(135deg, var(--color-primary) 0%, #0284c7 100%)"
                    : "var(--color-outline-variant)",
                  color: "white",
                  cursor: isPageComplete ? "pointer" : "not-allowed",
                  boxShadow: isPageComplete ? "0 8px 20px rgba(0,107,44,0.15)" : "none",
                }}
              >
                Lanjut Petualangan
                <ArrowRight size={16} />
              </button>
            )}
          </div>

          {/* ── Info Banner ── */}
          <div
            className="flex gap-3 items-start p-4 rounded-2xl"
            style={{
              background: "rgba(254,243,199,0.5)",
              border: "1px solid var(--color-amber-light)",
            }}
          >
            <Info size={16} className="mt-0.5 flex-shrink-0" style={{ color: "var(--color-tertiary)" }} />
            <p className="text-xs leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
              <strong>Tips Petualang Minat:</strong> Jawablah dengan santai dan jujur sesuai keadaanmu. Tidak ada pilihan yang salah atau buruk. Setiap segmen mengukur petualangan minat yang berbeda!
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
