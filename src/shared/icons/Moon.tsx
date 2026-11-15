type IconProps = { size?: number };

export function Moon({ size = 18 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M16.2 3.4A7.8 7.8 0 1 0 20.6 14 6.1 6.1 0 0 1 16.2 3.4Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
    </svg>
  );
}
