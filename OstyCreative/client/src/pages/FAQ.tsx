import { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/lib/language-context';
import { faqs } from '@/data/content';
import { Link } from 'wouter';

export default function FAQ() {
  const { t, language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: t({ en: 'All Questions', fr: 'Toutes les Questions' }) },
    ...Array.from(new Set(faqs.map(faq => faq.category))).map(cat => {
      const faq = faqs.find(f => f.category === cat);
      return { id: cat, label: faq!.categoryLabel[language] };
    })
  ];

  const filteredFAQs = activeCategory === 'all' 
    ? faqs 
    : faqs.filter(faq => faq.category === activeCategory);

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-24 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-5xl lg:text-6xl font-bold text-foreground mb-6">
            {t({ en: 'Frequently Asked Questions', fr: 'Questions Fréquemment Posées' })}
          </h1>
          <p className="text-xl text-muted-foreground">
            {t({
              en: 'Find answers to common questions about our services and processes.',
              fr: 'Trouvez des réponses aux questions courantes sur nos services et processus.'
            })}
          </p>
        </div>
      </section>

      {/* Category Filters */}
      <section className="pb-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? 'default' : 'outline'}
                onClick={() => setActiveCategory(category.id)}
                data-testid={`filter-${category.id}`}
              >
                {category.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="pb-24">
        <div className="max-w-4xl mx-auto px-4">
          <Accordion type="single" collapsible className="space-y-4">
            {filteredFAQs.map((faq) => (
              <AccordionItem 
                key={faq.id} 
                value={faq.id} 
                className="bg-card border border-card-border rounded-lg px-6"
                data-testid={`faq-${faq.id}`}
              >
                <AccordionTrigger className="text-left hover:no-underline py-6">
                  <span className="text-lg font-semibold text-foreground pr-4">
                    {faq.question[language]}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
                  {faq.answer[language]}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-primary/10 via-primary/5 to-background">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-foreground mb-6">
            {t({
              en: 'Still Have Questions?',
              fr: 'Vous Avez Encore des Questions ?'
            })}
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            {t({
              en: 'Our team is here to help. Contact us or book a consultation to discuss your specific needs.',
              fr: 'Notre équipe est là pour vous aider. Contactez-nous ou réservez une consultation pour discuter de vos besoins spécifiques.'
            })}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" data-testid="button-cta-contact">
                {t({ en: 'Contact Us', fr: 'Nous Contacter' })}
              </Button>
            </Link>
            <Link href="/book-appointment">
              <Button size="lg" variant="outline" data-testid="button-cta-appointment">
                {t({ en: 'Book Consultation', fr: 'Réserver une Consultation' })}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
