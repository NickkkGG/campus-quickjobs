---
name: mobile-dashboard-ia
description: >
  Audit information architecture for QuickJob Campus phone prototype (slide 14):
  duplicate metrics, header vs stat row roles, one-tap navigation, mahasiswa/UMKM POV.
  Use when user asks "harusnya gimana", duplicate UI, dashboard berantakan, berpikir
  kritis tentang layout, or before shipping beranda/dompet/profil changes. Slash: /mobile-dashboard-ia
metadata:
  short-description: "IA audit for in-frame mobile prototype"
---

# Mobile Dashboard IA (QuickJob Campus)

Before changing beranda, dompet, or profil inside `.qj-phone`, run this checklist.

## Roles (mahasiswa beranda)

| Zone | Purpose | Show once |
|------|---------|-----------|
| Header kiri | Identitas: Halo + kampus | Ya |
| Header kanan | **Dompet** = satu-satunya saldo poin (tap → `dompet`) | Ya |
| Header kanan | **Bell** = notifikasi (tap → `notifikasi`) | Ya |
| 3 stat cards | KPI **bukan** saldo: job cocok, terdekat, lamaran aktif | Ya |
| Tab Dompet | Detail saldo, cairkan, riwayat | Ya (full wallet) |

**Jangan** tampilkan angka poin yang sama di chip header DAN kotak stat ke-3.

## Audit steps

1. Buka slide 14 → QuickJob → beranda.
2. Hitung berapa kali **angka saldo** muncul di satu layar (target: **1** di header).
3. Cek 3 kotak: apakah isinya **3 metrik berbeda** (bukan duplikat dompet)?
4. Tap setiap kotak/stat: ada `nav.go` ke layar yang masuk akal?
5. Bandingkan dengan tab **Dompet** — tidak boleh redundant tanpa alasan (header = shortcut, tab = detail).

## Fix patterns

- Duplikat poin → pindah ke `ph-wallet-entry` saja; stat ketiga ganti lamaran/rating/shift.
- Duplikat nama user → `APP_USER_NAME` constant.
- Class `qj-title` deck vs app → gunakan `ph-onboard-title` di dalam frame.

## Pair with

- `/visual-qa-deep` untuk bukti screenshot & layout pecah
- `/check-work` setelah implement