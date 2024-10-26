import { motion } from 'framer-motion';

const COVER_LETTER_GUIDELINES = {
  title: 'Cover Letter Guidelines',
  description:
    "Tell us your story and why you're excited about this opportunity",
  tips: [
    'Address your specific interest in the KP Fellows program',
    'Highlight relevant experiences and achievements',
    'Show your understanding of our mission',
    'Keep content clear and concise',
  ],
};

export const CoverLetterGuidelines = () => {
  return (
    <>
      <div className='border-b border-gray-200 dark:border-gray-700'>
        <div className='px-6 py-4'>
          <h3 className='text-lg font-semibold text-gray-900 dark:text-gray-100'>
            {COVER_LETTER_GUIDELINES.title}
          </h3>
          <p className='mt-1 text-sm text-gray-500 dark:text-gray-400'>
            {COVER_LETTER_GUIDELINES.description}
          </p>
        </div>
      </div>
      <div className='px-6 py-4'>
        <div className='space-y-3'>
          {COVER_LETTER_GUIDELINES.tips.map((tip, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className='flex items-start gap-3'
            >
              <div className='flex-shrink-0 w-5 h-5 flex items-center justify-center mt-0.5'>
                <span className='text-blue-500 dark:text-blue-400'>•</span>
              </div>
              <p className='text-sm text-gray-600 dark:text-gray-400'>{tip}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};
