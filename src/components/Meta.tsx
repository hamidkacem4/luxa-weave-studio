import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

type MetaProps = {
  title: string;
  description: string;
  keywords: string;
};

const Meta = ({ title, description, keywords }: MetaProps) => {
  const { i18n } = useTranslation();
  const location = useLocation();

  const languages = ["en", "fr", "ko"];
  const currentLang = i18n.language;
  const canonicalUrl = `https://luxa-weave-studio.vercel.app${location.pathname}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonicalUrl} />
      {languages.map((lang) => (
        <link
          key={lang}
          rel="alternate"
          hrefLang={lang}
          href={`https://luxa-weave-studio.vercel.app/${lang}`}
        />
      ))}
      <link
        rel="alternate"
        hrefLang="x-default"
        href="https://luxa-weave-studio.vercel.app/en"
      />
    </Helmet>
  );
};

export default Meta;
