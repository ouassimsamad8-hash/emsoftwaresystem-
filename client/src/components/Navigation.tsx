import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X, Calendar, Sun, Moon, Monitor } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useLanguage } from '@/lib/language-context';
import { useAppointment } from '@/components/CalWidget';
import { useTheme } from '@/lib/theme-context';
import { useSiteSettings } from '@/hooks/use-site-settings';
import { menuItems } from '@/data/content';

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { theme, setTheme } = useTheme();
  const { openModal } = useAppointment();
  const { data: siteSettings } = useSiteSettings();
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Update favicon when site settings change
  useEffect(() => {
    if (siteSettings?.favicon) {
      const existing = document.querySelector("link[rel*='icon']");
      const link = existing instanceof HTMLLinkElement ? existing : document.createElement('link');
      link.type = 'image/x-icon';
      link.rel = 'shortcut icon';
      link.href = siteSettings.favicon.url;
      if (!existing) {
        document.getElementsByTagName('head')[0].appendChild(link);
      }
    }
  }, [siteSettings?.favicon]);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'fr' : 'en');
  };

  const items = menuItems[language];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/95 backdrop-blur-md border-b border-border shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2" data-testid="link-home">
            {siteSettings?.logo || siteSettings?.logoLight ? (
              <img
                src={theme === 'dark' && siteSettings?.logoLight ? siteSettings.logoLight.url : siteSettings?.logo?.url}
                alt={siteSettings?.siteName || 'E&M Software System'}
                className="h-10 w-auto object-contain"
              />
            ) : (
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-foreground">
                  {siteSettings?.siteName || 'E&M Software'}
                </span>
                <span className="text-xs text-muted-foreground">System</span>
              </div>
            )}
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1">
            {items.map((item) => (
              <Link key={item.path} href={item.path}>
                <Button
                  variant="ghost"
                  className={`${location === item.path ? 'bg-accent' : ''}`}
                  data-testid={`link-${item.path.slice(1) || 'home'}`}
                >
                  {item.label}
                </Button>
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center gap-2">
            {/* Theme Toggle */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" data-testid="button-theme-toggle">
                  {theme === 'light' && <Sun className="h-5 w-5" />}
                  {theme === 'dark' && <Moon className="h-5 w-5" />}
                  {theme === 'system' && <Monitor className="h-5 w-5" />}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme('light')}>
                  <Sun className="h-4 w-4 mr-2" />
                  {t({ en: 'Light', fr: 'Clair' })}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('dark')}>
                  <Moon className="h-4 w-4 mr-2" />
                  {t({ en: 'Dark', fr: 'Sombre' })}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('system')}>
                  <Monitor className="h-4 w-4 mr-2" />
                  {t({ en: 'System', fr: 'Système' })}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Language Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="font-mono"
              data-testid="button-language-toggle"
            >
              {language === 'en' ? 'FR' : 'EN'}
            </Button>

            {/* Book Appointment CTA */}
            <Button 
              className="gap-2" 
              data-testid="button-book-appointment"
              onClick={openModal}
            >
              <Calendar className="h-4 w-4" />
              {t({ en: 'Book Appointment', fr: 'Prendre RDV' })}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="font-mono"
              data-testid="button-language-toggle-mobile"
            >
              {language === 'en' ? 'FR' : 'EN'}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background border-t border-border">
          <div className="px-4 py-4 space-y-2">
            {items.map((item) => (
              <Link key={item.path} href={item.path}>
                <Button
                  variant="ghost"
                  className={`w-full justify-start ${location === item.path ? 'bg-accent' : ''}`}
                  data-testid={`link-mobile-${item.path.slice(1) || 'home'}`}
                >
                  {item.label}
                </Button>
              </Link>
            ))}
            <Button 
              className="w-full gap-2" 
              data-testid="button-book-appointment-mobile"
              onClick={() => {
                setIsMobileMenuOpen(false);
                openModal();
              }}
            >
              <Calendar className="h-4 w-4" />
              {t({ en: 'Book Appointment', fr: 'Prendre RDV' })}
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
