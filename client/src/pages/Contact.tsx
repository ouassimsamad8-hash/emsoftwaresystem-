import { useLanguage } from '@/lib/language-context';
import { useToast } from '@/hooks/use-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useSiteSettings } from '@/hooks/use-site-settings';
import type { InsertContact } from '@shared/schema';
import { ContactForm } from '@/components/contact/ContactForm';
import { ContactInfoCard } from '@/components/contact/ContactInfoCard';
import { SEOHead } from '@/components/SEOHead';
import { ArrowRight, Mail, Phone, Calendar, Send, Star, Layers } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

export default function Contact() {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { data: siteSettings } = useSiteSettings();

  const contactMutation = useMutation({
    mutationFn: async (data: InsertContact) => {
      return await apiRequest('POST', '/api/contact', data);
    },
    onSuccess: () => {
      toast({
        title: t({ en: 'Message Sent!', fr: 'Message Envoyé !' }),
        description: t({
          en: 'We\'ll get back to you within 24 hours.',
          fr: 'Nous vous répondrons dans les 24 heures.'
        }),
        duration: 5000
      });
      queryClient.invalidateQueries({ queryKey: ['/api/contacts'] });
    },
    onError: (error: Error) => {
      toast({
        variant: 'destructive',
        title: t({ en: 'Error', fr: 'Erreur' }),
        description: error.message || t({
          en: 'Failed to send message. Please try again.',
          fr: 'Échec de l\'envoi du message. Veuillez réessayer.'
        }),
        duration: 7000
      });
    }
  });

  const handleSubmit = (data: InsertContact) => {
    contactMutation.mutate(data);
  };

  // Extract contact info from site settings
  const contactInfo = {
    email: siteSettings?.contactEmail,
    phone: siteSettings?.contactPhone,
    address: siteSettings?.address_fr
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={t({ en: 'Contact Us', fr: 'Nous Contacter' })}
        description={t({
          en: 'Get in touch with E&M Software System. We respond within 24 hours to all inquiries.',
          fr: 'Contactez E&M Software System. Nous répondons dans les 24 heures à toutes les demandes.'
        })}
        keywords={['contact', 'support', 'inquiry', 'consultation', 'devis']}
      />

      {/* Main Contact Section with Creative Split-Screen */}
      <section id="contact-form" className="pt-32 pb-20 relative scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Enhanced Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Badge variant="outline" className="mb-4 px-4 py-1.5">
                <Layers className="h-3 w-3 mr-2" />
                {t({ en: 'Get Started', fr: 'Commencer' })}
              </Badge>
            </motion.div>
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
              {t({ en: 'Start Your Project Today', fr: 'Démarrez Votre Projet Aujourd\'hui' })}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {t({
                en: 'Tell us about your needs and we\'ll provide a tailored solution with a free consultation.',
                fr: 'Parlez-nous de vos besoins et nous vous fournirons une solution sur mesure avec une consultation gratuite.'
              })}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Contact Form - Takes 3 columns with Enhanced Design */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-3 relative"
            >
              {/* Glow effect behind card */}
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 rounded-3xl blur-2xl opacity-50" />
              
              <Card className="relative shadow-2xl border-border/50 overflow-hidden hover:shadow-3xl hover:border-primary/30 transition-all duration-500 bg-background/80 backdrop-blur-xl">
                <motion.div 
                  className="h-2 bg-gradient-to-r from-primary via-primary/80 to-primary/60"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
                <div className="p-8 lg:p-12">
                  <div className="mb-10">
                    <div className="flex items-start gap-4 mb-6">
                      <motion.div 
                        whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                        className="h-16 w-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary/10"
                      >
                        <motion.div
                          animate={{ 
                            scale: [1, 1.2, 1],
                            rotate: [0, 180, 360]
                          }}
                          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        >
                          <Send className="h-7 w-7 text-primary" />
                        </motion.div>
                      </motion.div>
                      <div className="flex-1">
                        <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">
                          {t({ en: 'Send Us a Message', fr: 'Envoyez-nous un Message' })}
                        </h2>
                        <p className="text-muted-foreground text-base">
                          {t({
                            en: 'Fill out the form below and our team will respond within 24 hours.',
                            fr: 'Remplissez le formulaire ci-dessous et notre équipe vous répondra dans les 24 heures.'
                          })}
                        </p>
                      </div>
                    </div>
                    
                    {/* Trust indicator bar */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      className="flex items-center gap-6 p-4 rounded-xl bg-gradient-to-r from-primary/5 to-transparent border-l-4 border-primary"
                    >
                      <div className="flex items-center gap-2">
                        <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                        <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                        <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                        <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                        <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                      </div>
                      <div className="h-6 w-px bg-border" />
                      <p className="text-sm font-semibold text-muted-foreground">
                        {t({ en: 'Trusted by 500+ businesses worldwide', fr: 'Approuvé par 500+ entreprises' })}
                      </p>
                    </motion.div>
                  </div>

                  <ContactForm
                    onSubmit={handleSubmit}
                    isLoading={contactMutation.isPending}
                    isSuccess={contactMutation.isSuccess}
                  />
                </div>
              </Card>
            </motion.div>

            {/* Contact Info - Takes 2 columns */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:col-span-2"
            >
              <div className="sticky top-24">
                <ContactInfoCard contactInfo={contactInfo} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>


    </div>
  );
}
