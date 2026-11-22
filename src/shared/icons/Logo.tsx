type IconProps = { size?: number };

// Monogramme Wajitech (design.wajitech.fr/logos/svg/wajitech-mark.svg) :
// W en couleur du texte, barre toujours dorée.
export function Logo({ size = 22 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <path d="M7 16 L19 47 L32 25 L44 47" stroke="currentColor" strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="50" y="14" width="7" height="34" rx="1.5" fill="var(--color-primary)" />
    </svg>
  );
}
