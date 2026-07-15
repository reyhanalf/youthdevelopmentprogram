"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { useParams, useRouter } from "next/navigation";
import {
  Clock,
  BookOpen,
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle,
  Lightbulb,
  FileText,
  Target,
  Brain,
  Award,
  Share2,
  Globe,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

import materiData from "@/data/materi.json";
import { ARTICLES_CONTENT } from "@/data/materi-content";

// ── Markdown Parser Component ──────────────────────────────────────────────────
function MarkdownRenderer({ content }: { content: string }) {
  const blocks = content.split(/\n\s*\n/);

  return (
    <div className="space-y-6">
      {blocks.map((block, idx) => {
        const trimmed = block.trim();
        if (!trimmed) return null;

        // Check if it's a heading
        if (trimmed.startsWith("### ")) {
          return (
            <h3 key={idx} className="text-2xl font-bold mt-12 mb-4 text-on-surface">
              {trimmed.replace("### ", "")}
            </h3>
          );
        }
        if (trimmed.startsWith("## ")) {
          return (
            <h2 key={idx} className="text-3xl font-bold mt-12 mb-4 text-on-surface">
              {trimmed.replace("## ", "")}
            </h2>
          );
        }

        // Check if it's an image block: ![alt](src "caption")
        const imgMatch = trimmed.match(/^!\[(.*?)\]\((.*?)(?:\s+"(.*?)")?\)$/);
        if (imgMatch) {
          const alt = imgMatch[1];
          const src = imgMatch[2];
          const caption = imgMatch[3] || "";

          return (
            <div key={idx} className="my-12 p-8 bg-surface-container rounded-[32px] border border-outline-variant flex flex-col items-center text-center gap-6">
              <div className="w-full h-64 bg-white rounded-2xl overflow-hidden shadow-inner flex items-center justify-center">
                <img 
                  className="w-full h-full object-cover" 
                  alt={alt} 
                  src={src} 
                />
              </div>
              {caption && (
                <p className="text-sm text-outline font-medium italic">{caption}</p>
              )}
            </div>
          );
        }

        // Default: Paragraph with inline bold parsing (**bold**)
        const parts = trimmed.split(/(\*\*.*?\*\*)/g);
        return (
          <p key={idx} className="text-lg text-on-surface-variant leading-relaxed">
            {parts.map((part, partIdx) => {
              if (part.startsWith("**") && part.endsWith("**")) {
                return <strong key={partIdx}>{part.slice(2, -2)}</strong>;
              }
              return part;
            })}
          </p>
        );
      })}
    </div>
  );
}

export default function ArticleReader() {
  const params = useParams();
  const router = useRouter();
  const idStr = (params?.id as string) || "2";
  const idNum = parseInt(idStr) || 2;

  const [completed, setCompleted] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Load article content
  const meta = materiData.find((m) => m.id === idNum) || materiData[1];
  const content = ARTICLES_CONTENT[idStr] || ARTICLES_CONTENT["2"];
  
  const prevId = idNum > 1 ? String(idNum - 1) : undefined;
  const nextId = idNum < materiData.length ? String(idNum + 1) : undefined;

  const article = {
    ...meta,
    ...content,
    prevId,
    nextId,
  };

  // Update progress bar on scroll
  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
      setScrollProgress(scrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-surface font-sans text-on-surface min-h-screen flex flex-col">
      {/* Top Navigation Bar with Progress Bar */}
      <Navbar scrollProgress={scrollProgress} />

      {/* Main Content Area */}
      <main className="pt-32 pb-24 px-margin-mobile">
        <div className="max-w-[800px] mx-auto text-left">
          {/* Back button */}
          <Link href="/materi" className="inline-flex items-center gap-2 text-on-surface-variant hover:text-primary mb-8 font-semibold transition-colors">
            <ArrowLeft className="w-5 h-5" /> Kembali ke Materi
          </Link>

          {/* Illustration Header */}
          <div className="w-full h-[400px] rounded-[32px] overflow-hidden mb-12 shadow-sm relative group">
            <img
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              alt={article.title}
              src={article.image}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
            <div className="absolute bottom-8 left-8 text-white pr-8">
              {article.badge && (
                <span className="bg-primary-fixed text-on-primary-fixed px-4 py-1 rounded-full text-xs font-bold mb-4 inline-block uppercase tracking-wider">
                  {article.badge}
                </span>
              )}
              <span className="text-green-light block text-xs font-bold mb-2 uppercase tracking-widest">{article.category}</span>
              <h1 className="text-3xl md:text-4xl font-extrabold leading-tight mb-2">
                {article.title}
              </h1>
              <div className="flex items-center gap-4 opacity-90 text-sm">
                <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {article.readTime}</span>
                <span className="flex items-center gap-1"><BookOpen className="w-4 h-4" /> {article.type}</span>
              </div>
            </div>
          </div>

          {/* Reading Content Wrapper */}
          <article className="space-y-16">
            {/* Section: Ringkasan */}
            <section className="bg-white p-8 md:p-10 rounded-[24px] border border-border-subtle shadow-sm">
              <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-3">
                <FileText className="w-6 h-6" />
                Ringkasan
              </h2>
              <p className="text-lg md:text-xl text-on-surface-variant leading-relaxed italic font-medium">
                &quot;{article.summary}&quot;
              </p>
            </section>

            {/* Section: Tujuan Pembelajaran */}
            <section className="space-y-6">
              <h3 className="text-2xl font-bold text-on-surface flex items-center gap-3">
                <Target className="w-6 h-6 text-secondary" />
                Tujuan Pembelajaran
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {article.goals.map((goal, index) => (
                  <div key={index} className={`flex items-start gap-4 p-5 rounded-2xl border ${
                    index === 0 ? "bg-blue-light/10 border-blue-light/30" : "bg-green-light/10 border-green-light/30"
                  }`}>
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold text-white ${
                      index === 0 ? "bg-secondary" : "bg-primary"
                    }`}>
                      {index + 1}
                    </span>
                    <p className="text-base leading-relaxed text-on-surface-variant font-medium">{goal}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Section: Materi Utama */}
            <section className="prose prose-lg max-w-none text-on-surface-variant leading-loose space-y-6">
              <MarkdownRenderer content={article.contentMarkdown} />
            </section>

            {/* Section: Contoh Kasus */}
            {article.caseStudyTitle && (
              <section className="bg-dark-surface text-white p-10 rounded-[32px] relative overflow-hidden shadow-xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] -z-0"></div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <Lightbulb className="w-6 h-6 text-primary-fixed" />
                    {article.caseStudyTitle}
                  </h3>
                  <p className="text-base opacity-80 mb-6 leading-relaxed">
                    {article.caseStudyContent}
                  </p>
                  {article.caseStudySolution && (
                    <div className="p-6 bg-white/10 rounded-2xl border border-white/10 backdrop-blur-md">
                      <p className="font-semibold text-primary-fixed">Solusi Karir:</p>
                      <p className="text-sm opacity-95 mt-2 italic leading-relaxed">{article.caseStudySolution}</p>
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* Section: Refleksi Diri */}
            <section className="bg-amber-light/20 border-2 border-dashed border-amber-light/60 p-8 rounded-[24px]">
              <h3 className="text-2xl font-bold text-tertiary mb-4 flex items-center gap-3">
                <Brain className="w-6 h-6 text-tertiary" />
                Refleksi Diri
              </h3>
              <p className="mb-6 leading-relaxed font-medium">Ambil waktu sejenak untuk memikirkan dua pertanyaan ini:</p>
              <ul className="space-y-4">
                {article.reflectionQuestions.map((question, index) => (
                  <li key={index} className="flex gap-3 items-start">
                    <CheckCircle className="w-5 h-5 text-tertiary shrink-0 mt-1" />
                    <span className="leading-relaxed font-medium">{question}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Section: Kesimpulan */}
            <section className="border-t border-outline-variant pt-12">
              <h3 className="text-2xl font-bold text-on-surface mb-6">Kesimpulan</h3>
              <p className="text-base text-on-surface-variant leading-relaxed mb-8">
                Minat dan bakat bukanlah dua hal yang harus dipilih salah satu, melainkan komponen yang saling melengkapi. Dengan mengenali minat Anda, Anda menemukan energi. Dengan mengenali bakat Anda, Anda menemukan efisiensi. Gabungkan keduanya untuk membangun masa depan yang tidak hanya sukses, tapi juga bermakna.
              </p>
              <div className="flex flex-col items-center justify-center p-8 bg-surface-bright border border-primary-container/30 rounded-[32px] gap-6 text-center shadow-sm">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors ${
                  completed ? "bg-primary text-white" : "bg-primary-container text-on-primary-container"
                }`}>
                  <Check className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-2xl font-bold mb-2">Selesai Membaca?</h4>
                  <p className="text-on-surface-variant">Pastikan Anda telah memahami poin-poin di atas sebelum melanjutkan ke modul berikutnya.</p>
                </div>
                <button
                  onClick={() => setCompleted(!completed)}
                  className={`w-full md:w-auto px-12 py-4 rounded-full font-bold transition-all shadow-lg flex items-center justify-center gap-2 active:scale-95 ${
                    completed
                      ? "bg-green-dark text-white hover:bg-green-700"
                      : "bg-primary text-white hover:bg-primary-container hover:text-on-primary-container"
                  }`}
                >
                  {completed ? "✓ Sudah Selesai" : "Tandai Sudah Selesai"}
                </button>
              </div>
            </section>
          </article>

          {/* Bottom Navigation */}
          <div className="mt-20 flex flex-col md:flex-row justify-between items-center gap-6 border-t border-outline-variant pt-10">
            {article.prevId ? (
              <button
                onClick={() => router.push(`/materi/${article.prevId}`)}
                className="w-full md:w-auto flex items-center justify-center gap-3 px-6 py-3 rounded-xl border border-border-subtle text-on-surface-variant hover:bg-bg-soft transition-all font-semibold active:scale-95"
              >
                <ArrowLeft className="w-5 h-5" /> Materi Sebelumnya
              </button>
            ) : (
              <div className="hidden md:block"></div>
            )}
            {article.nextId ? (
              <button
                onClick={() => router.push(`/materi/${article.nextId}`)}
                className="w-full md:w-auto flex items-center justify-center gap-3 px-6 py-3 rounded-xl bg-secondary-container text-on-secondary-container hover:shadow-md hover:scale-[1.02] transition-all font-semibold active:scale-95"
              >
                Materi Selanjutnya <ArrowRight className="w-5 h-5" />
              </button>
            ) : (
              <div className="hidden md:block"></div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-dark-surface to-inverse-surface border-t border-white/10 py-16 px-margin-mobile mt-auto text-left">
        <div className="max-w-container-max mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col gap-4 text-center md:text-left">
            <span className="text-3xl font-extrabold text-green-light">YDP</span>
            <p className="text-surface-variant/80 max-w-sm">© 2024 Youth Development Program. Nurturing highland talent for a digital future.</p>
          </div>
          <div className="flex gap-8 flex-wrap justify-center font-medium">
            <a className="text-surface-variant/80 hover:text-white transition-colors hover:underline" href="#">About Us</a>
            <a className="text-surface-variant/80 hover:text-white transition-colors hover:underline" href="#">Village Profile</a>
            <a className="text-surface-variant/80 hover:text-white transition-colors hover:underline" href="#">Privacy Policy</a>
            <a className="text-surface-variant/80 hover:text-white transition-colors hover:underline" href="#">Contact Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
