/** The "NT." mark, rendered by next/og for favicons and app icons. */
export function BrandMark({ size, rounded = true }: { size: number; rounded?: boolean }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#070b14",
        color: "#f1f5f9",
        fontSize: Math.round(size * 0.5),
        fontWeight: 700,
        letterSpacing: -Math.round(size * 0.02),
        borderRadius: rounded ? Math.round(size * 0.2) : 0,
      }}
    >
      NT
      <span style={{ color: "#22d3ee" }}>.</span>
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
        NT. · {eyebrow}
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