import {useState} from "react";
import {generateText} from "ai";
import {createAnthropic} from "@ai-sdk/anthropic";

const anthropic = createAnthropic({
  apiKey: import.meta.env.VITE_ANTHROPIC_API_KEY,
  baseURL: "/v1",
  headers: {
    "anthropic-dangerous-direct-browser-access": "true",
  },
});

interface UseAnthropicReturn {
  modifyComplexity: (
    text: string,
    header: string,
    action: "increase" | "decrease",
    currentComplexity: number
  ) => Promise<string>;
  isLoading: boolean;
  error: Error | null;
}

export const useAnthropic = (): UseAnthropicReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const modifyComplexity = async (
    baseText: string,
    header: string,
    action: "increase" | "decrease",
    currentComplexity: number
  ): Promise<string> => {
    setIsLoading(true);
    setError(null);

    try {
      // Update complexity level based on action
      const newComplexityLevel =
        action === "increase"
          ? Math.min(currentComplexity + 1, 10)
          : Math.max(currentComplexity - 1, 0);

      const prompt = `<SUBJECT>${header}</SUBJECT> <DESCRIPTION>${baseText}</DESCRIPTION> <TARGET_COMPLEXITY>${newComplexityLevel * 10}%</TARGET_COMPLEXITY>`;

      const {text} = await generateText({
        model: anthropic("claude-3-haiku-20240307"),
        messages: [
          {
            role: "system",
            content: `You are a helpful developer assistant that modifies text complexity on a scale from 0 to 100%:

            Complexity Scale:
            0% - Kindergarten story with extremely simple words and concepts
            10% - Elementary school level with basic vocabulary and short sentences
            20% - Middle school level with straightforward explanations
            30% - High school level with some technical terms introduced
            40% - Junior developer level with basic programming concepts
            50% - Regular developer level with standard technical terminology
            60% - Experienced developer with more advanced concepts
            70% - Senior developer with detailed technical explanations (add code snippet)
            80% - Technical lead with specialized domain knowledge (add code snippet)
            90% - Principal engineer with advanced theoretical concepts (add code snippet)
            100% - Technical paragraph for senior engineers with highly specialized jargon (add code snippet)

            You will be given a SUBJECT and a DESCRIPTION of the SUBJECT. The goal is to adjust the DESCRIPTION to match the TARGET_COMPLEXITY.

            Return nothing but the rewritten DESCRIPTION of the SUBJECT based on the target complexity while preserving the core meaning and information.

            IMPORTANT:
            - Return only updated DESCRIPTION of the SUBJECT based on the target complexity
            - Make gradual changes appropriate for a single step on the scale
            - Markdown formatting is allowed and encouraged in the output
            - Return nothing but therewritten text on certain subject
            - YOU ARE NOT allowed to add comments like "Here is the description of the subject with a n-% increase in complexity:"
            `,
          },
          {
            role: "user",
            content: prompt,
          },
        ],
      });

      return text;
    } catch (err) {
      const error =
        err instanceof Error
          ? err
          : new Error("Failed to modify text complexity");
      setError(error);
      throw error;
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
