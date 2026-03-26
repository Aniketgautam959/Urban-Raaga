import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <main className="min-h-screen bg-[#0F0F0F] flex items-center justify-center">
      <div className="text-center mb-8 absolute top-10 w-full">
        <h1 className="text-2xl font-black text-white">
          Urban <span className="text-[#FF2E2E]">Raaga</span>
          <span className="ml-2 text-sm font-medium text-gray-400">Admin</span>
        </h1>
      </div>
      <SignIn />
    </main>
  );
}
