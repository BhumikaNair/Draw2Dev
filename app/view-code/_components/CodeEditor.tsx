import React from "react";
import {
  Sandpack,
  SandpackCodeEditor,
  SandpackLayout,
  SandpackProvider,
  SandpackPreview,
} from "@codesandbox/sandpack-react";
import Constants from "@/data/Constants";

function CodeEditor({
  codeResp,
  isReady,
  showPreview = true,
}: {
  codeResp: string;
  isReady: boolean;
  showPreview?: boolean;
}) {
  return (
    <div className="rounded-xl overflow-hidden">
      {isReady ? (
        <SandpackProvider
          template="react"
          theme={{
            colors: {
              surface1: "#F8F4EC",
              surface2: "#ffffff",
              surface3: "#FF8FB7",
              clickable: "#E83C91",
              base: "#43334C",
              disabled: "#43334C66",
              hover: "#FF8FB7",
              accent: "#E83C91",
            },
            syntax: {
              plain: "#43334C",
              comment: { color: "#43334C88", fontStyle: "italic" },
              keyword: "#E83C91",
              tag: "#E83C91",
              punctuation: "#43334C",
              definition: "#FF8FB7",
              property: "#43334C",
              static: "#E83C91",
              string: "#43334C",
            },
            font: {
              body: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
              mono: '"Fira Mono", "DejaVu Sans Mono", Menlo, Consolas, "Liberation Mono", Monaco, "Lucida Console", monospace',
              size: "14px",
              lineHeight: "1.6",
            },
          }}
          customSetup={{
            dependencies: {
              ...Constants.SANDPACK_DEPENDENCIES,
            },
          }}
          files={{
            "/App.js": `${codeResp}`,
            "/index.html": `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Draw2Dev Preview</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
  <div id="root"></div>
</body>
</html>`,
          }}
          options={{
            externalResources: ["https://cdn.tailwindcss.com"],
          }}
        >
          <SandpackLayout>
            {showPreview ? (
              <SandpackPreview
                style={{
                  height: "75vh",
                  width: "100%",
                }}
                showOpenInCodeSandbox={false}
                showRefreshButton={true}
              />
            ) : (
              <SandpackCodeEditor
                style={{
                  height: "75vh",
                }}
                showTabs={false}
                showLineNumbers={true}
                showInlineErrors={true}
                wrapContent={true}
              />
            )}
          </SandpackLayout>
        </SandpackProvider>
      ) : (
        <div className="flex items-center justify-center h-[75vh] bg-gradient-to-br from-[#F8F4EC] to-white rounded-xl">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-[#FF8FB7] to-[#E83C91] flex items-center justify-center">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-[#43334C] mb-2">
              Code is being generated...
            </h3>
            <p className="text-[#43334C]/60 text-sm">
              Your production-ready code will appear here
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default CodeEditor;
