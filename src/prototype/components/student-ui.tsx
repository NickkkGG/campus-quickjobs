import { ChevronLeft, ChevronRight, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export const APP_USER_NAME = "User";

export function ProtoBack({ onBack, label = "Kembali" }: { onBack: () => void; label?: string }) {
  return (
    <button type="button" className="qj-back ps-tap" onClick={onBack}>
      <ChevronLeft size={18} />
      <span>{label}</span>
    </button>
  );
}

export function ProtoBtnPrimary({
  children,
  onClick,
  disabled = false,
  icon,
}: {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  icon?: boolean;
}) {
  return (
    <button type="button" className="qj-btn-primary ps-tap" onClick={onClick} disabled={disabled}>
      {children}
      {icon !== false && <ChevronRight size={18} />}
    </button>
  );
}

export function ProtoBtnGhost({ children, onClick }: { children: ReactNode; onClick?: () => void }) {
  return (
    <button type="button" className="qj-btn-ghost ps-tap" onClick={onClick}>
      {children}
    </button>
  );
}

export function ProtoPageHero({
  icon: Icon,
  color,
  title,
  subtitle,
}: {
  icon: LucideIcon;
  color: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="qj-page-hero">
      <div className="qj-icon-ring" style={{ boxShadow: `0 14px 36px ${color}35` }}>
        <Icon size={36} style={{ color }} />
      </div>
      <h2 className="ph-onboard-title">{title}</h2>
      <p className="ph-onboard-desc">{subtitle}</p>
    </div>
  );
}

export function ProtoSectionLabel({ children }: { children: ReactNode }) {
  return <h3 className="qj-section-label">{children}</h3>;
}

export function ProtoChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button type="button" className={`qj-chip ps-tap ${active ? "on" : ""}`} onClick={onClick}>
      {label}
    </button>
  );
}