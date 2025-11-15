import { useRoute, Link } from 'wouter';
import { ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/lib/language-context';
import { services } from '@/data/content';
import NotFound from './not-found';

export default function ServiceDetail() {
  const [, params] = useRoute('/services/:slug');
  const { t, language } = useLanguage();
  
  const service = services.find(s => s.slug === params?.slug);

  if (!service) {
    return <NotFound />;
  }

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-b from-card to-background">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Badge variant="secondary" className="mb-4">
            {t({ en: 'Service', fr: 'Service' })}
          </Badge>
          <h1 className="text-5xl lg:text-6xl font-bold text-foreground mb-6">
            {service.title[language]}
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            {service.shortDescription[language]}
          </p>
          <Link href="/book-appointment">
            <Button size="lg" className="gap-2" data-testid="button-cta-appointment">
              {t({ en: 'Get Started', fr: 'Commencer' })}
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Description Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-foreground mb-6">
            {t({ en: 'Overview', fr: 'Aperçu' })}
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {service.fullDescription[language]}
          </p>
        </div>
      </section>

      {/* Features & Benefits */}
      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Features */}
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-2xl font-bold text-foreground mb-6">
                  {t({ en: 'Key Features', fr: 'Caractéristiques Clés' })}
                </h3>
                <ul className="space-y-3">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-foreground">{feature[language]}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Benefits */}
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-2xl font-bold text-foreground mb-6">
                  {t({ en: 'Benefits', fr: 'Avantages' })}
                </h3>
                <ul className="space-y-3">
                  {service.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-foreground">{benefit[language]}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-foreground mb-6">
            {t({
              en: 'Ready to Get Started?',
              fr: 'Prêt à Commencer ?'
            })}
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            {t({
              en: 'Book a free consultation to discuss your project and explore how we can help.',
              fr: 'Réservez une consultation gratuite pour discuter de votre projet et découvrir comment nous pouvons vous aider.'
            })}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book-appointment">
              <Button size="lg" className="gap-2" data-testid="button-cta-appointment">
                {t({ en: 'Book Consultation', fr: 'Réserver une Consultation' })}
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" data-testid="button-cta-contact">
                {t({ en: 'Contact Us', fr: 'Nous Contacter' })}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
