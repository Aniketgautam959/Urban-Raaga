import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Artist from "@/lib/models/Artist";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// GET /api/artists — public gets approved only; admin (authenticated) can get all
export async function GET(req: NextRequest) {
  try {
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
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "GET API Server Error" }, { status: 500 });
  }
}

// POST /api/artists — Clerk protected
export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const body = await req.json();

  if (!body.slug) {
    if (!body.name) return NextResponse.json({ error: "Name is required" }, { status: 400 });
    body.slug = body.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }

  try {
    const artist = await Artist.create(body);
    return NextResponse.json({ artist }, { status: 201 });
  } catch (error: any) {
    if (error.code === 11000) {
      return NextResponse.json({ error: "An artist with this name/slug already exists." }, { status: 400 });
    }
    return NextResponse.json({ error: error.message || "Failed to create artist" }, { status: 400 });
  }
}
