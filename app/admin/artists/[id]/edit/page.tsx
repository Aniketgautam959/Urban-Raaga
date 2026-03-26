import AdminNavbar from "@/components/admin/AdminNavbar";
import ArtistEditClient from "./ArtistEditClient";

export default function EditArtistPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-[#0F0F0F] text-white flex">
      <AdminNavbar />
      <main className="ml-56 flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-black text-white">Edit Artist</h1>
          <p className="text-gray-400 text-sm mt-1">Update artist profile details</p>
        </div>
        <ArtistEditClient id={params.id} />
      </main>
    </div>
  );
}
