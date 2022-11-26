import {
  IconChevronRight,
  IconFile,
  IconFolder,
  IconLoader,
} from "@tabler/icons";
import { invoke } from "@tauri-apps/api";
import clsx from "clsx";
import { useState } from "react";
import { useQuery } from "react-query";
import { ITreeItem } from "./TreeView";

export const entryClasses = `cursor-pointer hover:bg-gray-700/40 flex relative items-center text-sm py-1 w-full flex-nowrap overflow-hidden`;

export function Folder({ item }: { item: ITreeItem; key: number }) {
  const [expanded, setExpanded] = useState(false);

  const getChildren = async () => {
    const items = await invoke("get_snapshot", { dir: item.fpath });
    return items as ITreeItem[];
  };

  const { data, isError, isLoading } = useQuery(
    `fetch_children_${item.fpath}`,
    getChildren
  );

  if (isError) {
    return <div>An error occurred</div>;
  }

  return (
    <div className="">
      {/* main div */}
      <div
        className={clsx(entryClasses)}
        onClick={() => setExpanded((p) => !p)}
      >
        <IconChevronRight
          className={clsx(
            "h-5 w-5 text-yellow-400 transition-all flex-shrink-0",
            expanded ? "rotate-90" : "rotate-0"
          )}
        />
        <IconFolder className="mr-1 h-5 w-5 text-yellow-400 flex-shrink-0" />
        <span className="line-clamp-1 flex-grow-0">{item.fname}</span>
        <IconLoader
          className={clsx("h-4 w-4 ml-auto", isLoading ? "block" : "hidden")}
        />
      </div>
      <div className="pl-5 transition-all">
        {expanded &&
          data?.length &&
          data.map((i, idx) => {
            if (i.ftype === "DIR") return <Folder item={i} key={idx} />;
            return <File item={i} key={idx} />;
          })}
      </div>
    </div>
  );
}

export function File({
  item,
  className,
}: {
  item: ITreeItem;
  className?: string;
}) {
  return (
    <div className={clsx(entryClasses, "gap-1", className)}>
      <IconFile className="h-5 w-5 text-cyan-400 flex-shrink-0" />
      <span className="line-clamp-1">{item.fname}</span>
    </div>
  );
}
