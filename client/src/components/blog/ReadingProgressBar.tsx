import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export function ReadingProgressBar() {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      // Show progress bar after scrolling 100px
      setIsVisible(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-muted/20"
    >
      <motion.div
        className="h-full bg-gradient-to-r from-primary via-blue-500 to-primary origin-left"
        style={{ scaleX }}
      />
    </motion.div>
  );
}
