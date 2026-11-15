type IconProps = { size?: number };

export function Tree({ size = 18 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="7.6" r="3.2" fill="currentColor" />
      <circle cx="8.2" cy="11.2" r="3.15" fill="currentColor" />
      <circle cx="15.8" cy="11.2" r="3.15" fill="currentColor" />
      <circle cx="12" cy="12.4" r="3.3" fill="currentColor" />
      <path d="M12 13.6v7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}
