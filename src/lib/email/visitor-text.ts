/**
 * Checks for text that visitors type into forms which then goes out in an
 * email under the Snow Africa Adventure name (invites, share-by-email).
 *
 * Links and domains are refused outright: mail clients turn a bare
 * "example.com" into a clickable link even after HTML escaping, so escaping
 * alone doesn't stop the form being used to send phishing links.
 */
export const LINK_PATTERN = /(https?:\/\/|www\.|\b[a-z0-9-]+\.[a-z]{2,}\b)/i;

export const hasNoLinks = (value: string) => !LINK_PATTERN.test(value);

/** No markup characters and no line breaks (names, subject lines). */
export const isSingleLinePlainText = (value: string) => !/[<>\r\n]/.test(value);
