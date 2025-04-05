import React, { useEffect, useState } from "react";
import { CodeSnippetProps } from "./tools.types";

export const CodeSnippet: React.FC<CodeSnippetProps> = ({
  code,
  language = "typescript",
  fileName,
  showLineNumbers = true,
}) => {
  const [highlightedCode, setHighlightedCode] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    // Import highlight.js dynamically
    import("highlight.js").then((hljs) => {
      import(/* @vite-ignore */ `highlight.js/lib/languages/${language}`)
        .then((languageModule) => {
          hljs.default.registerLanguage(language, languageModule.default);
          const highlighted = hljs.default.highlight(code, { language }).value;
          setHighlightedCode(highlighted);
        })
        .catch(() => {
          // Fallback if language is not supported
          const highlighted = hljs.default.highlightAuto(code).value;
          setHighlightedCode(highlighted);
        });
    });
  }, [code, language]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getLineNumbers = () => {
    const lines = code.split("\n").length;
    return Array.from({ length: lines }, (_, i) => i + 1).join("\n");
  };

  return (
    <div className="bg-[#1a1a1a] rounded-lg border border-gray-800 mb-6 overflow-hidden">
      {fileName && (
        <div className="bg-[#242424] px-4 py-2 border-b border-gray-800 flex justify-between items-center">
          <span className="text-gray-300 font-mono text-sm">{fileName}</span>
          <button
            onClick={copyToClipboard}
            className="text-xs px-2 py-1 rounded bg-blue-900 hover:bg-blue-800 text-blue-200 transition-colors"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      )}
      <div className="relative overflow-auto">
        <pre className="p-4 overflow-x-auto flex">
          {showLineNumbers && (
            <div className="text-gray-500 pr-4 text-right select-none border-r border-gray-700 mr-4">
              {getLineNumbers()}
            </div>
          )}
          <code
            className={`language-${language}`}
            dangerouslySetInnerHTML={{ __html: highlightedCode }}
          />
        </pre>
      </div>
    </div>
  );
};
