import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/lib/language-context';
import { Loader2, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { getCalApi } from '@calcom/embed-react';

const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337';

interface AppointmentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AppointmentModal({ open, onOpenChange }: AppointmentModalProps) {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: ''
  });

  useEffect(() => {
    if (showCalendar) {
      (async function () {
        const cal = await getCalApi({ namespace: "30min" });
        cal("ui", {
          styles: { branding: { brandColor: "#000000" } },
          hideEventTypeDetails: false,
          layout: "month_view"
        });
      })();
    }
  }, [showCalendar]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${STRAPI_URL}/api/appointment-requests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: formData
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Strapi error:', errorData);
        throw new Error(errorData.error?.message || 'Failed to submit');
      }

      setSuccess(true);
      toast({
        title: t({ en: 'Success!', fr: 'Succès !' }),
        description: t({
          en: 'Information saved! Now choose your appointment time.',
          fr: 'Informations enregistrées ! Choisissez maintenant l\'heure de votre rendez-vous.'
        }),
      });

      // Show calendar after 1.5 seconds
      setTimeout(() => {
        setSuccess(false);
        setShowCalendar(true);
      }, 1500);
    } catch (error) {
      toast({
        title: t({ en: 'Error', fr: 'Erreur' }),
        description: t({
          en: 'Failed to submit your request. Please try again.',
          fr: 'Échec de l\'envoi de votre demande. Veuillez réessayer.'
        }),
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleCloseModal = (isOpen: boolean) => {
    if (!isOpen) {
      // Reset everything when modal closes
      setFormData({ fullName: '', email: '', phone: '', message: '' });
      setSuccess(false);
      setShowCalendar(false);
    }
    onOpenChange(isOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleCloseModal}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {showCalendar 
              ? t({ en: 'Choose Your Time', fr: 'Choisissez Votre Horaire' })
              : t({ en: 'Book an Appointment', fr: 'Réserver un Rendez-vous' })
            }
          </DialogTitle>
          <DialogDescription>
            {showCalendar ? t({
              en: 'Select a date and time that works best for you.',
              fr: 'Sélectionnez une date et une heure qui vous convient.'
            }) : t({
              en: 'Fill out the form below and we will contact you to schedule your free consultation.',
              fr: 'Remplissez le formulaire ci-dessous et nous vous contacterons pour planifier votre consultation gratuite.'
            })}
          </DialogDescription>
        </DialogHeader>

        {showCalendar ? (
          <div className="py-4">
            <button
              data-cal-namespace="30min"
              data-cal-link="emsoftware-system-dlwqri/30min"
              data-cal-config={JSON.stringify({
                name: formData.fullName,
                email: formData.email,
                notes: formData.message,
                layout: 'month_view'
              })}
              className="w-full"
            >
              {t({ en: 'Click to choose your appointment time', fr: 'Cliquez pour choisir votre horaire' })}
            </button>
          </div>
        ) : success ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <CheckCircle2 className="h-16 w-16 text-green-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">
              {t({ en: 'Request Submitted!', fr: 'Demande Envoyée !' })}
            </h3>
            <p className="text-muted-foreground">
              {t({
                en: 'We will contact you shortly.',
                fr: 'Nous vous contacterons sous peu.'
              })}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">
                {t({ en: 'Full Name', fr: 'Nom Complet' })} *
              </Label>
              <Input
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                placeholder={t({ en: 'John Doe', fr: 'Jean Dupont' })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="exemple@email.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">
                {t({ en: 'Phone Number', fr: 'Numéro de Téléphone' })} *
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="+33 6 24 81 09 82"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">
                {t({ en: 'Message (Optional)', fr: 'Message (Optionnel)' })}
              </Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder={t({
                  en: 'Tell us about your project...',
                  fr: 'Parlez-nous de votre projet...'
                })}
                rows={4}
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t({ en: 'Submitting...', fr: 'Envoi en cours...' })}
                </>
              ) : (
                t({ en: 'Submit Request', fr: 'Envoyer la Demande' })
              )}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
