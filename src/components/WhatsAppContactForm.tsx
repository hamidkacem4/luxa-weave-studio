"use client";

import { useState } from "react";
import { getLocale } from "@/lib/seo";
import { DEFAULT_LOCALE } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const PHONE_NUMBER = "21652049969";
const WHATSAPP_URL = `https://wa.me/${PHONE_NUMBER}`;

const copyByLocale = {
  en: {
    greeting: "Hello MAGTEXCO,",
    intro: "I would like to contact you on WhatsApp for a quote request.",
    title: "Quick quote request",
    description: "Fill out the form below and send us a WhatsApp message for a fast response.",
    nameLabel: "Full name",
    namePlaceholder: "Your name",
    companyLabel: "Company (optional)",
    companyPlaceholder: "Company name",
    emailLabel: "Email (optional)",
    emailPlaceholder: "Your email",
    messageLabel: "Project / Message",
    messagePlaceholder: "Describe your project or quote request",
    error: "Please enter your name and message before sending.",
    submit: "Send via WhatsApp",
    fieldName: "Name",
    fieldCompany: "Company",
    fieldEmail: "Email",
    fieldMessage: "Message",
  },
  fr: {
    greeting: "Bonjour MAGTEXCO,",
    intro: "Je souhaite vous contacter via WhatsApp pour une demande de devis.",
    title: "Demande de devis rapide",
    description: "Remplissez le formulaire ci-dessous et envoyez-nous directement un message WhatsApp pour une reponse rapide.",
    nameLabel: "Nom complet",
    namePlaceholder: "Votre nom",
    companyLabel: "Societe (optionnel)",
    companyPlaceholder: "Nom de la societe",
    emailLabel: "Email (optionnel)",
    emailPlaceholder: "Votre email",
    messageLabel: "Projet / Message",
    messagePlaceholder: "Decrivez votre projet ou demande de devis",
    error: "Merci de renseigner votre nom et votre message avant d'envoyer.",
    submit: "Envoyer via WhatsApp",
    fieldName: "Nom",
    fieldCompany: "Societe",
    fieldEmail: "Email",
    fieldMessage: "Message",
  },
  ko: {
    greeting: "안녕하세요 MAGTEXCO,",
    intro: "견적 요청을 위해 WhatsApp으로 문의드리고 싶습니다.",
    title: "빠른 견적 요청",
    description: "아래 양식을 작성하고 WhatsApp 메시지를 보내 빠르게 답변을 받아보세요.",
    nameLabel: "성함",
    namePlaceholder: "이름을 입력하세요",
    companyLabel: "회사명 (선택)",
    companyPlaceholder: "회사명을 입력하세요",
    emailLabel: "이메일 (선택)",
    emailPlaceholder: "이메일을 입력하세요",
    messageLabel: "프로젝트 / 메시지",
    messagePlaceholder: "프로젝트나 견적 요청 내용을 작성하세요",
    error: "보내기 전에 이름과 메시지를 입력해주세요.",
    submit: "WhatsApp으로 보내기",
    fieldName: "이름",
    fieldCompany: "회사명",
    fieldEmail: "이메일",
    fieldMessage: "메시지",
  },
  it: {
    greeting: "Buongiorno MAGTEXCO,",
    intro: "Desidero contattarvi tramite WhatsApp per una richiesta di preventivo.",
    title: "Richiesta preventivo rapida",
    description: "Compila il modulo sottostante e inviaci un messaggio WhatsApp per una risposta veloce.",
    nameLabel: "Nome completo",
    namePlaceholder: "Il tuo nome",
    companyLabel: "Azienda (opzionale)",
    companyPlaceholder: "Nome dell'azienda",
    emailLabel: "Email (opzionale)",
    emailPlaceholder: "La tua email",
    messageLabel: "Progetto / Messaggio",
    messagePlaceholder: "Descrivi il tuo progetto o la richiesta di preventivo",
    error: "Inserisci il tuo nome e il messaggio prima di inviare.",
    submit: "Invia tramite WhatsApp",
    fieldName: "Nome",
    fieldCompany: "Azienda",
    fieldEmail: "Email",
    fieldMessage: "Messaggio",
  },
} as const;

type SupportedLocale = keyof typeof copyByLocale;

type FormState = {
  name: string;
  company: string;
  email: string;
  message: string;
};

function buildMessage(
  copy: (typeof copyByLocale)[SupportedLocale],
  { name, company, email, message }: FormState,
) {
  const lines = [
    copy.greeting,
    copy.intro,
    name ? `${copy.fieldName}: ${name}` : undefined,
    company ? `${copy.fieldCompany}: ${company}` : undefined,
    email ? `${copy.fieldEmail}: ${email}` : undefined,
    message ? `${copy.fieldMessage}: ${message}` : undefined,
  ].filter(Boolean);

  return encodeURIComponent(lines.join("\n"));
}

type WhatsAppContactFormProps = {
  locale?: string;
};

export default function WhatsAppContactForm({
  locale = "en",
}: WhatsAppContactFormProps) {
  const currentLocale = getLocale(locale) as SupportedLocale;
  const copy = copyByLocale[currentLocale] || copyByLocale[DEFAULT_LOCALE as SupportedLocale] || copyByLocale["en"];
  
  const [phoneNumber] = useState("+21695518870");
  const [form, setForm] = useState<FormState>({
    name: "",
    company: "",
    email: "",
    message: "",
  });
  const [error, setError] = useState("");

  const handleChange = (key: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
    if (error) setError("");
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.name.trim() || !form.message.trim()) {
      setError(copy.error);
      return;
    }

    const url = `${WHATSAPP_URL}?text=${buildMessage(copy, form)}`;
    window.open(url, "_blank", "noreferrer");
  };

  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
      <div className="mb-6">
        <p className="text-sm uppercase tracking-[0.24em] text-gold-dark">WhatsApp</p>
        <h3 className="mt-3 text-2xl font-semibold text-gray-900">{copy.title}</h3>
        <p className="mt-2 text-sm leading-6 text-gray-600">{copy.description}</p>
      </div>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <label className="space-y-2 text-sm text-gray-700">
          {copy.nameLabel}
          <Input
            value={form.name}
            onChange={(event) => handleChange("name", event.target.value)}
            placeholder={copy.namePlaceholder}
          />
        </label>
        <label className="space-y-2 text-sm text-gray-700">
          {copy.companyLabel}
          <Input
            value={form.company}
            onChange={(event) => handleChange("company", event.target.value)}
            placeholder={copy.companyPlaceholder}
          />
        </label>
        <label className="space-y-2 text-sm text-gray-700">
          {copy.emailLabel}
          <Input
            type="email"
            value={form.email}
            onChange={(event) => handleChange("email", event.target.value)}
            placeholder={copy.emailPlaceholder}
          />
        </label>
        <label className="space-y-2 text-sm text-gray-700">
          {copy.messageLabel}
          <Textarea
            value={form.message}
            onChange={(event) => handleChange("message", event.target.value)}
            placeholder={copy.messagePlaceholder}
          />
        </label>
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        <Button 
          type="submit" 
          className="w-full bg-gold text-charcoal hover:bg-gold-dark font-bold py-6 rounded-xl transition-all"
        >
          {copy.submit}
        </Button>
      </form>
    </div>
  );
}
