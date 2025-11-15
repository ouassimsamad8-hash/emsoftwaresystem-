import { useLanguage } from '@/lib/language-context';

export default function Cookies() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-4xl mx-auto px-4 py-24">
        <h1 className="text-5xl font-bold text-foreground mb-8">
          {t({ en: 'Cookie Policy', fr: 'Politique des Cookies' })}
        </h1>
        <p className="text-muted-foreground mb-8">
          {t({ en: 'Last updated: January 15, 2025', fr: 'Dernière mise à jour : 15 janvier 2025' })}
        </p>

        <div className="prose prose-lg max-w-none space-y-8 text-muted-foreground">
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              {t({ en: 'What Are Cookies', fr: 'Que Sont les Cookies' })}
            </h2>
            <p>
              {t({
                en: 'Cookies are small text files that are placed on your computer or mobile device when you visit our website. They help us provide you with a better experience by remembering your preferences and enabling certain features.',
                fr: 'Les cookies sont de petits fichiers texte qui sont placés sur votre ordinateur ou appareil mobile lorsque vous visitez notre site Web. Ils nous aident à vous offrir une meilleure expérience en mémorisant vos préférences et en activant certaines fonctionnalités.'
              })}
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              {t({ en: 'How We Use Cookies', fr: 'Comment Nous Utilisons les Cookies' })}
            </h2>
            <p>
              {t({
                en: 'We use cookies for the following purposes: remembering your language preference, maintaining your session, analyzing how you use our website, and improving our services.',
                fr: 'Nous utilisons les cookies aux fins suivantes : mémoriser votre préférence de langue, maintenir votre session, analyser comment vous utilisez notre site Web et améliorer nos services.'
              })}
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              {t({ en: 'Types of Cookies We Use', fr: 'Types de Cookies que Nous Utilisons' })}
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>{t({ en: 'Essential Cookies:', fr: 'Cookies Essentiels :' })}</strong>{' '}
                {t({
                  en: 'Required for the website to function properly',
                  fr: 'Requis pour que le site Web fonctionne correctement'
                })}
              </li>
              <li>
                <strong>{t({ en: 'Preference Cookies:', fr: 'Cookies de Préférence :' })}</strong>{' '}
                {t({
                  en: 'Remember your settings and preferences',
                  fr: 'Mémoriser vos paramètres et préférences'
                })}
              </li>
              <li>
                <strong>{t({ en: 'Analytics Cookies:', fr: 'Cookies d\'Analyse :' })}</strong>{' '}
                {t({
                  en: 'Help us understand how visitors use our website',
                  fr: 'Nous aider à comprendre comment les visiteurs utilisent notre site Web'
                })}
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              {t({ en: 'Managing Cookies', fr: 'Gestion des Cookies' })}
            </h2>
            <p>
              {t({
                en: 'You can control and manage cookies in various ways. Most web browsers allow you to refuse or accept cookies, delete cookies, or be notified when a cookie is set.',
                fr: 'Vous pouvez contrôler et gérer les cookies de diverses manières. La plupart des navigateurs Web vous permettent de refuser ou d\'accepter les cookies, de supprimer les cookies ou d\'être averti lorsqu\'un cookie est défini.'
              })}
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              {t({ en: 'Contact Us', fr: 'Nous Contacter' })}
            </h2>
            <p>
              {t({
                en: 'If you have any questions about our use of cookies, please contact us at privacy@emsoftware.com.',
                fr: 'Si vous avez des questions concernant notre utilisation des cookies, veuillez nous contacter à privacy@emsoftware.com.'
              })}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
