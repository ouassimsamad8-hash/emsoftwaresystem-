import { motion } from 'framer-motion';
import clsx from 'clsx';

interface Category {
  id: string;
  label: string;
  count: number;
}

interface CategoryPillsProps {
  categories: Category[];
  activeCategory: string | null;
  onCategoryChange: (categoryId: string | null) => void;
}

export default function CategoryPills({
  categories,
  activeCategory,
  onCategoryChange,
}: CategoryPillsProps) {
  return (
    <div className="flex gap-3 overflow-x-auto scrollbar-hide">
      <motion.button
        whileHover={{ y: -1 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => onCategoryChange(null)}
        className={clsx(
          'whitespace-nowrap rounded-full border-2 px-6 py-2.5 text-sm font-medium transition-all duration-200',
          activeCategory === null
            ? 'border-primary/20 bg-primary text-primary-foreground shadow-lg'
            : 'border-transparent bg-muted text-muted-foreground hover:bg-muted/80'
        )}
      >
        Tous les articles
      </motion.button>

      {categories.map((category) => (
        <motion.button
          key={category.id}
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onCategoryChange(category.id)}
          className={clsx(
            'whitespace-nowrap rounded-full border-2 px-6 py-2.5 text-sm font-medium transition-all duration-200',
            activeCategory === category.id
              ? 'border-primary/20 bg-primary text-primary-foreground shadow-lg'
              : 'border-transparent bg-muted text-muted-foreground hover:bg-muted/80'
          )}
        >
          {category.label}
        </motion.button>
      ))}
    </div>
  );
}
