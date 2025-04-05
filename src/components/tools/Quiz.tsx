import React, { useState } from "react";
import { QuizProps } from "./tools.types";

export const Quiz: React.FC<QuizProps> = ({ title, question }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleOptionSelect = (optionId: string) => {
    setSelectedAnswer(optionId);
  };

  const handleCheckAnswer = () => {
    if (selectedAnswer) {
      setShowExplanation(true);
    }
  };

  const handleReset = () => {
    setSelectedAnswer(null);
    setShowExplanation(false);
  };

  const isCorrect = selectedAnswer === question.correctAnswer;

  return (
    <div className="bg-[#242424] rounded-lg border border-gray-800 p-6 mb-6">
      {title && <h3 className="text-lg font-semibold mb-3 text-blue-400">{title}</h3>}

      <div className="mb-4">
        <p className="text-gray-100 font-medium mb-4">{question.question}</p>

        <div className="space-y-2">
          {question.options.map((option) => (
            <button
              key={option.id}
              onClick={() => handleOptionSelect(option.id)}
              disabled={showExplanation}
              className={`w-full text-left p-3 rounded border transition-colors ${
                selectedAnswer === option.id
                  ? showExplanation
                    ? isCorrect
                      ? "bg-green-900/30 border-green-600 text-green-200"
                      : "bg-red-900/30 border-red-600 text-red-200"
                    : "bg-blue-900/30 border-blue-600 text-blue-200"
                  : "bg-[#1e1e1e] border-gray-700 hover:border-gray-500"
              }`}
            >
              <span className="font-bold mr-2">{option.id}.</span> {option.text}
            </button>
          ))}
        </div>
      </div>

      {!showExplanation ? (
        <button
          onClick={handleCheckAnswer}
          disabled={!selectedAnswer}
          className={`px-4 py-2 rounded font-medium transition-colors ${
            selectedAnswer
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-gray-800 text-gray-500 cursor-not-allowed"
          }`}
        >
          Check Answer
        </button>
      ) : (
        <div>
          <div
            className={`mt-4 p-4 rounded ${
              isCorrect
                ? "bg-green-900/20 border border-green-800"
                : "bg-red-900/20 border border-red-800"
            }`}
          >
            <p className={`font-medium ${isCorrect ? "text-green-400" : "text-red-400"}`}>
              {isCorrect ? "✓ Correct!" : "✗ Incorrect!"}
            </p>
            {question.explanation && <p className="text-gray-300 mt-2">{question.explanation}</p>}
          </div>

          <button
            onClick={handleReset}
            className="mt-4 px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
};
