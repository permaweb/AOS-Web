import { MouseEvent } from "react";

type SmallButtonProps = {
  text: string;
  state?: "black" | "white";
  handleClick: (e: MouseEvent) => void;
  IconComponent?: () => JSX.Element;
};

export default function SmallButton({
  handleClick,
  state = "black",
  text,
  IconComponent,
}: SmallButtonProps) {
  return (
    <button
      className={
        "flex justify-center items-center transition gap-1.5 uppercase py-2 px-3.5 rounded-smd hover:scale-[1.0125] active:opacity-50 active:scale-[.975] " +
        (state === "black"
          ? "bg-primary-dark-color text-bg-color "
          : "border-[#D6D7DC] border-1 bg-[#ECEFEF] text-primary-dark-color")
      }
      onClick={(e) => {
        handleClick(e);
      }}
    >
      {IconComponent && <IconComponent />}
      <span>{text}</span>
    </button>
  );
}
