import { Calendar, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useLanguage } from '@/lib/language-context';
import { useToast } from '@/hooks/use-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { insertAppointmentSchema } from '@shared/schema';
import type { InsertAppointment } from '@shared/schema';
import { z } from 'zod';

const appointmentFormSchema = insertAppointmentSchema.extend({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
  projectDescription: z.string().min(20, "Please provide more details about your project")
});

type AppointmentFormData = z.infer<typeof appointmentFormSchema>;

export default function BookAppointment() {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      company: '',
      consultationType: 'discovery',
      preferredDate: '',
      preferredTime: '',
      projectDescription: '',
      language
    }
  });

  const appointmentMutation = useMutation({
    mutationFn: async (data: InsertAppointment) => {
      return await apiRequest('POST', '/api/appointments', data);
    },
    onSuccess: () => {
      toast({
        title: t({ en: 'Appointment Booked!', fr: 'Rendez-vous Réservé !' }),
        description: t({
          en: 'We\'ll send you a confirmation email shortly.',
          fr: 'Nous vous enverrons un email de confirmation sous peu.'
        })
      });
      form.reset();
      queryClient.invalidateQueries({ queryKey: ['/api/appointments'] });
    },
    onError: () => {
      toast({
        variant: 'destructive',
        title: t({ en: 'Error', fr: 'Erreur' }),
        description: t({
          en: 'Failed to book appointment. Please try again.',
          fr: 'Échec de la réservation du rendez-vous. Veuillez réessayer.'
        })
      });
    }
  });

  const onSubmit = (data: AppointmentFormData) => {
    appointmentMutation.mutate({
      ...data,
      language
    });
  };

  const consultationTypes = [
    {
      value: 'discovery',
      label: t({ en: 'Discovery Call', fr: 'Appel de Découverte' }),
      description: t({
        en: 'Discuss your project idea and explore possibilities.',
        fr: 'Discuter de votre idée de projet et explorer les possibilités.'
      })
    },
    {
      value: 'quote',
      label: t({ en: 'Quote Meeting', fr: 'Réunion de Devis' }),
      description: t({
        en: 'Get a detailed estimate for your project.',
        fr: 'Obtenez une estimation détaillée pour votre projet.'
      })
    },
    {
      value: 'consultation',
      label: t({ en: 'Technical Consultation', fr: 'Consultation Technique' }),
      description: t({
        en: 'Deep dive into technical requirements and architecture.',
        fr: 'Plongez dans les exigences techniques et l\'architecture.'
      })
    }
  ];

  const benefits = [
    t({ en: 'Free 30-minute strategy session', fr: 'Session stratégique gratuite de 30 minutes' }),
    t({ en: 'Expert guidance from our team', fr: 'Conseils d\'experts de notre équipe' }),
    t({ en: 'No commitment required', fr: 'Aucun engagement requis' }),
    t({ en: 'Flexible scheduling options', fr: 'Options de planification flexibles' })
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-24 text-center bg-gradient-to-b from-card to-background">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-5xl lg:text-6xl font-bold text-foreground mb-6">
            {t({ en: 'Book Your Free Consultation', fr: 'Réservez Votre Consultation Gratuite' })}
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            {t({
              en: 'Let\'s discuss how we can help transform your business with innovative software solutions.',
              fr: 'Discutons de la façon dont nous pouvons aider à transformer votre entreprise avec des solutions logicielles innovantes.'
            })}
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <span className="text-muted-foreground">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Consultation Types */}
            <div className="lg:col-span-1 space-y-6">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                {t({ en: 'Types of Meetings', fr: 'Types de Réunions' })}
              </h2>
              {consultationTypes.map((type) => (
                <Card key={type.value} data-testid={`consultation-type-${type.value}`}>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-foreground mb-2">{type.label}</h3>
                    <p className="text-sm text-muted-foreground">{type.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Booking Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <h2 className="text-2xl font-bold text-foreground">
                    {t({ en: 'Schedule Your Meeting', fr: 'Planifier Votre Réunion' })}
                  </h2>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
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
                              <FormLabel>{t({ en: 'Phone', fr: 'Téléphone' })} *</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder={t({ en: '+1 (555) 123-4567', fr: '+1 (555) 123-4567' })} data-testid="input-phone" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="company"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t({ en: 'Company', fr: 'Entreprise' })}</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder={t({ en: 'Company name', fr: 'Nom de l\'entreprise' })} data-testid="input-company" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="consultationType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t({ en: 'Consultation Type', fr: 'Type de Consultation' })} *</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger data-testid="select-consultation-type">
                                  <SelectValue />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {consultationTypes.map((type) => (
                                  <SelectItem key={type.value} value={type.value}>
                                    {type.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="preferredDate"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t({ en: 'Preferred Date', fr: 'Date Préférée' })} *</FormLabel>
                              <FormControl>
                                <Input {...field} type="date" min={new Date().toISOString().split('T')[0]} data-testid="input-date" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="preferredTime"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t({ en: 'Preferred Time', fr: 'Heure Préférée' })} *</FormLabel>
                              <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                  <SelectTrigger data-testid="select-time">
                                    <SelectValue placeholder={t({ en: 'Select time', fr: 'Sélectionner l\'heure' })} />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="09:00">09:00 AM</SelectItem>
                                  <SelectItem value="10:00">10:00 AM</SelectItem>
                                  <SelectItem value="11:00">11:00 AM</SelectItem>
                                  <SelectItem value="13:00">01:00 PM</SelectItem>
                                  <SelectItem value="14:00">02:00 PM</SelectItem>
                                  <SelectItem value="15:00">03:00 PM</SelectItem>
                                  <SelectItem value="16:00">04:00 PM</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="projectDescription"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t({ en: 'Project Description', fr: 'Description du Projet' })} *</FormLabel>
                            <FormControl>
                              <Textarea {...field} placeholder={t({ en: 'Tell us about your project, goals, and challenges...', fr: 'Parlez-nous de votre projet, vos objectifs et vos défis...' })} rows={6} data-testid="textarea-description" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button type="submit" size="lg" className="w-full gap-2" disabled={appointmentMutation.isPending} data-testid="button-submit">
                        {appointmentMutation.isPending ? (
                          t({ en: 'Booking...', fr: 'Réservation...' })
                        ) : (
                          <>
                            <Calendar className="h-5 w-5" />
                            {t({ en: 'Book Appointment', fr: 'Réserver le Rendez-vous' })}
                          </>
                        )}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
