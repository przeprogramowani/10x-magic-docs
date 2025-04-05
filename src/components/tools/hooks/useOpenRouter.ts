import { useState } from "react";

type ComplexityAction = "increase" | "decrease";

interface UseOpenRouterOptions {
  model?: string;
}

interface UseOpenRouterResult {
  modifyComplexity: (text: string, action: ComplexityAction) => Promise<string>;
  isLoading: boolean;
  error: Error | null;
}

export const useOpenRouter = ({
  model = "openai/gpt-3.5-turbo",
}: UseOpenRouterOptions = {}): UseOpenRouterResult => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
  const API_URL = "https://openrouter.ai/api/v1/chat/completions";

  const modifyComplexity = async (text: string, action: ComplexityAction): Promise<string> => {
    if (!OPENROUTER_API_KEY) {
      throw new Error("OpenRouter API key is not configured");
    }

    setIsLoading(true);
    setError(null);

    try {
      const prompt =
        action === "increase"
          ? `Make the following text more complex and detailed while maintaining its core meaning:\n\n${text}`
          : `Simplify the following text while maintaining its core meaning:\n\n${text}`;

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        },
        body: JSON.stringify({
          model,
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response from OpenRouter");
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (err) {
      setError(err instanceof Error ? err : new Error("An error occurred"));
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    modifyComplexity,
    isLoading,
    error,
  };
};
