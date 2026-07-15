"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Download,
  BookOpen,
  RefreshCw,
  ChevronRight,
  Sparkles,
  TrendingUp,
  Star,
  Heart,
  Zap,
  CheckCircle2,
  Mail,
  X,
  // Category icons
  Wrench,
  FlaskConical,
  Palette,
  Users,
  Rocket,
  ClipboardList,
  // Career icons
  Building2,
  Cog,
  Sprout,
  Stethoscope,
  Code2,
  Atom,
  Monitor,
  Film,
  PenLine,
  Brain,
  GraduationCap,
  HeartPulse,
  Briefcase,
  Scale,
  Megaphone,
  Calculator,
  Landmark,
  BarChart2,
  // Field / Subject icons
  Magnet,
  Hammer,
  Dna,
  Paintbrush,
  Globe,
  Languages,
  DollarSign,
  Laptop,
  // Decorative UI replacements
  Trophy,
  LineChart,
} from "lucide-react";
import { jsPDF } from "jspdf";
import type { LucideIcon } from "lucide-react";

type Category =
  | "Realistic"
  | "Investigative"
  | "Artistic"
  | "Social"
  | "Enterprising"
  | "Conventional";

// ── Icon Mappings ───────────────────────────────────────────────────────────────
const CATEGORY_ICONS: Record<Category, LucideIcon> = {
  Realistic:    Wrench,
  Investigative: FlaskConical,
  Artistic:     Palette,
  Social:       Users,
  Enterprising: Rocket,
  Conventional: ClipboardList,
};

const CAREER_ICONS: Record<string, LucideIcon> = {
  "Teknik Sipil & Arsitektur":    Building2,
  "Teknik Mesin & Otomotif":      Cog,
  "Pertanian & Kehutanan":        Sprout,
  "Kedokteran & Farmasi":         Stethoscope,
  "Informatika & Sains Data":     Code2,
  "MIPA (Fisika/Kimia/Biologi)":  Atom,
  "Desain Komunikasi Visual":     Monitor,
  "Film, Televisi & Komunikasi":  Film,
  "Sastra & Penulisan Kreatif":   PenLine,
  "Psikologi & HI":               Brain,
  "Pendidikan & Keguruan":        GraduationCap,
  "Gizi & Keperawatan":           HeartPulse,
  "Manajemen & Bisnis Digital":   Briefcase,
  "Ilmu Hukum & Politik":         Scale,
  "Hubungan Masyarakat (PR)":     Megaphone,
  "Akuntansi & Perpajakan":       Calculator,
  "Administrasi Publik/Bisnis":   Landmark,
  "Statistika & Kearsipan":       BarChart2,
};

const FIELD_ICONS: Record<string, LucideIcon> = {
  "Matematika":          Calculator,
  "Fisika":              Magnet,
  "Prakarya / Teknologi": Hammer,
  "Kimia":               FlaskConical,
  "Biologi":             Dna,
  "Bahasa Indonesia":    BookOpen,
  "Seni & Desain":       Paintbrush,
  "Sejarah & Budaya":    Globe,
  "Ekonomi":             TrendingUp,
  "PPKn (Hukum)":        Scale,
  "Bahasa Asing":        Languages,
  "Akuntansi & Keuangan": DollarSign,
  "Teknologi Informasi": Laptop,
};

// ── Result Profiles ────────────────────────────────────────────────────────────
interface ResultProfile {
  rumpun: "Saintek" | "Soshum";
  title: string;
  tagline: string;
  description: string;
  emoji: string;
  icon: string;
  color: string;
  secondaryColor: string;
  gradientFrom: string;
  gradientTo: string;
  strengths: string[];
  interests: string[];
  learningStyle: string[];
  fields: { icon: string; name: string; desc: string }[];
  careers: { emoji: string; title: string; desc: string }[];
  recommendedMateri: { type: string; title: string; duration: string; id: string }[];
  steps: { title: string; desc: string }[];
}

const profiles: Record<Category, ResultProfile> = {
  Realistic: {
    rumpun: "Saintek",
    title: "Praktisi & Solusi Fisik (Realistic)",
    tagline: "Kamu menyukai pemecahan masalah praktis, perakitan, dan aksi nyata lapangan!",
    description:
      "Kamu adalah tipe yang pragmatis dan lebih menyukai kelas praktikum atau aktivitas lapangan daripada sekadar teori abstrak di dalam kelas. Jurusan kuliah di rumpun keteknikan dan alam sangat cocok untuk mengeksplorasi minat kinestetik dan rekayasa fisikmu.",
    emoji: "🔧",
    icon: "build",
    color: "#166534",
    secondaryColor: "#15803d",
    gradientFrom: "#bbf7d0",
    gradientTo: "#dcfce7",
    strengths: ["Terampil secara teknis", "Pekerja keras", "Logika spasial kuat", "Berorientasi pada hasil nyata"],
    interests: ["Mekanika & otomotif", "Rancang bangun & infrastruktur", "Pertanian & alam terbuka"],
    learningStyle: ["Praktik langsung di laboratorium", "Studi lapangan langsung", "Penyelesaian proyek fisik"],
    fields: [
      { icon: "📐", name: "Matematika", desc: "Fokus logika kuantitatif dan spasial sangat krusial untuk jurusan keteknikan di SNBP." },
      { icon: "🧲", name: "Fisika", desc: "Syarat utama pendaftaran rumpun teknik sipil, mesin, elektro, dan kebumian di Indonesia." },
      { icon: "🔨", name: "Prakarya / Teknologi", desc: "Melatih keahlian praktikal langsung, rekayasa fisik, dan perakitan alat." },
    ],
    careers: [
      { emoji: "🏗️", title: "Teknik Sipil & Arsitektur", desc: "PTN Favorit: ITB, ITS, UGM, UB. Merancang infrastruktur & tata ruang." },
      { emoji: "⚙️", title: "Teknik Mesin & Otomotif", desc: "PTN Favorit: ITB, UI, ITS, UB. Merawat mesin industri & manufaktur." },
      { emoji: "🌾", title: "Pertanian & Kehutanan", desc: "PTN Favorit: IPB, UGM, UB, UNHAS. Mengelola alam & pangan modern." },
    ],
    recommendedMateri: [
      { type: "Video", title: "Pertanian Modern di Era Digital", duration: "8 Menit", id: "pertanian-modern" },
      { type: "Bacaan", title: "Mengenal Teknologi Tepat Guna", duration: "6 Menit", id: "teknologi-tepat-guna" },
      { type: "Panduan", title: "Memulai Usaha Tani Sendiri", duration: "12 Menit", id: "usaha-tani" },
    ],
    steps: [
      { title: "Kuasai Dasar Fisika", desc: "Fokus pada mekanika dan perhitungan dasar untuk menunjang nilai SNBP." },
      { title: "Ikuti Ekskul Praktis", desc: "Ikuti KIR (Karya Ilmiah Remaja) bagian teknologi atau robotik jika ada." },
      { title: "Riset Portofolio", desc: "Khusus Arsitektur, mulailah melatih kemampuan menggambar perspektif." },
    ],
  },
  Investigative: {
    rumpun: "Saintek",
    title: "Peneliti & Analis Cerdas (Investigative)",
    tagline: "Rasa ingin tahu yang mendalam dan pemikiran ilmiah adalah kekuatan terbesarmu!",
    description:
      "Kamu adalah pemikir analitis yang suka memecahkan masalah kompleks berbasis logika dan sains. Kamu tertarik memahami cara kerja sesuatu secara ilmiah, menganalisis data, melakukan eksperimen, atau menulis hipotesis ilmiah.",
    emoji: "🔬",
    icon: "science",
    color: "#006591",
    secondaryColor: "#0369a1",
    gradientFrom: "#bae6fd",
    gradientTo: "#e0f2fe",
    strengths: ["Analitis & logis", "Rasa ingin tahu tinggi", "Metodis & cermat", "Mandiri dalam riset"],
    interests: ["Sains & kedokteran", "Teknologi informasi & data", "Eksperimen laboratorium"],
    learningStyle: ["Membaca jurnal/artikel sains", "Eksperimen/uji coba mandiri", "Diskusi berbasis data statistik"],
    fields: [
      { icon: "🧮", name: "Matematika & Aktuaria", desc: "Dasar logika hitung dan statistika untuk riset sains dan pengolahan data." },
      { icon: "🧬", name: "Biologi & Kimia", desc: "Mata pelajaran pendukung utama untuk rumpun kesehatan, farmasi, dan kedokteran." },
      { icon: "💻", name: "Informatika / Coding", desc: "Mengembangkan computational thinking untuk menyusun algoritma sains." },
    ],
    careers: [
      { emoji: "🏥", title: "Kedokteran & Farmasi", desc: "PTN Favorit: UI, UGM, UNAIR, UB. Meneliti penyakit & merawat kesehatan." },
      { emoji: "👨‍💻", title: "Informatika & Sains Data", desc: "PTN Favorit: ITB, UI, ITS, UB. Merancang software & kecerdasan buatan." },
      { emoji: "🧪", title: "MIPA (Fisika/Kimia/Biologi)", desc: "PTN Favorit: ITB, UGM, UI, UNS. Meneliti sains murni & akademisi." },
    ],
    recommendedMateri: [
      { type: "Video", title: "Pengantar Berpikir Komputasional", duration: "10 Menit", id: "berpikir-komputasional" },
      { type: "Bacaan", title: "Dunia Data Science untuk Pemula", duration: "8 Menit", id: "data-science" },
      { type: "Panduan", title: "Cara Memulai Riset Sederhana", duration: "10 Menit", id: "mulai-riset" },
    ],
    steps: [
      { title: "Ikuti Olimpiade Sains", desc: "Asah logika dengan ikut kompetisi matematika, biologi, atau komputer." },
      { title: "Pelajari Logika Coding", desc: "Mulai belajar dasar pemrograman Python atau C++ secara otodidak." },
      { title: "Biasakan Membaca Artikel", desc: "Luangkan waktu membaca publikasi ilmiah populer untuk memperluas wawasan." },
    ],
  },
  Artistic: {
    rumpun: "Soshum",
    title: "Kreator & Desainer Estetis (Artistic)",
    tagline: "Imajinasi, kreativitas ekspresi, dan keindahan visual adalah superpower-mu!",
    description:
      "Kamu adalah kreator orisinal yang tidak menyukai aturan baku atau rutinitas kaku. Kamu menyukai kebebasan dalam mengekspresikan ide, perasaan, dan keindahan melalui desain visual, media digital, musik, bahasa, maupun sastra.",
    emoji: "🎨",
    icon: "palette",
    color: "#825100",
    secondaryColor: "#a36700",
    gradientFrom: "#fef3c7",
    gradientTo: "#fde68a",
    strengths: ["Imajinatif & kreatif", "Peka estetika visual/audio", "Inovatif & unik", "Kemampuan bercerita kuat"],
    interests: ["Desain komunikasi visual", "Menulis kreatif & sastra", "Seni perfilman & fotografi"],
    learningStyle: ["Belajar visual (gambar/video)", "Praktik eksperimen karya seni", "Mencari inspirasi dari seniman lain"],
    fields: [
      { icon: "🖌️", name: "Seni Rupa & Kriya", desc: "Mata pelajaran wajib untuk melatih menggambar dan mengumpulkan portofolio SNBP." },
      { icon: "📚", name: "Bahasa & Sastra", desc: "Mendukung kreativitas kepenulisan, analisis narasi, dan struktur bahasa." },
      { icon: "🗺️", name: "Sejarah & Budaya", desc: "Penting untuk memperkaya referensi konsep artistik dan pemikiran budaya." },
    ],
    careers: [
      { emoji: "🖥️", title: "Desain Komunikasi Visual", desc: "PTN Favorit: ITB, ISI Yogyakarta, UNS, UB. Merancang UI/UX & branding." },
      { emoji: "🎬", title: "Film, Televisi & Komunikasi", desc: "PTN Favorit: UI, UGM, UNPAD, UB. Membuat konten kreatif & jurnalisme." },
      { emoji: "✍️", title: "Sastra & Penulisan Kreatif", desc: "PTN Favorit: UI, UGM, UNPAD, FIB-UNAIR. Menjadi copywriter & penulis." },
    ],
    recommendedMateri: [
      { type: "Video", title: "Dasar-dasar Desain Grafis", duration: "10 Menit", id: "desain-grafis" },
      { type: "Bacaan", title: "Mengenal Minat dan Bakat Seni", duration: "5 Menit", id: "minat-bakat-seni" },
      { type: "Panduan", title: "Membangun Portofolio Kreatif", duration: "15 Menit", id: "portofolio-kreatif" },
    ],
    steps: [
      { title: "Cicil Portofolio Gambar", desc: "Bagi calon mahasiswa DKV/Seni, wajib mencicil gambar naratif dan komposisi." },
      { title: "Pelajari Software Desain", desc: "Mulailah melatih keahlian software grafis seperti Canva, Photoshop, atau Figma." },
      { title: "Ikuti Lomba Kreatif", desc: "Ikuti kompetisi menulis cerpen, desain poster, atau fotografi tingkat sekolah." },
    ],
  },
  Social: {
    rumpun: "Soshum",
    title: "Pendidik & Pengabdi Sosial (Social)",
    tagline: "Empati yang tinggi dan kemampuan komunikasi antarpribadi adalah superpower-mu!",
    description:
      "Kamu adalah tipe orang yang hangat, senang berkolaborasi, dan berempati tinggi. Kamu merasa bahagia saat bisa membantu, mengajar, merawat, atau membimbing orang lain ke arah yang lebih baik.",
    emoji: "🤝",
    icon: "people",
    color: "#166534",
    secondaryColor: "#15803d",
    gradientFrom: "#bbf7d0",
    gradientTo: "#d1fae5",
    strengths: ["Empati tinggi", "Pendengar yang baik", "Komunikasi interpersonal", "Penyelesaian konflik"],
    interests: ["Pendidikan & pengajaran", "Psikologi perilaku manusia", "Layanan kesehatan & sosial"],
    learningStyle: ["Diskusi kelompok aktif", "Bermain peran (role-playing)", "Analisis studi kasus sosial"],
    fields: [
      { icon: "👪", name: "Sosiologi", desc: "Mata pelajaran kunci untuk memahami struktur dan dinamika interaksi sosial di SNBP." },
      { icon: "🩺", name: "Biologi (Kesehatan)", desc: "Penting sebagai penunjang masuk ke rumpun kesehatan seperti gizi dan keperawatan." },
      { icon: "🗣️", name: "Bahasa & Komunikasi", desc: "Mengembangkan keahlian negosiasi verbal, menyuluh, dan berdiplomasi." },
    ],
    careers: [
      { emoji: "🧠", title: "Psikologi & HI", desc: "PTN Favorit: UI, UGM, UNPAD, UB. Memahami mental & diplomasi global." },
      { emoji: "🏫", title: "Pendidikan & Keguruan", desc: "PTN Favorit: UPI, UNY, UNNES, UM. Mencetak guru profesional berkarakter." },
      { emoji: "👩‍⚕️", title: "Gizi & Keperawatan", desc: "PTN Favorit: UI, UGM, UNAIR, UB. Menyelenggarakan asuhan gizi & medis." },
    ],
    recommendedMateri: [
      { type: "Bacaan", title: "Kecerdasan Emosional untuk Pemimpin", duration: "8 Menit", id: "kecerdasan-emosional" },
      { type: "Video", title: "Public Speaking untuk Semua Orang", duration: "12 Menit", id: "public-speaking" },
      { type: "Panduan", title: "Cara Menjadi Mentor yang Baik", duration: "10 Menit", id: "menjadi-mentor" },
    ],
    steps: [
      { title: "Aktif di Organisasi", desc: "Ikuti PMR (Palang Merah Remaja), OSIS, atau pramuka untuk melatih empati sosial." },
      { title: "Latih Public Speaking", desc: "Biasakan berbicara di depan umum dengan aktif bertanya di kelas." },
      { title: "Ikut Kegiatan Volunteer", desc: "Ikuti kegiatan bakti sosial sekolah atau program pengabdian lokal di desamu." },
    ],
  },
  Enterprising: {
    rumpun: "Soshum",
    title: "Pemimpin & Wirausaha Visioner (Enterprising)",
    tagline: "Jiwa kepemimpinan, persuasi, dan kelihaian negosiasi adalah kekuatan utamamu!",
    description:
      "Kamu adalah tipe penggerak yang dinamis, percaya diri, dan berani mengambil risiko. Kamu senang memimpin tim, meyakinkan orang lain agar menyetujui pendapatmu, dan memiliki ketertarikan tinggi pada bisnis atau hukum.",
    emoji: "🚀",
    icon: "rocket_launch",
    color: "#0369a1",
    secondaryColor: "#0284c7",
    gradientFrom: "#bae6fd",
    gradientTo: "#e0f2fe",
    strengths: ["Jiwa kepemimpinan", "Kemampuan persuasi kuat", "Berani ambil risiko", "Berpikir taktis & strategis"],
    interests: ["Bisnis & kewirausahaan", "Hukum & peradilan", "Manajemen & politik"],
    learningStyle: ["Studi kasus bisnis nyata", "Simulasi debat/sidang", "Presentasi kelompok kompetitif"],
    fields: [
      { icon: "📈", name: "Ekonomi", desc: "Mata pelajaran wajib untuk dasar analisis pasar, supply-demand, dan manajemen." },
      { icon: "⚖️", name: "PPKn (Hukum)", desc: "Mendukung pemahaman sistem tata negara, hukum perdata, dan ketatanegaraan." },
      { icon: "🌏", name: "Bahasa Asing", desc: "Mendukung kemampuan diplomasi dan ekspansi bisnis ke kancah global." },
    ],
    careers: [
      { emoji: "💼", title: "Manajemen & Bisnis Digital", desc: "PTN Favorit: SBM-ITB, UI, UGM, UB. Membangun & mengelola startup." },
      { emoji: "⚖️", title: "Ilmu Hukum & Politik", desc: "PTN Favorit: UI, UGM, UNDIP, UNAIR. Penegakan keadilan & tata negara." },
      { emoji: "📣", title: "Hubungan Masyarakat (PR)", desc: "PTN Favorit: UI, UNPAD, UNDIP, UB. Mengelola citra lembaga & publikasi." },
    ],
    recommendedMateri: [
      { type: "Video", title: "Mindset Pengusaha Sukses", duration: "10 Menit", id: "mindset-pengusaha" },
      { type: "Bacaan", title: "Cara Memulai Bisnis dari Nol", duration: "12 Menit", id: "mulai-bisnis" },
      { type: "Panduan", title: "Strategi Pemasaran Digital Dasar", duration: "8 Menit", id: "digital-marketing" },
    ],
    steps: [
      { title: "Ikuti Ekskul Debat", desc: "Asah logika berargumen dan persuasi verbal lewat klub debat sekolah." },
      { title: "Latih Usaha Mandiri", desc: "Coba berwirausaha kecil-kecilan (seperti dropship atau menjual jasa online)." },
      { title: "Ambil Peran Pemimpin", desc: "Ajukan diri menjadi ketua panitia acara sekolah atau pengurus OSIS." },
    ],
  },
  Conventional: {
    rumpun: "Soshum",
    title: "Organisator & Pengatur Andal (Conventional)",
    tagline: "Akurasi data, kepatuhan prosedur, dan manajemen keteraturan adalah superpower-mu!",
    description:
      "Kamu menyukai kerapian, keteraturan sistem, dan kepatuhan terhadap prosedur baku. Kamu sangat ahli dalam menyusun rencana terstruktur, menghitung data numerik, mengarsip laporan keuangan, dan mengelola administrasi logistik secara efisien.",
    emoji: "📋",
    icon: "checklist",
    color: "#3e4a3d",
    secondaryColor: "#6e7b6c",
    gradientFrom: "#dce2f7",
    gradientTo: "#e9edff",
    strengths: ["Terorganisir & disiplin", "Akurasi detail sangat tinggi", "Konsisten", "Efisien & metodis"],
    interests: ["Akuntansi & perpajakan", "Administrasi perkantoran", "Statistika & pengarsipan"],
    learningStyle: ["Materi terstruktur runtut", "Latihan soal berulang-ulang", "Pembuatan daftar checklist"],
    fields: [
      { icon: "🔢", name: "Matematika", desc: "Mengembangkan ketajaman kalkulasi angka, statistika, dan rumus keuangan." },
      { icon: "💸", name: "Akuntansi & Keuangan", desc: "Mata pelajaran pendukung utama di SNBP untuk masuk rumpun akuntansi." },
      { icon: "📊", name: "Teknologi Informasi", desc: "Melatih pengoperasian spreadsheet (Excel/Google Sheets) tingkat lanjut." },
    ],
    careers: [
      { emoji: "💰", title: "Akuntansi & Perpajakan", desc: "PTN Favorit: UI, UGM, UB, STAN. Menyusun laporan keuangan & audit pajak." },
      { emoji: "🏛️", title: "Administrasi Publik/Bisnis", desc: "PTN Favorit: UI, UNDIP, UNPAD. Mengelola tata kelola & regulasi kantor." },
      { emoji: "🗄️", title: "Statistika & Kearsipan", desc: "PTN Favorit: ITS, UGM, UI, UB. Mengolah data survei & pengarsipan dokumen." },
    ],
    recommendedMateri: [
      { type: "Bacaan", title: "Dasar-dasar Literasi Keuangan", duration: "8 Menit", id: "literasi-keuangan" },
      { type: "Video", title: "Manajemen Waktu dan Produktivitas", duration: "10 Menit", id: "manajemen-waktu" },
      { type: "Panduan", title: "Memulai Karier di Bidang Keuangan", duration: "12 Menit", id: "karier-keuangan" },
    ],
    steps: [
      { title: "Kelola Kas Kelas", desc: "Ajukan diri menjadi bendahara kelas untuk melatih pembukuan uang kas." },
      { title: "Kuasai Microsoft Excel", desc: "Ikuti tutorial online gratis untuk belajar rumus SUM, VLOOKUP, dan Pivot Table." },
      { title: "Latih Kedisiplinan", desc: "Buat to-do list harian teratur dan biasakan menata arsip dokumen pribadimu." },
    ],
  },
};

// ── Radar Chart (CSS-based) ────────────────────────────────────────────────────
function RadarBar({
  category,
  score,
  color,
}: {
  category: string;
  score: number;
  color: string;
}) {
  const pct = Math.round((score / 20) * 100);
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-semibold w-28 flex-shrink-0" style={{ color: "var(--color-on-surface-variant)" }}>
        {category}
      </span>
      <div
        className="flex-1 h-3 rounded-full overflow-hidden"
        style={{ background: "var(--color-surface-variant)" }}
      >
        <div
          className="h-full rounded-full transition-all duration-1000"
          style={{ width: `${pct}%`, background: color }}
        />
      </div>
      <span className="text-sm font-bold w-12 text-right shrink-0" style={{ color }}>
        {pct}%
      </span>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
function HasilContent() {
  const params = useSearchParams();
  const router = useRouter();

  const allCategories: Category[] = [
    "Realistic", "Investigative", "Artistic", "Social", "Enterprising", "Conventional",
  ];
  const categoryColors: Record<Category, string> = {
    Realistic: "#166534",
    Investigative: "#006591",
    Artistic: "#825100",
    Social: "#166534",
    Enterprising: "#0369a1",
    Conventional: "#3e4a3d",
  };

  const scores = Object.fromEntries(
    allCategories.map((c) => [c, parseInt(params.get(c) ?? "0")])
  ) as Record<Category, number>;

  // Rank categories based on score to construct Holland Code
  const categoryLetters: Record<Category, string> = {
    Realistic: "R",
    Investigative: "I",
    Artistic: "A",
    Social: "S",
    Enterprising: "E",
    Conventional: "C",
  };
  const sortedScores = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const hollandCode = sortedScores.slice(0, 3).map(([cat]) => categoryLetters[cat as Category]).join("");

  const result = (params.get("result") as Category) ?? (sortedScores[0]?.[0] as Category) ?? "Artistic";
  const profile = profiles[result] ?? profiles["Artistic"];

  const secondaryResult = (sortedScores[1]?.[0] as Category) ?? "Social";
  const secondaryProfile = profiles[secondaryResult] ?? profiles["Social"];

  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [studentName, setStudentName] = useState(params.get("name") ?? "");
  const [isSending, setIsSending] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);
  const [sendStatus, setSendStatus] = useState<"" | "success" | "error">("");
  const [sendErrorMessage, setSendErrorMessage] = useState("");

  const handlePrint = () => {
    setIsPrinting(true);
    setTimeout(() => {
      window.print();
      setIsPrinting(false);
    }, 50);
  };

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setSendStatus("");
    // Yield to the browser so the loading spinner renders before heavy jsPDF work
    await new Promise<void>((resolve) => setTimeout(resolve, 30));
    
    try {
      // ── Generate PDF Attachment ──
      let pdfBase64 = "";
      try {
        const doc = new jsPDF();
        
        // Header
        doc.setFont("helvetica", "bold");
        doc.setFontSize(20);
        doc.setTextColor(15, 23, 42); // slate-900
        doc.text("YOUTH DEVELOPMENT PROGRAM", 105, 20, { align: "center" });
        
        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(100, 116, 139); // slate-500
        doc.text("Layanan Pemetaan Minat & Perencanaan Jurusan Kuliah", 105, 26, { align: "center" });
        doc.text("Desa Tulungrejo, Kecamatan Bumiaji, Kota Batu", 105, 31, { align: "center" });
        
        // Line separator
        doc.setDrawColor(226, 232, 240); // slate-200
        doc.setLineWidth(0.5);
        doc.line(20, 36, 190, 36);
        
        // Document Title
        doc.setFontSize(11);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(15, 23, 42);
        doc.text("LAPORAN HASIL ASESMEN MINAT & JURUSAN", 105, 45, { align: "center" });
        
        // Identity block
        doc.setFontSize(9);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(71, 85, 105); // slate-600
        doc.text(`Nama Siswa    : ${studentName || "Siswa YDP"}`, 20, 56);
        doc.text(`Tanggal Tes   : ${new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}`, 20, 62);
        doc.text(`Rumpun Jurusan: ${profile.rumpun === secondaryProfile.rumpun ? profile.rumpun.toUpperCase() : `${profile.rumpun.toUpperCase()} & ${secondaryProfile.rumpun.toUpperCase()}`}`, 20, 68);
        doc.text(`Kode Holland  : ${hollandCode}`, 20, 74);
        
        // Personality Profile
        doc.setFont("helvetica", "bold");
        doc.setFontSize(11);
        doc.setTextColor(15, 23, 42);
        doc.text("Profil Tipe Kepribadian Hasil Asesmen:", 20, 83);
        
        doc.setFont("helvetica", "bold");
        doc.setFontSize(11);
        doc.setTextColor(2, 132, 199); // primary blue
        doc.text(`1. Tipe Utama: ${profile.title}`, 20, 90);
        
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        doc.setTextColor(51, 65, 85);
        const descLines = doc.splitTextToSize(profile.description, 170);
        doc.text(descLines, 20, 95);
        
        let ySecStart = 95 + (descLines.length * 4) + 3;
        doc.setFont("helvetica", "bold");
        doc.setFontSize(11);
        doc.setTextColor(79, 70, 229); // secondary indigo/purple
        doc.text(`2. Tipe Pendukung: ${secondaryProfile.title}`, 20, ySecStart);
        
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        doc.setTextColor(51, 65, 85);
        const secDescLines = doc.splitTextToSize(secondaryProfile.description, 170);
        doc.text(secDescLines, 20, ySecStart + 5);
        
        // RIASEC Scores Table
        let yPos = ySecStart + 5 + (secDescLines.length * 4) + 6;
        doc.setFont("helvetica", "bold");
        doc.setFontSize(11);
        doc.setTextColor(15, 23, 42);
        doc.text("Perolehan Skor Dimensi RIASEC (Maks 20):", 20, yPos);
        
        yPos += 6;
        doc.setFillColor(248, 250, 252); // slate-50 background for headers
        doc.rect(20, yPos, 170, 8, "F");
        
        doc.setFont("helvetica", "bold");
        doc.setFontSize(9);
        doc.setTextColor(71, 85, 105);
        doc.text("Dimensi", 25, yPos + 5.5);
        doc.text("Kecocokan / Minat (%)", 140, yPos + 5.5);
        
        yPos += 8;
        const categories: Category[] = ["Realistic", "Investigative", "Artistic", "Social", "Enterprising", "Conventional"];
        categories.forEach((c) => {
          doc.setFont("helvetica", "normal");
          doc.setTextColor(51, 65, 85);
          doc.text(c, 25, yPos + 5.5);
          doc.setFont("helvetica", "bold");
          const pctVal = Math.round(((scores[c] || 0) / 20) * 100);
          doc.text(`${pctVal}%`, 150, yPos + 5.5);
          
          doc.setDrawColor(241, 245, 249);
          doc.line(20, yPos + 8, 190, yPos + 8);
          yPos += 8;
        });
        
        // Add Page 2
        doc.addPage();
        
        // Header Page 2
        doc.setFont("helvetica", "bold");
        doc.setFontSize(9);
        doc.setTextColor(100, 116, 139);
        doc.text("REKOMENDASI AKADEMIK & JURUSAN", 20, 15);
        doc.line(20, 18, 190, 18);
        
        yPos = 28;
        doc.setFont("helvetica", "bold");
        doc.setFontSize(11);
        doc.setTextColor(15, 23, 42);
        doc.text("Rekomendasi Jurusan Kuliah Utama & Pendukung:", 20, yPos);
        
        yPos += 6;
        const combinedCareers = [
          ...profile.careers.map(c => ({ ...c, label: `(${result} - Utama)` })),
          ...secondaryProfile.careers.map(c => ({ ...c, label: `(${secondaryResult} - Pendukung)` }))
        ];

        combinedCareers.forEach((c) => {
          doc.setFont("helvetica", "bold");
          doc.setFontSize(10);
          doc.setTextColor(15, 23, 42);
          doc.text(`${c.emoji} ${c.title} ${c.label}`, 20, yPos);
          
          yPos += 4.5;
          doc.setFont("helvetica", "normal");
          doc.setFontSize(9);
          doc.setTextColor(71, 85, 105);
          const majorDescLines = doc.splitTextToSize(c.desc, 170);
          doc.text(majorDescLines, 20, yPos);
          yPos += (majorDescLines.length * 4) + 5;
        });
        
        // Subjects
        doc.setFont("helvetica", "bold");
        doc.setFontSize(11);
        doc.setTextColor(15, 23, 42);
        doc.text("Mata Pelajaran Fokus & Pendukung (SNBP):", 20, yPos);
        
        yPos += 6;
        profile.fields.forEach((f) => {
          doc.setFont("helvetica", "bold");
          doc.setFontSize(9);
          doc.setTextColor(15, 23, 42);
          doc.text(`${f.icon} ${f.name}`, 20, yPos);
          
          doc.setFont("helvetica", "normal");
          doc.setTextColor(71, 85, 105);
          const subDescLines = doc.splitTextToSize(f.desc, 120);
          doc.text(subDescLines, 65, yPos);
          
          yPos += Math.max(subDescLines.length * 4, 6) + 4;
        });
        
        // Signature Block
        yPos = 250;
        doc.setFont("helvetica", "normal");
        doc.setFontSize(8);
        doc.setTextColor(148, 163, 184); // slate-400
        doc.text("Dokumen ini sah dikeluarkan oleh Sistem Penilaian Youth TDP secara digital.", 20, yPos);
        
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        doc.setTextColor(71, 85, 105);
        doc.text(`Kota Batu, ${new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}`, 140, yPos - 10);
        doc.text("Tim Konseling Akademik", 140, yPos - 5);
        doc.setFont("helvetica", "bold");
        doc.text("Youth TDP", 140, yPos + 15);
        
        pdfBase64 = doc.output("datauristring").split(",")[1];
      } catch (pdfErr) {
        console.error("Gagal men-generate PDF attachment:", pdfErr);
      }

      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: emailInput,
          name: studentName,
          title: `Tipe Utama: ${profile.title} & Tipe Pendukung: ${secondaryProfile.title}`,
          tagline: `Kode Holland Anda: ${hollandCode}`,
          description: `Profil Utama: ${profile.description}\n\nProfil Pendukung: ${secondaryProfile.description}`,
          rumpun: `${profile.rumpun} / ${secondaryProfile.rumpun}`,
          majors: [
            ...profile.careers.map(c => ({ ...c, title: `${c.title} (${result} - Utama)` })),
            ...secondaryProfile.careers.map(c => ({ ...c, title: `${c.title} (${secondaryResult} - Pendukung)` }))
          ],
          subjects: [
            ...profile.fields.map(f => ({ ...f, name: `${f.name} (${result})` })),
            ...secondaryProfile.fields.map(f => ({ ...f, name: `${f.name} (${secondaryResult})` }))
          ].slice(0, 4),
          pdfBase64: pdfBase64 || null,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setSendStatus("success");
      } else {
        throw new Error(data.error || "Gagal mengirim.");
      }
    } catch (err: any) {
      setSendStatus("error");
      setSendErrorMessage(err.message || "Koneksi internet bermasalah.");
    } finally {
      setIsSending(false);
    }
  };

  // Remove duplicate scores variables and use global ones defined at the top

  return (
    <div className="min-h-screen" style={{ background: "var(--color-background)" }}>
      {/* ── SCREEN VIEW (HIDDEN ON PRINT) ── */}
      <div className="print:hidden">
        {/* ── Nav ── */}
        <nav
          className="fixed top-0 left-0 right-0 z-50 border-b"
          style={{
            background: "rgba(255,255,255,0.8)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderColor: "rgba(255,255,255,0.5)",
          }}
        >
          <div className="max-w-5xl mx-auto px-5 md:px-12 h-16 flex items-center justify-between">
            <button
              onClick={() => router.push("/assessment")}
              className="flex items-center gap-2 text-sm font-semibold transition-colors text-on-surface-variant hover:text-primary"
            >
              <ArrowLeft size={16} />
              Ulangi Assessment
            </button>
            <div className="flex items-center gap-2">
              <Sparkles size={16} style={{ color: profile.color }} />
              <span className="font-bold text-sm" style={{ color: profile.color }}>
                Hasil Eksplorasi Diri
              </span>
            </div>
            <Link
              href="/materi"
              className="hidden sm:flex items-center gap-1 text-sm font-semibold px-4 py-2 rounded-full transition-all"
              style={{
                background: profile.color,
                color: "white",
              }}
            >
              Jelajahi Materi <ChevronRight size={14} />
            </Link>
          </div>
        </nav>

        {/* ── Main Content ── */}
        <main className="pt-28 pb-24 px-5 md:px-12">
          <div className="max-w-5xl mx-auto">
            {/* Header Card */}
            <section
              className="rounded-[40px] p-8 md:p-14 text-center mb-10 border relative overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.8)",
                backdropFilter: "blur(24px)",
                borderColor: "var(--color-border-subtle)",
                boxShadow: "0 10px 40px rgba(0,0,0,0.04), 0 2px 10px rgba(0,0,0,0.02)",
              }}
            >
              {/* Colored blur decorations */}
              <div
                className="absolute -top-24 -left-24 w-80 h-80 rounded-full blur-[120px] -z-10"
                style={{ background: `${profile.color}15` }}
              />
              <div
                className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full blur-[120px] -z-10"
                style={{ background: `${profile.secondaryColor}15` }}
              />              {/* Profile Icon */}
              <div
                className="inline-flex items-center justify-center w-28 h-28 rounded-full mb-6 shadow-lg"
                style={{
                  background: `linear-gradient(135deg, ${profile.gradientFrom} 0%, ${profile.gradientTo} 100%)`,
                  border: `4px solid ${profile.color}30`,
                  animation: "bounce 3s ease-in-out infinite",
                  color: profile.color,
                }}
              >
                {(() => {
                  const IconComp = CATEGORY_ICONS[result];
                  return IconComp ? <IconComp size={48} /> : null;
                })()}
              </div>

              {/* Title */}
              <h1
                className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight text-center max-w-3xl mx-auto"
                style={{ color: "var(--color-on-surface)", letterSpacing: "-0.03em" }}
              >
                <Sparkles className="inline-block text-yellow-500 animate-pulse mr-2 -mt-1 shrink-0" size={32} />
                Kamu adalah <span style={{ color: profile.color }}>{profile.title}!</span>
              </h1>

              <p
                className="text-lg md:text-xl font-semibold mb-4"
                style={{ color: profile.color }}
              >
                {profile.tagline}
              </p>

              {/* Rumpun Keilmuan & Holland Code Badges */}
              <div className="mb-6 flex justify-center gap-3 flex-wrap">
                <span
                  className="inline-flex items-center gap-1.5 px-4.5 py-1.5 rounded-full font-bold text-xs tracking-wider uppercase text-white shadow-sm"
                  style={{
                    background: profile.rumpun === "Saintek" 
                      ? "linear-gradient(135deg, #0284c7 0%, #0369a1 100%)" 
                      : "linear-gradient(135deg, #be123c 0%, #9f1239 100%)",
                  }}
                >
                  <GraduationCap size={14} />
                  Rumpun Jurusan: {profile.rumpun === secondaryProfile.rumpun ? profile.rumpun : `${profile.rumpun} & ${secondaryProfile.rumpun}`}
                </span>
                <span
                  className="inline-flex items-center gap-1.5 px-4.5 py-1.5 rounded-full font-bold text-xs tracking-wider uppercase text-white shadow-sm"
                  style={{
                    background: "linear-gradient(135deg, var(--color-primary) 0%, #0284c7 100%)",
                  }}
                >
                  <Brain size={14} />
                  Kode Holland: {hollandCode}
                </span>
              </div>

              {/* Dual Profile Descriptions */}
              <div className="text-left max-w-3xl mx-auto space-y-4 mb-8">
                <div className="p-5 rounded-2xl bg-white/40 border border-white/60">
                  <strong className="block text-sm uppercase tracking-wider mb-1" style={{ color: profile.color }}>
                    Profil Utama — {profile.title}:
                  </strong>
                  <p className="text-sm md:text-base leading-relaxed text-slate-700">
                    {profile.description}
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-white/40 border border-white/60">
                  <strong className="block text-sm uppercase tracking-wider mb-1" style={{ color: secondaryProfile.color }}>
                    Profil Pendukung — {secondaryProfile.title}:
                  </strong>
                  <p className="text-sm md:text-base leading-relaxed text-slate-700">
                    {secondaryProfile.description}
                  </p>
                </div>
              </div>

              {/* Primary & Secondary Types display */}
              <div className="flex justify-center gap-3 flex-wrap">
                <div
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm shadow-lg text-white"
                  style={{
                    background: profile.color,
                    boxShadow: `0 8px 24px ${profile.color}40`,
                  }}
                >
                  Tipe Utama: {result}
                </div>
                <div
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm shadow-lg text-white"
                  style={{
                    background: secondaryProfile.color,
                    boxShadow: `0 8px 24px ${secondaryProfile.color}40`,
                  }}
                >
                  Tipe Pendukung: {secondaryResult}
                </div>
              </div>
            </section>

            {/* ── Score Breakdown ── */}
            <section className="py-12 px-5 md:px-12">
              <div className="max-w-3xl mx-auto">
                <div
                  className="rounded-3xl p-8 md:p-10"
                  style={{
                    background: "rgba(255,255,255,0.9)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid var(--color-border-subtle)",
                    boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
                  }}
                >
                  <h3
                    className="text-center font-bold text-lg mb-8 flex items-center justify-center gap-2"
                    style={{ color: "var(--color-on-surface)" }}
                  >
                    <LineChart size={20} className="text-primary" />
                    <span>Grafik Minat &amp; Kecocokan Jurusan</span>
                  </h3>
                  <div className="space-y-6">
                    {allCategories.map((cat) => (
                      <RadarBar
                        key={cat}
                        category={cat}
                        score={scores[cat]}
                        color={categoryColors[cat]}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* ── Kekuatan & Gaya Belajar ── */}
            <section className="py-12 px-5 md:px-12 border-t border-border-subtle">
              <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Strengths */}
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold flex items-center gap-3 text-on-surface">
                    <Star className="text-secondary" size={24} />
                    Kekuatan Utamamu
                  </h3>
                  <div className="grid grid-cols-1 gap-3">
                    {profile.strengths.map((s) => (
                      <div
                        key={s}
                        className="flex items-center gap-3 p-4 rounded-2xl bg-white border"
                        style={{ borderColor: "var(--color-border-subtle)" }}
                      >
                        <span className="w-2.5 h-2.5 rounded-full bg-secondary shrink-0" />
                        <span className="text-sm font-semibold text-on-surface-variant">{s}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Interests & Style */}
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-bold flex items-center gap-3 text-on-surface mb-4">
                      <Heart className="text-tertiary" size={20} />
                      Minat Belajarmu
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {profile.interests.map((i) => (
                        <span
                          key={i}
                          className="text-xs font-semibold px-4 py-2 rounded-full border bg-white text-on-surface-variant"
                          style={{ borderColor: "var(--color-border-subtle)" }}
                        >
                          {i}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold flex items-center gap-3 text-on-surface mb-4">
                      <Zap className="text-primary" size={20} />
                      Gaya Belajar Ideal
                    </h3>
                    <ul className="space-y-3">
                      {profile.learningStyle.map((s) => (
                        <li key={s} className="flex items-start gap-3">
                          <CheckCircle2
                            size={16}
                            className="mt-0.5 shrink-0"
                            style={{ color: profile.color }}
                          />
                          <span className="text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
                            {s}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* ── Mata Pelajaran Pendukung ── */}
            <section
              className="py-12 px-5 md:px-12"
              style={{ background: "var(--color-bg-light)" }}
            >
              <div className="max-w-5xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: "var(--color-on-surface)" }}>
                  Mata Pelajaran Pendukung &amp; Fokus Sekolah (SNBP)
                </h2>
                <p className="text-sm mb-8" style={{ color: "var(--color-on-surface-variant)" }}>
                  Mata pelajaran ini penting diprioritaskan di jenjang SMA/Sederajat untuk memperbesar peluang masuk rumpun jurusanmu di SNBP.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {profile.fields.map((f) => (
                    <div
                      key={f.name}
                      className="bg-white p-7 rounded-3xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer"
                      style={{ borderColor: "var(--color-border-subtle)" }}
                    >
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 text-2xl"
                        style={{ background: `${profile.color}12`, color: profile.color }}
                      >
                        {(() => {
                          const IconComp = FIELD_ICONS[f.name];
                          return IconComp ? <IconComp size={22} /> : <span>{f.icon}</span>;
                        })()}
                      </div>
                      <h4 className="font-bold text-base mb-2" style={{ color: "var(--color-on-surface)" }}>
                        {f.name}
                      </h4>
                      <p className="text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
                        {f.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* ── Rekomendasi Jurusan Kuliah ── */}
            <section className="py-12 px-5 md:px-12">
              <div className="max-w-5xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold mb-2 text-center" style={{ color: "var(--color-on-surface)" }}>
                  Rekomendasi Jurusan Kuliah Utama &amp; Pendukung
                </h2>
                <p className="text-sm mb-8 text-center" style={{ color: "var(--color-on-surface-variant)" }}>
                  Jurusan-jurusan di bawah ini disesuaikan dengan tipe kepribadian utama dan pendukung Anda.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {/* Primary Careers */}
                  {profile.careers.map((c) => {
                    const IconComp = CAREER_ICONS[c.title];
                    return (
                      <div key={c.title} className="group cursor-pointer bg-white p-6 rounded-3xl border border-slate-100 hover:shadow-lg transition-all duration-300">
                        <div
                          className="aspect-square rounded-2xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-105 border w-16 h-16 mx-auto"
                          style={{
                            background: `${profile.color}10`,
                            borderColor: `${profile.color}20`,
                            color: profile.color,
                          }}
                        >
                          {IconComp ? <IconComp size={28} style={{ color: profile.color }} /> : <span className="text-3xl">{c.emoji}</span>}
                        </div>
                        <span className="block text-[10px] font-extrabold uppercase text-center tracking-wider mb-2" style={{ color: profile.color }}>
                          {result} (Utama)
                        </span>
                        <h5 className="font-bold text-base text-center mb-1" style={{ color: "var(--color-on-surface)" }}>
                          {c.title}
                        </h5>
                        <p className="text-xs text-center leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
                          {c.desc}
                        </p>
                      </div>
                    );
                  })}
                  
                  {/* Secondary Careers */}
                  {secondaryProfile.careers.map((c) => {
                    const IconComp = CAREER_ICONS[c.title];
                    return (
                      <div key={c.title} className="group cursor-pointer bg-white p-6 rounded-3xl border border-slate-100 hover:shadow-lg transition-all duration-300">
                        <div
                          className="aspect-square rounded-2xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-105 border w-16 h-16 mx-auto"
                          style={{
                            background: `${secondaryProfile.color}10`,
                            borderColor: `${secondaryProfile.color}20`,
                            color: secondaryProfile.color,
                          }}
                        >
                          {IconComp ? <IconComp size={28} style={{ color: secondaryProfile.color }} /> : <span className="text-3xl">{c.emoji}</span>}
                        </div>
                        <span className="block text-[10px] font-extrabold uppercase text-center tracking-wider mb-2" style={{ color: secondaryProfile.color }}>
                          {secondaryResult} (Pendukung)
                        </span>
                        <h5 className="font-bold text-base text-center mb-1" style={{ color: "var(--color-on-surface)" }}>
                          {c.title}
                        </h5>
                        <p className="text-xs text-center leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
                          {c.desc}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* ── Langkah Selanjutnya ── */}
            <section
              className="py-10 px-5 md:px-12"
              style={{ background: `${profile.color}08` }}
            >
              <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold text-center mb-8" style={{ color: "var(--color-on-surface)" }}>
                  Langkah Selanjutnya
                </h2>
                <div className="flex flex-col gap-4">
                  {profile.steps.map((step, i) => (
                    <div
                      key={step.title}
                      className="flex items-start gap-4 bg-white rounded-2xl p-4 border shadow-sm"
                      style={{ borderColor: `${profile.color}20` }}
                    >
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center font-black text-xl shrink-0"
                        style={{
                          background: profile.color,
                          color: "white",
                          boxShadow: `0 4px 12px ${profile.color}30`,
                        }}
                      >
                        {i + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-base mb-1" style={{ color: "var(--color-on-surface)" }}>
                          {step.title}
                        </h4>
                        <p className="text-sm leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* ── Materi Rekomendasi ── */}
            <section className="py-12 px-5 md:px-12">
              <div className="max-w-5xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: "var(--color-on-surface)" }}>
                  Materi Rekomendasi Untukmu
                </h2>
                <p className="text-sm mb-8" style={{ color: "var(--color-on-surface-variant)" }}>
                  Mulai perjalanan belajarmu dari sini.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {profile.recommendedMateri.map((m) => (
                    <Link
                      key={m.id}
                      href={`/materi/${m.id}`}
                      className="group p-6 rounded-2xl bg-white border transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                      style={{ borderColor: "var(--color-border-subtle)" }}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <span
                          className="text-xs font-bold uppercase tracking-wider"
                          style={{ color: profile.color }}
                        >
                          {m.type}
                        </span>
                        <span className="text-xs" style={{ color: "var(--color-outline)" }}>
                          {m.duration}
                        </span>
                      </div>
                      <h4
                        className="font-bold text-base mb-4 transition-colors group-hover:text-primary"
                        style={{ color: "var(--color-on-surface)" }}
                      >
                        {m.title}
                      </h4>
                      <div
                        className="flex items-center text-sm font-semibold gap-1"
                        style={{ color: profile.color }}
                      >
                        <CheckCircle2 size={14} />
                        {m.type === "Video" ? "Tonton Sekarang" : m.type === "Panduan" ? "Pelajari" : "Baca Sekarang"}
                        <ChevronRight size={14} />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </section>

            {/* ── CTA ── */}
            <section className="py-12 px-5 md:px-12 text-center space-y-4">
              <Link
                href="/materi"
                className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-12 py-5 rounded-3xl font-bold text-lg transition-all duration-200 hover:scale-105 shadow-xl"
                style={{
                  background: profile.color,
                  color: "white",
                  boxShadow: `0 12px 32px ${profile.color}40`,
                }}
              >
                <BookOpen size={20} />
                Pelajari Materi yang Direkomendasikan
              </Link>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={() => router.push("/assessment")}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border font-semibold text-sm transition-all hover:bg-surface-variant text-on-surface-variant border-border-subtle"
                >
                  <RefreshCw size={15} />
                  Ulangi Assessment
                </button>
                <button
                  onClick={handlePrint}
                  disabled={isPrinting}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border font-semibold text-sm transition-all hover:bg-surface-variant text-on-surface-variant border-border-subtle disabled:opacity-60"
                >
                  <Download size={15} />
                  {isPrinting ? "Mempersiapkan..." : "Simpan Hasil (PDF)"}
                </button>
                <button
                  onClick={() => setEmailModalOpen(true)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border font-semibold text-sm transition-all hover:bg-surface-variant text-on-surface-variant border-border-subtle"
                >
                  <Mail size={15} />
                  Kirim ke Email
                </button>
              </div>
              <div className="pt-6">
                <Link
                  href="/"
                  className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full font-bold text-sm transition-all hover:scale-105 active:scale-95 text-white"
                  style={{
                    backgroundColor: profile.color,
                  }}
                >
                  Kembali ke Beranda
                </Link>
              </div>
            </section>
          </div>
        </main>
      </div>

      {/* ── PRINT VIEW (HIDDEN ON SCREEN, SHOWN ON PRINT) ── */}
      <div className="hidden print:block print-document text-[#0f172a] bg-white p-12 mx-auto font-sans" style={{ width: "210mm", minHeight: "297mm" }}>
        {/* PAGE 1 */}
        <div className="flex flex-col justify-between" style={{ minHeight: "270mm", pageBreakAfter: "always" }}>
          <div>
            {/* Kop Surat */}
            <div className="text-center border-b-4 border-double border-slate-700 pb-4 mb-6">
              <h1 className="text-2xl font-extrabold tracking-wide text-slate-900">YOUTH DEVELOPMENT PROGRAM</h1>
              <p className="text-xs font-bold text-slate-600 uppercase tracking-widest mt-1">Layanan Pemetaan Minat &amp; Perencanaan Jurusan Kuliah</p>
              <p className="text-[10px] text-slate-400 mt-1">Desa Tulungrejo, Kecamatan Bumiaji, Kota Batu</p>
            </div>

            {/* Title */}
            <div className="text-center mb-8">
              <h2 className="text-lg font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-2 inline-block">LAPORAN HASIL ASESMEN MINAT &amp; JURUSAN</h2>
            </div>

            {/* Identitas Siswa */}
            <div className="mb-6 bg-slate-50 border border-slate-200 rounded-xl p-4">
              <table className="w-full text-xs">
                <tbody>
                  <tr>
                    <td className="font-bold text-slate-500 py-1 w-1/4">Nama Siswa</td>
                    <td className="text-slate-800 py-1">: {studentName || "Siswa TDP"}</td>
                  </tr>
                  <tr>
                    <td className="font-bold text-slate-500 py-1">Tanggal Tes</td>
                    <td className="text-slate-800 py-1">: {new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}</td>
                  </tr>
                  <tr>
                    <td className="font-bold text-slate-500 py-1">Rumpun Jurusan</td>
                    <td className="text-slate-800 py-1">: <span className="font-bold uppercase">{profile.rumpun === secondaryProfile.rumpun ? profile.rumpun : `${profile.rumpun} & ${secondaryProfile.rumpun}`}</span></td>
                  </tr>
                  <tr>
                    <td className="font-bold text-slate-500 py-1">Kode Holland</td>
                    <td className="text-slate-800 py-1">: <span className="font-bold uppercase text-primary">{hollandCode}</span></td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Profil Utama & Pendukung */}
            <div className="mb-8 space-y-4">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Tipe Kepribadian Utama:</h3>
                <div className="border-l-4 p-3 rounded-r-xl bg-slate-50" style={{ borderColor: profile.color }}>
                  <h4 className="text-sm font-bold flex items-center gap-2" style={{ color: profile.color }}>
                    {(() => {
                      const IconComp = CATEGORY_ICONS[result];
                      return IconComp ? <IconComp size={16} className="inline-block text-slate-800" /> : null;
                    })()}
                    <span>{profile.title}</span>
                  </h4>
                  <p className="text-[11px] text-slate-700 leading-relaxed mt-1">{profile.description}</p>
                </div>
              </div>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Tipe Kepribadian Pendukung:</h3>
                <div className="border-l-4 p-3 rounded-r-xl bg-slate-50" style={{ borderColor: secondaryProfile.color }}>
                  <h4 className="text-sm font-bold flex items-center gap-2" style={{ color: secondaryProfile.color }}>
                    {(() => {
                      const IconComp = CATEGORY_ICONS[secondaryResult];
                      return IconComp ? <IconComp size={16} className="inline-block text-slate-800" /> : null;
                    })()}
                    <span>{secondaryProfile.title}</span>
                  </h4>
                  <p className="text-[11px] text-slate-700 leading-relaxed mt-1">{secondaryProfile.description}</p>
                </div>
              </div>
            </div>

            {/* Tabel Skor Kuis */}
            <div className="mb-8">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Grafik Perolehan Skor Dimensi RIASEC:</h3>
              <table className="w-full text-left text-xs border border-slate-200 rounded-xl overflow-hidden">
                <thead>
                  <tr className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                    <th className="p-3 w-1/3">Kategori Dimensi</th>
                    <th className="p-3 w-1/6 text-center">Tingkat Minat</th>
                    <th className="p-3">Kesesuaian Visual</th>
                  </tr>
                </thead>
                <tbody>
                  {allCategories.map((c) => {
                    const score = scores[c] || 0;
                    const percent = Math.min((score / 20) * 100, 100);
                    return (
                      <tr key={c} className="border-b border-slate-100 last:border-b-0">
                        <td className="p-3 font-semibold text-slate-700">{c}</td>
                        <td className="p-3 text-center font-bold text-slate-800">{Math.round(percent)}%</td>
                        <td className="p-3">
                          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full rounded-full" style={{ width: `${percent}%`, backgroundColor: categoryColors[c] || profile.color }} />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Footer Page 1 */}
          <div className="text-center text-[10px] text-slate-400 border-t border-slate-100 pt-3">
            Halaman 1 dari 2 — Laporan Hasil Asesmen Youth TDP
          </div>
        </div>

        {/* PAGE 2 */}
        <div className="flex flex-col justify-between" style={{ minHeight: "270mm" }}>
          <div>
            {/* Header Page 2 */}
            <div className="border-b border-slate-200 pb-3 mb-6 flex justify-between items-center">
              <span className="text-xs font-bold text-slate-500">LAPORAN HASIL ASESMEN MINAT</span>
              <span className="text-xs font-bold uppercase text-slate-400">RUMPUN {profile.rumpun}</span>
            </div>

            {/* Jurusan Kuliah */}
            <div className="mb-8">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
                <GraduationCap size={14} className="text-slate-500" />
                <span>Rekomendasi Jurusan Kuliah Utama &amp; Pendukung:</span>
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {profile.careers.map((c, i) => {
                  const IconComp = CAREER_ICONS[c.title];
                  return (
                    <div key={i} className="border border-slate-200 rounded-xl p-3 bg-slate-50">
                      <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                        {IconComp ? <IconComp size={14} className="text-slate-500" /> : null}
                        <span>{c.title}</span>
                      </h4>
                      <span className="block text-[8px] font-bold uppercase tracking-wider text-slate-400 mt-0.5">{result} (Utama)</span>
                      <p className="text-[10px] text-slate-600 leading-normal mt-1">{c.desc}</p>
                    </div>
                  );
                })}
                {secondaryProfile.careers.map((c, i) => {
                  const IconComp = CAREER_ICONS[c.title];
                  return (
                    <div key={i} className="border border-slate-200 rounded-xl p-3 bg-slate-50">
                      <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                        {IconComp ? <IconComp size={14} className="text-slate-500" /> : null}
                        <span>{c.title}</span>
                      </h4>
                      <span className="block text-[8px] font-bold uppercase tracking-wider text-slate-400 mt-0.5">{secondaryResult} (Pendukung)</span>
                      <p className="text-[10px] text-slate-600 leading-normal mt-1">{c.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Mata Pelajaran Pendukung */}
            <div className="mb-8">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
                <BookOpen size={14} className="text-slate-500" />
                <span>Mata Pelajaran Fokus &amp; Pendukung (SNBP):</span>
              </h3>
              <table className="w-full text-left text-xs border border-slate-200 rounded-xl overflow-hidden">
                <thead>
                  <tr className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                    <th className="p-3 w-1/3">Mata Pelajaran</th>
                    <th className="p-3">Peran &amp; Urgensi untuk SNBP</th>
                  </tr>
                </thead>
                <tbody>
                  {profile.fields.map((f, i) => (
                    <tr key={i} className="border-b border-slate-100 last:border-b-0">
                      <td className="p-3 font-semibold text-slate-700 flex items-center gap-1.5">
                        {(() => {
                          const IconComp = FIELD_ICONS[f.name];
                          return IconComp ? <IconComp size={14} className="text-slate-500" /> : null;
                        })()}
                        <span>{f.name}</span>
                      </td>
                      <td className="p-3 text-slate-600 leading-relaxed">{f.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Rencana Aksi */}
            <div className="mb-12">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
                <Sparkles size={14} className="text-slate-500" />
                <span>Rencana Aksi &amp; Langkah Lanjutan:</span>
              </h3>
              <ul className="space-y-2 text-xs text-slate-700 pl-4 list-decimal">
                {profile.steps.map((step, i) => (
                  <li key={i} className="leading-relaxed">
                    <strong>{step.title}</strong>: {step.desc}
                  </li>
                ))}
              </ul>
            </div>

            {/* Tanda Tangan */}
            <div className="flex justify-between items-end mt-12 pt-8 border-t border-slate-100">
              <div className="text-[10px] text-slate-400">
                Dokumen ini sah dikeluarkan oleh Sistem Penilaian Youth TDP secara digital.
              </div>
              <div className="text-center w-1/3 text-xs">
                <p className="text-slate-500">Kota Batu, {new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}</p>
                <p className="font-bold text-slate-800 mt-1">Tim Konseling Akademik</p>
                <div className="h-16 flex items-center justify-center">
                  <span className="text-[10px] text-slate-300 italic">[Tanda Tangan Digital]</span>
                </div>
                <p className="font-bold text-slate-800 border-t border-slate-300 pt-1">Youth TDP</p>
              </div>
            </div>
          </div>

          {/* Footer Page 2 */}
          <div className="text-center text-[10px] text-slate-400 border-t border-slate-100 pt-3">
            Halaman 2 dari 2 — Laporan Hasil Asesmen Youth TDP
          </div>
        </div>
      </div>

      {/* ── Modal Kirim Email ── */}
      {emailModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div 
            className="w-full max-w-md bg-white rounded-[32px] overflow-hidden border border-outline-variant shadow-2xl p-8 relative animate-scaleUp"
            style={{ animationDuration: '0.2s' }}
          >
            <button 
              onClick={() => {
                setEmailModalOpen(false);
                setSendStatus("");
              }}
              className="absolute top-6 right-6 p-1.5 rounded-full hover:bg-surface-variant transition-colors"
              style={{ color: "var(--color-outline)" }}
            >
              <X size={18} />
            </button>

            <div className="text-center mb-6">
              <div 
                className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4"
                style={{ background: `${profile.color}12`, color: profile.color }}
              >
                <Mail size={28} />
              </div>
              <h3 className="text-xl font-bold text-on-surface">Kirim Laporan Hasil</h3>
              <p className="text-xs text-on-surface-variant mt-1.5 leading-relaxed">
                Kami akan mengirimkan ringkasan rekomendasi jurusan dan mata pelajaran pendukung langsung ke alamat email Anda.
              </p>
            </div>

            {sendStatus === "success" ? (
              <div className="text-center py-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 text-green-600 mb-4">
                  <CheckCircle2 size={24} />
                </div>
                <h4 className="text-base font-bold text-on-surface">Email Terkirim!</h4>
                <p className="text-xs text-on-surface-variant mt-1.5">
                  Laporan hasil asesmen telah berhasil dikirim ke <strong>{emailInput}</strong>.
                </p>
                <button
                  onClick={() => {
                    setEmailModalOpen(false);
                    setSendStatus("");
                  }}
                  className="mt-6 w-full py-3 rounded-2xl font-bold text-sm text-white transition-all active:scale-95"
                  style={{ backgroundColor: profile.color }}
                >
                  Tutup
                </button>
              </div>
            ) : (
              <form onSubmit={handleSendEmail} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-on-surface-variant mb-1.5 uppercase tracking-wider">Nama Lengkap</label>
                  <input
                    type="text"
                    required
                    placeholder="Nama Lengkap Siswa"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-on-surface-variant mb-1.5 uppercase tracking-wider">Alamat Email</label>
                  <input
                    type="email"
                    required
                    placeholder="nama@email.com"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                  />
                </div>

                {sendStatus === "error" && (
                  <p className="text-xs text-red-600 font-medium">
                    ⚠️ Gagal mengirim email: {sendErrorMessage}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full py-3.5 rounded-2xl font-bold text-sm text-white transition-all active:scale-95 flex items-center justify-center gap-2"
                  style={{ 
                    backgroundColor: isSending ? "var(--color-outline)" : profile.color,
                    cursor: isSending ? "not-allowed" : "pointer" 
                  }}
                >
                  {isSending ? (
                    <>Mengirim...</>
                  ) : (
                    <>
                      <Mail size={16} />
                      Kirim Laporan
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleUp {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out forwards;
        }
        .animate-scaleUp {
          animation: scaleUp 0.2s ease-out forwards;
        }
        @media print {
          body, .min-h-screen, main {
            background-color: white !important;
            color: black !important;
            padding-top: 0 !important;
            padding-bottom: 0 !important;
          }
          section {
            page-break-inside: avoid !important;
          }
        }
      `}</style>
    </div>
  );
}

export default function HasilPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--color-background)" }}>
        <div className="text-center">
          <div className="text-4xl mb-4 animate-bounce">🔬</div>
          <p className="font-semibold" style={{ color: "var(--color-primary)" }}>Menganalisis hasilmu...</p>
        </div>
      </div>
    }>
      <HasilContent />
    </Suspense>
  );
}
