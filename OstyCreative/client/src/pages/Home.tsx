import { Link } from 'wouter';
import { ArrowRight, Check, Code, Globe, Smartphone, Cloud, Zap, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/lib/language-context';
import { services, projects } from '@/data/content';
import heroImage from '@assets/generated_images/Hero_team_collaboration_92bcb36d.png';

const iconMap: Record<string, any> = {
  Globe,
  Smartphone,
  Code,
  Cloud,
  Zap,
  Users
};

export default function Home() {
  const { t, language } = useLanguage();

  const stats = [
    { label: t({ en: 'Projects Delivered', fr: 'Projets Livrés' }), value: '500+' },
    { label: t({ en: 'Happy Clients', fr: 'Clients Satisfaits' }), value: '200+' },
    { label: t({ en: 'Team Members', fr: 'Membres de l\'Équipe' }), value: '50+' },
    { label: t({ en: 'Years Experience', fr: 'Années d\'Expérience' }), value: '15+' }
  ];

  const featuredProjects = projects.slice(0, 6);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-16">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/60 z-10" />
          <img
            src={heroImage}
            alt="Team collaboration"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <Badge variant="secondary" className="mb-4" data-testid="badge-software-excellence">
              {t({ en: 'Software Excellence Since 2010', fr: 'Excellence Logicielle Depuis 2010' })}
            </Badge>
            
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight text-foreground">
              {t({
                en: 'Transform Your Business with Innovative Software',
                fr: 'Transformez Votre Entreprise avec des Logiciels Innovants'
              })}
            </h1>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t({
                en: 'We design and develop cutting-edge software solutions that drive growth, enhance efficiency, and deliver exceptional user experiences.',
                fr: 'Nous concevons et développons des solutions logicielles de pointe qui stimulent la croissance, améliorent l\'efficacité et offrent des expériences utilisateur exceptionnelles.'
              })}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/book-appointment">
                <Button size="lg" className="gap-2 text-base" data-testid="button-hero-cta">
                  {t({ en: 'Book Free Consultation', fr: 'Réserver une Consultation Gratuite' })}
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="/services">
                <Button size="lg" variant="outline" className="gap-2 text-base" data-testid="button-view-services">
                  {t({ en: 'View Services', fr: 'Voir les Services' })}
                </Button>
              </Link>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-muted-foreground pt-4">
              <Check className="h-4 w-4 text-primary" />
              <span>{t({ en: 'No commitment required', fr: 'Aucun engagement requis' })}</span>
              <span className="mx-2">•</span>
              <Check className="h-4 w-4 text-primary" />
              <span>{t({ en: '30-minute strategy session', fr: 'Session stratégique de 30 minutes' })}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card border-y border-card-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center" data-testid={`stat-${index}`}>
                <div className="text-4xl lg:text-5xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              {t({ en: 'Our Services', fr: 'Nos Services' })}
            </h2>
            <p className="text-lg text-muted-foreground">
              {t({
                en: 'Comprehensive software development solutions tailored to your business needs.',
                fr: 'Solutions de développement logiciel complètes adaptées aux besoins de votre entreprise.'
              })}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => {
              const Icon = iconMap[service.icon] || Code;
              return (
                <Card key={service.id} className="hover-elevate active-elevate-2 transition-all duration-300" data-testid={`service-card-${service.slug}`}>
                  <CardHeader>
                    <div className="h-14 w-14 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <Icon className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">
                      {service.title[language]}
                    </h3>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {service.shortDescription[language]}
                    </p>
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

          <div className="text-center mt-12">
            <Link href="/services">
              <Button variant="outline" size="lg" data-testid="button-all-services">
                {t({ en: 'View All Services', fr: 'Voir Tous les Services' })}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-24 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              {t({ en: 'Featured Projects', fr: 'Projets en Vedette' })}
            </h2>
            <p className="text-lg text-muted-foreground">
              {t({
                en: 'Discover how we\'ve helped businesses transform through technology.',
                fr: 'Découvrez comment nous avons aidé les entreprises à se transformer grâce à la technologie.'
              })}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <Link key={project.id} href={`/projects/${project.slug}`}>
                <Card className="overflow-hidden hover-elevate active-elevate-2 transition-all duration-300 group" data-testid={`project-card-${project.slug}`}>
                  <div className="aspect-[4/3] overflow-hidden bg-muted">
                    <img
                      src={`/attached_assets/generated_images/${project.image}`}
                      alt={project.title[language]}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardHeader>
                    <Badge variant="secondary" className="w-fit mb-2">
                      {project.categoryLabel[language]}
                    </Badge>
                    <h3 className="text-xl font-semibold text-foreground">
                      {project.title[language]}
                    </h3>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {project.description[language]}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/projects">
              <Button variant="outline" size="lg" data-testid="button-all-projects">
                {t({ en: 'View All Projects', fr: 'Voir Tous les Projets' })}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-primary/10 via-primary/5 to-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-foreground mb-6">
            {t({
              en: 'Ready to Start Your Project?',
              fr: 'Prêt à Démarrer Votre Projet ?'
            })}
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            {t({
              en: 'Book a free consultation to discuss your software needs and explore how we can help transform your business.',
              fr: 'Réservez une consultation gratuite pour discuter de vos besoins logiciels et découvrir comment nous pouvons aider à transformer votre entreprise.'
            })}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book-appointment">
              <Button size="lg" className="gap-2" data-testid="button-cta-appointment">
                {t({ en: 'Book Your Free Consultation', fr: 'Réserver Votre Consultation Gratuite' })}
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" data-testid="button-cta-contact">
                {t({ en: 'Contact Us', fr: 'Nous Contacter' })}
              </Button>
            </Link>
          </div>
          <p className="text-sm text-muted-foreground mt-6">
            {t({
              en: 'No commitment required • 30-minute strategy session',
              fr: 'Aucun engagement requis • Session stratégique de 30 minutes'
            })}
          </p>
        </div>
      </section>
    </div>
  );
}
