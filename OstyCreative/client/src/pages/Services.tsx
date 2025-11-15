import { Link } from 'wouter';
import { ArrowRight, Code, Globe, Smartphone, Cloud, Zap, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { useLanguage } from '@/lib/language-context';
import { services } from '@/data/content';

const iconMap: Record<string, any> = {
  Globe,
  Smartphone,
  Code,
  Cloud,
  Zap,
  Users
};

export default function Services() {
  const { t, language } = useLanguage();

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-24 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-5xl lg:text-6xl font-bold text-foreground mb-6">
            {t({ en: 'Our Services', fr: 'Nos Services' })}
          </h1>
          <p className="text-xl text-muted-foreground">
            {t({
              en: 'Comprehensive software development solutions designed to drive your business forward.',
              fr: 'Solutions de développement logiciel complètes conçues pour faire progresser votre entreprise.'
            })}
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
              const Icon = iconMap[service.icon] || Code;
              return (
                <Card key={service.id} className="hover-elevate active-elevate-2 transition-all duration-300" data-testid={`service-card-${service.slug}`}>
                  <CardHeader>
                    <div className="h-16 w-16 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <h2 className="text-2xl font-semibold text-foreground">
                      {service.title[language]}
                    </h2>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                      {service.shortDescription[language]}
                    </p>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">
                        {t({ en: 'Key Features:', fr: 'Caractéristiques Clés :' })}
                      </h4>
                      <ul className="space-y-1">
                        {service.features.slice(0, 3).map((feature, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span className="text-primary mt-1">•</span>
                            <span>{feature[language]}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Link href={`/services/${service.slug}`}>
                      <Button variant="ghost" className="gap-2 p-0" data-testid={`button-learn-more-${service.slug}`}>
                        {t({ en: 'Learn More', fr: 'En Savoir Plus' })}
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-primary/10 via-primary/5 to-background">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-foreground mb-6">
            {t({
              en: 'Not Sure Which Service You Need?',
              fr: 'Pas Sûr du Service Dont Vous Avez Besoin ?'
            })}
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            {t({
              en: 'Book a free consultation and let our experts help you find the perfect solution.',
              fr: 'Réservez une consultation gratuite et laissez nos experts vous aider à trouver la solution parfaite.'
            })}
          </p>
          <Link href="/book-appointment">
            <Button size="lg" className="gap-2" data-testid="button-cta-appointment">
              {t({ en: 'Schedule Consultation', fr: 'Planifier une Consultation' })}
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
