"use client";

import { useState, useCallback } from "react";

export interface InviteFriend {
  name: string;
  email: string;
}

interface InviteFriendsSectionProps {
  friends: InviteFriend[];
  onChange: (friends: InviteFriend[]) => void;
  maxFriends?: number;
}

export function InviteFriendsSection({
  friends,
  onChange,
  maxFriends = 5,
}: InviteFriendsSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const addFriend = useCallback(() => {
    if (friends.length < maxFriends) {
      onChange([...friends, { name: "", email: "" }]);
    }
  }, [friends, maxFriends, onChange]);

  const removeFriend = useCallback(
    (index: number) => {
      onChange(friends.filter((_, i) => i !== index));
    },
    [friends, onChange]
  );

  const updateFriend = useCallback(
    (index: number, field: keyof InviteFriend, value: string) => {
      const updated = [...friends];
      updated[index] = { ...updated[index], [field]: value };
      onChange(updated);
    },
    [friends, onChange]
  );

  return (
    <div className="border border-[var(--border)] rounded-lg overflow-hidden">
      {/* Toggle Header */}
      <button
        type="button"
        onClick={() => {
          setIsExpanded(!isExpanded);
          if (!isExpanded && friends.length === 0) {
            onChange([{ name: "", email: "" }]);
          }
        }}
        className="w-full px-4 py-3 bg-[var(--surface)] hover:bg-[var(--muted)] flex items-center justify-between text-left transition-colors"
      >
        <div className="flex items-center gap-2">
          <svg
            className="w-5 h-5 text-[var(--primary)]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
            />
          </svg>
          <span className="font-medium text-[var(--text)]">
            Invite Friends & Family
          </span>
          {friends.length > 0 && friends.some((f) => f.email) && (
            <span className="text-xs bg-[var(--primary)] text-white px-2 py-0.5 rounded-full">
              {friends.filter((f) => f.email).length}
            </span>
          )}
        </div>
        <svg
          className={`w-5 h-5 text-[var(--text-muted)] transition-transform ${
            isExpanded ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Expandable Content */}
      {isExpanded && (
        <div className="p-4 border-t border-[var(--border)] space-y-4">
          <p className="text-sm text-[var(--text-muted)]">
            Planning to climb with friends? Add their details and we&apos;ll send them
            an invitation email with all the trip information.
          </p>

          <div className="space-y-3">
            {friends.map((friend, index) => (
              <div key={index} className="flex gap-2">
                <div className="flex-1">
                  <input
                    type="text"
                    name={`inviteName${index}`}
                    value={friend.name}
                    onChange={(e) => updateFriend(index, "name", e.target.value)}
                    placeholder="Friend's name"
                    className="w-full px-3 py-2 border border-[var(--border)] rounded-md focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] text-sm"
                  />
                </div>
                <div className="flex-1">
                  <input
                    type="email"
                    name={`inviteEmail${index}`}
                    value={friend.email}
                    onChange={(e) => updateFriend(index, "email", e.target.value)}
                    placeholder="friend@email.com"
                    className="w-full px-3 py-2 border border-[var(--border)] rounded-md focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] text-sm"
                  />
                </div>
                {friends.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeFriend(index)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-md transition-colors"
                    title="Remove"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}
              </div>
            ))}
          </div>

          {friends.length < maxFriends && (
            <button
              type="button"
              onClick={addFriend}
              className="text-sm text-[var(--primary)] hover:text-[var(--primary-dark)] font-medium flex items-center gap-1"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Add Another Friend ({friends.length}/{maxFriends})
            </button>
          )}

          <p className="text-xs text-[var(--text-light)]">
            Friends will receive an email invitation when you submit this form.
          </p>
        </div>
      )}
    </div>
  );
}
