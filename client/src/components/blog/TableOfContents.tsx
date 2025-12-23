import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

export function TableOfContents({ content }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Extract headings from content
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;
    const headingElements = tempDiv.querySelectorAll('h2, h3');
    
    const extractedHeadings: Heading[] = Array.from(headingElements).map((heading, index) => {
      const id = `heading-${index}`;
      const text = heading.textContent || '';
      const level = parseInt(heading.tagName.substring(1));
      return { id, text, level };
    });

    setHeadings(extractedHeadings);
  }, [content]);

  useEffect(() => {
    // Scroll spy functionality
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };

    observerRef.current = new IntersectionObserver(handleIntersection, {
      rootMargin: '-100px 0px -66%',
      threshold: 0
    });

    // Observe all heading elements
    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element && observerRef.current) {
        observerRef.current.observe(element);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [headings]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -100;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  if (headings.length === 0) return null;

  return (
    <>
      {/* Desktop - Sticky Right */}
      <div className="hidden xl:block sticky top-24 self-start w-64 ml-8">
        <div className="p-6 bg-card border border-border rounded-[16px]">
          <h3 className="text-sm font-bold text-foreground uppercase tracking-wider mb-4">
            Table des matières
          </h3>
          <nav className="space-y-2">
            {headings.map((heading) => (
              <button
                key={heading.id}
                onClick={() => scrollToHeading(heading.id)}
                className={`block w-full text-left text-sm transition-all duration-200 ${
                  heading.level === 3 ? 'pl-4' : ''
                } ${
                  activeId === heading.id
                    ? 'text-primary font-semibold'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {heading.text}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile - Accordion */}
      <div className="xl:hidden mb-8">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between w-full p-4 bg-card border border-border rounded-[12px] hover:bg-muted/50 transition-colors"
        >
          <span className="text-sm font-bold text-foreground uppercase tracking-wider">
            Table des matières
          </span>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-5 h-5 text-muted-foreground" />
          </motion.div>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <nav className="p-4 space-y-2 bg-muted/30 rounded-b-[12px] border-x border-b border-border">
                {headings.map((heading) => (
                  <button
                    key={heading.id}
                    onClick={() => scrollToHeading(heading.id)}
                    className={`block w-full text-left text-sm transition-all duration-200 py-2 ${
                      heading.level === 3 ? 'pl-4' : ''
                    } ${
                      activeId === heading.id
                        ? 'text-primary font-semibold'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {heading.text}
                  </button>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
