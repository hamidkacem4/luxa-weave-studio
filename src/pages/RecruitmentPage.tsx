import { useEffect, useRef } from "react";
import Meta from "@/components/Meta";
import Navigation from "@/components/Navigation";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useTranslation, Trans } from "react-i18next";
import { useForm } from "@formspree/react";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const RecruitmentPage = () => {
  const { t, i18n } = useTranslation();
  const [state, handleSubmit] = useForm("mzznvvrw");
  const { toast } = useToast();

  const fullNameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);
  const positionAppliedInputRef = useRef<HTMLInputElement>(null);
  const yearsOfExperienceInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (state.succeeded) {
      toast({
        title: i18n.t("recruitment.form.success.title"),
        description: i18n.t("recruitment.form.success.message"),
      });
      // Clear input fields
      if (fullNameInputRef.current) fullNameInputRef.current.value = "";
      if (emailInputRef.current) emailInputRef.current.value = "";
      if (phoneInputRef.current) phoneInputRef.current.value = "";
      if (positionAppliedInputRef.current)
        positionAppliedInputRef.current.value = "";
      if (yearsOfExperienceInputRef.current)
        yearsOfExperienceInputRef.current.value = "";
    } else if (state.errors) {
      console.error("Formspree errors:", state.errors);
      let errorMessage = i18n.t("recruitment.form.error.message");
      if (Array.isArray(state.errors)) {
        errorMessage +=
          " " +
          state.errors.map((error) => error.message).join(", ");
      } else if (state.errors.message) {
        errorMessage += " " + state.errors.message;
      }
      toast({
        title: i18n.t("recruitment.form.error.title"),
        description: errorMessage,
        variant: "destructive",
      });
    }
  }, [state.succeeded, state.errors, i18n, toast]);

  return (
    <div className="min-h-screen">
      <Meta
        title={`Recruitment - ${t("meta.title")}`}
        description="Join the MagTexco team. Explore career opportunities with a leading clothing manufacturer in Tunisia."
        keywords="magtexco careers, clothing factory jobs tunisia, textile industry employment"
      />
      <Navigation />
      <main>
        <div className="container py-24 text-center">
          <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
            {t("recruitment.title")}
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            {t("recruitment.message")}
          </p>
          <div className="mx-auto mt-12 w-full max-w-2xl">
            <Card className="bg-white/50 dark:bg-black/50 backdrop-blur-lg">
              <CardHeader className="text-center">
                <h2 className="text-2xl font-bold tracking-tight text-charcoal">
                  {t("recruitment.form.title")}
                </h2>
              </CardHeader>
              <CardContent>
                <form
                  onSubmit={handleSubmit}
                  className="space-y-8"
                  encType="multipart/form-data"
                >
                  <div className="grid gap-2">
                    <Label htmlFor="fullName">
                      {t("recruitment.form.fullName.label")}
                    </Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      placeholder={t("recruitment.form.fullName.placeholder")}
                      ref={fullNameInputRef}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">
                      {t("recruitment.form.email.label")}
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      name="email"
                      placeholder={t("recruitment.form.email.placeholder")}
                      ref={emailInputRef}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="phone">
                      {t("recruitment.form.phone.label")}
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      name="phone"
                      placeholder={t("recruitment.form.phone.placeholder")}
                      ref={phoneInputRef}
                      minLength={9}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="positionApplied">
                      {t("recruitment.form.positionApplied.label")}
                    </Label>
                    <Input
                      id="positionApplied"
                      name="positionApplied"
                      placeholder={t(
                        "recruitment.form.positionApplied.placeholder"
                      )}
                      ref={positionAppliedInputRef}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="yearsOfExperience">
                      {t("recruitment.form.yearsOfExperience.label")}
                    </Label>
                    <Input
                      id="yearsOfExperience"
                      type="number"
                      name="yearsOfExperience"
                      placeholder={t(
                        "recruitment.form.yearsOfExperience.placeholder"
                      )}
                      ref={yearsOfExperienceInputRef}
                    />
                  </div>
                  {/* <div className="grid gap-2">
                    <Label htmlFor="cv">{t("recruitment.form.cv.label")}</Label>
                    <Input id="cv" type="file" name="cv" ref={cvInputRef} />
                  </div> */}


                  <Button
                    type="submit"
                    variant="gold"
                    size="lg"
                    disabled={state.submitting}
                  >
                    {t("recruitment.form.submit")}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
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

export default RecruitmentPage;
