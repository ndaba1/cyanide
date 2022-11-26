import { invoke } from "@tauri-apps/api";
import { useQuery } from "react-query";
import { File, Folder } from "./Entries";

export interface ITreeItem {
  fpath: string;
  ftype: "DIR" | "FILE" | "SYMLINK";
  size: number;
  fname: string;
  created_at: string;
  updated_at: string;
}

export default function TreeView() {
  const walkDir = async () => {
    const values = await invoke("get_snapshot", { dir: "." });
    return values as ITreeItem[];
  };

  const { data, status } = useQuery("dir_snapshot", walkDir);

  if (status === "error") {
    <div className="text-lg">
      An error occurred while trying to load the file structure
    </div>;
  }

  return (
    <div className="h-[calc(100vh-3rem)] overflow-y-scroll scrollbar-hidden pb-8">
      {data?.map((i, idx) => {
        return (
          <div className="cursor-pointer select-none" key={idx}>
            {i.ftype === "DIR" ? (
              <Folder item={i} key={idx} />
            ) : (
              <File item={i} className="pl-5" />
            )}
          </div>
        );
      })}
    </div>
  );
}
