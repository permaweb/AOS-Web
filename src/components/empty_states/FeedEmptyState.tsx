export default function FeedEmptyState() {
  return (
    <div className="w-full h-full flex items-center justify-center p-5">
      <div className="flex flex-col gap-1 max-w-52">
        <span className="uppercase font-bold">This is your feed</span>
        <div className="font-dm-sans">
          Outputs from your commands will show up here.
        </div>
      </div>
    </div>
  );
}
