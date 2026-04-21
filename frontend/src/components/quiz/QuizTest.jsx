import { useState } from "react";

const optionMap = ["A", "B", "C", "D"];

export default function QuizTest({ questions }) {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  if (!Array.isArray(questions)) {
    return <p className="text-center text-red-500">Invalid quiz data</p>;
  }

  const handleSelect = (qIndex, optionIndex) => {
    if (submitted) return;

    setAnswers({
      ...answers,
      [qIndex]: optionIndex,
    });
  };

  const getScoreData = () => {
    let correct = 0;

    questions.forEach((q, i) => {
      const correctIndex = optionMap.indexOf(q.correct);
      if (answers[i] === correctIndex) correct++;
    });

    return {
      correct,
      total: questions.length,
      wrong: questions.length - correct,
    };
  };

  const scoreData = submitted ? getScoreData() : null;

  return (
  <div className="max-w-[680px] mx-auto">

    {/* SCORE HEADER */}
    {submitted && (
      <div className="border border-white/[0.08] rounded-xl bg-white/[0.03] p-10 mb-8 text-center relative overflow-hidden">
        <div
          className="absolute -top-16 -right-16 w-48 h-48 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(232,197,71,0.08) 0%, transparent 70%)" }}
        />
        <p
          className="text-[11px] tracking-[0.14em] uppercase text-[#e8c547] mb-4"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Quiz complete
        </p>
        <p className="text-[72px] font-normal leading-none text-[#e8c547] mb-2">
          {scoreData.correct}/{scoreData.total}
        </p>
        <p
          className="text-[14px] font-light text-[#f87171]/70"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          {scoreData.wrong} wrong answer{scoreData.wrong !== 1 ? "s" : ""}
        </p>
      </div>
    )}

    {/* QUESTIONS */}
    <div className="flex flex-col gap-5">
      {questions.map((q, i) => {
        const correctIndex = optionMap.indexOf(q.correct);
        const userAnswer = answers[i];

        return (
          <div
            key={i}
            className="border border-white/[0.08] rounded-xl bg-white/[0.03] p-8 relative overflow-hidden"
          >
            {/* subtle glow on each card */}
            <div
              className="absolute -top-10 -right-10 w-32 h-32 rounded-full pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(232,197,71,0.04) 0%, transparent 70%)" }}
            />

            {/* QUESTION */}
            <p
              className="text-[11px] tracking-[0.12em] uppercase text-[#e8c547] mb-3"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Question {i + 1}
            </p>
            <p className="text-[18px] font-normal leading-[1.5] mb-6">
              {q.question}
            </p>

            {/* OPTIONS */}
            <div className="flex flex-col gap-2.5">
              {q.options.map((opt, idx) => {
                const selected = userAnswer === idx;
                const isCorrect = idx === correctIndex;
                const isWrong = submitted && selected && !isCorrect;
                const showCorrect = submitted && isCorrect;

                let borderColor = "rgba(240,236,227,0.08)";
                let bgColor = "rgba(255,255,255,0.02)";
                let textColor = "rgba(240,236,227,0.5)";
                let labelColor = "rgba(240,236,227,0.25)";

                if (showCorrect) {
                  borderColor = "rgba(74,222,128,0.35)";
                  bgColor = "rgba(74,222,128,0.06)";
                  textColor = "#4ade80";
                  labelColor = "#4ade80";
                } else if (isWrong) {
                  borderColor = "rgba(248,113,113,0.35)";
                  bgColor = "rgba(248,113,113,0.06)";
                  textColor = "#f87171";
                  labelColor = "#f87171";
                } else if (!submitted && selected) {
                  borderColor = "rgba(232,197,71,0.4)";
                  bgColor = "rgba(232,197,71,0.05)";
                  textColor = "#e8c547";
                  labelColor = "#e8c547";
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelect(i, idx)}
                    disabled={submitted}
                    className="w-full text-left px-5 py-3.5 rounded-[6px] border transition-all duration-200 flex items-center gap-3 cursor-pointer disabled:cursor-default"
                    style={{
                      borderColor,
                      background: bgColor,
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    <span
                      className="text-[11px] font-medium tracking-wide shrink-0 w-5"
                      style={{ color: labelColor }}
                    >
                      {optionMap[idx]}.
                    </span>
                    <span
                      className="text-[14px] font-light leading-[1.55]"
                      style={{ color: textColor }}
                    >
                      {opt}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* CORRECT ANSWER HINT */}
            {submitted && userAnswer !== correctIndex && (
              <div
                className="mt-4 flex items-center gap-2 text-[13px] font-light text-[#4ade80]/70"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                <span className="text-[#4ade80]">✓</span>
                Correct answer: {optionMap[correctIndex]}. {q.options[correctIndex]}
              </div>
            )}

            {/* EXPLANATION */}
            {submitted && (
              <div
                className="mt-4 px-5 py-4 rounded-[6px] border border-white/[0.06] bg-white/[0.02]"
              >
                <p
                  className="text-[11px] tracking-[0.1em] uppercase text-[#e8c547]/60 mb-1"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  Explanation
                </p>
                <p
                  className="text-[13px] font-light text-[#f0ece3]/45 leading-[1.7]"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {q.explanation}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>

    {/* SUBMIT */}
    {!submitted && (
      <div className="mt-8 text-center">
        <button
          onClick={() => setSubmitted(true)}
          className="px-10 py-3.5 bg-[#e8c547] text-[#0a0f1e] text-[14px] font-medium rounded-[4px] border-none cursor-pointer tracking-[0.02em] hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(232,197,71,0.3)] transition-all duration-200"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Submit Test →
        </button>
      </div>
    )}
  </div>
);
}