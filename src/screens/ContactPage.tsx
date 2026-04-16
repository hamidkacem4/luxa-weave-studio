"use client";
import Contact from "@/components/Contact";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

type ContactPageProps = {
  locale?: string;
};

const ContactPage = ({ locale }: ContactPageProps) => {
  return (
    <div className="min-h-screen">
      <Navigation locale={locale} />
      <main>
        <Contact isPage={true} />
      </main>
      <Footer locale={locale} />
      <WhatsAppButton />
    </div>
  );
};

export default ContactPage;
