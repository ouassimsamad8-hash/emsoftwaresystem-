import { Link } from 'wouter';
import { ArrowRight, Check, Code, Globe, Smartphone, Cloud, Zap, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/lib/language-context';
import { services, projects } from '@/data/content';
import heroImage from '@assets/generated_images/Hero_team_collaboration_92bcb36d.png';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef } from 'react';

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
  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const servicesRef = useRef(null);
  const projectsRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const statsInView = useInView(statsRef, { once: true, margin: "-100px" });
  const servicesInView = useInView(servicesRef, { once: true, margin: "-100px" });
  const projectsInView = useInView(projectsRef, { once: true, margin: "-100px" });

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
      <section ref={heroRef} className="relative min-h-screen flex items-center pt-16 overflow-hidden" style={{ position: 'relative' }}>
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ y }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/60 z-10" />
          <img
            src={heroImage}
            alt="Team collaboration"
            className="w-full h-full object-cover"
          />
        </motion.div>
        
        <motion.div 
          className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 grid lg:grid-cols-2 gap-12 items-center"
          style={{ opacity }}
        >
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Badge variant="secondary" className="mb-4" data-testid="badge-software-excellence">
                {t({ en: 'Software Excellence Since 2010', fr: 'Excellence Logicielle Depuis 2010' })}
              </Badge>
            </motion.div>
            
            <motion.h1 
              className="text-5xl lg:text-6xl font-bold leading-tight text-foreground"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {t({
                en: 'Transform Your Business with Innovative Software',
                fr: 'Transformez Votre Entreprise avec des Logiciels Innovants'
              })}
            </motion.h1>
            
            <motion.p 
              className="text-lg text-muted-foreground leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {t({
                en: 'We design and develop cutting-edge software solutions that drive growth, enhance efficiency, and deliver exceptional user experiences.',
                fr: 'Nous concevons et développons des solutions logicielles de pointe qui stimulent la croissance, améliorent l\'efficacité et offrent des expériences utilisateur exceptionnelles.'
              })}
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <Link href="/book-appointment">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" className="gap-2 text-base" data-testid="button-hero-cta">
                    {t({ en: 'Book Free Consultation', fr: 'Réserver une Consultation Gratuite' })}
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </motion.div>
              </Link>
              <Link href="/services">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" variant="outline" className="gap-2 text-base" data-testid="button-view-services">
                    {t({ en: 'View Services', fr: 'Voir les Services' })}
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
            
            <motion.div 
              className="flex items-center gap-2 text-sm text-muted-foreground pt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <Check className="h-4 w-4 text-primary" />
              <span>{t({ en: 'No commitment required', fr: 'Aucun engagement requis' })}</span>
              <span className="mx-2">•</span>
              <Check className="h-4 w-4 text-primary" />
              <span>{t({ en: '30-minute strategy session', fr: 'Session stratégique de 30 minutes' })}</span>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-16 bg-card border-y border-card-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div 
                key={index} 
                className="text-center" 
                data-testid={`stat-${index}`}
                initial={{ opacity: 0, y: 50 }}
                animate={statsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <motion.div 
                  className="text-4xl lg:text-5xl font-bold text-primary mb-2"
                  initial={{ scale: 0 }}
                  animate={statsInView ? { scale: 1 } : { scale: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 + 0.2, type: "spring", bounce: 0.5 }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section ref={servicesRef} className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={servicesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => {
              const Icon = iconMap[service.icon] || Code;
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={servicesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                >
                  <Card className="h-full transition-all duration-300 hover:shadow-xl" data-testid={`service-card-${service.slug}`}>
                    <CardHeader>
                      <motion.div 
                        className="h-14 w-14 rounded-lg bg-primary/10 flex items-center justify-center mb-4"
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                      >
                        <Icon className="h-7 w-7 text-primary" />
                      </motion.div>
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
                        <Button variant="ghost" className="gap-2 p-0 group" data-testid={`button-learn-more-${service.slug}`}>
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

          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            animate={servicesInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Link href="/services">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" size="lg" data-testid="button-all-services">
                  {t({ en: 'View All Services', fr: 'Voir Tous les Services' })}
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section ref={projectsRef} className="py-24 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={projectsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={projectsInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <Link href={`/projects/${project.slug}`}>
                  <Card className="overflow-hidden transition-all duration-300 group hover:shadow-2xl" data-testid={`project-card-${project.slug}`}>
                    <div className="aspect-[4/3] overflow-hidden bg-muted">
                      <motion.img
                        src={`/attached_assets/generated_images/${project.image}`}
                        alt={project.title[language]}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.4 }}
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
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            animate={projectsInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Link href="/projects">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" size="lg" data-testid="button-all-projects">
                  {t({ en: 'View All Projects', fr: 'Voir Tous les Projets' })}
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-primary/10 via-primary/5 to-background overflow-hidden">
        <motion.div 
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="text-4xl font-bold text-foreground mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t({
              en: 'Ready to Start Your Project?',
              fr: 'Prêt à Démarrer Votre Projet ?'
            })}
          </motion.h2>
          <motion.p 
            className="text-lg text-muted-foreground mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {t({
              en: 'Book a free consultation to discuss your software needs and explore how we can help transform your business.',
              fr: 'Réservez une consultation gratuite pour discuter de vos besoins logiciels et découvrir comment nous pouvons aider à transformer votre entreprise.'
            })}
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Link href="/book-appointment">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" className="gap-2" data-testid="button-cta-appointment">
                  {t({ en: 'Book Your Free Consultation', fr: 'Réserver Votre Consultation Gratuite' })}
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </motion.div>
            </Link>
            <Link href="/contact">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" variant="outline" data-testid="button-cta-contact">
                  {t({ en: 'Contact Us', fr: 'Nous Contacter' })}
                </Button>
              </motion.div>
            </Link>
          </motion.div>
          <motion.p 
            className="text-sm text-muted-foreground mt-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            {t({
              en: 'No commitment required • 30-minute strategy session',
              fr: 'Aucun engagement requis • Session stratégique de 30 minutes'
            })}
          </motion.p>
        </motion.div>
      </section>
    </div>
  );
}
