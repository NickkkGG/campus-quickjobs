## Visual QA Report

- Session: 2026-06-03 (round 2)
- App URL: http://localhost:8081/ · production: https://campus-quickjobs.nicknelsoon30.workers.dev/
- Viewports: 1366×900 (deck) · 390×844 (phone frame)
- Rounds: 2 capture + code fixes

### Task Brief

| ID | Surface | Focus |
|----|---------|--------|
| V0 | Slide 14 deck | Phone frame visible, prototype side panel |
| V2–V4 | Splash / welcome / masuk | Typography, disabled CTA contrast |
| V5 | Preferensi | Chip readability, compact header |
| V6–V8 | Beranda / dompet / profil | IA poin, balance consistency |
| U1–U5 | UMKM onboarding → dashboard | Full flow, real dashboard after activate |
| 390 | Narrow viewport | No clip inside `.qj-phone` |

### Checklist results

| ID | Status | Evidence |
|----|--------|----------|
| V0 | PASS | `V0-slide14-deck-1366.png` |
| V2 | PASS | `V2-splash-1366.png` |
| V3 | PASS | `V3-welcome-1366.png` |
| V4 | PASS→FIX | `V4-masuk-1366.png` — disabled OTP no longer 50% opacity |
| V5 | PASS | `V5-preferensi-1366.png`, `V5-preferensi-390.png` — inactive chips legible |
| V6 | PASS | `V6-beranda-1366.png`, `V6-beranda-390.png` — Dompet 2.450 once; stats Job cocok / Terdekat / Lamaran aktif |
| V7 | PASS | `V7-dompet-1366.png` — saldo 2.450 matches header |
| V8 | PASS | `V8-profil-1366.png` |
| U1–U4 | PASS | `U1`–`U4-umkm-*-1366.png` |
| U5 | PASS→FIX | `U5-umkm-dashboard-1366.png` — real dashboard after activation race fix |
| 390 | PASS | `V5/V6/V7-390.png`, `U5-umkm-dashboard-390.png` |

### Blockers fixed this round

1. **UMKM dashboard tidak terbuka** — `onActivate` set `umkmVerified` async sementara `useEffect` mengembalikan ke `umkm-onboard-1`. Hapus effect guard; aktivasi pakai `go("umkm-dashboard")` atomik di parent.
2. **V4 disabled OTP** — `:disabled` pakai `#d4c4a8` / `#5c4030` tanpa `opacity: 0.5`.
3. **Toast terpotong** — `.ps-toast` boleh wrap, `white-space: normal`.

### Minor (addressed)

- Chip / UMKM chip `min-height: 44px`
- Progress dots kontras lebih kuat
- Google ghost button shadow
- Legal line masuk: 12px `#6E4A30`

### Remaining (non-blocking)

- Focus rings belum di semua kontrol
- Beberapa hint `#9B8164` di layar lain (jelajah, chat)
- Animasi transisi antar screen — belum diaudit otomatis

### Artifacts

- `visual-qa-captures/*.png`
- `visual-qa-captures/visual-qa-manifest.json`
- Re-run: `node scripts/visual-qa-prototype.mjs http://localhost:8081/`

### Verdict

**VISUAL_VERDICT: PASS** — mahasiswa + UMKM slide-14 prototype siap validasi di production (hard refresh).