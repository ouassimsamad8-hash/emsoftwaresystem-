import { useLanguage } from '@/lib/language-context';

export default function Privacy() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-4xl mx-auto px-4 py-24">
        <h1 className="text-5xl font-bold text-foreground mb-8">
          {t({ en: 'Privacy Policy', fr: 'Politique de Confidentialité' })}
        </h1>
        <p className="text-muted-foreground mb-8">
          {t({ en: 'Last updated: January 15, 2025', fr: 'Dernière mise à jour : 15 janvier 2025' })}
        </p>

        <div className="prose prose-lg max-w-none space-y-8 text-muted-foreground">
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              {t({ en: 'Introduction', fr: 'Introduction' })}
            </h2>
            <p>
              {t({
                en: 'E&M Software System ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.',
                fr: 'E&M Software System ("nous", "notre" ou "nos") s\'engage à protéger votre vie privée. Cette politique de confidentialité explique comment nous collectons, utilisons, divulguons et protégeons vos informations lorsque vous visitez notre site Web ou utilisez nos services.'
              })}
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              {t({ en: 'Information We Collect', fr: 'Informations que Nous Collectons' })}
            </h2>
            <p>
              {t({
                en: 'We collect information that you provide directly to us, including name, email address, phone number, company information, and project details when you contact us or book an appointment.',
                fr: 'Nous collectons les informations que vous nous fournissez directement, y compris le nom, l\'adresse e-mail, le numéro de téléphone, les informations sur l\'entreprise et les détails du projet lorsque vous nous contactez ou réservez un rendez-vous.'
              })}
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              {t({ en: 'How We Use Your Information', fr: 'Comment Nous Utilisons Vos Informations' })}
            </h2>
            <p>
              {t({
                en: 'We use the information we collect to provide, maintain, and improve our services, communicate with you, respond to your inquiries, and send you technical notices and support messages.',
                fr: 'Nous utilisons les informations que nous collectons pour fournir, maintenir et améliorer nos services, communiquer avec vous, répondre à vos demandes et vous envoyer des avis techniques et des messages de support.'
              })}
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              {t({ en: 'Data Security', fr: 'Sécurité des Données' })}
            </h2>
            <p>
              {t({
                en: 'We implement appropriate technical and organizational measures to protect your personal information against unauthorized or unlawful processing, accidental loss, destruction, or damage.',
                fr: 'Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos informations personnelles contre tout traitement non autorisé ou illégal, perte accidentelle, destruction ou dommage.'
              })}
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              {t({ en: 'Your Rights', fr: 'Vos Droits' })}
            </h2>
            <p>
              {t({
                en: 'You have the right to access, update, or delete your personal information. You may also have the right to restrict or object to certain processing of your data.',
                fr: 'Vous avez le droit d\'accéder, de mettre à jour ou de supprimer vos informations personnelles. Vous pouvez également avoir le droit de restreindre ou de vous opposer à certains traitements de vos données.'
              })}
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              {t({ en: 'Contact Us', fr: 'Nous Contacter' })}
            </h2>
            <p>
              {t({
                en: 'If you have any questions about this Privacy Policy, please contact us at privacy@emsoftware.com.',
                fr: 'Si vous avez des questions concernant cette politique de confidentialité, veuillez nous contacter à privacy@emsoftware.com.'
              })}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
