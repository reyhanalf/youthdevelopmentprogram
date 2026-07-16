"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Compass,
  ClipboardList,
  BookOpen,
  FileText,
  Clock,
  Check,
  Award,
  Mail,
  MapPin,
  Phone,
  Share2,
  Globe,
  Brain,
  ArrowRight,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import materiData from "@/data/materi.json";

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

export default function Home() {
  const featuredArticles = ARTICLES.slice(0, 3);
  return (
    <div className="bg-surface font-sans text-on-surface overflow-x-hidden min-h-screen flex flex-col">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section className="hero-gradient pt-36 pb-20 px-margin-mobile md:px-margin-desktop min-h-screen flex items-center relative overflow-hidden">
        <div className="max-w-container-max mx-auto grid lg:grid-cols-2 gap-16 items-center w-full">
          <div className="z-10 text-left">
            <span className="inline-block px-4 py-1.5 bg-green-light text-primary font-bold text-xs tracking-wider rounded-full mb-6 uppercase">
              EDUKASI &amp; MASA DEPAN
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-on-surface mb-6 leading-tight tracking-tight">
              Kenali Potensimu, <br />
              <span className="text-primary">Siapkan Masa Depanmu.</span>
            </h1>
            <p className="text-lg md:text-xl text-on-surface-variant mb-10 max-w-xl leading-relaxed">
              Temukan minat, bakat, dan berbagai peluang masa depan melalui materi pembelajaran yang interaktif and assessment sederhana yang tervalidasi.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link href="/assessment" className="bg-primary text-on-primary px-10 py-5 rounded-2xl font-bold text-lg hover:scale-105 transition-transform duration-200 active:scale-95 shadow-lg shadow-primary/20 flex items-center justify-center gap-2">
                Mulai Eksplorasi Diri <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/materi" className="bg-white border border-border-subtle text-on-surface px-10 py-5 rounded-2xl font-bold text-lg hover:bg-surface-container transition-colors active:scale-95 flex items-center justify-center">
                Lihat Materi
              </Link>
            </div>
          </div>
          <div className="relative flex justify-center">
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-secondary-container rounded-full blur-3xl opacity-20"></div>
            <div className="bg-white p-6 rounded-[40px] shadow-2xl relative z-10 transform lg:rotate-2 hover:rotate-0 transition-transform duration-500 max-w-lg w-full">
              <img
                className="w-full h-auto rounded-[32px]"
                alt="Ilustrasi Eksplorasi Minat TDP"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB7RDKhd3bVN6DkqHlUz8N5GuOpmBpqre2ZpaOXb4avCCczGuC66ZNW-SsPtaJ70tI69GuSEMORJIBj1GsnjzBoAsk6xYA0oC3jBfUT3ixy5we1_BcvRN6G7b_tEFiQT5e4MtQdiQABnVR02e1VcMZ7CGTeksyL1d-sIEogKYbLXy63H4DIffk4TLZidZMp9ilStA056xtcDb3Doh2V1F03ovPZo29WdSeSh_rhKA9H_-ONG8pgAE8miUcolIW-mLWJzRurfM_Qw6o"
              />
            </div>
            <div className="absolute -bottom-8 -left-8 bg-white p-4 rounded-2xl shadow-xl z-20 flex items-center gap-4 animate-bounce">
              <div className="bg-primary-container p-2 rounded-xl text-on-primary-container">
                <Brain className="w-6 h-6 text-primary" />
              </div>
              <div className="text-left">
                <p className="font-extrabold text-sm">Update Terkini</p>
                <p className="text-xs text-on-surface-variant">Assessment Minat &amp; Bakat v2.0</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mulai Perjalananmu */}
      <section className="py-24 px-margin-mobile md:px-margin-desktop bg-white">
        <div className="max-w-container-max mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-on-surface mb-4">Mulai Perjalananmu</h2>
          <p className="text-lg md:text-xl text-on-surface-variant max-w-2xl mx-auto">Pilih langkah awal untuk mengenal dirimu lebih dalam melalui fitur unggulan kami.</p>
        </div>
        <div className="max-w-container-max mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Card 1 */}
          <div className="bg-surface rounded-[32px] p-8 card-shadow hover:-translate-y-2 transition-all duration-300 group flex flex-col justify-between text-left">
            <div>
              <div className="w-16 h-16 bg-green-light rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Compass className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Eksplorasi Diri</h3>
              <p className="text-on-surface-variant mb-8 leading-relaxed">Langkah pertama mengenal passion dan ketertarikanmu melalui panduan interaktif.</p>
            </div>
            <Link href="/assessment" className="text-primary font-bold flex items-center gap-2 group-hover:gap-4 transition-all w-fit">
              Selengkapnya <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          {/* Card 2 */}
          <div className="bg-surface rounded-[32px] p-8 card-shadow hover:-translate-y-2 transition-all duration-300 group border-2 border-primary/10 flex flex-col justify-between text-left">
            <div>
              <div className="w-16 h-16 bg-blue-light rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <ClipboardList className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Assessment Minat</h3>
              <p className="text-on-surface-variant mb-8 leading-relaxed">Uji minat dan bakatmu dengan instrumen psikologi yang menyenangkan dan akurat.</p>
            </div>
            <Link href="/assessment" className="text-primary font-bold flex items-center gap-2 group-hover:gap-4 transition-all w-fit">
              Mulai Sekarang <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          {/* Card 3 */}
          <div className="bg-surface rounded-[32px] p-8 card-shadow hover:-translate-y-2 transition-all duration-300 group flex flex-col justify-between text-left">
            <div>
              <div className="w-16 h-16 bg-amber-light rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <BookOpen className="w-8 h-8 text-tertiary" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Materi Belajar</h3>
              <p className="text-on-surface-variant mb-8 leading-relaxed">Perluas wawasan mengenai berbagai profesi dan jalur pendidikan di era digital.</p>
            </div>
            <Link href="/materi" className="text-primary font-bold flex items-center gap-2 group-hover:gap-4 transition-all w-fit">
              Lihat Modul <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          {/* Card 4 */}
          <div className="bg-surface rounded-[32px] p-8 card-shadow hover:-translate-y-2 transition-all duration-300 group flex flex-col justify-between text-left">
            <div>
              <div className="w-16 h-16 bg-surface-variant rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <FileText className="w-8 h-8 text-on-surface-variant" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Review CV</h3>
              <p className="text-on-surface-variant mb-8 leading-relaxed">Dapatkan masukan profesional untuk mempercantik profil dan pengalaman belajarmu.</p>
            </div>
            <Link href="#" className="text-primary font-bold flex items-center gap-2 group-hover:gap-4 transition-all w-fit">
              Ajukan Review <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Materi Pilihan */}
      <section className="py-24 px-margin-mobile md:px-margin-desktop overflow-hidden">
        <div className="max-w-container-max mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
            <div className="max-w-xl text-left">
              <h2 className="text-3xl md:text-5xl font-extrabold text-on-surface mb-4 font-sans">Materi Pilihan</h2>
              <p className="text-lg md:text-xl text-on-surface-variant">Bacaan kurasi untuk membantumu merancang masa depan.</p>
            </div>
            <Link className="flex text-primary font-bold items-center gap-2 group transition-all" href="/materi">
              Semua Materi <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
          <div className="flex gap-8 overflow-x-auto pb-8 scrollbar-hide no-scrollbar snap-x">
            {featuredArticles.map((article) => (
              <div key={article.id} className="min-w-[300px] sm:min-w-[380px] md:min-w-[450px] bg-white rounded-[32px] overflow-hidden card-shadow snap-start flex flex-col justify-between text-left">
                <div className="h-60 relative w-full">
                  <img
                    className="w-full h-full object-cover"
                    alt={article.title}
                    src={article.image}
                  />
                  {article.badge && (
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-4 py-2 rounded-full text-xs font-bold text-primary">
                      {article.badge}
                    </div>
                  )}
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 text-sm text-on-surface-variant mb-4 font-medium">
                    <Clock className="w-4 h-4" /> {article.readTime}
                    <span className="mx-2">•</span>
                    {article.category}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 hover:text-primary transition-colors line-clamp-2">{article.title}</h3>
                  <p className="text-on-surface-variant mb-6 line-clamp-2 leading-relaxed flex-grow">{article.description}</p>
                  <Link href={`/materi/${article.id}`} className="w-full py-4 bg-surface-container rounded-xl font-bold hover:bg-primary hover:text-on-primary transition-colors flex items-center justify-center">
                    Baca Sekarang
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Alur Belajarmu */}
      <section className="py-24 px-margin-mobile md:px-margin-desktop bg-surface-container-low">
        <div className="max-w-container-max mx-auto text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-extrabold text-on-surface mb-4">Alur Belajarmu</h2>
          <p className="text-lg md:text-xl text-on-surface-variant max-w-2xl mx-auto">Hanya 5 langkah sederhana untuk merancang masa depan yang cerah.</p>
        </div>
        <div className="max-w-5xl mx-auto relative px-4">
          {/* Connector Line (Desktop) */}
          <div className="hidden lg:block absolute top-10 left-10 right-10 h-1 bg-gradient-to-r from-primary/20 via-primary to-primary/20 z-0"></div>
          <div className="grid lg:grid-cols-5 gap-8 relative z-10">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center group">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-3xl font-extrabold text-primary mb-6 shadow-xl border-4 border-primary group-hover:scale-110 transition-transform">1</div>
              <h4 className="font-bold text-lg mb-2">Eksplorasi Diri</h4>
              <p className="text-on-surface-variant text-sm">Kenali apa yang kamu suka dan kuasai.</p>
            </div>
            {/* Step 2 */}
            <div className="flex flex-col items-center text-center group">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-3xl font-extrabold text-primary mb-6 shadow-xl border-4 border-primary group-hover:scale-110 transition-transform">2</div>
              <h4 className="font-bold text-lg mb-2">Assessment</h4>
              <p className="text-on-surface-variant text-sm">Kerjakan tes minat &amp; bakat singkat.</p>
            </div>
            {/* Step 3 */}
            <div className="flex flex-col items-center text-center group">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-3xl font-extrabold text-primary mb-6 shadow-xl border-4 border-primary group-hover:scale-110 transition-transform">3</div>
              <h4 className="font-bold text-lg mb-2">Lihat Hasil</h4>
              <p className="text-on-surface-variant text-sm">Dapatkan analisis mendalam potensimu.</p>
            </div>
            {/* Step 4 */}
            <div className="flex flex-col items-center text-center group">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-3xl font-extrabold text-primary mb-6 shadow-xl border-4 border-primary group-hover:scale-110 transition-transform">4</div>
              <h4 className="font-bold text-lg mb-2">Baca Materi</h4>
              <p className="text-on-surface-variant text-sm">Perdalam ilmu dari modul pilihan.</p>
            </div>
            {/* Step 5 */}
            <div className="flex flex-col items-center text-center group">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-3xl font-extrabold text-primary mb-6 shadow-xl border-4 border-primary group-hover:scale-110 transition-transform">5</div>
              <h4 className="font-bold text-lg mb-2">Masa Depan</h4>
              <p className="text-on-surface-variant text-sm">Siap melangkah dengan percaya diri.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Apa yang Akan Kamu Dapatkan */}
      <section className="py-24 px-margin-mobile md:px-margin-desktop bg-white">
        <div className="max-w-container-max mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <div className="text-left">
            <h2 className="text-3xl md:text-5xl font-extrabold text-on-surface mb-8">Apa yang Akan Kamu Dapatkan?</h2>
            <p className="text-lg md:text-xl text-on-surface-variant mb-12 leading-relaxed">Program ini dirancang bukan sekadar untuk memberi nilai, tapi untuk memberimu peta jalan menuju masa depan.</p>
            <div className="space-y-6">
              <div className="flex gap-6 p-6 rounded-2xl bg-surface hover:bg-green-light/20 transition-colors border border-transparent hover:border-primary/20">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center shrink-0">
                  <Check className="w-6 h-6 text-on-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Pemetaan Minat Dominan</h4>
                  <p className="text-on-surface-variant">Mengetahui 3 bidang karir utama yang paling sesuai dengan kepribadianmu.</p>
                </div>
              </div>
              <div className="flex gap-6 p-6 rounded-2xl bg-surface hover:bg-green-light/20 transition-colors border border-transparent hover:border-primary/20">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center shrink-0">
                  <Check className="w-6 h-6 text-on-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Analisis Kekuatan Diri</h4>
                  <p className="text-on-surface-variant">Penjelasan detail mengenai kelebihan alami yang bisa kamu asah lebih jauh.</p>
                </div>
              </div>
              <div className="flex gap-6 p-6 rounded-2xl bg-surface hover:bg-green-light/20 transition-colors border border-transparent hover:border-primary/20">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center shrink-0">
                  <Check className="w-6 h-6 text-on-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Rekomendasi Gaya Belajar</h4>
                  <p className="text-on-surface-variant">Tips cara belajar yang paling efektif berdasarkan tipe kecerdasanmu.</p>
                </div>
              </div>
              <div className="flex gap-6 p-6 rounded-2xl bg-surface hover:bg-green-light/20 transition-colors border border-transparent hover:border-primary/20">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center shrink-0">
                  <Check className="w-6 h-6 text-on-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Sertifikat &amp; Hasil PDF</h4>
                  <p className="text-on-surface-variant">Unduh rangkuman hasil assessment-mu untuk diskusi dengan orang tua atau guru.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="bg-blue-light/30 rounded-[48px] p-12 relative flex justify-center">
              <img
                className="w-full h-auto drop-shadow-2xl rounded-2xl max-w-md"
                alt="Hasil Analisis TDP"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBgxpmu4v-8CbdqusJB-7rbrCtOWoXUa6_P3ty4rgcC8RtT36KToLR1TXZDpbLbWzpAWwUyI7jgxAg0qBtLt1rA2WXyjBcgMkCGIjlEZmc4n64mNlDCeTXSdB3LmIzn5WPxNLn0EVXJx1ri2_1-Xoaxcx41E71ZIdnqsgilGT3mwab1IbuCEAFalKhPYq2T1WDPFnBtYg2Qm9mWIicCr2r5a-04xIQkIe_TvMZMGwPwxx5_p9KNaULPu-lKzDdA0ybhoD3QhcgSqPQ"
              />
              <div className="absolute -top-6 -right-6 bg-white p-6 rounded-[32px] shadow-2xl flex items-center gap-4">
                <div className="w-12 h-12 bg-amber-light rounded-full flex items-center justify-center shrink-0">
                  <Award className="w-6 h-6 text-tertiary" />
                </div>
                <div className="text-left">
                  <p className="font-bold">Lulus Assessment</p>
                  <p className="text-xs text-on-surface-variant">Capaian: Sangat Baik</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-margin-mobile md:px-margin-desktop">
        <div className="max-w-container-max mx-auto">
          <div className="bg-primary rounded-[48px] p-8 md:p-20 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-extrabold text-on-primary mb-6">Siap Mengenal Dirimu Lebih Baik?</h2>
              <p className="text-green-light/80 text-xl mb-12 leading-relaxed">Hanya butuh 10-15 menit untuk menemukan jawaban atas masa depanmu. Ayo mulai sekarang juga!</p>
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <Link href="/assessment" className="bg-white text-primary px-12 py-5 rounded-2xl font-bold text-xl hover:scale-105 transition-transform shadow-xl active:scale-95 flex items-center justify-center">
                  Mulai Eksplorasi Sekarang
                </Link>
                <button className="bg-transparent border-2 border-white/30 text-white px-12 py-5 rounded-2xl font-bold text-xl hover:bg-white/10 transition-colors">
                  Tanya Lewat WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-dark-surface to-inverse-surface py-20 px-margin-mobile md:px-margin-desktop border-t border-white/10 mt-auto text-left">
        <div className="max-w-container-max mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
            <div>
              <Link href="/">
                <h2 className="text-3xl font-extrabold text-green-light mb-6">YDP</h2>
              </Link>
              <p className="text-surface-variant/80 mb-8 leading-relaxed">Youth Development Program. Nurturing highland talent for a digital future.</p>
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
                <li><a className="text-surface-variant/80 hover:text-white hover:underline transition-colors" href="#">Visi &amp; Misi</a></li>
                <li><a className="text-surface-variant/80 hover:text-white hover:underline transition-colors" href="#">Profil Desa</a></li>
                <li><a className="text-surface-variant/80 hover:text-white hover:underline transition-colors" href="#">Tim Kami</a></li>
                <li><a className="text-surface-variant/80 hover:text-white hover:underline transition-colors" href="#">Testimoni</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold text-lg mb-6">Fitur Utama</h4>
              <ul className="space-y-4">
                <li><Link className="text-surface-variant/80 hover:text-white hover:underline transition-colors" href="/assessment">Eksplorasi Diri</Link></li>
                <li><Link className="text-surface-variant/80 hover:text-white hover:underline transition-colors" href="/assessment">Assessment Minat</Link></li>
                <li><Link className="text-surface-variant/80 hover:text-white hover:underline transition-colors" href="/materi">Materi Belajar</Link></li>
                <li><Link className="text-surface-variant/80 hover:text-white hover:underline transition-colors" href="#">Review CV Gratis</Link></li>
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
