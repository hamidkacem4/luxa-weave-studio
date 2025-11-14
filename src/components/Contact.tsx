import { useTranslation } from "react-i18next";
import { MapPin, Phone, Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import factoryImage from "@/assets/about-craftsmanship.jpg";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const contactInfoIcons = [MapPin, Phone, Mail];

const Contact = () => {
  const { t } = useTranslation();
  const contactInfo = t('contact.contact_info', { returnObjects: true }) as Array<{ title: string; details: string[], link?: string }>;

  return (
    <section id="contact" className="py-24">
      <div className="container">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-16 text-center fade-in-up">
            <h2 className="mb-4 text-5xl font-bold tracking-tight">
              {t('contact.title')}
            </h2>
            <p className="text-lg text-muted-foreground">
              {t('contact.subtitle')}
            </p>
          </div>

          {/* Contact Cards */}
          <div className="mb-12 md:flex md:flex-row md:justify-center md:gap-8">
            {Array.isArray(contactInfo) && contactInfo.map((item, index) => {
              const Icon = contactInfoIcons[index];
              return (
                <div
                  key={item.title}
                  className="fade-in-up  text-center"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full">
                    {Icon && <Icon className="h-6 w-6 text-gold-dark" />}
                  </div>
                  <h3 className="mb-3 text-lg font-semibold">{item.title}</h3>
                  {item.details.map((detail, i) => (
                    item.link ? (
                      <a
                        key={i}
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:underline"
                      >
                        {detail}
                      </a>
                    ) : (
                      <p key={i} className="text-muted-foreground">
                        {detail}
                      </p>
                    )
                  ))}
                </div>
              );
            })}
          </div>

          {/* Google Map */}
          <div className="mb-12 fade-in-up w-full">
            <Dialog>
              <div className="relative overflow-hidden rounded-lg shadow-xl border border-gray-200">
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=35.72344296183206,10.744451113821503"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1992.8135719488678!2d10.744451113821503!3d35.72344296183206!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13020d007e69bcc9%3A0xef6b1c96e544d93b!2sMAGTEXCO!5e1!3m2!1sfr!2stn!4v1762847684863!5m2!1sfr!2stn"
                    width="100%"
                    height="350"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={t('contact.map_title')}
                    className="pointer-events-none"
                  />
                  <div className="absolute inset-0 hover:bg-black/5 transition-colors cursor-pointer" />
                </a>
                <DialogTrigger asChild>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer">
                    <MapPin className="w-10 h-10 text-red-500 animate-pulse" />
                  </div>
                </DialogTrigger>
              </div>
              <DialogContent className="max-w-3xl">
                <DialogHeader>
                  <DialogTitle>{t('contact.map_dialog_title')}</DialogTitle>
                </DialogHeader>
                <img src={factoryImage} alt="Factory" className="rounded-md" />
              </DialogContent>
              <p className="text-center text-sm text-muted-foreground mt-3">
                {t('contact.map_instruction')}
              </p>
            </Dialog>
          </div>

          {/* Contact Form */}
          <div className="fade-in-up my-12">
            <Card>
              <CardHeader>
                <CardTitle>{t('contact.form_title')}</CardTitle>
                <CardDescription>
                  {t('contact.form_subtitle')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">{t('contact.form_name_label')}</Label>
                    <Input id="name" placeholder={t('contact.form_name_placeholder')} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">{t('contact.form_email_label')}</Label>
                    <Input id="email" type="email" placeholder={t('contact.form_email_placeholder')} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="message">{t('contact.form_message_label')}</Label>
                    <Textarea id="message" placeholder={t('contact.form_message_placeholder')} />
                  </div>
                  <div className="justify-self-center mt-4 ">
                    <Button type="submit" variant="gold" size="lg" asChild>
                      <span className="inline-flex items-center gap-3">
                        {t('contact.form_submit_button')}
                      </span>
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* WhatsApp CTA */}
          <div className="fade-in-up text-center bg-gradient-to-br from-cream to-beige rounded-sm p-12">
            <MessageCircle className="mx-auto mb-4 h-12 w-12 text-gold-dark" />
            <h3 className="mb-3 text-2xl font-semibold">
              {t('contact.whatsapp_title')}
            </h3>
            <p className="mb-6 text-muted-foreground">
              {t('contact.whatsapp_subtitle')}
            </p>
            <Button variant="gold" size="lg" asChild>
              <a
                href="https://wa.me/21652049969"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2"
              >
                <MessageCircle className="h-5 w-5" />
                {t('contact.whatsapp_button')}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;