import type { ReactNode } from "react";

/** Animasi push/pop antar layar di dalam frame HP */
export function ScreenTransition({
  screenKey,
  direction,
  children,
}: {
  screenKey: string;
  direction: 1 | -1;
  children: ReactNode;
}) {
  return (
    <div
      key={screenKey}
      className={direction === 1 ? "ph-screen-enter-fwd" : "ph-screen-enter-back"}
      style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column", width: "100%" }}
    >
      {children}
    </div>
  );
}