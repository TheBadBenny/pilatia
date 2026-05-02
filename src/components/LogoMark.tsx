interface LogoMarkProps {
  className?: string;
  size?: number;
}

export function LogoMark({ className = "", size = 22 }: LogoMarkProps) {
  return (
    <svg
      viewBox="0 0 28 28"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
      fill="currentColor"
    >
      <path d="M14 2.5c4.2 3.1 7 7 7 11.7 0 4.4-2.7 8.4-7 10.3-4.3-1.9-7-5.9-7-10.3 0-4.7 2.8-8.6 7-11.7z" />
      <circle cx="14" cy="17" r="2" fill="var(--color-cream)" />
    </svg>
  );
}
