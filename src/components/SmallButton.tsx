import SmallPlus from "./icons/SmallPlus";

type SmallButtonProps = {
  text: string;
  handleClick: () => void;
  IconComponent?: () => JSX.Element;
};

export default function SmallButton({
  handleClick,
  text,
  IconComponent,
}: SmallButtonProps) {
  return (
    <button className="flex justify-center items-center gap-1.5 bg-primary-dark-color text-bg-color uppercase py-2 px-3.5 rounded-smd">
      {IconComponent && <IconComponent />}
      <span>{text}</span>
    </button>
  );
}
