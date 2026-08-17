"use client";

import { FormEvent, useState } from "react";

const suggestions = [
  "Tell me about Parash.",
  "What has Parash built?",
  "What did Parash do before AWS?",
  "What does Parash enjoy outside work?",
];

type AssistantResponse = {
  answer?: string;
  error?: string;
};

export function PortfolioAssistant() {
  const [question, setQuestion] = useState("");
  const [submittedQuestion, setSubmittedQuestion] = useState("");
  const [answer, setAnswer] = useState(
    "Ask about Parash, his journey, engineering experience, completed projects, or interests outside work.",
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function askQuestion(nextQuestion: string) {
    const trimmedQuestion = nextQuestion.trim();

    if (trimmedQuestion.length < 3 || isLoading) {
      return;
    }

    setSubmittedQuestion(trimmedQuestion);
    setAnswer("");
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: trimmedQuestion }),
      });
      const payload = (await response.json()) as AssistantResponse;

      if (!response.ok || !payload.answer) {
        throw new Error(payload.error || "The assistant could not answer that question.");
      }

      setAnswer(payload.answer);
      setQuestion("");
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "The assistant is temporarily unavailable.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void askQuestion(question);
  }

  return (
    <div className="terminal assistant" aria-busy={isLoading}>
      <div className="terminal__bar" aria-hidden="true"><span/><span/><span/></div>

      <div className="assistant__conversation" aria-live="polite">
        {submittedQuestion && (
          <p className="assistant__question"><b aria-hidden="true">›</b> {submittedQuestion}</p>
        )}
        <p className="terminal__answer">
          {isLoading ? "Reviewing the public portfolio…" : error || answer}
        </p>
      </div>

      <div className="assistant__suggestions" aria-label="Suggested questions">
        {suggestions.map((suggestion) => (
          <button
            key={suggestion}
            type="button"
            onClick={() => void askQuestion(suggestion)}
            disabled={isLoading}
          >
            {suggestion}
          </button>
        ))}
      </div>

      <form className="assistant__form" onSubmit={handleSubmit}>
        <label className="sr-only" htmlFor="portfolio-question">Ask Parash&apos;s portfolio a question</label>
        <input
          id="portfolio-question"
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          maxLength={300}
          minLength={3}
          placeholder="Ask about Parash, his experience, or projects…"
          autoComplete="off"
          disabled={isLoading}
          required
        />
        <button type="submit" disabled={isLoading || question.trim().length < 3}>
          {isLoading ? "Asking…" : "Ask"}
        </button>
      </form>
      <p className="assistant__note">Answers are limited to public portfolio information.</p>
    </div>
  );
}
