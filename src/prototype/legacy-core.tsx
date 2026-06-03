import { useCallback, useEffect, useState } from "react";
import {
  ArrowDownCircle, ArrowDownLeft, Bell, Briefcase, Calendar, Camera, Check, CheckCircle2,
  ChevronLeft, ChevronRight, Chrome, Clock, Cloud, Coins, Compass, FileText, Globe,
  GraduationCap, HelpCircle, History, Home, Image as ImageIcon, Info, Instagram, ListTodo,
  Loader2, LogOut, Mail, Map as MapIcon, MapPin, MessageCircle, Music, Phone, Search, Send,
  Settings, Share2, SlidersHorizontal, Star, StickyNote, Store, TrendingUp, User, Users, Wallet,
  Plus, Building2, BadgeCheck, Megaphone, ClipboardList, Sparkles, Upload,
} from "lucide-react";
import type { UmkmProfile } from "./types";
import {
  UmkmOnboardStep1, UmkmOnboardStep2, UmkmOnboardStep3, UmkmOnboardReview,
  UmkmDashboard, UmkmPostJob, UmkmApplicants, UmkmBoost, UmkmDompet, UmkmProfil, UmkmNotifikasi, UmkmBottomNav,
} from "./umkm-screens";
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
  | "notifikasi";

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
  const noNav = ["homescreen", "splash", "welcome", "masuk", "otp", "pilih-peran", "preferensi", "detail", "konfirmasi", "lamaran-berhasil", "notifikasi", "chat", "portofolio", "cairkan"];

  return (
    <div className="proto-layout">
      <div className="proto-info">
        <Kicker>Slide 14 · Prototipe Aplikasi</Kicker>
        <Title>Prototipe Aplikasi QuickJob Campus.</Title>
        <Lead>
          Coba langsung di prototipe sebelah kanan. Ketuk ikon QuickJob di home screen untuk masuk,
          lalu jalani full flow: login, pilih peran, atur preferensi, cari job di peta, lamar tanpa
          CV, sampai cairkan poin ke e-wallet.
        </Lead>
        <p className="proto-hint">
          Tip: ketuk garis home indicator di bawah layar untuk kembali ke home screen iPhone kapan
          pun.
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
                <ProtoPilihPeran nav={nav} selected={selectedRole} setSelected={setSelectedRole} />
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
            {!noNav.includes(screen) && <ProtoBottomNav active={screen} nav={nav} />}
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

function ProtoPilihPeran({ nav, selected, setSelected }: { nav: ProtoNav; selected: "mahasiswa" | "umkm"; setSelected: (v: "mahasiswa" | "umkm") => void }) {
  const roles = [
    { id: "mahasiswa" as const, icon: GraduationCap, title: "Mahasiswa", desc: "Cari micro-job dekat kampus" },
    { id: "umkm" as const, icon: Store, title: "UMKM", desc: "Pasang lowongan cepat" },
  ];
  return (
    <div className="ps-pad" style={{ height: "100%", display: "flex", flexDirection: "column", paddingBottom: "30px" }}>
      <h2 style={{ fontSize: 22, fontWeight: "bold", color: "#3D2A1C", textAlign: "center", marginBottom: 4, marginTop: 16 }}>Pilih kebutuhanmu</h2>
      <p style={{ fontSize: 12, color: "#6E4A30", textAlign: "center", marginBottom: 20 }}>QuickJob punya jalur mahasiswa & UMKM</p>
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
      <PBtn onClick={() => nav.go("preferensi")}>Lanjut sebagai {selected === "mahasiswa" ? "Mahasiswa" : "UMKM"}</PBtn>
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
