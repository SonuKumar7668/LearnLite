import { useState } from "react";

export default function TopicInput({ onSubmit, loading }) {
  const [topic, setTopic] = useState("");

  const handleSubmit = () => {
    if (!topic.trim()) return;
    onSubmit(topic);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <input
        type="text"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="Enter a topic (e.g. Photosynthesis)"
        className="flex-1 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="px-5 py-3 rounded-xl text-white bg-[var(--color-primary)] disabled:opacity-50"
      >
        {loading ? "Loading..." : "Explain"}
      </button>
    </div>
  );
}