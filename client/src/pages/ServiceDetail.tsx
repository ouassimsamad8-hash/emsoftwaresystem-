import { useRoute, Link } from 'wouter';
import { ArrowRight, Check, Globe, Smartphone, Code, Cloud, Zap, Users, FileText, TrendingUp, Shield, Clock, ChevronRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '@/lib/language-context';
import { services, projects } from '@/data/content';
import NotFound from './not-found';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const iconMap: Record<string, any> = {
  Globe,
  Smartphone,
  Code,
  Cloud,
  Zap,
  Users
};

export default function ServiceDetail() {
  const [, params] = useRoute('/services/:slug');
  const { t, language } = useLanguage();
  const featuresRef = useRef(null);
  const processRef = useRef(null);
  const projectsRef = useRef(null);
  
  const featuresInView = useInView(featuresRef, { once: true, margin: "-100px" });
  const processInView = useInView(processRef, { once: true, margin: "-100px" });
  const projectsInView = useInView(projectsRef, { once: true, margin: "-100px" });
  
  const service = services.find(s => s.slug === params?.slug);

  if (!service) {
    return <NotFound />;
  }

  const Icon = iconMap[service.icon] || Code;

  // Get related projects for this service category
  const relatedProjects = projects.filter(p => 
    p.categoryLabel[language].toLowerCase().includes(service.title[language].toLowerCase().split(' ')[0])
  ).slice(0, 3);

  const deliverables = [
    {
      icon: FileText,
      title: t({ en: 'Documentation', fr: 'Documentation' }),
      description: t({
        en: 'Comprehensive technical and user documentation',
        fr: 'Documentation technique et utilisateur complète'
      })
    },
    {
      icon: Code,
      title: t({ en: 'Source Code', fr: 'Code Source' }),
      description: t({
        en: 'Clean, well-documented, and maintainable code',
        fr: 'Code propre, bien documenté et maintenable'
      })
    },
    {
      icon: Shield,
      title: t({ en: 'Security & Testing', fr: 'Sécurité & Tests' }),
      description: t({
        en: 'Complete testing suite and security audit',
        fr: 'Suite de tests complète et audit de sécurité'
      })
    },
    {
      icon: Clock,
      title: t({ en: 'Ongoing Support', fr: 'Support Continu' }),
      description: t({
        en: 'Post-launch maintenance and support',
        fr: 'Maintenance et support post-lancement'
      })
    }
  ];

  const processSteps = [
    {
      title: t({ en: 'Requirements Gathering', fr: 'Collecte des Exigences' }),
      description: t({
        en: 'We analyze your needs and define project scope',
        fr: 'Nous analysons vos besoins et définissons la portée du projet'
      })
    },
    {
      title: t({ en: 'Design & Planning', fr: 'Conception & Planification' }),
      description: t({
        en: 'Creating wireframes, mockups, and technical architecture',
        fr: 'Création de wireframes, maquettes et architecture technique'
      })
    },
    {
      title: t({ en: 'Development', fr: 'Développement' }),
      description: t({
        en: 'Agile development with regular updates and feedback',
        fr: 'Développement agile avec mises à jour et feedback réguliers'
      })
    },
    {
      title: t({ en: 'Testing & QA', fr: 'Tests & Assurance Qualité' }),
      description: t({
        en: 'Comprehensive testing to ensure quality and performance',
        fr: 'Tests complets pour assurer qualité et performance'
      })
    },
    {
      title: t({ en: 'Deployment', fr: 'Déploiement' }),
      description: t({
        en: 'Smooth launch with monitoring and optimization',
        fr: 'Lancement en douceur avec surveillance et optimisation'
      })
    },
    {
      title: t({ en: 'Support', fr: 'Support' }),
      description: t({
        en: 'Ongoing maintenance, updates, and technical support',
        fr: 'Maintenance, mises à jour et support technique continus'
      })
    }
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-b from-primary/5 via-card to-background relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Link href="/services">
                <Button variant="ghost" className="mb-4 gap-2 px-0 hover:gap-3 transition-all">
                  <ChevronRight className="h-4 w-4 rotate-180" />
                  {t({ en: 'Back to Services', fr: 'Retour aux Services' })}
                </Button>
              </Link>
              <Badge variant="secondary" className="mb-4">
                {t({ en: 'Service', fr: 'Service' })}
              </Badge>
              <h1 className="text-5xl lg:text-6xl font-bold text-foreground mb-6">
                {service.title[language]}
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                {service.shortDescription[language]}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="gap-2" 
                  data-testid="button-cta-appointment"
                  data-cal-link="emsoftware-system-dlwqri/30min"
                  data-cal-config='{"layout":"column_view"}'
                >
                  {t({ en: 'Get Started', fr: 'Commencer' })}
                  <ArrowRight className="h-5 w-5" />
                </Button>
                <Link href="/contact">
                  <Button size="lg" variant="outline">
                    {t({ en: 'Request Quote', fr: 'Demander un Devis' })}
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl p-12 backdrop-blur-sm border border-primary/20">
                <div className="flex justify-center mb-8">
                  <motion.div 
                    className="h-32 w-32 rounded-2xl bg-primary/10 flex items-center justify-center"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.8 }}
                  >
                    <Icon className="h-16 w-16 text-primary" />
                  </motion.div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-background/50 rounded-lg p-4">
                    <TrendingUp className="h-6 w-6 text-green-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-foreground">98%</div>
                    <div className="text-sm text-muted-foreground">
                      {t({ en: 'Success Rate', fr: 'Taux de Réussite' })}
                    </div>
                  </div>
                  <div className="bg-background/50 rounded-lg p-4">
                    <Star className="h-6 w-6 text-yellow-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-foreground">4.9/5</div>
                    <div className="text-sm text-muted-foreground">
                      {t({ en: 'Client Rating', fr: 'Note Client' })}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-foreground mb-6">
              {t({ en: 'Overview', fr: 'Aperçu' })}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {service.fullDescription[language]}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features & Benefits */}
      <section ref={featuresRef} className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Features */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={featuresInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <h3 className="text-2xl font-bold text-foreground flex items-center gap-2">
                    <Check className="h-6 w-6 text-primary" />
                    {t({ en: 'Key Features', fr: 'Caractéristiques Clés' })}
                  </h3>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {service.features.map((feature, idx) => (
                      <motion.li 
                        key={idx} 
                        className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors"
                        initial={{ opacity: 0, x: -20 }}
                        animate={featuresInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                        transition={{ duration: 0.4, delay: idx * 0.1 }}
                      >
                        <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-foreground font-medium">{feature[language]}</span>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            {/* Benefits */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={featuresInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <h3 className="text-2xl font-bold text-foreground flex items-center gap-2">
                    <TrendingUp className="h-6 w-6 text-primary" />
                    {t({ en: 'Business Benefits', fr: 'Avantages Commerciaux' })}
                  </h3>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {service.benefits.map((benefit, idx) => (
                      <motion.li 
                        key={idx} 
                        className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors"
                        initial={{ opacity: 0, x: 20 }}
                        animate={featuresInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                        transition={{ duration: 0.4, delay: idx * 0.1 }}
                      >
                        <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-foreground font-medium">{benefit[language]}</span>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section ref={processRef} className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={processInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-foreground mb-4">
              {t({ en: 'Our Development Process', fr: 'Notre Processus de Développement' })}
            </h2>
            <p className="text-lg text-muted-foreground">
              {t({
                en: 'A structured approach to deliver exceptional results',
                fr: 'Une approche structurée pour fournir des résultats exceptionnels'
              })}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={processInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-foreground mb-2">
                          {step.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Deliverables */}
      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              {t({ en: 'What You Get', fr: 'Ce Que Vous Obtenez' })}
            </h2>
            <p className="text-lg text-muted-foreground">
              {t({
                en: 'Comprehensive deliverables for your project',
                fr: 'Livrables complets pour votre projet'
              })}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {deliverables.map((item, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="h-14 w-14 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <item.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section ref={projectsRef} className="py-24 bg-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={projectsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-foreground mb-4">
                {t({ en: 'Related Projects', fr: 'Projets Connexes' })}
              </h2>
              <p className="text-lg text-muted-foreground">
                {t({
                  en: 'See how we\'ve helped other clients with similar needs',
                  fr: 'Voyez comment nous avons aidé d\'autres clients avec des besoins similaires'
                })}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {relatedProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={projectsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link href={`/projects/${project.slug}`}>
                    <Card className="overflow-hidden hover:shadow-xl transition-all group">
                      <div className="aspect-[4/3] overflow-hidden bg-muted">
                        <img
                          src={`/attached_assets/generated_images/${project.image}`}
                          alt={project.title[language]}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <CardContent className="pt-6">
                        <Badge variant="secondary" className="mb-2">
                          {project.categoryLabel[language]}
                        </Badge>
                        <h3 className="text-xl font-semibold text-foreground mb-2">
                          {project.title[language]}
                        </h3>
                        <p className="text-muted-foreground text-sm">
                          {project.description[language]}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/projects">
                <Button variant="outline" size="lg">
                  {t({ en: 'View All Projects', fr: 'Voir Tous les Projets' })}
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="py-24 bg-gradient-to-r from-primary/10 via-primary/5 to-background">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-foreground mb-6">
              {t({
                en: 'Ready to Transform Your Business?',
                fr: 'Prêt à Transformer Votre Entreprise ?'
              })}
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              {t({
                en: 'Let\'s discuss how we can help you achieve your goals with this service.',
                fr: 'Discutons de la façon dont nous pouvons vous aider à atteindre vos objectifs avec ce service.'
              })}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="gap-2" 
                data-testid="button-cta-appointment"
                data-cal-link="emsoftware-system-dlwqri/30min"
                data-cal-config='{"layout":"column_view"}'
              >
                {t({ en: 'Book Free Consultation', fr: 'Réserver une Consultation Gratuite' })}
                <ArrowRight className="h-5 w-5" />
              </Button>
              <Link href="/contact">
                <Button size="lg" variant="outline" data-testid="button-cta-contact">
                  {t({ en: 'Contact Sales', fr: 'Contacter les Ventes' })}
                </Button>
              </Link>
            </div>
            <p className="text-sm text-muted-foreground mt-6">
              {t({
                en: 'Free 30-minute consultation • No commitment required • Expert advice',
                fr: 'Consultation gratuite de 30 minutes • Aucun engagement requis • Conseils d\'experts'
              })}
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
