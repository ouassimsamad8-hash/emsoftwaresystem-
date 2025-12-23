import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { X, Cookie, Shield, Settings } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
}

export function CookieConsent() {
  const { t } = useLanguage();
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true, // Always true, cannot be disabled
    analytics: false,
    marketing: false,
    preferences: false,
  });

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Show banner after a short delay for better UX
      setTimeout(() => setShowBanner(true), 1000);
    } else {
      // Load saved preferences
      try {
        const saved = JSON.parse(consent);
        setPreferences(saved);
      } catch (e) {
        console.error('Error loading cookie preferences:', e);
      }
    }
  }, []);

  const savePreferences = (prefs: CookiePreferences) => {
    localStorage.setItem('cookie-consent', JSON.stringify(prefs));
    localStorage.setItem('cookie-consent-date', new Date().toISOString());
    setPreferences(prefs);
    setShowBanner(false);
    setShowSettings(false);
  };

  const acceptAll = () => {
    const allAccepted: CookiePreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true,
    };
    savePreferences(allAccepted);
  };

  const acceptNecessary = () => {
    const necessaryOnly: CookiePreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false,
    };
    savePreferences(necessaryOnly);
  };

  const saveCustomPreferences = () => {
    savePreferences(preferences);
  };

  const cookieCategories = [
    {
      id: 'necessary',
      icon: Shield,
      title: t({ en: 'Necessary Cookies', fr: 'Cookies Nécessaires' }),
      description: t({
        en: 'Essential for the website to function properly. These cannot be disabled.',
        fr: 'Essentiels pour le bon fonctionnement du site. Ils ne peuvent pas être désactivés.'
      }),
      required: true,
    },
    {
      id: 'preferences',
      icon: Settings,
      title: t({ en: 'Preference Cookies', fr: 'Cookies de Préférence' }),
      description: t({
        en: 'Remember your settings and preferences like language selection.',
        fr: 'Mémorisent vos paramètres et préférences comme la sélection de langue.'
      }),
      required: false,
    },
    {
      id: 'analytics',
      icon: Cookie,
      title: t({ en: 'Analytics Cookies', fr: 'Cookies Analytiques' }),
      description: t({
        en: 'Help us understand how visitors interact with our website.',
        fr: 'Nous aident à comprendre comment les visiteurs interagissent avec notre site.'
      }),
      required: false,
    },
    {
      id: 'marketing',
      icon: Cookie,
      title: t({ en: 'Marketing Cookies', fr: 'Cookies Marketing' }),
      description: t({
        en: 'Used to deliver personalized advertisements relevant to you.',
        fr: 'Utilisés pour diffuser des publicités personnalisées pertinentes pour vous.'
      }),
      required: false,
    },
  ];

  return (
    <>
      {/* Cookie Banner */}
      <AnimatePresence>
        {showBanner && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
          >
            <Card className="max-w-6xl mx-auto shadow-2xl border-2">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <Cookie className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-foreground mb-2">
                        {t({ 
                          en: 'We value your privacy', 
                          fr: 'Nous respectons votre vie privée' 
                        })}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {t({
                          en: 'We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.',
                          fr: 'Nous utilisons des cookies pour améliorer votre expérience de navigation, proposer du contenu personnalisé et analyser notre trafic. En cliquant sur "Tout Accepter", vous consentez à notre utilisation des cookies.'
                        })}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowBanner(false)}
                    className="flex-shrink-0"
                    aria-label="Close"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardFooter className="flex flex-col sm:flex-row gap-3 pt-0">
                <Button
                  variant="outline"
                  onClick={() => setShowSettings(true)}
                  className="w-full sm:w-auto"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  {t({ en: 'Customize', fr: 'Personnaliser' })}
                </Button>
                <Button
                  variant="outline"
                  onClick={acceptNecessary}
                  className="w-full sm:w-auto"
                >
                  {t({ en: 'Necessary Only', fr: 'Nécessaires Uniquement' })}
                </Button>
                <Button
                  onClick={acceptAll}
                  className="w-full sm:w-auto sm:ml-auto"
                >
                  {t({ en: 'Accept All', fr: 'Tout Accepter' })}
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cookie Settings Dialog */}
      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-2xl">
              <Cookie className="h-6 w-6 text-primary" />
              {t({ en: 'Cookie Settings', fr: 'Paramètres des Cookies' })}
            </DialogTitle>
            <DialogDescription>
              {t({
                en: 'Manage your cookie preferences. You can enable or disable different types of cookies below.',
                fr: 'Gérez vos préférences en matière de cookies. Vous pouvez activer ou désactiver différents types de cookies ci-dessous.'
              })}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {cookieCategories.map((category, index) => (
              <div key={category.id}>
                {index > 0 && <Separator className="mb-6" />}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <category.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-foreground">
                          {category.title}
                        </h4>
                        {category.required && (
                          <Badge variant="secondary" className="text-xs">
                            {t({ en: 'Required', fr: 'Requis' })}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {category.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id={category.id}
                      checked={preferences[category.id as keyof CookiePreferences]}
                      onCheckedChange={(checked) => {
                        if (!category.required) {
                          setPreferences({
                            ...preferences,
                            [category.id]: checked,
                          });
                        }
                      }}
                      disabled={category.required}
                    />
                    <Label htmlFor={category.id} className="sr-only">
                      {category.title}
                    </Label>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Separator />

          <div className="text-sm text-muted-foreground">
            <p>
              {t({
                en: 'For more information about how we use cookies, please read our',
                fr: 'Pour plus d\'informations sur notre utilisation des cookies, veuillez consulter notre'
              })}{' '}
              <a href="/cookies" className="text-primary hover:underline">
                {t({ en: 'Cookie Policy', fr: 'Politique des Cookies' })}
              </a>
              {' '}{t({ en: 'and', fr: 'et' })}{' '}
              <a href="/privacy" className="text-primary hover:underline">
                {t({ en: 'Privacy Policy', fr: 'Politique de Confidentialité' })}
              </a>
              .
            </p>
          </div>

          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={acceptNecessary} className="w-full sm:w-auto">
              {t({ en: 'Necessary Only', fr: 'Nécessaires Uniquement' })}
            </Button>
            <Button onClick={saveCustomPreferences} className="w-full sm:w-auto">
              {t({ en: 'Save Preferences', fr: 'Enregistrer les Préférences' })}
            </Button>
            <Button onClick={acceptAll} className="w-full sm:w-auto">
              {t({ en: 'Accept All', fr: 'Tout Accepter' })}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
