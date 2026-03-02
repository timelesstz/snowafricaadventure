import { User, Award } from "lucide-react";
import { AUTHOR_PROFILES } from "@/lib/constants";

interface AuthorBioProps {
  authorName: string;
}

export function AuthorBio({ authorName }: AuthorBioProps) {
  const profile = AUTHOR_PROFILES[authorName];

  if (!profile) return null;

  return (
    <div className="bg-[var(--surface)] rounded-2xl p-6 border border-[var(--border)]">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-16 h-16 rounded-full bg-[var(--primary)] flex items-center justify-center">
          <User className="w-8 h-8 text-white" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-lg text-[var(--text)]">
              {profile.name}
            </h3>
            <span className="text-xs bg-[var(--primary-light)] text-[var(--primary-dark)] px-2 py-0.5 rounded-full font-medium">
              {profile.role}
            </span>
          </div>
          <p className="text-sm text-[var(--text-muted)] mb-3 leading-relaxed">
            {profile.bio}
          </p>
          <div className="flex flex-wrap gap-2">
            {profile.credentials.map((credential) => (
              <span
                key={credential}
                className="inline-flex items-center gap-1 text-xs text-[var(--text-light)] bg-white border border-[var(--border)] px-2 py-1 rounded-full"
              >
                <Award className="w-3 h-3" />
                {credential}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
