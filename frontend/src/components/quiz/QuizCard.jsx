import { useState } from "react";

export default function QuizCard({ questions }) {
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);

  if (!questions || questions.length === 0) return null;

  const handleSelect = (qIndex, option) => {
    setAnswers({ ...answers, [qIndex]: option });
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((q, i) => {
      if (answers[i] === q.correct) score++;
    });
    return score;
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 mt-6">
      <h2 className="text-xl font-bold text-[var(--color-primary)]">
        Quiz
      </h2>

      {questions.map((q, i) => (
        <div key={i} className="mt-4">
          <p className="font-medium">{i + 1}. {q.question}</p>

          <div className="mt-2 space-y-2">
            {q.options.map((opt, idx) => {
              const isSelected = answers[i] === opt;
              const isCorrect = showResult && opt === q.correct;
              const isWrong = showResult && isSelected && opt !== q.correct;

              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(i, opt)}
                  className={`block w-full text-left p-2 rounded-lg border 
                    ${isSelected ? "bg-gray-100" : ""}
                    ${isCorrect ? "bg-green-200" : ""}
                    ${isWrong ? "bg-red-200" : ""}
                  `}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {/* ACTION */}
      <div className="mt-6 flex justify-between items-center">
        {!showResult ? (
          <button
            onClick={() => setShowResult(true)}
            className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg"
          >
            Submit Quiz
          </button>
        ) : (
          <p className="font-semibold">
            Score: {calculateScore()} / {questions.length}
          </p>
        )}
      </div>
    </div>
  );
}