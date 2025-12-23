import { Link } from 'wouter';
import { ArrowRight, Code, Globe, Smartphone, Cloud, Zap, Users, CheckCircle2, TrendingUp, Shield, Clock, DollarSign, Award, Target, Lightbulb, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useLanguage } from '@/lib/language-context';
import { services, projects } from '@/data/content';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import servicesHeroImage from '@assets/generated_images/Team_meeting_collaboration_dfc2f0e9.png';

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
  const statsRef = useRef(null);
  const servicesRef = useRef(null);
  const processRef = useRef(null);
  const techRef = useRef(null);
  const projectsRef = useRef(null);
  
  const statsInView = useInView(statsRef, { once: true, margin: "-100px" });
  const servicesInView = useInView(servicesRef, { once: true, margin: "-100px" });
  const processInView = useInView(processRef, { once: true, margin: "-100px" });
  const techInView = useInView(techRef, { once: true, margin: "-100px" });
  const projectsInView = useInView(projectsRef, { once: true, margin: "-100px" });

  const featuredProjects = projects.slice(0, 6);

  const stats = [
    { 
      icon: Award, 
      value: '500+', 
      label: t({ en: 'Projects Delivered', fr: 'Projets Livrés' }),
      color: 'text-blue-500'
    },
    { 
      icon: TrendingUp, 
      value: '98%', 
      label: t({ en: 'Client Satisfaction', fr: 'Satisfaction Client' }),
      color: 'text-green-500'
    },
    { 
      icon: Shield, 
      value: '15+', 
      label: t({ en: 'Years Experience', fr: 'Années d\'Expérience' }),
      color: 'text-purple-500'
    },
    { 
      icon: Clock, 
      value: '24/7', 
      label: t({ en: 'Support Available', fr: 'Support Disponible' }),
      color: 'text-orange-500'
    }
  ];

  const processSteps = [
    {
      number: '01',
      title: t({ en: 'Discovery & Planning', fr: 'Découverte & Planification' }),
      description: t({
        en: 'We begin by understanding your business goals, requirements, and challenges through in-depth consultations.',
        fr: 'Nous commençons par comprendre vos objectifs commerciaux, exigences et défis à travers des consultations approfondies.'
      }),
      icon: Lightbulb
    },
    {
      number: '02',
      title: t({ en: 'Design & Architecture', fr: 'Conception & Architecture' }),
      description: t({
        en: 'Our team creates comprehensive technical designs and architecture that align with your business objectives.',
        fr: 'Notre équipe crée des conceptions techniques et une architecture complètes qui s\'alignent avec vos objectifs commerciaux.'
      }),
      icon: Target
    },
    {
      number: '03',
      title: t({ en: 'Development & Testing', fr: 'Développement & Tests' }),
      description: t({
        en: 'We build your solution using agile methodologies with continuous testing and quality assurance.',
        fr: 'Nous construisons votre solution en utilisant des méthodologies agiles avec tests continus et assurance qualité.'
      }),
      icon: Code
    },
    {
      number: '04',
      title: t({ en: 'Deployment & Support', fr: 'Déploiement & Support' }),
      description: t({
        en: 'We deploy your solution and provide ongoing maintenance, updates, and technical support.',
        fr: 'Nous déployons votre solution et fournissons maintenance, mises à jour et support technique continus.'
      }),
      icon: Rocket
    }
  ];

  const technologies = {
    frontend: ['React', 'Vue.js', 'Angular', 'Next.js', 'TypeScript', 'Tailwind CSS'],
    backend: ['Node.js', 'Python', 'Java', '.NET', 'PHP', 'Go'],
    mobile: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Ionic'],
    cloud: ['AWS', 'Azure', 'Google Cloud', 'Docker', 'Kubernetes'],
    database: ['PostgreSQL', 'MongoDB', 'MySQL', 'Redis', 'Elasticsearch']
  };

  const whyChooseUs = [
    {
      icon: Award,
      title: t({ en: 'Industry Expertise', fr: 'Expertise Sectorielle' }),
      description: t({
        en: '15+ years of experience delivering innovative solutions across various industries.',
        fr: '15+ ans d\'expérience dans la fourniture de solutions innovantes dans divers secteurs.'
      })
    },
    {
      icon: TrendingUp,
      title: t({ en: 'Proven Track Record', fr: 'Historique Éprouvé' }),
      description: t({
        en: '500+ successful projects with measurable business impact and ROI.',
        fr: '500+ projets réussis avec un impact commercial mesurable et un ROI.'
      })
    },
    {
      icon: Shield,
      title: t({ en: 'Security First', fr: 'Sécurité d\'Abord' }),
      description: t({
        en: 'Bank-level security standards and compliance with industry regulations.',
        fr: 'Normes de sécurité bancaire et conformité aux réglementations de l\'industrie.'
      })
    },
    {
      icon: Users,
      title: t({ en: 'Dedicated Team', fr: 'Équipe Dédiée' }),
      description: t({
        en: 'Expert developers, designers, and project managers committed to your success.',
        fr: 'Développeurs, designers et chefs de projet experts engagés dans votre succès.'
      })
    },
    {
      icon: Clock,
      title: t({ en: 'Agile Methodology', fr: 'Méthodologie Agile' }),
      description: t({
        en: 'Flexible, iterative approach ensuring faster delivery and better results.',
        fr: 'Approche flexible et itérative garantissant une livraison plus rapide et de meilleurs résultats.'
      })
    },
    {
      icon: DollarSign,
      title: t({ en: 'Transparent Pricing', fr: 'Tarification Transparente' }),
      description: t({
        en: 'Clear, upfront pricing with no hidden costs or surprises.',
        fr: 'Tarification claire et initiale sans coûts cachés ni surprises.'
      })
    }
  ];

  const faqs = [
    {
      question: t({ en: 'How long does a typical project take?', fr: 'Combien de temps prend un projet typique ?' }),
      answer: t({
        en: 'Project timelines vary based on complexity and scope. A simple website might take 4-6 weeks, while a complex enterprise application could take 3-6 months. We provide detailed timelines during our initial consultation.',
        fr: 'Les délais du projet varient en fonction de la complexité et de la portée. Un site web simple peut prendre 4 à 6 semaines, tandis qu\'une application d\'entreprise complexe peut prendre 3 à 6 mois. Nous fournissons des délais détaillés lors de notre consultation initiale.'
      })
    },
    {
      question: t({ en: 'Do you provide ongoing support after launch?', fr: 'Offrez-vous un support continu après le lancement ?' }),
      answer: t({
        en: 'Yes, we offer comprehensive maintenance and support packages including bug fixes, security updates, performance optimization, and feature enhancements. Our support is available 24/7.',
        fr: 'Oui, nous offrons des forfaits de maintenance et de support complets incluant les corrections de bugs, les mises à jour de sécurité, l\'optimisation des performances et les améliorations de fonctionnalités. Notre support est disponible 24/7.'
      })
    },
    {
      question: t({ en: 'Can you work with our existing systems?', fr: 'Pouvez-vous travailler avec nos systèmes existants ?' }),
      answer: t({
        en: 'Absolutely. We specialize in integrating with existing systems, modernizing legacy applications, and ensuring seamless data migration. We conduct thorough assessments to ensure compatibility.',
        fr: 'Absolument. Nous nous spécialisons dans l\'intégration avec les systèmes existants, la modernisation des applications legacy et la garantie d\'une migration de données transparente. Nous effectuons des évaluations approfondies pour assurer la compatibilité.'
      })
    },
    {
      question: t({ en: 'What is your pricing model?', fr: 'Quel est votre modèle de tarification ?' }),
      answer: t({
        en: 'We offer flexible pricing models including fixed-price projects, time and materials, and dedicated team arrangements. The best model depends on your project scope, timeline, and budget. We provide detailed quotes after understanding your requirements.',
        fr: 'Nous proposons des modèles de tarification flexibles, notamment des projets à prix fixe, du temps et des matériaux, et des arrangements d\'équipe dédiée. Le meilleur modèle dépend de la portée de votre projet, du calendrier et du budget. Nous fournissons des devis détaillés après avoir compris vos besoins.'
      })
    },
    {
      question: t({ en: 'How do you ensure code quality?', fr: 'Comment assurez-vous la qualité du code ?' }),
      answer: t({
        en: 'We follow industry best practices including code reviews, automated testing, continuous integration/deployment, and adherence to coding standards. Every project undergoes rigorous quality assurance before delivery.',
        fr: 'Nous suivons les meilleures pratiques de l\'industrie, notamment les revues de code, les tests automatisés, l\'intégration/déploiement continu et le respect des normes de codage. Chaque projet fait l\'objet d\'une assurance qualité rigoureuse avant la livraison.'
      })
    }
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/80 z-10" />
          <img
            src={servicesHeroImage}
            alt="Services"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="relative z-20 w-full px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl"
            >
              <Badge variant="secondary" className="mb-4">
                {t({ en: 'Professional Services', fr: 'Services Professionnels' })}
              </Badge>
              <h1 className="text-5xl lg:text-6xl font-bold text-foreground mb-6">
                {t({ 
                  en: 'Transform Your Business with Cutting-Edge Software Solutions', 
                  fr: 'Transformez Votre Entreprise avec des Solutions Logicielles de Pointe' 
                })}
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                {t({
                  en: 'From concept to deployment, we deliver comprehensive software development solutions that drive growth, enhance efficiency, and create competitive advantages.',
                  fr: 'Du concept au déploiement, nous fournissons des solutions de développement logiciel complètes qui stimulent la croissance, améliorent l\'efficacité et créent des avantages concurrentiels.'
                })}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="gap-2"
                  data-cal-link="emsoftware-system-dlwqri/30min"
                  data-cal-config='{"layout":"column_view"}'
                >
                  {t({ en: 'Get Started Today', fr: 'Commencer Aujourd\'hui' })}
                  <ArrowRight className="h-5 w-5" />
                </Button>
                <Link href="/contact">
                  <Button size="lg" variant="outline">
                    {t({ en: 'Talk to an Expert', fr: 'Parler à un Expert' })}
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-16 border-y border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={statsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="flex justify-center mb-3">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
                <div className="text-4xl font-bold text-foreground mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section ref={servicesRef} className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={servicesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-4xl font-bold text-foreground mb-4">
              {t({ en: 'Our Services', fr: 'Nos Services' })}
            </h2>
            <p className="text-lg text-muted-foreground">
              {t({
                en: 'Comprehensive software development solutions tailored to your business needs.',
                fr: 'Solutions de développement logiciel complètes adaptées aux besoins de votre entreprise.'
              })}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = iconMap[service.icon] || Code;
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={servicesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                >
                  <Card className="h-full hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50" data-testid={`service-card-${service.slug}`}>
                    <CardHeader>
                      <motion.div 
                        className="h-16 w-16 rounded-lg bg-primary/10 flex items-center justify-center mb-4"
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                      >
                        <Icon className="h-8 w-8 text-primary" />
                      </motion.div>
                      <h3 className="text-2xl font-semibold text-foreground mb-2">
                        {service.title[language]}
                      </h3>
                      <CardDescription className="text-base">
                        {service.shortDescription[language]}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary" />
                          {t({ en: 'Key Features', fr: 'Caractéristiques Clés' })}
                        </h4>
                        <ul className="space-y-2">
                          {service.features.slice(0, 3).map((feature, idx) => (
                            <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                              <span className="text-primary mt-1">•</span>
                              <span>{feature[language]}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-0">
                      <Link href={`/services/${service.slug}`} className="w-full">
                        <Button variant="ghost" className="gap-2 w-full group" data-testid={`button-learn-more-${service.slug}`}>
                          {t({ en: 'Learn More', fr: 'En Savoir Plus' })}
                          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-gradient-to-b from-card to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              {t({ en: 'Why Choose E&M Software System', fr: 'Pourquoi Choisir E&M Software System' })}
            </h2>
            <p className="text-lg text-muted-foreground">
              {t({
                en: 'We combine technical excellence with business understanding to deliver solutions that truly make a difference.',
                fr: 'Nous combinons l\'excellence technique avec la compréhension des affaires pour fournir des solutions qui font vraiment la différence.'
              })}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChooseUs.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <item.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section ref={processRef} className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={processInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-4xl font-bold text-foreground mb-4">
              {t({ en: 'Our Process', fr: 'Notre Processus' })}
            </h2>
            <p className="text-lg text-muted-foreground">
              {t({
                en: 'A proven methodology that ensures successful project delivery from start to finish.',
                fr: 'Une méthodologie éprouvée qui garantit la livraison réussie du projet du début à la fin.'
              })}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={processInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
              >
                <Card className="h-full relative overflow-hidden group hover:shadow-lg transition-all">
                  <div className="absolute top-0 right-0 text-8xl font-bold text-primary/5 group-hover:text-primary/10 transition-colors">
                    {step.number}
                  </div>
                  <CardContent className="pt-6 relative z-10">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <step.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="text-sm font-mono text-primary mb-2">{step.number}</div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section ref={techRef} className="py-24 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={techInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-4xl font-bold text-foreground mb-4">
              {t({ en: 'Technologies We Master', fr: 'Technologies Que Nous Maîtrisons' })}
            </h2>
            <p className="text-lg text-muted-foreground">
              {t({
                en: 'We work with cutting-edge technologies to build modern, scalable solutions.',
                fr: 'Nous travaillons avec des technologies de pointe pour construire des solutions modernes et évolutives.'
              })}
            </p>
          </motion.div>

          <Tabs defaultValue="frontend" className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-8">
              <TabsTrigger value="frontend">Frontend</TabsTrigger>
              <TabsTrigger value="backend">Backend</TabsTrigger>
              <TabsTrigger value="mobile">Mobile</TabsTrigger>
              <TabsTrigger value="cloud">Cloud</TabsTrigger>
              <TabsTrigger value="database">Database</TabsTrigger>
            </TabsList>
            
            {Object.entries(technologies).map(([key, techs]) => (
              <TabsContent key={key} value={key}>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {techs.map((tech, index) => (
                    <motion.div
                      key={tech}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={techInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <Card className="text-center hover:shadow-md transition-shadow hover:border-primary/50">
                        <CardContent className="pt-6 pb-6">
                          <p className="font-semibold text-foreground">{tech}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Featured Projects */}
      <section ref={projectsRef} className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={projectsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-4xl font-bold text-foreground mb-4">
              {t({ en: 'Featured Projects', fr: 'Projets en Vedette' })}
            </h2>
            <p className="text-lg text-muted-foreground">
              {t({
                en: 'Discover how we\'ve helped businesses transform through technology.',
                fr: 'Découvrez comment nous avons aidé les entreprises à se transformer grâce à la technologie.'
              })}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={projectsInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <Link href={`/projects/${project.slug}`}>
                  <Card className="overflow-hidden transition-all duration-300 group hover:shadow-2xl border-2 hover:border-primary/50" data-testid={`project-card-${project.slug}`}>
                    <div className="aspect-[4/3] overflow-hidden bg-muted relative">
                      <motion.img
                        src={`/${project.image}`}
                        alt={project.title[language]}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.4 }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <CardHeader>
                      <Badge variant="secondary" className="w-fit mb-2">
                        {project.categoryLabel[language]}
                      </Badge>
                      <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
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
                    <CardFooter className="pt-0">
                      <Button variant="ghost" className="gap-2 p-0 group-hover:gap-3 transition-all">
                        {t({ en: 'View Project', fr: 'Voir le Projet' })}
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={projectsInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mt-12"
          >
            <Link href="/projects">
              <Button variant="outline" size="lg">
                {t({ en: 'View All Projects', fr: 'Voir Tous les Projets' })}
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-card">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              {t({ en: 'Frequently Asked Questions', fr: 'Questions Fréquemment Posées' })}
            </h2>
            <p className="text-lg text-muted-foreground">
              {t({
                en: 'Find answers to common questions about our services and process.',
                fr: 'Trouvez des réponses aux questions courantes sur nos services et notre processus.'
              })}
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              {t({
                en: 'Still have questions? We\'re here to help.',
                fr: 'Vous avez encore des questions ? Nous sommes là pour vous aider.'
              })}
            </p>
            <Link href="/faq">
              <Button variant="outline">
                {t({ en: 'View All FAQs', fr: 'Voir Toutes les FAQ' })}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
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
                en: 'Ready to Start Your Project?',
                fr: 'Prêt à Démarrer Votre Projet ?'
              })}
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              {t({
                en: 'Book a free consultation to discuss your needs and explore how we can help transform your business.',
                fr: 'Réservez une consultation gratuite pour discuter de vos besoins et découvrir comment nous pouvons aider à transformer votre entreprise.'
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
                {t({ en: 'Schedule Free Consultation', fr: 'Planifier une Consultation Gratuite' })}
                <ArrowRight className="h-5 w-5" />
              </Button>
              <Link href="/contact">
                <Button size="lg" variant="outline">
                  {t({ en: 'Contact Us', fr: 'Nous Contacter' })}
                </Button>
              </Link>
            </div>
            <p className="text-sm text-muted-foreground mt-6">
              {t({
                en: 'No commitment required • 30-minute strategy session • Expert guidance',
                fr: 'Aucun engagement requis • Session stratégique de 30 minutes • Conseils d\'experts'
              })}
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
