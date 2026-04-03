import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useParams, Navigate } from "react-router-dom";
import { useEffect, Suspense, lazy } from "react";
import i18n from "./i18n";
import ScrollToTop from "./components/ScrollToTop";

// Lazy load pages
const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const RecruitmentPage = lazy(() => import("./pages/RecruitmentPage"));
const BlogListPage = lazy(() => import("./pages/BlogListPage"));
const BlogPostPage = lazy(() => import("./pages/BlogPostPage"));
const TextileTunisiePage = lazy(() => import("./pages/TextileTunisiePage"));
const CollectionPage = lazy(() => import("./pages/CollectionPage"));

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

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<Navigate to="/en" />} />
            <Route path="/:lang" element={<LangHandler><Index /></LangHandler>} />
            <Route path="/:lang/contact" element={<LangHandler><ContactPage /></LangHandler>} />
            <Route path="/:lang/recruitment" element={<LangHandler><RecruitmentPage /></LangHandler>} />
            <Route path="/:lang/blog" element={<LangHandler><BlogListPage /></LangHandler>} />
            <Route path="/:lang/blog/:slug" element={<LangHandler><BlogPostPage /></LangHandler>} />
            <Route path="/:lang/collections/:slug" element={<LangHandler><CollectionPage /></LangHandler>} />
            <Route path="/:lang/textile-tunisie" element={<LangHandler><TextileTunisiePage /></LangHandler>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

