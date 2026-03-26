import mongoose from "mongoose";

const ArtistSchema = new mongoose.Schema({}, { strict: false });
const Artist = mongoose.models.Artist || mongoose.model("Artist", ArtistSchema);

async function run() {
  await mongoose.connect(process.env.MONGODB_URI as string);
  console.log("Connected to DB");
  
  const hhh = await Artist.findOne({ slug: "hhh" }).lean();
  console.log("Found artist 'hhh':", hhh);
  
  process.exit(0);
}

run().catch(console.error);
