import { Link } from 'wouter';
import { Mail, Phone, MapPin, Linkedin, Github, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/lib/language-context';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-card border-t border-card-border mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-bold text-foreground">E&M Software System</h3>
              <p className="text-sm text-muted-foreground mt-2">
                {t({
                  en: 'Transforming businesses through innovative software solutions.',
                  fr: 'Transformer les entreprises grâce à des solutions logicielles innovantes.'
                })}
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" asChild data-testid="link-linkedin">
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <Linkedin className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild data-testid="link-github">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <Github className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild data-testid="link-twitter">
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                  <Twitter className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">
              {t({ en: 'Quick Links', fr: 'Liens Rapides' })}
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-about">
                  {t({ en: 'About Us', fr: 'À Propos' })}
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-projects">
                  {t({ en: 'Projects', fr: 'Projets' })}
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-blog">
                  {t({ en: 'Blog', fr: 'Blog' })}
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-faq">
                  {t({ en: 'FAQ', fr: 'FAQ' })}
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">
              {t({ en: 'Services', fr: 'Services' })}
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/services/web-development" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-web">
                  {t({ en: 'Web Development', fr: 'Développement Web' })}
                </Link>
              </li>
              <li>
                <Link href="/services/mobile-development" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-mobile">
                  {t({ en: 'Mobile Development', fr: 'Développement Mobile' })}
                </Link>
              </li>
              <li>
                <Link href="/services/custom-software" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-custom">
                  {t({ en: 'Custom Software', fr: 'Logiciel Sur Mesure' })}
                </Link>
              </li>
              <li>
                <Link href="/services/cloud-solutions" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-cloud">
                  {t({ en: 'Cloud Solutions', fr: 'Solutions Cloud' })}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">
              {t({ en: 'Contact', fr: 'Contact' })}
            </h4>
            <ul className="space-y-3 text-sm text-muted-foreground mb-4">
              <li className="flex items-start gap-2">
                <Mail className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>contact@emsoftware.com</span>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>123 Tech Street, Innovation City</span>
              </li>
            </ul>
            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground">
                {t({ en: 'Newsletter', fr: 'Infolettre' })}
              </p>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder={t({ en: 'Your email', fr: 'Votre email' })}
                  className="text-sm"
                  data-testid="input-newsletter"
                />
                <Button size="sm" data-testid="button-subscribe">
                  {t({ en: 'Subscribe', fr: 'S\'abonner' })}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© 2025 E&M Software System. {t({ en: 'All rights reserved.', fr: 'Tous droits réservés.' })}</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-foreground transition-colors" data-testid="link-privacy">
              {t({ en: 'Privacy Policy', fr: 'Politique de Confidentialité' })}
            </Link>
            <Link href="/cookies" className="hover:text-foreground transition-colors" data-testid="link-cookies">
              {t({ en: 'Cookie Policy', fr: 'Politique des Cookies' })}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
