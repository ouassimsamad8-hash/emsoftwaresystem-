import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useLanguage } from '@/lib/language-context';
import { useToast } from '@/hooks/use-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { insertContactSchema } from '@shared/schema';
import type { InsertContact } from '@shared/schema';
import { z } from 'zod';
import cityImage from '@assets/generated_images/Modern_cityscape_offices_adc8f7a9.png';

const contactFormSchema = insertContactSchema.extend({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters")
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function Contact() {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      serviceInterest: '',
      message: '',
      language
    }
  });

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
        })
      });
      form.reset();
      queryClient.invalidateQueries({ queryKey: ['/api/contacts'] });
    },
    onError: () => {
      toast({
        variant: 'destructive',
        title: t({ en: 'Error', fr: 'Erreur' }),
        description: t({
          en: 'Failed to send message. Please try again.',
          fr: 'Échec de l\'envoi du message. Veuillez réessayer.'
        })
      });
    }
  });

  const onSubmit = (data: ContactFormData) => {
    contactMutation.mutate({
      ...data,
      language
    });
  };

  const services = [
    { value: 'web', label: t({ en: 'Web Development', fr: 'Développement Web' }) },
    { value: 'mobile', label: t({ en: 'Mobile Development', fr: 'Développement Mobile' }) },
    { value: 'custom', label: t({ en: 'Custom Software', fr: 'Logiciel Sur Mesure' }) },
    { value: 'cloud', label: t({ en: 'Cloud Solutions', fr: 'Solutions Cloud' }) },
    { value: 'digital', label: t({ en: 'Digital Transformation', fr: 'Transformation Digitale' }) },
    { value: 'consulting', label: t({ en: 'IT Consulting', fr: 'Conseil Informatique' }) }
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative h-[40vh] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/90 to-background/95 z-10" />
          <img
            src={cityImage}
            alt="Contact us"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-20 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-5xl lg:text-6xl font-bold text-foreground mb-4">
            {t({ en: 'Contact Us', fr: 'Nous Contacter' })}
          </h1>
          <p className="text-xl text-muted-foreground">
            {t({
              en: 'Get in touch to discuss your project.',
              fr: 'Contactez-nous pour discuter de votre projet.'
            })}
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                {t({ en: 'Send us a Message', fr: 'Envoyez-nous un Message' })}
              </h2>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t({ en: 'Name', fr: 'Nom' })} *</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder={t({ en: 'Your name', fr: 'Votre nom' })} data-testid="input-name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t({ en: 'Email', fr: 'Email' })} *</FormLabel>
                        <FormControl>
                          <Input {...field} type="email" placeholder={t({ en: 'your.email@example.com', fr: 'votre.email@exemple.com' })} data-testid="input-email" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t({ en: 'Phone', fr: 'Téléphone' })}</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder={t({ en: '+1 (555) 123-4567', fr: '+1 (555) 123-4567' })} data-testid="input-phone" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="serviceInterest"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t({ en: 'Service Interest', fr: 'Service d\'Intérêt' })}</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-service">
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

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t({ en: 'Message', fr: 'Message' })} *</FormLabel>
                        <FormControl>
                          <Textarea {...field} placeholder={t({ en: 'Tell us about your project...', fr: 'Parlez-nous de votre projet...' })} rows={6} data-testid="textarea-message" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" size="lg" className="w-full gap-2" disabled={contactMutation.isPending} data-testid="button-submit">
                    {contactMutation.isPending ? (
                      t({ en: 'Sending...', fr: 'Envoi...' })
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        {t({ en: 'Send Message', fr: 'Envoyer le Message' })}
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">
                  {t({ en: 'Contact Information', fr: 'Informations de Contact' })}
                </h2>
                <p className="text-muted-foreground mb-8">
                  {t({
                    en: 'Reach out to us through any of these channels. We\'re here to help!',
                    fr: 'Contactez-nous par l\'un de ces canaux. Nous sommes là pour vous aider !'
                  })}
                </p>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Mail className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">
                          {t({ en: 'Email', fr: 'Email' })}
                        </h3>
                        <p className="text-muted-foreground">contact@emsoftware.com</p>
                        <p className="text-muted-foreground">support@emsoftware.com</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Phone className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">
                          {t({ en: 'Phone', fr: 'Téléphone' })}
                        </h3>
                        <p className="text-muted-foreground">+1 (555) 123-4567</p>
                        <p className="text-sm text-muted-foreground">
                          {t({ en: 'Mon-Fri 9am-6pm EST', fr: 'Lun-Ven 9h-18h EST' })}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <MapPin className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">
                          {t({ en: 'Office', fr: 'Bureau' })}
                        </h3>
                        <p className="text-muted-foreground">
                          123 Tech Street<br />
                          Innovation City, TC 12345<br />
                          {t({ en: 'United States', fr: 'États-Unis' })}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
