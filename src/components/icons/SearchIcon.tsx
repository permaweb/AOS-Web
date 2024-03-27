export default function SearchIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      stroke="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.99998 11C8.76139 11 11 8.76139 11 5.99998C11 3.23857 8.76139 1 5.99998 1C3.23857 1 1 3.23857 1 5.99998C1 8.76139 3.23857 11 5.99998 11Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.53564 9.53564L13 13"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
