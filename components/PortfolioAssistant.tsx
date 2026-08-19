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
      <div className="terminal__bar" aria-hidden="true">
        <div className="terminal__dots"><span/><span/><span/></div>
        <span className="terminal__title">parash.portfolio</span>
        <span className={`terminal__status${isLoading ? " is-busy" : ""}`}>
          <i /> {isLoading ? "thinking" : "ready"}
        </span>
      </div>

      <div className="assistant__conversation" aria-live="polite">
        {submittedQuestion && (
          <p className="assistant__question"><b aria-hidden="true">›</b> {submittedQuestion}</p>
        )}
        <p className="terminal__answer">
          {isLoading ? "Reviewing the public portfolio…" : error || answer}
        </p>
      </div>

      <p className="assistant__suggestions-label">Suggested prompts</p>
      <div className="assistant__suggestions" aria-label="Suggested questions">
        {suggestions.map((suggestion, index) => (
          <button
            key={suggestion}
            type="button"
            onClick={() => void askQuestion(suggestion)}
            disabled={isLoading}
          >
            <span className="assistant__suggestion-index">0{index + 1}</span>
            <span>{suggestion}</span>
            <span className="assistant__suggestion-arrow" aria-hidden="true">↗</span>
          </button>
        ))}
      </div>

      <form className="assistant__form" onSubmit={handleSubmit}>
        <label className="sr-only" htmlFor="portfolio-question">Ask Parash&apos;s portfolio a question</label>
        <span className="assistant__prompt" aria-hidden="true">›</span>
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
          {isLoading ? "Asking…" : "Ask →"}
        </button>
      </form>
      <p className="assistant__note">Answers are limited to public portfolio information.</p>
    </div>
  );
}
