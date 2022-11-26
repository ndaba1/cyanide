import Monaco from "@monaco-editor/react";

export default function Editor() {
  return (
    <div className="w-full h-screen overflow-hidden">
      <div className="h-10 border-b"></div>
      <Monaco
        className="w-full h-[calc(100vh-3rem)]"
        defaultLanguage="javascript"
        theme="darcula"
      />
    </div>
  );
}
