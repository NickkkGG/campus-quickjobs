import type { ReactNode } from "react";

/** Root layar di dalam frame HP — flex column, tidak overflow keluar frame */
export function PhoneApp({
  children,
  className = "",
  variant = "cream",
}: {
  children: ReactNode;
  className?: string;
  variant?: "cream" | "plain" | "chat";
}) {
  return <div className={`ph-app ph-app--${variant} ${className}`.trim()}>{children}</div>;
}

/** Area scroll — min-height 0 agar flex tidak jebol */
export function PhoneScroll({
  children,
  className = "",
  tabBar = false,
  pad = true,
}: {
  children: ReactNode;
  className?: string;
  tabBar?: boolean;
  pad?: boolean;
}) {
  return (
    <div
      className={[
        "ps-app-scroll",
        tabBar ? "has-tabs" : "",
        pad ? "ps-app-scroll--pad" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );
}

/** Footer sticky (tombol utama) */
export function PhoneFooter({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`ps-app-footer ${className}`.trim()}>{children}</div>;
}

/** Bar atas: back + judul */
export function PhoneTopBar({
  onBack,
  title,
  subtitle,
}: {
  onBack?: () => void;
  title?: string;
  subtitle?: string;
}) {
  return (
    <div className="ps-app-bar">
      {onBack ? (
        <button type="button" className="ps-app-bar-back" onClick={onBack}>
          <span aria-hidden>‹</span> Kembali
        </button>
      ) : (
        <span />
      )}
      {(title || subtitle) && (
        <div className="ps-app-bar-titles">
          {title && <strong>{title}</strong>}
          {subtitle && <span>{subtitle}</span>}
        </div>
      )}
    </div>
  );
}