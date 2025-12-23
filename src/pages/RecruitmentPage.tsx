import Meta from "@/components/Meta";
import Navigation from "@/components/Navigation";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Phone } from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const RecruitmentPage = () => {
  const { t } = useTranslation();

  const formSchema = z.object({
    fullName: z.string().min(2, {
      message: t("recruitment.form.fullName.min"),
    }),
    email: z.string().email({
      message: t("recruitment.form.email.invalid"),
    }),
    phone: z.string().min(10, {
      message: t("recruitment.form.phone.min"),
    }),
    positionApplied: z.string().min(2, {
      message: t("recruitment.form.positionApplied.min"),
    }),
    yearsOfExperience: z.string().min(1, {
      message: t("recruitment.form.yearsOfExperience.min"),
    }),
    cv: z.any(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      positionApplied: "",
      yearsOfExperience: "",
      cv: undefined,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    // Here you would typically send the data to a server
    // For now, we'll just log it
    alert(JSON.stringify(values, null, 2));
  }

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
        <div className="mx-auto mt-12 max-w-lg">
          <Card className="bg-white/50 dark:bg-black/50 backdrop-blur-lg">
            <CardHeader>
              <CardTitle>{t("recruitment.form.title")}</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {t("recruitment.form.fullName.label")}
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder={t(
                              "recruitment.form.fullName.placeholder"
                            )}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {t("recruitment.form.email.label")}
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder={t(
                              "recruitment.form.email.placeholder"
                            )}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {t("recruitment.form.phone.label")}
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="tel"
                            placeholder={t(
                              "recruitment.form.phone.placeholder"
                            )}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="positionApplied"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {t("recruitment.form.positionApplied.label")}
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder={t(
                              "recruitment.form.positionApplied.placeholder"
                            )}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="yearsOfExperience"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {t("recruitment.form.yearsOfExperience.label")}
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder={t(
                              "recruitment.form.yearsOfExperience.placeholder"
                            )}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="cv"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("recruitment.form.cv.label")}</FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            onChange={(e) => field.onChange(e.target.files)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <p className="mt-4 text-sm text-muted-foreground flex items-center justify-center gap-2">
                    {t("recruitment.hrContact")} <Phone className="h-4 w-4 inline" /> 55248423
                  </p>
                  <Button type="submit" variant="gold" size="lg">{t("recruitment.form.submit")}</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
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
