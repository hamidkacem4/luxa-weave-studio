import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { MapPin, Phone, Mail, MessageCircle, PlayCircle } from "lucide-react";
import { useForm } from "@formspree/react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import factoryImage from "@/assets/about-craftsmanship.jpg";
import heroVideo from "@/assets/hero-video.mp4";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

const contactInfoIcons = [MapPin, Phone, Mail];

const Contact = () => {
  const { t, ready } = useTranslation();
  const contactInfo = t('contact.contact_info', { returnObjects: true }) as Array<{ title: string; details: string[], link?: string }>;
  const [state, handleSubmit] = useForm("mzznvvrw");
  const { toast } = useToast();

  const nameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const messageInputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (state.succeeded) {
      toast({
        title: t('contact.form_success_title'),
        description: t('contact.form_success_message'),
      });
      // Clear input fields
      if (nameInputRef.current) nameInputRef.current.value = '';
      if (emailInputRef.current) emailInputRef.current.value = '';
      if (messageInputRef.current) messageInputRef.current.value = '';
    } else if (state.errors) {
      toast({
        title: t('contact.form_error_title'),
        description: t('contact.form_error_message'),
        variant: "destructive",
      });
    }
  }, [state.succeeded, state.errors, t, toast]);

  if (!ready) {
    return (
      <section id="contact" className="py-24">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <div className="mb-16 text-center">
              <Skeleton className="h-12 w-1/2 mx-auto" />
              <Skeleton className="h-6 w-3/4 mx-auto mt-4" />
            </div>
            <div className="mb-12 md:flex md:flex-row md:justify-center md:gap-8">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="text-center">
                  <Skeleton className="h-14 w-14 rounded-full mx-auto mb-4" />
                  <Skeleton className="h-6 w-24 mx-auto" />
                  <Skeleton className="h-4 w-32 mx-auto mt-2" />
                </div>
              ))}
            </div>
            <div className="mb-12">
              <Skeleton className="h-64 w-full" />
            </div>
            <div className="my-12">
              <Card>
                <CardHeader>
                  <Skeleton className="h-8 w-1/2" />
                  <Skeleton className="h-4 w-3/4 mt-2" />
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Skeleton className="h-4 w-16" />
                      <Skeleton className="h-10 w-full" />
                    </div>
                    <div className="grid gap-2">
                      <Skeleton className="h-4 w-16" />
                      <Skeleton className="h-10 w-full" />
                    </div>
                    <div className="grid gap-2">
                      <Skeleton className="h-4 w-16" />
                      <Skeleton className="h-24 w-full" />
                    </div>
                    <div className="justify-self-center mt-4 ">
                      <Skeleton className="h-12 w-32" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="text-center bg-gradient-to-br from-cream to-beige rounded-sm p-12">
              <Skeleton className="h-12 w-12 mx-auto mb-4 rounded-full" />
              <Skeleton className="h-8 w-1/2 mx-auto" />
              <Skeleton className="h-4 w-3/4 mx-auto mt-2" />
              <Skeleton className="h-12 w-40 mx-auto mt-6" />
            </div>
          </div>
        </div>
      </section>
    );
  }

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
              <div className="fade-in-up text-center mt-3">
                <Button variant="gold" size="lg" asChild>
                  <a
                    href={heroVideo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2"
                  >
                    <PlayCircle className="h-5 w-5" />
                    {t('contact.watch_video_button')}
                  </a>
                </Button>
              </div>
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
                <form onSubmit={handleSubmit} className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">{t('contact.form_name_label')}</Label>
                    <Input id="name" name="name" placeholder={t('contact.form_name_placeholder')} ref={nameInputRef} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">{t('contact.form_email_label')}</Label>
                    <Input id="email" type="email" name="email" placeholder={t('contact.form_email_placeholder')} ref={emailInputRef} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="message">{t('contact.form_message_label')}</Label>
                    <Textarea id="message" name="message" placeholder={t('contact.form_message_placeholder')} ref={messageInputRef} />
                  </div>
                  <div className="justify-self-center mt-4 ">
                    <Button type="submit" variant="gold" size="lg" disabled={state.submitting}>
                      {t('contact.form_submit_button')}
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