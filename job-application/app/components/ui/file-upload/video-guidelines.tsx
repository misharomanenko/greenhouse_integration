import { motion } from 'framer-motion';

const VIDEO_PROMPTS = [
  {
    title: 'Introduction',
    duration: '1 minute',
    description:
      'Tell us a bit about yourself, your background, and what drives you. What experiences have shaped you and why are you excited about this opportunity?',
    icon: '👋',
  },
  {
    title: 'Technical Achievement',
    duration: '1 minute',
    description:
      "Describe the most challenging project you've built or contributed to. What was your role, what obstacles did you face, and what did you learn from the experience?",
    icon: '🛠️',
  },
  {
    title: 'Future Vision',
    duration: '1 minute',
    description:
      'Which exponential technology are you most excited about, and why? How do you see this technology shaping the future, and what role do you hope to play in its development?',
    icon: '🚀',
  },
];

export const VideoGuidelines = () => {
  return (
    <>
      <div className='border-b border-gray-200 dark:border-gray-700'>
        <div className='px-6 py-4'>
          <h3 className='text-lg font-semibold text-gray-900 dark:text-gray-100'>
            Video Introduction Guidelines
          </h3>
          <p className='mt-1 text-sm text-gray-500 dark:text-gray-400'>
            Please address all prompts in your video (3 minutes total)
          </p>
        </div>
      </div>
      <div className='px-6 py-4 space-y-6'>
        {VIDEO_PROMPTS.map((prompt, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className='flex gap-4'>
              <div className='flex-shrink-0 mt-1'>
                <div className='w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700'>
                  <span className='text-lg'>{prompt.icon}</span>
                </div>
              </div>
              <div>
                <div className='flex items-center gap-2'>
                  <h4 className='font-medium text-gray-900 dark:text-gray-100'>
                    {prompt.title}
                  </h4>
                  <span className='text-sm text-gray-500 dark:text-gray-400'>
                    ({prompt.duration})
                  </span>
                </div>
                <p className='mt-1 text-sm text-gray-600 dark:text-gray-400'>
                  {prompt.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      <div className='px-6 py-4 bg-gray-50 dark:bg-gray-750 border-t border-gray-200 dark:border-gray-700'>
        <div className='flex items-center gap-2 mb-3'>
          <div className='w-5 h-5 flex items-center justify-center'>
            <span className='text-base'>💡</span>
          </div>
          <h4 className='text-sm font-medium text-gray-900 dark:text-gray-100'>
            Tips for a Great Video
          </h4>
        </div>
        <div className='grid grid-cols-2 gap-4'>
          <div className='space-y-2'>
            <p className='text-sm text-gray-600 dark:text-gray-400'>
              <span className='inline-block w-4'>•</span>
              Find a quiet space with good lighting
            </p>
            <p className='text-sm text-gray-600 dark:text-gray-400'>
              <span className='inline-block w-4'>•</span>
              Speak clearly and maintain eye contact
            </p>
          </div>
          <div className='space-y-2'>
            <p className='text-sm text-gray-600 dark:text-gray-400'>
              <span className='inline-block w-4'>•</span>
              Keep total length under 3 minutes
            </p>
            <p className='text-sm text-gray-600 dark:text-gray-400'>
              <span className='inline-block w-4'>•</span>
              Be authentic and show your personality
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
