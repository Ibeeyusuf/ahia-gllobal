"use client";

interface ToggleProps {
  on: boolean;
  onChange: (v: boolean) => void;
  size?: "sm" | "md";
}

export function Toggle({ on, onChange, size = "md" }: ToggleProps) {
  const track = size === "sm"
    ? "w-10 h-[22px]" : "w-12 h-[26px]";
  const thumb = size === "sm"
    ? "w-4 h-4 top-[3px]" : "w-5 h-5 top-[3px]";
  const offLeft = "left-[3px]";
  const onLeft  = size === "sm" ? "left-[22px]" : "left-[25px]";

  return (
    <div
      className={`${track} rounded-full relative cursor-pointer flex-shrink-0 transition-colors duration-200 ${on ? "bg-green-500" : "bg-neutral-200"}`}
      onClick={() => onChange(!on)}>
      <div className={`${thumb} ${offLeft} ${on ? onLeft : ""} absolute bg-white rounded-full shadow transition-all duration-200`} />
    </div>
  );
}
