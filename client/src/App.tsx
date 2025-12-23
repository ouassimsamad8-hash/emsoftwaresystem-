import { useEffect, type ReactNode } from "react";
import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/lib/language-context";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { ThemeProvider } from "@/lib/theme-context";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { CookieConsent } from "@/components/CookieConsent";
import AppointmentProvider from "@/components/CalWidget";
import AdminDashboard from "@/pages/admin/Dashboard";
import AdminLogin from "@/pages/admin/Login";
import AdminBlogPosts from "@/pages/admin/BlogPosts";
import AdminServices from "@/pages/admin/Services";
import AdminProjects from "@/pages/admin/Projects";
import AdminAppointments from "@/pages/admin/Appointments";
import AdminFaqs from "@/pages/admin/Faqs";
import AdminSiteSettings from "@/pages/admin/SiteSettings";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminAuthProvider, useAdminAuth } from "@/lib/admin-auth-context";

// Pages
import Home from "@/pages/Home";
import About from "@/pages/About";
import Services from "@/pages/Services";
import ServiceDetail from "@/pages/ServiceDetail";
import Projects from "@/pages/Projects";
import ProjectDetail from "@/pages/ProjectDetail";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import AuthorProfile from "@/pages/AuthorProfile";
import FAQ from "@/pages/FAQ";
import Contact from "@/pages/Contact";
import BookAppointment from "@/pages/BookAppointment";
import Privacy from "@/pages/Privacy";
import Cookies from "@/pages/Cookies";
import NotFound from "@/pages/not-found";

function AdminNotFound() {
  return (
    <AdminLayout title="Page not found" description="The requested admin page does not exist.">
      <div className="rounded-xl border border-dashed border-border bg-card/50 p-10 text-center">
        <h2 className="text-2xl font-semibold">Nothing to display</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Double-check the URL or use the sidebar to navigate to an available section.
        </p>
      </div>
    </AdminLayout>
  );
}

function Navigate({ to }: { to: string }) {
  const [, navigate] = useLocation();
  useEffect(() => {
    navigate(to);
  }, [navigate, to]);
  return null;
}

function AdminProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading } = useAdminAuth();
  const [, navigate] = useLocation();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/admin/login");
    }
  }, [isLoading, isAuthenticated, navigate]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center text-sm text-muted-foreground">
        Checking admin permissions…
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}

function AdminRouter() {
  const { isAuthenticated } = useAdminAuth();

  return (
    <Switch>
      <Route path="/admin/login">
        {isAuthenticated ? <Navigate to="/admin" /> : <AdminLogin />}
      </Route>
      <Route path="/admin/blog-posts">
        <AdminProtectedRoute>
          <AdminBlogPosts />
        </AdminProtectedRoute>
      </Route>
      <Route path="/admin/services">
        <AdminProtectedRoute>
          <AdminServices />
        </AdminProtectedRoute>
      </Route>
      <Route path="/admin/projects">
        <AdminProtectedRoute>
          <AdminProjects />
        </AdminProtectedRoute>
      </Route>
      <Route path="/admin/appointments">
        <AdminProtectedRoute>
          <AdminAppointments />
        </AdminProtectedRoute>
      </Route>
      <Route path="/admin/faqs">
        <AdminProtectedRoute>
          <AdminFaqs />
        </AdminProtectedRoute>
      </Route>
      <Route path="/admin/site-settings">
        <AdminProtectedRoute>
          <AdminSiteSettings />
        </AdminProtectedRoute>
      </Route>
      <Route path="/admin">
        <AdminProtectedRoute>
          <AdminDashboard />
        </AdminProtectedRoute>
      </Route>
      <Route>
        <AdminProtectedRoute>
          <AdminNotFound />
        </AdminProtectedRoute>
      </Route>
    </Switch>
  );
}

function Router() {
  const [location] = useLocation();

  if (location.startsWith("/admin")) {
    return <AdminRouter />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className="flex-grow">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/services" component={Services} />
          <Route path="/services/:slug" component={ServiceDetail} />
          <Route path="/projects" component={Projects} />
          <Route path="/projects/:slug" component={ProjectDetail} />
          <Route path="/blog" component={Blog} />
          <Route path="/blog/:slug" component={BlogPost} />
          <Route path="/author/:slug" component={AuthorProfile} />
          <Route path="/faq" component={FAQ} />
          <Route path="/contact" component={Contact} />
          <Route path="/book-appointment" component={BookAppointment} />
          <Route path="/privacy" component={Privacy} />
          <Route path="/cookies" component={Cookies} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <ThemeProvider>
            <LanguageProvider>
              <AdminAuthProvider>
                <AppointmentProvider>
                  <Router />
                  <CookieConsent />
                </AppointmentProvider>
              </AdminAuthProvider>
            </LanguageProvider>
            <Toaster />
          </ThemeProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
