import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Home, ArrowLeft, Search, Mail } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';
import { SEOHead } from '@/components/SEOHead';
import { motion } from 'framer-motion';

export default function NotFound() {
  const { t } = useLanguage();

  const popularPages = [
    { 
      path: '/services', 
      label: t({ en: 'Services', fr: 'Services' }),
      icon: <Search className="h-4 w-4" />
    },
    { 
      path: '/projects', 
      label: t({ en: 'Projects', fr: 'Projets' }),
      icon: <Search className="h-4 w-4" />
    },
    { 
      path: '/contact', 
      label: t({ en: 'Contact', fr: 'Contact' }),
      icon: <Mail className="h-4 w-4" />
    },
  ];

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-background via-card to-background p-4">
      <SEOHead
        title={t({ en: '404 - Page Not Found', fr: '404 - Page Non Trouvée' })}
        description={t({ 
          en: 'The page you are looking for does not exist.', 
          fr: 'La page que vous recherchez n\'existe pas.' 
        })}
        noindex={true}
      />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full"
      >
        <Card className="overflow-hidden">
          <CardContent className="pt-12 pb-8 px-6 sm:px-12 text-center">
            {/* 404 Illustration */}
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="mb-8"
            >
              <div className="relative">
                <h1 className="text-[150px] sm:text-[200px] font-bold text-primary/10 leading-none">
                  404
                </h1>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-full bg-primary/10 flex items-center justify-center">
                    <Search className="h-10 w-10 sm:h-12 sm:w-12 text-primary" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Error Message */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="space-y-4 mb-8"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                {t({ 
                  en: 'Page Not Found', 
                  fr: 'Page Non Trouvée' 
                })}
              </h2>
              <p className="text-lg text-muted-foreground max-w-md mx-auto">
                {t({
                  en: 'Sorry, the page you are looking for doesn\'t exist or has been moved.',
                  fr: 'Désolé, la page que vous recherchez n\'existe pas ou a été déplacée.'
                })}
              </p>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-3 justify-center mb-8"
            >
              <Link href="/">
                <Button size="lg" className="gap-2 w-full sm:w-auto">
                  <Home className="h-5 w-5" />
                  {t({ en: 'Go Home', fr: 'Accueil' })}
                </Button>
              </Link>
              <Button 
                size="lg" 
                variant="outline" 
                className="gap-2 w-full sm:w-auto"
                onClick={() => window.history.back()}
              >
                <ArrowLeft className="h-5 w-5" />
                {t({ en: 'Go Back', fr: 'Retour' })}
              </Button>
            </motion.div>

            {/* Popular Pages */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="pt-6 border-t border-border"
            >
              <p className="text-sm text-muted-foreground mb-4">
                {t({ 
                  en: 'Or visit one of our popular pages:', 
                  fr: 'Ou visitez l\'une de nos pages populaires :' 
                })}
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                {popularPages.map((page, idx) => (
                  <Link key={idx} href={page.path}>
                    <Button variant="ghost" size="sm" className="gap-2">
                      {page.icon}
                      {page.label}
                    </Button>
                  </Link>
                ))}
              </div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
