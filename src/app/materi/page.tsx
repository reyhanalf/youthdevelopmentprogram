"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import {
  Map,
  Search,
  Clock,
  BookOpen,
  User,
  Compass,
  Briefcase,
  HelpCircle,
  Mail,
  MapPin,
  Phone,
  Share2,
  Globe,
  UserCheck,
  Sparkles,
  Flag,
  CalendarDays,
  ChevronRight,
  BookOpenCheck,
} from "lucide-react";

import materiData from "@/data/materi.json";

// Types
interface Article {
  id: number;
  category: string;
  tag: string;
  badge?: string;
  title: string;
  description: string;
  readTime: string;
  type: string;
  targetGroup: string;
  image: string;
}

const ARTICLES: Article[] = materiData as Article[];

export default function Library() {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredArticles = useMemo(() => {
    return ARTICLES.filter((article) => {
      const matchesCategory =
        activeCategory === "Semua" || article.category === activeCategory;
      const matchesSearch =
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.tag.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="bg-background font-sans text-on-surface overflow-x-hidden min-h-screen flex flex-col">
      {/* Navigation */}
      <Navbar />

      {/* Header Section */}
      <header className="pt-40 pb-20 bg-white">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-center">
          <div className="inline-block px-4 py-1.5 bg-primary-container text-primary rounded-full font-bold text-[13px] mb-6 tracking-wide uppercase">
            Perpustakaan Belajar
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-on-surface mb-6 tracking-tight">
            Jelajahi Potensimu
          </h1>
          <p className="text-lg md:text-xl text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
            Bacaan singkat untuk membantu mengenal diri, menemukan minat, dan merencanakan masa depanmu.
          </p>
        </div>
      </header>

      {/* Section 1: Mulai Dari Sini (Visual Journey) */}
      <section className="py-20 bg-white border-b border-slate-100 overflow-hidden">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="flex items-center gap-3 mb-12 justify-center md:justify-start">
            <Map className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold">Mulai Dari Sini</h2>
          </div>
          <div className="relative">
            {/* Journey Line Desktop */}
            <div className="hidden lg:block absolute top-[40px] left-10 right-10 h-0.5 border-t-2 border-dashed border-primary/20 z-0"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 relative z-10">
              {/* Step 1 */}
              <div className="flex flex-col items-center text-center group">
                <div className="w-20 h-20 bg-white border-4 border-primary rounded-3xl flex items-center justify-center mb-4 shadow-xl shadow-primary/5 group-hover:scale-110 transition-transform">
                  <User className="w-10 h-10 text-primary font-bold" />
                </div>
                <span className="text-xs font-bold text-primary mb-1 uppercase tracking-widest">Langkah 1</span>
                <h3 className="font-bold text-lg mb-2">Mengenal Diri Sendiri</h3>
              </div>
              {/* Step 2 */}
              <div className="flex flex-col items-center text-center group">
                <div className="w-20 h-20 bg-white border-4 border-primary rounded-3xl flex items-center justify-center mb-4 shadow-xl shadow-primary/5 group-hover:scale-110 transition-transform">
                  <Sparkles className="w-10 h-10 text-primary font-bold" />
                </div>
                <span className="text-xs font-bold text-primary mb-1 uppercase tracking-widest">Langkah 2</span>
                <h3 className="font-bold text-lg mb-2">Menentukan Minat &amp; Bakat</h3>
              </div>
              {/* Step 3 */}
              <div className="flex flex-col items-center text-center group">
                <div className="w-20 h-20 bg-white border-4 border-primary rounded-3xl flex items-center justify-center mb-4 shadow-xl shadow-primary/5 group-hover:scale-110 transition-transform">
                  <Briefcase className="w-10 h-10 text-primary font-bold" />
                </div>
                <span className="text-xs font-bold text-primary mb-1 uppercase tracking-widest">Langkah 3</span>
                <h3 className="font-bold text-lg mb-2">Mengenal Berbagai Profesi</h3>
              </div>
              {/* Step 4 */}
              <div className="flex flex-col items-center text-center group">
                <div className="w-20 h-20 bg-white border-4 border-primary rounded-3xl flex items-center justify-center mb-4 shadow-xl shadow-primary/5 group-hover:scale-110 transition-transform">
                  <Flag className="w-10 h-10 text-primary font-bold" />
                </div>
                <span className="text-xs font-bold text-primary mb-1 uppercase tracking-widest">Langkah 4</span>
                <h3 className="font-bold text-lg mb-2">Menentukan Tujuan</h3>
              </div>
              {/* Step 5 */}
              <div className="flex flex-col items-center text-center group">
                <div className="w-20 h-20 bg-white border-4 border-primary rounded-3xl flex items-center justify-center mb-4 shadow-xl shadow-primary/5 group-hover:scale-110 transition-transform">
                  <CalendarDays className="w-10 h-10 text-primary font-bold" />
                </div>
                <span className="text-xs font-bold text-primary mb-1 uppercase tracking-widest">Langkah 5</span>
                <h3 className="font-bold text-lg mb-2">Menyusun Rencana</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Reading Library */}
      <section className="py-24 bg-background">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          {/* Filters */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-16 gap-8">
            <div className="flex gap-3 overflow-x-auto pb-4 lg:pb-0 no-scrollbar">
              <button
                className={`whitespace-nowrap px-6 py-3 rounded-2xl font-bold transition-all shadow-md ${
                  activeCategory === "Semua"
                    ? "bg-primary text-white shadow-primary/20"
                    : "bg-white border border-slate-200 text-on-surface-variant hover:border-primary hover:text-primary"
                }`}
                onClick={() => setActiveCategory("Semua")}
              >
                Semua Materi
              </button>
              <button
                className={`whitespace-nowrap px-6 py-3 rounded-2xl font-bold transition-all ${
                  activeCategory === "Mengenal Diri"
                    ? "bg-primary text-white shadow-md shadow-primary/20"
                    : "bg-white border border-slate-200 text-on-surface-variant hover:border-primary hover:text-primary"
                }`}
                onClick={() => setActiveCategory("Mengenal Diri")}
              >
                🌱 Mengenal Diri
              </button>
              <button
                className={`whitespace-nowrap px-6 py-3 rounded-2xl font-bold transition-all ${
                  activeCategory === "Menentukan Minat"
                    ? "bg-primary text-white shadow-md shadow-primary/20"
                    : "bg-white border border-slate-200 text-on-surface-variant hover:border-primary hover:text-primary"
                }`}
                onClick={() => setActiveCategory("Menentukan Minat")}
              >
                🎯 Menentukan Minat
              </button>
              <button
                className={`whitespace-nowrap px-6 py-3 rounded-2xl font-bold transition-all ${
                  activeCategory === "Menjelajahi Masa Depan"
                    ? "bg-primary text-white shadow-md shadow-primary/20"
                    : "bg-white border border-slate-200 text-on-surface-variant hover:border-primary hover:text-primary"
                }`}
                onClick={() => setActiveCategory("Menjelajahi Masa Depan")}
              >
                🧭 Menjelajahi Masa Depan
              </button>
            </div>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                className="w-full lg:w-72 pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                placeholder="Cari topik bacaan..."
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Reading Cards Grid */}
          {filteredArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {filteredArticles.map((article) => (
                <article key={article.id} className="bg-white rounded-3xl overflow-hidden card-shadow hover:-translate-y-2 transition-all duration-300 border border-slate-100 flex flex-col h-full text-left">
                  <div className="h-52 relative w-full">
                    <img alt={article.title} className="w-full h-full object-cover" src={article.image} />
                    {article.badge && (
                      <div className="absolute top-4 left-4 flex gap-2">
                        <span className={`px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-[10px] font-bold uppercase border ${
                          article.badge === "Baru" ? "text-secondary border-secondary/20" : "text-primary border-primary/20"
                        }`}>
                          {article.badge}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-8 flex flex-col flex-grow">
                    <div className={`text-xs font-bold mb-3 uppercase tracking-wider ${
                      article.category === "Mengenal Diri" ? "text-primary" : article.category === "Menentukan Minat" ? "text-secondary" : "text-amber-600"
                    }`}>
                      {article.tag}
                    </div>
                    <h3 className="text-2xl font-bold mb-3 leading-tight">{article.title}</h3>
                    <p className="text-on-surface-variant text-sm mb-6 flex-grow leading-relaxed">{article.description}</p>
                    <div className="flex flex-wrap gap-4 mb-8 text-[13px] text-on-surface-variant font-medium">
                      <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {article.readTime}</span>
                      <span className="flex items-center gap-1.5"><BookOpen className="w-4 h-4" /> {article.type}</span>
                      <span className="flex items-center gap-1.5"><UserCheck className="w-4 h-4" /> {article.targetGroup}</span>
                    </div>
                    <Link 
                      href={`/materi/${article.id}`}
                      className="w-full text-center py-4 rounded-2xl bg-bg-soft text-primary font-bold hover:bg-primary hover:text-white transition-all block"
                    >
                      Baca Sekarang
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-16 text-center card-shadow border border-slate-100 max-w-xl mx-auto">
              <BookOpenCheck className="w-16 h-16 text-slate-300 mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-3">Tidak Ada Materi Ditemukan</h3>
              <p className="text-on-surface-variant leading-relaxed">Topik atau kata kunci &quot;{searchQuery}&quot; tidak cocok dengan artikel kami. Silakan coba kata kunci lain.</p>
            </div>
          )}

          {/* View More */}
          <div className="mt-20 flex justify-center">
            <button className="px-10 py-4 border-2 border-slate-200 text-on-surface font-bold rounded-2xl hover:border-primary hover:text-primary transition-all flex items-center gap-2">
              Jelajahi Materi Lain
            </button>
          </div>
        </div>
      </section>

      {/* Section 3: Bottom CTA */}
      <section className="py-24 px-margin-mobile">
        <div className="max-w-container-max mx-auto bg-primary rounded-[3rem] overflow-hidden relative shadow-xl">
          {/* Pattern/Accents */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/20 rounded-full -ml-32 -mb-32 blur-3xl"></div>
          <div className="relative z-10 p-12 md:p-20 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-8">
              <HelpCircle className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">
              Belum Menemukan Minatmu?
            </h2>
            <p className="text-white/90 text-lg md:text-xl max-w-2xl mb-12 leading-relaxed">
              Setiap orang memiliki perjalanan yang berbeda untuk mengenali dirinya. Mulailah dengan assessment sederhana dan temukan potensi terbaikmu.
            </p>
            <div className="flex flex-col sm:flex-row gap-5">
              <button className="bg-white text-primary px-10 py-5 rounded-2xl font-bold hover:bg-slate-50 transition-all shadow-xl active:scale-95">
                Mulai Assessment
              </button>
              <button className="bg-white/10 text-white border border-white/20 px-10 py-5 rounded-2xl font-bold hover:bg-white/20 transition-all">
                Tanya Mentor
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-dark-surface to-inverse-surface py-20 px-margin-mobile md:px-margin-desktop border-t border-white/10 mt-auto text-left">
        <div className="max-w-container-max mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
            <div>
              <h2 className="text-3xl font-extrabold text-green-light mb-6">YDP</h2>
              <p className="text-surface-variant/80 mb-8 leading-relaxed">Program edukasi digital untuk membantu para pemuda mengenali potensi diri dan merencanakan masa depan.</p>
              <div className="flex gap-4">
                <a className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-primary transition-colors" href="#">
                  <Share2 className="w-5 h-5" />
                </a>
                <a className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-primary transition-colors" href="#">
                  <Globe className="w-5 h-5" />
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-white font-bold text-lg mb-6">Tentang</h4>
              <ul className="space-y-4">
                <li><a className="text-surface-variant/80 hover:text-white hover:underline transition-colors" href="#">Tentang Program</a></li>
                <li><a className="text-surface-variant/80 hover:text-white hover:underline transition-colors" href="#">Profil Desa</a></li>
                <li><a className="text-surface-variant/80 hover:text-white hover:underline transition-colors" href="#">Kontak</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold text-lg mb-6">Fitur Utama</h4>
              <ul className="space-y-4">
                <li><a className="text-surface-variant/80 hover:text-white hover:underline transition-colors" href="/">Eksplorasi Diri</a></li>
                <li><a className="text-surface-variant/80 hover:text-white hover:underline transition-colors" href="/materi">Materi Belajar</a></li>
                <li><a className="text-surface-variant/80 hover:text-white hover:underline transition-colors" href="#">Review CV</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold text-lg mb-6">Kontak</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-surface-variant/80">
                  <Mail className="w-5 h-5 text-primary-fixed shrink-0 mt-0.5" />
                  hello@tulungrejodev.id
                </li>
                <li className="flex items-start gap-3 text-surface-variant/80">
                  <MapPin className="w-5 h-5 text-primary-fixed shrink-0 mt-0.5" />
                  Kecamatan Bumiaji, Kota Batu, Jawa Timur
                </li>
                <li className="flex items-start gap-3 text-surface-variant/80">
                  <Phone className="w-5 h-5 text-primary-fixed shrink-0 mt-0.5" />
                  +62 812-3456-7890
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-white/10 gap-6">
            <p className="text-surface-variant/60 text-sm">© 2024 Youth Development Program. Nurturing highland talent for a digital future.</p>
            <div className="flex gap-8">
              <a className="text-surface-variant/60 text-sm hover:text-white transition-colors" href="#">Privacy Policy</a>
              <a className="text-surface-variant/60 text-sm hover:text-white transition-colors" href="#">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
