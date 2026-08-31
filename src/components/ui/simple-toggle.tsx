"use client";

interface SwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  "aria-label"?: string;
}

/** A plain pill switch, on-brand (no decorative artwork) — see dos-and-donts.tsx. */
function Switch({ checked, defaultChecked, onCheckedChange, ...rest }: SwitchProps) {
  return (
    <label className="relative inline-flex h-7 w-12 cursor-pointer items-center">
      <input
        type="checkbox"
        className="peer sr-only"
        checked={checked}
        defaultChecked={defaultChecked}
        onChange={(e) => onCheckedChange?.(e.target.checked)}
        {...rest}
      />
      <span className="absolute inset-0 rounded-full bg-muted transition-colors peer-checked:bg-primary" />
      <span className="absolute left-1 size-5 rounded-full bg-background shadow-sm transition-transform peer-checked:translate-x-5" />
    </label>
  );
}

export default Switch;
