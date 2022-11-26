import {
  IconFilePlus,
  IconFolderPlus,
  IconMinimize,
  IconRefresh,
} from "@tabler/icons";
import clsx from "clsx";

export default function ExplorerMenu() {
  const iconClasses =
    "h-5 w-5 stroke-2 rounded-md hover:bg-gray-600/20 cursor-pointer";
  return (
    <div className="w-full h-10 border-b border-gray-300/30 sticky top-0 flex flex-row items-center justify-between p-2">
      <div className="justify-start font-semibold uppercase text-sm">
        Explorer
      </div>
      <div className="flex flex-row items-center justify-end gap-2">
        <IconFilePlus className={clsx(iconClasses)} />
        <IconFolderPlus className={iconClasses} />
        <IconRefresh className={iconClasses} />
        <IconMinimize className={iconClasses} />
      </div>
    </div>
  );
}
