import { MapPin, Phone, Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const contactInfo = [
  {
    icon: MapPin,
    title: "Visit Us",
    details: ["123 Textile Avenue", "Fashion District, NY 10001"],
  },
  {
    icon: Phone,
    title: "Call Us",
    details: ["+1 (555) 123-4567"],
  },
  {
    icon: Mail,
    title: "Email Us",
    details: ["info@luxetextile.com"],
  },
];

const Contact = () => {
  return (
    <section className="py-24">
      <div className="container">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-16 text-center fade-in-up">
            <h2 className="mb-4 text-5xl font-bold tracking-tight">
              Let's Create Together
            </h2>
            <p className="text-lg text-muted-foreground">
              Ready to start your next collection? Get in touch with our team
            </p>
          </div>

          {/* Contact Cards */}
          <div className="mb-12 grid gap-8 md:grid-cols-3">
            {contactInfo.map((item, index) => (
              <div
                key={item.title}
                className="fade-in-up text-center"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-cream">
                  <item.icon className="h-6 w-6 text-gold-dark" />
                </div>
                <h3 className="mb-3 text-lg font-semibold">{item.title}</h3>
                {item.details.map((detail, i) => (
                  <p key={i} className="text-muted-foreground">
                    {detail}
                  </p>
                ))}
              </div>
            ))}
          </div>

          {/* WhatsApp CTA */}
          <div className="fade-in-up text-center bg-gradient-to-br from-cream to-beige rounded-sm p-12">
            <MessageCircle className="mx-auto mb-4 h-12 w-12 text-gold-dark" />
            <h3 className="mb-3 text-2xl font-semibold">
              Quick Response on WhatsApp
            </h3>
            <p className="mb-6 text-muted-foreground">
              Get instant answers to your questions. We're here to help.
            </p>
            <Button variant="gold" size="lg" asChild>
              <a
                href="https://wa.me/15551234567"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2"
              >
                <MessageCircle className="h-5 w-5" />
                Chat on WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
