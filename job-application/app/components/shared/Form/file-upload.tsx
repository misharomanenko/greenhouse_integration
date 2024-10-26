import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { message } from 'antd';

import { AnimatePresence, motion } from 'framer-motion';
import { Eye, File, Upload, X } from 'lucide-react';
import axios from 'axios';

import { cn } from '@/lib/utils';

import { Button } from '../../ui/button';
import { Dialog, DialogContent } from '../../ui/dialog';
import { CoverLetterGuidelines } from '../../ui/file-upload/cover-letter-guidelines';
import { ResumeGuidelines } from '../../ui/file-upload/resume-guidelines';
import { VideoGuidelines } from '../../ui/file-upload/video-guidelines';
import { Label } from './label';
import { currentUser } from '@/app/data/mockUser';
import { useParams } from 'next/navigation';

type FileType = 'video' | 'resume' | 'coverLetter';

interface FileUploadProps {
  onChange: (fileData: { file: File | null, content?: string }) => void;
  value: string | null;
  disabled?: boolean;
  fileType: FileType;
  label: string;
  className?: string;
  showLabel?: boolean;
  onSave?: (data: { resume: { file: File, content: string, type: string } }) => void;
}

// Add file type configurations
const FILE_TYPE_CONFIG = {
  video: {
    buttonText: 'Upload your video introduction',
    fileInfo: 'MP4, MOV, or WebM (max 100MB)',
  },
  resume: {
    buttonText: 'Upload your resume',
    fileInfo: 'PDF, DOC, or DOCX (max 10MB)',
  },
  coverLetter: {
    buttonText: 'Upload your cover letter',
    fileInfo: 'PDF, DOC, or DOCX (max 10MB)',
  },
} as const;

export const FileUpload: React.FC<FileUploadProps> = ({
  onChange,
  value,
  disabled,
  fileType,
  label,
  className,
  showLabel = true,
  onSave,
}) => {
  const { id: jobId } = useParams();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    if (!value) {
      setFileName(null);
      setPreviewUrl(null);
    }
  }, [value]);

  const getAcceptedFileTypes = useCallback((fileType: FileType) => {
    switch (fileType) {
      case 'resume':
      case 'coverLetter':
        return '.pdf,.doc,.docx';
      case 'video':
        return 'video/*'; // Allow all video formats
      default:
        return '*/*';
    }
  }, []);

  const handleFileChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      event.preventDefault(); // Prevent form submission
      const file = event.target.files?.[0];
      if (!file) {
        setFileName(null);
        setPreviewUrl(null);
        onChange({ file: null });
        return;
      }

      setIsUploading(true);
      setFileName(file.name);

      try {
        // Create preview URL for the file
        const objectUrl = URL.createObjectURL(file);
        setPreviewUrl(objectUrl);

        // Read file content
        const reader = new FileReader();
        reader.onloadend = async () => {
          const base64Content = reader.result as string;
          const contentWithoutPrefix = base64Content.split(',')[1];

          if (!contentWithoutPrefix) {
            message.error('Failed to process file content');
            return;
          }

          try {
            // Prepare the application data
            const applicationData = {
              user_id: currentUser.id,
              job_id: parseInt(jobId as string),
              attachments: [{
                filename: file.name,
                type: 'resume',
                content: contentWithoutPrefix,
                content_type: file.type
              }]
            };

            // Save to API which will write to JSON file
            const response = await axios.post('/api/applications/save', applicationData, {
              headers: {
                'Content-Type': 'application/json'
              }
            });
            
            if (response.data) {
              message.success('File uploaded successfully');
              onChange({ 
                file,
                content: contentWithoutPrefix 
              });
            }
          } catch (error) {
            console.error('Save error:', error);
            message.error('Failed to save file');
            // Reset on error
            if (fileInputRef.current) {
              fileInputRef.current.value = '';
            }
          }
        };
        reader.readAsDataURL(file);
      } catch (error) {
        console.error('File processing error:', error);
        message.error('Failed to process file');
      } finally {
        setIsUploading(false);
      }
    },
    [onChange, jobId]
  );

  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const handleViewFile = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      if (!previewUrl) return;

      if (fileType === 'video') {
        setIsVideoModalOpen(true);
      }
    },
    [fileType, previewUrl]
  );

  const handleRemoveFile = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setFileName(null);
    setPreviewUrl(null);
    onChange({ file: null });
  }, [onChange]);

  return (
    <div className={cn('space-y-4', className)}>
      {showLabel && (
        <Label
          htmlFor={fileType}
          className='text-sm font-medium text-gray-700 dark:text-gray-300'
        >
          {label}
        </Label>
      )}

      {/* Guidelines Sections */}
      {!fileName && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className='bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm'
        >
          {(() => {
            switch (fileType) {
              case 'video':
                return <VideoGuidelines />;
              case 'resume':
                return <ResumeGuidelines />;
              case 'coverLetter':
                return <CoverLetterGuidelines />;
              default:
                return null;
            }
          })()}
        </motion.div>
      )}

      {/* Upload Section */}
      <div
        className={cn(
          'flex items-center justify-center w-full',
          !fileName && 'h-32'
        )}
      >
        <AnimatePresence mode='wait'>
          {!fileName ? (
            <motion.div
              key='upload-button'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className='w-full'
            >
              <Button
                type='button'
                onClick={() => fileInputRef.current?.click()}
                disabled={disabled || isUploading}
                className={cn(
                  'w-full h-full flex flex-col items-center justify-center rounded-xl',
                  'border-2 border-dashed border-gray-200 dark:border-gray-700',
                  'bg-gray-50 dark:bg-gray-800',
                  'hover:bg-gray-100 dark:hover:bg-gray-750',
                  'transition-all duration-300',
                  (disabled || isUploading) && 'opacity-50 cursor-not-allowed'
                )}
              >
                <Upload className='w-6 h-6 text-gray-400 dark:text-gray-500 mb-2' />
                <p className='text-sm font-medium text-gray-700 dark:text-gray-300'>
                  {isUploading
                    ? 'Uploading...'
                    : FILE_TYPE_CONFIG[fileType]?.buttonText ||
                      `Upload your ${fileType}`}
                </p>
                <p className='text-xs text-gray-500 dark:text-gray-400 mt-1'>
                  {FILE_TYPE_CONFIG[fileType]?.fileInfo ||
                    'Supported file formats'}
                </p>
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key='file-info'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className={cn(
                'flex items-center justify-between w-full p-4 rounded-lg',
                'bg-gray-50 dark:bg-gray-700',
                'shadow-sm hover:shadow-md transition-shadow duration-300',
                'hover:shadow-glow'
              )}
            >
              <div className='flex items-center'>
                <File className='w-8 h-8 text-blue-500 dark:text-blue-400 mr-3' />
                <div>
                  <p className='text-sm font-medium text-gray-700 dark:text-gray-200 truncate max-w-[200px]'>
                    {fileName}
                  </p>
                  <p className='text-xs text-gray-500 dark:text-gray-400 mt-1'>
                    {fileType}
                  </p>
                </div>
              </div>
              <div className='flex space-x-2'>
                <Button
                  size='sm'
                  variant='outline'
                  onClick={() => setShowPreview(!showPreview)}
                  type='button'
                  className='text-gray-600 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 hover:shadow-glow'
                >
                  {showPreview ? 'Hide Preview' : 'Show Preview'}
                </Button>
                <Button
                  size='sm'
                  variant='outline'
                  onClick={handleViewFile}
                  type='button'
                  className='text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 hover:shadow-glow'
                >
                  <Eye className='w-4 h-4' />
                </Button>
                {!disabled && (
                  <>
                    <Button
                      type='button'
                      size='sm'
                      variant='default'
                      onClick={handleRemoveFile}
                      className='bg-green-600 hover:bg-green-700 text-white'
                    >
                      Save
                    </Button>
                    <Button
                      type='button'
                      size='sm'
                      variant='outline'
                      onClick={handleRemoveFile}
                      className='text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 hover:shadow-glow'
                    >
                      <X className='w-4 h-4' />
                    </Button>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Add preview section for PDFs and videos */}
      {previewUrl && showPreview && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ delay: 0.2 }}
          className='mt-4'
        >
          {fileType === 'video' && (
            <video
              src={previewUrl}
              controls
              className='w-full rounded-lg shadow-md'
            />
          )}
        </motion.div>
      )}

      <input
        type='file'
        ref={fileInputRef}
        onChange={handleFileChange}
        onClick={(e) => e.stopPropagation()} // Stop event propagation
        className='hidden'
        disabled={disabled}
        accept={getAcceptedFileTypes(fileType)}
      />

      {/* Video Modal */}
      <Dialog open={isVideoModalOpen} onOpenChange={setIsVideoModalOpen}>
        <DialogContent className='sm:max-w-[900px] p-0 bg-black overflow-hidden'>
          {previewUrl && fileType === 'video' && (
            <video
              src={previewUrl}
              controls
              autoPlay
              className='w-full h-full'
              style={{ maxHeight: '80vh' }}
            >
              Your browser does not support the video tag.
            </video>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
