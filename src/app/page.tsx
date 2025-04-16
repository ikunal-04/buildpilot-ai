import { auth } from "@/server/auth";
import { api, HydrateClient } from "@/trpc/server";
import { redirect } from "next/navigation";
import LandingPage from "./_components/landing";

export default async function Home() {
  const session = await auth();

  if (session?.user) {
    void api.listAgents.list.prefetch();
  }

  return (
    <HydrateClient>
      <main>
        {session ? redirect("/agents") : <LandingPage />}
      </main>
    </HydrateClient>
  );
}
