type IconProps = { size?: number };

export function Broom({ size = 18 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M14.5 4 8.2 14" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      <path d="M5.8 14.2h9.2" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      <path d="M7 14.2 6.1 20M9.4 14.2 9 20M11.8 14.2 11.8 20M14.2 14.2l.7 5.8" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}
