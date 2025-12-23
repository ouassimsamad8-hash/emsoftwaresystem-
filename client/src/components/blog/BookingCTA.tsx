import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { Calendar, ArrowRight } from 'lucide-react';

export function BookingCTA() {
  return (
    <section className="py-16 bg-gradient-to-br from-primary via-primary/90 to-primary/80 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-6"
          >
            <Calendar className="w-10 h-10 text-white" />
          </motion.div>

          {/* Title */}
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Prêt à transformer votre entreprise ?
          </h2>

          {/* Description */}
          <p className="text-lg lg:text-xl text-white/90 mb-8 leading-relaxed">
            Réservez une consultation gratuite avec nos experts et découvrez comment 
            nous pouvons vous aider à atteindre vos objectifs digitaux.
          </p>

          {/* CTA Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-primary rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all cursor-pointer group"
            data-cal-link="emsoftware-system-dlwqri/30min"
            data-cal-config='{"layout":"column_view"}'
          >
            <span>Réserver une consultation</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>

          {/* Features */}
          <div className="flex flex-wrap justify-center gap-6 mt-10 text-white/90">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-white/80 rounded-full" />
              <span className="text-sm">Consultation gratuite</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-white/80 rounded-full" />
              <span className="text-sm">Réponse sous 24h</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-white/80 rounded-full" />
              <span className="text-sm">Sans engagement</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
