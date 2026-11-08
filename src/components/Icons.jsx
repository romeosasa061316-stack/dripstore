const S = ({ children, size = 22, ...p }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...p}
  >
    {children}
  </svg>
);

export const ChevronL = (p) => (
  <S {...p}>
    <path d="M15 5l-7 7 7 7" />
  </S>
);

export const ChevronR = (p) => (
  <S {...p}>
    <path d="M9 5l7 7-7 7" />
  </S>
);