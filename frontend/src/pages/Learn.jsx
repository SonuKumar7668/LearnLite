import { useState } from "react";
import TopicInput from "../component/concept/TopicInput";
import ConceptCard from "../component/concept/ConceptCard";
import QuizCard from "../component/quiz/QuizCard";

export default function Learn() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (topic) => {
    if (!topic) return;

    setLoading(true);
    setError("");
    setData(null);

    try {
      const res = await fetch("http://localhost:5000/api/concept", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ topic }),
      });

      if (!res.ok) throw new Error("Failed to fetch");

      const result = await res.json();
      setData(result);
    } catch (err) {
        console.log(err);
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg)] px-6 py-10">

      {/* HEADER */}
      <h1 className="text-3xl font-bold text-center text-[var(--color-primary)]">
        Learn a Concept
      </h1>

      {/* INPUT */}
      <div className="mt-8 max-w-xl mx-auto">
        <TopicInput onSubmit={handleSubmit} />
      </div>

      {/* STATES */}
      <div className="mt-10 max-w-3xl mx-auto">

        {loading && <LoadingSkeleton />}

        {error && (
          <p className="text-red-500 text-center">{error}</p>
        )}

        {data && (
          <>
            <ConceptCard data={data} />
            <QuizCard questions={data.quiz} />
          </>
        )}
      </div>
    </div>
  );
}