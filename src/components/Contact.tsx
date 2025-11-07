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

          {/* Google Map */}
          <div className="mb-12 fade-in-up">
            <div className="relative overflow-hidden rounded-sm shadow-lg">
              <a
                href="https://www.google.com/maps/search/?api=1&query=123+Textile+Avenue+Fashion+District+NY+10001"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095343008!2d-74.00425878459253!3d40.74844097932847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1635959045842!5m2!1sen!2sus"
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Location Map"
                  className="pointer-events-none"
                />
                <div className="absolute inset-0 hover:bg-black/5 transition-colors cursor-pointer" />
              </a>
            </div>
            <p className="text-center text-sm text-muted-foreground mt-3">
              Click to open in Google Maps
            </p>
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
