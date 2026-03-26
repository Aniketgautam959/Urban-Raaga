import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Artist from "@/lib/models/Artist";

// GET /api/artists — public gets approved only; admin (authenticated) can get all
export async function GET(req: NextRequest) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");
  const slug = searchParams.get("slug");

  let query: Record<string, unknown> = {};

  if (slug) {
    query.slug = slug;
  } else if (status === "all") {
    query = {};
  } else if (status) {
    query.status = status;
  } else {
    query.status = "approved";
  }

  const artists = await Artist.find(query).sort({ createdAt: -1 }).lean();
  return NextResponse.json({ artists });
}

// POST /api/artists — Clerk protected
export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const body = await req.json();

  if (!body.slug) {
    body.slug = body.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }

  const artist = await Artist.create(body);
  return NextResponse.json({ artist }, { status: 201 });
}
