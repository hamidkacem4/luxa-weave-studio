import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useParams, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ContactPage from "./pages/ContactPage";
import RecruitmentPage from "./pages/RecruitmentPage";
import { useEffect } from "react";
import i18n from "./i18n";

const queryClient = new QueryClient();

const LangHandler = ({ children }: { children: React.ReactNode }) => {
  const { lang } = useParams();
  useEffect(() => {
    if (lang && i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [lang]);
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/en" />} />
          <Route path="/:lang" element={<LangHandler><Index /></LangHandler>} />
          <Route path="/:lang/contact" element={<LangHandler><ContactPage /></LangHandler>} />
          <Route path="/:lang/recruitment" element={<LangHandler><RecruitmentPage /></LangHandler>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

