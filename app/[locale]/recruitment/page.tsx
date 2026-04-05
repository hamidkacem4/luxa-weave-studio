import RecruitmentPage from "@/pages/RecruitmentPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers – MagTexco Textile Jobs Tunisia",
  description: "Join MagTexco, Tunisia's premier textile manufacturer. Explore career opportunities in garment manufacturing, textile production, and fashion industry roles in Tunisia.",
  alternates: { canonical: "https://magtexco.com/en/recruitment" },
};

export default function Page() {
  return <RecruitmentPage />;
}
