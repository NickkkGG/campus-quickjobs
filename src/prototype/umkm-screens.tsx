import { useState } from "react";
import {
  BadgeCheck,
  Bell,
  Briefcase,
  Building2,
  ChevronLeft,
  ChevronRight,
  Coins,
  MapPin,
  Megaphone,
  Plus,
  Sparkles,
  Star,
  Store,
  TrendingUp,
  Upload,
  MessageCircle,
  Send,
  User,
  Users,
  Wallet,
} from "lucide-react";
import type { UmkmApplicant, UmkmJobPost, UmkmProfile } from "./types";

export type UmkmNav = {
  go: (s: string) => void;
  back: () => void;
  showToast: (msg: string) => void;
};

function PatternHeader({ step, total, title, subtitle }: { step: number; total: number; title: string; subtitle: string }) {
  return (
    <div className="umkm-hero">
      <div className="umkm-hero-pattern" aria-hidden />
      <div className="umkm-step-dots">
        {Array.from({ length: total }).map((_, i) => (
          <span key={i} className={i < step ? "on" : i === step ? "cur" : ""} />
        ))}
      </div>
      <span className="umkm-step-label">
        Langkah {step + 1} dari {total}
      </span>
      <h2 className="umkm-hero-title">{title}</h2>
      <p className="umkm-hero-sub">{subtitle}</p>
    </div>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="umkm-field">
      <span className="umkm-field-label">{label}</span>
      {hint && <span className="umkm-field-hint">{hint}</span>}
      {children}
    </label>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: 12,
  border: "1.5px solid #E6D5B3",
  backgroundColor: "#fff",
  fontSize: 14,
  color: "#3D2A1C",
  outline: "none",
};

export function UmkmOnboardStep1({
  nav,
  profile,
  setProfile,
}: {
  nav: UmkmNav;
  profile: UmkmProfile;
  setProfile: React.Dispatch<React.SetStateAction<UmkmProfile>>;
}) {
  const types = ["Kafe / F&B", "Event / Panitia", "Retail / Toko", "Gudang / Logistik", "Kreatif / Digital"];
  const valid = profile.businessName.trim().length >= 3 && profile.businessType && profile.description.trim().length >= 10;
  return (
    <div className="umkm-screen">
      <PatternHeader
        step={0}
        total={4}
        title="Ceritakan bisnismu"
        subtitle="Data ini membuktikan kamu UMKM resmi di QuickJob — bukan akun mahasiswa yang salah jalur."
      />
      <div className="umkm-form">
        <Field label="Nama usaha / brand" hint="Contoh: Kopi Klotok Pogung">
          <input
            style={inputStyle}
            value={profile.businessName}
            onChange={(e) => setProfile((p) => ({ ...p, businessName: e.target.value }))}
            placeholder="Nama yang tampil ke mahasiswa"
          />
        </Field>
        <Field label="Jenis usaha">
          <div className="umkm-chip-grid">
            {types.map((t) => (
              <button
                key={t}
                type="button"
                className={`umkm-chip ${profile.businessType === t ? "on" : ""}`}
                onClick={() => setProfile((p) => ({ ...p, businessType: t }))}
              >
                {t}
              </button>
            ))}
          </div>
        </Field>
        <Field label="Deskripsi singkat" hint="Min. 10 karakter — tampil di profil lowongan">
          <textarea
            style={{ ...inputStyle, minHeight: 72, resize: "none" }}
            value={profile.description}
            onChange={(e) => setProfile((p) => ({ ...p, description: e.target.value }))}
            placeholder="Usaha kopi mahasiswa dengan kebutuhan barista shift sore..."
          />
        </Field>
        <div className="umkm-cover-preview">
          <img src={profile.coverImage} alt="" />
          <span>
            <Upload size={14} /> Foto etalase (contoh)
          </span>
        </div>
      </div>
      <div className="umkm-footer">
        <button type="button" className="ps-btn" disabled={!valid} onClick={() => nav.go("umkm-onboard-2")}>
          Lanjut ke lokasi
        </button>
      </div>
    </div>
  );
}

export function UmkmOnboardStep2({
  nav,
  profile,
  setProfile,
}: {
  nav: UmkmNav;
  profile: UmkmProfile;
  setProfile: React.Dispatch<React.SetStateAction<UmkmProfile>>;
}) {
  const campuses = ["UGM & Sekitar", "UNY / Condongcatur", "UMY / Baciro", "UII / Candi"];
  const radii = ["≤1 km", "≤3 km", "≤5 km"];
  const valid = profile.address.trim().length >= 8 && profile.campusArea && profile.openHours.trim().length >= 5;
  return (
    <div className="umkm-screen">
      <button type="button" className="umkm-back" onClick={nav.back}>
        <ChevronLeft size={20} /> Kembali
      </button>
      <PatternHeader
        step={1}
        total={4}
        title="Lokasi & jangkauan"
        subtitle="Matching mahasiswa mengandalkan radius kampus — ini wajib akurat."
      />
      <div className="umkm-form">
        <Field label="Alamat lengkap">
          <input
            style={inputStyle}
            value={profile.address}
            onChange={(e) => setProfile((p) => ({ ...p, address: e.target.value }))}
            placeholder="Jl. ... No. ..., Sleman"
          />
        </Field>
        <Field label="Area kampus utama">
          <div className="umkm-chip-grid">
            {campuses.map((c) => (
              <button
                key={c}
                type="button"
                className={`umkm-chip ${profile.campusArea === c ? "on" : ""}`}
                onClick={() => setProfile((p) => ({ ...p, campusArea: c }))}
              >
                <MapPin size={12} /> {c}
              </button>
            ))}
          </div>
        </Field>
        <Field label="Radius layanan">
          <div className="umkm-chip-row">
            {radii.map((r) => (
              <button
                key={r}
                type="button"
                className={`umkm-chip ${profile.serviceRadius === r ? "on" : ""}`}
                onClick={() => setProfile((p) => ({ ...p, serviceRadius: r }))}
              >
                {r}
              </button>
            ))}
          </div>
        </Field>
        <Field label="Jam operasional">
          <input
            style={inputStyle}
            value={profile.openHours}
            onChange={(e) => setProfile((p) => ({ ...p, openHours: e.target.value }))}
            placeholder="08.00 – 22.00"
          />
        </Field>
      </div>
      <div className="umkm-footer">
        <button type="button" className="ps-btn" disabled={!valid} onClick={() => nav.go("umkm-onboard-3")}>
          Lanjut ke kontak PIC
        </button>
      </div>
    </div>
  );
}

export function UmkmOnboardStep3({
  nav,
  profile,
  setProfile,
  phone,
}: {
  nav: UmkmNav;
  profile: UmkmProfile;
  setProfile: React.Dispatch<React.SetStateAction<UmkmProfile>>;
  phone: string;
}) {
  const needs = ["Barista / F&B", "Event / Runner", "Admin / Kasir", "Packing", "Marketing / SPG"];
  const teams = ["1–5 orang", "6–15 orang", "16+ orang"];
  const valid =
    profile.picName.trim().length >= 2 &&
    (profile.whatsapp.trim().length >= 10 || phone.length >= 10) &&
    profile.hiringNeeds.length > 0;
  return (
    <div className="umkm-screen">
      <button type="button" className="umkm-back" onClick={nav.back}>
        <ChevronLeft size={20} /> Kembali
      </button>
      <PatternHeader
        step={2}
        total={4}
        title="PIC & kebutuhan rekrut"
        subtitle="Siapa yang dihubungi mahasiswa setelah melamar?"
      />
      <div className="umkm-form">
        <Field label="Nama penanggung jawab (PIC)">
          <input
            style={inputStyle}
            value={profile.picName}
            onChange={(e) => setProfile((p) => ({ ...p, picName: e.target.value }))}
            placeholder="Nama pemilik / manager"
          />
        </Field>
        <Field label="WhatsApp bisnis" hint="Bisa sama dengan nomor login">
          <input
            style={inputStyle}
            value={profile.whatsapp || phone}
            onChange={(e) => setProfile((p) => ({ ...p, whatsapp: e.target.value }))}
            placeholder="08xxxxxxxxxx"
          />
        </Field>
        <Field label="Ukuran tim saat ini">
          <div className="umkm-chip-row">
            {teams.map((t) => (
              <button
                key={t}
                type="button"
                className={`umkm-chip ${profile.teamSize === t ? "on" : ""}`}
                onClick={() => setProfile((p) => ({ ...p, teamSize: t }))}
              >
                <Users size={12} /> {t}
              </button>
            ))}
          </div>
        </Field>
        <Field label="Sering butuh role apa? (boleh lebih dari satu)">
          <div className="umkm-chip-grid">
            {needs.map((n) => {
              const on = profile.hiringNeeds.includes(n);
              return (
                <button
                  key={n}
                  type="button"
                  className={`umkm-chip ${on ? "on" : ""}`}
                  onClick={() =>
                    setProfile((p) => ({
                      ...p,
                      hiringNeeds: on ? p.hiringNeeds.filter((x) => x !== n) : [...p.hiringNeeds, n],
                    }))
                  }
                >
                  {n}
                </button>
              );
            })}
          </div>
        </Field>
      </div>
      <div className="umkm-footer">
        <button type="button" className="ps-btn" disabled={!valid} onClick={() => nav.go("umkm-onboard-review")}>
          Review data UMKM
        </button>
      </div>
    </div>
  );
}

export function UmkmOnboardReview({
  nav,
  profile,
  onActivate,
}: {
  nav: UmkmNav;
  profile: UmkmProfile;
  onActivate: () => void;
}) {
  const rows: [string, string][] = [
    ["Nama usaha", profile.businessName],
    ["Jenis", profile.businessType],
    ["Area", profile.campusArea],
    ["Radius", profile.serviceRadius],
    ["PIC", profile.picName],
    ["Kebutuhan", profile.hiringNeeds.join(", ")],
  ];
  return (
    <div className="umkm-screen">
      <button type="button" className="umkm-back" onClick={nav.back}>
        <ChevronLeft size={20} /> Kembali
      </button>
      <PatternHeader
        step={3}
        total={4}
        title="Cek ulang profil UMKM"
        subtitle="Setelah ini baru dashboard — bukan langsung saat pilih peran."
      />
      <div className="umkm-review-card">
        <img src={profile.coverImage} alt="" className="umkm-review-cover" />
        <div className="umkm-review-body">
          {rows.map(([k, v]) => (
            <div key={k} className="umkm-review-row">
              <span>{k}</span>
              <strong>{v}</strong>
            </div>
          ))}
        </div>
      </div>
      <p className="umkm-legal">
        Dengan melanjutkan, kamu menyatakan data usaha benar dan siap menerima pelamar mahasiswa kampus.
      </p>
      <div className="umkm-footer">
        <button
          type="button"
          className="ps-btn"
          onClick={() => {
            onActivate();
            nav.showToast("Profil UMKM terverifikasi — dashboard terbuka");
            nav.go("umkm-dashboard");
          }}
        >
          Aktifkan dashboard UMKM
        </button>
      </div>
    </div>
  );
}

const DEMO_JOBS: UmkmJobPost[] = [
  {
    id: "j1",
    title: "Barista Shift Sore",
    category: "F&B",
    rate: "Rp95.000",
    schedule: "Setiap Jumat–Minggu",
    slots: 2,
    applicants: 5,
    status: "aktif",
    boosted: true,
    imageUrl: "https://images.unsplash.com/photo-1572982270699-473dfa34d7e7?auto=format&fit=crop&w=400&q=80",
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
    imageUrl: "https://images.unsplash.com/photo-1566409031818-9508be68fc74?auto=format&fit=crop&w=400&q=80",
  },
];

const DEMO_APPLICANTS: UmkmApplicant[] = [
  {
    id: "a1",
    name: "Alya — UGM",
    campus: "FISIP UGM",
    rating: 4.9,
    jobTitle: "Barista Shift Sore",
    status: "menunggu",
    avatar: "https://images.unsplash.com/photo-1589386417686-0d34b5903d23?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "a2",
    name: "Raka — UNY",
    campus: "Teknik UNY",
    rating: 4.7,
    jobTitle: "Runner Event",
    status: "menunggu",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
  },
];

export function UmkmDashboard({
  nav,
  profile,
  jobs,
}: {
  nav: UmkmNav;
  profile: UmkmProfile;
  jobs: UmkmJobPost[];
}) {
  return (
    <div className="umkm-screen umkm-scroll">
      <div className="umkm-dash-header">
        <div>
          <span className="umkm-dash-eyebrow">Mode UMKM</span>
          <h2>{profile.businessName || "Usaha kamu"}</h2>
          <p>
            <MapPin size={12} /> {profile.campusArea} · {profile.serviceRadius}
          </p>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          <button type="button" className="umkm-icon-btn" onClick={() => nav.go("umkm-profil")} aria-label="Profil usaha">
            <Store size={18} />
          </button>
          <button type="button" className="umkm-icon-btn" onClick={() => nav.go("umkm-notifikasi")}>
            <Bell size={18} />
            <span className="umkm-badge">3</span>
          </button>
        </div>
      </div>
      <div className="umkm-stats">
        <div className="umkm-stat">
          <Briefcase size={16} />
          <strong>{jobs.filter((j) => j.status === "aktif").length}</strong>
          <small>Lowongan aktif</small>
        </div>
        <div className="umkm-stat">
          <Users size={16} />
          <strong>{jobs.reduce((s, j) => s + j.applicants, 0)}</strong>
          <small>Pelamar baru</small>
        </div>
        <div className="umkm-stat gold">
          <Star size={16} />
          <strong>4.8</strong>
          <small>Rating usaha</small>
        </div>
      </div>
      <div className="umkm-promo">
        <Sparkles size={18} />
        <div>
          <strong>Boost gratis 1 bulan</strong>
          <p>Insentif aktivasi — pasang lowongan pertama & tonton iklan (PDF DM).</p>
        </div>
        <button type="button" className="umkm-promo-btn" onClick={() => nav.go("umkm-boost")}>
          Klaim
        </button>
      </div>
      <div className="umkm-actions">
        <button type="button" className="umkm-action primary" onClick={() => nav.go("umkm-post-job")}>
          <Plus size={18} /> Pasang lowongan
        </button>
        <button type="button" className="umkm-action" onClick={() => nav.go("umkm-applicants")}>
          <Users size={18} /> Kelola pelamar
        </button>
      </div>
      <h3 className="umkm-section-title">Lowongan kamu</h3>
      {jobs.map((j) => (
        <button
          key={j.id}
          type="button"
          className="umkm-job-row"
          onClick={() => nav.go("umkm-applicants")}
        >
          <img src={j.imageUrl} alt="" />
          <div>
            <strong>{j.title}</strong>
            <span>
              {j.rate} · {j.applicants} pelamar
            </span>
            {j.boosted && (
              <span className="umkm-boost-tag">
                <Megaphone size={10} /> Boost aktif
              </span>
            )}
          </div>
          <ChevronRight size={16} />
        </button>
      ))}
    </div>
  );
}

export function UmkmPostJob({ nav }: { nav: UmkmNav }) {
  return (
    <div className="umkm-screen umkm-scroll">
      <button type="button" className="umkm-back" onClick={nav.back}>
        <ChevronLeft size={20} /> Kembali
      </button>
      <h2 className="umkm-page-title">Pasang lowongan baru</h2>
      <p className="umkm-page-sub">Mahasiswa di radius kampus akan melihat dalam hitungan menit.</p>
      <div className="umkm-form">
        <Field label="Judul pekerjaan">
          <input style={inputStyle} placeholder="Contoh: Admin Packing Shift Pagi" />
        </Field>
        <Field label="Kategori">
          <div className="umkm-chip-row">
            {["F&B", "Event", "Admin", "Kreatif"].map((c) => (
              <button key={c} type="button" className="umkm-chip on">
                {c}
              </button>
            ))}
          </div>
        </Field>
        <div className="umkm-upload-card">
          <img
            src="https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=600&q=80"
            alt=""
          />
          <span>
            <Upload size={14} /> Tambah foto tempat kerja
          </span>
        </div>
        <Field label="Bayaran / shift">
          <input style={inputStyle} placeholder="Rp70.000 – Rp120.000" />
        </Field>
        <Field label="Jadwal & slot">
          <input style={inputStyle} placeholder="Besok 09.00 · 3 orang" />
        </Field>
      </div>
      <button
        type="button"
        className="ps-btn"
        onClick={() => {
          nav.showToast("Lowongan dipublikasikan!");
          nav.go("umkm-dashboard");
        }}
      >
        Publikasikan lowongan
      </button>
    </div>
  );
}

export function UmkmApplicants({
  nav,
  applicants,
  setApplicants,
  onOpenChat,
}: {
  nav: UmkmNav;
  applicants: UmkmApplicant[];
  setApplicants: React.Dispatch<React.SetStateAction<UmkmApplicant[]>>;
  onOpenChat: (name: string) => void;
}) {
  const setStatus = (id: string, status: UmkmApplicant["status"]) => {
    setApplicants((list) => list.map((a) => (a.id === id ? { ...a, status } : a)));
    if (status === "diterima") {
      const person = applicants.find((a) => a.id === id);
      nav.showToast("Pelamar diterima — buka chat koordinasi");
      if (person) onOpenChat(person.name);
    } else {
      nav.showToast("Pelamar ditolak");
    }
  };
  return (
    <div className="umkm-screen umkm-scroll">
      <button type="button" className="umkm-back" onClick={nav.back}>
        <ChevronLeft size={20} /> Kembali
      </button>
      <h2 className="umkm-page-title">Kelola pelamar</h2>
      {applicants.map((a) => (
        <div key={a.id} className="umkm-applicant">
          <img src={a.avatar} alt="" />
          <div className="umkm-applicant-info">
            <strong>{a.name}</strong>
            <span>{a.jobTitle}</span>
            <span className="umkm-rating">
              <Star size={12} fill="#C9922C" color="#C9922C" /> {a.rating}
            </span>
          </div>
          {a.status === "menunggu" ? (
            <div className="umkm-applicant-actions">
              <button type="button" className="ok" onClick={() => setStatus(a.id, "diterima")}>
                Terima
              </button>
              <button type="button" className="no" onClick={() => setStatus(a.id, "ditolak")}>
                Tolak
              </button>
            </div>
          ) : (
            <div className="umkm-applicant-done">
              <span className={`umkm-status-pill ${a.status}`}>{a.status}</span>
              {a.status === "diterima" && (
                <button type="button" className="umkm-chat-btn" onClick={() => onOpenChat(a.name)}>
                  <MessageCircle size={14} /> Chat
                </button>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export function UmkmChat({
  nav,
  peerName,
  businessName,
}: {
  nav: UmkmNav;
  peerName: string;
  businessName: string;
}) {
  const [msg, setMsg] = useState("");
  const thread = [
    { from: "them", text: `Halo, saya siap untuk shift. Ada dress code?` },
    { from: "me", text: `Hai! Dari ${businessName || "kami"} — baju hitam polos, sepatu tertutup.` },
    { from: "them", text: "Siap, bisa hadir 15 menit lebih awal." },
  ];
  return (
    <div className="umkm-screen" style={{ paddingBottom: 0 }}>
      <button type="button" className="umkm-back" onClick={nav.back}>
        <ChevronLeft size={20} /> Kembali
      </button>
      <div className="umkm-chat-header">
        <strong>{peerName}</strong>
        <span>Koordinasi shift · QuickJob</span>
      </div>
      <div className="umkm-chat-thread">
        {thread.map((m, i) => (
          <div key={i} className={`umkm-chat-bubble ${m.from}`}>
            {m.text}
          </div>
        ))}
      </div>
      <div className="umkm-chat-compose">
        <input
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          placeholder="Tulis pesan ke pelamar..."
          style={inputStyle}
        />
        <button
          type="button"
          className="umkm-chat-send"
          onClick={() => {
            if (!msg.trim()) return;
            nav.showToast("Pesan terkirim (demo)");
            setMsg("");
          }}
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
}

export function UmkmBoost({ nav }: { nav: UmkmNav }) {
  const plans = [
    { name: "Mingguan", price: "Rp35.000", desc: "Prioritas di beranda mahasiswa" },
    { name: "Bulanan", price: "Rp75.000", desc: "Boost + badge mitra aktif" },
    { name: "Freemium", price: "Tonton iklan", desc: "Boost 24 jam · Rp0" },
  ];
  return (
    <div className="umkm-screen umkm-scroll">
      <button type="button" className="umkm-back" onClick={nav.back}>
        <ChevronLeft size={20} /> Kembali
      </button>
      <h2 className="umkm-page-title">Boost visibilitas</h2>
      <div className="umkm-promo" style={{ marginBottom: 14 }}>
        <BadgeCheck size={20} />
        <div>
          <strong>Gratis 1 bulan (aktivasi)</strong>
          <p>Sesuai strategi conversion di dokumen tim.</p>
        </div>
      </div>
      {plans.map((p) => (
        <div key={p.name} className="umkm-plan">
          <div>
            <strong>{p.name}</strong>
            <span>{p.desc}</span>
          </div>
          <button type="button" className="umkm-plan-btn" onClick={() => nav.showToast(`Paket ${p.name} dipilih`)}>
            {p.price}
          </button>
        </div>
      ))}
    </div>
  );
}

export function UmkmDompet({ nav }: { nav: UmkmNav }) {
  return (
    <div className="umkm-screen umkm-scroll">
      <h2 className="umkm-page-title">Dompet bisnis</h2>
      <div className="umkm-wallet-card">
        <small>Pendapatan bulan ini (setelah fee 5%)</small>
        <strong>Rp4.280.000</strong>
        <span>
          <TrendingUp size={14} /> +18% vs bulan lalu
        </span>
      </div>
      <div className="umkm-tx-list">
        {[
          ["Pembayaran shift Barista", "+Rp285.000"],
          ["Fee platform 5%", "-Rp14.250"],
          ["Boost Mingguan", "-Rp35.000"],
        ].map(([t, v]) => (
          <div key={t} className="umkm-tx">
            <span>{t}</span>
            <strong className={v.startsWith("+") ? "plus" : "minus"}>{v}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}

export function UmkmProfil({ nav, profile }: { nav: UmkmNav; profile: UmkmProfile }) {
  return (
    <div className="umkm-screen umkm-scroll">
      <div className="umkm-profile-hero">
        <img src={profile.coverImage} alt="" />
        <div>
          <h2>{profile.businessName}</h2>
          <p>{profile.businessType}</p>
          <span>
            <Store size={12} /> {profile.address || "Alamat terisi saat onboarding"}
          </span>
        </div>
      </div>
      <button type="button" className="umkm-menu-row" onClick={() => nav.go("umkm-onboard-review")}>
        Edit profil usaha
      </button>
      <button type="button" className="umkm-menu-row" onClick={() => nav.showToast("Mode mahasiswa — ganti peran di login")}>
        Ganti ke akun mahasiswa
      </button>
    </div>
  );
}

export function UmkmNotifikasi({ nav }: { nav: UmkmNav }) {
  const items = [
    "5 pelamar baru untuk Barista Shift Sore",
    "Boost gratis kamu aktif 28 hari lagi",
    "Rating 5★ dari Alya (UGM)",
  ];
  return (
    <div className="umkm-screen umkm-scroll">
      <button type="button" className="umkm-back" onClick={nav.back}>
        <ChevronLeft size={20} /> Kembali
      </button>
      <h2 className="umkm-page-title">Notifikasi</h2>
      {items.map((t) => (
        <div key={t} className="umkm-notif">
          <Bell size={16} />
          <p>{t}</p>
        </div>
      ))}
    </div>
  );
}

export function UmkmBottomNav({ active, nav }: { active: string; nav: UmkmNav }) {
  const tabs = [
    { id: "umkm-dashboard", label: "Home", Icon: Building2 },
    { id: "umkm-post-job", label: "Post", Icon: Plus },
    { id: "umkm-applicants", label: "Pelamar", Icon: Users },
    { id: "umkm-boost", label: "Boost", Icon: Megaphone },
    { id: "umkm-dompet", label: "Dompet", Icon: Wallet },
  ];
  return (
    <div className="ps-tabs umkm-tabs">
      {tabs.map((t) => {
        const on = active === t.id || (t.id === "umkm-dashboard" && active.startsWith("umkm-onboard"));
        return (
          <button key={t.id} type="button" className={`ps-tab ${on ? "on" : ""}`} onClick={() => nav.go(t.id)}>
            <t.Icon size={16} />
            <span>{t.label}</span>
          </button>
        );
      })}
    </div>
  );
}