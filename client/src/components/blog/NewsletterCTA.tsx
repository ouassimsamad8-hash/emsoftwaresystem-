import { useState } from 'react';
import { Mail, ArrowRight, Lock } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function NewsletterCTA() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter signup:', email);
    setEmail('');
  };

  return (
    <section className="w-full bg-gradient-to-br from-primary/5 to-primary/10 py-20 border-t">
      <div className="container mx-auto px-6 lg:px-16 max-w-[1320px]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-[720px] text-center"
        >
          {/* Icon */}
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-[20px] bg-card p-4 shadow-lg">
            <Mail className="h-8 w-8 text-primary" />
          </div>

          {/* Heading */}
          <h2 className="mb-3 text-4xl font-bold text-foreground">
            Restez Informé
          </h2>

          {/* Description */}
          <p className="mb-8 text-base leading-relaxed text-muted-foreground">
            Recevez nos derniers articles et insights directement dans votre boîte mail. Pas de spam, promis.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mx-auto max-w-[480px]">
            <div className="flex flex-col gap-3 sm:flex-row">
              <Input
                type="email"
                placeholder="votre@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-14 flex-1 rounded-[14px] border-2 bg-background px-5 text-[15px]"
              />
              <Button
                type="submit"
                className="h-14 gap-2 rounded-[14px] bg-primary px-8 text-[15px] font-bold shadow-lg transition-all hover:translate-y-[-2px] hover:shadow-xl"
              >
                S'abonner
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>

            {/* Privacy Text */}
            <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
              <Lock className="h-3 w-3" />
              <span>Vos données sont protégées. Désabonnement en un clic.</span>
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
