export interface ArticleContent {
  summary: string;
  goals: string[];
  contentMarkdown: string;
  caseStudyTitle?: string;
  caseStudyContent?: string;
  caseStudySolution?: string;
  reflectionQuestions: string[];
}

export const ARTICLES_CONTENT: Record<string, ArticleContent> = {
  "1": {
    summary: "Mengetahui potensi diri adalah langkah awal menuju karir yang memuaskan. Dalam materi ini, kita akan membedah bagaimana memahami siapa diri Anda sebenarnya, menggali nilai hidup, serta kebiasaan utama Anda.",
    goals: [
      "Mengidentifikasi 5 nilai inti (core values) kepribadian.",
      "Menyadari kecenderungan sosial, minat dasar, dan lingkungan kerja ideal."
    ],
    contentMarkdown: `Banyak dari kita menghabiskan waktu bertahun-tahun untuk mempelajari dunia luar, tetapi lupa meluangkan waktu untuk mempelajari diri sendiri. Mengenal diri sendiri secara mendalam bukanlah tentang menjadi egois, melainkan tentang membangun fondasi yang kokoh untuk keputusan masa depan Anda.

Ketika Anda memahami nilai-nilai hidup Anda, apa yang memotivasi Anda, dan bagaimana Anda merespons tekanan, Anda akan memiliki kompas yang jelas dalam memilih jurusan sekolah, karir, atau bahkan lingkaran pertemanan.

![Mengenal Diri Sendiri](https://lh3.googleusercontent.com/aida-public/AB6AXuCj9bsuCJncIzdi_85fqm2_9tptwjr79FmLuWnhRERir0C4elu1SDW6AXt70Y-McZupBmUOgDd1_AZNYufF-AmQ7Cm_e9XJxzaBGlCGAvELhyW__FpxAdSjVeY5KGypZGit2fS61P7chmBCgvf6DxniJT9mVwCoV_LJDu4O6WNj9psjBMWEsTYZMfnmIseEpks_3eBVhS9c5K0S8c105O53f_zlcFYFxsUePZLExsQpvVyq9WsBMZmy5IuOE5D_O2z8jw612N9nLnw "Infografis: Tiga Pilar Pemetaan Diri")

### Tiga Langkah Awal Memahami Diri

Untuk memulai, Anda dapat menggunakan kerangka kerja sederhana ini: pertama, catat aktivitas harian yang paling banyak memberi Anda energi; kedua, mintalah umpan balik jujur dari 3 teman terdekat mengenai keunikan Anda; dan ketiga, definisikan hal-hal apa saja yang tidak ingin Anda kompromikan dalam hidup.`,
    caseStudyTitle: "Perjalanan Rina Menemukan Arah",
    caseStudyContent: "Rina adalah siswi berprestasi di bidang seni, namun ia selalu dipaksa untuk masuk ke jurusan akuntansi oleh orang tuanya. Ia merasa cemas dan tidak memiliki gairah belajar.",
    caseStudySolution: "Setelah melakukan pemetaan diri, Rina menyadari ia menyukai struktur organisasi akuntansi namun dengan ekspresi artistik. Rina akhirnya mengambil jurusan Desain Komunikasi Visual dan fokus pada spesialisasi UX Design & Brand Strategy—menggabungkan keahlian logika struktur data dengan kreativitas seni visualnya.",
    reflectionQuestions: [
      "Aktivitas apa saja dalam seminggu terakhir yang membuat Anda merasa paling berenergi?",
      "Nilai apa yang paling penting bagi Anda? (Kebebasan, Keamanan, Kreativitas, atau Dampak Sosial?)"
    ]
  },
  "2": {
    summary: "Mengetahui potensi diri adalah langkah awal menuju karir yang memuaskan. Dalam materi ini, kita akan membedah perbedaan mendasar antara minat dan bakat, serta bagaimana keduanya berkolaborasi dalam membentuk masa depan profesional Anda.",
    goals: [
      "Memahami definisi psikologis dari minat dan bakat secara komprehensif.",
      "Mampu mengidentifikasi dorongan internal versus keterampilan bawaan."
    ],
    contentMarkdown: `Banyak orang seringkali tertukar antara minat dan bakat. Padahal, secara fundamental, keduanya memiliki akar yang berbeda. **Minat** adalah ketertarikan yang kuat terhadap sesuatu—sebuah dorongan emosional yang membuat Anda menikmati aktivitas tertentu. Sedangkan **Bakat** adalah kemampuan bawaan yang memungkinkan seseorang mempelajari sesuatu dengan lebih cepat dan mencapai hasil yang lebih unggul dibandingkan orang lain.

![Intersection of Minat and Bakat](https://lh3.googleusercontent.com/aida-public/AB6AXuAr9XDxQdpsm3IcVbvieua56vBA8QDyJlW16sOuREVkLHXVx_zTMqXQuq_pOGU0SRzvTYRU03DVIEMHd_w0TTdUqHj5r59p1xliB9zUjkf03A02J18Xjxnp4A6Zjju7r5SU0eTEyyk-Ozx6ILOT1SPV47ln3xOAOAtU3AFgi3dS9I3-eZsRpvjf_B_jyuI-dZ3IogW7oIfI7WrBluEfgOW485GIE8HdVvmwSOfoL4MHumW7_1SeHNQbI7f85xfG59wN0nIycloV6I "Infografis: Titik Temu Antara Keinginan dan Kemampuan")

### Kenapa Memahami Keduanya Penting?

Memiliki minat tanpa bakat mungkin membuat Anda bersemangat tetapi memerlukan usaha lebih keras untuk mahir. Sebaliknya, memiliki bakat tanpa minat seringkali berujung pada kebosanan meski Anda sangat terampil. Harmonisasi keduanya adalah kunci dari *high-performance*.`,
    caseStudyTitle: "Contoh Kasus: Perjalanan Budi",
    caseStudyContent: "Budi memiliki bakat logis-matematis yang sangat tinggi sejak kecil. Dia bisa menyelesaikan soal kalkulus lebih cepat dari teman-temannya. Namun, minat Budi justru di dunia narasi dan penulisan kreatif.",
    caseStudySolution: "Budi tidak harus meninggalkan salah satunya. Ia menggabungkan keduanya menjadi karir sebagai Data Journalist, di mana bakat logikanya digunakan untuk mengolah data dan minat narasinya digunakan untuk menceritakan temuan tersebut kepada publik.",
    reflectionQuestions: [
      "Aktivitas apa yang membuat Anda lupa waktu saat melakukannya? (Minat)",
      "Hal apa yang sering dipuji orang lain tentang kemampuan Anda, padahal Anda merasa melakukannya dengan sangat mudah? (Bakat)"
    ]
  },
  "3": {
    summary: "Memilih jurusan sekolah dan kuliah seringkali menjadi sumber kebingungan utama bagi siswa. Di modul ini, kami memaparkan peta jalan berbagai program jurusan beserta prospek riilnya di industri.",
    goals: [
      "Memahami perbedaan kurikulum vokasi vs akademik.",
      "Mengetahui tren jurusan dengan pertumbuhan permintaan tertinggi."
    ],
    contentMarkdown: `Memilih jurusan bukan sekadar mengikuti tren atau gengsi, melainkan menyesuaikan rute akademis dengan tujuan jangka panjang Anda. Memilih jurusan kuliah yang keliru bisa berdampak pada motivasi belajar dan kesiapan kerja di masa mendatang.

Di era sekarang, batas-batas antardisiplin ilmu semakin cair. Banyak jurusan baru yang menawarkan keahlian lintas bidang, seperti Bioinformatics, Digital Humanities, dan Financial Technology. Memahami landscape ini akan membantu Anda merencanakan pilihan secara taktis.

![Path signs illustration](https://lh3.googleusercontent.com/aida-public/AB6AXuBLsEnpU9a6WQ8DWdi6p7In3_iMTyR2g959UvH-fx24-AAZFEI5sXRQpNOb-L4gSxJhggKw1_cE9IY9CMvliJr4rQxSi1GbFyPerWnGrC6Ckaebizs7xFEbu1vtljDNZrQB6JyYN0L3D85CA-LyM7h9mOeuhG_Ss3luE2DoeJ6nWokqJfls3eS2uqoIQgrXwaVDcOYR0jwdlg7550whDejGQImhIgzdGWYDGQy50erONqaMnXEa75X7ShI_49cDqLUnrfSKdTs567E "Infografis: Peta Cabang Keilmuan Modern")

### Tips Memilih Jurusan yang Tepat

Selaraskan pilihan Anda menggunakan model tiga lingkaran: (1) Apa yang paling Anda kuasai, (2) Apa yang paling Anda minati, dan (3) Jurusan mana yang memiliki prospek pertumbuhan karir sehat di masa depan.`,
    caseStudyTitle: "Pilihan Jurusan yang Tepat",
    caseStudyContent: "Toni menyukai komputer namun tidak menyukai coding intensif. Dia bingung memilih antara Teknik Informatika atau Sistem Informasi.",
    caseStudySolution: "Setelah berkonsultasi, Toni mengambil Sistem Informasi karena jurusan ini menggabungkan manajemen bisnis dengan teknologi informasi—memungkinkan dia tetap bergelut di bidang IT tanpa harus menulis script backend seharian.",
    reflectionQuestions: [
      "Jurusan apa saja yang terlintas di kepala Anda saat ini? Tuliskan setidaknya tiga.",
      "Apa motivasi terbesar Anda dalam memilih jurusan tersebut?"
    ]
  }
};
