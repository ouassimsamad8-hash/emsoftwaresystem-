import { useState } from 'react';
import { Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchBar({ value, onChange, placeholder = "Rechercher des articles..." }: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <motion.div
      animate={{
        width: isFocused ? '520px' : '420px',
      }}
      transition={{ duration: 0.3 }}
      className="relative max-w-full"
    >
      <div
        className={`
          relative overflow-hidden rounded-2xl border-2 bg-muted/50 transition-all duration-300
          ${isFocused
            ? 'border-primary bg-background shadow-[0_0_0_4px_rgba(var(--primary),0.1)]'
            : 'border-border'
          }
        `}
      >
        <div className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2">
          <Search className="h-5 w-5 text-muted-foreground" />
        </div>
        
        <input
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="w-full border-0 bg-transparent py-3.5 pl-14 pr-5 text-[15px] text-foreground placeholder:text-muted-foreground focus:outline-none"
        />
      </div>
    </motion.div>
  );
}
