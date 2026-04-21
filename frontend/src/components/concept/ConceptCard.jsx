export default function ConceptCard({ data }) {
  if (!data) return null;

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 mt-6">
      
      {/* TITLE */}
      <h2 className="text-2xl font-bold text-[var(--color-primary)]">
        {data.title}
      </h2>

      {/* EXPLANATION */}
      <section className="mt-4">
        <h3 className="font-semibold text-lg">Explanation</h3>
        <p className="mt-2 text-gray-700 leading-relaxed">
          {data.explanation}
        </p>
      </section>

      {/* EXAMPLE */}
      {data.example && (
        <section className="mt-4">
          <h3 className="font-semibold text-lg">Example</h3>
          <p className="mt-2 text-gray-700">
            {data.example}
          </p>
        </section>
      )}

      {/* SUMMARY */}
      {data.summary && (
        <section className="mt-4">
          <h3 className="font-semibold text-lg">Summary</h3>
          <ul className="list-disc ml-5 mt-2 text-gray-700">
            {Array.isArray(data.summary)
              ? data.summary.map((point, i) => (
                  <li key={i}>{point}</li>
                ))
              : <li>{data.summary}</li>}
          </ul>
        </section>
      )}
    </div>
  );
}