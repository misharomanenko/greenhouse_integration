import React, { useEffect, useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import { Send } from 'lucide-react';

import { Input } from '@/app/components/shared/Form/input';
import { Button } from '@/app/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/app/components/ui/dialog';
import { cn } from '@/lib/utils';

interface SubmitConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  expectedName: string;
}

export function SubmitConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  expectedName,
}: SubmitConfirmationModalProps) {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Clear form state when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setName('');
      setError('');
      setIsSubmitting(false);
    }
  }, [isOpen]);

  const isNameValid =
    name.trim().toLowerCase() === expectedName.trim().toLowerCase();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setError('Please enter your name');
      return;
    }

    if (!isNameValid) {
      setError(
        'Please enter your name exactly as it appears on your application'
      );
      return;
    }

    setIsSubmitting(true);
    try {
      await onConfirm();
      onClose();
    } catch (error) {
      setError('An error occurred while submitting. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='bg-white p-4 sm:p-6 rounded-2xl max-w-[95vw] sm:max-w-md w-full border border-input transition-all duration-300'>
        <DialogHeader>
          <DialogTitle className='text-xl sm:text-2xl font-bold mb-2'>
            Confirm Application Submission
          </DialogTitle>
          <DialogDescription className='text-sm sm:text-base text-muted-foreground mb-4'>
            Please type your full name (
            <span className='font-medium'>{expectedName}</span>) to confirm
            submission. This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <Input
              placeholder='Enter your full name'
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError(''); // Clear error when user types
              }}
              className={cn(
                'bg-background border-input',
                error && 'border-destructive'
              )}
              disabled={isSubmitting}
              autoComplete='off' // Prevent autofill
              autoFocus // Focus input when modal opens
            />
            <AnimatePresence mode='wait'>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className='text-destructive text-sm mt-2'
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
          <div className='flex justify-end space-x-3'>
            <Button
              type='button'
              variant='outline'
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type='submit'
              className='flex items-center space-x-2'
              disabled={!name.trim() || !isNameValid || isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                    className='w-4 h-4 border-2 border-white dark:border-gray-800 border-t-transparent rounded-full'
                  />
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <Send className='w-4 h-4' />
                  <span>Submit Application</span>
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
