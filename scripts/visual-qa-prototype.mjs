/**
 * Capture Slide 14 phone prototype states for visual QA.
 * Usage: node scripts/visual-qa-prototype.mjs [baseUrl]
 */
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const BASE = process.argv[2] ?? "http://localhost:8081/";
const OUT = path.join(process.cwd(), "visual-qa-captures");
const SLIDE_PROTO_INDEX = 13;

async function shot(page, name) {
  const p = path.join(OUT, name);
  await page.screenshot({ path: p, fullPage: false });
  return p;
}

async function phoneShot(page, name) {
  const phone = page.locator(".qj-phone");
  await phone.waitFor({ state: "visible", timeout: 15000 });
  const p = path.join(OUT, name);
  await phone.screenshot({ path: p });
  return p;
}

async function goSlide14(page) {
  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.waitForTimeout(600);
  for (let n = 0; n < SLIDE_PROTO_INDEX; n++) {
    await page.keyboard.press("ArrowRight");
    await page.waitForTimeout(320);
  }
}

async function openQuickJob(page) {
  await page.locator(".ps-home-app-qj, .ps-app-qj").first().click();
  await page.waitForTimeout(900);
}

async function authToPreferensi(page) {
  await page.locator(".qj-input[type='tel']").fill("081234567890");
  await page.locator(".qj-select").selectOption({ label: "UGM" });
  await page.getByRole("button", { name: /Kirim Kode OTP/i }).click();
  await page.waitForTimeout(350);
  await page.locator('input[maxlength="1"]').first().fill("1");
  await page.locator('input[maxlength="1"]').nth(1).fill("2");
  await page.locator('input[maxlength="1"]').nth(2).fill("3");
  await page.locator('input[maxlength="1"]').nth(3).fill("4");
  await page.getByRole("button", { name: /Verifikasi/i }).click();
  await page.waitForTimeout(450);
  await page.getByRole("button", { name: /Lanjut ke preferensi/i }).click();
  await page.waitForTimeout(500);
}

async function captureMahasiswa(page, suffix) {
  await goSlide14(page);
  await shot(page, `V0-slide14-deck-${suffix}.png`);
  await phoneShot(page, `V1-homescreen-${suffix}.png`);
  await openQuickJob(page);
  await page.waitForTimeout(1100);
  await phoneShot(page, `V2-splash-${suffix}.png`);
  await page.getByRole("button", { name: /Lanjut/i }).click();
  await page.waitForTimeout(550);
  await phoneShot(page, `V3-welcome-${suffix}.png`);
  await page.getByRole("button", { name: /Lewati/i }).click();
  await page.waitForTimeout(400);
  await phoneShot(page, `V4-masuk-${suffix}.png`);
  await authToPreferensi(page);
  await phoneShot(page, `V5-preferensi-${suffix}.png`);
  await page.getByRole("button", { name: /Cari Job Terdekat/i }).click();
  await page.waitForTimeout(850);
  await phoneShot(page, `V6-beranda-${suffix}.png`);
  await page.getByRole("button", { name: "Dompet", exact: true }).click();
  await page.waitForTimeout(600);
  await phoneShot(page, `V7-dompet-${suffix}.png`);
  await page.getByRole("button", { name: "Profil", exact: true }).click();
  await page.waitForTimeout(600);
  await phoneShot(page, `V8-profil-${suffix}.png`);
}

async function captureUmkm(page, suffix) {
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: "networkidle" });
  await page.waitForTimeout(500);
  await goSlide14(page);
  await openQuickJob(page);
  await page.getByRole("button", { name: /Lanjut/i }).click();
  await page.waitForTimeout(450);
  await page.getByRole("button", { name: /Lewati/i }).click();
  await page.waitForTimeout(400);
  await page.locator(".qj-input[type='tel']").fill("081298765432");
  await page.locator(".qj-select").selectOption({ label: "UGM" });
  await page.getByRole("button", { name: /Kirim Kode OTP/i }).click();
  await page.waitForTimeout(350);
  for (let i = 0; i < 4; i++) await page.locator('input[maxlength="1"]').nth(i).fill("9");
  await page.getByRole("button", { name: /Verifikasi/i }).click();
  await page.waitForTimeout(450);
  await page.getByRole("button", { name: /UMKM \/ Klien/i }).click();
  await page.getByRole("button", { name: /isi data usaha/i }).click();
  await page.waitForTimeout(600);
  await phoneShot(page, `U1-umkm-onboard1-${suffix}.png`);
  const phone = page.locator(".qj-phone");
  await phone.getByPlaceholder(/Nama yang tampil/i).fill("Kopi Klotok Pogung");
  await phone.locator("button.umkm-chip", { hasText: "Kafe" }).click();
  await phone.getByPlaceholder(/Usaha kopi mahasiswa/i).fill(
    "Kopi mahasiswa dekat kampus UGM dengan kebutuhan barista sore.",
  );
  await phone.getByRole("button", { name: /Lanjut ke lokasi/i }).click();
  await page.waitForTimeout(500);
  await phoneShot(page, `U2-umkm-onboard2-${suffix}.png`);
  await phone.getByPlaceholder(/Jl\./i).fill("Jl. Kaliurang KM 5.5, Sleman");
  await phone.locator("button.umkm-chip", { hasText: "UGM" }).first().click();
  await phone.locator("button.umkm-chip", { hasText: "≤3 km" }).click();
  await phone.getByPlaceholder(/08\.00/i).fill("08.00 – 22.00");
  await phone.getByRole("button", { name: /Lanjut ke kontak PIC/i }).click();
  await page.waitForTimeout(500);
  await phoneShot(page, `U3-umkm-onboard3-${suffix}.png`);
  await phone.getByPlaceholder(/Nama pemilik/i).fill("Budi Santoso");
  await phone.locator("button.umkm-chip", { hasText: "1–5" }).click();
  await phone.locator("button.umkm-chip", { hasText: "Barista" }).first().click();
  await phone.getByRole("button", { name: /Review data UMKM/i }).click();
  await page.waitForTimeout(500);
  await phoneShot(page, `U4-umkm-review-${suffix}.png`);
  await phone.getByRole("button", { name: /Aktifkan dashboard UMKM/i }).click();
  await page.waitForTimeout(700);
  await phoneShot(page, `U5-umkm-dashboard-${suffix}.png`);
}

async function main() {
  await mkdir(OUT, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const captures = [];

  const pageDesk = await browser.newPage({ viewport: { width: 1366, height: 900 } });
  await captureMahasiswa(pageDesk, "1366");
  captures.push(
    "V0-slide14-deck-1366.png",
    "V1-homescreen-1366.png",
    "V2-splash-1366.png",
    "V3-welcome-1366.png",
    "V4-masuk-1366.png",
    "V5-preferensi-1366.png",
    "V6-beranda-1366.png",
    "V7-dompet-1366.png",
    "V8-profil-1366.png",
  );
  await captureUmkm(pageDesk, "1366");
  captures.push(
    "U1-umkm-onboard1-1366.png",
    "U2-umkm-onboard2-1366.png",
    "U3-umkm-onboard3-1366.png",
    "U4-umkm-review-1366.png",
    "U5-umkm-dashboard-1366.png",
  );

  const pageMob = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await captureMahasiswa(pageMob, "390");
  captures.push("V5-preferensi-390.png", "V6-beranda-390.png", "V7-dompet-390.png");
  await captureUmkm(pageMob, "390");
  captures.push("U5-umkm-dashboard-390.png");

  const manifest = {
    session: new Date().toISOString(),
    baseUrl: BASE,
    viewports: ["1366x900", "390x844"],
    captures,
    checks: [
      "V6: single Dompet balance in header; stats = job/jarak/lamaran",
      "V5: inactive qj-chip readable on cream (#fffefb / #8a5f41 border)",
      "V7: dompet detail matches header balance",
      "U1–U5: UMKM onboarding before dashboard; pattern hero + chips",
      "390: no horizontal clip inside .qj-phone",
    ],
  };

  const fs = await import("node:fs/promises");
  await fs.writeFile(path.join(OUT, "visual-qa-manifest.json"), JSON.stringify(manifest, null, 2));
  console.log(JSON.stringify(manifest, null, 2));

  await browser.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});