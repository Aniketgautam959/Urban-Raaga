import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Artist from "@/lib/models/Artist";
import { requireAdmin } from "@/lib/auth";

// GET /api/artists — public gets approved only, admin gets all
export async function GET(req: NextRequest) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");
  const slug = searchParams.get("slug");

  let query: Record<string, unknown> = {};

  if (slug) {
    query.slug = slug;
  } else if (status === "all") {
    // No filter — return everything (admin view)
    query = {};
  } else if (status) {
    query.status = status;
  } else {
    query.status = "approved"; // default: public only sees approved
  }

  const artists = await Artist.find(query).sort({ createdAt: -1 }).lean();
  return NextResponse.json({ artists });
}

// POST /api/artists — admin only
export async function POST(req: NextRequest) {
  const session = await requireAdmin(req);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  const body = await req.json();

  // Auto-generate slug from name if not provided
  if (!body.slug) {
    body.slug = body.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }

  const artist = await Artist.create(body);
  return NextResponse.json({ artist }, { status: 201 });
}
