import ContactPage from "@/pages/ContactPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact – MagTexco Textile Manufacturer Tunisia",
  description: "Get in touch with MagTexco, leading clothing manufacturers in Tunisia. Contact us for textile sourcing, custom production, and apparel manufacturing inquiries.",
  alternates: { canonical: "https://magtexco.com/en/contact" },
};

export default function Page() {
  return <ContactPage />;
}
