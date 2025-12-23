import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface RichTextContentProps {
  content: string;
}

export function RichTextContent({ content }: RichTextContentProps) {
  const [processedContent, setProcessedContent] = useState('');

  useEffect(() => {
    // Add IDs to headings for table of contents
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;
    
    const headings = tempDiv.querySelectorAll('h2, h3');
    headings.forEach((heading, index) => {
      heading.id = `heading-${index}`;
    });

    setProcessedContent(tempDiv.innerHTML);
  }, [content]);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="prose prose-lg max-w-none
        prose-headings:text-foreground prose-headings:font-bold
        prose-h2:text-4xl prose-h2:mb-6 prose-h2:mt-12 prose-h2:leading-tight
        prose-h3:text-2xl prose-h3:mb-4 prose-h3:mt-8
        prose-p:text-foreground prose-p:text-lg prose-p:leading-[1.8] prose-p:mb-6
        prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-a:font-medium
        prose-strong:text-foreground prose-strong:font-bold
        prose-em:text-foreground
        prose-code:text-primary prose-code:bg-muted prose-code:px-2 prose-code:py-1 prose-code:rounded-md prose-code:text-sm prose-code:font-mono prose-code:before:content-none prose-code:after:content-none
        prose-pre:bg-muted prose-pre:border prose-pre:border-border prose-pre:rounded-[12px] prose-pre:p-6 prose-pre:overflow-x-auto
        prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-primary/5 prose-blockquote:pl-6 prose-blockquote:pr-6 prose-blockquote:py-4 prose-blockquote:rounded-r-[12px] prose-blockquote:not-italic prose-blockquote:text-foreground/90
        prose-ul:text-foreground prose-ul:mb-6 prose-ul:list-disc prose-ul:pl-6
        prose-ol:text-foreground prose-ol:mb-6 prose-ol:list-decimal prose-ol:pl-6
        prose-li:text-lg prose-li:leading-relaxed prose-li:mb-2 prose-li:marker:text-primary
        prose-img:rounded-[16px] prose-img:shadow-lg prose-img:w-full prose-img:my-8
        prose-hr:border-border prose-hr:my-12"
      dangerouslySetInnerHTML={{ __html: processedContent }}
    />
  );
}
