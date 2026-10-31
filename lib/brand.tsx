/** The "N" brand monogram, rendered by next/og for favicons and app icons. */
export function BrandMark({ size, rounded = true }: { size: number; rounded?: boolean }) {
  const borderWidth = Math.max(1, Math.round(size * 0.035));
  const borderRadius = rounded ? Math.round(size * 0.24) : 0;
  const fontSize = Math.round(size * 0.58);

  return (
    <div
      style={{
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        borderRadius,
        border: `${borderWidth}px solid rgba(34, 211, 238, 0.45)`,
        background: "#080d1a",
        backgroundImage:
          "radial-gradient(circle at 50% 32%, rgba(34, 211, 238, 0.28) 0%, rgba(59, 130, 246, 0.14) 45%, transparent 75%), linear-gradient(150deg, #0f172a 0%, #080d1a 60%, #030712 100%)",
        boxShadow: `inset 0 1px 1px 0 rgba(255, 255, 255, 0.2), 0 0 ${Math.round(size * 0.15)}px rgba(34, 211, 238, 0.2)`,
        overflow: "hidden",
      }}
    >
      <span
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#ffffff",
          fontSize,
          fontWeight: 800,
          fontFamily: "system-ui, -apple-system, sans-serif",
          letterSpacing: "-0.03em",
          lineHeight: 1,
        }}
      >
        N
      </span>
    </div>
  );
}

/** 1200x630 social card. Flex-only layout (next/og does not support grid). */
export function OgCard({
  eyebrow,
  title,
  subtitle,
  footer,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  footer: string;
}) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        background: "#070b14",
        backgroundImage:
          "radial-gradient(circle at 88% 8%, rgba(34,211,238,0.25), transparent 45%), radial-gradient(circle at 8% 100%, rgba(139,92,246,0.2), transparent 50%)",
        color: "#f1f5f9",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", fontSize: 30, color: "#22d3ee" }}>
        Nirajan. · {eyebrow}
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            display: "flex",
            fontSize: title.length > 26 ? 68 : 88,
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: -2,
          }}
        >
          {title}
        </div>
        <div style={{ display: "flex", marginTop: 24, fontSize: 36, color: "#94a3b8" }}>
          {subtitle}
        </div>
      </div>
      <div style={{ display: "flex", fontSize: 28, color: "#64748b" }}>{footer}</div>
    </div>
  );
}