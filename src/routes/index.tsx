import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, useCallback } from "react";

export const Route = createFileRoute("/")({
  component: PitchDeck,
  head: () => ({
    meta: [
      { title: "QuickJob Campus — Pitch Deck" },
      { name: "description", content: "Kerja Sampingan, Mudah & Dekat. Pitch deck untuk QuickJob Campus." },
    ],
  }),
});

/* ---------- Design Tokens ---------- */
const C = {
  primary: "#8A5F41",
  primaryDark: "#6e4a31",
  cream: "#F3E4C9",
  creamSoft: "#FBF1DD",
  ink: "#2C1E14",
  white: "#FFFFFF",
};

/* ---------- iPhone Frame ---------- */
function Phone({ children, glow = false }: { children: React.ReactNode; glow?: boolean }) {
  return (
    <div
      style={{
        width: 320,
        height: 670,
        borderRadius: 52,
        background: "linear-gradient(145deg,#1a1a1a,#0a0a0a)",
        padding: 12,
        boxShadow: glow
          ? `0 40px 120px -20px ${C.primary}55, 0 30px 60px -15px #00000099, inset 0 0 0 2px #2a2a2a`
          : "0 30px 80px -20px #00000099, inset 0 0 0 2px #2a2a2a",
        position: "relative",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 42,
          overflow: "hidden",
          position: "relative",
          background: C.cream,
        }}
      >
        {/* Notch */}
        <div
          style={{
            position: "absolute",
            top: 8,
            left: "50%",
            transform: "translateX(-50%)",
            width: 110,
            height: 28,
            background: "#0a0a0a",
            borderRadius: 20,
            zIndex: 50,
          }}
        />
        {/* Status bar */}
        <div
          style={{
            position: "absolute",
            top: 14,
            left: 24,
            right: 24,
            display: "flex",
            justifyContent: "space-between",
            fontSize: 11,
            fontWeight: 600,
            color: C.ink,
            zIndex: 40,
          }}
        >
          <span>9:41</span>
          <span style={{ marginRight: 70 }}>􀋲 􀛨 􀛪</span>
        </div>
        {children}
      </div>
    </div>
  );
}

/* ---------- Screen 1: Splash ---------- */
function ScreenSplash() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: `radial-gradient(circle at 50% 30%, ${C.creamSoft}, ${C.cream})`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 18,
        animation: "fadeInUp 0.8s ease-out",
      }}
    >
      <div
        style={{
          width: 92,
          height: 92,
          borderRadius: 24,
          background: `linear-gradient(135deg, ${C.primary}, ${C.primaryDark})`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontWeight: 800,
          fontSize: 42,
          boxShadow: `0 20px 40px -10px ${C.primary}80`,
          animation: "pulseGlow 2.4s ease-in-out infinite",
        }}
      >
        Q
      </div>
      <div style={{ textAlign: "center" }}>
        <h1 style={{ color: C.primary, fontSize: 26, fontWeight: 800, margin: 0, letterSpacing: -0.5 }}>
          QuickJob Campus
        </h1>
        <p style={{ color: C.ink, opacity: 0.7, fontSize: 13, marginTop: 6 }}>
          Kerja Sampingan, Mudah &amp; Dekat
        </p>
      </div>
      <div style={{ display: "flex", gap: 6, marginTop: 12 }}>
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: C.primary,
              opacity: 0.4,
              animation: `dotBounce 1.2s ${i * 0.15}s infinite`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

/* ---------- Screen 2: Onboarding ---------- */
function ScreenOnboarding() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: C.cream,
        padding: "60px 22px 22px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          background: C.white,
          borderRadius: 22,
          padding: 22,
          boxShadow: "0 20px 40px -20px #00000022",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          animation: "slideUp 0.6s ease-out",
        }}
      >
        <div
          style={{
            height: 200,
            borderRadius: 16,
            background: `linear-gradient(135deg, ${C.primary}, ${C.primaryDark})`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 64,
            color: "white",
            marginBottom: 18,
          }}
        >
          ⚡
        </div>
        <span
          style={{
            fontSize: 10,
            fontWeight: 700,
            color: C.primary,
            letterSpacing: 1.5,
            textTransform: "uppercase",
          }}
        >
          Welcome
        </span>
        <h2 style={{ color: C.ink, fontSize: 22, fontWeight: 800, margin: "6px 0 8px", lineHeight: 1.2 }}>
          Kerja Tanpa CV,<br />Praktis &amp; Dekat
        </h2>
        <p style={{ color: C.ink, opacity: 0.65, fontSize: 12, lineHeight: 1.5 }}>
          Mulai kerja sampingan dalam hitungan detik. Lokasi otomatis, pembayaran cepat.
        </p>
        <div style={{ flex: 1 }} />
        <button
          className="cta-btn"
          style={{
            background: C.primary,
            color: "white",
            border: "none",
            borderRadius: 14,
            padding: "14px 0",
            fontSize: 14,
            fontWeight: 700,
            cursor: "pointer",
            boxShadow: `0 10px 24px -8px ${C.primary}99`,
          }}
        >
          Mulai Sekarang →
        </button>
      </div>
    </div>
  );
}

/* ---------- Screen 3: Dashboard ---------- */
function ScreenDashboard() {
  const jobs = [
    { title: "Barista Harian Cafe UGM", client: "Kopi Tuku · UGM", km: "0.4", pay: "Rp 85K" },
    { title: "Kurir Pengantar Paket", client: "TokoLokal", km: "0.8", pay: "Rp 60K" },
    { title: "Promotor Event Kampus", client: "Event Sleman", km: "1.2", pay: "Rp 120K" },
  ];
  return (
    <div style={{ width: "100%", height: "100%", background: C.cream, paddingTop: 50, display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "10px 18px 12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <p style={{ fontSize: 11, color: C.ink, opacity: 0.6, margin: 0 }}>Halo,</p>
          <p style={{ fontSize: 16, color: C.ink, fontWeight: 800, margin: 0 }}>Mahasiswa! 👋</p>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <div
            style={{
              background: C.white,
              borderRadius: 12,
              padding: "6px 10px",
              fontSize: 11,
              fontWeight: 700,
              color: C.primary,
              boxShadow: "0 4px 12px -4px #00000022",
            }}
          >
            ⭐ 150 Poin
          </div>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 10,
              background: C.white,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 14,
              position: "relative",
            }}
          >
            🔔
            <span
              style={{
                position: "absolute",
                top: 4,
                right: 4,
                width: 7,
                height: 7,
                background: "#e53e3e",
                borderRadius: "50%",
              }}
            />
          </div>
        </div>
      </div>

      {/* Map placeholder */}
      <div style={{ margin: "0 18px 14px" }}>
        <div
          style={{
            height: 110,
            borderRadius: 16,
            background: `linear-gradient(135deg, ${C.primary}22, ${C.primary}44)`,
            position: "relative",
            overflow: "hidden",
            boxShadow: "inset 0 0 0 1px #ffffff66",
          }}
        >
          {/* grid */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `linear-gradient(${C.primary}22 1px, transparent 1px), linear-gradient(90deg, ${C.primary}22 1px, transparent 1px)`,
              backgroundSize: "22px 22px",
            }}
          />
          {[
            { l: "25%", t: "30%" },
            { l: "60%", t: "55%" },
            { l: "75%", t: "25%" },
          ].map((p, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                left: p.l,
                top: p.t,
                width: 14,
                height: 14,
                background: C.primary,
                borderRadius: "50%",
                border: "2px solid white",
                boxShadow: `0 0 0 8px ${C.primary}33`,
                animation: `ping 2s ${i * 0.4}s infinite`,
              }}
            />
          ))}
          <div
            style={{
              position: "absolute",
              bottom: 8,
              left: 10,
              background: C.white,
              padding: "4px 10px",
              borderRadius: 8,
              fontSize: 10,
              fontWeight: 700,
              color: C.ink,
            }}
          >
            📍 Peta Lowongan Terdekat
          </div>
        </div>
      </div>

      {/* Job list */}
      <div style={{ flex: 1, overflow: "auto", padding: "0 18px 80px", display: "flex", flexDirection: "column", gap: 10 }}>
        {jobs.map((j, i) => (
          <div
            key={i}
            className="job-card"
            style={{
              background: C.white,
              borderRadius: 14,
              padding: 14,
              boxShadow: "0 8px 20px -12px #00000022",
              animation: `slideUp 0.5s ${i * 0.08}s both`,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 13, fontWeight: 800, color: C.ink, margin: 0 }}>{j.title}</p>
                <p style={{ fontSize: 10, color: C.ink, opacity: 0.6, margin: "2px 0 6px" }}>{j.client}</p>
                <span
                  style={{
                    fontSize: 9,
                    background: `${C.primary}1a`,
                    color: C.primary,
                    padding: "3px 7px",
                    borderRadius: 6,
                    fontWeight: 700,
                  }}
                >
                  📍 {j.km} KM dari Anda
                </span>
              </div>
              <p style={{ fontSize: 13, fontWeight: 800, color: C.primary, margin: 0 }}>{j.pay}</p>
            </div>
            <button
              style={{
                width: "100%",
                marginTop: 10,
                background: C.primary,
                color: "white",
                border: "none",
                padding: "9px 0",
                borderRadius: 10,
                fontWeight: 700,
                fontSize: 12,
                cursor: "pointer",
              }}
            >
              Apply Instant
            </button>
          </div>
        ))}
      </div>

      {/* Bottom nav */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          background: C.white,
          padding: "10px 0 22px",
          display: "flex",
          justifyContent: "space-around",
          boxShadow: "0 -8px 24px -8px #00000022",
        }}
      >
        {[
          { i: "🧭", l: "Explore", a: true },
          { i: "💼", l: "My Jobs", a: false },
          { i: "👤", l: "Profile", a: false },
        ].map((n) => (
          <div key={n.l} style={{ textAlign: "center", opacity: n.a ? 1 : 0.5 }}>
            <div style={{ fontSize: 18 }}>{n.i}</div>
            <div style={{ fontSize: 9, fontWeight: 700, color: n.a ? C.primary : C.ink, marginTop: 2 }}>{n.l}</div>
            {n.a && <div style={{ width: 4, height: 4, borderRadius: "50%", background: C.primary, margin: "3px auto 0" }} />}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Screen 4: Job Detail + Success ---------- */
function ScreenJobDetail() {
  const [state, setState] = useState<"idle" | "loading" | "success">("idle");
  const apply = useCallback(() => {
    setState("loading");
    setTimeout(() => setState("success"), 1400);
    setTimeout(() => setState("idle"), 4000);
  }, []);

  return (
    <div style={{ width: "100%", height: "100%", background: C.cream, paddingTop: 50, position: "relative" }}>
      <div style={{ padding: "8px 18px" }}>
        <button style={{ background: "none", border: "none", fontSize: 18, color: C.ink, cursor: "pointer" }}>←</button>
      </div>
      <div style={{ padding: "0 18px" }}>
        <div
          style={{
            height: 130,
            borderRadius: 16,
            background: `linear-gradient(135deg, ${C.primary}, ${C.primaryDark})`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 56,
          }}
        >
          ☕
        </div>
        <h2 style={{ color: C.ink, fontSize: 18, fontWeight: 800, margin: "14px 0 4px" }}>
          Barista Harian Cafe UGM
        </h2>
        <p style={{ color: C.ink, opacity: 0.6, fontSize: 11, margin: 0 }}>Kopi Tuku · 0.4 KM</p>

        <div style={{ display: "flex", gap: 6, margin: "10px 0" }}>
          <span style={{ background: "#22c55e22", color: "#16a34a", padding: "3px 8px", borderRadius: 6, fontSize: 9, fontWeight: 700 }}>
            ✓ Verified
          </span>
          <span style={{ background: `${C.primary}1a`, color: C.primary, padding: "3px 8px", borderRadius: 6, fontSize: 9, fontWeight: 700 }}>
            ⏰ 4 jam · 14:00
          </span>
        </div>

        <div style={{ background: C.white, borderRadius: 12, padding: 12, marginTop: 8 }}>
          <p style={{ fontSize: 11, fontWeight: 800, color: C.ink, margin: "0 0 6px" }}>Tugas:</p>
          <ul style={{ margin: 0, paddingLeft: 16, fontSize: 11, color: C.ink, opacity: 0.75, lineHeight: 1.7 }}>
            <li>Membuat espresso &amp; latte</li>
            <li>Melayani pelanggan dengan ramah</li>
            <li>Membersihkan area kerja</li>
          </ul>
        </div>
      </div>

      <div style={{ position: "absolute", bottom: 22, left: 18, right: 18 }}>
        <button
          onClick={apply}
          disabled={state !== "idle"}
          style={{
            width: "100%",
            background: state === "success" ? "#16a34a" : C.primary,
            color: "white",
            border: "none",
            padding: "14px 0",
            borderRadius: 14,
            fontWeight: 800,
            fontSize: 14,
            cursor: state === "idle" ? "pointer" : "default",
            transition: "all .3s",
            boxShadow: `0 12px 28px -10px ${C.primary}aa`,
          }}
        >
          {state === "loading" ? (
            <span style={{ display: "inline-block", width: 16, height: 16, border: "2.5px solid #ffffff66", borderTopColor: "white", borderRadius: "50%", animation: "spin 0.8s linear infinite", verticalAlign: "middle" }} />
          ) : state === "success" ? (
            "✓ Terdaftar"
          ) : (
            "Apply Tanpa CV"
          )}
        </button>
      </div>

      {/* Success popup */}
      {state === "success" && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "#0008",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 22,
            animation: "fadeIn .3s",
            zIndex: 60,
          }}
        >
          <div
            style={{
              background: C.white,
              borderRadius: 20,
              padding: 24,
              textAlign: "center",
              animation: "popIn .4s cubic-bezier(.34,1.56,.64,1)",
              width: "100%",
            }}
          >
            <div
              style={{
                width: 64,
                height: 64,
                margin: "0 auto 12px",
                borderRadius: "50%",
                background: "#16a34a",
                color: "white",
                fontSize: 32,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              ✓
            </div>
            <h3 style={{ color: C.ink, fontSize: 16, fontWeight: 800, margin: "0 0 4px" }}>Sukses Mendaftar!</h3>
            <p style={{ color: C.ink, opacity: 0.65, fontSize: 11, margin: 0 }}>
              Lokasi otomatis dicocokkan.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- Screen 5: Profile + Portfolio ---------- */
function ScreenProfile() {
  const portfolio = [
    { t: "Barista — Cafe Lokal", d: "2 hari lalu", v: "★ 4.9" },
    { t: "Kurir Paket", d: "1 minggu lalu", v: "★ 5.0" },
    { t: "Event Promoter", d: "2 minggu lalu", v: "★ 4.8" },
  ];
  return (
    <div style={{ width: "100%", height: "100%", background: C.cream, paddingTop: 50, overflow: "auto" }}>
      <div style={{ padding: "10px 18px 0" }}>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <div
            style={{
              width: 60,
              height: 60,
              borderRadius: 18,
              background: `linear-gradient(135deg, ${C.primary}, ${C.primaryDark})`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontWeight: 800,
              fontSize: 22,
            }}
          >
            AD
          </div>
          <div>
            <p style={{ fontSize: 15, fontWeight: 800, color: C.ink, margin: 0 }}>Adit Pratama</p>
            <p style={{ fontSize: 10, color: C.ink, opacity: 0.6, margin: "2px 0 0" }}>UGM · Teknik Informatika</p>
          </div>
        </div>

        {/* Tier progress */}
        <div style={{ marginTop: 14, background: C.white, borderRadius: 14, padding: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, fontWeight: 700, color: C.ink, marginBottom: 6 }}>
            <span>Silver Tier</span>
            <span style={{ opacity: 0.6 }}>150 / 300 pts</span>
          </div>
          <div style={{ height: 6, background: `${C.primary}22`, borderRadius: 99 }}>
            <div
              style={{
                width: "50%",
                height: "100%",
                background: `linear-gradient(90deg, ${C.primary}, ${C.primaryDark})`,
                borderRadius: 99,
                animation: "growBar 1.2s ease-out",
              }}
            />
          </div>
        </div>

        {/* Wallet */}
        <div style={{ marginTop: 12, background: `linear-gradient(135deg, ${C.primary}, ${C.primaryDark})`, borderRadius: 16, padding: 14, color: "white" }}>
          <p style={{ fontSize: 10, opacity: 0.8, margin: 0 }}>Sistem Poin → Uang</p>
          <p style={{ fontSize: 22, fontWeight: 800, margin: "2px 0 8px" }}>Rp 150.000</p>
          <button
            style={{
              background: "white",
              color: C.primary,
              border: "none",
              padding: "8px 14px",
              borderRadius: 10,
              fontWeight: 800,
              fontSize: 11,
              cursor: "pointer",
            }}
          >
            Cairkan Saldo →
          </button>
        </div>

        {/* Auto Portfolio */}
        <div style={{ marginTop: 14 }}>
          <p style={{ fontSize: 12, fontWeight: 800, color: C.ink, margin: "0 0 8px" }}>
            🎯 Auto Portfolio
          </p>
          <div style={{ position: "relative", paddingLeft: 16 }}>
            <div style={{ position: "absolute", left: 4, top: 4, bottom: 4, width: 2, background: `${C.primary}33` }} />
            {portfolio.map((p, i) => (
              <div key={i} style={{ position: "relative", marginBottom: 10, background: C.white, borderRadius: 12, padding: 10, animation: `slideUp 0.5s ${i * 0.1}s both` }}>
                <div style={{ position: "absolute", left: -16, top: 14, width: 10, height: 10, borderRadius: "50%", background: C.primary, border: "2px solid " + C.cream }} />
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div>
                    <p style={{ fontSize: 11, fontWeight: 800, color: C.ink, margin: 0 }}>{p.t}</p>
                    <p style={{ fontSize: 9, color: C.ink, opacity: 0.55, margin: "2px 0 0" }}>{p.d}</p>
                  </div>
                  <span style={{ fontSize: 10, fontWeight: 700, color: C.primary }}>{p.v}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ height: 30 }} />
      </div>
    </div>
  );
}

/* ---------- Slide definitions ---------- */
const SCREENS = [ScreenSplash, ScreenOnboarding, ScreenDashboard, ScreenJobDetail, ScreenProfile] as const;

type Slide = {
  kicker: string;
  title: string;
  body: string;
  bullets: string[];
  ScreenIdx: number;
};

const SLIDES: Slide[] = [
  {
    kicker: "01 — Cover",
    title: "QuickJob Campus",
    body: "Marketplace micro-job hyperlokal untuk mahasiswa & UMKM kampus.",
    bullets: ["Kerja Sampingan, Mudah & Dekat", "Zero-CV onboarding", "Geolocation matching"],
    ScreenIdx: 0,
  },
  {
    kicker: "02 — Problem & Promise",
    title: "Kerja Tanpa CV",
    body: "Mahasiswa butuh penghasilan cepat. UMKM butuh tenaga harian. Kami hapus hambatan birokrasi.",
    bullets: ["Onboarding < 30 detik", "Tanpa upload dokumen", "Akses instan ke ratusan lowongan"],
    ScreenIdx: 1,
  },
  {
    kicker: "03 — Product Core",
    title: "Dashboard Geolokasi",
    body: "Sistem mencocokkan lowongan dengan radius kampus secara real-time, lengkap dengan peta interaktif.",
    bullets: ["Map view + jarak KM aktual", "3 kategori job utama", "Apply Instant tanpa form panjang"],
    ScreenIdx: 2,
  },
  {
    kicker: "04 — Conversion Loop",
    title: "Apply dalam Satu Tap",
    body: "Friction nol. Loading → konfirmasi → notifikasi UMKM. Rata-rata waktu apply 3 detik.",
    bullets: ["Micro-interaction yang memuaskan", "Verified safety badge", "Auto location-match"],
    ScreenIdx: 3,
  },
  {
    kicker: "05 — Retention Engine",
    title: "Gamifikasi & Auto Portfolio",
    body: "Setiap job selesai = poin + entri portfolio otomatis. CV terbentuk dengan sendirinya.",
    bullets: ["Sistem tier (Silver → Gold → Platinum)", "Cairkan poin jadi rupiah", "Portfolio dinamis & verified"],
    ScreenIdx: 4,
  },
];

/* ---------- Pitch Deck Shell ---------- */
function PitchDeck() {
  const [idx, setIdx] = useState(0);
  const [auto, setAuto] = useState(false);

  const go = useCallback((n: number) => {
    setIdx((p) => Math.max(0, Math.min(SLIDES.length - 1, p + n)));
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  useEffect(() => {
    if (!auto) return;
    const t = setInterval(() => {
      setIdx((p) => (p + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(t);
  }, [auto]);

  const slide = SLIDES[idx];
  const Screen = SCREENS[slide.ScreenIdx];

  return (
    <main
      style={{
        minHeight: "100vh",
        background: `radial-gradient(ellipse at top left, ${C.primary}22, transparent 50%), radial-gradient(ellipse at bottom right, ${C.primary}33, transparent 60%), #1a120a`,
        color: "white",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        position: "relative",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Inter', sans-serif",
      }}
    >
      <GlobalCSS />

      {/* Top bar */}
      <header
        style={{
          padding: "20px 36px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          zIndex: 10,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 8,
              background: `linear-gradient(135deg, ${C.primary}, ${C.primaryDark})`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 800,
              fontSize: 14,
            }}
          >
            Q
          </div>
          <span style={{ fontWeight: 700, fontSize: 13, opacity: 0.85 }}>QuickJob Campus · Pitch</span>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <button
            onClick={() => setAuto((a) => !a)}
            style={{
              background: auto ? C.primary : "transparent",
              border: `1px solid ${C.primary}88`,
              color: "white",
              padding: "6px 12px",
              borderRadius: 8,
              fontSize: 11,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            {auto ? "■ Auto" : "▶ Auto"}
          </button>
          <span style={{ fontSize: 11, opacity: 0.6 }}>
            {idx + 1} / {SLIDES.length}
          </span>
        </div>
      </header>

      {/* Slide content */}
      <section
        key={idx}
        style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: "1.1fr 1fr",
          alignItems: "center",
          gap: 40,
          padding: "20px 60px 40px",
          animation: "slideFade .7s cubic-bezier(0.25, 1, 0.5, 1)",
        }}
      >
        {/* Left text */}
        <div style={{ maxWidth: 560 }}>
          <p
            style={{
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: 2,
              color: C.primary,
              textTransform: "uppercase",
              margin: 0,
              opacity: 0.9,
            }}
          >
            {slide.kicker}
          </p>
          <h1
            style={{
              fontSize: 64,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: -2,
              margin: "10px 0 18px",
              background: `linear-gradient(135deg, #fff, ${C.cream})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {slide.title}
          </h1>
          <p style={{ fontSize: 17, lineHeight: 1.6, opacity: 0.75, margin: "0 0 24px", maxWidth: 480 }}>
            {slide.body}
          </p>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
            {slide.bullets.map((b, i) => (
              <li
                key={b}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  fontSize: 14,
                  opacity: 0,
                  animation: `slideUp .5s ${0.2 + i * 0.1}s forwards`,
                }}
              >
                <span
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: "50%",
                    background: `${C.primary}33`,
                    color: C.cream,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 11,
                    fontWeight: 800,
                    flexShrink: 0,
                  }}
                >
                  ✓
                </span>
                {b}
              </li>
            ))}
          </ul>
        </div>

        {/* Right phone */}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <div key={idx + "-phone"} style={{ animation: "phoneIn .8s cubic-bezier(0.25, 1, 0.5, 1)" }}>
            <Phone glow>
              <Screen />
            </Phone>
          </div>
        </div>
      </section>

      {/* Controls */}
      <footer
        style={{
          padding: "16px 36px 28px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 16,
        }}
      >
        <button
          onClick={() => go(-1)}
          disabled={idx === 0}
          style={navBtnStyle(idx === 0)}
        >
          ← Prev
        </button>

        <div style={{ display: "flex", gap: 8 }}>
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              style={{
                width: i === idx ? 32 : 10,
                height: 10,
                borderRadius: 99,
                background: i === idx ? C.primary : "#ffffff33",
                border: "none",
                cursor: "pointer",
                transition: "all .4s cubic-bezier(0.25, 1, 0.5, 1)",
              }}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={() => go(1)}
          disabled={idx === SLIDES.length - 1}
          style={navBtnStyle(idx === SLIDES.length - 1)}
        >
          Next →
        </button>
      </footer>
    </main>
  );
}

function navBtnStyle(disabled: boolean): React.CSSProperties {
  return {
    background: disabled ? "transparent" : C.primary,
    color: "white",
    border: `1px solid ${disabled ? "#ffffff22" : C.primary}`,
    padding: "10px 20px",
    borderRadius: 10,
    fontWeight: 700,
    fontSize: 13,
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.4 : 1,
    transition: "all .3s",
    boxShadow: disabled ? "none" : `0 8px 20px -8px ${C.primary}aa`,
  };
}

function GlobalCSS() {
  return (
    <style>{`
      * { box-sizing: border-box; }
      body { margin: 0; }
      @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
      @keyframes fadeInUp { from { opacity: 0; transform: translate3d(0, 20px, 0) } to { opacity: 1; transform: translate3d(0,0,0) } }
      @keyframes slideUp { from { opacity: 0; transform: translate3d(0, 16px, 0) } to { opacity: 1; transform: translate3d(0,0,0) } }
      @keyframes slideFade { from { opacity: 0; transform: translate3d(0, 12px, 0) } to { opacity: 1; transform: translate3d(0,0,0) } }
      @keyframes phoneIn { 0% { opacity: 0; transform: translate3d(40px, 0, 0) scale(.95) } 100% { opacity: 1; transform: translate3d(0,0,0) scale(1) } }
      @keyframes pulseGlow { 0%,100% { transform: scale(1); box-shadow: 0 20px 40px -10px ${C.primary}80 } 50% { transform: scale(1.05); box-shadow: 0 24px 50px -8px ${C.primary}cc } }
      @keyframes dotBounce { 0%,100% { transform: translateY(0); opacity:.4 } 50% { transform: translateY(-6px); opacity:1 } }
      @keyframes ping { 0% { box-shadow: 0 0 0 0 ${C.primary}66 } 70% { box-shadow: 0 0 0 14px ${C.primary}00 } 100% { box-shadow: 0 0 0 0 ${C.primary}00 } }
      @keyframes spin { to { transform: rotate(360deg) } }
      @keyframes popIn { 0% { opacity: 0; transform: scale(.85) } 100% { opacity: 1; transform: scale(1) } }
      @keyframes growBar { from { width: 0 } to { width: 50% } }
      .cta-btn { transition: all .25s cubic-bezier(0.25, 1, 0.5, 1); }
      .cta-btn:hover { filter: brightness(1.1); transform: translateY(-1px); }
      .cta-btn:active { transform: translateY(2px) scale(.98); }
      .job-card { transition: transform .3s cubic-bezier(0.25, 1, 0.5, 1); }
      .job-card:hover { transform: translateY(-3px); }
      ::-webkit-scrollbar { width: 0 }
    `}</style>
  );
}
