import React from "react";
import { ResourcesProps } from "./tools.types";
import { Link as LinkIcon } from "lucide-react";

export const Resources: React.FC<ResourcesProps> = ({ title, links }) => {
  return (
    <div className="bg-[#242424] rounded-lg border border-gray-800 p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
        {title}
      </h2>

      <ul className="space-y-4">
        {links.map((link, index) => (
          <li key={index} className="border-b border-gray-700 pb-3 last:border-0">
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition-colors font-medium text-lg flex items-center"
            >
              <LinkIcon className="mr-2" size={18} />
              {link.title}
            </a>
            {link.description && <p className="text-gray-400 mt-1 pl-6">{link.description}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
};
