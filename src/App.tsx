import Split from "react-split";
import Editor from "./components/Editor";
import ExplorerMenu from "./components/ExplorerMenu";
import TreeView from "./components/TreeView";

export default function App() {
  return (
    <Split
      className="flex flex-row"
      gutterAlign="end"
      snapOffset={1}
      sizes={[20, 80]}
      gutterSize={5}
      cursor={"ew-resize"}
    >
      <div className="w-60 h-screen overflow-hidden border-r">
        <ExplorerMenu />
        <TreeView />
      </div>
      <Editor />
    </Split>
    // <Workspace />
  );
}
