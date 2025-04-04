import React from "react";
import {TextBlockProps} from "./tools.types";

export const TextBlock: React.FC<TextBlockProps> = ({header, text}) => {
  return (
    <div className='bg-[#242424] rounded-lg border border-gray-800 p-6 mb-6'>
      <h2 className='text-xl font-semibold mb-3 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent'>
        {header}
      </h2>
      <div className='text-gray-200 leading-relaxed'>
        {typeof text === "string" ? <p>{text}</p> : text}
      </div>
    </div>
  );
};
