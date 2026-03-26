import AdminNavbar from "@/components/admin/AdminNavbar";
import ArtistForm from "@/components/admin/ArtistForm";

export default function NewArtistPage() {
  return (
    <div className="min-h-screen bg-[#0F0F0F] text-white flex">
      <AdminNavbar />
      <main className="ml-56 flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-black text-white">Add New Artist</h1>
          <p className="text-gray-400 text-sm mt-1">Fill in the details to create a new artist profile</p>
        </div>
        <ArtistForm mode="create" />
      </main>
    </div>
  );
}
