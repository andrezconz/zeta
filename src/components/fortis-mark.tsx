export function FortisMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <path
        d="M16 2 28 7.5v9C28 24.5 22.5 28.8 16 30 9.5 28.8 4 24.5 4 16.5v-9L16 2Z"
        stroke="currentColor"
        strokeWidth="1.6"
        className="text-gold"
      />
      <path d="M16 9v14M11.5 13h9" stroke="currentColor" strokeWidth="1.6" className="text-gold" />
    </svg>
  );
}
