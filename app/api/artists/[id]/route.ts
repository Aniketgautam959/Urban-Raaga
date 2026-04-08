import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Artist from "@/lib/models/Artist";
import { notifyArtistIndexing } from "@/lib/googleIndexing";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

type Params = { params: { id: string } };

// GET /api/artists/:id
export async function GET(_req: NextRequest, { params }: Params) {
  await connectDB();
  const artist = await Artist.findById(params.id).lean();
  if (!artist) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ artist });
}

// PUT /api/artists/:id — Clerk protected
export async function PUT(req: NextRequest, { params }: Params) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const body = await req.json();

  // Fetch previous status before update to detect approval transition
  const prevArtist = await Artist.findById(params.id).lean() as any;

  try {
    const artist = await Artist.findByIdAndUpdate(params.id, body, { new: true, runValidators: true }).lean() as any;
    if (!artist) return NextResponse.json({ error: "Not found" }, { status: 404 });

    // 🔍 If artist just became "approved" (or is approved and profile data changed), ping Google
    if (artist.slug) {
      const justApproved = prevArtist?.status !== "approved" && artist.status === "approved";
      const alreadyApprovedAndUpdated = artist.status === "approved";

      if (justApproved || alreadyApprovedAndUpdated) {
        notifyArtistIndexing(artist.slug, "URL_UPDATED").catch((e) =>
          console.error("[Indexing API] PUT notify error:", e)
        );
      }
    }

    return NextResponse.json({ artist });
  } catch (error: any) {
    if (error.code === 11000) {
      return NextResponse.json({ error: "An artist with this name/slug already exists." }, { status: 400 });
    }
    return NextResponse.json({ error: error.message || "Failed to update artist" }, { status: 400 });
  }
}

// DELETE /api/artists/:id — Clerk protected
export async function DELETE(req: NextRequest, { params }: Params) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();

  // 🔍 Fetch slug before deletion so we can notify Google to remove it
  const artist = await Artist.findById(params.id).lean() as any;

  await Artist.findByIdAndDelete(params.id);

  // If the artist was approved, tell Google to deindex the URL
  if (artist?.slug && artist?.status === "approved") {
    notifyArtistIndexing(artist.slug, "URL_DELETED").catch((e) =>
      console.error("[Indexing API] DELETE notify error:", e)
    );
  }

  return NextResponse.json({ message: "Artist deleted successfully" });
}
