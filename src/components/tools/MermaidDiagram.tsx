import React, { useEffect, useState } from "react";
import mermaid from "mermaid";
import axios from "axios";
import { MermaidDiagramProps } from "./tools.types";

// Initialize mermaid once at module level
mermaid.initialize({
  startOnLoad: false,
  theme: "dark",
  securityLevel: "loose",
  themeVariables: {
    primaryColor: "#3B82F6",
    primaryTextColor: "#ffffff",
    primaryBorderColor: "#3B82F6",
    lineColor: "#6366F1",
    secondaryColor: "#6366F1",
    tertiaryColor: "#1a1a1a",
  },
});

type ViewMode = "preview" | "code";

export const MermaidDiagram: React.FC<MermaidDiagramProps> = ({ diagramPath, caption }) => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [diagramContent, setDiagramContent] = useState<string | null>(null);
  const [svgOutput, setSvgOutput] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("preview");

  // Fetch diagram content if a path is provided
  useEffect(() => {
    setLoading(true);
    axios
      .get(diagramPath, { responseType: "text" })
      .then((response) => {
        setDiagramContent(response.data);
        setError(null);
      })
      .catch((err) => {
        console.error("Error loading diagram file:", err);
        setError(`Failed to load diagram file: ${err.message}`);
        setLoading(false);
      });
  }, [diagramPath]);

  // Render the diagram whenever diagramContent changes
  useEffect(() => {
    if (!diagramContent) return;

    const safeDiagramContent = diagramContent;

    async function renderDiagram() {
      try {
        setLoading(true);
        const id = `mermaid-${Date.now()}`;
        let processedContent = safeDiagramContent.trim();
        if (processedContent.includes("```mermaid")) {
          processedContent = processedContent
            .replace(/```mermaid/g, "")
            .replace(/```/g, "")
            .trim();
        }
        const { svg } = await mermaid.render(id, processedContent);
        setSvgOutput(svg);
      } catch (renderError) {
        console.error("Error in mermaid.render:", renderError);
        setError(
          `Failed to render diagram: ${renderError instanceof Error ? renderError.message : "Unknown error"}`,
        );
      } finally {
        setLoading(false);
      }
    }
    renderDiagram();
  }, [diagramContent]);

  return (
    <div className="bg-[#242424] rounded-lg border border-gray-800 p-6 mb-6">
      <div className="flex justify-center mb-4">
        <div className="inline-flex rounded-lg border border-gray-700 p-1 bg-gray-800/50">
          <button
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              viewMode === "preview" ? "bg-blue-500 text-white" : "text-gray-400 hover:text-white"
            }`}
            onClick={() => setViewMode("preview")}
          >
            Preview
          </button>
          <button
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              viewMode === "code" ? "bg-blue-500 text-white" : "text-gray-400 hover:text-white"
            }`}
            onClick={() => setViewMode("code")}
          >
            Code
          </button>
        </div>
      </div>

      {loading && (
        <div className="flex justify-center items-center h-40">
          <div className="text-blue-400">Loading diagram...</div>
        </div>
      )}
      {error && (
        <div className="text-red-400 bg-red-900/20 p-4 rounded border border-red-800">{error}</div>
      )}
      {!loading && !error && (
        <>
          {viewMode === "preview" && svgOutput && (
            <div
              className="flex justify-center py-4 overflow-x-auto"
              dangerouslySetInnerHTML={{ __html: svgOutput }}
            />
          )}
          {viewMode === "code" && diagramContent && (
            <pre className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
              <code className="text-gray-300 text-sm">{diagramContent}</code>
            </pre>
          )}
        </>
      )}
      {caption && <div className="text-center text-gray-400 text-sm mt-2">{caption}</div>}
    </div>
  );
};
