import React from "react";
import {TextBlockProps} from "./tools.types";
import {useAnthropic} from "./hooks/useAnthropic";
import {ArrowUp, ArrowDown, Brain} from "lucide-react";

export const TextBlock: React.FC<TextBlockProps> = ({header, text}) => {
  const {modifyComplexity, isLoading, error} = useAnthropic();
  const [content, setContent] = React.useState(
    typeof text === "string" ? text : ""
  );
  const [complexityLevel, setComplexityLevel] = React.useState<number>(5);

  const handleComplexityChange = async (action: "increase" | "decrease") => {
    try {
      const newContent = await modifyComplexity(
        content,
        action,
        complexityLevel
      );
      setContent(newContent);
      setComplexityLevel(
        action === "increase"
          ? Math.min(complexityLevel + 1, 10)
          : Math.max(complexityLevel - 1, 0)
      );
    } catch (err) {
      console.error("Failed to modify content:", err);
    }
  };

  return (
    <div className='bg-[#242424] rounded-lg border border-gray-800 p-6 mb-6'>
      <div className='flex justify-between items-center mb-3'>
        <div className='flex items-center gap-3'>
          <h2 className='text-xl font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent'>
            {header}
          </h2>
          <span className='flex flex-row items-center gap-1 text-xs text-gray-500'>
            <Brain size={24} /> {complexityLevel}/10
          </span>
        </div>
        <div className='flex gap-2'>
          <button
            onClick={() => handleComplexityChange("decrease")}
            disabled={isLoading}
            className='px-2 py-1 text-sm rounded bg-lime-700 text-lime-100 hover:bg-lime-600 disabled:opacity-50 flex items-center gap-1'
          >
            <ArrowDown size={16} /> Simpler
          </button>
          <button
            onClick={() => handleComplexityChange("increase")}
            disabled={isLoading}
            className='px-2 py-1 text-sm rounded bg-indigo-700 text-indigo-100 hover:bg-indigo-600 disabled:opacity-50 flex items-center gap-1'
          >
            <ArrowUp size={16} /> Complex
          </button>
        </div>
      </div>
      <div className='text-gray-200 leading-relaxed relative'>
        {isLoading && (
          <div className='absolute inset-0 bg-[#242424]/50 flex items-center justify-center'>
            <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400'></div>
          </div>
        )}
        {error && (
          <div className='text-red-400 mb-2 text-sm'>
            Error: {error.message}
          </div>
        )}
        {typeof text === "string" ? <p>{content}</p> : text}
      </div>
    </div>
  );
};
