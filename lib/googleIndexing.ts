import { GoogleAuth } from "google-auth-library";

const INDEXING_ENDPOINT =
  "https://indexing.googleapis.com/v3/urlNotifications:publish";

export const BASE_URL = "https://www.bangaloresinger.in";

/**
 * Sends a URL notification to Google's Indexing API.
 * Requires a Google Service Account with the Indexing API enabled,
 * added as an owner in Google Search Console.
 *
 * Env vars needed:
 *   GOOGLE_INDEXING_CLIENT_EMAIL  — service account email
 *   GOOGLE_INDEXING_PRIVATE_KEY   — service account private key (with \\n escaped)
 */
export async function notifyGoogleIndexing(
  url: string,
  type: "URL_UPDATED" | "URL_DELETED" = "URL_UPDATED"
): Promise<{ success: boolean; url: string; error?: string }> {
  const clientEmail = process.env.GOOGLE_INDEXING_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_INDEXING_PRIVATE_KEY?.replace(
    /\\n/g,
    "\n"
  );

  if (!clientEmail || !privateKey) {
    console.warn(
      "[Indexing API] Missing GOOGLE_INDEXING_CLIENT_EMAIL or GOOGLE_INDEXING_PRIVATE_KEY. Skipping."
    );
    return { success: false, url, error: "Missing credentials" };
  }

  try {
    const auth = new GoogleAuth({
      credentials: {
        client_email: clientEmail,
        private_key: privateKey,
      },
      scopes: ["https://www.googleapis.com/auth/indexing"],
    });

    const client = await auth.getClient();
    const res = await (client as any).request({
      url: INDEXING_ENDPOINT,
      method: "POST",
      data: { url, type },
    });

    console.log(`[Indexing API] ✅ Notified Google for: ${url}`, res.data);
    return { success: true, url };
  } catch (err: any) {
    const msg = err?.response?.data?.error?.message || err.message;
    console.error(`[Indexing API] ❌ Failed for: ${url} →`, msg);
    return { success: false, url, error: msg };
  }
}

/**
 * Notifies Google about a specific artist page (URL_UPDATED or URL_DELETED).
 */
export async function notifyArtistIndexing(
  slug: string,
  type: "URL_UPDATED" | "URL_DELETED" = "URL_UPDATED"
) {
  const url = `${BASE_URL}/artist/${slug}`;
  return notifyGoogleIndexing(url, type);
}

/**
 * Bulk-notifies Google about multiple URLs.
 * Used for initial indexing of all existing approved artists.
 */
export async function notifyBulkIndexing(
  urls: string[],
  type: "URL_UPDATED" | "URL_DELETED" = "URL_UPDATED"
) {
  const results = await Promise.allSettled(
    urls.map((url) => notifyGoogleIndexing(url, type))
  );

  const summary = results.map((r, i) =>
    r.status === "fulfilled"
      ? r.value
      : { success: false, url: urls[i], error: "Promise rejected" }
  );

  const succeeded = summary.filter((r) => r.success).length;
  const failed = summary.filter((r) => !r.success).length;

  console.log(
    `[Indexing API] Bulk done — ✅ ${succeeded} succeeded, ❌ ${failed} failed`
  );
  return summary;
}
