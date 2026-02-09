export default function OnboardingCard({ title, subtitle, children }) {
  return (
    <div
      className="
        bg-card
        rounded-2xl
        p-8
        border border-border
        shadow-[0_8px_24px_rgba(0,0,0,0.35)]
      "
    >
      <h2 className="text-[1.4rem] font-semibold text-text tracking-tight">
        {title}
      </h2>

      <p className="text-sm text-muted mt-1 mb-8 leading-relaxed">
        {subtitle}
      </p>

      {children}
    </div>
  );
}
