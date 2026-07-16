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
    summary:
      "Modul pembuka ini mengajak siswa memahami mengapa masa SMP adalah fase krusial dalam hidup mereka. Siswa akan mengenali tantangan-tantangan yang biasa dihadapi remaja seperti perilaku berisiko, kecanduan gadget, dan pergaulan bebas, serta memahami bahwa fokus dan tujuan yang jelas adalah kunci untuk terhindar dari hal-hal tersebut.",
    goals: [
      "Siswa memahami bahwa pilihan dan kebiasaan di masa SMP menentukan arah masa depan.",
      "Siswa dapat mengidentifikasi bentuk-bentuk perilaku berisiko yang mengancam remaja.",
      "Siswa memahami pentingnya fokus, tujuan, dan manajemen diri sebagai benteng dari pergaulan negatif."
    ],
    contentMarkdown: `Masa SMP adalah fase transisi yang krusial. Pilihan dan kebiasaan yang kalian bangun hari ini akan sangat menentukan arah masa depan kalian. Inilah alasan mengapa penting bagi kita untuk membahas topik pengembangan diri sejak dini.

### Tantangan Masa Remaja
Masa remaja penuh dengan rasa ingin tahu, namun juga dikelilingi jebakan yang bisa merusak masa depan.

* **Perilaku Berisiko** — Kenakalan remaja, pergaulan bebas, dan kecanduan gadget mengancam produktivitas.
* **Pentingnya Fokus** — Kunci terhindar dari perilaku negatif adalah memiliki fokus dan tujuan yang jelas.
* **Manajemen Diri** — Remaja yang sibuk merancang masa depannya tidak akan punya waktu untuk hal-hal yang merugikan.

### Mengapa Ini Penting?
Dengan memiliki arah dan kesibukan yang positif, secara alami kalian akan lebih terhindar dari pengaruh negatif di sekitar. Modul-modul berikutnya akan membahas tiga pilar utama *career mapping*: visi & cita-cita, manajemen waktu, dan manajemen keuangan — serta bagaimana mengenali diri sendiri dan menjaga motivasi belajar.`,
    caseStudyTitle: "Studi Kasus: Rian dan Waktu Luangnya",
    caseStudyContent:
      "Rian adalah siswa kelas 8 yang setiap pulang sekolah menghabiskan waktu bermain game online hingga larut malam bersama teman-temannya. Nilai rapornya mulai turun dan ia sering mengantuk di kelas. Rian merasa hal ini wajar karena teman-temannya juga melakukan hal yang sama.",
    caseStudySolution:
      "Rian sebenarnya belum memiliki tujuan pribadi yang jelas, sehingga waktu luangnya diisi kegiatan yang tidak mendukung masa depannya. Jika Rian mulai menentukan cita-cita dan menyusun kegiatan yang mendekatkannya pada tujuan itu, ia akan lebih mudah mengatur prioritas dan secara alami mengurangi waktu untuk hal-hal yang kurang bermanfaat.",
    reflectionQuestions: [
      "Menurutmu, kebiasaan apa yang kamu lakukan sehari-hari yang mendekatkan atau justru menjauhkanmu dari cita-citamu?",
      "Apa yang akan terjadi pada masa depanmu jika kebiasaan itu terus berlanjut selama 5 tahun ke depan?"
    ]
  },

  "2": {
    summary:
      "Modul ini membahas pilar pertama dari career mapping, yaitu memetakan masa depan melalui visi dan cita-cita. Siswa diajak memahami bahwa cita-cita bukan sekadar angan-angan, melainkan membutuhkan strategi, perencanaan, kerja keras, dan konsistensi untuk diwujudkan.",
    goals: [
      "Siswa mampu menjelaskan pentingnya memiliki visi dan cita-cita yang jelas.",
      "Siswa memahami bahwa cita-cita besar membutuhkan strategi dan perencanaan, bukan hanya angan-angan.",
      "Siswa memahami peran kerja keras, konsistensi, dan Future Skills dalam mencapai cita-cita."
    ],
    contentMarkdown: `### Pilar 1: Memetakan Masa Depan
Cita-cita membutuhkan strategi dan perencanaan, bukan sekadar angan-angan semata. Peta karir dimulai dari satu titik: **visi dan cita-cita** yang jelas — ingin menjadi apa kalian di masa depan?

### Cita-Cita Butuh Usaha Ekstra
Pepatah mengatakan sukses adalah 1% bakat dan 99% kerja keras. **Sukses bukan kebetulan.**

Untuk meraih cita-cita yang besar, kalian membutuhkan:
* Konsistensi
* Sikap pantang menyerah
* Kemauan untuk terus mengasah **Future Skills**, seperti pemecahan masalah, kreativitas, dan berpikir kritis

### Langkah Awal
Cobalah tuliskan satu cita-cita utamamu, lalu pikirkan tiga langkah kecil yang bisa kamu mulai dari sekarang untuk mendekatkan dirimu ke sana.`,
    caseStudyTitle: "Studi Kasus: Cita-Cita Dewi",
    caseStudyContent:
      "Dewi ingin sekali menjadi dokter, tapi ia belum pernah menuliskan langkah apa yang harus dilakukan untuk mencapainya. Ia hanya berharap nilai-nilainya cukup baik saat kuliah nanti, tanpa persiapan yang jelas dari sekarang.",
    caseStudySolution:
      "Dewi perlu mengubah cita-citanya dari sekadar angan-angan menjadi rencana konkret: fokus pada mata pelajaran IPA, mencari informasi tentang jurusan kedokteran, dan mulai membangun kebiasaan belajar yang konsisten sejak SMP. Dengan strategi dan kerja keras yang terarah, cita-cita besar menjadi lebih mungkin diraih.",
    reflectionQuestions: [
      "Apa cita-citamu, dan langkah kecil apa yang bisa kamu lakukan minggu ini untuk mendekatkan dirimu ke cita-cita itu?",
      "Future Skill apa (pemecahan masalah, kreativitas, atau berpikir kritis) yang paling ingin kamu asah, dan mengapa?"
    ]
  },

  "3": {
    summary:
      "Modul ini membahas pilar kedua career mapping, yaitu manajemen waktu. Siswa akan belajar membedakan tugas yang penting dan mendesak, serta membangun kebiasaan disiplin agar tidak menunda pekerjaan.",
    goals: [
      "Siswa memahami waktu sebagai aset berharga yang tidak bisa didaur ulang.",
      "Siswa mampu membedakan skala prioritas antara tugas penting/mendesak dan kegiatan yang sekadar menyenangkan.",
      "Siswa memahami pentingnya disiplin dan menghindari kebiasaan menunda pekerjaan (procrastination)."
    ],
    contentMarkdown: `### Pilar 2: Manajemen Waktu
Bekerja lebih cerdas, atur prioritas, dan kelola aset paling berharga yang tidak bisa didaur ulang — yaitu waktu.

### Skala Prioritas
Bedakan antara tugas yang **penting & mendesak** dengan yang sekadar menyenangkan tapi tidak penting.

Fokuslah pada kegiatan yang mendekatkanmu pada cita-citamu, seperti belajar dan eksplorasi skill, dan tinggalkan kegiatan sia-sia yang memicu perilaku berisiko.

### Do It Now!
Jangan biasakan menunda-nunda pekerjaan (*procrastination*).

* Buatlah *to-do list* harian yang realistis
* Manfaatkan waktu luang dengan bijak
* Yang terpenting: **disiplin** pada jadwal yang telah kalian buat sendiri`,
    caseStudyTitle: "Studi Kasus: Tugas Numpuk Milik Andra",
    caseStudyContent:
      "Andra selalu menunda mengerjakan tugas sekolah karena merasa 'masih ada waktu'. Ia lebih memilih bermain HP dulu, dan baru mengerjakan tugas semalam sebelum dikumpulkan. Hasilnya sering terburu-buru dan nilainya kurang maksimal.",
    caseStudySolution:
      "Andra bisa mulai membuat to-do list harian dan menentukan skala prioritas: mengerjakan tugas penting terlebih dahulu sebelum bermain HP. Dengan disiplin mengikuti jadwal yang ia buat sendiri, Andra bisa mengerjakan tugas dengan lebih tenang dan hasil yang lebih baik.",
    reflectionQuestions: [
      "Kegiatan apa dalam kesehariamu yang termasuk 'menyenangkan tapi tidak penting' dan menghabiskan banyak waktumu?",
      "Apa satu kebiasaan menunda yang ingin kamu ubah mulai minggu ini?"
    ]
  },

  "4": {
    summary:
      "Modul ini membahas pilar ketiga career mapping, yaitu manajemen keuangan. Siswa akan belajar literasi keuangan dasar sejak dini melalui tiga langkah cerdas finansial pelajar: menabung di awal, membedakan kebutuhan dan keinginan, serta berinvestasi pada pengembangan diri.",
    goals: [
      "Siswa memahami pentingnya literasi keuangan sejak dini untuk mendukung masa depan.",
      "Siswa mampu membedakan antara kebutuhan (needs) dan keinginan (wants).",
      "Siswa memahami konsep 'investasi leher ke atas' untuk mendukung Future Skills."
    ],
    contentMarkdown: `### Pilar 3: Manajemen Keuangan
Memahami literasi keuangan sejak dini untuk mendukung investasi masa depanmu.

### 3 Langkah Cerdas Finansial Pelajar

**1. Sisihkan, Bukan Sisakan**
Budayakan menabung di awal. Begitu mendapat uang saku, langsung sisihkan sebagian untuk ditabung — jangan menunggu sisa jajan.

**2. Kebutuhan vs Keinginan**
Belilah barang karena butuh (misalnya alat tulis atau buku), dan tahan diri dari pengeluaran impulsif hanya karena ingin (misalnya bermain game online berlebihan).

**3. Investasi Leher ke Atas**
Gunakan uang tabunganmu untuk hal bermanfaat, seperti membeli buku pengembangan diri atau mengikuti kursus yang menunjang Future Skills-mu.`,
    caseStudyTitle: "Studi Kasus: Uang Saku Bima",
    caseStudyContent:
      "Bima mendapat uang saku Rp20.000 per hari. Namun ia sering menghabiskan semuanya untuk jajan dan top up game, sehingga tidak pernah punya tabungan meski sudah menerima uang saku selama bertahun-tahun.",
    caseStudySolution:
      "Bima bisa menerapkan prinsip 'sisihkan, bukan sisakan' dengan langsung menyisihkan sebagian uang sakunya untuk ditabung sebelum digunakan untuk hal lain. Ia juga perlu membedakan mana yang benar-benar kebutuhan (misalnya alat tulis) dan mana yang hanya keinginan (misalnya top up game berlebihan), agar tabungannya bisa digunakan untuk hal yang lebih bermanfaat di masa depan.",
    reflectionQuestions: [
      "Dari uang saku yang kamu terima, berapa persen yang biasanya untuk kebutuhan, dan berapa persen untuk keinginan?",
      "Jika kamu mulai menabung mulai hari ini, hal bermanfaat apa yang ingin kamu beli dari hasil tabungan itu?"
    ]
  },

  "5": {
    summary:
      "Modul ini mengenalkan konsep self-awareness kepada siswa menggunakan analogi Iceberg Model. Siswa diajak memahami bahwa apa yang terlihat dari seseorang (nilai, prestasi, ranking) hanyalah sebagian kecil dari siapa dirinya, dan bahwa mengenali diri sendiri sangat penting untuk mengambil keputusan dan mengembangkan potensi.",
    goals: [
      "Siswa memahami definisi dan pentingnya self-awareness dalam kehidupan sehari-hari.",
      "Siswa mampu mengidentifikasi hal-hal 'tersembunyi' dalam dirinya di luar prestasi yang terlihat, seperti minat, kebiasaan belajar, dan kepercayaan diri.",
      "Siswa dapat memberikan contoh kesadaran diri dalam konteks kebiasaan belajarnya sendiri."
    ],
    contentMarkdown: `### Siapa Aku?
"Apa yang terlihat dari seseorang hanyalah sebagian kecil dari siapa dirinya."

Menggunakan **Iceberg Model**, yang terlihat di permukaan hanyalah hal-hal seperti nilai rapor, prestasi, ranking, cara berbicara, dan hobi. Namun di bawah permukaan, ada hal-hal yang jauh lebih penting untuk dikenali:

* Mengenal diri sendiri (self-awareness)
* Minat dan bakat
* Kebiasaan belajar
* Motivasi belajar
* Kepercayaan diri
* Disiplin
* Tujuan dan cita-cita

### Apa Itu Self-Awareness?
Self-awareness adalah kemampuan seseorang untuk mengenali siapa dirinya, memahami apa yang dirasakan, apa yang dipikirkan, apa yang menjadi kekuatan, serta hal-hal yang masih perlu dikembangkan.

### Mengapa Penting?
Dengan self-awareness, kita akan lebih mudah untuk:
* Mengambil keputusan
* Percaya diri
* Menentukan tujuan
* Mengembangkan potensi

### Contoh dalam Kehidupan Sehari-hari
"Aku sadar kalau...."
* Aku lebih mudah memahami pelajaran dengan menonton video daripada hanya membaca buku.
* Aku sering menunda belajar kalau bermain HP terlalu lama.
* Aku lebih semangat belajar kalau punya target yang jelas.`,
    caseStudyTitle: "Studi Kasus: Sinta Bingung Memilih Ekstrakurikuler",
    caseStudyContent:
      "Sinta ikut ekstrakurikuler basket karena teman-temannya ikut, padahal ia sebenarnya lebih suka menggambar dan merasa lebih bersemangat saat berkarya seni. Ia merasa bingung mengapa ia tidak pernah termotivasi ikut latihan basket.",
    caseStudySolution:
      "Sinta perlu melatih self-awareness dengan mengenali apa yang benar-benar membuatnya bersemangat, bukan sekadar mengikuti pilihan teman. Dengan menyadari bahwa minatnya ada di bidang seni, Sinta bisa mengambil keputusan yang lebih sesuai dengan dirinya, seperti pindah ke ekstrakurikuler seni yang lebih mendukung potensinya.",
    reflectionQuestions: [
      "Sebutkan satu hal 'di bawah permukaan' tentang dirimu (minat, kebiasaan belajar, atau kepercayaan diri) yang mungkin belum banyak diketahui orang lain.",
      "Kapan terakhir kali kamu menyadari sesuatu tentang cara belajarmu sendiri? Apa yang kamu sadari?"
    ]
  },

  "6": {
    summary:
      "Modul ini membahas motivasi belajar secara mendalam: mengapa kita belajar, perbedaan motivasi intrinsik dan ekstrinsik, serta cara-cara praktis untuk menjaga dan mengisi kembali 'baterai motivasi' saat sedang menurun.",
    goals: [
      "Siswa memahami alasan belajar yang lebih bermakna daripada sekadar mengejar nilai.",
      "Siswa mampu membedakan motivasi intrinsik dan ekstrinsik beserta contohnya.",
      "Siswa mengetahui lima cara praktis untuk menjaga motivasi belajar."
    ],
    contentMarkdown: `### Kenapa Kita Belajar?
Belajar bukan hanya supaya:
* ❌ Hanya dapat nilai
* ❌ Hanya karena disuruh

Tetapi supaya:
* ✔️ Mengembangkan diri
* ✔️ Mencapai cita-cita
* ✔️ Membantu orang lain

### Motivasi Seperti Baterai
Ada kalanya motivasi penuh, ada kalanya habis. Yang penting adalah tahu cara mengisinya lagi.

**Cara mengisi "baterai motivasi":**
* 🎯 Punya tujuan
* 📅 Belajar sedikit demi sedikit
* 🤝 Meminta dukungan
* 🌱 Menghargai proses

### Dari Mana Motivasi Datang?

**Motivasi Intrinsik (dari dalam diri)**
"Aku belajar karena aku ingin berkembang."
Ciri-cirinya: belajar karena ingin memahami materi, penasaran dengan hal baru, ingin mengembangkan kemampuan, dan tetap semangat meski tanpa hadiah atau pujian.
*Contoh: "Aku belajar Bahasa Inggris karena ingin kuliah di luar negeri."*

**Motivasi Ekstrinsik (dari luar diri)**
"Aku belajar karena ada tujuan atau dorongan dari luar."
Ciri-cirinya: ingin mendapat pujian, belajar karena ada ulangan, ingin hadiah, atau menghindari hukuman.
*Contoh: "Aku belajar karena besok ada ujian Matematika."*

Keduanya wajar dan bisa berjalan bersamaan, namun motivasi intrinsik cenderung lebih tahan lama.

### Cara Menjaga Motivasi Belajar
1. **Memiliki Tujuan yang Jelas** — bisa berupa nilai lebih baik, masuk sekolah impian, atau cita-cita masa depan.
2. **Membuat Jadwal Belajar** — belajar sedikit demi sedikit setiap hari lebih efektif daripada belajar sekaligus menjelang ujian.
3. **Mengurangi Distraksi** — kurangi media sosial, game, atau video berlebihan saat belajar.
4. **Menghargai Setiap Kemajuan** — keberhasilan tidak selalu harus sempurna; menghargai kemajuan kecil membuat kita lebih percaya diri.
5. **Berani Meminta Bantuan** — bertanya kepada guru, orang tua, atau teman bukan tanda kelemahan, melainkan tanda ingin terus berkembang.`,
    caseStudyTitle: "Studi Kasus: Ujian Dadakan Farel",
    caseStudyContent:
      "Farel semangat belajar hanya menjelang ulangan karena takut nilainya jelek dan dimarahi orang tua. Setelah ulangan selesai, semangat belajarnya langsung hilang sampai ulangan berikutnya datang.",
    caseStudySolution:
      "Motivasi Farel selama ini murni ekstrinsik (takut hukuman/nilai jelek), sehingga tidak bertahan lama. Farel bisa mulai membangun motivasi intrinsik dengan menemukan alasan pribadi mengapa suatu pelajaran penting baginya, membuat jadwal belajar harian yang konsisten, dan menghargai kemajuan kecil yang ia capai, bukan hanya berfokus pada nilai ujian.",
    reflectionQuestions: [
      "Selama ini, motivasi belajarmu lebih banyak berasal dari dalam diri (intrinsik) atau dari luar (ekstrinsik)? Berikan contohnya.",
      "Dari lima cara menjaga motivasi belajar, mana yang paling ingin kamu coba terapkan minggu ini?"
    ]
  },

  "7": {
    summary:
      "Modul penutup ini membahas minat dan bakat, konsep self development, growth mindset, serta bagaimana menciptakan kebiasaan positif yang konsisten. Siswa diajak memahami bahwa kombinasi minat, bakat, dan latihan yang konsisten adalah kunci menuju prestasi.",
    goals: [
      "Siswa mampu membedakan antara minat dan bakat serta memberikan contohnya masing-masing.",
      "Siswa memahami konsep self development dan growth mindset sebagai proses pengembangan diri berkelanjutan.",
      "Siswa memahami pentingnya konsistensi, kedisiplinan, dan motivasi intrinsik dalam membangun kebiasaan positif."
    ],
    contentMarkdown: `### Minat dan Bakat
**Bakat** adalah kemampuan yang berkembang lebih cepat dibanding orang lain — apa yang menjadi kekuatanmu. *Contoh: mudah memahami matematika, cepat menghafal, berbicara di depan umum.*

**Minat** adalah sesuatu yang kita sukai — apa yang membuatmu bersemangat. *Contoh: menggambar, bermain musik, bermain bola.*

**Rumus prestasi:**
> Minat (aku suka melakukannya) + Bakat (aku memiliki kemampuan) + Latihan (aku terus belajar) → **Prestasi**

### Apa Itu Self Development?
Proses mengenali, mengembangkan, dan meningkatkan kemampuan, sikap, serta kebiasaan positif agar menjadi pribadi yang lebih baik dari hari ke hari.

**Mengapa penting?** Self development membantu kita mengenali potensi diri, menjadi lebih percaya diri, mencapai cita-cita, dan menjadi pribadi yang terus belajar dan berkembang.

**Dimulai dari hal-hal kecil:**
* Belajar sedikit demi sedikit setiap hari
* Mengurangi penggunaan media sosial saat waktu belajar
* Semangat belajar karena punya target yang jelas
* Berani bertanya ketika belum memahami pelajaran

### Apa Itu Growth Mindset?
Growth mindset adalah cara berpikir bahwa kemampuan seseorang dapat berkembang melalui usaha, latihan, dan pengalaman belajar — bukan sesuatu yang menetap sejak lahir.

**Langkah mengembangkan diri:**
1. **Kenali Dirimu** — cari tahu kelebihan, kekurangan, minat, bakat, dan nilai-nilai yang kamu miliki.
2. **Tentukan Tujuan** — buat tujuan yang ingin dicapai, baik dalam belajar maupun kehidupan sehari-hari.
3. **Buat Rencana** — susun langkah-langkah sederhana agar tujuan tersebut dapat dicapai.
4. **Konsisten Berlatih** — keberhasilan tidak datang dalam satu hari; dibutuhkan latihan, disiplin, dan kesabaran.

### Menciptakan Kebiasaan Positif
* **Konsistensi** — bangun kebiasaan baik dengan konsisten dalam tindakan sehari-hari.
* **Kedisiplinan** — tetap disiplin mengikuti rencana pengembangan diri.
* **Motivasi Intrinsik** — temukan motivasi dari dalam diri sendiri untuk bertindak, bukan hanya dari penghargaan eksternal.

### Kesimpulan
Motivasi dan self development adalah kunci untuk mencapai tujuan dan pengembangan pribadi diri. Kata "tidak bisa" (*can't*) seringkali hanya perlu dilihat lebih dekat untuk menemukan bahwa sebenarnya kita **bisa** — asal mau mencoba, konsisten, dan terus berkembang.`,
    caseStudyTitle: "Studi Kasus: Bakat Terpendam Alya",
    caseStudyContent:
      "Alya selalu merasa dirinya 'tidak berbakat apa-apa' karena nilai matematikanya biasa saja. Namun ia selalu jadi orang pertama yang teman-temannya cari saat butuh ide desain poster kelas, dan ia bisa menyelesaikannya dengan sangat cepat dan rapi.",
    caseStudySolution:
      "Alya sebenarnya memiliki bakat di bidang desain dan minat pada hal-hal visual/kreatif, hanya saja ia belum menyadarinya karena terlalu fokus membandingkan dirinya dengan standar akademis seperti matematika. Dengan menerapkan growth mindset, Alya bisa mulai mengenali kekuatannya sendiri, menentukan tujuan untuk mengasah kemampuan desainnya, dan berlatih secara konsisten — bukan berkecil hati karena tidak unggul di semua bidang.",
    reflectionQuestions: [
      "Menurutmu, apa bakat dan minat yang kamu miliki? Apakah keduanya sudah sejalan?",
      "Kebiasaan kecil apa yang bisa kamu mulai hari ini untuk mendukung growth mindset-mu?"
    ]
  }
};
