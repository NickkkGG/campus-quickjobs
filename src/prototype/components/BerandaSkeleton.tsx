export function BerandaSkeleton() {
  return (
    <div className="ps-app-scroll has-tabs ps-app-scroll--pad ps-pad">
      <div className="qj-skeleton qj-skeleton-map" />
      <div className="qj-skeleton" style={{ height: 36, marginBottom: 10 }} />
      <div className="qj-skeleton-card qj-skeleton" />
      <div className="qj-skeleton-card qj-skeleton" />
      <div className="qj-skeleton-card qj-skeleton" />
    </div>
  );
}