"use client";

import { useState, useCallback } from "react";
import { Users, Plus, X, Mail, User, ChevronDown, ChevronUp } from "lucide-react";

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

  const filledCount = friends.filter((f) => f.name && f.email).length;

  return (
    <div className="rounded-xl border border-slate-200 overflow-hidden bg-gradient-to-b from-slate-50 to-white">
      {/* Toggle Header */}
      <button
        type="button"
        onClick={() => {
          setIsExpanded(!isExpanded);
          if (!isExpanded && friends.length === 0) {
            onChange([{ name: "", email: "" }]);
          }
        }}
        className="w-full px-5 py-4 flex items-center justify-between text-left transition-colors hover:bg-slate-100"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
            <Users className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <span className="font-semibold text-slate-900 block">
              Traveling with Friends or Family?
            </span>
            <span className="text-sm text-slate-500">
              Invite them to join your adventure
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {filledCount > 0 && (
            <span className="text-xs bg-amber-500 text-white px-2.5 py-1 rounded-full font-medium">
              {filledCount} invited
            </span>
          )}
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-slate-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-slate-400" />
          )}
        </div>
      </button>

      {/* Expandable Content */}
      {isExpanded && (
        <div className="px-5 pb-5 pt-2 border-t border-slate-200 space-y-4">
          <p className="text-sm text-slate-600 bg-amber-50 p-3 rounded-lg border border-amber-100">
            Add your travel companions below. We&apos;ll send them an email invitation
            with all the trip details so they can join the booking.
          </p>

          <div className="space-y-3">
            {friends.map((friend, index) => (
              <div
                key={index}
                className="relative bg-white border border-slate-200 rounded-lg p-4 shadow-sm"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded">
                    Person {index + 1}
                  </span>
                  {friends.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeFriend(index)}
                      className="ml-auto p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                      title="Remove person"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      name={`inviteName${index}`}
                      value={friend.name}
                      onChange={(e) => updateFriend(index, "name", e.target.value)}
                      placeholder="Full name"
                      className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-sm transition-all outline-none"
                    />
                  </div>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="email"
                      name={`inviteEmail${index}`}
                      value={friend.email}
                      onChange={(e) => updateFriend(index, "email", e.target.value)}
                      placeholder="Email address"
                      className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-sm transition-all outline-none"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {friends.length < maxFriends && (
            <button
              type="button"
              onClick={addFriend}
              className="w-full py-3 border-2 border-dashed border-slate-300 rounded-lg text-slate-600 hover:border-amber-400 hover:text-amber-600 hover:bg-amber-50 transition-all flex items-center justify-center gap-2 font-medium"
            >
              <Plus className="w-5 h-5" />
              Add Another Person
              <span className="text-xs text-slate-400 font-normal">
                ({friends.length}/{maxFriends})
              </span>
            </button>
          )}

          <p className="text-xs text-slate-400 text-center">
            Friends will receive an invitation email when you submit this form
          </p>
        </div>
      )}
    </div>
  );
}
