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
                en: 'E&M Software System ("we", "us", or "our") respects your privacy and is committed to protecting your personal data. This Privacy Policy explains how we collect, use, store, disclose, and protect information about you when you visit our website, contact us, or use our services.',
                fr: 'E&M Software System (« nous », « notre » ou « nos ») respecte votre vie privée et s\'engage à protéger vos données personnelles. La présente politique de confidentialité explique comment nous collectons, utilisons, conservons, divulguons et protégeons les informations vous concernant lorsque vous visitez notre site Web, nous contactez ou utilisez nos services.'
              })}
            </p>
            <p>
              {t({
                en: 'Please read this Policy carefully to understand how and why we process your personal data. By using our website or services, you acknowledge that you have read and understood this Privacy Policy.',
                fr: 'Veuillez lire attentivement la présente politique afin de comprendre comment et pourquoi nous traitons vos données personnelles. En utilisant notre site Web ou nos services, vous reconnaissez avoir lu et compris cette politique de confidentialité.'
              })}
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              {t({ en: 'Personal Data We Collect', fr: 'Données Personnelles que Nous Collectons' })}
            </h2>
            <p>
              {t({
                en: 'We may collect and process the following categories of personal data, depending on how you interact with us:',
                fr: 'Nous pouvons collecter et traiter les catégories de données personnelles suivantes, selon la manière dont vous interagissez avec nous :'
              })}
            </p>
            <ul className="list-disc space-y-2 pl-4">
              <li>
                {t({
                  en: 'Identification and contact details (such as your name, email address, phone number, and preferred language).',
                  fr: 'Informations d\'identification et de contact (telles que votre nom, votre adresse e-mail, votre numéro de téléphone et votre langue préférée).'
                })}
              </li>
              <li>
                {t({
                  en: 'Professional information and company details (such as company name and role, where relevant).',
                  fr: 'Informations professionnelles et détails relatifs à l\'entreprise (tels que le nom de l\'entreprise et votre fonction, le cas échéant).'
                })}
              </li>
              <li>
                {t({
                  en: 'Project and consultation information (such as a description of your project, your objectives, and any information you choose to share in contact or appointment forms).',
                  fr: 'Informations liées au projet et aux consultations (telles qu\'une description de votre projet, vos objectifs et toute information que vous choisissez de partager dans les formulaires de contact ou de rendez-vous).'
                })}
              </li>
              <li>
                {t({
                  en: 'Usage and technical information (such as IP address, browser type, device information, pages visited, and interaction data), collected through logs and similar technologies.',
                  fr: 'Informations d\'utilisation et techniques (telles que l\'adresse IP, le type de navigateur, les informations sur l\'appareil, les pages consultées et les données d\'interaction), collectées au moyen de journaux et de technologies similaires.'
                })}
              </li>
              <li>
                {t({
                  en: 'Any other information you voluntarily provide when you communicate with us.',
                  fr: 'Toute autre information que vous nous fournissez volontairement lorsque vous communiquez avec nous.'
                })}
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              {t({ en: 'Legal Bases for Processing', fr: 'Bases Légales du Traitement' })}
            </h2>
            <p>
              {t({
                en: 'Where required by applicable data protection laws (for example, in the European Economic Area or the United Kingdom), we process your personal data on the following legal bases:',
                fr: 'Lorsque les lois applicables en matière de protection des données l\'exigent (par exemple dans l\'Espace économique européen ou au Royaume-Uni), nous traitons vos données personnelles sur les bases légales suivantes :'
              })}
            </p>
            <ul className="list-disc space-y-2 pl-4">
              <li>
                {t({
                  en: 'To take steps at your request prior to entering into a contract or to perform a contract with you.',
                  fr: 'Pour prendre des mesures à votre demande avant de conclure un contrat ou pour exécuter un contrat conclu avec vous.'
                })}
              </li>
              <li>
                {t({
                  en: 'Where it is necessary for our legitimate interests (for example, to operate, secure, and improve our services), provided that your interests and fundamental rights do not override those interests.',
                  fr: 'Lorsque le traitement est nécessaire à la poursuite de nos intérêts légitimes (par exemple pour exploiter, sécuriser et améliorer nos services), à condition que vos intérêts et droits fondamentaux ne prévalent pas sur ces intérêts.'
                })}
              </li>
              <li>
                {t({
                  en: 'Where you have given your consent (for example, to receive certain communications), which you may withdraw at any time.',
                  fr: 'Lorsque vous avez donné votre consentement (par exemple pour recevoir certaines communications), que vous pouvez retirer à tout moment.'
                })}
              </li>
              <li>
                {t({
                  en: 'Where we are required to comply with a legal or regulatory obligation.',
                  fr: 'Lorsque le traitement est nécessaire au respect d\'une obligation légale ou réglementaire.'
                })}
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              {t({ en: 'How We Use Personal Data', fr: 'Comment Nous Utilisons vos Données' })}
            </h2>
            <p>
              {t({
                en: 'We use the personal data we collect for the following purposes:',
                fr: 'Nous utilisons les données personnelles que nous collectons aux fins suivantes :'
              })}
            </p>
            <ul className="list-disc space-y-2 pl-4">
              <li>
                {t({
                  en: 'To respond to your enquiries, provide quotes, and communicate with you about your requests or projects.',
                  fr: 'Répondre à vos demandes, établir des devis et communiquer avec vous au sujet de vos demandes ou projets.'
                })}
              </li>
              <li>
                {t({
                  en: 'To schedule, manage, and confirm appointments or consultations.',
                  fr: 'Planifier, gérer et confirmer des rendez-vous ou des consultations.'
                })}
              </li>
              <li>
                {t({
                  en: 'To operate, maintain, secure, and improve our website, products, and services.',
                  fr: 'Exploiter, maintenir, sécuriser et améliorer notre site Web, nos produits et nos services.'
                })}
              </li>
              <li>
                {t({
                  en: 'To send you important information about changes to our terms, policies, or services.',
                  fr: 'Vous envoyer des informations importantes concernant des modifications de nos conditions, de nos politiques ou de nos services.'
                })}
              </li>
              <li>
                {t({
                  en: 'To prevent, detect, and investigate fraud, abuse, security incidents, or other harmful activity.',
                  fr: 'Prévenir, détecter et enquêter sur les fraudes, abus, incidents de sécurité ou autres activités préjudiciables.'
                })}
              </li>
              <li>
                {t({
                  en: 'To comply with legal obligations and to establish, exercise, or defend legal claims.',
                  fr: 'Respecter nos obligations légales et établir, exercer ou défendre des droits en justice.'
                })}
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              {t({ en: 'Cookies and Similar Technologies', fr: 'Cookies et Technologies Similaires' })}
            </h2>
            <p>
              {t({
                en: 'We use cookies and similar technologies to operate our website, understand how it is used, and improve the user experience.',
                fr: 'Nous utilisons des cookies et des technologies similaires pour faire fonctionner notre site Web, comprendre comment il est utilisé et améliorer l\'expérience utilisateur.'
              })}
            </p>
            <p>
              {t({
                en: 'For detailed information about the types of cookies we use, the purposes for which we use them, and how you can manage your preferences, please refer to our Cookies Policy.',
                fr: 'Pour des informations détaillées sur les types de cookies que nous utilisons, les finalités de leur utilisation et la manière de gérer vos préférences, veuillez consulter notre politique relative aux cookies.'
              })}
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              {t({ en: 'Data Retention', fr: 'Durée de Conservation des Données' })}
            </h2>
            <p>
              {t({
                en: 'We retain your personal data only for as long as is necessary to fulfil the purposes described in this Privacy Policy, unless a longer retention period is required or permitted by law.',
                fr: 'Nous conservons vos données personnelles uniquement pendant la durée nécessaire pour atteindre les objectifs décrits dans la présente politique de confidentialité, sauf si une durée de conservation plus longue est requise ou autorisée par la loi.'
              })}
            </p>
            <p>
              {t({
                en: 'In particular, contact and appointment information may be kept for a reasonable period after our last interaction with you, in order to manage our relationship, keep records, and comply with legal obligations.',
                fr: 'En particulier, les informations de contact et de rendez-vous peuvent être conservées pendant une période raisonnable après notre dernière interaction avec vous, afin de gérer notre relation, conserver des traces et respecter nos obligations légales.'
              })}
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              {t({ en: 'Sharing of Personal Data', fr: 'Partage des Données Personnelles' })}
            </h2>
            <p>
              {t({
                en: 'We do not sell your personal data. We may share your information with:',
                fr: 'Nous ne vendons pas vos données personnelles. Nous pouvons partager vos informations avec :'
              })}
            </p>
            <ul className="list-disc space-y-2 pl-4">
              <li>
                {t({
                  en: 'Service providers and partners who help us operate our website and deliver our services (for example, hosting providers or communication tools), bound by contractual obligations to protect your data.',
                  fr: 'Des prestataires de services et partenaires qui nous aident à exploiter notre site Web et à fournir nos services (par exemple des hébergeurs ou des outils de communication), soumis à des obligations contractuelles de protection de vos données.'
                })}
              </li>
              <li>
                {t({
                  en: 'Professional advisers such as lawyers, accountants, or auditors, where necessary.',
                  fr: 'Des conseillers professionnels tels que des avocats, comptables ou auditeurs, lorsque cela est nécessaire.'
                })}
              </li>
              <li>
                {t({
                  en: 'Public authorities or other third parties where required by law, legal process, or to protect our rights or the rights of others.',
                  fr: 'Des autorités publiques ou d\'autres tiers lorsque la loi, une procédure judiciaire ou la protection de nos droits ou de ceux d\'autrui l\'exige.'
                })}
              </li>
              <li>
                {t({
                  en: 'Third parties involved in a business transaction, such as a merger, acquisition, or sale of assets, in which case your data may be transferred as part of that transaction.',
                  fr: 'Des tiers impliqués dans une opération de restructuration ou de cession (telle qu\'une fusion, acquisition ou vente d\'actifs), auquel cas vos données peuvent être transférées dans le cadre de cette opération.'
                })}
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              {t({ en: 'International Data Transfers', fr: 'Transferts Internationaux de Données' })}
            </h2>
            <p>
              {t({
                en: 'Your personal data may be processed and stored in countries other than the country in which you are located. In such cases, we take appropriate steps to ensure that your data receives a level of protection that is consistent with applicable data protection laws.',
                fr: 'Vos données personnelles peuvent être traitées et stockées dans des pays autres que celui dans lequel vous vous trouvez. Dans ce cas, nous prenons des mesures appropriées pour garantir que vos données bénéficient d\'un niveau de protection conforme aux lois applicables en matière de protection des données.'
              })}
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              {t({ en: 'Data Security', fr: 'Sécurité des Données' })}
            </h2>
            <p>
              {t({
                en: 'We implement appropriate technical and organizational measures designed to protect your personal data against accidental or unlawful destruction, loss, alteration, unauthorized disclosure, or access.',
                fr: 'Nous mettons en œuvre des mesures techniques et organisationnelles appropriées destinées à protéger vos données personnelles contre la destruction, la perte, l\'altération, la divulgation ou l\'accès non autorisés, qu\'ils soient accidentels ou illicites.'
              })}
            </p>
            <p>
              {t({
                en: 'However, no method of transmission over the internet or method of electronic storage is completely secure. While we strive to protect your personal data, we cannot guarantee absolute security.',
                fr: 'Cependant, aucune méthode de transmission sur Internet ni aucun mode de stockage électronique n\'est totalement sécurisé. Bien que nous nous efforcions de protéger vos données personnelles, nous ne pouvons pas garantir une sécurité absolue.'
              })}
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              {t({ en: 'Your Rights', fr: 'Vos Droits' })}
            </h2>
            <p>
              {t({
                en: 'Depending on your location and subject to applicable law, you may have the following rights in relation to your personal data:',
                fr: 'Selon votre lieu de résidence et sous réserve du droit applicable, vous pouvez disposer des droits suivants concernant vos données personnelles :'
              })}
            </p>
            <ul className="list-disc space-y-2 pl-4">
              <li>
                {t({
                  en: 'Right of access to the personal data we hold about you.',
                  fr: 'Droit d\'accès aux données personnelles que nous détenons vous concernant.'
                })}
              </li>
              <li>
                {t({
                  en: 'Right to request correction of inaccurate or incomplete data.',
                  fr: 'Droit de demander la rectification des données inexactes ou incomplètes.'
                })}
              </li>
              <li>
                {t({
                  en: 'Right to request deletion of your data, in certain circumstances.',
                  fr: 'Droit de demander l\'effacement de vos données, dans certaines circonstances.'
                })}
              </li>
              <li>
                {t({
                  en: 'Right to restrict or object to the processing of your data, in certain circumstances.',
                  fr: 'Droit de limiter ou de vous opposer au traitement de vos données, dans certaines circonstances.'
                })}
              </li>
              <li>
                {t({
                  en: 'Right to data portability, where applicable.',
                  fr: 'Droit à la portabilité des données, lorsque cela est applicable.'
                })}
              </li>
              <li>
                {t({
                  en: 'Right to withdraw your consent at any time where processing is based on consent.',
                  fr: 'Droit de retirer votre consentement à tout moment lorsque le traitement est fondé sur votre consentement.'
                })}
              </li>
            </ul>
            <p>
              {t({
                en: 'You also have the right to lodge a complaint with a data protection authority if you believe that your rights have been infringed.',
                fr: 'Vous avez également le droit d\'introduire une réclamation auprès d\'une autorité de protection des données si vous estimez que vos droits ont été violés.'
              })}
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              {t({ en: 'Children\'s Privacy', fr: 'Vie Privée des Enfants' })}
            </h2>
            <p>
              {t({
                en: 'Our website and services are not directed to children, and we do not knowingly collect personal data from children.',
                fr: 'Notre site Web et nos services ne sont pas destinés aux enfants, et nous ne collectons pas sciemment de données personnelles auprès d\'enfants.'
              })}
            </p>
            <p>
              {t({
                en: 'If you are a parent or guardian and believe that a child has provided us with personal data, please contact us so that we can take appropriate steps.',
                fr: 'Si vous êtes parent ou tuteur et pensez qu\'un enfant nous a fourni des données personnelles, veuillez nous contacter afin que nous puissions prendre les mesures appropriées.'
              })}
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              {t({ en: 'Changes to this Privacy Policy', fr: 'Modifications de cette Politique de Confidentialité' })}
            </h2>
            <p>
              {t({
                en: 'We may update this Privacy Policy from time to time, for example to reflect changes in our practices, technologies, or legal requirements.',
                fr: 'Nous pouvons mettre à jour la présente politique de confidentialité de temps à autre, par exemple pour refléter des changements dans nos pratiques, nos technologies ou les exigences légales.'
              })}
            </p>
            <p>
              {t({
                en: 'When we make material changes, we will update the "Last updated" date at the top of this page and, where appropriate, notify you by another appropriate method.',
                fr: 'Lorsque nous apportons des modifications importantes, nous mettrons à jour la date de « Dernière mise à jour » en haut de cette page et, le cas échéant, nous vous informerons par un autre moyen approprié.'
              })}
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              {t({ en: 'Contact Us', fr: 'Nous Contacter' })}
            </h2>
            <p>
              {t({
                en: 'If you have any questions about this Privacy Policy, our data practices, or if you wish to exercise your rights, please contact us using the following details:',
                fr: 'Si vous avez des questions concernant cette politique de confidentialité, nos pratiques en matière de données ou si vous souhaitez exercer vos droits, veuillez nous contacter aux coordonnées suivantes :'
              })}
            </p>
            <p>
              {t({
                en: 'Email: noumoupriso@gmail.com | Address: 4 Impasse des Jardiniers, 77400 Lagny-sur-Marne, France | Phone: +33 6 24 81 09 82',
                fr: 'E-mail : noumoupriso@gmail.com | Adresse : 4 Impasse des Jardiniers, 77400 Lagny-sur-Marne, France | Téléphone : +33 6 24 81 09 82'
              })}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
