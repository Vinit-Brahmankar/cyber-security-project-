import questions from "@/data/quiz.json";
import Quiz from "@/components/Quiz";

export const metadata = { title: "Phishing quiz" };

export default function QuizPage() {
  return (
    <div className="wrap">
      <header className="page-head">
        <h1>Phishing quiz</h1>
        <p className="page-head__lede">
          Read each example email and decide whether it is phishing or legitimate. After each
          answer you&apos;ll see what gives it away.
        </p>
        <p className="page-head__meta">
          All emails are made up and use example addresses. Nothing is saved.
        </p>
      </header>

      <Quiz questions={questions} />
    </div>
  );
}
