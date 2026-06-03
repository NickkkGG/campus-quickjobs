import type { ReactNode } from "react";

/**
 * Mockup iPhone di Slide 14 — yang dipresentasikan di laptop/PC.
 * Bukan layar penuh browser; konten app hidup di dalam bezel ini.
 */
export function PhoneFrame({
  children,
  isIosHome = false,
}: {
  children: ReactNode;
  isIosHome?: boolean;
}) {
  return (
    <div className="qj-phone">
      <div className="phone-frame">
        <div className="notch" aria-hidden>
          <span className="notch-speaker" />
          <span className="notch-cam" />
        </div>
        <div className={`phone-screen ${isIosHome ? "phone-screen-ios" : ""}`}>{children}</div>
      </div>
    </div>
  );
}

export function PhoneStatusBar({ dark = false }: { dark?: boolean }) {
  return (
    <div className={`ph-status ${dark ? "on-dark" : ""}`}>
      <span>9:41</span>
      <span className="ph-status-r">5G · 82%</span>
    </div>
  );
}