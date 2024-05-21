import { Link } from "react-router-dom";
import BreadcrumbChevron from "../icons/BreadcrumbChevron";
import { formatId } from "../../helpers/helper";

export default function Breadcrumbs({
  processId,
}: {
  processId: string | null;
}) {
  return (
    <div className="flex items-center gap-2 text-xs uppercase leading-none">
      <Link
        className="hover:ring-2 ring-offset-4 ring-light-gray-color hover:bg-light-gray-color hover:rounded-sm ring-offset-light-gray-color active:text-gray"
        to="/"
      >
        My Processes
      </Link>
      {processId && (
        <>
          <BreadcrumbChevron />
          <Link
            to={`/process/${processId}`}
            className="hover:ring-2 ring-offset-4 ring-light-gray-color hover:bg-light-gray-color hover:rounded-sm ring-offset-light-gray-color active:text-gray normal-case"
          >
            <span className="hidden md:block">{processId}</span>
            <span className="block md:hidden">{formatId(processId)}</span>
          </Link>
        </>
      )}
    </div>
  );
}
