import { Link } from "react-router-dom";
import {
  MyProcessesContext,
  ProcessProps,
} from "../../context/ProcessesContext";
import GlobalIcon from "../icons/GlobalIcon";
import { useContext } from "react";
import ProcessesBarEmptyState from "../empty_states/ProcessesBarEmptyState";

type ProcessListItemProps = ProcessProps & {
  active: boolean;
};

type ProcessListProps = {
  currentId: string;
};

function ProcessListItem({ id, isGlobal, active }: ProcessListItemProps) {
  return (
    <Link
      to={`/process/${id}`}
      className={
        " font-dm-sans tracking-wide tabular-nums " +
        (active ? "bg-light-gray-color" : "")
      }
    >
      <div className="base-transition flex gap-2 items-center py-1.5 pl-5 pr-2 ">
        <span className="truncate max-w-28">{id}</span>
        {isGlobal ? <GlobalIcon /> : <div className="w-3" />}
      </div>
    </Link>
  );
}

export default function ProcessList({ currentId }: ProcessListProps) {
  const { myProcesses } = useContext(MyProcessesContext);

  if (myProcesses.length > 0) {
    return (
      <div className="flex flex-col flex-grow">
        {myProcesses.map((process) => (
          <ProcessListItem
            key={process.id}
            {...process}
            active={currentId === process.id}
          />
        ))}
      </div>
    );
  }
  return <ProcessesBarEmptyState />;
}
