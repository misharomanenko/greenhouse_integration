import React, { useState } from 'react';
import { FaEnvelope } from 'react-icons/fa';

import { AnimatePresence, motion } from 'framer-motion';

import { Input } from '@/app/components/shared/Form/input';
import { Textarea } from '@/app/components/shared/Form/textarea';
import { Button } from '@/app/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/app/components/ui/dialog';

export function SupportModal() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the support request
    console.log('Support request submitted:', { name, email, message });
    // Reset form
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <AnimatePresence>
      <DialogContent className='bg-gray-900 backdrop-blur-xl p-4 sm:p-6 rounded-2xl max-w-[95vw] sm:max-w-md w-full border border-white/10 hover:border-white/20 transition-all duration-300'>
        <DialogHeader>
          <DialogTitle className='text-xl sm:text-2xl font-bold text-primary-white mb-2'>
            Contact KP Fellows Support
          </DialogTitle>
          <DialogDescription className='text-sm sm:text-base text-gray-400 mb-4'>
            We're here to help! Please fill out the form below or reach out to
            us directly.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className='space-y-3 sm:space-y-4'>
          <Input
            placeholder='Your Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='w-full bg-gray-800 text-primary-white border-white/20 text-sm sm:text-base'
          />
          <Input
            type='email'
            placeholder='Your Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='w-full bg-gray-800 text-primary-white border-white/20 text-sm sm:text-base'
          />
          <Textarea
            placeholder='How can we help?'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className='w-full bg-gray-800 text-primary-white border-white/20 text-sm sm:text-base'
            rows={3}
          />
          <Button
            type='submit'
            className='w-full bg-primary-blue text-white hover:bg-light-blue transition-colors duration-300 text-sm sm:text-base py-2 sm:py-3'
          >
            Send Message
          </Button>
        </form>
        <div className='mt-4 sm:mt-6'>
          <h4 className='text-xs sm:text-sm font-semibold text-primary-white mb-2'>
            Or reach us directly:
          </h4>
          <div className='flex items-center space-x-2'>
            <FaEnvelope className='text-primary-blue text-sm sm:text-base' />
            <span className='text-xs sm:text-sm text-gray-400'>Email:</span>
            <a
              href='mailto:fellows@kleinerperkins.com'
              className='text-xs sm:text-sm text-light-blue hover:text-white transition-colors duration-200'
            >
              fellows@kleinerperkins.com
            </a>
          </div>
        </div>
      </DialogContent>
    </AnimatePresence>
  );
}

export function SupportModalTrigger() {
  return (
    <DialogTrigger asChild>
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          variant='outline'
          className='bg-gray-800 text-white border-white/20 hover:bg-gray-700 hover:border-white/40 transition-colors duration-300 text-sm sm:text-base py-1 sm:py-2 px-2 sm:px-3'
        >
          Support
        </Button>
      </motion.div>
    </DialogTrigger>
  );
}

export function SupportModalWrapper() {
  return (
    <Dialog>
      <SupportModalTrigger />
      <SupportModal />
    </Dialog>
  );
}
