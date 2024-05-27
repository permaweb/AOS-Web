import { Link } from "react-router-dom";
import CopyIcon from "../icons/CopyIcon";
import CopyCheck from "../icons/CopyCheck";
import { useState } from "react";
import StatusLoadingIcon from "../icons/StatusLoadingIcon";

type ProcessListItemProps = {
  process: { id: string; name: string };
  active: boolean;
};

export default function ProcessListItem({
  process,
  active,
}: ProcessListItemProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(process.id).then(() => {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 1000);
    });
  };

  return (
    <div className="font-dm-sans tracking-wider flex relative ">
      <Link
        to={`/process/${process?.id}`}
        className="peer flex min-w-0 items-center py-1.5 pl-5 pr-2 flex-grow relative z-[1] transition-opacity active:opacity-25"
      >
        <div className="overflow-hidden truncate flex-grow min-w-0">
          {process.name}
        </div>
        <div className="tabular-nums min-w-14 font-roboto-mono">
          #{process.id.slice(0, 5)}
        </div>
      </Link>

      <div
        className={`absolute left-0 top-0 right-0 bottom-0 transition  peer-active:opacity-25
          ${active ? " bg-light-gray-color" : " peer-hover:bg-[#e7e7e7] "}`}
      />
      <div className="py-1 pr-5 flex items-center transition-opacity peer-active:opacity-25 ">
        <div className="relative">
          <button
            onClick={handleCopy}
            className={`base-transition ${
              active
                ? "hover:bg-medium-gray-color"
                : "hover:bg-light-gray-color"
            } hover:text-primary-dark-color p-2 rounded-lg`}
          >
            {copied ? <CopyCheck /> : <CopyIcon />}
          </button>
          {copied && (
            <div className="absolute right-full mr-2 md:left-full  bottom-0  top-0 md:right-auto md:ml-2 md:mr-0 flex justify-end select-none z-10">
              <div className="animate-slide-in-right md:animate-slide-in-left min-w-max bg-primary-dark-color text-white px-2.5 py-1 rounded-md">
                Copied ID!
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function EmptyProcessListItem() {
  return (
    <div className="font-dm-sans tracking-wider flex relative text-gray-text-color">
      <div className="peer flex min-w-0 items-center py-1.5 pl-5 pr-2 flex-grow ">
        <div className="overflow-hidden truncate gap-2 items-center flex flex-grow min-w-0">
          <StatusLoadingIcon />
          <span>Loading...</span>
        </div>
        <div className="tabular-nums min-w-14 font-roboto-mono text-transparent">
          #ABCDE
        </div>
      </div>
      <div className="py-1 pr-5 flex items-center  ">
        <div className="text-transparent p-2  ">
          <CopyIcon />
        </div>
      </div>
    </div>
  );
}
