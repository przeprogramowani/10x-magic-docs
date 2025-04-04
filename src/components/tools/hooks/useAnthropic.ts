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

      const prompt =
        action === "increase"
          ? `Rewrite this text to match complexity level ${newComplexityLevel}/10 (slightly more complex than current): <BASE_TEXT>${baseText}</BASE_TEXT>`
          : `Rewrite this text to match complexity level ${newComplexityLevel}/10 (slightly simpler than current): <BASE_TEXT>${baseText}</BASE_TEXT>`;

      const {text} = await generateText({
        model: anthropic("claude-3-haiku-20240307"),
        messages: [
          {
            role: "system",
            content: `You are a helpful developer assistant that modifies text complexity on a scale from 0-10:

            Complexity Scale:
            - 0: Very simple words like in a children's book that anyone can understand
            - 1: Article newspaper for casual non-technical readers
            - 2: Introductory tutorial for junior developers
            - 3: Technical documentation for beginners with clear explanations
            - 4: Standard documentation with moderate technical depth
            - 5: Technical blog post with specific implementation details
            - 6: Advanced tutorial with in-depth explanations and examples
            - 7: Detailed technical documentation with architecture discussions
            - 8: Engineering deep-dive with thorough analysis and edge cases
            - 9: Academic-level technical content with formal terminology
            - 10: Expert-level engineering blog with comprehensive technical depth

            You'll receive text and a target complexity level (${newComplexityLevel}/10). Rewrite the text to match that complexity while preserving the core meaning and information.

            IMPORTANT:
            - Make gradual, subtle changes appropriate for a single step on the scale
            - Do not include any markup or code blocks in your response
            - Do not add any comments or remarks about the changes you made
            - Return only the rewritten text

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
