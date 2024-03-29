type ToggleProps = {
  on: boolean;
};

export default function Toggle({ on }: ToggleProps) {
  return (
    <div className="rounded-full bg-light-gray-color min-w-10 min-h-6 w-10 h-6 relative">
      <div
        className={
          "absolute text-bg-color transition-transform left-0.5 top-0 bottom-0 my-auto min-h-5 min-w-5 h-5 w-5 rounded-full flex items-center justify-center bg-primary-dark-color " +
          (on ? "translate-x-4" : "-rotate-90")
        }
      >
        {on ? <CheckIcon /> : <CancelIcon />}
      </div>
    </div>
  );
}

const CheckIcon = () => (
  <svg
    width="10"
    height="10"
    viewBox="0 0 10 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1 5L4.2 9L9 1"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CancelIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2.875 2.875L9.125 9.125"
      stroke="#F2F2F2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle
      cx="6"
      cy="6"
      r="5"
      stroke="#F2F2F2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
