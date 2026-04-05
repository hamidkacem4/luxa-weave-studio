"use client";
import Contact from "@/components/Contact";
import Meta from "@/components/Meta";
import Navigation from "@/components/Navigation";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useTranslation } from "react-i18next";

const ContactPage = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen">
      <Meta
        title={`Contact Us - ${t("meta.title")}`}
        description="Get in touch with MagTexco, a leading clothing manufacturer in Tunisia. Contact us for partnership inquiries, custom orders, and more."
        keywords="contact magtexco, tunisia clothing factory contact, apparel manufacturing inquiry"
      />
      <Navigation />
      <main>
        <Contact isPage={true} />
      </main>
      <footer className="border-t bg-cream py-12">
        <div className="container">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-muted-foreground">
              © 2024 MagTexco. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <a href="#" className="transition-colors hover:text-foreground">
                Privacy Policy
              </a>
              <a href="#" className="transition-colors hover:text-foreground">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
      <WhatsAppButton />
    </div>
  );
};

export default ContactPage;
