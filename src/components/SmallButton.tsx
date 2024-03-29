import { MouseEvent } from "react";

type SmallButtonProps = {
  text: string;
  state?: "black" | "white" | "larger";
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
        (state === "larger"
          ? "uppercase py-3 px-4 rounded-lg"
          : "uppercase py-2 px-3.5 rounded-smd") +
        " flex justify-center items-center base-transition gap-1.5  " +
        (state !== "white"
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
