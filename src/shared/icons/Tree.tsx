type IconProps = { size?: number };

export function Tree({ size = 18 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 3.5 6.2 13h11.6L12 3.5Z" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" />
      <path d="M12 13v7.2" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}
