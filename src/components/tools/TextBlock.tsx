import React from "react";
import { TextBlockProps } from "./tools.types";
import { useAnthropic } from "./hooks/useAnthropic";
import { ArrowUp, ArrowDown, Dumbbell } from "lucide-react";
import ReactMarkdown from "react-markdown";

const complexityLabels = ["Beginner", "Intermediate", "Professional", "Advanced", "Expert"];

export const TextBlock: React.FC<TextBlockProps> = ({ header, text }) => {
  const { modifyComplexity, isLoading, error } = useAnthropic();
  const [content, setContent] = React.useState(text);
  const [complexityLevel, setComplexityLevel] = React.useState<number>(2); // Start at Professional level
  const [contentCache, setContentCache] = React.useState<Record<number, string>>({
    2: text, // Initialize cache with the original text at level 2 (Professional)
  });

  const handleComplexityChange = async (action: "increase" | "decrease") => {
    // Calculate new complexity level
    const newComplexityLevel =
      action === "increase" ? Math.min(complexityLevel + 1, 4) : Math.max(complexityLevel - 1, 0);

    // Don't proceed if we're already at min/max level
    if (newComplexityLevel === complexityLevel) return;

    // Check if we already have this complexity level in cache
    if (contentCache[newComplexityLevel]) {
      setContent(contentCache[newComplexityLevel]);
      setComplexityLevel(newComplexityLevel);
      return;
    }

    try {
      const newContent = await modifyComplexity(content, header, action, complexityLevel);

      // Update content and cache
      setContent(newContent);
      setContentCache((prev) => ({
        ...prev,
        [newComplexityLevel]: newContent,
      }));
      setComplexityLevel(newComplexityLevel);
    } catch (err) {
      console.error("Failed to modify content:", err);
    }
  };

  return (
    <div className="bg-[#242424] rounded-lg border border-gray-800 p-6 mb-6">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            {header}
          </h2>
        </div>
        <div className="flex gap-2 items-center">
          <span className="flex flex-row items-center gap-2 text-sm text-gray-400">
            <Dumbbell size={16} />
            <span>{complexityLabels[complexityLevel]}</span>
          </span>
          <button
            onClick={() => handleComplexityChange("decrease")}
            disabled={isLoading || complexityLevel <= 0}
            className="px-2 py-1 text-sm rounded bg-teal-700 text-teal-100 hover:bg-teal-600 disabled:opacity-50 flex items-center gap-1"
          >
            <ArrowDown size={16} />
          </button>
          <button
            onClick={() => handleComplexityChange("increase")}
            disabled={isLoading || complexityLevel >= 4}
            className="px-2 py-1 text-sm rounded bg-indigo-700 text-indigo-100 hover:bg-indigo-600 disabled:opacity-50 flex items-center gap-1"
          >
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
      <div className="text-gray-200 leading-relaxed relative prose prose-invert max-w-none">
        {isLoading && (
          <div className="absolute inset-0 bg-[#242424]/50 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
          </div>
        )}
        {error && <div className="text-red-400 mb-2 text-sm">Error: {error.message}</div>}
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  );
};
