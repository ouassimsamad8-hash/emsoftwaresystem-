import { motion } from 'framer-motion';
import { Facebook, Twitter, Linkedin, Link2, MessageCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

interface SocialShareBarProps {
  url: string;
  title: string;
}

export function SocialShareBar({ url, title }: SocialShareBarProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const shareLinks = [
    {
      name: 'Facebook',
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      color: 'hover:text-blue-600'
    },
    {
      name: 'Twitter',
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      color: 'hover:text-sky-500'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      color: 'hover:text-blue-700'
    },
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      url: `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`,
      color: 'hover:text-green-600'
    }
  ];

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Desktop - Sticky Left */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="hidden lg:flex fixed left-8 top-1/2 -translate-y-1/2 z-40 flex-col gap-3"
      >
        <div className="flex flex-col gap-3 p-3 bg-card border border-border rounded-[16px] shadow-lg">
          {shareLinks.map((link, index) => (
            <motion.a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-3 rounded-lg bg-muted/50 hover:bg-muted transition-all duration-200 ${link.color}`}
              title={`Partager sur ${link.name}`}
            >
              <link.icon className="w-5 h-5" />
            </motion.a>
          ))}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            onClick={handleCopyLink}
            className={`p-3 rounded-lg bg-muted/50 hover:bg-muted transition-all duration-200 ${
              copied ? 'text-green-600' : 'hover:text-primary'
            }`}
            title="Copier le lien"
          >
            <Link2 className="w-5 h-5" />
          </motion.button>
        </div>
      </motion.div>

      {/* Mobile - Floating Bottom */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="lg:hidden fixed bottom-6 left-4 right-4 z-40"
      >
        <div className="flex items-center justify-around gap-2 p-3 bg-card border border-border rounded-[16px] shadow-xl">
          {shareLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-3 rounded-lg bg-muted/50 active:scale-95 transition-all ${link.color}`}
            >
              <link.icon className="w-5 h-5" />
            </a>
          ))}
          <button
            onClick={handleCopyLink}
            className={`p-3 rounded-lg bg-muted/50 active:scale-95 transition-all ${
              copied ? 'text-green-600' : 'hover:text-primary'
            }`}
          >
            <Link2 className="w-5 h-5" />
          </button>
        </div>
      </motion.div>
    </>
  );
}
