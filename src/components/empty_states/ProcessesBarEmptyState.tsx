import EmptyBoxIcon from "../icons/EmptyBoxIcon";

export default function ProcessesBarEmptyState() {
  return (
    <div className="p-5 flex flex-col gap-3 font-dm-sans">
      <EmptyBoxIcon />
      <span>
        Nothing’s here yet. You’ll see processes here when you connect or create
        them.
      </span>
    </div>
  );
}
