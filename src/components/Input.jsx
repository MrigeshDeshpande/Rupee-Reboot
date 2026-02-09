export default function Input({
  label,
  placeholder,
  value,
  onChange,
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-[11px] uppercase tracking-wider text-muted">
        {label}
      </label>

      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
          w-full
          bg-card
          border border-border
          rounded-xl
          px-3 py-2.5
          text-text
          placeholder:text-muted/50
          outline-none
          transition-all

          focus:border-primary
          focus:ring-1
          focus:ring-primary/40
          focus:bg-bg
        "
      />
    </div>
  );
}
