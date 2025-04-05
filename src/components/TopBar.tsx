import { Link } from "react-router-dom";
import { Input } from "./ui/input";
import { useApiKeyStore } from "../store/apiKey";
import { Button } from "./ui/button";
import { useState } from "react";

export default function TopBar() {
  const { apiKey, setApiKey } = useApiKeyStore();
  const [isEditing, setIsEditing] = useState(false);
  const [tempKey, setTempKey] = useState(apiKey);

  const handleSave = () => {
    setApiKey(tempKey);
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <h1 className="text-2xl font-semibold">
        <Link
          to="/"
          className="text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 transition-colors flex items-center gap-2"
        >
          <span className="text-2xl">✨</span>
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
            Magic Docs by 10xDevs
          </span>
        </Link>
      </h1>

      <div className="flex flex-col gap-2 w-full sm:w-auto">
        {isEditing ? (
          <div className="flex gap-2 items-center">
            <Input
              type="password"
              placeholder="Enter your Anthropic API key"
              value={tempKey}
              onChange={(e) => setTempKey(e.target.value)}
              className="max-w-md"
            />
            <Button onClick={handleSave} size="sm">
              Save
            </Button>
            <Button onClick={() => setIsEditing(false)} variant="outline" size="sm">
              Cancel
            </Button>
          </div>
        ) : (
          <div className="flex gap-2 items-center">
            <div className="text-sm text-neutral-600 dark:text-neutral-400">
              API Key: {apiKey ? "••••••••" : "Not set"}
            </div>
            <Button onClick={() => setIsEditing(true)} variant="outline" size="sm">
              {apiKey ? "Change" : "Set API Key"}
            </Button>
          </div>
        )}
        <p className="text-xs text-neutral-500 dark:text-neutral-400">
          The API key is being sent from your browser to the Anthropic API.
        </p>
      </div>
    </div>
  );
}
