"use client";

import { useState, useCallback } from "react";
import {
  getFacebookShareUrl,
  getTwitterShareUrl,
  getWhatsAppShareUrl,
  getEmailShareUrl,
  copyToClipboard,
  canUseWebShare,
  nativeShare,
  buildShareUrl,
  type DepartureShareData,
  getDepartureShareContent,
  getDefaultShareContent,
} from "@/lib/share";

interface ShareButtonsProps {
  departure?: DepartureShareData;
  variant?: "inline" | "dropdown" | "icons-only";
  size?: "sm" | "md";
  showLabels?: boolean;
  onShare?: (platform: string) => void;
  onInviteClick?: () => void;
  className?: string;
}

const ShareIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
    />
  </svg>
);

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const TwitterIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const EmailIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
);

const CopyIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
    />
  </svg>
);

const CheckIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

const UserPlusIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
    />
  </svg>
);

export function ShareButtons({
  departure,
  variant = "inline",
  size = "md",
  showLabels = false,
  onShare,
  onInviteClick,
  className = "",
}: ShareButtonsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const content = departure
    ? getDepartureShareContent(departure)
    : getDefaultShareContent();

  const iconSize = size === "sm" ? "w-4 h-4" : "w-5 h-5";
  const buttonSize = size === "sm" ? "p-1.5" : "p-2";

  const handleShare = useCallback(
    (platform: string) => {
      onShare?.(platform);
      setIsOpen(false);
    },
    [onShare]
  );

  const handleNativeShare = useCallback(async () => {
    const success = await nativeShare(content);
    if (success) {
      handleShare("native");
    }
  }, [content, handleShare]);

  const handleCopyLink = useCallback(async () => {
    const url = buildShareUrl(content.url, {
      source: "copy-link",
      medium: "referral",
      campaign: "group-departure-share",
      departureId: departure?.id,
    });

    const success = await copyToClipboard(url);
    if (success) {
      setCopied(true);
      handleShare("copy");
      setTimeout(() => setCopied(false), 2000);
    }
  }, [content.url, departure?.id, handleShare]);

  const handleFacebookShare = useCallback(() => {
    window.open(getFacebookShareUrl(content.url), "_blank", "width=600,height=400");
    handleShare("facebook");
  }, [content.url, handleShare]);

  const handleTwitterShare = useCallback(() => {
    window.open(getTwitterShareUrl(content.url, content.text), "_blank", "width=600,height=400");
    handleShare("twitter");
  }, [content.url, content.text, handleShare]);

  const handleWhatsAppShare = useCallback(() => {
    window.open(getWhatsAppShareUrl(content.url, content.text), "_blank");
    handleShare("whatsapp");
  }, [content.url, content.text, handleShare]);

  const handleEmailShare = useCallback(() => {
    window.location.href = getEmailShareUrl(
      content.url,
      content.emailSubject || content.title,
      content.emailBody || content.text
    );
    handleShare("email");
  }, [content, handleShare]);

  // Mobile: Show native share button
  if (canUseWebShare() && variant === "inline") {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <button
          type="button"
          onClick={handleNativeShare}
          className={`${buttonSize} rounded-full bg-[var(--surface)] hover:bg-[var(--muted)] text-[var(--text-muted)] transition-colors`}
          title="Share"
        >
          <ShareIcon className={iconSize} />
        </button>
        {onInviteClick && (
          <button
            type="button"
            onClick={onInviteClick}
            className={`${buttonSize} rounded-full bg-[var(--primary-light)] hover:bg-[var(--primary)] text-white transition-colors`}
            title="Invite Friends"
          >
            <UserPlusIcon className={iconSize} />
          </button>
        )}
      </div>
    );
  }

  // Dropdown variant
  if (variant === "dropdown") {
    return (
      <div className={`relative ${className}`}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`${buttonSize} rounded-full bg-[var(--surface)] hover:bg-[var(--muted)] text-[var(--text-muted)] transition-colors flex items-center gap-1`}
        >
          <ShareIcon className={iconSize} />
          {showLabels && <span className="text-sm">Share</span>}
        </button>

        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-[var(--border)] z-50 py-1">
              <button
                type="button"
                onClick={handleFacebookShare}
                className="w-full px-4 py-2 text-left hover:bg-[var(--surface)] flex items-center gap-3 text-sm"
              >
                <FacebookIcon className="w-4 h-4 text-[#1877F2]" />
                Facebook
              </button>
              <button
                type="button"
                onClick={handleTwitterShare}
                className="w-full px-4 py-2 text-left hover:bg-[var(--surface)] flex items-center gap-3 text-sm"
              >
                <TwitterIcon className="w-4 h-4 text-[#000]" />
                X (Twitter)
              </button>
              <button
                type="button"
                onClick={handleWhatsAppShare}
                className="w-full px-4 py-2 text-left hover:bg-[var(--surface)] flex items-center gap-3 text-sm"
              >
                <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
                WhatsApp
              </button>
              <button
                type="button"
                onClick={handleEmailShare}
                className="w-full px-4 py-2 text-left hover:bg-[var(--surface)] flex items-center gap-3 text-sm"
              >
                <EmailIcon className="w-4 h-4 text-[var(--text-muted)]" />
                Email
              </button>
              <hr className="my-1 border-[var(--border)]" />
              <button
                type="button"
                onClick={handleCopyLink}
                className="w-full px-4 py-2 text-left hover:bg-[var(--surface)] flex items-center gap-3 text-sm"
              >
                {copied ? (
                  <>
                    <CheckIcon className="w-4 h-4 text-green-600" />
                    <span className="text-green-600">Copied!</span>
                  </>
                ) : (
                  <>
                    <CopyIcon className="w-4 h-4 text-[var(--text-muted)]" />
                    Copy Link
                  </>
                )}
              </button>
              {onInviteClick && (
                <>
                  <hr className="my-1 border-[var(--border)]" />
                  <button
                    type="button"
                    onClick={() => {
                      onInviteClick();
                      setIsOpen(false);
                    }}
                    className="w-full px-4 py-2 text-left hover:bg-[var(--surface)] flex items-center gap-3 text-sm text-[var(--primary)]"
                  >
                    <UserPlusIcon className="w-4 h-4" />
                    Invite Friends
                  </button>
                </>
              )}
            </div>
          </>
        )}
      </div>
    );
  }

  // Icons only variant
  if (variant === "icons-only") {
    return (
      <div className={`flex items-center gap-1 ${className}`}>
        <button
          type="button"
          onClick={handleFacebookShare}
          className={`${buttonSize} rounded-full hover:bg-[var(--surface)] text-[#1877F2] transition-colors`}
          title="Share on Facebook"
        >
          <FacebookIcon className={iconSize} />
        </button>
        <button
          type="button"
          onClick={handleTwitterShare}
          className={`${buttonSize} rounded-full hover:bg-[var(--surface)] text-[#000] transition-colors`}
          title="Share on X"
        >
          <TwitterIcon className={iconSize} />
        </button>
        <button
          type="button"
          onClick={handleWhatsAppShare}
          className={`${buttonSize} rounded-full hover:bg-[var(--surface)] text-[#25D366] transition-colors`}
          title="Share on WhatsApp"
        >
          <WhatsAppIcon className={iconSize} />
        </button>
        <button
          type="button"
          onClick={handleEmailShare}
          className={`${buttonSize} rounded-full hover:bg-[var(--surface)] text-[var(--text-muted)] transition-colors`}
          title="Share via Email"
        >
          <EmailIcon className={iconSize} />
        </button>
        <button
          type="button"
          onClick={handleCopyLink}
          className={`${buttonSize} rounded-full hover:bg-[var(--surface)] transition-colors ${
            copied ? "text-green-600" : "text-[var(--text-muted)]"
          }`}
          title={copied ? "Copied!" : "Copy Link"}
        >
          {copied ? <CheckIcon className={iconSize} /> : <CopyIcon className={iconSize} />}
        </button>
      </div>
    );
  }

  // Default inline variant (desktop)
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <button
        type="button"
        onClick={handleFacebookShare}
        className={`${buttonSize} rounded-full bg-[#1877F2] hover:bg-[#1565c0] text-white transition-colors`}
        title="Share on Facebook"
      >
        <FacebookIcon className={iconSize} />
      </button>
      <button
        type="button"
        onClick={handleTwitterShare}
        className={`${buttonSize} rounded-full bg-black hover:bg-gray-800 text-white transition-colors`}
        title="Share on X"
      >
        <TwitterIcon className={iconSize} />
      </button>
      <button
        type="button"
        onClick={handleWhatsAppShare}
        className={`${buttonSize} rounded-full bg-[#25D366] hover:bg-[#1da851] text-white transition-colors`}
        title="Share on WhatsApp"
      >
        <WhatsAppIcon className={iconSize} />
      </button>
      <button
        type="button"
        onClick={handleEmailShare}
        className={`${buttonSize} rounded-full bg-[var(--text-muted)] hover:bg-[var(--text)] text-white transition-colors`}
        title="Share via Email"
      >
        <EmailIcon className={iconSize} />
      </button>
      <button
        type="button"
        onClick={handleCopyLink}
        className={`${buttonSize} rounded-full ${
          copied
            ? "bg-green-600 text-white"
            : "bg-[var(--surface)] hover:bg-[var(--muted)] text-[var(--text-muted)]"
        } transition-colors`}
        title={copied ? "Copied!" : "Copy Link"}
      >
        {copied ? <CheckIcon className={iconSize} /> : <CopyIcon className={iconSize} />}
      </button>
      {onInviteClick && (
        <button
          type="button"
          onClick={onInviteClick}
          className={`${buttonSize} px-3 rounded-full bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white transition-colors flex items-center gap-1.5 text-sm font-medium`}
          title="Invite Friends"
        >
          <UserPlusIcon className={iconSize} />
          {showLabels && <span>Invite</span>}
        </button>
      )}
    </div>
  );
}

// Compact share button for table rows
export function ShareButton({
  departure,
  onInviteClick,
  className = "",
}: {
  departure?: DepartureShareData;
  onInviteClick?: () => void;
  className?: string;
}) {
  return (
    <ShareButtons
      departure={departure}
      variant="dropdown"
      size="sm"
      onInviteClick={onInviteClick}
      className={className}
    />
  );
}

// Post-submission share CTA
export function PostSubmissionShare({
  departure,
  className = "",
}: {
  departure?: DepartureShareData;
  className?: string;
}) {
  return (
    <div className={`text-center ${className}`}>
      <p className="text-[var(--text-muted)] mb-3">Share this adventure with friends!</p>
      <ShareButtons
        departure={departure}
        variant="icons-only"
        size="md"
        className="justify-center"
      />
      <p className="text-sm text-[var(--primary)] mt-2 font-medium">
        Climb together, save together!
      </p>
    </div>
  );
}
