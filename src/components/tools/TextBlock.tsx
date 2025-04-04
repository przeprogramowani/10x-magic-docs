import React from "react";
import {TextBlockProps} from "./tools.types";
import {useOpenRouter} from "./hooks/useOpenRouter";

export const TextBlock: React.FC<TextBlockProps> = ({header, text}) => {
  const {modifyComplexity, isLoading, error} = useOpenRouter();
  const [content, setContent] = React.useState(
    typeof text === "string" ? text : ""
  );

  const handleComplexityChange = async (action: "increase" | "decrease") => {
    try {
      const newContent = await modifyComplexity(content, action);
      setContent(newContent);
    } catch (err) {
      console.error("Failed to modify content:", err);
    }
  };

  return (
    <div className='bg-[#242424] rounded-lg border border-gray-800 p-6 mb-6'>
      <div className='flex justify-between items-center mb-3'>
        <h2 className='text-xl font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent'>
          {header}
        </h2>
        <div className='flex gap-2'>
          <button
            onClick={() => handleComplexityChange("decrease")}
            disabled={isLoading}
            className='px-2 py-1 text-sm rounded bg-gray-700 text-gray-200 hover:bg-gray-600 disabled:opacity-50'
          >
            Simplify
          </button>
          <button
            onClick={() => handleComplexityChange("increase")}
            disabled={isLoading}
            className='px-2 py-1 text-sm rounded bg-gray-700 text-gray-200 hover:bg-gray-600 disabled:opacity-50'
          >
            Enhance
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
