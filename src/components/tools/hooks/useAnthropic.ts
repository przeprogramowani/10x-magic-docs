import { useState } from "react";
import { generateText } from "ai";
import { createAnthropic } from "@ai-sdk/anthropic";

const MODEL_NAME = "claude-3-5-haiku-20241022";

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
    currentComplexity: number,
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
    currentComplexity: number,
  ): Promise<string> => {
    setIsLoading(true);
    setError(null);

    try {
      // Update complexity level based on action
      const newComplexityLevel =
        action === "increase"
          ? Math.min(currentComplexity + 1, 4)
          : Math.max(currentComplexity - 1, 0);

      const prompt = `<SUBJECT>${header}</SUBJECT> <DESCRIPTION>${baseText}</DESCRIPTION> <TARGET_COMPLEXITY>${newComplexityLevel}</TARGET_COMPLEXITY>`;

      const { text } = await generateText({
        model: anthropic(MODEL_NAME),
        messages: [
          {
            role: "system",
            content: `You are a helpful developer assistant that modifies text complexity on a scale from 0 to 4, representing distinct levels of technical understanding:

            Complexity Scale:
            0 - Beginner: Simple explanations using everyday language. Avoid technical terms. Perfect for complete beginners with no technical background. Use analogies and real-world examples.

            1 - Intermediate: Basic technical concepts introduced. Use entry-level programming terms. Suitable for junior developers or tech-savvy individuals. Include simple code references where relevant.

            2 - Professional: Standard technical terminology and industry-standard explanations. Aimed at working developers. Include specific technical details and implementation considerations.

            3 - Advanced: Deep technical insights and architectural considerations. For senior developers and tech leads. Cover advanced patterns, trade-offs, and system design aspects.

            4 - Expert: Highly technical and specialized knowledge. For principal engineers and architects. Include complex technical concepts, theoretical foundations, and cutting-edge approaches.

            You will be given a SUBJECT and a DESCRIPTION of the SUBJECT. The goal is to adjust the DESCRIPTION to match the TARGET_COMPLEXITY level (0-4).

            IMPORTANT:
            - Return only the rewritten DESCRIPTION
            - Each level should have a clear and distinct difference in complexity
            - Maintain technical accuracy while adjusting the complexity
            - Use appropriate markdown formatting
            - Focus on making substantial changes in terminology and concept depth between levels
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
      const error = err instanceof Error ? err : new Error("Failed to modify text complexity");
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
