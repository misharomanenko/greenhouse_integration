import React from 'react';

import { motion } from 'framer-motion';

interface PreviewModalProps {
  simulation: any; // Replace 'any' with the correct type for your simulation data
  question: any; // Replace 'any' with the correct type for your question data
  onClose: () => void;
}

const PreviewModal: React.FC<PreviewModalProps> = ({
  simulation,
  question,
  onClose,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className='bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto'
      >
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-2xl font-bold'>Preview</h2>
          <button
            onClick={onClose}
            className='text-gray-500 hover:text-gray-700'
          >
            Close
          </button>
        </div>
        <div className='preview-content'>
          {/* Add your preview content here */}
          <h3 className='text-xl font-semibold mb-2'>{question.title}</h3>
          <p>{question.description}</p>
          {/* Add more preview content as needed */}
        </div>
        <div className='mt-6 flex justify-end'>
          <button
            onClick={() => {
              // Implement PDF download logic here
              console.log('Downloading PDF...');
            }}
            className='bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded'
          >
            Download PDF
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PreviewModal;
