import SmallButton from "../SmallButton";
import CloseIcon from "../icons/CloseIcon";

type ProcessModalProps = {
  closeModal: () => void;
  text: string;
  placeholder: string;
  buttonText: string;
};

export default function ProcessModal({
  closeModal,
  text,
  buttonText,
  placeholder,
}: ProcessModalProps) {
  return (
    <div
      className="fixed left-0 top-0 right-0 bottom-0 flex items-center justify-center  font-roboto-mono text-primary-dark-color text-base bg-primary-dark-color/50 z-50"
      onClick={closeModal}
    >
      <div
        className="bg-bg-color p-5 rounded-lg flex flex-col w-full max-w-md gap-5 animate-scale-in"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="flex justify-between">
          <span className="uppercase">{text}</span>
          <button onClick={closeModal} className="base-transition">
            <CloseIcon />
          </button>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="createProcessName">
            <input
              type="text"
              className="px-4 py-3 outline outline-light-gray-color bg-bg-color outline-1 rounded-lg leading-none font-dm-sans 
            placeholder:text-gray-text-color focus:outline-primary-dark-color transition-colors w-full"
              placeholder={placeholder}
              name="createProcessName"
            ></input>
          </label>
          <SmallButton
            text={buttonText}
            state="larger"
            handleClick={() => {}}
          />
        </div>
      </div>
    </div>
  );
}
