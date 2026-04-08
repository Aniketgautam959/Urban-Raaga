import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Artist from "@/lib/models/Artist";
import { notifyBulkIndexing, BASE_URL } from "@/lib/googleIndexing";

export const dynamic = "force-dynamic";

/**
 * POST /api/admin/index-all
 * Clerk-protected. Sends URL_UPDATED notifications to Google's Indexing API
 * for every static page + every approved artist page.
 * Run this once after setting up credentials to bootstrap GSC indexing.
 */
export async function POST() {
  const { userId } = await auth();
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // --- Static pages ---
  const staticUrls = [
    `${BASE_URL}/`,
    `${BASE_URL}/services`,
    `${BASE_URL}/results`,
    `${BASE_URL}/contact`,
    `${BASE_URL}/privacy-policy`,
    `${BASE_URL}/refund-cancellation`,
  ];

  // --- Dynamic artist pages ---
  await connectDB();
  const artists = await Artist.find({ status: "approved" }, "slug").lean();
  const artistUrls = artists.map(
    (a: any) => `${BASE_URL}/artist/${a.slug}`
  );

  const allUrls = [...staticUrls, ...artistUrls];

  const results = await notifyBulkIndexing(allUrls, "URL_UPDATED");

  const succeeded = results.filter((r) => r.success).length;
  const failed = results.filter((r) => !r.success);

  return NextResponse.json({
    message: `Indexed ${succeeded}/${allUrls.length} URLs`,
    succeeded,
    failed: failed.length,
    failedUrls: failed.map((r) => ({ url: r.url, error: r.error })),
  });
}
