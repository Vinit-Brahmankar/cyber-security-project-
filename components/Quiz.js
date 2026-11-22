"use client";

import { useEffect, useRef, useState } from "react";

const LABEL = { phishing: "Phishing", legitimate: "Legitimate" };

export default function Quiz({ questions }) {
  // State lives only in this page: Restart or a refresh begins again.
  const [current, setCurrent] = useState(0);
  const [picked, setPicked] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const focusRef = useRef(null);
  const mounted = useRef(false);

  const total = questions.length;
  const q = questions[current];
  const answered = picked !== null;
  const correct = answered && picked === q.answer;
  const isLast = current === total - 1;

  // Move focus to the new content after each step so keyboard and screen reader users follow along.
  // Skipped on first load so the page doesn't jump.
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    focusRef.current?.focus({ preventScroll: false });
  }, [current, finished, answered]);

  function answer(choice) {
    if (answered) return;
    setPicked(choice);
    if (choice === q.answer) setScore((s) => s + 1);
  }

  function next() {
    if (isLast) {
      setFinished(true);
    } else {
      setCurrent((c) => c + 1);
      setPicked(null);
    }
  }

  function restart() {
    setCurrent(0);
    setPicked(null);
    setScore(0);
    setFinished(false);
  }

  if (finished) {
    const message =
      score === total
        ? "Every one right. You know what to look for."
        : score >= total - 1
          ? "Nearly all right. Read the explanations for the one you missed."
          : "Worth another go. Slow down on urgent requests, links and attachments.";
    return (
      <section className="quiz-done" aria-live="polite">
        <h2 ref={focusRef} tabIndex={-1}>
          You scored {score} of {total}
        </h2>
        <p>{message}</p>
        <p className="quiz-done__tip">
          When in doubt, check with the sender through a channel you already know, and report
          anything suspicious to the operations lead.
        </p>
        <button type="button" className="button button--primary" onClick={restart}>
          Restart quiz
        </button>
      </section>
    );
  }

  return (
    <div className="quiz">
      <div className="quiz__progress">
        <span>
          Email {current + 1} of {total}
        </span>
        <span>{score} right so far</span>
      </div>

      <article className="email" aria-label={`Example email ${current + 1}`}>
        <dl className="email__head">
          <div>
            <dt>From</dt>
            <dd>{q.from}</dd>
          </div>
          <div>
            <dt>Subject</dt>
            <dd className="email__subject">{q.subject}</dd>
          </div>
        </dl>
        <p className="email__body">{q.body}</p>
      </article>

      {!answered ? (
        <div className="quiz__choices">
          <p ref={focusRef} tabIndex={-1} className="quiz__ask">
            Is this email phishing or legitimate?
          </p>
          <div className="quiz__buttons">
            <button type="button" className="button choice" onClick={() => answer("phishing")}>
              Phishing
            </button>
            <button type="button" className="button choice" onClick={() => answer("legitimate")}>
              Legitimate
            </button>
          </div>
        </div>
      ) : (
        <section className={`verdict ${correct ? "verdict--right" : "verdict--wrong"}`} aria-live="polite">
          <h2 ref={focusRef} tabIndex={-1}>
            {correct ? "Correct" : "Not quite"}: this one is {LABEL[q.answer].toLowerCase()}.
          </h2>
          <p>{q.explanation}</p>
          <button type="button" className="button button--primary" onClick={next}>
            {isLast ? "See your score" : "Next email"}
          </button>
        </section>
      )}
    </div>
  );
}
