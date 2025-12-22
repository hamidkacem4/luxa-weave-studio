import Meta from "@/components/Meta";
import Navigation from "@/components/Navigation";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useTranslation } from "react-i18next";

const RecruitmentPage = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen">
      <Meta
        title={`Recruitment - ${t("meta.title")}`}
        description="Join the MagTexco team. Explore career opportunities with a leading clothing manufacturer in Tunisia."
        keywords="magtexco careers, clothing factory jobs tunisia, textile industry employment"
      />
      <Navigation />
      <div className="container py-24 text-center">
        <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
          {t('recruitment.title')}
        </h1>
        <p className="mt-6 text-lg text-muted-foreground">
          {t('recruitment.message')}
        </p>
      </div>
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

export default RecruitmentPage;
