import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import {
  ArrowDownCircle,
  ArrowDownLeft,
  Bell,
  Briefcase,
  Calendar,
  Camera,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Chrome,
  Clock,
  Cloud,
  Coins,
  Compass,
  FileText,
  Globe,
  GraduationCap,
  HelpCircle,
  History,
  Home,
  Image as ImageIcon,
  Info,
  Instagram,
  ListTodo,
  Loader2,
  LogOut,
  Mail,
  Map as MapIcon,
  MapPin,
  MessageCircle,
  Music,
  Phone,
  Search,
  Send,
  Settings,
  Share2,
  SlidersHorizontal,
  Star,
  StickyNote,
  Store,
  TrendingUp,
  User,
  Users,
  Wallet,
  Plus,
} from "lucide-react";
import { EMPTY_UMKM_PROFILE, type UmkmProfile } from "../prototype/types";
import {
  UmkmOnboardStep1,
  UmkmOnboardStep2,
  UmkmOnboardStep3,
  UmkmOnboardReview,
  UmkmDashboard,
  UmkmPostJob,
  UmkmApplicants,
  UmkmBoost,
  UmkmDompet,
  UmkmProfil,
  UmkmNotifikasi,
  UmkmChat,
  UmkmBottomNav,
} from "../prototype/umkm-screens";
import type { UmkmApplicant, UmkmJobPost } from "../prototype/types";

export const Route = createFileRoute("/")({
  component: QuickJobDeck,
  head: () => ({
    meta: [
      { title: "QuickJob Campus · Pitch Deck" },
      { name: "description", content: "QuickJob Campus — micro-job dekat kampus, tanpa CV." },
    ],
  }),
});

/* ---------------- Slide content ---------------- */

type Slide = { id: string; label: string; render: () => React.ReactElement };

const SLIDES: Slide[] = [
  { id: "title", label: "Title & Hook", render: SlideTitle },
  { id: "team", label: "Team", render: SlideTeam },
  { id: "problem", label: "Permasalahan", render: SlideProblem },
  { id: "solution", label: "Nilai Lebih & Solusi", render: SlideSolution },
  { id: "competitive", label: "Keunggulan Kompetitif", render: SlideCompetitive },
  { id: "market", label: "Besaran Market", render: SlideMarket },
  { id: "product", label: "Produk & Teknologi", render: SlideProduct },
  { id: "biz", label: "Model Bisnis", render: SlideBiz },
  { id: "marketing", label: "Rencana Pemasaran", render: SlideMarketing },
  { id: "competitors", label: "Analisis Kompetitor", render: SlideCompetitors },
  { id: "financial", label: "Proyeksi Keuangan", render: SlideFinancial },
  { id: "traction", label: "Traksi AARRR", render: SlideTraction },
  { id: "milestones", label: "Milestone 3 Tahun", render: SlideMilestones },
  { id: "prototype", label: "Prototipe Aplikasi", render: SlidePrototype },
  { id: "closing", label: "Penutup", render: SlideClosing },
];

/* ---------------- Root deck ---------------- */

function QuickJobDeck() {
  const [i, setI] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);

  const go = useCallback(
    (next: number) => {
      const clamped = Math.max(0, Math.min(next, SLIDES.length - 1));
      setDir(clamped >= i ? 1 : -1);
      setI(clamped);
    },
    [i],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const inPhone = (e.target as HTMLElement)?.closest?.(".qj-phone");
      if (inPhone) return;
      if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") {
        e.preventDefault();
        go(i + 1);
      }
      if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        go(i - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, i]);

  return (
    <div className="qj-root">
      <style>{CSS}</style>
      <div className="qj-mesh" aria-hidden />
      <div className="qj-grain" aria-hidden />

      <header className="qj-topbar">
        <div className="qj-brand">
          <div className="qj-logo">
            <img src="/quickjob-logo.png" alt="QuickJob Campus Logo" />
          </div>
          <div className="qj-brand-text">
            <strong>QuickJob Campus</strong>
          </div>
        </div>
        <div className="qj-counter">
          <span className="qj-num">{String(i + 1).padStart(2, "0")}</span>
          <span className="qj-sep">/</span>
          <span className="qj-tot">{String(SLIDES.length).padStart(2, "0")}</span>
          <span className="qj-label">· {SLIDES[i].label}</span>
        </div>
        <div className="qj-controls">
          <button onClick={() => go(i - 1)} aria-label="Previous">
            ←
          </button>
          <button onClick={() => go(i + 1)} aria-label="Next">
            →
          </button>
        </div>
      </header>

      <main className="qj-stage">
        {SLIDES.map((s, idx) => {
          const state = idx === i ? "active" : idx < i ? "past" : "future";
          return (
            <section key={s.id} className={`qj-slide qj-slide-${state}`} data-dir={dir}>
              <div className="qj-slide-inner">{s.render()}</div>
            </section>
          );
        })}
      </main>

      <footer className="qj-progress">
        <div className="qj-dots">
          {SLIDES.map((s, idx) => (
            <button
              key={s.id}
              className={`qj-dot ${idx === i ? "on" : ""}`}
              onClick={() => go(idx)}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>
        <div className="qj-bar">
          <div className="qj-bar-fill" style={{ width: `${((i + 1) / SLIDES.length) * 100}%` }} />
        </div>
      </footer>
    </div>
  );
}

/* ---------------- Reusable bits ---------------- */

function Kicker({ children }: { children: React.ReactNode }) {
  return <p className="qj-kicker">{children}</p>;
}
function Title({ children }: { children: React.ReactNode }) {
  return <h2 className="qj-title">{children}</h2>;
}
function Lead({ children }: { children: React.ReactNode }) {
  return <p className="qj-lead">{children}</p>;
}
function Panel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`qj-panel ${className}`}>{children}</div>;
}
function Chip({ children }: { children: React.ReactNode }) {
  return <span className="qj-chip">{children}</span>;
}
function CodeChip({ children }: { children: React.ReactNode }) {
  return (
    <span className="qj-codechip">
      <i /> {children}
    </span>
  );
}

/* ---------------- Slides ---------------- */

function SlideTitle() {
  return (
    <div className="grid-2 hero">
      <div>
        <Kicker>Slide 1 · Title & Hook</Kicker>
        <div className="hero-mark">
          <div className="hero-logo">
            <img src="/quickjob-logo.png" alt="QuickJob Campus Logo" />
          </div>
          <Chip>Kerja Sampingan, Mudah &amp; Dekat</Chip>
        </div>
        <h1 className="hero-title">
          QuickJob
          <br />
          <span className="grad">Campus.</span>
        </h1>
        <p className="hero-tag">Micro-job dekat kampus, tanpa CV.</p>
        <Lead>
          Platform berbasis lokasi yang mempertemukan mahasiswa Yogyakarta dengan UMKM sekitar
          kampus untuk kerja cepat, portofolio otomatis, dan poin yang bisa menjadi uang.
        </Lead>
      </div>
      <div className="phones">
        <MiniPhone variant="left" />
        <MiniPhone variant="center" />
        <MiniPhone variant="right" />
      </div>
    </div>
  );
}

function MiniPhone({ variant }: { variant: "left" | "center" | "right" }) {
  return (
    <div className={`mini-phone mp-${variant}`} aria-hidden>
      <img src={`/phone-${variant}.png`} alt="" className="phone-image" />
    </div>
  );
}

function SlideTeam() {
  const members = [
    { name: "Reynard", photo: "reynard.jpeg", npm: "241712926" },
    { name: "Raymondo", photo: "raymondo.jpeg", npm: "241712966" },
    { name: "Nick", photo: "nick.jpeg", npm: "241712915" },
  ];
  return (
    <div className="team-layout">
      <div className="team-header">
        <Kicker>Slide 2 · Team</Kicker>
        <Title>Anggota Kelompok</Title>
      </div>
      <div className="team-grid-center">
        {members.map((m, idx) => (
          <article
            key={m.name}
            className="member-card-large"
            style={{ animationDelay: `${idx * 90}ms` }}
          >
            <div className="photo-frame-large">
              <img src={`/${m.photo}`} alt={m.name} className="team-photo" />
            </div>
            <h3>{m.name}</h3>
            <p className="member-npm">{m.npm}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

function SlideProblem() {
  return (
    <div className="grid-2">
      <div>
        <Kicker>Slide 3 · Permasalahan</Kicker>
        <Title>
          Kesenjangan antara kebutuhan finansial mahasiswa Yogyakarta &amp; operasional UMKM lokal.
        </Title>
        <Lead>
          Dengan lebih dari 350.000 mahasiswa aktif di DIY, terdapat potensi angkatan kerja yang
          sangat besar namun belum teroptimalisasi dengan baik.
        </Lead>
      </div>
      <div className="stack">
        <Panel>
          <h3 className="panel-h accent">Bagi Mahasiswa</h3>
          <ul className="bullets">
            <li>Kesulitan mencari kerja sampingan yang cocok dengan jadwal kuliah yang dinamis.</li>
            <li>
              Hambatan administratif yang tinggi (proses rekrutmen formal, CV, surat lamaran).
            </li>
            <li>Sulitnya membangun portofolio awal untuk melamar kerja setelah lulus kuliah.</li>
          </ul>
        </Panel>
        <Panel>
          <h3 className="panel-h">Bagi UMKM (Kafe, Event, Toko)</h3>
          <ul className="bullets">
            <li>
              Sering mengalami lonjakan pesanan mendadak atau kekurangan staf (staf utama absen).
            </li>
            <li>Proses rekrutmen pekerja harian/part-time memakan waktu lama dan tidak efisien.</li>
            <li>Risiko ketidakcocokan pekerja karena kurangnya verifikasi rekam jejak lokal.</li>
          </ul>
        </Panel>
      </div>
    </div>
  );
}

function SlideSolution() {
  const cards = [
    {
      t: "Kerja Tanpa CV",
      d: "Mahasiswa mendaftar cepat dengan data dasar, preferensi waktu, dan area kampus. Kredibilitas dibangun setelah tugas diselesaikan.",
    },
    {
      t: "Matching Real-Time",
      d: "Lowongan pekerjaan ditampilkan berdasarkan jarak radius dekat kampus, urgensi tugas.",
    },
    {
      t: "Auto Portfolio Builder",
      d: "Setiap pekerjaan yang selesai secara otomatis terekam menjadi riwayat pengalaman terverifikasi untuk peluang berikutnya.",
    },
  ];
  return (
    <div className="col">
      <div>
        <Kicker>Slide 4 · Nilai Lebih &amp; Solusi</Kicker>
        <Title>Micro-job berbasis lokasi, tanpa CV, dengan portofolio otomatis.</Title>
      </div>
      <CodeChip>solution.modules</CodeChip>
      <div className="grid-3">
        {cards.map((c, idx) => (
          <div className="card" key={c.t} style={{ animationDelay: `${idx * 100}ms` }}>
            <span className="card-num">0{idx + 1}</span>
            <h3>{c.t}</h3>
            <p>{c.d}</p>
          </div>
        ))}
      </div>
      <Panel>
        <Lead>
          QuickJob Campus bukan job portal biasa. Ini adalah lapisan kerja instan di sekitar kampus:
          mahasiswa mendapat pengalaman nyata, UMKM mendapat bantuan cepat, dan rekam jejak tumbuh
          otomatis dari pekerjaan yang sudah diselesaikan.
        </Lead>
      </Panel>
    </div>
  );
}

function SlideCompetitive() {
  const items = [
    {
      t: "Matching Super Cepat",
      d: "Menghubungkan UMKM yang membutuhkan bantuan mendesak dengan mahasiswa terdekat dalam hitungan menit, bukan hari.",
    },
    {
      t: "Sistem Gamifikasi & Kepercayaan",
      d: "Pemberian insentif koin yang dapat ditukar uang dan rating dua arah terverifikasi menjamin kualitas kinerja kedua belah pihak.",
    },
    {
      t: "Hyperlocal Focus",
      d: "Fokus eksklusif pada radius operasional 0–5 km di sekitar kawasan kampus padat mahasiswa di Yogyakarta.",
    },
  ];
  return (
    <div className="grid-2">
      <div>
        <Kicker>Slide 5 · Keunggulan Kompetitif</Kicker>
        <Title>Mengapa QuickJob Campus Berbeda &amp; Unggul?</Title>
        <Lead>
          Kami mengeliminasi hambatan masuk bagi mahasiswa dan UMKM dengan menciptakan platform
          mikro-lokal yang super-efisien.
        </Lead>
      </div>
      <div className="stack">
        {items.map((it) => (
          <Panel key={it.t}>
            <h3 className="panel-h accent">{it.t}</h3>
            <p className="muted">{it.d}</p>
          </Panel>
        ))}
      </div>
    </div>
  );
}

function SlideMarket() {
  return (
    <div className="grid-2">
      <div>
        <Kicker>Slide 6 · Besaran Market</Kicker>
        <Title>Mulai dari Yogyakarta, lalu replikasi ke kota kampus nasional.</Title>
        <Lead>
          Angka berikut diposisikan sebagai target TAM/SAM/SOM berdasarkan riset primer mahasiswa
          aktif dan densitas UMKM sekitar kampus.
        </Lead>
        <div style={{ marginTop: 18 }}>
          <CodeChip>market.scan Yogyakarta</CodeChip>
        </div>
      </div>
      <Panel className="market-stack">
        {[
          {
            k: "TAM Nasional",
            w: "92%",
            d: "8,3 Juta Mahasiswa aktif Indonesia + jutaan UMKM di kota-kota pendidikan.",
          },
          {
            k: "SAM DIY",
            w: "58%",
            d: "350.000+ Mahasiswa aktif di Yogyakarta (DIY) sebagai pasar layanan awal.",
          },
          {
            k: "SOM 12 Bulan",
            w: "22%",
            d: "Fokus 10.000 mahasiswa aktif di kampus prioritas (UGM, UNY, UMY) & 500 UMKM mitra.",
          },
        ].map((b) => (
          <div className="bar-row" key={b.k}>
            <strong>{b.k}</strong>
            <div className="bar-track">
              <div className="bar-fill" style={{ width: b.w }} />
            </div>
            <p className="muted">{b.d}</p>
          </div>
        ))}
      </Panel>
    </div>
  );
}

function SlideProduct() {
  return (
    <div className="grid-2">
      <div>
        <Kicker>Slide 7 · Produk &amp; Teknologi</Kicker>
        <Title>Aplikasi Mobile Berbasis Lokasi &amp; Onboarding Tanpa CV.</Title>
        <Lead>
          QuickJob Campus dirancang khusus dengan UI/UX modern untuk perangkat seluler demi
          kecepatan akses:
        </Lead>
        <ul className="bullets bullets-icon">
          <li>
            <b>Mini-Map Live:</b> Mahasiswa dapat mendeteksi lowongan langsung lewat peta interaktif
            di sekitar kampus mereka.
          </li>
          <li>
            <b>Profile Auto-Portofolio:</b> Pengalaman ter-update secara otomatis setelah pekerjaan
            diselesaikan, menggantikan CV konvensional.
          </li>
          <li>
            <b>Dompet Poin Terintegrasi:</b> Mahasiswa mengumpulkan koin bonus yang dapat dicairkan
            langsung ke E-Wallet (Gopay/OVO/Dana).
          </li>
        </ul>
      </div>
      <div className="phones-single">
        <div className="big-phone">
          <img src="/phone-center.png" alt="" className="phone-image-large" />
        </div>
      </div>
    </div>
  );
}

function SlideBiz() {
  return (
    <div className="grid-2">
      <div>
        <Kicker>Slide 8 · Model Bisnis &amp; Proyeksi Pendapatan</Kicker>
        <Title>Komisi transaksi ringan dan subscription boost untuk UMKM.</Title>
        <Panel>
          <h3 className="panel-h accent">Proyeksi Pendapatan 1 Tahun (Yogyakarta)</h3>
          <pre className="mono">
            {`Market Share × Income per Transaksi
= (5% dari 350.000 mhs = 17.500 mhs)
  × 2 job/bln × 12 bln × komisi Rp5.000
= 420.000 trx/tahun × Rp5.000 × 5%
= Rp105.000.000 / tahun (Komisi Dasar)`}
          </pre>
        </Panel>
      </div>
      <Panel className="lanes">
        <div className="lane">
          <strong>Komisi Transaksi</strong>
          <p className="muted">
            5% komisi dari nilai pekerjaan yang diselesaikan (Estimasi Rp2.500 – Rp7.500 per job).
          </p>
          <Chip>5% Fee</Chip>
        </div>
        <div className="lane">
          <strong>Subscription Boost</strong>
          <p className="muted">
            UMKM membayar untuk visibilitas lowongan di area kampus (Rp35.000/minggu atau
            Rp75.000/bulan).
          </p>
          <Chip>Boost Plan</Chip>
        </div>
        <div className="lane">
          <strong>Freemium Boost (Iklan)</strong>
          <p className="muted">
            UMKM dapat meningkatkan visibilitas lowongan secara gratis dengan menonton iklan.
            Pendapatan dari advertiser menjadi sumber revenue alternatif yang ramah UMKM mikro.
          </p>
          <Chip>Watch Ads to Boost</Chip>
        </div>
      </Panel>
    </div>
  );
}

function SlideMarketing() {
  const steps = [
    {
      n: "01 Awareness",
      t: "Menjangkau Target",
      b: ["Konten TikTok & IG harian", "Targeted Meta & TikTok Ads", "Booth & banner di kampus"],
    },
    {
      n: "02 Interest",
      t: "Menarik Minat",
      b: ["Landing page interaktif", "Konten YouTube edukatif", "Testimoni mahasiswa"],
    },
    {
      n: "03 Consideration",
      t: "Mempertimbangkan",
      b: ["Kemudahan Tanpa CV", "Rating tepercaya", "Kejelasan portofolio"],
    },
    {
      n: "04 Conversion",
      t: "Mulai Transaksi",
      b: ["Daftar cepat gratis", "Match otomatis jarak", "Boost gratis 1 bln UMKM"],
    },
    {
      n: "05 Retention",
      t: "Terus Menggunakan",
      b: ["Sistem Poin → Uang", "Notifikasi lowongan baru", "Rekomendasi personal"],
    },
    {
      n: "06 Advocacy",
      t: "Merekomendasikan",
      b: ["Program referral viral", "Komunitas WhatsApp aktif", "Share portofolio"],
    },
  ];
  return (
    <div className="col" style={{ justifyContent: "center" }}>
      <div>
        <Kicker>Slide 9 · Rencana Pemasaran (Customer Journey)</Kicker>
        <Title>Customer Journey &amp; Strategi Distribusi Pemasaran</Title>
      </div>
      <div className="journey">
        {steps.map((s, idx) => (
          <div className="journey-step" key={s.n} style={{ animationDelay: `${idx * 70}ms` }}>
            <span className="j-num">{s.n}</span>
            <h4>{s.t}</h4>
            <ul>
              {s.b.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

function SlideCompetitors() {
  return (
    <div className="grid-2">
      <div>
        <Kicker>Slide 10 · Analisis Kompetitor</Kicker>
        <Title>
          QuickJob Campus menempati ceruk pasar mikro-job lokal mahasiswa yang belum tersentuh.
        </Title>
        <Lead>
          Platform lain fokus pada karir formal jangka panjang atau jasa freelance online
          profesional. Kami fokus eksklusif pada mahasiswa dan UMKM terdekat.
        </Lead>
        <Panel>
          <p className="muted">
            <b>Moat kami:</b> Kecepatan rekrutmen, peniadaan CV, verifikasi berbasis lokasi dekat
            kampus, dan gamifikasi sistem poin.
          </p>
        </Panel>
      </div>
      <div className="matrix">
        <span className="axis ay-top">Fokus Lokasi &amp; Mahasiswa (Tinggi)</span>
        <span className="axis ay-bot">Fokus Lokasi (Rendah)</span>
        <span className="axis ax-right">Fleksibilitas (Tinggi)</span>
        <span className="axis ax-left">Fleksibilitas (Rendah)</span>
        <div className="dot us" style={{ left: "78%", top: "22%" }}>
          <span />
          <strong>QuickJob Campus</strong>
        </div>
        <div className="dot" style={{ left: "75%", top: "75%" }}>
          <span />
          <strong>LinkedIn / Upwork</strong>
        </div>
        <div className="dot" style={{ left: "25%", top: "80%" }}>
          <span />
          <strong>Glints / Kalibrr</strong>
        </div>
        <div className="dot" style={{ left: "30%", top: "35%" }}>
          <span />
          <strong>Portal Lowongan Kampus</strong>
        </div>
      </div>
    </div>
  );
}

function SlideFinancial() {
  return (
    <div className="grid-2">
      <div>
        <Kicker>Slide 11 · Kebutuhan &amp; Alokasi Dana</Kicker>
        <Title>Kebutuhan pendanaan awal Rp45–70 Juta (Seed Funding).</Title>
        <Lead>
          Dana ini akan digunakan untuk mempercepat validasi produk di pasar lokal (Yogyakarta) dan
          membangun traksi pengguna awal.
        </Lead>
      </div>
      <div className="stack">
        <Panel>
          <h3 className="panel-h accent">Alokasi Penggunaan Dana</h3>
          <div className="alloc">
            {[
              { l: "Pengembangan MVP & Produk", p: 50 },
              { l: "Akuisisi Pengguna Awal (Marketing)", p: 30 },
              { l: "Operasional & Legalitas", p: 20 },
            ].map((a) => (
              <div key={a.l}>
                <div className="alloc-row">
                  <span>{a.l}</span>
                  <span>{a.p}%</span>
                </div>
                <div className="alloc-bar">
                  <div style={{ width: `${a.p}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Panel>
        <div className="card">
          <span className="card-num">★</span>
          <h3>Rencana Alokasi</h3>
          <p>
            Dana dialokasikan secara efisien demi mencapai Break-Even Point (BEP) dalam 6–12 bulan
            pertama dengan operasional yang lean.
          </p>
        </div>
      </div>
    </div>
  );
}

function SlideTraction() {
  const aarrr = [
    { k: "Acquisition", v: "5.000 user baru/bulan dari campus ambassador & Meta/TikTok Ads." },
    { k: "Activation", v: "85% signup rate & selesai setup profil tanpa CV setelah download." },
    { k: "Retention", v: "45% Monthly Active Users (MAU) bertransaksi berulang." },
    { k: "Revenue", v: "Fee komisi 5%, 80 boost subs aktif, BEP dalam 6-12 bulan." },
    {
      k: "Referral",
      v: "30% akuisisi pengguna baru didapatkan dari program referral berhadiah koin.",
    },
  ];
  return (
    <div className="col">
      <div>
        <Kicker>Slide 12 · Traksi &amp; Validasi (Framework AARRR)</Kicker>
        <Title>Matriks Pertumbuhan &amp; Target KPI Validasi Awal</Title>
      </div>
      <CodeChip>growth.loop AARRR</CodeChip>
      <div className="aarrr">
        {aarrr.map((a, idx) => (
          <div className="aarrr-card" key={a.k} style={{ animationDelay: `${idx * 80}ms` }}>
            <span className="aarrr-letter">{a.k[0]}</span>
            <b>{a.k}</b>
            <p className="muted">{a.v}</p>
          </div>
        ))}
      </div>
      <Panel>
        <Lead>
          Loop pertumbuhan kami didasarkan pada retensi: semakin banyak mahasiswa menyelesaikan
          pekerjaan, semakin kuat portofolio otomatis mereka; semakin cepat UMKM mendapat staf,
          semakin sering mereka kembali memposting lowongan.
        </Lead>
      </Panel>
    </div>
  );
}

function SlideMilestones() {
  const ms = [
    {
      h: "Bulan 0–6",
      d: "Membangun MVP, validasi onboarding tanpa CV, menjaring 500 mahasiswa & 50 cafe pilot di Yogyakarta.",
    },
    {
      h: "Tahun 1",
      d: "Dominasi pasar Yogyakarta, aktivasi 5 kampus besar, BEP tercapai, integrasi sistem pembayaran otomatis.",
    },
    {
      h: "Tahun 2",
      d: "Ekspansi regional ke kota kampus tetangga (Surakarta, Semarang, Bandung), integrasi korporasi promotor event.",
    },
    {
      h: "Tahun 3",
      d: "Ekspansi nasional (Jakarta, Surabaya, Malang), peluncuran platform lowongan terintegrasi premium.",
    },
  ];
  return (
    <div className="col">
      <div>
        <Kicker>Slide 13 · Milestone Perencanaan 3 Tahun</Kicker>
        <Title>Milestone pengembangan bisnis dari Yogyakarta ke tingkat nasional.</Title>
        <Lead>
          Membangun pondasi lokal yang kokoh sebelum mereplikasi model bisnis ke kota-kota kampus
          padat di Indonesia.
        </Lead>
      </div>
      <CodeChip>runway.forecast 3yr</CodeChip>
      <div className="runway">
        {ms.map((m, idx) => (
          <div className="milestone" key={m.h} style={{ animationDelay: `${idx * 100}ms` }}>
            <div className="ms-dot" />
            <h3>{m.h}</h3>
            <p className="muted">{m.d}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Slide 14: Interactive prototype ---------- */

type ProtoScreen =
  | "homescreen"
  | "splash"
  | "welcome"
  | "masuk"
  | "otp"
  | "pilih-peran"
  | "preferensi"
  | "beranda"
  | "jelajah"
  | "detail"
  | "konfirmasi"
  | "lamaran-berhasil"
  | "aktivitas"
  | "chat"
  | "portofolio"
  | "dompet"
  | "cairkan"
  | "profil"
  | "notifikasi"
  | "umkm-onboard-1"
  | "umkm-onboard-2"
  | "umkm-onboard-3"
  | "umkm-onboard-review"
  | "umkm-dashboard"
  | "umkm-post-job"
  | "umkm-applicants"
  | "umkm-boost"
  | "umkm-dompet"
  | "umkm-profil"
  | "umkm-notifikasi"
  | "umkm-chat";

const UMKM_PRODUCT_SCREENS: ProtoScreen[] = [
  "umkm-dashboard",
  "umkm-post-job",
  "umkm-applicants",
  "umkm-boost",
  "umkm-dompet",
  "umkm-profil",
  "umkm-notifikasi",
  "umkm-chat",
];

const UMKM_STORAGE_KEY = "quickjob_umkm_v1";

const UMKM_SCREENS: ProtoScreen[] = [
  "umkm-onboard-1",
  "umkm-onboard-2",
  "umkm-onboard-3",
  "umkm-onboard-review",
  "umkm-dashboard",
  "umkm-post-job",
  "umkm-applicants",
  "umkm-boost",
  "umkm-dompet",
  "umkm-profil",
  "umkm-notifikasi",
  "umkm-chat",
];

const AVATAR_URL =
  "https://images.unsplash.com/photo-1589386417686-0d34b5903d23?auto=format&fit=crop&w=200&q=80";
const MAP_URL =
  "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80";
const WALLPAPER_URL =
  "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=600&q=80";

type ProtoJob = {
  id: string;
  title: string;
  company: string;
  distance: string;
  rate: string;
  duration: string;
  schedule: string;
  points: string;
  category: string;
  imageUrl: string;
  urgent: boolean;
  rating: number;
  description: string;
  tasks: string[];
  location: string;
};

const PROTO_JOBS: ProtoJob[] = [
  {
    id: "1",
    title: "Runner Event Kampus",
    company: "Panitia Inagurasi UGM",
    distance: "1.2 km",
    rate: "Rp85.000",
    duration: "3 jam",
    schedule: "Hari ini 16.00",
    points: "120",
    category: "Event",
    imageUrl:
      "https://images.unsplash.com/photo-1566409031818-9508be68fc74?auto=format&fit=crop&w=400&q=80",
    urgent: true,
    rating: 4.9,
    description:
      "Bantu registrasi peserta, arahkan tamu, dan rapikan booth setelah acara selesai.",
    tasks: ["Registrasi peserta", "Arahkan tamu", "Rapikan booth", "Lapor ke koordinator"],
    location: "Area kampus UGM, Yogyakarta",
  },
  {
    id: "2",
    title: "Admin Packing Online Shop",
    company: "Gudang Sleman",
    distance: "2.4 km",
    rate: "Rp70.000",
    duration: "4 jam",
    schedule: "Besok 09.00",
    points: "100",
    category: "Admin/Gudang",
    imageUrl:
      "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=400&q=80",
    urgent: false,
    rating: 4.7,
    description:
      "Bantu packing produk online shop, label pengiriman, dan input data pesanan.",
    tasks: ["Packing produk", "Tempel label pengiriman", "Input data pesanan", "Rapikan gudang"],
    location: "Gudang Sleman, dekat UII",
  },
  {
    id: "3",
    title: "Barista Shift Sore",
    company: "Kopi Klotok Pogung",
    distance: "3.1 km",
    rate: "Rp95.000",
    duration: "5 jam",
    schedule: "Akhir pekan",
    points: "160",
    category: "F&B",
    imageUrl:
      "https://images.unsplash.com/photo-1572982270699-473dfa34d7e7?auto=format&fit=crop&w=400&q=80",
    urgent: false,
    rating: 4.8,
    description: "Buat minuman kopi, sajikan pesanan, dan jaga kebersihan area kafe.",
    tasks: ["Buat minuman sesuai pesanan", "Sajikan ke pelanggan", "Jaga kebersihan bar", "Isi stok bahan"],
    location: "Kopi Klotok Pogung, dekat UGM",
  },
  {
    id: "4",
    title: "Penjaga Stand Bazaar",
    company: "Festival Kuliner UNY",
    distance: "0.8 km",
    rate: "Rp80.000",
    duration: "4 jam",
    schedule: "Sabtu 10.00",
    points: "130",
    category: "Event",
    imageUrl:
      "https://images.unsplash.com/photo-1754279492960-ac2b32098148?auto=format&fit=crop&w=400&q=80",
    urgent: false,
    rating: 4.6,
    description: "Jaga stand bazaar kuliner, terima pesanan, dan bantu packing makanan.",
    tasks: ["Jaga stand", "Terima pesanan", "Packing makanan", "Transaksi pembayaran"],
    location: "Kampus UNY, Yogyakarta",
  },
  {
    id: "5",
    title: "Kasir Tenant Kantin",
    company: "Kantin Mandiri UMY",
    distance: "1.6 km",
    rate: "Rp75.000",
    duration: "5 jam",
    schedule: "Senin 11.00",
    points: "110",
    category: "F&B",
    imageUrl:
      "https://images.unsplash.com/photo-1678445437181-454d1bb7ab9d?auto=format&fit=crop&w=400&q=80",
    urgent: false,
    rating: 4.5,
    description: "Terima pesanan, operasikan kasir, dan bantu pelayanan pelanggan.",
    tasks: ["Operasikan kasir", "Terima pesanan", "Hitung uang", "Layani pelanggan"],
    location: "Kantin UMY, Yogyakarta",
  },
  {
    id: "6",
    title: "Admin Perpustakaan",
    company: "Lantai 3, Perpus Pusat",
    distance: "1.2 km",
    rate: "Rp45.000",
    duration: "3 jam",
    schedule: "Hari ini 13.00",
    points: "100",
    category: "Admin",
    imageUrl:
      "https://images.unsplash.com/photo-1603058817990-2b9a9abbce86?auto=format&fit=crop&w=400&q=80",
    urgent: false,
    rating: 4.8,
    description: "Bantu pengunjung, rapikan buku, dan input data peminjaman.",
    tasks: ["Bantu pengunjung", "Rapikan rak buku", "Input data peminjaman", "Jaga area baca"],
    location: "Perpustakaan Pusat UGM",
  },
];

type ProtoNav = {
  go: (s: ProtoScreen) => void;
  back: () => void;
  reset: (s: ProtoScreen) => void;
  selectJob: (id: string) => void;
  job: ProtoJob | undefined;
  showToast: (msg: string) => void;
};

function PBtn({
  children,
  onClick,
  disabled = false,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="w-full px-6 py-3.5 rounded-2xl font-semibold text-white transition-all active:scale-95"
      style={{
        backgroundColor: disabled ? "#9B8164" : "#8A5F41",
        boxShadow: disabled ? "none" : "0 8px 24px rgba(138, 95, 65, 0.2)",
      }}
    >
      {children}
    </button>
  );
}

function SBtn({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full px-6 py-3.5 rounded-2xl font-semibold border-2 transition-all active:scale-95"
      style={{ borderColor: "#8A5F41", color: "#8A5F41", backgroundColor: "transparent" }}
    >
      {children}
    </button>
  );
}

function ProtoJobCard({ job, nav }: { job: ProtoJob; nav: ProtoNav }) {
  return (
    <button
      type="button"
      onClick={() => {
        nav.selectJob(job.id);
        nav.go("detail");
      }}
      className="w-full bg-white rounded-[20px] p-4 flex gap-3 items-start text-left transition-all active:scale-95"
      style={{ boxShadow: "0 8px 24px rgba(138, 95, 65, 0.12)" }}
    >
      <div className="w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0">
        <img src={job.imageUrl} alt={job.title} className="w-full h-full object-cover" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-[15px] mb-0.5" style={{ color: "#3D2A1C" }}>
              {job.title}
            </h3>
            <p className="text-[13px] mb-1" style={{ color: "#6E4A30" }}>
              {job.company}
            </p>
          </div>
          {job.urgent && (
            <span
              className="px-2 py-0.5 text-[10px] font-bold text-white rounded-full"
              style={{ backgroundColor: "#B5532B" }}
            >
              URGENT
            </span>
          )}
        </div>
        <div className="flex items-center gap-3 mb-2">
          <div className="flex items-center gap-1">
            <MapPin size={12} style={{ color: "#9B8164" }} />
            <span className="text-[12px]" style={{ color: "#9B8164" }}>
              {job.distance}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={12} style={{ color: "#9B8164" }} />
            <span className="text-[12px]" style={{ color: "#9B8164" }}>
              {job.duration}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-bold text-[15px]" style={{ color: "#8A5F41" }}>
            {job.rate}
          </span>
          <div
            className="flex items-center gap-1 px-2 py-1 rounded-full"
            style={{ backgroundColor: "#FFFBF2" }}
          >
            <Coins size={12} style={{ color: "#C9922C" }} />
            <span className="text-[12px] font-semibold" style={{ color: "#C9922C" }}>
              +{job.points} poin
            </span>
          </div>
        </div>
      </div>
    </button>
  );
}

function SlidePrototype() {
  const [screen, setScreen] = useState<ProtoScreen>("homescreen");
  const [history, setHistory] = useState<ProtoScreen[]>([]);
  const [selectedJobId, setSelectedJobId] = useState<string>("1");
  const [toast, setToast] = useState<string | null>(null);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [phone, setPhone] = useState("");
  const [campus, setCampus] = useState("");
  const [selectedRole, setSelectedRole] = useState<"mahasiswa" | "umkm">("mahasiswa");
  const [selectedInterests, setSelectedInterests] = useState<string[]>(["Event", "Barista/F&B"]);
  const [selectedRadius, setSelectedRadius] = useState("≤3 km");
  const [selectedTimes, setSelectedTimes] = useState<string[]>(["Sore", "Akhir pekan"]);
  const [cairkanPoints, setCairkanPoints] = useState("1000");
  const [selectedWallet, setSelectedWallet] = useState("gopay");
  const [chatMsg, setChatMsg] = useState("");
  const [aktivitasTab, setAktivitasTab] = useState<"berlangsung" | "riwayat">("berlangsung");
  const [welcomeSlide, setWelcomeSlide] = useState(0);
  const [umkmVerified, setUmkmVerified] = useState(() => {
    try {
      const raw = localStorage.getItem(UMKM_STORAGE_KEY);
      if (!raw) return false;
      const parsed = JSON.parse(raw) as { verified?: boolean };
      return Boolean(parsed.verified);
    } catch {
      return false;
    }
  });
  const [umkmProfile, setUmkmProfile] = useState<UmkmProfile>(() => {
    try {
      const raw = localStorage.getItem(UMKM_STORAGE_KEY);
      if (!raw) return EMPTY_UMKM_PROFILE;
      const parsed = JSON.parse(raw) as { profile?: UmkmProfile };
      return parsed.profile ? { ...EMPTY_UMKM_PROFILE, ...parsed.profile } : EMPTY_UMKM_PROFILE;
    } catch {
      return EMPTY_UMKM_PROFILE;
    }
  });
  const [umkmChatPeer, setUmkmChatPeer] = useState("Alya — UGM");
  const [umkmJobs, setUmkmJobs] = useState<UmkmJobPost[]>([
    {
      id: "j1",
      title: "Barista Shift Sore",
      category: "F&B",
      rate: "Rp95.000",
      schedule: "Jumat–Minggu",
      slots: 2,
      applicants: 5,
      status: "aktif",
      boosted: true,
      imageUrl:
        "https://images.unsplash.com/photo-1572982270699-473dfa34d7e7?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: "j2",
      title: "Runner Event Kampus",
      category: "Event",
      rate: "Rp85.000",
      schedule: "16 Jun 2026",
      slots: 4,
      applicants: 12,
      status: "aktif",
      boosted: false,
      imageUrl:
        "https://images.unsplash.com/photo-1566409031818-9508be68fc74?auto=format&fit=crop&w=400&q=80",
    },
  ]);
  const [umkmApplicants, setUmkmApplicants] = useState<UmkmApplicant[]>([
    {
      id: "a1",
      name: "Alya — UGM",
      campus: "FISIP UGM",
      rating: 4.9,
      jobTitle: "Barista Shift Sore",
      status: "menunggu",
      avatar:
        "https://images.unsplash.com/photo-1589386417686-0d34b5903d23?auto=format&fit=crop&w=200&q=80",
    },
    {
      id: "a2",
      name: "Raka — UNY",
      campus: "Teknik UNY",
      rating: 4.7,
      jobTitle: "Runner Event",
      status: "menunggu",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    },
  ]);

  useEffect(() => {
    if (screen !== "splash") return;
    const t = setTimeout(() => { setWelcomeSlide(0); go("welcome"); }, 2000);
    return () => clearTimeout(t);
  }, [screen]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2000);
    return () => clearTimeout(t);
  }, [toast]);

  useEffect(() => {
    if (umkmVerified) return;
    if (!UMKM_PRODUCT_SCREENS.includes(screen)) return;
    showToast("Lengkapi profil UMKM dulu");
    setScreen("umkm-onboard-1");
  }, [screen, umkmVerified]);

  const persistUmkm = (verified: boolean, profile: UmkmProfile) => {
    try {
      localStorage.setItem(UMKM_STORAGE_KEY, JSON.stringify({ verified, profile }));
    } catch {
      /* demo storage */
    }
  };

  const go = (s: ProtoScreen) => {
    setHistory((h) => [...h, screen]);
    setScreen(s);
  };

  const back = () => {
    const prev = history[history.length - 1];
    if (prev) {
      setHistory((h) => h.slice(0, -1));
      setScreen(prev);
    }
  };

  const reset = (s: ProtoScreen) => {
    setHistory([]);
    setScreen(s);
  };

  const selectJob = (id: string) => setSelectedJobId(id);
  const showToast = (msg: string) => setToast(msg);

  const nav: ProtoNav = { go, back, reset, selectJob, job: PROTO_JOBS.find((j) => j.id === selectedJobId), showToast };

  const isHome = screen === "homescreen";
  const isUmkm = UMKM_SCREENS.includes(screen);
  const umkmGo = (target: string) => {
    const s = target as ProtoScreen;
    if (!umkmVerified && UMKM_PRODUCT_SCREENS.includes(s)) {
      showToast("Lengkapi profil UMKM dulu — belum bisa masuk dashboard");
      go("umkm-onboard-1");
      return;
    }
    go(s);
  };
  const umkmNav: import("../prototype/umkm-screens").UmkmNav = { go: umkmGo, back, showToast };
  const noNav = [
    "homescreen",
    "splash",
    "welcome",
    "masuk",
    "otp",
    "pilih-peran",
    "preferensi",
    "detail",
    "konfirmasi",
    "lamaran-berhasil",
    "notifikasi",
    "chat",
    "portofolio",
    "cairkan",
    ...UMKM_SCREENS.filter((s) => s !== "umkm-dashboard" && s !== "umkm-post-job" && s !== "umkm-applicants" && s !== "umkm-boost" && s !== "umkm-dompet"),
  ];

  return (
    <div className="proto-layout">
      <div className="proto-info">
        <Kicker>Slide 14 · Prototipe Aplikasi</Kicker>
        <Title>Prototipe Aplikasi QuickJob Campus.</Title>
        <Lead>
          Prototipe dua sisi: <strong style={{ color: "var(--cream)" }}>Mahasiswa</strong> (cari job,
          lamar tanpa CV, dompet poin) dan <strong style={{ color: "var(--cream)" }}>UMKM</strong>{" "}
          (onboarding data usaha dulu, baru dashboard — bukan langsung masuk).
        </Lead>
        <p className="proto-hint">
          UMKM: isi nama usaha, lokasi, PIC → review → kelola lowongan & pelamar. Mahasiswa: preferensi
          → beranda & peta. Tip: home indicator = kembali ke layar iPhone.
        </p>
      </div>

      <div className="qj-phone">
        <div className="phone-frame">
          <div className="notch">
            <span className="notch-speaker" />
            <span className="notch-cam" />
          </div>
          <div className={`phone-screen ${isHome ? "phone-screen-ios" : ""}`}>
            {screen !== "splash" && (
              <div className={`ph-status ${isHome ? "on-dark" : ""}`}>
                <span>9:41</span>
                <span className="ph-status-r">5G · 82%</span>
              </div>
            )}
            <div className="ph-content" key={screen}>
              {screen === "homescreen" && <ProtoHomescreen onOpen={() => reset("splash")} />}
              {screen === "splash" && <ProtoSplash />}
              {screen === "welcome" && (
                <ProtoWelcome nav={nav} slide={welcomeSlide} setSlide={setWelcomeSlide} />
              )}
              {screen === "masuk" && (
                <ProtoMasuk
                  nav={nav}
                  phone={phone}
                  setPhone={setPhone}
                  campus={campus}
                  setCampus={setCampus}
                />
              )}
              {screen === "otp" && <ProtoOTP nav={nav} otp={otp} setOtp={setOtp} />}
              {screen === "pilih-peran" && (
                <ProtoPilihPeran
                  nav={nav}
                  selected={selectedRole}
                  setSelected={setSelectedRole}
                  onContinue={() => {
                    if (selectedRole === "umkm") {
                      setUmkmVerified(false);
                      persistUmkm(false, { ...EMPTY_UMKM_PROFILE, whatsapp: phone });
                      setUmkmProfile({ ...EMPTY_UMKM_PROFILE, whatsapp: phone });
                      go("umkm-onboard-1");
                      showToast("UMKM: isi data usaha dulu — bukan langsung dashboard");
                    } else {
                      go("preferensi");
                    }
                  }}
                />
              )}
              {screen === "umkm-onboard-1" && (
                <UmkmOnboardStep1 nav={umkmNav} profile={umkmProfile} setProfile={setUmkmProfile} />
              )}
              {screen === "umkm-onboard-2" && (
                <UmkmOnboardStep2 nav={umkmNav} profile={umkmProfile} setProfile={setUmkmProfile} />
              )}
              {screen === "umkm-onboard-3" && (
                <UmkmOnboardStep3
                  nav={umkmNav}
                  profile={umkmProfile}
                  setProfile={setUmkmProfile}
                  phone={phone}
                />
              )}
              {screen === "umkm-onboard-review" && (
                <UmkmOnboardReview
                  nav={umkmNav}
                  profile={umkmProfile}
                  onActivate={() => {
                    setUmkmVerified(true);
                    persistUmkm(true, umkmProfile);
                  }}
                />
              )}
              {screen === "umkm-dashboard" && (
                <UmkmDashboard nav={umkmNav} profile={umkmProfile} jobs={umkmJobs} />
              )}
              {screen === "umkm-post-job" && <UmkmPostJob nav={umkmNav} />}
              {screen === "umkm-applicants" && (
                <UmkmApplicants
                  nav={umkmNav}
                  applicants={umkmApplicants}
                  setApplicants={setUmkmApplicants}
                  onOpenChat={(name) => {
                    setUmkmChatPeer(name);
                    umkmGo("umkm-chat");
                  }}
                />
              )}
              {screen === "umkm-boost" && <UmkmBoost nav={umkmNav} />}
              {screen === "umkm-dompet" && <UmkmDompet nav={umkmNav} />}
              {screen === "umkm-profil" && <UmkmProfil nav={umkmNav} profile={umkmProfile} />}
              {screen === "umkm-notifikasi" && <UmkmNotifikasi nav={umkmNav} />}
              {screen === "umkm-chat" && (
                <UmkmChat nav={umkmNav} peerName={umkmChatPeer} businessName={umkmProfile.businessName} />
              )}
              {screen === "preferensi" && (
                <ProtoPreferensi
                  nav={nav}
                  interests={selectedInterests}
                  setInterests={setSelectedInterests}
                  radius={selectedRadius}
                  setRadius={setSelectedRadius}
                  times={selectedTimes}
                  setTimes={setSelectedTimes}
                />
              )}
              {screen === "beranda" && <ProtoBeranda nav={nav} />}
              {screen === "jelajah" && <ProtoJelajah nav={nav} />}
              {screen === "detail" && <ProtoDetail nav={nav} />}
              {screen === "konfirmasi" && <ProtoKonfirmasi nav={nav} />}
              {screen === "lamaran-berhasil" && <ProtoLamaranBerhasil nav={nav} />}
              {screen === "aktivitas" && (
                <ProtoAktivitas nav={nav} tab={aktivitasTab} setTab={setAktivitasTab} />
              )}
              {screen === "chat" && <ProtoChat nav={nav} msg={chatMsg} setMsg={setChatMsg} />}
              {screen === "portofolio" && <ProtoPortofolio nav={nav} />}
              {screen === "dompet" && <ProtoDompet nav={nav} />}
              {screen === "cairkan" && (
                <ProtoCairkan
                  nav={nav}
                  points={cairkanPoints}
                  setPoints={setCairkanPoints}
                  wallet={selectedWallet}
                  setWallet={setSelectedWallet}
                />
              )}
              {screen === "profil" && <ProtoProfil nav={nav} />}
              {screen === "notifikasi" && <ProtoNotifikasi nav={nav} />}
            </div>
            {isUmkm &&
              ["umkm-dashboard", "umkm-post-job", "umkm-applicants", "umkm-boost", "umkm-dompet"].includes(
                screen,
              ) && <UmkmBottomNav active={screen} nav={umkmNav} />}
            {!isUmkm && !noNav.includes(screen) && <ProtoBottomNav active={screen} nav={nav} />}
            {toast && <div className="ps-toast">{toast}</div>}
            {screen !== "homescreen" && screen !== "splash" && (
              <button
                type="button"
                className="home-ind"
                onClick={() => reset("homescreen")}
                aria-label="Kembali ke home screen"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- iPhone home screen ---------- */

function ProtoHomescreen({ onOpen }: { onOpen: () => void }) {
  const apps: {
    name: string;
    bg: string;
    icon: React.ReactElement;
    onClick?: () => void;
    isQJ?: boolean;
  }[] = [
    { name: "FaceTime", bg: "linear-gradient(180deg,#5DD068,#2EAE3F)", icon: <Phone size={20} color="white" /> },
    { name: "Kalender", bg: "#FFFFFF", icon: <Calendar size={20} color="#E5443A" /> },
    { name: "Foto", bg: "linear-gradient(135deg,#fff5d6,#ffd2e5,#cfe5ff)", icon: <ImageIcon size={20} color="#666" /> },
    { name: "Kamera", bg: "linear-gradient(180deg,#7d7d7d,#3a3a3a)", icon: <Camera size={20} color="white" /> },
    { name: "Pesan", bg: "linear-gradient(180deg,#5DD068,#2EAE3F)", icon: <MessageCircle size={20} color="white" /> },
    { name: "Cuaca", bg: "linear-gradient(180deg,#5da9ff,#1f6fe5)", icon: <Cloud size={20} color="white" /> },
    { name: "Maps", bg: "linear-gradient(135deg,#bfe2a3,#dcd2a8)", icon: <MapIcon size={20} color="#3D5A2A" /> },
    { name: "Catatan", bg: "linear-gradient(180deg,#fff5b8,#ffe27a)", icon: <StickyNote size={20} color="#7a5b00" /> },
    { name: "Pengaturan", bg: "linear-gradient(180deg,#a8a8a8,#6e6e6e)", icon: <Settings size={20} color="white" /> },
    { name: "Musik", bg: "linear-gradient(180deg,#ff5e5e,#d62a2a)", icon: <Music size={20} color="white" /> },
    { name: "Jam", bg: "#0a0a0a", icon: <Clock size={20} color="white" /> },
    { name: "QuickJob", bg: "#FFFFFF", icon: <img src="/quickjob-logo.png" alt="" className="ps-app-img" />, onClick: onOpen, isQJ: true },
  ];
  const dock = [
    { name: "Telepon", bg: "linear-gradient(180deg,#5DD068,#2EAE3F)", icon: <Phone size={20} color="white" /> },
    { name: "Safari", bg: "linear-gradient(180deg,#fff,#dadada)", icon: <Compass size={20} color="#1976d2" /> },
    { name: "Mail", bg: "linear-gradient(180deg,#5da9ff,#1f6fe5)", icon: <Mail size={20} color="white" /> },
    { name: "Musik", bg: "linear-gradient(180deg,#ff5e5e,#d62a2a)", icon: <Music size={20} color="white" /> },
  ];
  return (
    <div className="ps-home" style={{ backgroundImage: `url(${WALLPAPER_URL})`, backgroundSize: "cover", backgroundPosition: "center" }}>
      <div className="ps-home-grid">
        {apps.map((a) =>
          a.onClick ? (
            <button key={a.name} type="button" onClick={a.onClick} className={`ps-app ${a.isQJ ? "ps-app-qj" : ""}`}>
              <span className="ps-app-icon" style={{ background: a.bg }}>{a.icon}</span>
              <span className="ps-app-name">{a.name}</span>
            </button>
          ) : (
            <div key={a.name} className="ps-app">
              <span className="ps-app-icon" style={{ background: a.bg }}>{a.icon}</span>
              <span className="ps-app-name">{a.name}</span>
            </div>
          ),
        )}
      </div>
      <div className="ps-home-bottom">
        <div className="ps-home-dots">
          <span className="on" />
          <span />
          <span />
        </div>
        <div className="ps-home-dock">
          {dock.map((a) => (
            <span key={a.name} className="ps-dock-item">
              <span className="ps-app-icon" style={{ background: a.bg }}>
                {a.icon}
              </span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProtoSplash() {
  return (
    <div className="ps-splash">
      <div className="ps-logo-ring">
        <div className="ps-logo">
          <img src="/quickjob-logo.png" alt="QuickJob" />
        </div>
      </div>
      <h2 className="ps-brand">QuickJob Campus</h2>
      <p className="ps-tag">Kerja Sampingan, Mudah & Dekat</p>
      <div className="ps-loading"><span /><span /><span /></div>
      <p className="ps-note">Mencari job di sekitar kampus...</p>
    </div>
  );
}

function ProtoWelcome({ nav, slide, setSlide }: { nav: ProtoNav; slide: number; setSlide: (n: number) => void }) {
  const slides = [
    { title: "Kerja dekat kampus, tinggal pilih di peta", desc: "Temukan pekerjaan dalam radius 1-5 km dari kampusmu", color: "#8A5F41" },
    { title: "Lamar tanpa CV, cukup sekali ketuk", desc: "Tidak perlu upload dokumen, profil otomatis terkirim", color: "#C9922C" },
    { title: "Tiap job selesai jadi poin & portofolio", desc: "Kumpulkan poin untuk dicairkan ke e-wallet", color: "#4E7C59" },
  ];
  const s = slides[slide];
  return (
    <div className="ps-pad" style={{ height: "100%", display: "flex", flexDirection: "column", paddingBottom: "30px" }}>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 8 }}>
        <button type="button" onClick={() => nav.go("masuk")} style={{ color: "#8A5F41", fontSize: 14, fontWeight: 600, padding: "6px 12px" }}>Lewati</button>
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: 80, height: 80, borderRadius: "50%", backgroundColor: "#FFFBF2", display: "grid", placeItems: "center", marginBottom: 24, boxShadow: `0 12px 32px ${s.color}30` }}>
          <MapPin size={40} style={{ color: s.color }} />
        </div>
        <h2 style={{ fontSize: 20, fontWeight: "bold", color: "#3D2A1C", textAlign: "center", marginBottom: 8, lineHeight: 1.3 }}>{s.title}</h2>
        <p style={{ fontSize: 13, color: "#6E4A30", textAlign: "center", marginBottom: 24, lineHeight: 1.4 }}>{s.desc}</p>
        <div style={{ display: "flex", gap: 6, marginBottom: 24 }}>
          {slides.map((_, i) => (
            <button key={i} type="button" onClick={() => setSlide(i)} style={{ width: i === slide ? 20 : 6, height: 6, borderRadius: 99, backgroundColor: i === slide ? "#8A5F41" : "#E6D5B3", border: "none", cursor: "pointer" }} />
          ))}
        </div>
      </div>
      {slide < 2 ? (
        <button type="button" onClick={() => setSlide(slide + 1)} style={{ width: "100%", padding: "12px 0", borderRadius: 16, backgroundColor: "#8A5F41", color: "white", fontWeight: 600, fontSize: 15, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
          Lanjut <ChevronRight size={18} />
        </button>
      ) : (
        <PBtn onClick={() => nav.go("masuk")}>Mulai Sekarang</PBtn>
      )}
    </div>
  );
}

function ProtoMasuk({ nav, phone, setPhone, campus, setCampus }: { nav: ProtoNav; phone: string; setPhone: (v: string) => void; campus: string; setCampus: (v: string) => void }) {
  const campuses = ["UGM", "UNY", "UMY", "UII", "Sanata Dharma", "UAD", "UPN Veteran Yogyakarta", "Atma Jaya Yogyakarta"];
  return (
    <div className="ps-pad" style={{ height: "100%", display: "flex", flexDirection: "column", overflowY: "auto", paddingBottom: "20px" }}>
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 10 }}>
        <div style={{ width: 42, height: 42, borderRadius: 14, background: "linear-gradient(135deg,#8A5F41,#6E4A30)", display: "grid", placeItems: "center" }}>
          <Briefcase size={20} color="white" />
        </div>
      </div>
      <h2 style={{ fontSize: 22, fontWeight: "bold", color: "#3D2A1C", textAlign: "center", marginBottom: 2 }}>Masuk ke QuickJob</h2>
      <p style={{ fontSize: 12, color: "#6E4A30", textAlign: "center", marginBottom: 12 }}>Cari kerja sampingan sekitar kampus tanpa upload CV</p>
      <div style={{ marginBottom: 8 }}>
        <label style={{ fontSize: 12, fontWeight: 600, color: "#3D2A1C", display: "block", marginBottom: 4 }}>Nomor HP</label>
        <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="0812 3456 7890" style={{ width: "100%", padding: "9px 11px", borderRadius: 10, border: "2px solid #E6D5B3", backgroundColor: "#fff", color: "#3D2A1C", fontSize: 14, boxSizing: "border-box" }} />
      </div>
      <div style={{ marginBottom: 10 }}>
        <label style={{ fontSize: 12, fontWeight: 600, color: "#3D2A1C", display: "block", marginBottom: 4 }}>Kampus</label>
        <select value={campus} onChange={(e) => setCampus(e.target.value)} style={{ width: "100%", padding: "9px 11px", borderRadius: 10, border: "2px solid #E6D5B3", backgroundColor: "#fff", color: campus ? "#3D2A1C" : "#9B8164", fontSize: 14, boxSizing: "border-box" }}>
          <option value="">Pilih kampus</option>
          {campuses.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
      <PBtn onClick={() => nav.go("otp")}>Kirim Kode OTP</PBtn>
      <p style={{ fontSize: 11, color: "#9B8164", textAlign: "center", marginTop: 8, marginBottom: 10 }}>Dengan lanjut, kamu setuju Syarat & Kebijakan Privasi</p>
      <div style={{ position: "relative", margin: "2px 0" }}>
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center" }}><div style={{ width: "100%", borderTop: "1px solid #E6D5B3" }} /></div>
        <div style={{ position: "relative", display: "flex", justifyContent: "center" }}><span style={{ padding: "0 12px", fontSize: 12, backgroundColor: "#F3E4C9", color: "#9B8164" }}>atau</span></div>
      </div>
      <button type="button" style={{ width: "100%", padding: "11px 0", borderRadius: 14, border: "2px solid #E6D5B3", color: "#3D2A1C", backgroundColor: "#fff", fontWeight: 600, fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 4 }}>
        <Chrome size={18} /> Masuk dengan Google
      </button>
    </div>
  );
}

function ProtoOTP({ nav, otp, setOtp }: { nav: ProtoNav; otp: string[]; setOtp: (v: string[]) => void }) {
  const handleChange = (i: number, val: string) => {
    if (val.length > 1 || !/^\d*$/.test(val)) return;
    const next = [...otp]; next[i] = val; setOtp(next);
  };
  return (
    <div className="ps-pad" style={{ height: "100%", display: "flex", flexDirection: "column", paddingBottom: "30px" }}>
      <button type="button" onClick={nav.back} style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 16, background: "none", border: "none", cursor: "pointer" }}>
        <ChevronLeft size={22} style={{ color: "#3D2A1C" }} />
      </button>
      <h2 style={{ fontSize: 22, fontWeight: "bold", color: "#3D2A1C", marginBottom: 4 }}>Masukkan kode OTP</h2>
      <p style={{ fontSize: 12, color: "#6E4A30", marginBottom: 20 }}>Kode dikirim ke <span style={{ fontWeight: 600 }}>0812-3456-7890</span></p>
      <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 16 }}>
        {otp.map((d, i) => (
          <input key={i} maxLength={1} value={d} onChange={(e) => handleChange(i, e.target.value)} style={{ width: 48, height: 48, textAlign: "center", fontSize: 20, fontWeight: "bold", borderRadius: 12, border: `2px solid ${d ? "#8A5F41" : "#E6D5B3"}`, backgroundColor: "#fff", color: "#3D2A1C", boxSizing: "border-box" }} />
        ))}
      </div>
      <p style={{ fontSize: 12, color: "#9B8164", textAlign: "center", marginBottom: 16 }}>Kirim ulang dalam <span style={{ fontWeight: 600, color: "#8A5F41" }}>00:45</span></p>
      <div style={{ flex: 1 }} />
      <PBtn onClick={() => nav.go("pilih-peran")}>Verifikasi</PBtn>
    </div>
  );
}

function ProtoPilihPeran({
  nav,
  selected,
  setSelected,
  onContinue,
}: {
  nav: ProtoNav;
  selected: "mahasiswa" | "umkm";
  setSelected: (v: "mahasiswa" | "umkm") => void;
  onContinue: () => void;
}) {
  const roles = [
    { id: "mahasiswa" as const, icon: GraduationCap, title: "Mahasiswa", desc: "Cari micro-job dekat kampus · tanpa CV" },
    { id: "umkm" as const, icon: Store, title: "UMKM / Klien", desc: "Verifikasi usaha dulu, lalu pasang lowongan" },
  ];
  return (
    <div className="ps-pad" style={{ height: "100%", display: "flex", flexDirection: "column", paddingBottom: "30px" }}>
      <h2 style={{ fontSize: 22, fontWeight: "bold", color: "#3D2A1C", textAlign: "center", marginBottom: 4, marginTop: 16 }}>Pilih kebutuhanmu</h2>
      <p style={{ fontSize: 12, color: "#6E4A30", textAlign: "center", marginBottom: 12 }}>Dua jalur berbeda — bukan satu dashboard yang sama</p>
      {selected === "umkm" && (
        <p style={{ fontSize: 11, color: "#8A5F41", textAlign: "center", marginBottom: 12, padding: "8px 12px", background: "#FFFBF2", borderRadius: 10, border: "1px solid #E6D5B3" }}>
          UMKM: kamu akan isi data usaha (nama, lokasi, PIC) sebelum masuk dashboard.
        </p>
      )}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12 }}>
        {roles.map((r) => {
          const isSel = selected === r.id;
          return (
            <button key={r.id} type="button" onClick={() => setSelected(r.id)} style={{ width: "100%", padding: 16, borderRadius: 16, border: `2px solid ${isSel ? "#8A5F41" : "#E6D5B3"}`, backgroundColor: isSel ? "#FFFBF2" : "#fff", display: "flex", alignItems: "center", gap: 12, textAlign: "left", boxShadow: isSel ? "0 8px 24px rgba(138,95,65,0.12)" : "none" }}>
              <div style={{ width: 42, height: 42, borderRadius: 12, backgroundColor: isSel ? "#8A5F41" : "#F3E4C9", display: "grid", placeItems: "center" }}>
                <r.icon size={22} style={{ color: isSel ? "#fff" : "#8A5F41" }} />
              </div>
              <div>
                <div style={{ fontSize: 16, fontWeight: "bold", color: "#3D2A1C" }}>{r.title}</div>
                <div style={{ fontSize: 12, color: "#6E4A30" }}>{r.desc}</div>
              </div>
            </button>
          );
        })}
      </div>
      <PBtn onClick={onContinue}>
        {selected === "mahasiswa" ? "Lanjut ke preferensi" : "Lanjut — isi data usaha"}
      </PBtn>
    </div>
  );
}

function ProtoPreferensi({ nav, interests, setInterests, radius, setRadius, times, setTimes }: { nav: ProtoNav; interests: string[]; setInterests: (v: string[]) => void; radius: string; setRadius: (v: string) => void; times: string[]; setTimes: (v: string[]) => void }) {
  const toggle = (arr: string[], item: string, setter: (v: string[]) => void) => {
    setter(arr.includes(item) ? arr.filter((i) => i !== item) : [...arr, item]);
  };
  const allInterests = ["Event", "Barista/F&B", "Admin Toko", "Packing/Gudang", "Kreatif (Foto/Desain)", "Marketing/SPG", "Kebersihan", "Antar-jemput"];
  const radii = ["≤1 km", "≤3 km", "≤5 km"];
  const allTimes = ["Pagi", "Siang", "Sore", "Malam", "Akhir pekan"];
  const chip = (label: string, active: boolean, onClick: () => void) => (
    <button key={label} type="button" onClick={onClick} style={{ padding: "6px 12px", borderRadius: 99, fontSize: 12, fontWeight: 500, border: `2px solid ${active ? "#8A5F41" : "#E6D5B3"}`, backgroundColor: active ? "#8A5F41" : "#fff", color: active ? "#fff" : "#6E4A30" }}>{label}</button>
  );
  return (
    <div className="ps-pad" style={{ height: "100%", display: "flex", flexDirection: "column", overflowY: "auto", paddingBottom: "30px" }}>
      <button type="button" onClick={nav.back} style={{ display: "flex", alignItems: "center", marginBottom: 12, background: "none", border: "none", cursor: "pointer" }}><ChevronLeft size={22} style={{ color: "#3D2A1C" }} /></button>
      <h2 style={{ fontSize: 22, fontWeight: "bold", color: "#3D2A1C", marginBottom: 4 }}>Atur preferensi kerjamu</h2>
      <p style={{ fontSize: 12, color: "#6E4A30", marginBottom: 16 }}>Bantu kami rekomendasikan job yang cocok</p>
      <div style={{ marginBottom: 16 }}>
        <h3 style={{ fontSize: 13, fontWeight: "bold", color: "#3D2A1C", marginBottom: 8 }}>Minat pekerjaan</h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>{allInterests.map((i) => chip(i, interests.includes(i), () => toggle(interests, i, setInterests)))}</div>
      </div>
      <div style={{ marginBottom: 16 }}>
        <h3 style={{ fontSize: 13, fontWeight: "bold", color: "#3D2A1C", marginBottom: 8 }}>Radius dari kampus</h3>
        <div style={{ display: "flex", gap: 6 }}>{radii.map((r) => chip(r, radius === r, () => setRadius(r)))}</div>
      </div>
      <div style={{ marginBottom: 16 }}>
        <h3 style={{ fontSize: 13, fontWeight: "bold", color: "#3D2A1C", marginBottom: 8 }}>Waktu kosong</h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>{allTimes.map((t) => chip(t, times.includes(t), () => toggle(times, t, setTimes)))}</div>
      </div>
      <div style={{ marginTop: "auto", paddingTop: 12 }}><PBtn onClick={() => nav.go("beranda")}>Cari Job Terdekat</PBtn></div>
    </div>
  );
}

function ProtoBeranda({ nav }: { nav: ProtoNav }) {
  const filters = ["Hari ini", "≤3 km", "Shift sore", "Akhir pekan"];
  return (
    <div className="ps-pad ps-scroll" style={{ paddingBottom: "70px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", overflow: "hidden", border: "2px solid #8A5F41" }}>
            <img src={AVATAR_URL} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: "bold", color: "#3D2A1C" }}>Halo, Nick</div>
            <div style={{ fontSize: 10, color: "#6E4A30" }}>Kampus: UGM</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 3, padding: "3px 7px", borderRadius: 99, backgroundColor: "#FFFBF2" }}>
            <Coins size={11} style={{ color: "#C9922C" }} />
            <span style={{ fontSize: 10, fontWeight: "bold", color: "#C9922C" }}>2.450</span>
          </div>
          <button type="button" onClick={() => nav.go("notifikasi")} style={{ position: "relative", background: "none", border: "none", cursor: "pointer" }}>
            <Bell size={16} style={{ color: "#3D2A1C" }} />
            <span style={{ position: "absolute", top: -3, right: -3, width: 13, height: 13, borderRadius: "50%", backgroundColor: "#B5532B", color: "#fff", fontSize: 7, fontWeight: "bold", display: "grid", placeItems: "center" }}>3</span>
          </button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 5, marginBottom: 8 }}>
        {[{ v: "8", l: "job cocok" }, { v: "1.2 km", l: "terdekat" }, { v: "2.450", l: "poin", gold: true }].map((m) => (
          <div key={m.l} style={{ backgroundColor: "#fff", borderRadius: 10, padding: "6px 0", textAlign: "center", boxShadow: "0 3px 8px rgba(138,95,65,0.06)" }}>
            <div style={{ fontSize: 15, fontWeight: 800, color: m.gold ? "#C9922C" : "#8A5F41" }}>{m.v}</div>
            <div style={{ fontSize: 9, color: "#6E4A30" }}>{m.l}</div>
          </div>
        ))}
      </div>

      <button type="button" onClick={() => nav.go("jelajah")} style={{ width: "100%", height: 70, borderRadius: 14, marginBottom: 8, position: "relative", overflow: "hidden", backgroundImage: `url(${MAP_URL})`, backgroundSize: "cover", backgroundPosition: "center", border: "none", cursor: "pointer" }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(138,95,65,0.7), transparent)" }} />
        <div style={{ position: "absolute", bottom: 8, left: 12, right: 12, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}><MapPin size={12} color="white" /><span style={{ fontSize: 11, fontWeight: 600, color: "#fff" }}>Sekitarmu · Sleman</span></div>
          <span style={{ padding: "3px 8px", borderRadius: 99, fontSize: 10, fontWeight: "bold", color: "#fff", backgroundColor: "#8A5F41" }}>Lihat di peta</span>
        </div>
      </button>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
        <h4 style={{ fontSize: 13, fontWeight: "bold", color: "#3D2A1C", margin: 0 }}>Job terdekat untukmu</h4>
        <Briefcase size={14} style={{ color: "#8A5F41" }} />
      </div>

      <div style={{ display: "flex", gap: 5, marginBottom: 8, overflowX: "auto" }}>
        {filters.map((f, i) => (
          <button key={f} type="button" style={{ padding: "3px 8px", borderRadius: 99, fontSize: 10, fontWeight: 500, whiteSpace: "nowrap", border: `2px solid ${i === 0 ? "#8A5F41" : "#E6D5B3"}`, backgroundColor: i === 0 ? "#8A5F41" : "#fff", color: i === 0 ? "#fff" : "#6E4A30" }}>{f}</button>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {PROTO_JOBS.map((j) => <ProtoJobCard key={j.id} job={j} nav={nav} />)}
      </div>
    </div>
  );
}

function ProtoJelajah({ nav }: { nav: ProtoNav }) {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <div style={{ flex: 1, position: "relative", backgroundColor: "#f5efe0", overflow: "hidden" }}>
        <img src="/maps.png" alt="Peta Yogyakarta" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        {/* Floating job price pins */}
        <div style={{ position: "absolute", top: "22%", left: "28%", width: 40, height: 40, borderRadius: "50%", backgroundColor: "#8A5F41", display: "grid", placeItems: "center", boxShadow: "0 8px 24px rgba(138,95,65,0.4)", zIndex: 2 }}><span style={{ fontSize: 10, fontWeight: "bold", color: "#fff" }}>Rp85k</span></div>
        <div style={{ position: "absolute", top: "48%", right: "22%", width: 40, height: 40, borderRadius: "50%", backgroundColor: "#8A5F41", display: "grid", placeItems: "center", boxShadow: "0 8px 24px rgba(138,95,65,0.4)", zIndex: 2 }}><span style={{ fontSize: 10, fontWeight: "bold", color: "#fff" }}>Rp70k</span></div>
        <div style={{ position: "absolute", bottom: "28%", left: "18%", width: 40, height: 40, borderRadius: "50%", backgroundColor: "#8A5F41", display: "grid", placeItems: "center", boxShadow: "0 8px 24px rgba(138,95,65,0.4)", zIndex: 2 }}><span style={{ fontSize: 10, fontWeight: "bold", color: "#fff" }}>Rp95k</span></div>
        <div style={{ position: "absolute", left: 12, right: 12, top: 4, display: "flex", gap: 6 }}>
          <div style={{ flex: 1, position: "relative" }}>
            <Search size={14} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#9B8164" }} />
            <input placeholder="Cari di peta..." style={{ width: "100%", padding: "8px 8px 8px 30px", borderRadius: 10, fontSize: 12, backgroundColor: "#fff", color: "#3D2A1C", border: "1px solid #E6D5B3", boxShadow: "0 4px 12px rgba(138,95,65,0.15)", boxSizing: "border-box" }} />
          </div>
          <button type="button" style={{ width: 36, height: 36, borderRadius: 10, display: "grid", placeItems: "center", backgroundColor: "#fff", border: "1px solid #E6D5B3", boxShadow: "0 4px 12px rgba(138,95,65,0.15)" }}><SlidersHorizontal size={16} style={{ color: "#8A5F41" }} /></button>
        </div>
        <div style={{ position: "absolute", left: 12, top: 52 }}>
          <div style={{ padding: "5px 10px", borderRadius: 99, display: "flex", alignItems: "center", gap: 6, backgroundColor: "#8A5F41", boxShadow: "0 4px 12px rgba(138,95,65,0.3)" }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#fff" }} />
            <span style={{ fontSize: 11, fontWeight: 600, color: "#fff" }}>6 Pekerjaan Baru</span>
          </div>
        </div>
      </div>
      <div style={{ backgroundColor: "#fff", borderRadius: "20px 20px 0 0", padding: "8px 12px 12px", boxShadow: "0 -8px 24px rgba(138,95,65,0.15)" }}>
        <div style={{ width: 40, height: 3, borderRadius: 99, backgroundColor: "#E6D5B3", margin: "0 auto 8px" }} />
        <h4 style={{ fontSize: 14, fontWeight: "bold", color: "#3D2A1C", marginBottom: 8 }}>Job di sekitarmu</h4>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, maxHeight: 160, overflowY: "auto" }}>
          {PROTO_JOBS.slice(0, 4).map((j) => <ProtoJobCard key={j.id} job={j} nav={nav} />)}
        </div>
      </div>
    </div>
  );
}

function ProtoDetail({ nav }: { nav: ProtoNav }) {
  const job = nav.job;
  if (!job) return null;
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <div style={{ flex: 1, overflowY: "auto", paddingBottom: 60 }}>
        <div style={{ position: "relative", height: 120 }}>
          <img src={job.imageUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.5), transparent)" }} />
          <button type="button" onClick={nav.back} style={{ position: "absolute", left: 12, top: 8, width: 30, height: 30, borderRadius: "50%", display: "grid", placeItems: "center", backgroundColor: "rgba(255,255,255,0.95)", border: "none", cursor: "pointer", boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}><ChevronLeft size={18} style={{ color: "#3D2A1C" }} /></button>
          {job.urgent && <div style={{ position: "absolute", right: 12, top: 8, padding: "3px 8px", borderRadius: 99, fontSize: 10, fontWeight: "bold", color: "#fff", backgroundColor: "#B5532B" }}>URGENT</div>}
        </div>
        <div style={{ padding: "10px 14px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 3 }}><MapPin size={12} style={{ color: "#9B8164" }} /><span style={{ fontSize: 11, color: "#9B8164" }}>{job.distance}</span></div>
            <span style={{ fontSize: 11, color: "#9B8164" }}>· {job.schedule}</span>
          </div>
          <h3 style={{ fontSize: 20, fontWeight: "bold", color: "#3D2A1C", marginBottom: 4 }}>{job.title}</h3>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 12 }}>
            <span style={{ fontSize: 13, color: "#6E4A30" }}>{job.company}</span>
            <div style={{ display: "flex", alignItems: "center", gap: 3 }}><Star size={12} fill="#C9922C" style={{ color: "#C9922C" }} /><span style={{ fontSize: 11, fontWeight: 600, color: "#C9922C" }}>{job.rating}</span></div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginBottom: 12 }}>
            <div style={{ backgroundColor: "#fff", borderRadius: 12, padding: 10, border: "2px solid #E6D5B3" }}>
              <div style={{ fontSize: 11, color: "#9B8164", marginBottom: 2 }}>Bayaran</div>
              <div style={{ fontSize: 16, fontWeight: "bold", color: "#8A5F41" }}>{job.rate}</div>
            </div>
            <div style={{ backgroundColor: "#fff", borderRadius: 12, padding: 10, border: "2px solid #E6D5B3" }}>
              <div style={{ fontSize: 11, color: "#9B8164", marginBottom: 2 }}>Durasi</div>
              <div style={{ fontSize: 16, fontWeight: "bold", color: "#3D2A1C" }}>{job.duration}</div>
            </div>
            <div style={{ backgroundColor: "#fff", borderRadius: 12, padding: 10, border: "2px solid #E6D5B3" }}>
              <div style={{ fontSize: 11, color: "#9B8164", marginBottom: 2 }}>Mulai</div>
              <div style={{ fontSize: 16, fontWeight: "bold", color: "#3D2A1C" }}>{job.schedule.split(" ").pop()}</div>
            </div>
            <div style={{ borderRadius: 12, padding: 10, border: "2px solid #C9922C", backgroundColor: "#FFFBF2" }}>
              <div style={{ fontSize: 11, color: "#C9922C", marginBottom: 2 }}>Bonus</div>
              <div style={{ fontSize: 16, fontWeight: "bold", color: "#C9922C", display: "flex", alignItems: "center", gap: 4 }}><Coins size={14} />+{job.points} poin</div>
            </div>
          </div>
          <h4 style={{ fontSize: 14, fontWeight: "bold", color: "#3D2A1C", marginBottom: 6 }}>Deskripsi</h4>
          <p style={{ fontSize: 12, color: "#6E4A30", marginBottom: 12, lineHeight: 1.5 }}>{job.description}</p>
          <h4 style={{ fontSize: 14, fontWeight: "bold", color: "#3D2A1C", marginBottom: 6 }}>Tugas</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 12 }}>
            {job.tasks.map((t, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 8px", borderRadius: 8, backgroundColor: "#FFFBF2" }}>
                <CheckCircle2 size={14} style={{ color: "#4E7C59" }} /><span style={{ fontSize: 12, color: "#3D2A1C" }}>{t}</span>
              </div>
            ))}
          </div>
          <div style={{ padding: 10, borderRadius: 12, backgroundColor: "#FFFBF2", border: "2px solid #E6D5B3", display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <CheckCircle2 size={16} style={{ color: "#4E7C59" }} />
            <div><div style={{ fontSize: 12, fontWeight: "bold", color: "#3D2A1C" }}>Tanpa CV</div><div style={{ fontSize: 11, color: "#6E4A30" }}>Profil singkatmu dikirim otomatis</div></div>
          </div>
        </div>
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, padding: "10px 14px", backgroundColor: "#F3E4C9", boxShadow: "0 -4px 16px rgba(138,95,65,0.08)", bottom: 20 }}>
        <PBtn onClick={() => nav.go("konfirmasi")}>Lamar Tanpa CV</PBtn>
      </div>
    </div>
  );
}

function ProtoKonfirmasi({ nav }: { nav: ProtoNav }) {
  const job = nav.job;
  if (!job) return null;
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", backgroundColor: "rgba(0,0,0,0.5)" }}>
      <div style={{ flex: 1 }} onClick={nav.back} />
      <div style={{ backgroundColor: "#fff", borderRadius: "20px 20px 0 0", padding: 16, marginBottom: 20, boxShadow: "0 -8px 24px rgba(0,0,0,0.2)" }}>
        <div style={{ width: 40, height: 3, borderRadius: 99, backgroundColor: "#E6D5B3", margin: "0 auto 12px" }} />
        <h3 style={{ fontSize: 18, fontWeight: "bold", color: "#3D2A1C", textAlign: "center", marginBottom: 14 }}>Kirim lamaran?</h3>
        <div style={{ padding: 12, borderRadius: 14, backgroundColor: "#FFFBF2", border: "2px solid #E6D5B3", marginBottom: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
            <div style={{ width: 40, height: 40, borderRadius: "50%", overflow: "hidden", border: "2px solid #8A5F41" }}><img src={AVATAR_URL} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /></div>
            <div><div style={{ fontSize: 14, fontWeight: "bold", color: "#3D2A1C" }}>Nick</div><div style={{ fontSize: 11, color: "#6E4A30", display: "flex", alignItems: "center", gap: 3 }}><GraduationCap size={11} /> Mahasiswa UGM</div></div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
            {[{ v: "12", l: "project" }, { v: "★ 4.8", l: "rating" }, { v: "98%", l: "tepat waktu" }].map((m, i) => (
              <div key={i} style={{ flex: 1, textAlign: "center" }}><div style={{ fontSize: 15, fontWeight: "bold", color: i === 1 ? "#C9922C" : i === 2 ? "#4E7C59" : "#8A5F41" }}>{m.v}</div><div style={{ fontSize: 10, color: "#6E4A30" }}>{m.l}</div></div>
            ))}
          </div>
        </div>
        <div style={{ padding: 10, borderRadius: 12, backgroundColor: "#FFFBF2", marginBottom: 12 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: "#3D2A1C", marginBottom: 4 }}>Melamar: {job.title}</div>
          <div style={{ fontSize: 11, color: "#6E4A30", marginBottom: 4 }}>{job.company} · {job.schedule}</div>
          <div style={{ fontSize: 11, color: "#4E7C59", display: "flex", alignItems: "center", gap: 4 }}><CheckCircle2 size={12} /> Tanpa upload CV</div>
        </div>
        <PBtn onClick={() => nav.go("lamaran-berhasil")}>Ya, Lamar Sekarang</PBtn>
        <div style={{ height: 8 }} />
        <SBtn onClick={nav.back}>Batal</SBtn>
      </div>
    </div>
  );
}

function ProtoLamaranBerhasil({ nav }: { nav: ProtoNav }) {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 20px 30px" }}>
      <div style={{ width: 64, height: 64, borderRadius: "50%", backgroundColor: "#4E7C59", display: "grid", placeItems: "center", marginBottom: 16 }}>
        <CheckCircle2 size={36} color="white" />
      </div>
      <h3 style={{ fontSize: 22, fontWeight: "bold", color: "#3D2A1C", marginBottom: 6, textAlign: "center" }}>Lamaran terkirim!</h3>
      <p style={{ fontSize: 13, color: "#6E4A30", textAlign: "center", marginBottom: 20, lineHeight: 1.5 }}>UMKM menerima profil singkat & slot waktumu. Kamu akan dapat notifikasi jika diterima.</p>
      <PBtn onClick={() => nav.go("aktivitas")}>Lihat Status Lamaran</PBtn>
      <div style={{ height: 8 }} />
      <SBtn onClick={() => nav.go("beranda")}>Cari Job Lain</SBtn>
    </div>
  );
}

function ProtoAktivitas({ nav, tab, setTab }: { nav: ProtoNav; tab: "berlangsung" | "riwayat"; setTab: (v: "berlangsung" | "riwayat") => void }) {
  const apps = {
    berlangsung: [
      { title: "Runner Event Kampus", co: "Panitia Inagurasi UGM", status: "menunggu", statusColor: "#C9922C", statusBg: "#FFFBF2", date: "5 menit lalu", img: PROTO_JOBS[0].imageUrl },
      { title: "Barista Shift Sore", co: "Kopi Klotok Pogung", status: "Diterima ✓", statusColor: "#4E7C59", statusBg: "#F0F8F4", date: "2 jam lalu", chat: true, img: PROTO_JOBS[2].imageUrl },
    ],
    riwayat: [
      { title: "Admin Packing UMKM", co: "Gudang Sleman", status: "Selesai", statusColor: "#6E4A30", statusBg: "#F3E4C9", date: "3 hari lalu", img: PROTO_JOBS[1].imageUrl },
    ],
  };
  const current = apps[tab];
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", paddingBottom: "70px" }}>
      <div style={{ padding: "10px 14px", backgroundColor: "#F3E4C9" }}>
        <h2 style={{ fontSize: 22, fontWeight: "bold", color: "#3D2A1C", marginBottom: 10 }}>Aktivitas</h2>
        <div style={{ display: "flex", gap: 4, padding: 3, borderRadius: 14, backgroundColor: "#fff" }}>
          {(["berlangsung", "riwayat"] as const).map((t) => (
            <button key={t} type="button" onClick={() => setTab(t)} style={{ flex: 1, padding: "6px 0", borderRadius: 10, fontSize: 12, fontWeight: 600, backgroundColor: tab === t ? "#8A5F41" : "transparent", color: tab === t ? "#fff" : "#6E4A30", border: "none", cursor: "pointer" }}>{t === "berlangsung" ? "Berlangsung" : "Riwayat"}</button>
          ))}
        </div>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "10px 14px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {current.map((a) => (
            <div key={a.title} style={{ backgroundColor: "#fff", borderRadius: 16, padding: 12, boxShadow: "0 8px 24px rgba(138,95,65,0.12)" }}>
              <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, overflow: "hidden", flexShrink: 0 }}><img src={a.img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /></div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: "bold", color: "#3D2A1C" }}>{a.title}</div>
                  <div style={{ fontSize: 11, color: "#6E4A30", marginBottom: 4 }}>{a.co}</div>
                  <span style={{ display: "inline-block", padding: "2px 8px", borderRadius: 99, fontSize: 10, fontWeight: 600, backgroundColor: a.statusBg, color: a.statusColor }}>{a.status}</span>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: 10, color: "#9B8164" }}>{a.date}</span>
                {"chat" in a && a.chat && <button type="button" onClick={() => nav.go("chat")} style={{ display: "flex", alignItems: "center", gap: 4, padding: "4px 10px", borderRadius: 99, fontSize: 11, fontWeight: 600, backgroundColor: "#8A5F41", color: "#fff", border: "none", cursor: "pointer" }}><MessageCircle size={12} /> Chat</button>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProtoChat({ nav, msg, setMsg }: { nav: ProtoNav; msg: string; setMsg: (v: string) => void }) {
  const messages = [
    { from: "umkm" as const, text: "Halo User, kamu diterima ya. Datang jam 16.00.", time: "14:20" },
    { from: "user" as const, text: "Siap, terima kasih!", time: "14:22" },
    { from: "umkm" as const, text: "Jangan lupa bawa buku catatan kecil ya", time: "14:23" },
    { from: "user" as const, text: "Baik, noted. Sampai ketemu Sabtu!", time: "14:25" },
  ];
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", paddingBottom: 20 }}>
      <div style={{ padding: "8px 14px", display: "flex", alignItems: "center", gap: 8, borderBottom: "1px solid #E6D5B3", backgroundColor: "#fff" }}>
        <button type="button" onClick={nav.back} style={{ background: "none", border: "none", cursor: "pointer" }}><ChevronLeft size={20} style={{ color: "#3D2A1C" }} /></button>
        <div style={{ flex: 1 }}><div style={{ fontSize: 13, fontWeight: "bold", color: "#3D2A1C" }}>Kopi Klotok Pogung</div><div style={{ fontSize: 10, color: "#4E7C59" }}>● Online</div></div>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "10px 14px", backgroundColor: "#F3E4C9" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {messages.map((m, i) => (
            <div key={i} style={{ display: "flex", justifyContent: m.from === "user" ? "flex-end" : "flex-start" }}>
              <div style={{ maxWidth: "75%", padding: "8px 12px", borderRadius: 14, borderBottomRightRadius: m.from === "user" ? 4 : 14, borderBottomLeftRadius: m.from === "umkm" ? 4 : 14, backgroundColor: m.from === "user" ? "#8A5F41" : "#fff", color: m.from === "user" ? "#fff" : "#3D2A1C" }}>
                <p style={{ fontSize: 12, marginBottom: 3 }}>{m.text}</p>
                <span style={{ fontSize: 9, color: m.from === "user" ? "rgba(255,255,255,0.7)" : "#9B8164" }}>{m.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ padding: "8px 14px", display: "flex", gap: 6, borderTop: "1px solid #E6D5B3", backgroundColor: "#fff" }}>
        <input value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="Ketik pesan..." style={{ flex: 1, padding: "8px 10px", borderRadius: 10, fontSize: 12, backgroundColor: "#F3E4C9", color: "#3D2A1C", border: "1px solid #E6D5B3", boxSizing: "border-box" }} />
        <button type="button" style={{ width: 36, height: 36, borderRadius: 10, display: "grid", placeItems: "center", backgroundColor: "#8A5F41", border: "none", cursor: "pointer" }}><Send size={16} color="white" /></button>
      </div>
    </div>
  );
}

function ProtoPortofolio({ nav }: { nav: ProtoNav }) {
  const skills = ["Customer Service", "Event Handling", "Barista", "Teliti", "Tepat Waktu", "Komunikatif"];
  const history = [
    { title: "Runner Event Kampus", co: "UGM", date: "Mei 2026", rating: 5.0 },
    { title: "Admin Packing", co: "Gudang Sleman", date: "Apr 2026", rating: 4.8 },
    { title: "Barista Shift Sore", co: "Kopi Klotok", date: "Apr 2026", rating: 4.9 },
  ];
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", overflowY: "auto", paddingBottom: 20 }}>
      <div style={{ padding: "8px 14px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #E6D5B3", backgroundColor: "#F3E4C9" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <button type="button" onClick={nav.back} style={{ background: "none", border: "none", cursor: "pointer" }}><ChevronLeft size={20} style={{ color: "#3D2A1C" }} /></button>
          <span style={{ fontSize: 15, fontWeight: "bold", color: "#3D2A1C" }}>Portofolio Saya</span>
        </div>
        <button type="button" style={{ background: "none", border: "none", cursor: "pointer" }}><Share2 size={16} style={{ color: "#8A5F41" }} /></button>
      </div>
      <div style={{ padding: "12px 14px" }}>
        <div style={{ backgroundColor: "#fff", borderRadius: 16, padding: 14, marginBottom: 14, boxShadow: "0 8px 24px rgba(138,95,65,0.12)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
            <div style={{ width: 48, height: 48, borderRadius: "50%", overflow: "hidden", border: "2px solid #8A5F41" }}><img src={AVATAR_URL} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /></div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 16, fontWeight: "bold", color: "#3D2A1C", marginBottom: 2 }}>Nick</div>
              <div style={{ fontSize: 12, color: "#6E4A30", marginBottom: 2 }}>Mahasiswa UGM</div>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 3, padding: "1px 6px", borderRadius: 99, backgroundColor: "#F0F8F4", fontSize: 9, fontWeight: 600, color: "#4E7C59" }}><CheckCircle2 size={8} /> Terverifikasi</span>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}>
            {[{ v: "12", l: "project selesai", c: "#8A5F41" }, { v: "★ 4.8", l: "rating", c: "#C9922C" }, { v: "98%", l: "tepat waktu", c: "#4E7C59" }].map((m) => (
              <div key={m.l} style={{ textAlign: "center" }}><div style={{ fontSize: 18, fontWeight: "bold", color: m.c, marginBottom: 2 }}>{m.v}</div><div style={{ fontSize: 10, color: "#6E4A30" }}>{m.l}</div></div>
            ))}
          </div>
        </div>
        <h4 style={{ fontSize: 14, fontWeight: "bold", color: "#3D2A1C", marginBottom: 8 }}>Keahlian (otomatis)</h4>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 14 }}>
          {skills.map((s) => <span key={s} style={{ padding: "4px 8px", borderRadius: 99, fontSize: 11, fontWeight: 500, backgroundColor: "#FFFBF2", color: "#8A5F41", border: "1px solid #E6D5B3" }}>{s}</span>)}
        </div>
        <h4 style={{ fontSize: 14, fontWeight: "bold", color: "#3D2A1C", marginBottom: 10 }}>Riwayat Pekerjaan</h4>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 14 }}>
          {history.map((w, i) => (
            <div key={i} style={{ display: "flex", gap: 8 }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#8A5F41" }} />
                {i < history.length - 1 && <div style={{ width: 2, flex: 1, marginTop: 4, backgroundColor: "#E6D5B3", minHeight: 20 }} />}
              </div>
              <div style={{ flex: 1, paddingBottom: 10 }}>
                <div style={{ backgroundColor: "#fff", borderRadius: 12, padding: 10, boxShadow: "0 4px 12px rgba(138,95,65,0.08)" }}>
                  <div style={{ fontSize: 13, fontWeight: "bold", color: "#3D2A1C", marginBottom: 2 }}>{w.title}</div>
                  <div style={{ fontSize: 11, color: "#6E4A30", marginBottom: 4 }}>{w.co} · {w.date}</div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 3 }}><Star size={10} fill="#C9922C" style={{ color: "#C9922C" }} /><span style={{ fontSize: 11, fontWeight: 600, color: "#C9922C" }}>{w.rating}</span></div>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 2, padding: "1px 5px", borderRadius: 99, backgroundColor: "#F0F8F4", fontSize: 8, fontWeight: 600, color: "#4E7C59" }}><CheckCircle2 size={7} /> Terverifikasi</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ padding: 10, borderRadius: 12, textAlign: "center", backgroundColor: "#FFFBF2", border: "1px solid #E6D5B3" }}>
          <p style={{ fontSize: 11, color: "#6E4A30" }}>Portofolio ini menggantikan CV-mu</p>
        </div>
      </div>
    </div>
  );
}

function ProtoDompet({ nav }: { nav: ProtoNav }) {
  const history = [
    { amount: "+120", desc: "Runner Event terverifikasi", date: "Hari ini", type: "earned" as const },
    { amount: "+300", desc: "Bonus 3 project bulan ini", date: "Kemarin", type: "earned" as const },
    { amount: "+160", desc: "Barista Shift Sore selesai", date: "2 hari lalu", type: "earned" as const },
    { amount: "-1.000", desc: "Cair ke GoPay", date: "3 hari lalu", type: "withdrawn" as const },
  ];
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", paddingBottom: "70px" }}>
      <div style={{ padding: "10px 14px", backgroundColor: "#F3E4C9" }}>
        <h2 style={{ fontSize: 22, fontWeight: "bold", color: "#3D2A1C", marginBottom: 12 }}>Dompet Poin</h2>
        <div style={{ borderRadius: 16, padding: 14, marginBottom: 10, background: "linear-gradient(135deg,#8A5F41,#6E4A30)", boxShadow: "0 12px 32px rgba(138,95,65,0.3)" }}>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.8)", marginBottom: 4 }}>Saldo Poin</div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 6, marginBottom: 4 }}>
            <div style={{ fontSize: 28, fontWeight: 800, color: "#fff" }}>2.450</div>
            <Coins size={20} color="white" style={{ marginBottom: 2 }} />
          </div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.8)", marginBottom: 10 }}>≈ Rp245.000</div>
          <div style={{ display: "flex", gap: 6 }}>
            <button type="button" onClick={() => nav.go("cairkan")} style={{ flex: 1, padding: "7px 0", borderRadius: 10, fontSize: 12, fontWeight: 600, backgroundColor: "#fff", color: "#8A5F41", border: "none", cursor: "pointer" }}>Cairkan</button>
            <button type="button" style={{ padding: "7px 12px", borderRadius: 10, fontSize: 12, fontWeight: 600, backgroundColor: "rgba(255,255,255,0.2)", color: "#fff", border: "none", cursor: "pointer" }}>Riwayat</button>
          </div>
        </div>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "10px 14px" }}>
        <h4 style={{ fontSize: 14, fontWeight: "bold", color: "#3D2A1C", marginBottom: 8 }}>Riwayat Poin</h4>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {history.map((h) => (
            <div key={h.desc} style={{ backgroundColor: "#fff", borderRadius: 12, padding: 10, display: "flex", alignItems: "center", gap: 8, boxShadow: "0 4px 12px rgba(138,95,65,0.08)" }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", display: "grid", placeItems: "center", backgroundColor: h.type === "earned" ? "#FFFBF2" : "#FEF2F2" }}>
                {h.type === "earned" ? <Coins size={16} style={{ color: "#C9922C" }} /> : <ArrowDownCircle size={16} style={{ color: "#B5532B" }} />}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: "#3D2A1C" }}>{h.desc}</div>
                <div style={{ fontSize: 10, color: "#9B8164" }}>{h.date}</div>
              </div>
              <div style={{ fontSize: 14, fontWeight: "bold", color: h.type === "earned" ? "#4E7C59" : "#B5532B" }}>{h.amount}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProtoCairkan({ nav, points, setPoints, wallet, setWallet }: { nav: ProtoNav; points: string; setPoints: (v: string) => void; wallet: string; setWallet: (v: string) => void }) {
  const wallets = [
    { id: "gopay", name: "GoPay", color: "#00AA13" },
    { id: "ovo", name: "OVO", color: "#4C2A86" },
    { id: "dana", name: "DANA", color: "#118EEA" },
    { id: "shopeepay", name: "ShopeePay", color: "#EE4D2D" },
  ];
  const pts = parseInt(points) || 0;
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", backgroundColor: "rgba(0,0,0,0.5)" }}>
      <div style={{ flex: 1 }} onClick={nav.back} />
      <div style={{ backgroundColor: "#fff", borderRadius: "20px 20px 0 0", padding: 16, marginBottom: 20, boxShadow: "0 -8px 24px rgba(0,0,0,0.2)" }}>
        <div style={{ width: 40, height: 3, borderRadius: 99, backgroundColor: "#E6D5B3", margin: "0 auto 12px" }} />
        <h3 style={{ fontSize: 18, fontWeight: "bold", color: "#3D2A1C", marginBottom: 14 }}>Cairkan poin</h3>
        <div style={{ marginBottom: 14 }}>
          <label style={{ fontSize: 12, fontWeight: 600, color: "#3D2A1C", display: "block", marginBottom: 6 }}>Jumlah poin</label>
          <input type="number" value={points} onChange={(e) => setPoints(e.target.value)} style={{ width: "100%", padding: "10px 12px", borderRadius: 10, border: "2px solid #E6D5B3", backgroundColor: "#FFFBF2", color: "#3D2A1C", fontSize: 14, fontWeight: 600, boxSizing: "border-box" }} />
          <p style={{ fontSize: 11, color: "#8A5F41", marginTop: 4 }}>= Rp{(pts * 100).toLocaleString("id-ID")}</p>
        </div>
        <div style={{ marginBottom: 14 }}>
          <label style={{ fontSize: 12, fontWeight: 600, color: "#3D2A1C", display: "block", marginBottom: 8 }}>Pilih e-wallet</label>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {wallets.map((w) => {
              const isSel = wallet === w.id;
              return (
                <button key={w.id} type="button" onClick={() => setWallet(w.id)} style={{ width: "100%", padding: 10, borderRadius: 10, border: `2px solid ${isSel ? w.color : "#E6D5B3"}`, backgroundColor: isSel ? `${w.color}10` : "#fff", display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 28, height: 28, borderRadius: 8, backgroundColor: w.color, display: "grid", placeItems: "center" }}><Wallet size={14} color="white" /></div>
                    <span style={{ fontSize: 13, fontWeight: 600, color: "#3D2A1C" }}>{w.name}</span>
                  </div>
                  {isSel && <Check size={16} style={{ color: w.color }} />}
                </button>
              );
            })}
          </div>
        </div>
        <PBtn onClick={() => { nav.showToast("Berhasil! Dana dikirim ke GoPay"); setTimeout(() => nav.go("dompet"), 1500); }} disabled={pts < 1000}>Cairkan Sekarang</PBtn>
        {pts < 1000 && <p style={{ fontSize: 10, color: "#B5532B", textAlign: "center", marginTop: 6 }}>Minimal 1.000 poin untuk cairkan</p>}
      </div>
    </div>
  );
}

function ProtoProfil({ nav }: { nav: ProtoNav }) {
  const menuItems = [
    { label: "Portofolio Saya", icon: FileText, target: "portofolio" as ProtoScreen },
    { label: "Preferensi Kerja", icon: Settings, target: "preferensi" as ProtoScreen },
    { label: "Riwayat Transaksi", icon: History, target: "dompet" as ProtoScreen },
    { label: "Notifikasi", icon: Bell, target: "notifikasi" as ProtoScreen },
    { label: "Pusat Bantuan", icon: HelpCircle, target: null },
    { label: "Tentang QuickJob", icon: Info, target: null },
  ];
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", overflowY: "auto", paddingBottom: "70px" }}>
      <div style={{ padding: "10px 14px", backgroundColor: "#F3E4C9" }}>
        <h2 style={{ fontSize: 22, fontWeight: "bold", color: "#3D2A1C", marginBottom: 12 }}>Profil</h2>
        <div style={{ backgroundColor: "#fff", borderRadius: 16, padding: 14, marginBottom: 10, boxShadow: "0 8px 24px rgba(138,95,65,0.12)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
            <div style={{ width: 48, height: 48, borderRadius: "50%", overflow: "hidden", border: "2px solid #8A5F41" }}><img src={AVATAR_URL} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /></div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 16, fontWeight: "bold", color: "#3D2A1C", marginBottom: 2 }}>Nick</div>
              <div style={{ fontSize: 12, color: "#6E4A30" }}>Mahasiswa UGM · Terverifikasi</div>
            </div>
            <button type="button" style={{ fontSize: 11, fontWeight: 600, padding: "4px 10px", borderRadius: 8, backgroundColor: "#FFFBF2", color: "#8A5F41", border: "none", cursor: "pointer" }}>Edit</button>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-around", paddingTop: 10, borderTop: "1px solid #E6D5B3" }}>
            {[{ v: "12", l: "project", c: "#8A5F41" }, { v: "★ 4.8", l: "rating", c: "#C9922C" }, { v: "🪙 2.450", l: "poin", c: "#C9922C" }].map((m) => (
              <div key={m.l} style={{ textAlign: "center" }}><div style={{ fontSize: 16, fontWeight: "bold", color: m.c, marginBottom: 2 }}>{m.v}</div><div style={{ fontSize: 10, color: "#6E4A30" }}>{m.l}</div></div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ padding: "6px 14px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {menuItems.map((m) => {
            const Icon = m.icon;
            return (
              <button key={m.label} type="button" onClick={() => m.target && nav.go(m.target)} style={{ width: "100%", backgroundColor: "#fff", borderRadius: 12, padding: 10, display: "flex", alignItems: "center", gap: 8, boxShadow: "0 4px 12px rgba(138,95,65,0.06)", border: "none", cursor: "pointer", textAlign: "left" }}>
                <Icon size={16} style={{ color: "#8A5F41" }} />
                <span style={{ flex: 1, fontSize: 13, fontWeight: 500, color: "#3D2A1C" }}>{m.label}</span>
                <ChevronRight size={16} style={{ color: "#9B8164" }} />
              </button>
            );
          })}
          <button type="button" style={{ width: "100%", backgroundColor: "#fff", borderRadius: 12, padding: 10, display: "flex", alignItems: "center", gap: 8, boxShadow: "0 4px 12px rgba(138,95,65,0.06)", border: "none", cursor: "pointer", textAlign: "left", marginTop: 8 }}>
            <LogOut size={16} style={{ color: "#B5532B" }} />
            <span style={{ flex: 1, fontSize: 13, fontWeight: 500, color: "#B5532B" }}>Keluar</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function ProtoNotifikasi({ nav }: { nav: ProtoNav }) {
  const notifications = [
    { icon: CheckCircle2, iconColor: "#4E7C59", iconBg: "#F0F8F4", title: "Lamaranmu diterima!", desc: "Runner Event Kampus", time: "5 menit lalu" },
    { icon: Coins, iconColor: "#C9922C", iconBg: "#FFFBF2", title: "+120 poin masuk ke dompetmu", desc: "Dari Runner Event Kampus", time: "1 jam lalu" },
    { icon: MapPin, iconColor: "#8A5F41", iconBg: "#EFE3D2", title: "Job baru 0.5 km dari kampusmu", desc: "Barista Sore", time: "3 jam lalu" },
    { icon: Star, iconColor: "#C9922C", iconBg: "#FFFBF2", title: "UMKM memberi kamu rating 5★", desc: "Kopi Klotok Pogung", time: "Kemarin" },
  ];
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", overflowY: "auto", paddingBottom: 20 }}>
      <div style={{ padding: "8px 14px", display: "flex", alignItems: "center", gap: 8, borderBottom: "1px solid #E6D5B3", backgroundColor: "#F3E4C9" }}>
        <button type="button" onClick={nav.back} style={{ background: "none", border: "none", cursor: "pointer" }}><ChevronLeft size={20} style={{ color: "#3D2A1C" }} /></button>
        <h3 style={{ flex: 1, fontSize: 18, fontWeight: "bold", color: "#3D2A1C" }}>Notifikasi</h3>
      </div>
      <div style={{ padding: "10px 14px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {notifications.map((n) => {
            const Icon = n.icon;
            return (
              <div key={n.title} style={{ backgroundColor: "#fff", borderRadius: 12, padding: 10, display: "flex", gap: 8, alignItems: "flex-start", boxShadow: "0 4px 12px rgba(138,95,65,0.08)", position: "relative" }}>
                <div style={{ position: "absolute", top: 10, right: 10, width: 6, height: 6, borderRadius: "50%", backgroundColor: "#8A5F41" }} />
                <div style={{ width: 32, height: 32, borderRadius: "50%", display: "grid", placeItems: "center", backgroundColor: n.iconBg, flexShrink: 0 }}><Icon size={16} style={{ color: n.iconColor }} /></div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "#3D2A1C", marginBottom: 2 }}>{n.title}</div>
                  <div style={{ fontSize: 11, color: "#6E4A30", marginBottom: 2 }}>{n.desc}</div>
                  <div style={{ fontSize: 10, color: "#9B8164" }}>{n.time}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ProtoBottomNav({ active, nav }: { active: ProtoScreen; nav: ProtoNav }) {
  const tabs: { id: string; label: string; Icon: typeof Home; target: ProtoScreen | null; activeFor: ProtoScreen[] }[] = [
    { id: "beranda", label: "Beranda", Icon: Home, target: "beranda", activeFor: ["beranda"] },
    { id: "jelajah", label: "Jelajah", Icon: Compass, target: "jelajah", activeFor: ["jelajah"] },
    { id: "aktivitas", label: "Aktivitas", Icon: ListTodo, target: "aktivitas", activeFor: ["aktivitas"] },
    { id: "dompet", label: "Dompet", Icon: Wallet, target: "dompet", activeFor: ["dompet"] },
    { id: "profil", label: "Profil", Icon: User, target: "profil", activeFor: ["profil"] },
  ];
  return (
    <div className="ps-tabs">
      {tabs.map((t) => {
        const on = t.activeFor.includes(active);
        const Icon = t.Icon;
        return (
          <button
            type="button"
            key={t.id}
            className={`ps-tab ${on ? "on" : ""} ${t.target ? "" : "is-disabled"}`}
            onClick={() => t.target && nav.go(t.target)}
            disabled={!t.target}
          >
            <Icon size={16} />
            <span>{t.label}</span>
          </button>
        );
      })}
    </div>
  );
}

function SlideClosing() {
  return (
    <div className="grid-2 hero">
      <div>
        <Kicker>Slide 15 · Penutup</Kicker>
        <div className="hero-mark">
          <div className="hero-logo">
            <img src="/quickjob-logo.png" alt="QuickJob Campus Logo" />
          </div>
          <Chip>Kerja Sampingan, Mudah &amp; Dekat</Chip>
        </div>
        <h1 className="hero-title">
          Mari <span className="grad">Berkoneksi</span> &amp; Berkolaborasi
        </h1>
        <p className="hero-tag">
          Membangun ekosistem kerja instan mahasiswa terbesar di Indonesia.
        </p>
        <p className="quote">"Terima Kasih atas Waktu &amp; Kesempatan Anda."</p>
      </div>
      <div className="closing-stage">
        <div className="big-mark">
          <img src="/quickjob-logo.png" alt="QuickJob Campus Logo" />
          <div className="ring r1" />
          <div className="ring r2" />
          <div className="ring r3" />
        </div>
      </div>
    </div>
  );
}

/* ---------------- CSS ---------------- */

const CSS = `
:root {
  --bg-0: #1a1108;
  --bg-1: #261810;
  --cream: #F3E4C9;
  --cream-soft: #FFF6E3;
  --espresso: #2C1E14;
  --coffee: #4B3525;
  --muted: #B49C82;
  --accent: #E89A4C;
  --accent-2: #C9622C;
  --accent-glow: rgba(232,154,76,.55);
  --border: rgba(243,228,201,.14);
  --border-strong: rgba(243,228,201,.28);
  --panel: rgba(255, 246, 227, 0.04);
  --panel-2: rgba(255, 246, 227, 0.07);
  --ease: cubic-bezier(0.25, 1, 0.5, 1);
}
* { box-sizing: border-box; }
.qj-root {
  position: fixed; inset: 0;
  background: radial-gradient(ellipse at top left, #3a2415 0%, var(--bg-0) 60%);
  color: var(--cream);
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  display: grid;
  grid-template-rows: 56px 1fr 48px;
  overflow: hidden;
}
.qj-mesh {
  position: absolute; inset: -10%;
  background:
    radial-gradient(circle at 20% 30%, var(--accent-glow), transparent 35%),
    radial-gradient(circle at 80% 70%, rgba(201,98,44,.35), transparent 38%),
    radial-gradient(circle at 60% 20%, rgba(243,228,201,.12), transparent 40%);
  filter: blur(40px);
  animation: meshFloat 18s var(--ease) infinite alternate;
  pointer-events: none;
  z-index: 0;
}
@keyframes meshFloat {
  0% { transform: translate3d(0,0,0) scale(1); }
  100% { transform: translate3d(-3%, 2%, 0) scale(1.08); }
}
.qj-grain {
  position: absolute; inset: 0;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.95 0 0 0 0 0.85 0 0 0 0 0.7 0 0 0 0.08 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
  opacity: .35; pointer-events: none; z-index: 1; mix-blend-mode: overlay;
}

/* topbar */
.qj-topbar {
  position: relative; z-index: 5;
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 22px;
  border-bottom: 1px solid var(--border);
  background: linear-gradient(180deg, rgba(0,0,0,.35), rgba(0,0,0,.1));
  backdrop-filter: blur(20px);
}
.qj-brand { display: flex; align-items: center; gap: 12px; }
.qj-logo {
  width: 36px; height: 36px; border-radius: 11px;
  background: linear-gradient(135deg, var(--accent), var(--accent-2));
  display: grid; place-items: center;
  font-weight: 900; color: var(--espresso);
  box-shadow: 0 4px 14px var(--accent-glow);
  position: relative; overflow: hidden;
}
.qj-logo img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.qj-logo span { position: relative; z-index: 1; font-size: 14px; }
.qj-brand-text strong { display: block; font-size: 14px; letter-spacing: -.01em; }
.qj-brand-text small { font-size: 11px; color: var(--muted); }
.qj-counter {
  display: flex; align-items: center; gap: 6px;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 12px; color: var(--muted);
}
.qj-num { color: var(--accent); font-weight: 700; font-size: 16px; }
.qj-tot { font-size: 12px; }
.qj-label { margin-left: 10px; color: var(--cream); opacity: .8; }
.qj-controls { display: flex; gap: 8px; }
.qj-controls button {
  width: 36px; height: 36px; border-radius: 10px;
  background: var(--panel); color: var(--cream);
  border: 1px solid var(--border);
  cursor: pointer; font-size: 15px;
  transition: all .2s var(--ease);
}
.qj-controls button:hover { background: var(--accent); color: var(--espresso); border-color: var(--accent); transform: translateY(-1px); }

/* stage & slides */
.qj-stage { position: relative; z-index: 2; overflow: hidden; }
.qj-slide {
  position: absolute; inset: 0;
  padding: 24px clamp(32px, 5vw, 72px);
  opacity: 0;
  transform: translate3d(40px, 0, 0) scale(.98);
  transition: opacity .55s var(--ease), transform .65s var(--ease);
  pointer-events: none;
  overflow: hidden;
}
.qj-slide-past { transform: translate3d(-40px, 0, 0) scale(.98); }
.qj-slide-active { opacity: 1; transform: translate3d(0,0,0) scale(1); pointer-events: auto; }
.qj-slide-inner {
  height: 100%; max-width: 1320px; margin: 0 auto;
  display: flex; flex-direction: column;
}

/* layouts */
.grid-2 { display: grid; grid-template-columns: 1.05fr 1fr; gap: clamp(32px, 4vw, 64px); align-items: center; height: 100%; }
.grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
.col { display: flex; flex-direction: column; gap: 22px; height: 100%; }
.stack { display: flex; flex-direction: column; gap: 16px; }

/* typography */
.qj-kicker {
  display: inline-block;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 13px; letter-spacing: .14em; text-transform: uppercase;
  color: var(--accent); padding: 6px 12px;
  border: 1px solid var(--border-strong); border-radius: 999px;
  background: var(--panel);
  margin-bottom: 14px;
}
.qj-title {
  font-family: 'Georgia', 'Iowan Old Style', serif;
  font-size: clamp(38px, 4.4vw, 58px);
  line-height: 1.08; letter-spacing: -.02em;
  margin: 0; color: var(--cream-soft);
}
.qj-lead {
  margin-top: 16px;
  font-size: clamp(18px, 1.5vw, 22px);
  line-height: 1.6; color: var(--muted);
  max-width: 640px;
}
.muted { color: var(--muted); font-size: 18px; line-height: 1.55; }
.mono { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 15.5px; line-height: 1.65; color: var(--cream); white-space: pre-wrap; margin: 0; }
.mono-sm { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 16px; color: var(--cream); line-height: 1.6; }

.qj-chip {
  display: inline-flex; align-items: center;
  padding: 5px 12px; border-radius: 999px;
  background: var(--panel-2);
  border: 1px solid var(--border);
  font-size: 14.5px; color: var(--cream); font-weight: 500;
}
.qj-codechip {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 6px 14px; border-radius: 999px;
  background: rgba(232,154,76,.10); border: 1px solid rgba(232,154,76,.35);
  color: var(--accent);
  font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 14.5px;
  align-self: flex-start;
}
.qj-codechip i { width: 6px; height: 6px; border-radius: 50%; background: var(--accent); box-shadow: 0 0 8px var(--accent); animation: pulse 1.6s ease-in-out infinite; }
@keyframes pulse { 50% { opacity: .35; transform: scale(1.4); } }

/* panel & card */
.qj-panel {
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 18px 22px;
  backdrop-filter: blur(12px);
  margin-top: 14px;
}
.panel-h { font-size: 17px; font-weight: 700; margin: 0 0 8px; letter-spacing: -.01em; color: var(--cream-soft); }
.panel-h.accent { color: var(--accent); }
.bullets { padding-left: 18px; margin: 0; display: grid; gap: 8px; color: var(--muted); font-size: 17px; line-height: 1.55; }
.bullets b { color: var(--cream); }
.bullets-icon { padding-left: 16px; }

.card {
  position: relative;
  padding: 18px 16px 16px;
  border-radius: 18px;
  background: linear-gradient(180deg, rgba(255,246,227,.07), rgba(255,246,227,.02));
  border: 1px solid var(--border-strong);
  display: flex; flex-direction: column; gap: 8px;
  opacity: 0; animation: cardIn .6s var(--ease) forwards;
  overflow: hidden;
}
.card::before {
  content: ""; position: absolute; inset: -1px; border-radius: 18px;
  background: linear-gradient(135deg, transparent, var(--accent-glow), transparent);
  opacity: 0; transition: opacity .4s; z-index: -1;
}
.card:hover::before { opacity: .6; }
.card-num {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 15px; color: var(--accent); letter-spacing: .1em;
}
.card h3 { font-family: 'Georgia', serif; font-size: 24px; margin: 0; color: var(--cream-soft); }
.card p { font-size: 16px; line-height: 1.55; color: var(--muted); margin: 0; }
@keyframes cardIn { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }

/* hero */
.hero { align-items: center; }
.hero-mark { display: flex; align-items: center; gap: 12px; margin-bottom: 14px; }
.hero-logo {
  width: 56px; height: 56px; border-radius: 16px;
  background: linear-gradient(135deg, var(--accent), var(--accent-2));
  display: grid; place-items: center; color: var(--espresso);
  font-weight: 900; font-size: 20px; position: relative; overflow: hidden;
  box-shadow: 0 8px 28px var(--accent-glow);
}
.hero-logo img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.hero-title {
  font-family: 'Georgia', serif;
  font-size: clamp(40px, 5.6vw, 76px);
  line-height: 1; letter-spacing: -.035em;
  margin: 0 0 10px; color: var(--cream-soft);
}
.grad {
  background: linear-gradient(120deg, var(--accent), #f5cf95);
  -webkit-background-clip: text; background-clip: text; color: transparent;
}
.hero-tag { font-size: 21px; color: var(--accent); margin: 0 0 12px; font-style: italic; }
.founders { display: flex; gap: 8px; margin-top: 18px; flex-wrap: wrap; }

/* mini phones */
.phones { display: flex; gap: -10px; align-items: center; justify-content: center; perspective: 900px; }
.mini-phone {
  width: 260px; height: 540px; border-radius: 36px;
  background: linear-gradient(180deg, #1a0e06, #2a1a10);
  padding: 6px;
  border: 1px solid rgba(243,228,201,.18);
  box-shadow: 0 30px 50px rgba(0,0,0,.55), inset 0 0 0 1px rgba(255,255,255,.04);
  flex-shrink: 0;
  position: relative;
  overflow: hidden;
}
.phone-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 30px;
}
.mp-left { transform: translateX(18px) rotate(-8deg); width: 248px; }
.mp-center { z-index: 2; transform: translateY(-12px); width: 260px; }
.mp-right { transform: translateX(-16px) rotate(8deg); width: 236px; }

/* team */
.team-layout {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 50px;
}
.team-header {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.team-grid-center {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
  max-width: 1100px;
  width: 100%;
  padding: 0 40px;
}
.member-card-large {
  padding: 28px 20px;
  border-radius: 24px;
  background: var(--panel);
  border: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 16px;
  opacity: 0;
  animation: cardIn .6s var(--ease) forwards;
  transition: transform .25s var(--ease), border-color .25s;
}
.member-card-large:hover {
  transform: translateY(-3px);
  border-color: var(--accent);
}
.photo-frame-large {
  width: 100%;
  aspect-ratio: 1;
  border-radius: 20px;
  display: grid;
  place-items: center;
  background: rgba(0,0,0,.18);
  overflow: hidden;
  position: relative;
}
.team-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 20px;
}
.member-card-large h3 {
  margin: 4px 0 0;
  font-size: 22px;
  font-family: 'Georgia', serif;
  color: var(--cream-soft);
}
.member-npm {
  margin: 0;
  font-size: 14px;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  color: var(--muted);
  letter-spacing: 0.05em;
}

/* old team styles - keep for compatibility */
.team-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
.member-card {
  padding: 14px 12px; border-radius: 16px;
  background: var(--panel); border: 1px solid var(--border);
  display: flex; flex-direction: column; align-items: center; text-align: center; gap: 6px;
  opacity: 0; animation: cardIn .6s var(--ease) forwards;
  transition: transform .25s var(--ease), border-color .25s;
}
.member-card:hover { transform: translateY(-3px); border-color: var(--accent); }
.photo-frame {
  width: 100%; aspect-ratio: 1; border-radius: 12px;
  border: 1.5px dashed var(--border-strong);
  display: grid; place-items: center;
  color: var(--muted); font-size: 11px; font-family: monospace; letter-spacing: .1em;
  background: rgba(0,0,0,.18);
  overflow: hidden;
  position: relative;
}
.member-card h3 { margin: 4px 0 0; font-size: 14px; font-family: 'Georgia', serif; color: var(--cream-soft); }

/* market bars */
.market-stack { display: flex; flex-direction: column; gap: 16px; padding: 22px; }
.bar-row strong { font-size: 17px; color: var(--cream-soft); display: block; margin-bottom: 6px; }
.bar-track { height: 10px; border-radius: 999px; background: rgba(255,246,227,.06); overflow: hidden; }
.bar-fill {
  height: 100%; background: linear-gradient(90deg, var(--accent), var(--accent-2));
  border-radius: 999px; box-shadow: 0 0 12px var(--accent-glow);
  transform-origin: left; animation: grow 1.2s var(--ease) both;
}
@keyframes grow { from { transform: scaleX(0); } to { transform: scaleX(1); } }
.bar-row p { margin: 6px 0 0; font-size: 15px; color: var(--muted); }

/* phones single big */
.phones-single { display: grid; place-items: center; height: 100%; }
.big-phone {
  width: 260px; height: 540px; border-radius: 36px;
  background: linear-gradient(180deg, #1a0e06, #2a1a10);
  padding: 6px; border: 1px solid rgba(243,228,201,.18);
  box-shadow: 0 30px 60px rgba(0,0,0,.6);
  position: relative;
  overflow: hidden;
}
.phone-image-large {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 30px;
}
.bp-screen { width: 100%; height: 100%; border-radius: 28px; background: var(--cream-soft); color: var(--espresso); padding: 14px; display: flex; flex-direction: column; gap: 10px; overflow: hidden; }
.bp-header { font-family: 'Georgia', serif; font-size: 18px; font-weight: 700; }
.bp-search { padding: 8px 12px; border-radius: 10px; background: #efe0c2; font-size: 11px; color: var(--coffee); }
.bp-map { height: 90px; border-radius: 12px; background: linear-gradient(135deg, #efe0c2, #d8be96); position: relative; }
.bp-map span { position: absolute; width: 10px; height: 10px; border-radius: 50%; background: var(--accent-2); box-shadow: 0 0 0 6px rgba(201,98,44,.25); }
.bp-map span:nth-child(1) { left: 25%; top: 40%; }
.bp-map span:nth-child(2) { right: 30%; top: 25%; }
.bp-map span:nth-child(3) { left: 55%; top: 60%; }
.bp-job { padding: 10px 12px; background: white; border-radius: 12px; border: 1px solid #e8d6b2; display: flex; justify-content: space-between; align-items: center; }
.bp-job strong { font-size: 12px; color: var(--espresso); }
.bp-job small { font-size: 10px; color: var(--coffee); }

/* business lanes */
.lanes { display: flex; flex-direction: column; gap: 10px; }
.lane {
  padding: 14px;
  border-radius: 12px;
  background: rgba(255,246,227,.04);
  border: 1px solid var(--border);
  display: grid; grid-template-columns: 1fr auto; gap: 6px 14px;
  align-items: center;
}
.lane strong { font-size: 18px; color: var(--cream-soft); }
.lane p { grid-column: 1 / -1; font-size: 16px; color: var(--muted); margin: 0; }
.lane .qj-chip { background: var(--accent); color: var(--espresso); border-color: var(--accent); font-weight: 700; }

/* journey */
.journey { display: grid; grid-template-columns: repeat(6, 1fr); gap: 10px; }
.journey-step {
  padding: 14px 12px;
  border-radius: 14px;
  background: var(--panel);
  border: 1px solid var(--border);
  display: flex; flex-direction: column; gap: 6px;
  opacity: 0; animation: cardIn .55s var(--ease) forwards;
  transition: all .2s var(--ease);
}
.journey-step:hover { border-color: var(--accent); transform: translateY(-2px); }
.j-num { font-family: 'JetBrains Mono', monospace; font-size: 13px; color: var(--accent); letter-spacing: .08em; }
.journey-step h4 { margin: 0; font-family: 'Georgia', serif; font-size: 18px; color: var(--cream-soft); }
.journey-step ul { padding-left: 14px; margin: 0; display: grid; gap: 4px; font-size: 14.5px; color: var(--muted); }

/* matrix */
.matrix {
  position: relative; aspect-ratio: 1.1 / 1;
  border-radius: 18px;
  background:
    linear-gradient(to right, transparent 49.7%, var(--border-strong) 49.7%, var(--border-strong) 50.3%, transparent 50.3%),
    linear-gradient(to bottom, transparent 49.7%, var(--border-strong) 49.7%, var(--border-strong) 50.3%, transparent 50.3%),
    var(--panel);
  border: 1px solid var(--border);
}
.axis { position: absolute; font-size: 10px; color: var(--muted); font-family: 'JetBrains Mono', monospace; letter-spacing: .04em; }
.ay-top { top: 8px; left: 50%; transform: translateX(-50%); }
.ay-bot { bottom: 8px; left: 50%; transform: translateX(-50%); }
.ax-right { right: 8px; top: 50%; transform: translateY(-50%) rotate(90deg); transform-origin: right center; }
.ax-left { left: 8px; top: 50%; transform: translateY(-50%) rotate(-90deg); transform-origin: left center; }
.dot { position: absolute; transform: translate(-50%, -50%); display: flex; flex-direction: column; align-items: center; gap: 4px; }
.dot span { width: 12px; height: 12px; border-radius: 50%; background: var(--muted); border: 2px solid var(--cream-soft); }
.dot strong { font-size: 14px; color: var(--cream); text-align: center; max-width: 110px; }
.dot.us span { width: 18px; height: 18px; background: var(--accent); box-shadow: 0 0 0 8px var(--accent-glow); animation: pulse 1.8s infinite; }
.dot.us strong { color: var(--accent); font-size: 15.5px; font-weight: 800; }

/* allocation */
.alloc { display: grid; gap: 10px; }
.alloc-row { display: flex; justify-content: space-between; font-size: 16px; color: var(--cream); font-weight: 700; }
.alloc-bar { height: 8px; border-radius: 999px; background: rgba(255,246,227,.06); margin-top: 4px; overflow: hidden; }
.alloc-bar div { height: 100%; background: linear-gradient(90deg, var(--accent), var(--accent-2)); animation: grow 1.1s var(--ease) both; transform-origin: left; }

/* aarrr */
.aarrr { display: grid; grid-template-columns: repeat(5, 1fr); gap: 10px; }
.aarrr-card {
  padding: 14px 12px; border-radius: 14px;
  background: var(--panel); border: 1px solid var(--border);
  display: flex; flex-direction: column; gap: 6px;
  opacity: 0; animation: cardIn .55s var(--ease) forwards;
}
.aarrr-letter {
  width: 32px; height: 32px; border-radius: 8px;
  background: linear-gradient(135deg, var(--accent), var(--accent-2));
  color: var(--espresso); display: grid; place-items: center; font-weight: 900; font-size: 16px;
}
.aarrr-card b { font-size: 17px; color: var(--cream-soft); }
.aarrr-card p { font-size: 14.5px; margin: 0; }

/* runway */
.runway { position: relative; display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; padding: 22px 0; }
.runway::before {
  content: ""; position: absolute; top: 32px; left: 6%; right: 6%; height: 2px;
  background: linear-gradient(90deg, var(--accent), transparent);
}
.milestone {
  display: flex; flex-direction: column; gap: 6px;
  padding: 14px 14px 14px;
  border-radius: 14px;
  background: var(--panel); border: 1px solid var(--border);
  position: relative;
  opacity: 0; animation: cardIn .6s var(--ease) forwards;
}
.ms-dot { position: absolute; top: -7px; left: 20px; width: 14px; height: 14px; border-radius: 50%; background: var(--accent); box-shadow: 0 0 0 4px var(--bg-0), 0 0 14px var(--accent-glow); }
.milestone h3 { margin: 6px 0 0; font-family: 'Georgia', serif; font-size: 21px; color: var(--cream-soft); }

/* progress */
.qj-progress { position: relative; z-index: 5; padding: 0 22px; display: flex; align-items: center; justify-content: space-between; gap: 16px; border-top: 1px solid var(--border); background: linear-gradient(0deg, rgba(0,0,0,.4), transparent); }
.qj-dots { display: flex; gap: 6px; }
.qj-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--border-strong); border: 0; cursor: pointer; padding: 0; transition: all .2s var(--ease); }
.qj-dot.on { background: var(--accent); width: 24px; border-radius: 999px; box-shadow: 0 0 10px var(--accent-glow); }
.qj-bar { flex: 1; max-width: 280px; height: 3px; border-radius: 999px; background: var(--border); overflow: hidden; }
.qj-bar-fill { height: 100%; background: linear-gradient(90deg, var(--accent), var(--accent-2)); transition: width .6s var(--ease); }

/* ---- prototype slide ---- */
/* ===== Slide 14 prototype (auto-cycling) ===== */
.proto-layout {
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: clamp(28px, 4vw, 56px);
  height: 100%;
  align-items: center;
}
.proto-info { max-width: 560px; }
.proto-info .qj-kicker { margin-bottom: 6px; }
.proto-info .qj-title { margin-bottom: 14px; }
.proto-info .qj-lead { margin-bottom: 22px; }

.proto-dots { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 22px; }
.proto-dot {
  display: flex; align-items: center; gap: 8px;
  padding: 8px 14px; border-radius: 999px;
  background: var(--panel); color: var(--cream);
  border: 1px solid var(--border);
  font-size: 12px; cursor: pointer;
  transition: all .25s var(--ease);
}
.proto-dot:hover { border-color: var(--border-strong); }
.proto-dot.on {
  background: linear-gradient(135deg, var(--accent), var(--accent-2));
  border-color: var(--accent);
  color: white;
  box-shadow: 0 6px 18px var(--accent-glow);
}
.proto-dot-num {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 10px; opacity: .8;
}
.proto-dot-label { font-weight: 600; letter-spacing: .01em; }

/* Phone frame */
.qj-phone { display: grid; place-items: center; }
.phone-frame {
  width: 320px; height: 660px; border-radius: 46px;
  background: linear-gradient(180deg, #14090a, #2a1810);
  padding: 11px;
  border: 2px solid rgba(243,228,201,.22);
  box-shadow: 0 50px 100px rgba(0,0,0,.7), inset 0 0 0 1px rgba(255,255,255,.05);
  position: relative;
}
.notch {
  position: absolute; top: 14px; left: 50%; transform: translateX(-50%);
  width: 110px; height: 26px; border-radius: 16px; background: #000; z-index: 5;
  display: flex; align-items: center; justify-content: center; gap: 22px;
}
.notch-speaker { width: 40px; height: 4px; border-radius: 3px; background: #1a1a1a; box-shadow: inset 0 0 2px rgba(255,255,255,.08); }
.notch-cam { width: 7px; height: 7px; border-radius: 50%; background: #0c1620; box-shadow: inset 0 0 2px rgba(60,90,140,.5); }
.phone-screen {
  width: 100%; height: 100%; border-radius: 35px;
  background: #F3E4C9;
  color: #3D2A1C;
  overflow: hidden; position: relative;
  display: flex; flex-direction: column;
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
}
.phone-screen * { scroll-behavior: smooth; }
.phone-screen ::-webkit-scrollbar { width: 2px; }
.phone-screen ::-webkit-scrollbar-track { background: transparent; }
.phone-screen ::-webkit-scrollbar-thumb { background: #D4B896; border-radius: 99px; }
.phone-screen ::-webkit-scrollbar-thumb:hover { background: #B8936E; }

.ph-status {
  display: flex; justify-content: space-between; align-items: center;
  padding: 12px 28px 4px; font-size: 12px; font-weight: 700; color: #3D2A1C;
  flex-shrink: 0; position: relative; z-index: 4;
}
.ph-status-r { font-size: 11px; opacity: .9; letter-spacing: .02em; }

.ph-content {
  flex: 1; overflow: hidden; position: relative; min-height: 0;
}
.ph-content [style*="overflow-y: auto"],
.ph-content [style*="overflow-y:auto"],
.ph-content [style*="overflow-y: scroll"],
.ps-pad.ps-scroll {
  transform: translateZ(0);
  will-change: scroll-position;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior: contain;
}

.ps-pad { padding: 8px 16px 16px; display: flex; flex-direction: column; gap: 11px; }
.ps-pad.ps-scroll { height: 100%; overflow-y: auto; padding-bottom: 80px; }
.ps-pad.ps-scroll::-webkit-scrollbar { display: none; }

/* Splash */
.ps-splash {
  height: 100%; display: flex; flex-direction: column;
  align-items: center; justify-content: center; gap: 10px; padding: 30px 24px;
  background: linear-gradient(180deg, #F3E4C9 0%, #EFE3D2 100%);
}
.ps-logo-ring {
  width: 96px; height: 96px; border-radius: 28px;
  background: #FFFFFF;
  display: grid; place-items: center;
  box-shadow: 0 18px 38px rgba(138,95,65,.20);
  overflow: hidden;
  position: relative;
}
  width: 100%; height: 100%;
  display: grid; place-items: center;
}
.ps-logo img { width: 100%; height: 100%; object-fit: cover; }
@keyframes psBounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}
.ps-brand { font-family: 'Plus Jakarta Sans', 'Inter', sans-serif; font-size: 22px; font-weight: 800; margin: 8px 0 0; color: #3D2A1C; letter-spacing: -.01em; }
.ps-tag { font-size: 12px; color: #6E4A30; margin: 0; }
.ps-loading { display: flex; gap: 6px; margin-top: 10px; }
.ps-loading span {
  width: 7px; height: 7px; border-radius: 50%;
  background: #8A5F41; opacity: .35;
  animation: psDot 1.2s infinite ease-in-out;
}
.ps-loading span:nth-child(2) { animation-delay: .15s; }
.ps-loading span:nth-child(3) { animation-delay: .3s; }
@keyframes psDot {
  0%, 100% { opacity: .35; transform: scale(.85); }
  50% { opacity: 1; transform: scale(1.1); }
}
.ps-note { font-size: 11px; color: #9B8164; margin: 4px 0 0; }

/* Beranda */
.ps-head { display: flex; justify-content: space-between; align-items: center; gap: 8px; }
.ps-user { display: flex; align-items: center; gap: 9px; }
.ps-avatar {
  width: 38px; height: 38px; border-radius: 50%;
  border: 2px solid #8A5F41; overflow: hidden; flex-shrink: 0;
}
.ps-avatar.lg { width: 58px; height: 58px; border-width: 2.5px; }
.ps-avatar img { width: 100%; height: 100%; object-fit: cover; }
.ps-user-text strong { display: block; font-size: 13.5px; font-weight: 700; color: #3D2A1C; line-height: 1.15; }
.ps-user-text small { font-size: 10.5px; color: #6E4A30; }
.ps-head-r { display: flex; align-items: center; gap: 8px; }
.ps-points-pill {
  display: inline-flex; align-items: center; gap: 4px;
  padding: 4px 9px; border-radius: 999px;
  background: #FFFBF2; color: #C9922C;
  font-size: 11px; font-weight: 800;
}
.ps-bell {
  position: relative; display: inline-grid; place-items: center;
  width: 30px; height: 30px; color: #3D2A1C;
}
.ps-bell-dot {
  position: absolute; top: -2px; right: -2px;
  width: 14px; height: 14px; border-radius: 50%;
  background: #B5532B; color: white;
  font-size: 9px; font-weight: 800;
  display: grid; place-items: center;
  border: 1.5px solid #F3E4C9;
}

.ps-metrics { display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; }
.ps-metric {
  background: #FFFFFF; border-radius: 14px;
  padding: 9px 6px; text-align: center;
  box-shadow: 0 4px 12px rgba(138, 95, 65, 0.08);
}
.ps-metric strong {
  display: block; font-size: 15px; font-weight: 800;
  color: #8A5F41; margin-bottom: 1px;
  font-family: 'Plus Jakarta Sans', 'Inter', sans-serif;
}
.ps-metric small { font-size: 9.5px; color: #6E4A30; }
.ps-metric-gold strong { color: #C9922C; }

.ps-search {
  display: flex; align-items: center; gap: 7px;
  padding: 9px 12px; border-radius: 12px;
  background: #FFFFFF; border: 1px solid #E6D5B3;
  font-size: 11.5px; color: #9B8164;
}
.ps-search svg { color: #9B8164; flex-shrink: 0; }

.ps-filters { display: flex; gap: 6px; overflow-x: auto; padding-bottom: 1px; }
.ps-filters::-webkit-scrollbar { display: none; }
.ps-chip {
  padding: 5px 11px; border-radius: 999px;
  background: #FFFFFF; border: 1.5px solid #E6D5B3;
  font-size: 10.5px; font-weight: 600; color: #6E4A30;
  white-space: nowrap;
}
.ps-chip.on {
  background: #8A5F41; color: white; border-color: #8A5F41;
}

.ps-map-card {
  position: relative; height: 96px; border-radius: 18px;
  overflow: hidden; cursor: pointer;
  box-shadow: 0 8px 24px rgba(138, 95, 65, 0.15);
}
.ps-map-card img { width: 100%; height: 100%; object-fit: cover; }
.ps-map-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(to top, rgba(138,95,65,.7) 0%, rgba(138,95,65,.1) 60%, transparent 100%);
}
.ps-map-info {
  position: absolute; left: 12px; right: 12px; bottom: 10px;
  display: flex; align-items: center; justify-content: space-between;
  color: white;
}
.ps-map-loc {
  display: flex; align-items: center; gap: 5px;
  font-size: 11px; font-weight: 700;
}
.ps-map-cta {
  padding: 4px 10px; border-radius: 999px;
  background: rgba(255,255,255,.95); color: #8A5F41;
  font-size: 10px; font-weight: 800;
}

.ps-section-h {
  display: flex; justify-content: space-between; align-items: center;
  margin-top: 2px;
}
.ps-section-h h4 { font-size: 13px; font-weight: 800; margin: 0; color: #3D2A1C; }

.ps-jobs { display: flex; flex-direction: column; gap: 8px; }
.ps-job {
  display: flex; gap: 10px;
  padding: 10px;
  background: #FFFFFF; border-radius: 16px;
  box-shadow: 0 6px 16px rgba(138, 95, 65, 0.10);
}
.ps-job-img {
  width: 56px; height: 56px; border-radius: 13px;
  overflow: hidden; flex-shrink: 0;
}
.ps-job-img img { width: 100%; height: 100%; object-fit: cover; }
.ps-job-body { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 2px; }
.ps-job-top { display: flex; justify-content: space-between; align-items: flex-start; gap: 6px; }
.ps-job-top strong {
  font-size: 12px; font-weight: 700; color: #3D2A1C; line-height: 1.2;
}
.ps-job-body > small { font-size: 10px; color: #9B8164; }
.ps-job-meta {
  display: flex; align-items: center; gap: 4px;
  font-size: 10px; color: #9B8164;
  margin-top: 2px;
}
.ps-job-meta span:nth-of-type(1) { margin-right: 6px; }
.ps-job-bot {
  display: flex; justify-content: space-between; align-items: center;
  margin-top: 2px;
}
.ps-job-bot strong { font-size: 12px; font-weight: 800; }
.ps-pts {
  display: inline-flex; align-items: center; gap: 3px;
  padding: 2px 7px; border-radius: 999px;
  background: #FFFBF2; color: #C9922C;
  font-size: 10px; font-weight: 700;
}
.ps-badge.urg {
  padding: 2px 7px; border-radius: 999px;
  background: #B5532B; color: white;
  font-size: 8.5px; font-weight: 800;
  letter-spacing: .04em;
}

/* Detail */
.ps-detail { display: flex; flex-direction: column; height: 100%; overflow-y: auto; }
.ps-detail::-webkit-scrollbar { display: none; }
.ps-detail-hero {
  position: relative; height: 140px; flex-shrink: 0;
}
.ps-detail-hero img { width: 100%; height: 100%; object-fit: cover; }
.ps-detail-hero-grad {
  position: absolute; inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,.45), transparent 60%);
}
.ps-detail-back {
  position: absolute; top: 12px; left: 14px;
  width: 30px; height: 30px; border-radius: 50%;
  background: rgba(255,255,255,.95); color: #3D2A1C;
  display: grid; place-items: center;
  box-shadow: 0 2px 8px rgba(0,0,0,.2);
}
.ps-detail-urgent {
  position: absolute; top: 14px; right: 14px;
  box-shadow: 0 2px 8px rgba(181, 83, 43, 0.3);
}

.ps-detail-body { padding: 14px 16px 92px; flex: 1; display: flex; flex-direction: column; gap: 10px; }
.ps-detail-meta {
  display: flex; align-items: center; gap: 5px;
  font-size: 10.5px; color: #9B8164;
}
.ps-detail-body h3 {
  font-family: 'Plus Jakarta Sans', 'Inter', sans-serif;
  font-size: 17px; font-weight: 800; margin: 0;
  color: #3D2A1C; line-height: 1.2;
}
.ps-detail-co {
  display: flex; justify-content: space-between; align-items: center;
  font-size: 11.5px; color: #6E4A30;
}
.ps-rating {
  display: inline-flex; align-items: center; gap: 3px;
  font-size: 11px; font-weight: 700; color: #C9922C;
}

.ps-detail-grid {
  display: grid; grid-template-columns: 1fr 1fr; gap: 7px;
  margin-top: 4px;
}
.ps-detail-cell {
  background: #FFFFFF; border: 1.5px solid #E6D5B3;
  border-radius: 14px; padding: 9px 11px;
  display: flex; flex-direction: column; gap: 2px;
}
.ps-detail-cell small { font-size: 10px; color: #9B8164; }
.ps-detail-cell strong { font-size: 14px; font-weight: 800; color: #3D2A1C; }
.ps-detail-cell.gold {
  border-color: #C9922C; background: #FFFBF2;
}
.ps-detail-cell.gold small { color: #C9922C; }
.ps-detail-cell.gold strong { color: #C9922C; }

.ps-tasks {
  list-style: none; padding: 0; margin: 0;
  display: flex; flex-direction: column; gap: 5px;
}
.ps-tasks li {
  display: flex; align-items: center; gap: 7px;
  padding: 7px 10px; border-radius: 10px;
  background: #FFFBF2; font-size: 11.5px; color: #3D2A1C;
}

.ps-cv-note {
  display: flex; gap: 8px; align-items: flex-start;
  padding: 10px 12px; border-radius: 14px;
  background: #FFFBF2; border: 1.5px solid #E6D5B3;
  margin-top: 4px;
}
.ps-cv-note strong { display: block; font-size: 12px; color: #3D2A1C; }
.ps-cv-note small { font-size: 10.5px; color: #6E4A30; }

.ps-detail-cta {
  position: absolute; left: 0; right: 0; bottom: 0;
  padding: 12px 16px 18px;
  background: linear-gradient(to top, #F3E4C9 70%, rgba(243,228,201,0));
}
.ps-primary {
  width: 100%; padding: 12px;
  background: linear-gradient(135deg, #8A5F41, #6E4A30);
  color: white; border: 0; border-radius: 14px;
  font-weight: 700; font-size: 13px; cursor: pointer;
  box-shadow: 0 8px 22px rgba(138,95,65,.35);
}

/* Portofolio */
.ps-page-head {
  display: flex; align-items: center; justify-content: space-between;
  padding: 4px 0 6px;
}
.ps-back-btn {
  width: 26px; height: 26px; border-radius: 50%;
  background: #FFFFFF; border: 1px solid #E6D5B3;
  display: grid; place-items: center; color: #3D2A1C;
}
.ps-page-h { font-size: 14px; font-weight: 800; color: #3D2A1C; }

.ps-profile-card {
  display: flex; gap: 12px; align-items: center;
  background: #FFFFFF; border-radius: 18px;
  padding: 12px;
  box-shadow: 0 8px 22px rgba(138,95,65,.10);
}
.ps-profile-info { display: flex; flex-direction: column; gap: 2px; }
.ps-profile-info strong { font-size: 14px; font-weight: 800; color: #3D2A1C; }
.ps-profile-info small { font-size: 11px; color: #6E4A30; }
.ps-verify {
  display: inline-flex; align-items: center; gap: 4px; width: fit-content;
  padding: 2px 8px; border-radius: 999px;
  background: #ECF4EE; color: #4E7C59;
  font-size: 9.5px; font-weight: 700; margin-top: 3px;
}
.ps-verify.sm { font-size: 8.5px; padding: 1px 6px; }

.ps-profile-stats {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px;
  background: #FFFFFF; border-radius: 16px; padding: 11px 6px;
  box-shadow: 0 4px 12px rgba(138,95,65,.08);
}
.ps-profile-stats > div { text-align: center; display: flex; flex-direction: column; gap: 2px; }
.ps-profile-stats strong {
  font-size: 16px; font-weight: 800;
  display: inline-flex; align-items: center; justify-content: center; gap: 3px;
}
.ps-profile-stats small { font-size: 9.5px; color: #6E4A30; }

.ps-skills { display: flex; flex-wrap: wrap; gap: 5px; }
.ps-skills span {
  padding: 5px 10px; border-radius: 999px;
  background: #FFFBF2; border: 1px solid #E6D5B3;
  font-size: 10px; font-weight: 600; color: #8A5F41;
}

.ps-timeline { display: flex; flex-direction: column; gap: 8px; }
.ps-tl-item { display: flex; gap: 8px; }
.ps-tl-dot {
  width: 9px; height: 9px; border-radius: 50%;
  background: #8A5F41; flex-shrink: 0; margin-top: 8px;
  box-shadow: 0 0 0 3px rgba(138,95,65,.18);
}
.ps-tl-card {
  flex: 1; background: #FFFFFF; border-radius: 14px;
  padding: 9px 11px; display: flex; flex-direction: column; gap: 2px;
  box-shadow: 0 4px 12px rgba(138,95,65,.08);
}
.ps-tl-card strong { font-size: 11.5px; color: #3D2A1C; font-weight: 700; }
.ps-tl-card small { font-size: 10px; color: #6E4A30; }
.ps-tl-foot {
  display: flex; justify-content: space-between; align-items: center;
  margin-top: 3px;
}

/* Dompet */
.ps-page-title {
  font-family: 'Plus Jakarta Sans', 'Inter', sans-serif;
  font-size: 19px; font-weight: 800; margin: 0; color: #3D2A1C;
}
.ps-wallet-card {
  background: linear-gradient(135deg, #8A5F41 0%, #6E4A30 100%);
  border-radius: 20px; padding: 16px;
  color: white; display: flex; flex-direction: column; gap: 4px;
  box-shadow: 0 14px 32px rgba(138,95,65,.32);
}
.ps-wallet-card small { font-size: 11px; opacity: .85; }
.ps-wallet-bal { display: flex; align-items: flex-end; gap: 8px; }
.ps-wallet-bal strong {
  font-family: 'Plus Jakarta Sans', 'Inter', sans-serif;
  font-size: 32px; font-weight: 800; color: white; line-height: 1;
}
.ps-wallet-bal svg { color: rgba(255,255,255,.9); margin-bottom: 4px; }
.ps-wallet-rp { font-size: 11.5px; opacity: .85; }
.ps-wallet-actions { display: flex; gap: 6px; margin-top: 8px; }
.ps-wallet-primary {
  flex: 1; padding: 9px; border: 0; border-radius: 11px;
  background: white; color: #8A5F41;
  font-size: 12px; font-weight: 800; cursor: pointer;
}
.ps-wallet-ghost {
  padding: 9px 14px; border: 0; border-radius: 11px;
  background: rgba(255,255,255,.18); color: white;
  font-size: 12px; font-weight: 700; cursor: pointer;
}

.ps-earn { display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; }
.ps-earn-card {
  background: #FFFFFF; border-radius: 14px;
  padding: 10px 6px; text-align: center;
  display: flex; flex-direction: column; align-items: center; gap: 5px;
  box-shadow: 0 4px 12px rgba(138,95,65,.08);
}
.ps-earn-card small { font-size: 9.5px; color: #6E4A30; line-height: 1.2; }

.ps-history { display: flex; flex-direction: column; gap: 6px; }
.ps-his-item {
  display: flex; align-items: center; gap: 9px;
  padding: 9px 11px; background: #FFFFFF; border-radius: 14px;
  box-shadow: 0 4px 12px rgba(138,95,65,.08);
}
.ps-his-ico {
  width: 30px; height: 30px; border-radius: 50%;
  background: #FFFBF2; color: #C9922C;
  display: grid; place-items: center; flex-shrink: 0;
}
.ps-his-ico.down { background: #FDECE5; color: #B5532B; }
.ps-his-body { flex: 1; min-width: 0; }
.ps-his-body strong { font-size: 11.5px; color: #3D2A1C; display: block; line-height: 1.2; }
.ps-his-body small { font-size: 10px; color: #9B8164; }
.ps-his-item > strong { font-size: 13px; font-weight: 800; }

/* Bottom nav (visual only) */
.ps-tabs {
  position: absolute; left: 0; right: 0; bottom: 0;
  display: grid; grid-template-columns: repeat(5, 1fr);
  background: rgba(255,255,255,.95);
  backdrop-filter: blur(20px);
  border-top: 1px solid #E6D5B3;
  border-radius: 22px 22px 0 0;
  padding: 8px 4px 16px;
  box-shadow: 0 -4px 16px rgba(138,95,65,.08);
  z-index: 4;
}
.ps-tab {
  display: flex; flex-direction: column; align-items: center; gap: 2px;
  color: #9B8164;
}
.ps-tab span { font-size: 9.5px; font-weight: 600; }
.ps-tab.on { color: #8A5F41; }
.ps-tab.on span { font-weight: 700; }

/* Color helpers (used by lucide via className) */
.brown { color: #8A5F41; }
.gold { color: #C9922C; }
.green { color: #4E7C59; }
.red { color: #B5532B; }

/* Home indicator inside the phone */
.home-ind {
  position: absolute; bottom: 6px; left: 50%; transform: translateX(-50%);
  width: 110px; height: 4px; border-radius: 2px;
  background: #D4B896; opacity: .5; z-index: 6;
}


/* ===== Slide 14 additions: hint, homescreen, success, interactivity ===== */
.proto-hint {
  margin-top: 18px;
  padding: 10px 14px;
  border-radius: 12px;
  background: var(--panel);
  border: 1px solid var(--border);
  font-size: 12px;
  color: var(--muted);
  max-width: 480px;
}

/* iPhone home screen */
.phone-screen-ios {
  background:
    radial-gradient(circle at 30% 20%, #c98760 0%, transparent 45%),
    radial-gradient(circle at 70% 80%, #6e4a30 0%, transparent 50%),
    linear-gradient(160deg, #4a2e1c 0%, #2a1810 100%);
}
.ph-status.on-dark { color: #ffffff; }
.ph-status.on-dark .ph-status-r { color: rgba(255,255,255,.92); }

.ps-home {
  height: 100%;
  display: flex; flex-direction: column;
  padding: 16px 18px 12px;
  color: #ffffff;
  position: relative;
}
.ps-home-grid {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 76px;
  gap: 14px 8px;
  align-content: start;
  padding-top: 4px;
}
.ps-app {
  display: flex; flex-direction: column; align-items: center; gap: 5px;
  background: transparent; border: 0; padding: 0;
  color: inherit; cursor: default;
  font-family: inherit;
}
.ps-app-icon {
  width: 48px; height: 48px; border-radius: 12px;
  display: grid; place-items: center; overflow: hidden;
  box-shadow: 0 4px 10px rgba(0,0,0,.25), inset 0 0 0 0.5px rgba(255,255,255,.15);
  position: relative;
}
.ps-app-img { width: 100%; height: 100%; object-fit: cover; }
.ps-app-name {
  font-size: 10px; font-weight: 500;
  color: #ffffff;
  text-shadow: 0 1px 2px rgba(0,0,0,.35);
  letter-spacing: .01em;
  white-space: nowrap;
}
.ps-app-qj { cursor: pointer; }
.ps-app-qj .ps-app-icon {
  box-shadow: 0 6px 16px rgba(232,154,76,.55), 0 0 0 1.5px rgba(255,221,180,.5);
  animation: qjPulse 2.6s ease-in-out infinite;
}
.ps-app-qj:hover .ps-app-icon { transform: scale(1.06); }
.ps-app-qj:active .ps-app-icon { transform: scale(.95); }
@keyframes qjPulse {
  0%, 100% { box-shadow: 0 6px 16px rgba(232,154,76,.55), 0 0 0 1.5px rgba(255,221,180,.5); }
  50% { box-shadow: 0 8px 22px rgba(232,154,76,.85), 0 0 0 2.5px rgba(255,221,180,.7); }
}

.ps-home-bottom {
  display: flex; flex-direction: column; align-items: center; gap: 10px;
  padding-bottom: 18px;
}
.ps-home-dots { display: flex; gap: 5px; }
.ps-home-dots span {
  width: 5px; height: 5px; border-radius: 50%;
  background: rgba(255,255,255,.45);
}
.ps-home-dots span.on { background: #ffffff; }
.ps-home-dock {
  display: flex; gap: 12px;
  padding: 10px 14px;
  border-radius: 22px;
  background: rgba(255,255,255,.18);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 0.5px solid rgba(255,255,255,.18);
}
.ps-dock-item { display: inline-grid; place-items: center; }

/* Interactive hints on phone screens */
.ps-job { cursor: pointer; transition: transform .15s ease; border: 0; text-align: left; font-family: inherit; width: 100%; background: #FFFFFF; }
.ps-job:hover { transform: translateY(-1px); }
.ps-job:active { transform: scale(.99); }

.ps-detail-back, .ps-back-btn { cursor: pointer; border: 0; }
.ps-back-btn { padding: 0; }
.ps-detail-back { padding: 0; }
.ps-primary { cursor: pointer; transition: transform .15s ease; }
.ps-primary:hover { transform: translateY(-1px); }
.ps-primary:active { transform: scale(.98); }

.ps-tabs button { cursor: pointer; border: 0; background: transparent; font-family: inherit; }
.ps-tabs button.is-disabled { cursor: not-allowed; opacity: .55; }

.home-ind { cursor: pointer; border: 0; padding: 0; }
.home-ind:hover { opacity: .55; }

/* Success popup overlay */
.ps-success {
  position: absolute; inset: 0;
  background: rgba(61,42,28,.55);
  display: grid; place-items: center;
  animation: psFade .25s var(--ease);
  z-index: 10;
  border-radius: 0;
}
.ps-success-card {
  background: #FFFFFF; color: #3D2A1C;
  padding: 22px 26px; border-radius: 18px;
  display: flex; flex-direction: column; align-items: center; gap: 6px;
  box-shadow: 0 20px 50px rgba(0,0,0,.4);
  animation: popIn .35s var(--ease);
  text-align: center; max-width: 80%;
}
.ps-success-card svg { color: #4E7C59; }
.ps-success-card strong { font-size: 14px; font-weight: 800; }
.ps-success-card small { font-size: 11.5px; color: #6E4A30; }
.ps-toast {
  position: absolute; top: 60px; left: 50%; transform: translateX(-50%);
  padding: 8px 16px; border-radius: 12px;
  background: #4E7C59; color: white;
  font-size: 12px; font-weight: 600;
  box-shadow: 0 4px 16px rgba(0,0,0,.2);
  z-index: 50; white-space: nowrap;
  animation: psFade .3s var(--ease);
}
.ps-btn {
  width: 100%; padding: 12px 0; border-radius: 16px; border: none; cursor: pointer;
  background: linear-gradient(135deg, #8A5F41, #6E4A30); color: #fff;
  font-weight: 700; font-size: 15px;
  box-shadow: 0 8px 24px rgba(138,95,65,.25);
}
.ps-btn:disabled { opacity: .45; cursor: not-allowed; box-shadow: none; }

/* UMKM flow — rich UI (not flat solid only) */
.umkm-screen { height: 100%; display: flex; flex-direction: column; min-height: 0; background: linear-gradient(180deg, #F3E4C9 0%, #EFE3D2 55%, #F8F0E4 100%); }
.umkm-scroll { overflow-y: auto; padding-bottom: 72px; -webkit-overflow-scrolling: touch; }
.umkm-hero { position: relative; padding: 12px 16px 16px; margin: -8px -16px 12px; overflow: hidden; border-radius: 0 0 20px 20px; }
.umkm-hero-pattern {
  position: absolute; inset: 0;
  background:
    radial-gradient(circle at 20% 30%, rgba(201,146,44,.25), transparent 45%),
    radial-gradient(circle at 80% 70%, rgba(138,95,65,.2), transparent 50%),
    url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 30h60M30 0v60' stroke='%238A5F41' stroke-opacity='.08'/%3E%3C/svg%3E");
  opacity: .9;
}
.umkm-step-dots { display: flex; gap: 6px; position: relative; z-index: 1; margin-bottom: 8px; }
.umkm-step-dots span { width: 8px; height: 8px; border-radius: 50%; background: rgba(138,95,65,.25); }
.umkm-step-dots span.on { background: #8A5F41; }
.umkm-step-dots span.cur { width: 22px; border-radius: 99px; background: linear-gradient(90deg, #8A5F41, #C9922C); }
.umkm-step-label { position: relative; z-index: 1; font-size: 10px; font-weight: 700; color: #6E4A30; text-transform: uppercase; letter-spacing: .06em; }
.umkm-hero-title { position: relative; z-index: 1; font-size: 20px; font-weight: 800; color: #3D2A1C; margin: 6px 0 4px; }
.umkm-hero-sub { position: relative; z-index: 1; font-size: 12px; color: #6E4A30; line-height: 1.45; margin: 0; }
.umkm-form { flex: 1; display: flex; flex-direction: column; gap: 12px; padding: 0 16px; min-height: 0; }
.umkm-field { display: flex; flex-direction: column; gap: 4px; }
.umkm-field-label { font-size: 12px; font-weight: 700; color: #3D2A1C; }
.umkm-field-hint { font-size: 10px; color: #9B8164; }
.umkm-chip-grid, .umkm-chip-row { display: flex; flex-wrap: wrap; gap: 6px; }
.umkm-chip {
  padding: 8px 12px; border-radius: 99px; font-size: 11px; font-weight: 600;
  border: 1.5px solid #E6D5B3; background: #fff; color: #6E4A30;
  display: inline-flex; align-items: center; gap: 4px;
}
.umkm-chip.on { background: #8A5F41; color: #fff; border-color: #8A5F41; }
.umkm-cover-preview {
  position: relative; border-radius: 14px; overflow: hidden; height: 100px;
  border: 1.5px solid #E6D5B3;
}
.umkm-cover-preview img { width: 100%; height: 100%; object-fit: cover; }
.umkm-cover-preview span {
  position: absolute; bottom: 8px; right: 8px; font-size: 10px; font-weight: 600;
  background: rgba(255,255,255,.92); padding: 4px 8px; border-radius: 8px; color: #6E4A30;
  display: flex; align-items: center; gap: 4px;
}
.umkm-footer { padding: 12px 16px 20px; }
.umkm-back {
  display: inline-flex; align-items: center; gap: 4px; margin: 8px 16px 0;
  background: none; border: none; font-size: 13px; font-weight: 600; color: #6E4A30; cursor: pointer;
}
.umkm-review-card {
  margin: 0 16px; border-radius: 16px; overflow: hidden;
  background: #fff; border: 1.5px solid #E6D5B3; box-shadow: 0 8px 24px rgba(138,95,65,.12);
}
.umkm-review-cover { width: 100%; height: 90px; object-fit: cover; }
.umkm-review-body { padding: 12px; }
.umkm-review-row { display: flex; justify-content: space-between; gap: 8px; padding: 6px 0; border-bottom: 1px solid #F3E4C9; font-size: 12px; }
.umkm-review-row span { color: #9B8164; }
.umkm-review-row strong { color: #3D2A1C; text-align: right; max-width: 58%; }
.umkm-legal { font-size: 10px; color: #9B8164; padding: 10px 16px; line-height: 1.4; }
.umkm-dash-header { display: flex; justify-content: space-between; align-items: flex-start; padding: 12px 16px 8px; gap: 10px; }
.umkm-dash-eyebrow { font-size: 10px; font-weight: 800; color: #C9922C; text-transform: uppercase; letter-spacing: .08em; }
.umkm-dash-header h2 { font-size: 18px; font-weight: 800; color: #3D2A1C; margin: 2px 0; }
.umkm-dash-header p { font-size: 11px; color: #6E4A30; display: flex; align-items: center; gap: 4px; margin: 0; }
.umkm-icon-btn { position: relative; width: 36px; height: 36px; border-radius: 12px; background: #fff; border: 1px solid #E6D5B3; display: grid; place-items: center; }
.umkm-badge { position: absolute; top: -4px; right: -4px; width: 16px; height: 16px; border-radius: 50%; background: #B5532B; color: #fff; font-size: 9px; font-weight: 800; display: grid; place-items: center; }
.umkm-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; padding: 0 16px 12px; }
.umkm-stat {
  background: #fff; border-radius: 14px; padding: 10px 8px; text-align: center;
  border: 1px solid #E6D5B3; box-shadow: 0 4px 12px rgba(138,95,65,.08);
}
.umkm-stat svg { color: #8A5F41; margin-bottom: 4px; }
.umkm-stat strong { display: block; font-size: 16px; color: #3D2A1C; }
.umkm-stat small { font-size: 9px; color: #6E4A30; }
.umkm-stat.gold strong { color: #C9922C; }
.umkm-promo {
  margin: 0 16px 12px; padding: 12px; border-radius: 14px;
  background: linear-gradient(135deg, #FFFBF2, #F3E4C9);
  border: 1.5px solid #E6D5B3; display: flex; align-items: center; gap: 10px;
}
.umkm-promo svg { color: #C9922C; flex-shrink: 0; }
.umkm-promo strong { display: block; font-size: 13px; color: #3D2A1C; }
.umkm-promo p { font-size: 10px; color: #6E4A30; margin: 2px 0 0; }
.umkm-promo-btn { margin-left: auto; padding: 6px 12px; border-radius: 99px; background: #8A5F41; color: #fff; font-size: 11px; font-weight: 700; border: none; cursor: pointer; }
.umkm-actions { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; padding: 0 16px 12px; }
.umkm-action {
  padding: 12px; border-radius: 14px; background: #fff; border: 1.5px solid #E6D5B3;
  font-size: 12px; font-weight: 700; color: #3D2A1C; display: flex; align-items: center; justify-content: center; gap: 6px; cursor: pointer;
}
.umkm-action.primary { background: linear-gradient(135deg, #8A5F41, #6E4A30); color: #fff; border-color: transparent; }
.umkm-section-title { font-size: 13px; font-weight: 800; color: #3D2A1C; padding: 0 16px 8px; margin: 0; }
.umkm-job-row {
  display: flex; align-items: center; gap: 10px; margin: 0 16px 8px; padding: 10px;
  background: #fff; border-radius: 14px; border: 1px solid #E6D5B3; text-align: left; cursor: pointer; width: calc(100% - 32px);
}
.umkm-job-row img { width: 52px; height: 52px; border-radius: 10px; object-fit: cover; flex-shrink: 0; }
.umkm-job-row strong { display: block; font-size: 13px; color: #3D2A1C; }
.umkm-job-row span { font-size: 10px; color: #6E4A30; }
.umkm-boost-tag { display: inline-flex; align-items: center; gap: 3px; font-size: 9px; color: #C9922C; font-weight: 700; margin-top: 2px; }
.umkm-page-title { font-size: 20px; font-weight: 800; color: #3D2A1C; margin: 0 16px 4px; }
.umkm-page-sub { font-size: 12px; color: #6E4A30; margin: 0 16px 12px; }
.umkm-upload-card { border-radius: 14px; overflow: hidden; height: 120px; position: relative; border: 1.5px dashed #C9922C; }
.umkm-upload-card img { width: 100%; height: 100%; object-fit: cover; opacity: .85; }
.umkm-upload-card span { position: absolute; inset: 0; display: grid; place-items: center; font-size: 12px; font-weight: 600; color: #3D2A1C; background: rgba(255,251,242,.75); gap: 4px; }
.umkm-applicant {
  display: flex; align-items: center; gap: 10px; margin: 0 16px 10px; padding: 10px;
  background: #fff; border-radius: 14px; border: 1px solid #E6D5B3;
}
.umkm-applicant img { width: 44px; height: 44px; border-radius: 50%; object-fit: cover; }
.umkm-applicant-info { flex: 1; min-width: 0; }
.umkm-applicant-info strong { display: block; font-size: 13px; color: #3D2A1C; }
.umkm-applicant-info span { font-size: 10px; color: #6E4A30; }
.umkm-rating { display: inline-flex; align-items: center; gap: 2px; font-size: 10px; color: #C9922C; }
.umkm-applicant-actions { display: flex; flex-direction: column; gap: 4px; }
.umkm-applicant-actions button { font-size: 10px; font-weight: 700; padding: 4px 8px; border-radius: 8px; border: none; cursor: pointer; }
.umkm-applicant-actions .ok { background: #4E7C59; color: #fff; }
.umkm-applicant-actions .no { background: #F3E4C9; color: #6E4A30; }
.umkm-status-pill { font-size: 10px; font-weight: 700; padding: 4px 8px; border-radius: 8px; text-transform: capitalize; }
.umkm-status-pill.diterima { background: #E8F5E9; color: #2E7D32; }
.umkm-status-pill.ditolak { background: #FFEBEE; color: #C62828; }
.umkm-plan {
  display: flex; justify-content: space-between; align-items: center; margin: 0 16px 8px; padding: 12px;
  background: #fff; border-radius: 14px; border: 1px solid #E6D5B3;
}
.umkm-plan strong { display: block; font-size: 14px; color: #3D2A1C; }
.umkm-plan span { font-size: 11px; color: #6E4A30; }
.umkm-plan-btn { padding: 8px 12px; border-radius: 10px; background: #8A5F41; color: #fff; font-size: 12px; font-weight: 700; border: none; cursor: pointer; }
.umkm-wallet-card {
  margin: 0 16px 12px; padding: 16px; border-radius: 16px;
  background: linear-gradient(135deg, #8A5F41, #6E4A30); color: #fff;
}
.umkm-wallet-card small { font-size: 11px; opacity: .85; }
.umkm-wallet-card strong { display: block; font-size: 26px; margin: 4px 0; }
.umkm-tx { display: flex; justify-content: space-between; padding: 10px 16px; font-size: 12px; border-bottom: 1px solid #E6D5B3; background: #fff; margin: 0 16px; }
.umkm-tx:first-of-type { border-radius: 12px 12px 0 0; }
.umkm-tx:last-of-type { border-radius: 0 0 12px 12px; border-bottom: none; margin-bottom: 16px; }
.umkm-tx .plus { color: #4E7C59; }
.umkm-tx .minus { color: #B5532B; }
.umkm-profile-hero { margin: 0 16px 12px; border-radius: 16px; overflow: hidden; background: #fff; border: 1px solid #E6D5B3; }
.umkm-profile-hero img { width: 100%; height: 80px; object-fit: cover; }
.umkm-profile-hero div { padding: 12px; }
.umkm-menu-row {
  display: block; width: calc(100% - 32px); margin: 0 16px 8px; padding: 14px; text-align: left;
  background: #fff; border-radius: 12px; border: 1px solid #E6D5B3; font-size: 13px; font-weight: 600; color: #3D2A1C; cursor: pointer;
}
.umkm-notif { display: flex; gap: 10px; margin: 0 16px 8px; padding: 12px; background: #fff; border-radius: 12px; border: 1px solid #E6D5B3; }
.umkm-notif p { font-size: 12px; color: #3D2A1C; margin: 0; }
.umkm-tabs { background: rgba(255,255,255,.96); }
.umkm-applicant-done { display: flex; flex-direction: column; align-items: flex-end; gap: 4px; }
.umkm-chat-btn {
  display: inline-flex; align-items: center; gap: 4px; font-size: 10px; font-weight: 700;
  padding: 4px 8px; border-radius: 8px; background: #8A5F41; color: #fff; border: none; cursor: pointer;
}
.umkm-chat-header { padding: 0 16px 8px; }
.umkm-chat-header strong { display: block; font-size: 15px; color: #3D2A1C; }
.umkm-chat-header span { font-size: 11px; color: #6E4A30; }
.umkm-chat-thread { flex: 1; overflow-y: auto; padding: 8px 16px; display: flex; flex-direction: column; gap: 8px; min-height: 0; }
.umkm-chat-bubble { max-width: 85%; padding: 10px 12px; border-radius: 14px; font-size: 12px; line-height: 1.4; }
.umkm-chat-bubble.them { align-self: flex-start; background: #fff; border: 1px solid #E6D5B3; color: #3D2A1C; }
.umkm-chat-bubble.me { align-self: flex-end; background: linear-gradient(135deg, #8A5F41, #6E4A30); color: #fff; }
.umkm-chat-compose { display: flex; gap: 8px; padding: 10px 16px 16px; border-top: 1px solid #E6D5B3; background: #FFFBF2; }
.umkm-chat-send {
  width: 44px; height: 44px; border-radius: 12px; border: none; background: #8A5F41; color: #fff;
  display: grid; place-items: center; cursor: pointer; flex-shrink: 0;
}

@keyframes popIn {
  from { opacity: 0; transform: scale(.85); }
  to { opacity: 1; transform: scale(1); }
}

/* closing */
.closing-stage { display: grid; place-items: center; height: 100%; }
.big-mark {
  position: relative;
  width: 180px; height: 180px; border-radius: 50px;
  background: linear-gradient(135deg, var(--accent), var(--accent-2));
  display: grid; place-items: center; color: white;
  font-family: 'Georgia', serif; font-weight: 900; font-size: 64px;
  box-shadow: 0 30px 80px var(--accent-glow);
  overflow: visible;
}
.big-mark img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; border-radius: 50px; }
.big-mark span { position: relative; z-index: 1; }
.ring { position: absolute; border: 2px solid var(--accent); border-radius: 50%; opacity: 0; animation: ringPulse 3s var(--ease) infinite; }
.ring.r1 { inset: -20px; }
.ring.r2 { inset: -50px; animation-delay: 1s; }
.ring.r3 { inset: -80px; animation-delay: 2s; }
@keyframes ringPulse { 0% { opacity: .6; transform: scale(.9); } 100% { opacity: 0; transform: scale(1.15); } }

.quote { margin-top: 18px; font-style: italic; color: var(--muted); font-size: 19px; }
`;
