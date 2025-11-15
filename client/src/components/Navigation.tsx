import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/lib/language-context';
import { menuItems } from '@/data/content';

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
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
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-foreground">E&M Software</span>
              <span className="text-xs text-muted-foreground">System</span>
            </div>
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
            <Link href="/book-appointment">
              <Button className="gap-2" data-testid="button-book-appointment">
                <Calendar className="h-4 w-4" />
                {t({ en: 'Book Appointment', fr: 'Prendre RDV' })}
              </Button>
            </Link>
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
            <Link href="/book-appointment">
              <Button className="w-full gap-2" data-testid="button-book-appointment-mobile">
                <Calendar className="h-4 w-4" />
                {t({ en: 'Book Appointment', fr: 'Prendre RDV' })}
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
