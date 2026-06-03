import type { ReactNode } from "react";

export function BottomSheet({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}) {
  if (!open) return null;
  return (
    <>
      <div className="qj-sheet-backdrop" onClick={onClose} role="presentation" />
      <div className="qj-sheet-panel" role="dialog" aria-modal="true">
        <div className="qj-sheet-handle" />
        {children}
      </div>
    </>
  );
}