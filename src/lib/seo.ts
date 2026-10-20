export function getSiteUrl(): URL | undefined {
  const configuredUrl = process.env.SITE_URL?.trim();

  if (!configuredUrl) {
    return undefined;
  }

  let url: URL;
  try {
    url = new URL(configuredUrl);
  } catch {
    throw new Error(
      'Invalid SITE_URL: provide an absolute URL such as "https://example.com".',
    );
  }

  if (
    (url.protocol !== "https:" && url.protocol !== "http:") ||
    url.username ||
    url.password ||
    url.pathname !== "/" ||
    url.search ||
    url.hash
  ) {
    throw new Error(
      "Invalid SITE_URL: provide an HTTP(S) origin without credentials, paths, queries, or fragments.",
    );
  }

  return new URL(url.origin);
}

export function getCanonicalUrl(pathname: string): string | undefined {
  const siteUrl = getSiteUrl();
  return siteUrl ? new URL(pathname, siteUrl).toString() : undefined;
}
