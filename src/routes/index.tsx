import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: QuickJobDeck,
  head: () => ({
    meta: [
      { title: "QuickJob Campus · Pitch Deck & iOS Prototype" },
      { name: "description", content: "QuickJob Campus pitch deck and iOS prototype." },
    ],
  }),
});

function QuickJobDeck() {
  return (
    <div style={{ position: "fixed", inset: 0, background: "#F3E4C9" }}>
      <iframe
        src="/quickjob.html"
        title="QuickJob Campus Deck"
        style={{ width: "100%", height: "100%", border: "0", display: "block" }}
      />
    </div>
  );
}
