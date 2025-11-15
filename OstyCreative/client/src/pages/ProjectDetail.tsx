import { useRoute, Link } from 'wouter';
import { ArrowLeft, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/lib/language-context';
import { projects } from '@/data/content';
import NotFound from './not-found';

export default function ProjectDetail() {
  const [, params] = useRoute('/projects/:slug');
  const { t, language } = useLanguage();
  
  const project = projects.find(p => p.slug === params?.slug);

  if (!project) {
    return <NotFound />;
  }

  return (
    <div className="min-h-screen pt-16">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/projects">
          <Button variant="ghost" className="gap-2" data-testid="button-back">
            <ArrowLeft className="h-4 w-4" />
            {t({ en: 'Back to Projects', fr: 'Retour aux Projets' })}
          </Button>
        </Link>
      </div>

      {/* Hero Section */}
      <section className="pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Badge variant="secondary" className="mb-4">
            {project.categoryLabel[language]}
          </Badge>
          <h1 className="text-5xl font-bold text-foreground mb-4">
            {project.title[language]}
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            {project.description[language]}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, idx) => (
              <Badge key={idx} variant="outline">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Main Image */}
      <section className="pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-lg overflow-hidden">
            <img
              src={`/attached_assets/generated_images/${project.image}`}
              alt={project.title[language]}
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* Challenge, Solution, Results */}
      <section className="py-12 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  {t({ en: 'Challenge', fr: 'Défi' })}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {project.challenge[language]}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  {t({ en: 'Solution', fr: 'Solution' })}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {project.solution[language]}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  {t({ en: 'Results', fr: 'Résultats' })}
                </h3>
                <ul className="space-y-3">
                  {project.results.map((result, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{result[language]}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Screenshots */}
      {project.screenshots && project.screenshots.length > 0 && (
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-foreground mb-8">
              {t({ en: 'Screenshots', fr: 'Captures d\'Écran' })}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {project.screenshots.map((screenshot, idx) => (
                <div key={idx} className="rounded-lg overflow-hidden">
                  <img
                    src={`/attached_assets/generated_images/${screenshot}`}
                    alt={`Screenshot ${idx + 1}`}
                    className="w-full h-auto"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-primary/10 via-primary/5 to-background">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-foreground mb-6">
            {t({
              en: 'Want Similar Results for Your Business?',
              fr: 'Vous Voulez des Résultats Similaires pour Votre Entreprise ?'
            })}
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            {t({
              en: 'Let\'s discuss how we can help you achieve your goals.',
              fr: 'Discutons de la façon dont nous pouvons vous aider à atteindre vos objectifs.'
            })}
          </p>
          <Link href="/book-appointment">
            <Button size="lg" data-testid="button-cta-appointment">
              {t({ en: 'Book Free Consultation', fr: 'Réserver une Consultation Gratuite' })}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
