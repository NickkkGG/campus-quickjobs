import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";

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
            <img src="/quickjob-logo.png" alt="" onError={(e) => ((e.target as HTMLImageElement).style.display = "none")} />
            <span>QJ</span>
          </div>
          <div className="qj-brand-text">
            <strong>QuickJob Campus</strong>
            <small>Pitch Deck · 2026</small>
          </div>
        </div>
        <div className="qj-counter">
          <span className="qj-num">{String(i + 1).padStart(2, "0")}</span>
          <span className="qj-sep">/</span>
          <span className="qj-tot">{String(SLIDES.length).padStart(2, "0")}</span>
          <span className="qj-label">· {SLIDES[i].label}</span>
        </div>
        <div className="qj-controls">
          <button onClick={() => go(i - 1)} aria-label="Previous">←</button>
          <button onClick={() => go(i + 1)} aria-label="Next">→</button>
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
        <div className="qj-bar"><div className="qj-bar-fill" style={{ width: `${((i + 1) / SLIDES.length) * 100}%` }} /></div>
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
  return <span className="qj-codechip"><i /> {children}</span>;
}

/* ---------------- Slides ---------------- */

function SlideTitle() {
  return (
    <div className="grid-2 hero">
      <div>
        <Kicker>Slide 1 · Title & Hook</Kicker>
        <div className="hero-mark">
          <div className="hero-logo">
            <img src="/quickjob-logo.png" alt="" onError={(e) => ((e.target as HTMLImageElement).style.display = "none")} />
            <span>QJ</span>
          </div>
          <Chip>Kerja Sampingan, Mudah &amp; Dekat</Chip>
        </div>
        <h1 className="hero-title">
          QuickJob<br /><span className="grad">Campus.</span>
        </h1>
        <p className="hero-tag">Micro-job dekat kampus, tanpa CV.</p>
        <Lead>
          Platform berbasis lokasi yang mempertemukan mahasiswa Yogyakarta dengan UMKM sekitar kampus untuk
          kerja cepat, portofolio otomatis, dan poin yang bisa menjadi uang.
        </Lead>
        <div className="founders">
          <Chip>Reynard</Chip>
          <Chip>Nick</Chip>
          <Chip>Raymondo</Chip>
        </div>
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
      <div className="mp-screen">
        <div className="mp-status"><span>9:41</span><span>5G</span></div>
        {variant === "left" && (
          <>
            <div className="mp-search" />
            <div className="mp-map">
              <span className="mp-pin" style={{ left: "30%", top: "30%" }} />
              <span className="mp-pin" style={{ right: "20%", top: "55%" }} />
            </div>
            <div className="mp-card"><i /><i className="sm" /><i className="ac" /></div>
          </>
        )}
        {variant === "center" && (
          <>
            <div className="mp-card"><i /><i /><i className="sm" /></div>
            <div className="mp-card"><i /><i /><i className="ac" /></div>
            <div className="mp-card hi"><i /><i /><i className="ac" /></div>
          </>
        )}
        {variant === "right" && (
          <>
            <div className="mp-wallet"><span>Poin siap cair</span><strong>Rp128.000</strong></div>
            <div className="mp-timeline"><i /><i /><i /><i /></div>
          </>
        )}
      </div>
    </div>
  );
}

function SlideTeam() {
  const members = [
    { name: "Reynard", role: "Founder · Product & Market", chip: "campus demand" },
    { name: "Nick", role: "Founder · Prototype & UX", chip: "mobile flow" },
    { name: "Raymondo", role: "Founder · Business & Growth", chip: "UMKM supply" },
  ];
  return (
    <div className="grid-2">
      <div>
        <Kicker>Slide 2 · Team</Kicker>
        <Title>Tim kecil yang membangun jembatan kerja cepat di sekitar kampus.</Title>
        <Lead>
          Halaman ini disiapkan untuk tiga foto anggota kelompok. Nanti kirim fotonya, lalu saya pasang
          langsung ke masing-masing frame tanpa mengubah layout.
        </Lead>
        <Panel>
          <p className="muted">
            Narasi singkat: QuickJob Campus dikerjakan oleh tim yang memahami dua sisi pasar — mahasiswa
            yang butuh pengalaman dan UMKM yang butuh tenaga cepat.
          </p>
        </Panel>
      </div>
      <div className="team-grid">
        {members.map((m, idx) => (
          <article key={m.name} className="member-card" style={{ animationDelay: `${idx * 90}ms` }}>
            <div className="photo-frame">FOTO 0{idx + 1}</div>
            <h3>{m.name}</h3>
            <p className="member-role">{m.role}</p>
            <Chip>{m.chip}</Chip>
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
        <Title>Kesenjangan antara kebutuhan finansial mahasiswa Yogyakarta &amp; operasional UMKM lokal.</Title>
        <Lead>
          Dengan lebih dari 350.000 mahasiswa aktif di DIY, terdapat potensi angkatan kerja yang sangat
          besar namun belum teroptimalisasi dengan baik.
        </Lead>
      </div>
      <div className="stack">
        <Panel>
          <h3 className="panel-h accent">Bagi Mahasiswa</h3>
          <ul className="bullets">
            <li>Kesulitan mencari kerja sampingan yang cocok dengan jadwal kuliah yang dinamis.</li>
            <li>Hambatan administratif yang tinggi (proses rekrutmen formal, CV, surat lamaran).</li>
            <li>Sulitnya membangun portofolio awal untuk melamar kerja setelah lulus kuliah.</li>
          </ul>
        </Panel>
        <Panel>
          <h3 className="panel-h">Bagi UMKM (Kafe, Event, Toko)</h3>
          <ul className="bullets">
            <li>Sering mengalami lonjakan pesanan mendadak atau kekurangan staf (staf utama absen).</li>
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
    { t: "Kerja Tanpa CV", d: "Mahasiswa mendaftar cepat dengan data dasar, preferensi waktu, dan area kampus. Kredibilitas dibangun setelah tugas diselesaikan." },
    { t: "Matching Real-Time", d: "Lowongan pekerjaan ditampilkan berdasarkan jarak radius dekat kampus, urgensi tugas, dan kecocokan jadwal kosong mahasiswa." },
    { t: "Auto Portfolio Builder", d: "Setiap pekerjaan yang selesai secara otomatis terekam menjadi riwayat pengalaman terverifikasi untuk peluang berikutnya." },
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
          Naskah pitch: “QuickJob Campus bukan job portal biasa. Ini adalah lapisan kerja instan di sekitar
          kampus: mahasiswa mendapat pengalaman nyata, UMKM mendapat bantuan cepat, dan rekam jejak tumbuh
          otomatis dari pekerjaan yang sudah diselesaikan.”
        </Lead>
      </Panel>
    </div>
  );
}

function SlideCompetitive() {
  const items = [
    { t: "Matching Super Cepat", d: "Menghubungkan UMKM yang membutuhkan bantuan mendesak dengan mahasiswa terdekat dalam hitungan menit, bukan hari." },
    { t: "Sistem Gamifikasi & Kepercayaan", d: "Pemberian insentif koin yang dapat ditukar uang dan rating dua arah terverifikasi menjamin kualitas kinerja kedua belah pihak." },
    { t: "Hyperlocal Focus", d: "Fokus eksklusif pada radius operasional 0–5 km di sekitar kawasan kampus padat mahasiswa di Yogyakarta." },
  ];
  return (
    <div className="grid-2">
      <div>
        <Kicker>Slide 5 · Keunggulan Kompetitif</Kicker>
        <Title>Mengapa QuickJob Campus Berbeda &amp; Unggul?</Title>
        <Lead>
          Kami mengeliminasi hambatan masuk bagi mahasiswa dan UMKM dengan menciptakan platform mikro-lokal
          yang super-efisien.
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
          Angka berikut diposisikan sebagai target TAM/SAM/SOM berdasarkan riset primer mahasiswa aktif dan
          densitas UMKM sekitar kampus.
        </Lead>
        <div style={{ marginTop: 18 }}><CodeChip>market.scan Yogyakarta</CodeChip></div>
      </div>
      <Panel className="market-stack">
        {[
          { k: "TAM Nasional", w: "92%", d: "8,3 Juta Mahasiswa aktif Indonesia + jutaan UMKM di kota-kota pendidikan." },
          { k: "SAM DIY", w: "58%", d: "350.000+ Mahasiswa aktif di Yogyakarta (DIY) sebagai pasar layanan awal." },
          { k: "SOM 12 Bulan", w: "22%", d: "Fokus 10.000 mahasiswa aktif di kampus prioritas (UGM, UNY, UMY) & 500 UMKM mitra." },
        ].map((b) => (
          <div className="bar-row" key={b.k}>
            <strong>{b.k}</strong>
            <div className="bar-track"><div className="bar-fill" style={{ width: b.w }} /></div>
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
        <Lead>QuickJob Campus dirancang khusus dengan UI/UX modern untuk perangkat seluler demi kecepatan akses:</Lead>
        <ul className="bullets bullets-icon">
          <li><b>Mini-Map Live:</b> Mahasiswa dapat mendeteksi lowongan langsung lewat peta interaktif di sekitar kampus mereka.</li>
          <li><b>Profile Auto-Portofolio:</b> Pengalaman ter-update secara otomatis setelah pekerjaan diselesaikan, menggantikan CV konvensional.</li>
          <li><b>Dompet Poin Terintegrasi:</b> Mahasiswa mengumpulkan koin bonus yang dapat dicairkan langsung ke E-Wallet (Gopay/OVO/Dana).</li>
        </ul>
      </div>
      <div className="phones-single">
        <div className="big-phone">
          <div className="bp-screen">
            <div className="mp-status"><span>9:41</span><span>5G</span></div>
            <div className="bp-header">Kerja dekat kampus</div>
            <div className="bp-search">🔎 Cari kasir, barista, admin</div>
            <div className="bp-map"><span /><span /><span /></div>
            <div className="bp-job"><strong>Runner Event Kampus</strong><small>Rp85k · 1.2 km</small></div>
            <div className="bp-job"><strong>Barista Shift Sore</strong><small>Rp95k · 3.1 km</small></div>
          </div>
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
          <p className="muted">5% komisi dari nilai pekerjaan yang diselesaikan (Estimasi Rp2.500 – Rp7.500 per job).</p>
          <Chip>5% Fee</Chip>
        </div>
        <div className="lane">
          <strong>Subscription Boost</strong>
          <p className="muted">UMKM membayar untuk visibilitas lowongan di area kampus (Rp35.000/minggu atau Rp75.000/bulan).</p>
          <Chip>Boost Plan</Chip>
        </div>
        <div className="lane">
          <strong>Freemium Boost</strong>
          <p className="muted">Opsi boost instan sekali tayang seharga Rp1.000 per lowongan bagi UMKM mikro budget terbatas.</p>
          <Chip>Rp1.000 / post</Chip>
        </div>
      </Panel>
    </div>
  );
}

function SlideMarketing() {
  const steps = [
    { n: "01 Awareness", t: "Menjangkau Target", b: ["Konten TikTok & IG harian", "Targeted Meta & TikTok Ads", "Booth & banner di kampus"] },
    { n: "02 Interest", t: "Menarik Minat", b: ["Landing page interaktif", "Konten YouTube edukatif", "Testimoni mahasiswa"] },
    { n: "03 Consideration", t: "Mempertimbangkan", b: ["Kemudahan Tanpa CV", "Rating tepercaya", "Kejelasan portofolio"] },
    { n: "04 Conversion", t: "Mulai Transaksi", b: ["Daftar cepat gratis", "Match otomatis jarak", "Boost gratis 1 bln UMKM"] },
    { n: "05 Retention", t: "Terus Menggunakan", b: ["Sistem Poin → Uang", "Notifikasi lowongan baru", "Rekomendasi personal"] },
    { n: "06 Advocacy", t: "Merekomendasikan", b: ["Program referral viral", "Komunitas WhatsApp aktif", "Share portofolio"] },
  ];
  return (
    <div className="col">
      <div>
        <Kicker>Slide 9 · Rencana Pemasaran (Customer Journey)</Kicker>
        <Title>Customer Journey &amp; Strategi Distribusi Pemasaran</Title>
      </div>
      <div className="journey">
        {steps.map((s, idx) => (
          <div className="journey-step" key={s.n} style={{ animationDelay: `${idx * 70}ms` }}>
            <span className="j-num">{s.n}</span>
            <h4>{s.t}</h4>
            <ul>{s.b.map((x) => <li key={x}>{x}</li>)}</ul>
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
        <Title>QuickJob Campus menempati ceruk pasar mikro-job lokal mahasiswa yang belum tersentuh.</Title>
        <Lead>
          Platform lain fokus pada karir formal jangka panjang atau jasa freelance online profesional. Kami
          fokus eksklusif pada mahasiswa dan UMKM terdekat.
        </Lead>
        <Panel>
          <p className="muted"><b>Moat kami:</b> Kecepatan rekrutmen, peniadaan CV, verifikasi berbasis lokasi dekat kampus, dan gamifikasi sistem poin.</p>
        </Panel>
      </div>
      <div className="matrix">
        <span className="axis ay-top">Fokus Lokasi &amp; Mahasiswa (Tinggi)</span>
        <span className="axis ay-bot">Fokus Lokasi (Rendah)</span>
        <span className="axis ax-right">Fleksibilitas (Tinggi)</span>
        <span className="axis ax-left">Fleksibilitas (Rendah)</span>
        <div className="dot us" style={{ left: "78%", top: "22%" }}><span /><strong>QuickJob Campus</strong></div>
        <div className="dot" style={{ left: "75%", top: "75%" }}><span /><strong>LinkedIn / Upwork</strong></div>
        <div className="dot" style={{ left: "25%", top: "80%" }}><span /><strong>Glints / Kalibrr</strong></div>
        <div className="dot" style={{ left: "30%", top: "35%" }}><span /><strong>Portal Lowongan Kampus</strong></div>
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
                <div className="alloc-row"><span>{a.l}</span><span>{a.p}%</span></div>
                <div className="alloc-bar"><div style={{ width: `${a.p}%` }} /></div>
              </div>
            ))}
          </div>
        </Panel>
        <div className="card">
          <span className="card-num">★</span>
          <h3>Rencana Alokasi</h3>
          <p>Dana dialokasikan secara efisien demi mencapai Break-Even Point (BEP) dalam 6–12 bulan pertama dengan operasional yang lean.</p>
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
    { k: "Referral", v: "30% akuisisi pengguna baru didapatkan dari program referral berhadiah koin." },
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
          Naskah pitch: “Loop pertumbuhan kami didasarkan pada retensi: semakin banyak mahasiswa
          menyelesaikan pekerjaan, semakin kuat portofolio otomatis mereka; semakin cepat UMKM mendapat
          staf, semakin sering mereka kembali memposting lowongan.”
        </Lead>
      </Panel>
    </div>
  );
}

function SlideMilestones() {
  const ms = [
    { h: "Bulan 0–6", d: "Membangun MVP, validasi onboarding tanpa CV, menjaring 500 mahasiswa & 50 cafe pilot di Yogyakarta." },
    { h: "Tahun 1", d: "Dominasi pasar Yogyakarta, aktivasi 5 kampus besar, BEP tercapai, integrasi sistem pembayaran otomatis." },
    { h: "Tahun 2", d: "Ekspansi regional ke kota kampus tetangga (Surakarta, Semarang, Bandung), integrasi korporasi promotor event." },
    { h: "Tahun 3", d: "Ekspansi nasional (Jakarta, Surabaya, Malang), peluncuran platform lowongan terintegrasi premium." },
  ];
  return (
    <div className="col">
      <div>
        <Kicker>Slide 13 · Milestone Perencanaan 3 Tahun</Kicker>
        <Title>Milestone pengembangan bisnis dari Yogyakarta ke tingkat nasional.</Title>
        <Lead>Membangun pondasi lokal yang kokoh sebelum mereplikasi model bisnis ke kota-kota kampus padat di Indonesia.</Lead>
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

type Screen = "splash" | "login" | "role" | "onboarding" | "dashboard" | "detail" | "portfolio" | "wallet";

function SlidePrototype() {
  const [screen, setScreen] = useState<Screen>("splash");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (screen !== "splash") return;
    const t = setTimeout(() => setScreen("login"), 1600);
    return () => clearTimeout(t);
  }, [screen]);

  const apply = () => {
    setSuccess(true);
    setTimeout(() => setScreen("portfolio"), 1100);
    setTimeout(() => setSuccess(false), 1700);
  };

  const tabs: { id: Screen; label: string }[] = [
    { id: "splash", label: "Splash" },
    { id: "login", label: "Login" },
    { id: "role", label: "Role" },
    { id: "onboarding", label: "Setup" },
    { id: "dashboard", label: "Home" },
    { id: "detail", label: "Detail" },
    { id: "portfolio", label: "Portfolio" },
    { id: "wallet", label: "Wallet" },
  ];

  return (
    <div className="proto-layout">
      <div>
        <Kicker>Prototype lengkap · iOS app</Kicker>
        <Title>Flow dari pertama install sampai mahasiswa apply kerja dan mencairkan poin.</Title>
        <Lead>
          Page ini sekarang mensimulasikan aplikasi QuickJob Campus yang lengkap: splash pembuka,
          login/daftar, pilih peran mahasiswa, onboarding preferensi, dashboard lokasi, detail lowongan,
          apply tanpa CV, portofolio otomatis, dan dompet poin.
        </Lead>
        <div className="seg">
          {tabs.map((t) => (
            <button key={t.id} className={screen === t.id ? "on" : ""} onClick={() => setScreen(t.id)}>{t.label}</button>
          ))}
        </div>
        <div className="flow-list">
          {[
            ["01", "Pertama install", "Brand muncul singkat, tagline jelas, lalu otomatis masuk ke login."],
            ["02", "Masuk tanpa CV", "Login nomor HP kampus, pilih role mahasiswa, lalu set minat dan radius."],
            ["03", "Matching lokasi", "Dashboard menampilkan peta mini, filter shift, dan job terdekat di Yogyakarta."],
            ["04", "Apply → Portfolio → Wallet", "Apply Tanpa CV memicu sukses state, proyek masuk portofolio, poin bisa dicairkan."],
          ].map(([n, t, d]) => (
            <div className="flow-step" key={n}><span>{n}</span><div><strong>{t}</strong><small>{d}</small></div></div>
          ))}
        </div>
      </div>

      <div className="qj-phone">
        <div className="phone-frame">
          <div className="notch" />
          <div className="phone-screen">
            <div className="ph-status"><span>9:41</span><span>5G · 82%</span></div>
            <div className="ph-content">
              {screen === "splash" && (
                <div className="ph-splash">
                  <div className="ph-logo"><span>QJ</span></div>
                  <h3>QuickJob Campus</h3>
                  <p>Kerja Sampingan, Mudah &amp; Dekat</p>
                  <div className="ph-badge">Mencari job sekitar kampus...</div>
                </div>
              )}
              {screen === "login" && (
                <div className="ph-pad">
                  <div className="ph-logo sm"><span>QJ</span></div>
                  <h3>Masuk ke QuickJob.</h3>
                  <p>Gunakan nomor HP aktif untuk mencari kerja sampingan sekitar kampus tanpa upload CV.</p>
                  <div className="ph-field"><label>Nomor HP</label><input defaultValue="0812 3456 7890" /></div>
                  <div className="ph-field"><label>Kampus</label><input defaultValue="Universitas di Yogyakarta" /></div>
                  <button className="ph-primary" onClick={() => setScreen("role")}>Lanjutkan</button>
                  <button className="ph-secondary" onClick={() => setScreen("role")}>Daftar sebagai Mahasiswa</button>
                </div>
              )}
              {screen === "role" && (
                <div className="ph-pad">
                  <h3>Pilih kebutuhanmu.</h3>
                  <p>QuickJob punya jalur mahasiswa pencari kerja dan UMKM pemasang lowongan.</p>
                  <div className="ph-roles">
                    <button className="ph-role on" onClick={() => setScreen("onboarding")}>
                      <span>M</span><strong>Mahasiswa</strong><small>Cari micro-job dekat kampus.</small>
                    </button>
                    <button className="ph-role">
                      <span>U</span><strong>UMKM</strong><small>Posting lowongan cepat.</small>
                    </button>
                  </div>
                  <pre className="ph-code">{`profile.mode = "student";
cv_required = false;
portfolio.autoBuild = true;`}</pre>
                  <button className="ph-primary" onClick={() => setScreen("onboarding")}>Mulai Setup Mahasiswa</button>
                </div>
              )}
              {screen === "onboarding" && (
                <div className="ph-pad">
                  <div className="cv-card">
                    <strong>Kerja Tanpa CV</strong>
                    <div className="cv-line" /><div className="cv-line" /><div className="cv-line short" />
                    <div className="cv-slash">Auto Portfolio</div>
                  </div>
                  <h3>Atur preferensi kerja.</h3>
                  <p>Pilih minat, radius, dan waktu kosong agar matching job lebih relevan.</p>
                  <div className="ph-pills">
                    <button className="on">Event</button>
                    <button className="on">Barista</button>
                    <button>Admin toko</button>
                    <button className="on">≤ 3 km</button>
                  </div>
                  <button className="ph-primary" onClick={() => setScreen("dashboard")}>Cari Job Terdekat</button>
                </div>
              )}
              {screen === "dashboard" && (
                <div className="ph-pad scroll">
                  <div className="ph-head"><div><small>Halo, Nick</small><h3>Kerja dekat kampus</h3></div><div className="av">N</div></div>
                  <div className="metric-strip">
                    <div><strong>8</strong><small>job cocok</small></div>
                    <div><strong>1.2km</strong><small>terdekat</small></div>
                    <div><strong>2.450</strong><small>poin</small></div>
                  </div>
                  <div className="ph-search">🔎 Cari kasir event, barista, admin toko</div>
                  <div className="ph-filter">
                    <span className="on">Hari ini</span><span>≤ 3 km</span><span>Shift sore</span><span>Tanpa CV</span>
                  </div>
                  <div className="ph-map"><span className="pin a" /><span className="pin b" /><span className="pin c" /></div>
                  <button className="job" onClick={() => setScreen("detail")}>
                    <div className="job-t"><h4>Runner Event Kampus</h4><Chip>1.2 km</Chip></div>
                    <div className="job-m"><span>Rp85k</span><span>3 jam</span><span>16.00</span><span>+120 pts</span></div>
                  </button>
                  <button className="job">
                    <div className="job-t"><h4>Admin Packing UMKM</h4><Chip>2.4 km</Chip></div>
                    <div className="job-m"><span>Rp70k</span><span>4 jam</span><span>Besok</span><span>+100 pts</span></div>
                  </button>
                  <button className="job">
                    <div className="job-t"><h4>Barista Shift Sore</h4><Chip>3.1 km</Chip></div>
                    <div className="job-m"><span>Rp95k</span><span>5 jam</span><span>Weekend</span><span>+160 pts</span></div>
                  </button>
                </div>
              )}
              {screen === "detail" && (
                <div className="ph-pad scroll">
                  <button className="ph-back" onClick={() => setScreen("dashboard")}>← Kembali</button>
                  <div className="detail">
                    <div className="d-co"><span className="d-mark">EV</span><div><Chip>1.2 km · Hari ini</Chip><h3>Runner Event Kampus</h3></div></div>
                    <p>Bantu registrasi peserta, arahkan tamu, dan rapikan booth setelah acara selesai.</p>
                    <div className="tasks">
                      <div>Durasi 3 jam, mulai 16.00.</div>
                      <div>Bayaran Rp85.000 + 120 poin.</div>
                      <div>Tidak perlu CV; profil singkat dikirim otomatis.</div>
                      <div>Lokasi: area kampus Yogyakarta.</div>
                    </div>
                    <button className="ph-primary" onClick={apply}>Apply Tanpa CV</button>
                  </div>
                  {success && (
                    <div className="success-pop">
                      <strong>Apply terkirim.</strong>
                      <span>UMKM menerima profil singkat dan slot waktu kamu.</span>
                    </div>
                  )}
                </div>
              )}
              {screen === "portfolio" && (
                <div className="ph-pad scroll">
                  <div className="ph-head"><div><small>Auto Portfolio</small><h3>Profil kerja kamu</h3></div><div className="av">N</div></div>
                  <div className="metric-strip">
                    <div><strong>12</strong><small>project selesai</small></div>
                    <div><strong>4.8</strong><small>rating UMKM</small></div>
                  </div>
                  <div className="tl">
                    {["Runner Event Kampus", "Admin Packing UMKM", "Barista Shift Sore"].map((t) => (
                      <div className="tl-item" key={t}><span className="tl-dot" /><div className="tl-card"><strong>{t}</strong><p>Terverifikasi · QuickJob</p></div></div>
                    ))}
                  </div>
                </div>
              )}
              {screen === "wallet" && (
                <div className="ph-pad scroll">
                  <div className="ph-head"><div><small>Dompet Poin</small><h3>Poin menjadi uang</h3></div><div className="av">Rp</div></div>
                  <div className="wallet-card">
                    <span>Saldo poin bisa dicairkan</span>
                    <strong>2.450 pts</strong>
                    <p>Estimasi Rp245.000</p>
                  </div>
                  <div className="cashout"><div><strong>Cairkan ke e-wallet</strong><small>Minimal 1.000 poin</small></div><button className="ph-primary sm">Cairkan</button></div>
                  <div className="tl">
                    <div className="tl-card"><strong>+120 poin</strong><p>Apply Runner Event berhasil diverifikasi</p></div>
                    <div className="tl-card"><strong>+300 poin</strong><p>Bonus 3 project selesai bulan ini</p></div>
                  </div>
                </div>
              )}
            </div>
            {screen !== "splash" && screen !== "login" && screen !== "role" && screen !== "onboarding" && (
              <div className="ph-tabs">
                <button className={screen === "dashboard" ? "on" : ""} onClick={() => setScreen("dashboard")}>Home</button>
                <button className={screen === "portfolio" ? "on" : ""} onClick={() => setScreen("portfolio")}>Portfolio</button>
                <button className={screen === "wallet" ? "on" : ""} onClick={() => setScreen("wallet")}>Wallet</button>
              </div>
            )}
            <div className="home-ind" />
          </div>
        </div>
      </div>
    </div>
  );
}

function SlideClosing() {
  return (
    <div className="grid-2 hero">
      <div>
        <Kicker>Slide 15 · Penutup</Kicker>
        <div className="hero-mark">
          <div className="hero-logo"><img src="/quickjob-logo.png" alt="" onError={(e) => ((e.target as HTMLImageElement).style.display = "none")} /><span>QJ</span></div>
          <Chip>Kerja Sampingan, Mudah &amp; Dekat</Chip>
        </div>
        <h1 className="hero-title">Mari <span className="grad">Berkoneksi</span> &amp; Berkolaborasi</h1>
        <p className="hero-tag">Membangun ekosistem kerja instan mahasiswa terbesar di Indonesia.</p>
        <Panel>
          <h3 className="panel-h accent">Hubungi Kami</h3>
          <p className="mono-sm">
            Email: <b>quickjobcampus@gmail.com</b><br />
            Lokasi: Yogyakarta, Indonesia
          </p>
        </Panel>
        <p className="quote">“Terima Kasih atas Waktu &amp; Kesempatan Anda.”</p>
      </div>
      <div className="closing-stage">
        <div className="big-mark">
          <img src="/quickjob-logo.png" alt="" onError={(e) => ((e.target as HTMLImageElement).style.display = "none")} />
          <span>QJ</span>
          <div className="ring r1" /><div className="ring r2" /><div className="ring r3" />
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
  padding: 28px clamp(24px, 4vw, 56px);
  opacity: 0;
  transform: translate3d(40px, 0, 0) scale(.98);
  transition: opacity .55s var(--ease), transform .65s var(--ease);
  pointer-events: none;
  overflow: hidden;
}
.qj-slide-past { transform: translate3d(-40px, 0, 0) scale(.98); }
.qj-slide-active { opacity: 1; transform: translate3d(0,0,0) scale(1); pointer-events: auto; }
.qj-slide-inner {
  height: 100%; max-width: 1240px; margin: 0 auto;
  display: flex; flex-direction: column;
}

/* layouts */
.grid-2 { display: grid; grid-template-columns: 1.05fr 1fr; gap: clamp(24px, 3vw, 48px); align-items: center; height: 100%; }
.grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
.col { display: flex; flex-direction: column; gap: 18px; height: 100%; }
.stack { display: flex; flex-direction: column; gap: 12px; }

/* typography */
.qj-kicker {
  display: inline-block;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 11px; letter-spacing: .14em; text-transform: uppercase;
  color: var(--accent); padding: 6px 12px;
  border: 1px solid var(--border-strong); border-radius: 999px;
  background: var(--panel);
  margin-bottom: 14px;
}
.qj-title {
  font-family: 'Georgia', 'Iowan Old Style', serif;
  font-size: clamp(28px, 3.4vw, 44px);
  line-height: 1.08; letter-spacing: -.02em;
  margin: 0; color: var(--cream-soft);
}
.qj-lead {
  margin-top: 14px;
  font-size: clamp(13px, 1.05vw, 15.5px);
  line-height: 1.55; color: var(--muted);
  max-width: 560px;
}
.muted { color: var(--muted); font-size: 13px; line-height: 1.5; }
.mono { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 12px; line-height: 1.65; color: var(--cream); white-space: pre-wrap; margin: 0; }
.mono-sm { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 12.5px; color: var(--cream); line-height: 1.6; }

.qj-chip {
  display: inline-flex; align-items: center;
  padding: 4px 10px; border-radius: 999px;
  background: var(--panel-2);
  border: 1px solid var(--border);
  font-size: 11px; color: var(--cream); font-weight: 500;
}
.qj-codechip {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 5px 12px; border-radius: 999px;
  background: rgba(232,154,76,.10); border: 1px solid rgba(232,154,76,.35);
  color: var(--accent);
  font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 11px;
  align-self: flex-start;
}
.qj-codechip i { width: 6px; height: 6px; border-radius: 50%; background: var(--accent); box-shadow: 0 0 8px var(--accent); animation: pulse 1.6s ease-in-out infinite; }
@keyframes pulse { 50% { opacity: .35; transform: scale(1.4); } }

/* panel & card */
.qj-panel {
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 16px 18px;
  backdrop-filter: blur(12px);
  margin-top: 14px;
}
.panel-h { font-size: 13px; font-weight: 700; margin: 0 0 6px; letter-spacing: -.01em; color: var(--cream-soft); }
.panel-h.accent { color: var(--accent); }
.bullets { padding-left: 18px; margin: 0; display: grid; gap: 6px; color: var(--muted); font-size: 13px; line-height: 1.5; }
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
  font-size: 12px; color: var(--accent); letter-spacing: .1em;
}
.card h3 { font-family: 'Georgia', serif; font-size: 18px; margin: 0; color: var(--cream-soft); }
.card p { font-size: 13px; line-height: 1.5; color: var(--muted); margin: 0; }
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
.hero-tag { font-size: 18px; color: var(--accent); margin: 0 0 12px; font-style: italic; }
.founders { display: flex; gap: 8px; margin-top: 18px; flex-wrap: wrap; }

/* mini phones */
.phones { display: flex; gap: -10px; align-items: center; justify-content: center; perspective: 900px; }
.mini-phone {
  width: 150px; height: 300px; border-radius: 28px;
  background: linear-gradient(180deg, #1a0e06, #2a1a10);
  padding: 10px;
  border: 2px solid rgba(243,228,201,.18);
  box-shadow: 0 30px 50px rgba(0,0,0,.55), inset 0 0 0 1px rgba(255,255,255,.04);
  flex-shrink: 0;
}
.mp-left { transform: translateX(20px) rotate(-8deg); }
.mp-center { z-index: 2; transform: translateY(-10px); }
.mp-right { transform: translateX(-20px) rotate(8deg); }
.mp-screen {
  width: 100%; height: 100%; border-radius: 18px;
  background: var(--cream-soft); color: var(--espresso);
  padding: 12px 10px; display: flex; flex-direction: column; gap: 8px; overflow: hidden;
}
.mp-status { display: flex; justify-content: space-between; font-size: 9px; color: var(--coffee); font-weight: 700; }
.mp-search { height: 22px; border-radius: 8px; background: #efe0c2; }
.mp-map { flex: 1; border-radius: 12px; background: linear-gradient(135deg, #efe0c2, #d8be96); position: relative; min-height: 80px; }
.mp-pin { position: absolute; width: 8px; height: 8px; border-radius: 50%; background: var(--accent-2); box-shadow: 0 0 0 6px rgba(201,98,44,.25); animation: pulse 1.6s infinite; }
.mp-card { padding: 8px; border-radius: 10px; background: white; display: grid; gap: 4px; border: 1px solid #e8d6b2; }
.mp-card.hi { border-color: var(--accent); }
.mp-card i, .mp-card i { display: block; height: 6px; border-radius: 4px; background: #d8be96; }
.mp-card .sm { width: 70%; }
.mp-card .ac { width: 50%; background: var(--accent); }
.mp-wallet { background: var(--espresso); color: var(--cream); padding: 14px; border-radius: 12px; display: flex; flex-direction: column; gap: 4px; }
.mp-wallet span { font-size: 9px; opacity: .7; }
.mp-wallet strong { font-size: 16px; }
.mp-timeline { display: flex; flex-direction: column; gap: 6px; flex: 1; }
.mp-timeline i { display: block; height: 24px; border-radius: 8px; background: white; border: 1px solid #e8d6b2; }

/* team */
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
}
.member-card h3 { margin: 4px 0 0; font-size: 14px; font-family: 'Georgia', serif; color: var(--cream-soft); }
.member-role { font-size: 11px; color: var(--muted); margin: 0; }

/* market bars */
.market-stack { display: flex; flex-direction: column; gap: 16px; padding: 22px; }
.bar-row strong { font-size: 13px; color: var(--cream-soft); display: block; margin-bottom: 6px; }
.bar-track { height: 10px; border-radius: 999px; background: rgba(255,246,227,.06); overflow: hidden; }
.bar-fill {
  height: 100%; background: linear-gradient(90deg, var(--accent), var(--accent-2));
  border-radius: 999px; box-shadow: 0 0 12px var(--accent-glow);
  transform-origin: left; animation: grow 1.2s var(--ease) both;
}
@keyframes grow { from { transform: scaleX(0); } to { transform: scaleX(1); } }
.bar-row p { margin: 6px 0 0; font-size: 12px; color: var(--muted); }

/* phones single big */
.phones-single { display: grid; place-items: center; height: 100%; }
.big-phone {
  width: 230px; height: 420px; border-radius: 38px;
  background: linear-gradient(180deg, #1a0e06, #2a1a10);
  padding: 12px; border: 2px solid rgba(243,228,201,.18);
  box-shadow: 0 30px 60px rgba(0,0,0,.6);
  position: relative;
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
.lane strong { font-size: 14px; color: var(--cream-soft); }
.lane p { grid-column: 1 / -1; font-size: 12px; color: var(--muted); margin: 0; }
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
.j-num { font-family: 'JetBrains Mono', monospace; font-size: 10px; color: var(--accent); letter-spacing: .08em; }
.journey-step h4 { margin: 0; font-family: 'Georgia', serif; font-size: 14px; color: var(--cream-soft); }
.journey-step ul { padding-left: 14px; margin: 0; display: grid; gap: 3px; font-size: 11px; color: var(--muted); }

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
.dot strong { font-size: 10.5px; color: var(--cream); text-align: center; max-width: 100px; }
.dot.us span { width: 18px; height: 18px; background: var(--accent); box-shadow: 0 0 0 8px var(--accent-glow); animation: pulse 1.8s infinite; }
.dot.us strong { color: var(--accent); font-size: 12px; font-weight: 800; }

/* allocation */
.alloc { display: grid; gap: 10px; }
.alloc-row { display: flex; justify-content: space-between; font-size: 12px; color: var(--cream); font-weight: 700; }
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
  width: 28px; height: 28px; border-radius: 8px;
  background: linear-gradient(135deg, var(--accent), var(--accent-2));
  color: var(--espresso); display: grid; place-items: center; font-weight: 900; font-size: 14px;
}
.aarrr-card b { font-size: 13px; color: var(--cream-soft); }
.aarrr-card p { font-size: 11.5px; margin: 0; }

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
.milestone h3 { margin: 6px 0 0; font-family: 'Georgia', serif; font-size: 16px; color: var(--cream-soft); }

/* progress */
.qj-progress { position: relative; z-index: 5; padding: 0 22px; display: flex; align-items: center; justify-content: space-between; gap: 16px; border-top: 1px solid var(--border); background: linear-gradient(0deg, rgba(0,0,0,.4), transparent); }
.qj-dots { display: flex; gap: 6px; }
.qj-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--border-strong); border: 0; cursor: pointer; padding: 0; transition: all .2s var(--ease); }
.qj-dot.on { background: var(--accent); width: 24px; border-radius: 999px; box-shadow: 0 0 10px var(--accent-glow); }
.qj-bar { flex: 1; max-width: 280px; height: 3px; border-radius: 999px; background: var(--border); overflow: hidden; }
.qj-bar-fill { height: 100%; background: linear-gradient(90deg, var(--accent), var(--accent-2)); transition: width .6s var(--ease); }

/* ---- prototype slide ---- */
.proto-layout {
  display: grid; grid-template-columns: 1fr 320px;
  gap: 32px; height: 100%; align-items: center;
}
.seg { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 18px; }
.seg button {
  padding: 6px 12px; border-radius: 999px;
  background: var(--panel); color: var(--cream);
  border: 1px solid var(--border); font-size: 11.5px; cursor: pointer;
  transition: all .2s var(--ease);
}
.seg button.on { background: var(--accent); color: var(--espresso); border-color: var(--accent); }
.flow-list { display: grid; gap: 10px; margin-top: 18px; }
.flow-step {
  display: grid; grid-template-columns: 36px 1fr; gap: 12px; align-items: start;
  padding: 12px 14px; border-radius: 12px; background: var(--panel); border: 1px solid var(--border);
}
.flow-step > span {
  width: 32px; height: 32px; border-radius: 8px;
  background: rgba(232,154,76,.15); color: var(--accent);
  display: grid; place-items: center; font-family: monospace; font-weight: 700; font-size: 13px;
}
.flow-step strong { font-size: 13px; display: block; color: var(--cream-soft); }
.flow-step small { font-size: 11.5px; color: var(--muted); display: block; margin-top: 2px; }

.qj-phone { display: grid; place-items: center; }
.phone-frame {
  width: 300px; height: 600px; border-radius: 44px;
  background: linear-gradient(180deg, #14090a, #2a1810);
  padding: 12px;
  border: 2px solid rgba(243,228,201,.22);
  box-shadow: 0 40px 80px rgba(0,0,0,.7), inset 0 0 0 1px rgba(255,255,255,.05);
  position: relative;
}
.notch {
  position: absolute; top: 14px; left: 50%; transform: translateX(-50%);
  width: 100px; height: 24px; border-radius: 14px; background: #000; z-index: 3;
}
.phone-screen {
  width: 100%; height: 100%; border-radius: 32px;
  background: var(--cream-soft); color: var(--espresso);
  overflow: hidden; position: relative;
  display: flex; flex-direction: column;
}
.ph-status { display: flex; justify-content: space-between; padding: 14px 22px 6px; font-size: 11px; font-weight: 700; color: var(--espresso); }
.ph-content { flex: 1; overflow: hidden; position: relative; }
.ph-pad { padding: 16px 18px; display: flex; flex-direction: column; gap: 10px; height: 100%; animation: fadeUp .4s var(--ease); }
.ph-pad.scroll { overflow-y: auto; padding-bottom: 70px; }
.ph-pad.scroll::-webkit-scrollbar { display: none; }
@keyframes fadeUp { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
.ph-pad h3 { font-family: 'Georgia', serif; font-size: 20px; margin: 0; color: var(--espresso); }
.ph-pad > p { font-size: 12px; color: var(--coffee); margin: 0; line-height: 1.5; }

.ph-splash { height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px; padding: 20px; }
.ph-logo {
  width: 72px; height: 72px; border-radius: 22px;
  background: linear-gradient(135deg, var(--accent), var(--accent-2));
  display: grid; place-items: center; color: white; font-weight: 900; font-size: 22px;
  box-shadow: 0 10px 30px var(--accent-glow);
  animation: bounce 2s var(--ease) infinite;
}
.ph-logo.sm { width: 56px; height: 56px; border-radius: 16px; font-size: 18px; animation: none; }
@keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
.ph-splash h3 { font-family: 'Georgia', serif; font-size: 22px; margin: 4px 0 0; }
.ph-splash p { font-size: 12px; color: var(--coffee); }
.ph-badge { font-size: 11px; padding: 6px 12px; background: rgba(232,154,76,.18); color: var(--accent-2); border-radius: 999px; margin-top: 6px; }

.ph-field { display: grid; gap: 4px; }
.ph-field label { font-size: 10.5px; color: var(--coffee); font-weight: 600; text-transform: uppercase; letter-spacing: .05em; }
.ph-field input {
  border: 1px solid #d8be96; background: white; border-radius: 10px;
  padding: 10px 12px; font-size: 13px; color: var(--espresso); outline: none;
}
.ph-primary {
  width: 100%; padding: 12px;
  background: linear-gradient(135deg, var(--accent), var(--accent-2));
  color: white; border: 0; border-radius: 12px;
  font-weight: 700; font-size: 13px; cursor: pointer;
  box-shadow: 0 6px 18px var(--accent-glow);
  transition: transform .15s var(--ease);
}
.ph-primary:hover { transform: translateY(-1px); }
.ph-primary.sm { width: auto; padding: 8px 14px; font-size: 12px; }
.ph-secondary { width: 100%; padding: 11px; background: transparent; color: var(--accent-2); border: 1px solid var(--accent-2); border-radius: 12px; font-weight: 600; font-size: 12.5px; cursor: pointer; }

.ph-roles { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
.ph-role {
  padding: 14px 10px; border-radius: 14px; background: white; border: 1.5px solid #e8d6b2;
  display: flex; flex-direction: column; align-items: flex-start; gap: 4px; cursor: pointer;
  text-align: left;
}
.ph-role.on { border-color: var(--accent-2); background: rgba(232,154,76,.08); }
.ph-role span { width: 32px; height: 32px; border-radius: 10px; background: var(--accent); color: white; display: grid; place-items: center; font-weight: 800; }
.ph-role strong { font-size: 13px; color: var(--espresso); }
.ph-role small { font-size: 10.5px; color: var(--coffee); }
.ph-code { background: var(--espresso); color: var(--cream); padding: 10px 12px; border-radius: 10px; font-family: 'JetBrains Mono', monospace; font-size: 10.5px; margin: 0; line-height: 1.6; overflow: hidden; }

.cv-card {
  background: white; border: 1px solid #e8d6b2; border-radius: 14px;
  padding: 14px; position: relative; overflow: hidden;
}
.cv-card strong { font-size: 13px; color: var(--coffee); }
.cv-line { height: 6px; border-radius: 4px; background: #efe0c2; margin-top: 6px; }
.cv-line.short { width: 60%; }
.cv-slash {
  position: absolute; top: 50%; left: 0; right: 0; transform: rotate(-8deg);
  background: linear-gradient(135deg, var(--accent), var(--accent-2));
  color: white; padding: 6px 10px; text-align: center;
  font-weight: 800; font-size: 13px; box-shadow: 0 6px 18px var(--accent-glow);
}
.ph-pills { display: flex; flex-wrap: wrap; gap: 6px; }
.ph-pills button { padding: 6px 12px; border-radius: 999px; background: white; border: 1px solid #d8be96; font-size: 11.5px; cursor: pointer; color: var(--coffee); }
.ph-pills button.on { background: var(--accent); color: white; border-color: var(--accent); }

.ph-head { display: flex; justify-content: space-between; align-items: center; }
.ph-head small { font-size: 11px; color: var(--coffee); }
.ph-head h3 { font-size: 18px; margin: 2px 0 0; }
.av { width: 40px; height: 40px; border-radius: 12px; background: var(--accent); color: white; display: grid; place-items: center; font-weight: 800; }
.metric-strip { display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; }
.metric-strip > div { background: white; border: 1px solid #e8d6b2; border-radius: 10px; padding: 8px; text-align: center; }
.metric-strip strong { display: block; font-size: 16px; color: var(--accent-2); font-family: 'Georgia', serif; }
.metric-strip small { font-size: 9.5px; color: var(--coffee); }
.ph-search { padding: 10px 12px; background: white; border: 1px solid #e8d6b2; border-radius: 10px; font-size: 11.5px; color: var(--coffee); }
.ph-filter { display: flex; gap: 6px; overflow-x: auto; }
.ph-filter span { padding: 5px 10px; border-radius: 999px; font-size: 11px; background: white; border: 1px solid #d8be96; color: var(--coffee); white-space: nowrap; }
.ph-filter span.on { background: var(--accent); color: white; border-color: var(--accent); }
.ph-map { height: 90px; border-radius: 12px; background: linear-gradient(135deg, #efe0c2, #d8be96); position: relative; }
.ph-map .pin { position: absolute; width: 10px; height: 10px; border-radius: 50%; background: var(--accent-2); box-shadow: 0 0 0 6px rgba(201,98,44,.25); animation: pulse 1.6s infinite; }
.ph-map .pin.a { top: 30%; left: 25%; }
.ph-map .pin.b { top: 55%; left: 60%; }
.ph-map .pin.c { top: 40%; right: 15%; }
.job { background: white; border: 1px solid #e8d6b2; border-radius: 12px; padding: 10px 12px; display: flex; flex-direction: column; gap: 6px; cursor: pointer; text-align: left; }
.job-t { display: flex; justify-content: space-between; align-items: center; }
.job-t h4 { font-size: 13px; margin: 0; color: var(--espresso); }
.job-t .qj-chip { background: var(--accent); color: white; border-color: var(--accent); font-weight: 700; font-size: 10px; }
.job-m { display: flex; flex-wrap: wrap; gap: 4px 10px; font-size: 10.5px; color: var(--coffee); }

.ph-back { background: transparent; border: 1px solid #d8be96; padding: 6px 12px; border-radius: 999px; font-size: 11px; color: var(--coffee); cursor: pointer; width: fit-content; }
.detail { background: white; border: 1px solid #e8d6b2; border-radius: 14px; padding: 14px; display: flex; flex-direction: column; gap: 10px; }
.d-co { display: flex; gap: 10px; align-items: center; }
.d-mark { width: 44px; height: 44px; border-radius: 12px; background: linear-gradient(135deg, var(--accent), var(--accent-2)); color: white; display: grid; place-items: center; font-weight: 800; font-size: 13px; }
.detail h3 { font-size: 16px; margin: 2px 0 0; }
.detail p { font-size: 12px; color: var(--coffee); margin: 0; line-height: 1.5; }
.tasks { display: grid; gap: 6px; }
.tasks > div { font-size: 11.5px; color: var(--coffee); padding: 6px 10px; background: #faf3e2; border-radius: 8px; }
.success-pop {
  position: absolute; bottom: 80px; left: 16px; right: 16px;
  background: var(--espresso); color: var(--cream);
  padding: 12px 14px; border-radius: 12px;
  box-shadow: 0 20px 40px rgba(0,0,0,.4);
  animation: popIn .4s var(--ease);
}
.success-pop strong { display: block; font-size: 13px; }
.success-pop span { font-size: 11px; opacity: .8; }
@keyframes popIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

.tl { display: grid; gap: 8px; padding-left: 6px; position: relative; }
.tl-item { display: grid; grid-template-columns: 16px 1fr; gap: 8px; align-items: start; }
.tl-dot { width: 10px; height: 10px; border-radius: 50%; background: var(--accent); margin-top: 8px; box-shadow: 0 0 0 3px rgba(232,154,76,.2); }
.tl-card { background: white; border: 1px solid #e8d6b2; border-radius: 10px; padding: 8px 12px; }
.tl-card strong { font-size: 12.5px; color: var(--espresso); display: block; }
.tl-card p { font-size: 10.5px; color: var(--coffee); margin: 2px 0 0; }

.wallet-card {
  background: linear-gradient(135deg, var(--espresso), #4a2e1c);
  color: var(--cream); padding: 16px; border-radius: 14px;
  display: flex; flex-direction: column; gap: 4px;
  box-shadow: 0 10px 30px rgba(0,0,0,.2);
}
.wallet-card span { font-size: 11px; opacity: .75; }
.wallet-card strong { font-size: 26px; font-family: 'Georgia', serif; }
.wallet-card p { font-size: 12px; margin: 0; opacity: .85; }
.cashout { display: flex; justify-content: space-between; align-items: center; padding: 12px; background: white; border: 1px solid #e8d6b2; border-radius: 12px; }
.cashout strong { font-size: 12.5px; display: block; }
.cashout small { font-size: 10.5px; color: var(--coffee); }

.ph-tabs {
  position: absolute; bottom: 0; left: 0; right: 0;
  display: grid; grid-template-columns: repeat(3, 1fr);
  background: white; border-top: 1px solid #e8d6b2; padding: 10px 8px 18px;
}
.ph-tabs button { background: transparent; border: 0; font-size: 11px; color: var(--coffee); font-weight: 600; cursor: pointer; padding: 4px 0; }
.ph-tabs button.on { color: var(--accent-2); }
.home-ind { position: absolute; bottom: 6px; left: 50%; transform: translateX(-50%); width: 100px; height: 4px; border-radius: 2px; background: var(--espresso); opacity: .35; z-index: 4; }

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

.quote { margin-top: 18px; font-style: italic; color: var(--muted); font-size: 14px; }
`;
