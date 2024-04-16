interface TerminalEmptyStateProps {
  showConnectModal: (val: boolean) => void;
  showCreateModal: (val: boolean) => void;
}

export default function TerminalEmptyState({
  showConnectModal,
  showCreateModal,
}: TerminalEmptyStateProps) {

  const handleCreateProcess = () => {
    showConnectModal(false);
    showCreateModal(true);
  };

  const handleConnectProcess = () => {
    showCreateModal(false);
    showConnectModal(true);
  };


  return (
    <div className="flex flex-grow items-center justify-center p-5">
      <div className="flex flex-col gap-5 max-w-80 w-full">
        <div className="flex flex-col gap-1 max-w-64">
          <span className="uppercase font-bold">Get Started</span>
          <div className="font-dm-sans">
            Create or choose a process. When your process has been selected you
            can run commands below.
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <button
            className="p-5 border-1 rounded-2xl transition border-[#B9C3DD] bg-gradient-to-r from-[#E9ECED] to-[#EFF2F1] flex flex-col gap-3 items-center justify-center h-36 hover:border-primary-dark-color base-transition"
            onClick={handleCreateProcess}
          >
            <svg
              width="36"
              height="36"
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.55556 23.6667L14.2222 18L8.55556 12.3333M19.8889 23.6667H27.4444M10.0667 35H25.9333C29.107 35 30.6938 35 31.9059 34.3824C32.9722 33.8391 33.8391 32.9722 34.3824 31.9059C35 30.6938 35 29.107 35 25.9333V10.0667C35 6.89304 35 5.30622 34.3824 4.09405C33.8391 3.0278 32.9722 2.16091 31.9059 1.61763C30.6938 1 29.107 1 25.9333 1H10.0667C6.89304 1 5.30622 1 4.09405 1.61763C3.0278 2.16091 2.16091 3.0278 1.61763 4.09405C1 5.30622 1 6.89304 1 10.0667V25.9333C1 29.107 1 30.6938 1.61763 31.9059C2.16091 32.9722 3.0278 33.8391 4.09405 34.3824C5.30622 35 6.89304 35 10.0667 35Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <div className="flex flex-col">
              <span className="uppercase text-base font-bold">
                Create a new process
              </span>
              <span className="font-dm-sans">
                You need a wallet to be connected.
              </span>
            </div>
          </button>
          <button
            className="p-5 border-1 rounded-2xl transition border-medium-gray-color bg-very-light-gray flex flex-col gap-3 items-center justify-center h-36 hover:border-primary-dark-color base-transition"
            onClick={handleConnectProcess}
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.16117 23.8388L1.21143 30.7886M18.182 5.33275L22.3033 1.21143M26.6673 13.818L30.7886 9.69671M27.9602 21.0104L10.9896 4.03985M13.1109 6.16117L25.8388 18.8891L20.182 24.5459C17.0578 27.6701 11.9925 27.6701 8.86828 24.5459L7.45407 23.1317C4.32987 20.0075 4.32987 14.9422 7.45407 11.818L13.1109 6.16117Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <div className="flex flex-col">
              <span className="uppercase text-base font-bold">
                Connect to a process
              </span>
              <span className="font-dm-sans">You’ll need a process id.</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
