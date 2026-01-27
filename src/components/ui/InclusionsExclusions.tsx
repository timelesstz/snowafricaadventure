interface InclusionsExclusionsProps {
  inclusions: string[];
  exclusions: string[];
}

export function InclusionsExclusions({
  inclusions,
  exclusions,
}: InclusionsExclusionsProps) {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* Inclusions */}
      <div>
        <h4 className="font-heading font-semibold text-[var(--primary)] mb-4 flex items-center gap-2">
          <svg className="w-5 h-5 text-emerald-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
          </svg>
          Included
        </h4>
        <ul className="space-y-3">
          {inclusions.map((item, index) => (
            <li key={index} className="flex items-start gap-3">
              <svg className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
              </svg>
              <span className="text-[var(--text)]">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Exclusions */}
      <div>
        <h4 className="font-heading font-semibold text-[var(--primary)] mb-4 flex items-center gap-2">
          <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
          </svg>
          Not Included
        </h4>
        <ul className="space-y-3">
          {exclusions.map((item, index) => (
            <li key={index} className="flex items-start gap-3">
              <svg className="w-4 h-4 text-red-500 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
              </svg>
              <span className="text-[var(--text)]">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
