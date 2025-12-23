import { Mail, Phone, MapPin, Clock, MessageCircle, Linkedin, Calendar, ExternalLink, Copy, Check } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/lib/language-context';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface ContactInfo {
  email?: string;
  emailSupport?: string;
  phone?: string;
  hours?: string;
  address?: string;
  city?: string;
  country?: string;
  responseTime?: string;
  whatsapp?: string;
  linkedin?: string;
}

interface ContactInfoCardProps {
  contactInfo?: ContactInfo;
}

export function ContactInfoCard({ contactInfo }: ContactInfoCardProps) {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [copiedEmail, setCopiedEmail] = useState(false);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedEmail(true);
      toast({
        title: t({ en: 'Copied!', fr: 'Copié !' }),
        description: t({ en: 'Email copied to clipboard', fr: 'Email copié dans le presse-papiers' }),
        duration: 2000
      });
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Default fallback data
  const info = {
    email: contactInfo?.email || 'noumoupriso@gmail.com',
    emailSupport: contactInfo?.emailSupport || 'emsoftwaressystem@gmail.com',
    phone: contactInfo?.phone || '+33 6 24 81 09 82',
    hours: contactInfo?.hours || t({ en: 'Mon-Fri 9am-6pm (GMT+1)', fr: 'Lun-Ven 9h-18h (GMT+1)' }),
    address: contactInfo?.address || '4 Impasse des Jardiniers',
    city: contactInfo?.city || '77400 Lagny-sur-Marne',
    country: contactInfo?.country || t({ en: 'France', fr: 'France' }),
    responseTime: contactInfo?.responseTime || t({ en: '2 hours average', fr: '2h en moyenne' }),
    whatsapp: contactInfo?.whatsapp,
    linkedin: contactInfo?.linkedin
  };

  const contactMethods = [
    {
      icon: Mail,
      title: t({ en: 'Email', fr: 'Email' }),
      items: [info.email, info.emailSupport],
      description: t({ en: 'Send us an email anytime', fr: 'Envoyez-nous un email à tout moment' }),
      href: `mailto:${info.email}`
    },
    {
      icon: Phone,
      title: t({ en: 'Phone', fr: 'Téléphone' }),
      items: [info.phone],
      description: info.hours,
      href: `tel:${info.phone.replace(/\s/g, '')}`
    },
    {
      icon: MapPin,
      title: t({ en: 'Office', fr: 'Bureau' }),
      items: [info.address, `${info.city}, ${info.country}`],
      description: t({ en: 'Visit us during business hours', fr: 'Visitez-nous pendant les heures d\'ouverture' })
    }
  ];

  return (
    <div className="space-y-6">
      {/* Response Time Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-gradient-to-br from-primary/10 via-primary/5 to-background border-primary/30 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <motion.div 
                className="h-12 w-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0"
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <Clock className="h-6 w-6 text-primary" />
              </motion.div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-foreground">
                    {t({ en: 'Fast Response', fr: 'Réponse Rapide' })}
                  </h3>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: "spring" }}
                  >
                    <Badge variant="secondary" className="text-xs">
                      {info.responseTime}
                    </Badge>
                  </motion.div>
                </div>
                <p className="text-sm text-muted-foreground">
                  {t({
                    en: 'We typically respond to all inquiries within 24 hours',
                    fr: 'Nous répondons généralement à toutes les demandes dans les 24 heures'
                  })}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Contact Methods */}
      <div className="space-y-4">
        {contactMethods.map((method, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="group hover:shadow-lg hover:border-primary/30 transition-all duration-300 overflow-hidden">
              <CardContent className="pt-6 relative">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                />
                <div className="flex items-start gap-4 relative z-10">
                  <motion.div 
                    className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <method.icon className="h-6 w-6 text-primary" />
                  </motion.div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {method.title}
                    </h3>
                    <div className="space-y-1">
                      {method.items.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <p className="text-muted-foreground flex-1">
                            {method.href && idx === 0 ? (
                              <a 
                                href={method.href}
                                className="hover:text-primary transition-colors underline decoration-dotted underline-offset-2"
                              >
                                {item}
                              </a>
                            ) : (
                              item
                            )}
                          </p>
                          {method.title === t({ en: 'Email', fr: 'Email' }) && idx === 0 && (
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => copyToClipboard(item)}
                              className="p-1.5 rounded-md hover:bg-primary/10 transition-colors"
                              title={t({ en: 'Copy email', fr: 'Copier l\'email' })}
                            >
                              {copiedEmail ? (
                                <Check className="h-3.5 w-3.5 text-green-600" />
                              ) : (
                                <Copy className="h-3.5 w-3.5 text-muted-foreground" />
                              )}
                            </motion.button>
                          )}
                        </div>
                      ))}
                    </div>
                    {method.description && (
                      <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {method.description}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Alternative Contact Methods */}
      {(info.whatsapp || info.linkedin) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="border-primary/20 hover:border-primary/30 transition-colors">
            <CardContent className="pt-6">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <MessageCircle className="h-4 w-4 text-primary" />
                {t({ en: 'Connect With Us', fr: 'Connectez-vous avec Nous' })}
              </h3>
              <div className="flex flex-wrap gap-3">
                {info.whatsapp && (
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2 hover:bg-green-50 dark:hover:bg-green-950/20 hover:border-green-500 hover:text-green-600 dark:hover:text-green-400 transition-all"
                      asChild
                    >
                      <a href={`https://wa.me/${info.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer">
                        <MessageCircle className="h-4 w-4" />
                        WhatsApp
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    </Button>
                  </motion.div>
                )}
                {info.linkedin && (
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2 hover:bg-blue-50 dark:hover:bg-blue-950/20 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-all"
                      asChild
                    >
                      <a href={info.linkedin} target="_blank" rel="noopener noreferrer">
                        <Linkedin className="h-4 w-4" />
                        LinkedIn
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    </Button>
                  </motion.div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Book Appointment CTA */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Card className="bg-gradient-to-br from-primary via-primary to-primary/90 text-primary-foreground border-0 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden relative">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
          <CardContent className="pt-6 relative z-10">
            <div className="text-center">
              <motion.div
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  repeatDelay: 1
                }}
                className="inline-block"
              >
                <Calendar className="h-10 w-10 mx-auto mb-3 opacity-90" />
              </motion.div>
              <h3 className="font-bold text-lg mb-2">
                {t({ en: 'Need a Consultation?', fr: 'Besoin d\'une Consultation ?' })}
              </h3>
              <p className="text-sm opacity-90 mb-4">
                {t({
                  en: 'Schedule a free 30-minute call with our experts',
                  fr: 'Planifiez un appel gratuit de 30 minutes avec nos experts'
                })}
              </p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  variant="secondary" 
                  size="lg" 
                  className="w-full font-semibold shadow-lg hover:shadow-xl transition-all group"
                  data-cal-link="emsoftware-system-dlwqri/30min"
                  data-cal-config='{"layout":"column_view"}'
                >
                  {t({ en: 'Book a Call', fr: 'Réserver un Appel' })}
                  <Calendar className="ml-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                </Button>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
