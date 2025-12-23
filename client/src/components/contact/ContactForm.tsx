import { Send, CheckCircle2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useLanguage } from '@/lib/language-context';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { insertContactSchema } from '@shared/schema';
import type { InsertContact } from '@shared/schema';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

const contactFormSchema = insertContactSchema.extend({
  name: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères" }),
  email: z.string().email({ message: "Adresse email invalide" }),
  message: z.string().min(10, { message: "Le message doit contenir au moins 10 caractères" })
});

type ContactFormData = z.infer<typeof contactFormSchema>;

interface ContactFormProps {
  onSubmit: (data: InsertContact) => void;
  isLoading: boolean;
  isSuccess: boolean;
}

export function ContactForm({ onSubmit, isLoading, isSuccess }: ContactFormProps) {
  const { t, language } = useLanguage();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      serviceInterest: '',
      message: '',
      language: language
    }
  });

  const services = [
    { value: 'web', label: t({ en: 'Web Development', fr: 'Développement Web' }) },
    { value: 'mobile', label: t({ en: 'Mobile Development', fr: 'Développement Mobile' }) },
    { value: 'custom', label: t({ en: 'Custom Software', fr: 'Logiciel Sur Mesure' }) },
    { value: 'cloud', label: t({ en: 'Cloud Solutions', fr: 'Solutions Cloud' }) },
    { value: 'ai', label: t({ en: 'AI & Machine Learning', fr: 'IA & Machine Learning' }) },
    { value: 'consulting', label: t({ en: 'IT Consulting', fr: 'Conseil IT' }) }
  ];

  const handleSubmit = (data: ContactFormData) => {
    onSubmit({
      ...data,
      language
    });
  };

  // Reset form on success
  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        form.reset();
      }, 3000);
    }
  }, [isSuccess, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <AnimatePresence mode="wait">
          {isSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <Alert className="bg-green-50 dark:bg-green-950/50 border-green-200 dark:border-green-900 mb-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                >
                  <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                </motion.div>
                <AlertDescription className="text-green-800 dark:text-green-200 ml-2">
                  {t({
                    en: '🎉 Thank you! Your message has been sent successfully. We\'ll get back to you within 24 hours.',
                    fr: '🎉 Merci ! Votre message a été envoyé avec succès. Nous vous répondrons dans les 24 heures.'
                  })}
                </AlertDescription>
              </Alert>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground font-medium flex items-center gap-2">
                  {t({ en: 'Full Name', fr: 'Nom Complet' })} 
                  <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <motion.div whileFocus={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
                    <Input 
                      {...field} 
                      placeholder={t({ en: 'John Doe', fr: 'Jean Dupont' })}
                      className="h-11 transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                    />
                  </motion.div>
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground font-medium flex items-center gap-2">
                  {t({ en: 'Email Address', fr: 'Adresse Email' })} 
                  <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <motion.div whileFocus={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
                    <Input 
                      {...field} 
                      type="email"
                      placeholder={t({ en: 'john@company.com', fr: 'jean@entreprise.com' })}
                      className="h-11 transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                    />
                  </motion.div>
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground font-medium">
                  {t({ en: 'Phone Number', fr: 'Numéro de Téléphone' })}
                  <span className="text-muted-foreground text-xs ml-1">
                    ({t({ en: 'Optional', fr: 'Optionnel' })})
                  </span>
                </FormLabel>
                <FormControl>
                  <motion.div whileFocus={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
                    <Input 
                      {...field} 
                      value={field.value || ''}
                      type="tel"
                      placeholder={t({ en: '+33 6 24 81 09 82', fr: '+33 6 24 81 09 82' })}
                      className="h-11 transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                    />
                  </motion.div>
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="serviceInterest"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground font-medium">
                  {t({ en: 'Service of Interest', fr: 'Service d\'Intérêt' })}
                </FormLabel>
                <Select onValueChange={field.onChange} value={field.value || undefined}>
                  <FormControl>
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder={t({ en: 'Select a service', fr: 'Sélectionner un service' })} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {services.map((service) => (
                      <SelectItem key={service.value} value={service.value}>
                        {service.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground font-medium flex items-center gap-2">
                {t({ en: 'Your Message', fr: 'Votre Message' })} 
                <span className="text-destructive">*</span>
                <span className="text-muted-foreground text-xs font-normal ml-auto">
                  {field.value?.length || 0} / 500
                </span>
              </FormLabel>
              <FormControl>
                <motion.div whileFocus={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
                  <Textarea 
                    {...field}
                    placeholder={t({ 
                      en: 'Tell us about your project, goals, timeline, and budget. The more details, the better we can help!', 
                      fr: 'Parlez-nous de votre projet, vos objectifs, le calendrier et le budget. Plus de détails nous permettent de mieux vous aider !' 
                    })}
                    rows={6}
                    maxLength={500}
                    className="resize-none transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                  />
                </motion.div>
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button 
            type="submit" 
            size="lg" 
            className="w-full h-12 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group relative overflow-hidden"
            disabled={isLoading || isSuccess}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              initial={{ x: '-100%' }}
              animate={{ x: isLoading ? '100%' : '-100%' }}
              transition={{ duration: 1.5, repeat: isLoading ? Infinity : 0 }}
            />
            <span className="relative flex items-center justify-center gap-2">
              {isLoading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  {t({ en: 'Sending...', fr: 'Envoi en cours...' })}
                </>
              ) : isSuccess ? (
                <>
                  <CheckCircle2 className="h-5 w-5" />
                  {t({ en: 'Sent Successfully!', fr: 'Envoyé avec Succès !' })}
                </>
              ) : (
                <>
                  <Send className="h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  {t({ en: 'Send Message', fr: 'Envoyer le Message' })}
                </>
              )}
            </span>
          </Button>
        </motion.div>

        <p className="text-sm text-muted-foreground text-center">
          {t({
            en: 'By submitting this form, you agree to our privacy policy.',
            fr: 'En soumettant ce formulaire, vous acceptez notre politique de confidentialité.'
          })}
        </p>
      </form>
    </Form>
  );
}
