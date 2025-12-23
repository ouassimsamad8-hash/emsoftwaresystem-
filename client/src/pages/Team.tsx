import { useLanguage } from '@/lib/language-context';
import { teamMembers } from '@/data/content';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Mail, Linkedin, Twitter, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Team() {
  const { language } = useLanguage();

  const content = {
    en: {
      title: 'Meet Our Team',
      subtitle: 'The talented people behind E&M Software System',
      description: 'Our diverse team of experts brings together decades of experience in software development, design, and innovation. We\'re passionate about creating solutions that make a difference.',
      expertise: 'Expertise',
      contact: 'Contact'
    },
    fr: {
      title: 'Rencontrez Notre Équipe',
      subtitle: 'Les talents derrière E&M Software System',
      description: 'Notre équipe diversifiée d\'experts réunit des décennies d\'expérience en développement logiciel, design et innovation. Nous sommes passionnés par la création de solutions qui font la différence.',
      expertise: 'Expertise',
      contact: 'Contact'
    }
  };

  const t = content[language];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              {t.title}
            </h1>
            <p className="text-xl text-muted-foreground mb-4 max-w-3xl mx-auto">
              {t.subtitle}
            </p>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
              {t.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-12 px-4 pb-20">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers
              .sort((a, b) => a.order - b.order)
              .map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full">
                    <CardContent className="p-6">
                      {/* Avatar */}
                      <div className="relative mb-4">
                        <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-primary/20 to-purple-600/20 p-1">
                          <div className="w-full h-full rounded-full bg-muted flex items-center justify-center overflow-hidden">
                            {member.avatar ? (
                              <img
                                src={member.avatar}
                                alt={member.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <span className="text-4xl font-bold text-primary">
                                {member.name.charAt(0)}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Name & Role */}
                      <div className="text-center mb-4">
                        <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                        <p className="text-primary font-medium">
                          {member.role[language]}
                        </p>
                      </div>

                      {/* Bio */}
                      <p className="text-sm text-muted-foreground mb-4 text-center">
                        {member.bio[language]}
                      </p>

                      {/* Expertise */}
                      <div className="mb-4">
                        <p className="text-xs font-semibold text-muted-foreground mb-2 text-center">
                          {t.expertise}
                        </p>
                        <div className="flex flex-wrap gap-1 justify-center">
                          {member.expertise.map((skill) => (
                            <Badge
                              key={skill}
                              variant="secondary"
                              className="text-xs"
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Social Links */}
                      <div className="flex justify-center gap-2 pt-4 border-t">
                        {member.email && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            asChild
                          >
                            <a href={`mailto:${member.email}`} title="Email">
                              <Mail className="h-4 w-4" />
                            </a>
                          </Button>
                        )}
                        {member.phone && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            asChild
                          >
                            <a href={`tel:${member.phone}`} title="Phone">
                              <Phone className="h-4 w-4" />
                            </a>
                          </Button>
                        )}
                        {member.linkedin && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            asChild
                          >
                            <a
                              href={member.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              title="LinkedIn"
                            >
                              <Linkedin className="h-4 w-4" />
                            </a>
                          </Button>
                        )}
                        {member.twitter && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            asChild
                          >
                            <a
                              href={member.twitter}
                              target="_blank"
                              rel="noopener noreferrer"
                              title="Twitter"
                            >
                              <Twitter className="h-4 w-4" />
                            </a>
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}
