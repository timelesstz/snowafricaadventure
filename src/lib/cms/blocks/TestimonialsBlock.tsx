import { Star } from "lucide-react";

interface Testimonial {
  quote: string;
  author: string;
  location: string;
  trip: string;
  rating: number;
}

interface TestimonialsBlockProps {
  sectionLabel: string;
  heading: string;
  testimonials: Testimonial[];
}

export function TestimonialsBlock({ sectionLabel, heading, testimonials }: TestimonialsBlockProps) {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {sectionLabel && (
          <span className="block text-sm font-semibold text-[var(--secondary)] uppercase tracking-wider text-center mb-2">
            {sectionLabel}
          </span>
        )}
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-10">
          {heading}
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {testimonials.map((test, i) => (
            <div
              key={i}
              className="bg-white border border-[var(--border)] rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(test.rating || 5)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-[var(--text-muted)] mb-4 italic leading-relaxed">
                &ldquo;{test.quote}&rdquo;
              </p>
              <div className="border-t border-[var(--border)] pt-4">
                <p className="font-semibold">{test.author}</p>
                <p className="text-sm text-[var(--text-muted)]">{test.location}</p>
                {test.trip && (
                  <p className="text-sm text-[var(--secondary-dark)] font-medium">{test.trip}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

TestimonialsBlock.defaultProps = {
  sectionLabel: "Testimonials",
  heading: "What Our Travelers Say",
  testimonials: [
    {
      quote: "An amazing experience from start to finish!",
      author: "John D.",
      location: "United States",
      trip: "7-Day Safari",
      rating: 5,
    },
    {
      quote: "Professional and caring team. Highly recommend!",
      author: "Sarah M.",
      location: "United Kingdom",
      trip: "Kilimanjaro Trek",
      rating: 5,
    },
    {
      quote: "The trip of a lifetime. Will definitely return!",
      author: "Anna K.",
      location: "Germany",
      trip: "10-Day Combined Trip",
      rating: 5,
    },
  ],
};
