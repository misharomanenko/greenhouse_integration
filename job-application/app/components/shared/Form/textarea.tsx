import * as React from 'react';

import { AnimatePresence, motion } from 'framer-motion';

import { cn } from '@/lib/utils';

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  icon?: React.ReactNode;
  maxWords?: number;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, icon, maxWords, onChange, value, ...props }, ref) => {
    // Improved word counting with better Unicode support and performance
    const wordCount = React.useMemo(() => {
      if (!value || typeof value !== 'string') return 0;

      // Enhanced text normalization with better Unicode handling
      const normalizedText = value
        .normalize('NFKC') // Normalize Unicode characters
        .trim()
        .replace(/[\u200B-\u200D\uFEFF\uFFF9-\uFFFC]/g, '') // Remove zero-width and control chars
        .replace(/[^\w\s]|_/g, ' ') // Convert punctuation and symbols to spaces
        .replace(/\s+/g, ' ') // Normalize spaces
        .trim();

      // Simple but effective word counting
      return normalizedText ? normalizedText.split(/\s+/).length : 0;
    }, [value]);

    // Debounced word count for better performance
    const [debouncedCount, setDebouncedCount] = React.useState(wordCount);
    React.useEffect(() => {
      const timer = setTimeout(() => setDebouncedCount(wordCount), 100);
      return () => clearTimeout(timer);
    }, [wordCount]);

    // Get word count status color
    const getWordCountStatus = React.useCallback((count: number) => {
      if (count > 250) return 'text-red-500';
      if (count >= 230 && count <= 250) return 'text-green-500';
      return 'text-gray-500';
    }, []);

    // Enhanced change handler with improved validation
    const handleChange = React.useCallback(
      (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (!maxWords) {
          onChange?.(e);
          return;
        }

        const newText = e.target.value;
        // Only perform expensive word count if we're near the limit
        if (
          newText.length < (value as string)?.length ||
          debouncedCount < maxWords
        ) {
          onChange?.(e);
          return;
        }

        // Full word count check when near limit
        const newWordCount = newText
          .normalize('NFKC')
          .trim()
          .replace(/[\u200B-\u200D\uFEFF\uFFF9-\uFFFC]/g, '')
          .replace(/[^\w\s]|_/g, ' ')
          .replace(/\s+/g, ' ')
          .trim()
          .split(/\s+/).length;

        if (!newText || newWordCount <= maxWords) {
          onChange?.(e);
        }
      },
      [maxWords, onChange, value, debouncedCount]
    );

    return (
      <motion.div
        className='relative w-full'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <AnimatePresence>
          {icon && (
            <motion.div
              className='absolute left-3 top-3 text-gray-400'
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
            >
              {icon}
            </motion.div>
          )}
        </AnimatePresence>
        <textarea
          className={cn(
            'flex min-h-[80px] w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-900',
            'focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500',
            'disabled:cursor-not-allowed disabled:opacity-50',
            'transition-all duration-300',
            'hover:shadow-glow',
            'resize-y',
            icon ? 'pl-10' : '',
            className
          )}
          onChange={handleChange}
          value={value}
          ref={ref}
          {...props}
        />
        <AnimatePresence>
          {maxWords && (
            <motion.div
              className={cn(
                'mt-1 flex items-center justify-end gap-2 text-xs',
                getWordCountStatus(debouncedCount)
              )}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <span className='font-medium'>
                {debouncedCount} / {maxWords} words
              </span>
              {debouncedCount > 250 ? (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className='text-red-500'
                >
                  (Please reduce by {debouncedCount - 250} words)
                </motion.span>
              ) : debouncedCount >= 230 && debouncedCount <= 250 ? (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className='text-green-500'
                >
                  (Ideal length)
                </motion.span>
              ) : null}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  }
);

Textarea.displayName = 'Textarea';

export { Textarea };
