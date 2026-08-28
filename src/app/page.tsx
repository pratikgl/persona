import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { LandingHero } from "@/components/landing-hero";

export default async function LandingPage() {
  const session = await auth();
  if (session?.user) redirect("/app/home");
  return <LandingHero />;
}
