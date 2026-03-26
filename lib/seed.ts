// Run with: npx ts-node --project tsconfig.json lib/seed.ts
// Or: npx tsx lib/seed.ts

import { connectDB } from "./mongodb";
import Artist from "./models/Artist";
import { artists } from "./artists";

async function seed() {
  await connectDB();
  console.log("Connected to MongoDB");

  for (const a of artists) {
    const exists = await Artist.findOne({ slug: a.slug });
    if (exists) {
      console.log(`Skipping ${a.name} — already exists`);
      continue;
    }
    await Artist.create({
      ...a,
      bio: a.fullDescription,
      coverImage: a.images[0] || "",
      status: "approved",
      imageAlts: (a as any).imageAlts || [],
    });
    console.log(`Seeded: ${a.name}`);
  }

  console.log("Seed complete!");
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
