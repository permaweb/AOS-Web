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
    <button
      className="flex justify-center items-center transition gap-1.5 bg-primary-dark-color text-bg-color uppercase py-2 px-3.5 rounded-smd hover:scale-[1.0125] active:opacity-50 active:scale-[.975]"
      onClick={handleClick}
    >
      {IconComponent && <IconComponent />}
      <span>{text}</span>
    </button>
  );
}
