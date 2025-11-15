import { CheckCircle2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useLanguage } from '@/lib/language-context';
import teamImage from '@assets/generated_images/Team_meeting_collaboration_dfc2f0e9.png';
import officeImage from '@assets/generated_images/Modern_office_interior_7cc1ed85.png';

export default function About() {
  const { t } = useLanguage();

  const values = [
    {
      title: t({ en: 'Innovation', fr: 'Innovation' }),
      description: t({
        en: 'We embrace cutting-edge technologies and creative solutions.',
        fr: 'Nous adoptons les technologies de pointe et les solutions créatives.'
      })
    },
    {
      title: t({ en: 'Quality', fr: 'Qualité' }),
      description: t({
        en: 'Excellence in every line of code and every client interaction.',
        fr: 'Excellence dans chaque ligne de code et chaque interaction client.'
      })
    },
    {
      title: t({ en: 'Collaboration', fr: 'Collaboration' }),
      description: t({
        en: 'Working closely with clients to achieve shared success.',
        fr: 'Travailler en étroite collaboration avec les clients pour réussir ensemble.'
      })
    },
    {
      title: t({ en: 'Integrity', fr: 'Intégrité' }),
      description: t({
        en: 'Transparency and honesty in all our business practices.',
        fr: 'Transparence et honnêteté dans toutes nos pratiques commerciales.'
      })
    }
  ];

  const team = [
    { name: 'Sarah Chen', role: t({ en: 'CEO & Founder', fr: 'PDG & Fondatrice' }), avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah' },
    { name: 'Michael Rodriguez', role: t({ en: 'CTO', fr: 'Directeur Technique' }), avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael' },
    { name: 'Emma Thompson', role: t({ en: 'Lead Designer', fr: 'Designer Principal' }), avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma' },
    { name: 'David Kim', role: t({ en: 'Senior Developer', fr: 'Développeur Senior' }), avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David' }
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/80 to-background/90 z-10" />
          <img
            src={teamImage}
            alt="Team collaboration"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-20 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-5xl lg:text-6xl font-bold text-foreground mb-6">
            {t({ en: 'About E&M Software System', fr: 'À Propos d\'E&M Software System' })}
          </h1>
          <p className="text-xl text-muted-foreground">
            {t({
              en: 'Building the future of software, one solution at a time.',
              fr: 'Construire l\'avenir du logiciel, une solution à la fois.'
            })}
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-foreground mb-6">
                {t({ en: 'Our Mission', fr: 'Notre Mission' })}
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                {t({
                  en: 'E&M Software System was founded with a clear vision: to empower businesses through innovative, reliable, and scalable software solutions. Since 2010, we\'ve been helping organizations of all sizes transform their operations and achieve their digital goals.',
                  fr: 'E&M Software System a été fondé avec une vision claire : permettre aux entreprises de prospérer grâce à des solutions logicielles innovantes, fiables et évolutives. Depuis 2010, nous aidons les organisations de toutes tailles à transformer leurs opérations et à atteindre leurs objectifs numériques.'
                })}
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t({
                  en: 'Our team of experienced developers, designers, and strategists work collaboratively to deliver solutions that not only meet but exceed expectations. We believe in building long-term partnerships with our clients, supporting them every step of their digital journey.',
                  fr: 'Notre équipe de développeurs, designers et stratèges expérimentés travaille en collaboration pour fournir des solutions qui non seulement répondent mais dépassent les attentes. Nous croyons en la construction de partenariats à long terme avec nos clients, en les soutenant à chaque étape de leur parcours numérique.'
                })}
              </p>
            </div>
            <div className="rounded-lg overflow-hidden">
              <img
                src={officeImage}
                alt="Modern office"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              {t({ en: 'Our Values', fr: 'Nos Valeurs' })}
            </h2>
            <p className="text-lg text-muted-foreground">
              {t({
                en: 'The principles that guide everything we do.',
                fr: 'Les principes qui guident tout ce que nous faisons.'
              })}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} data-testid={`value-card-${index}`}>
                <CardContent className="pt-6">
                  <CheckCircle2 className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-3">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              {t({ en: 'Meet Our Team', fr: 'Rencontrez Notre Équipe' })}
            </h2>
            <p className="text-lg text-muted-foreground">
              {t({
                en: 'The talented people behind our success.',
                fr: 'Les personnes talentueuses derrière notre succès.'
              })}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center" data-testid={`team-member-${index}`}>
                <Avatar className="h-32 w-32 mx-auto mb-4">
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <h3 className="text-lg font-semibold text-foreground mb-1">{member.name}</h3>
                <p className="text-muted-foreground">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
