type IconProps = { size?: number };

export function Logo({ size = 22 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3.5" y="5" width="17" height="15.5" rx="3" stroke="currentColor" strokeWidth="1.75" />
      <path d="M8 3.5v3M16 3.5v3M3.5 9.5h17" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      <rect x="13.2" y="13.2" width="4.2" height="4.2" rx="1" fill="var(--leave-ink)" />
    </svg>
  );
}
