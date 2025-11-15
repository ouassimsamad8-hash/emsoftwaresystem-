import { useState } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/lib/language-context';
import { projects } from '@/data/content';

export default function Projects() {
  const { t, language } = useLanguage();
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { id: 'all', label: t({ en: 'All Projects', fr: 'Tous les Projets' }) },
    { id: 'web', label: t({ en: 'Web Development', fr: 'Développement Web' }) },
    { id: 'mobile', label: t({ en: 'Mobile Apps', fr: 'Applications Mobiles' }) },
    { id: 'custom', label: t({ en: 'Custom Software', fr: 'Logiciel Sur Mesure' }) },
    { id: 'cloud', label: t({ en: 'Digital Transformation', fr: 'Transformation Digitale' }) }
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-24 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-5xl lg:text-6xl font-bold text-foreground mb-6">
            {t({ en: 'Our Projects', fr: 'Nos Projets' })}
          </h1>
          <p className="text-xl text-muted-foreground">
            {t({
              en: 'Explore our portfolio of successful software solutions.',
              fr: 'Explorez notre portfolio de solutions logicielles réussies.'
            })}
          </p>
        </div>
      </section>

      {/* Filter Buttons */}
      <section className="pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-2">
            {filters.map((filter) => (
              <Button
                key={filter.id}
                variant={activeFilter === filter.id ? 'default' : 'outline'}
                onClick={() => setActiveFilter(filter.id)}
                data-testid={`filter-${filter.id}`}
              >
                {filter.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
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
                    <p className="text-muted-foreground mb-4">
                      {project.description[language]}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 3).map((tech, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
