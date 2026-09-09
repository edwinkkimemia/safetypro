// Canonical site URL. safetypro.co.ke is the live production domain and must
// be the ONLY domain that appears in emails, invoices, receipts, OG tags,
// sitemaps and payment callback URLs. Override with NEXT_PUBLIC_SITE_URL only
// for local/staging testing.
function resolveSiteUrl(): string {
  const fallback = "https://www.safetypro.co.ke";
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return fallback;
  const withoutTrailingSlash = raw.replace(/\/+$/, "");
  if (!withoutTrailingSlash) return fallback;
  const withProtocol = /^https?:\/\//i.test(withoutTrailingSlash) ? withoutTrailingSlash : `https://${withoutTrailingSlash}`;
  try {
    const parsed = new URL(withProtocol);
    return parsed.origin;
  } catch {
    return fallback;
  }
}

export const siteUrl = resolveSiteUrl();
