import React, { ReactNode } from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle, ChevronRight, Eye, XCircle } from 'lucide-react';

import { Badge } from '@/app/components/shared/Form/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/shared/Form/select';
import { Button } from '@/app/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/app/components/ui/tooltip';

export enum SectionType {
  Default = 'default',
  Applications = 'applications',
}

export interface Application {
  _id: string;
  type: string;
  status: string;
  onStatusChange: (newStatus: string) => void;
  onView: () => void;
  onAccept?: () => void;
  onReject?: () => void;
}

export interface Section {
  flex: number;
  type: SectionType;
  topTitle?: string;
  bottomTitle?: string | ReactNode;
  applications?: Application[];
  customClass?: string;
}

interface TableViewProps {
  sections: Section[];
  isHeader?: boolean;
}

const TableView: React.FC<TableViewProps> = ({
  sections,
  isHeader = false,
}) => {
  const renderSection = (section: Section) => {
    switch (section.type) {
      case SectionType.Applications:
        return (
          <div className='space-y-3'>
            <AnimatePresence>
              {section.applications?.map((app) => (
                <motion.div
                  key={app._id}
                  className='grid grid-cols-1 sm:grid-cols-3 items-center gap-4 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-custom-light dark:shadow-custom-dark transition-all duration-300 hover:shadow-glow hover:bg-background-accent dark:hover:bg-dark-mode-accent'
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                  <div className='flex items-center justify-center sm:justify-start'>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Badge
                            variant={
                              app.status === 'submitted'
                                ? 'default'
                                : 'secondary'
                            }
                            className={`
                              ${
                                app.status === 'submitted'
                                  ? 'bg-primary-blue dark:bg-light-blue'
                                  : app.status === 'accepted'
                                    ? 'bg-success dark:bg-kp-green'
                                    : app.status === 'rejected'
                                      ? 'bg-error'
                                      : 'bg-warning'
                              } 
                              text-white px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 hover:shadow-md
                            `}
                          >
                            {app.type}
                          </Badge>
                        </TooltipTrigger>
                        <TooltipContent className='bg-dark-blue text-white dark:bg-light-blue dark:text-primary-black'>
                          <p>Application Type: {app.type}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <div className='flex justify-center mt-2 sm:mt-0'>
                    <Select
                      defaultValue={app.status}
                      onValueChange={app.onStatusChange}
                    >
                      <SelectTrigger className='w-full sm:w-40 text-sm bg-transparent dark:text-gray-300 border-line-blue dark:border-line-gray'>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className='bg-white dark:bg-gray-800 border-line-blue dark:border-line-gray'>
                        <SelectItem value='not_started'>Not Started</SelectItem>
                        <SelectItem value='in_progress'>In Progress</SelectItem>
                        <SelectItem value='submitted'>Submitted</SelectItem>
                        <SelectItem value='accepted'>Accepted</SelectItem>
                        <SelectItem value='rejected'>Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className='flex items-center justify-center sm:justify-end gap-2 mt-2 sm:mt-0'>
                    <Button
                      variant='outline'
                      size='sm'
                      onClick={app.onView}
                      className='text-primary-blue dark:text-light-blue hover:bg-primary-blue hover:text-white dark:hover:bg-light-blue dark:hover:text-primary-black transition-all duration-300'
                    >
                      <Eye className='mr-1 h-3 w-3' /> View
                    </Button>
                    {app.status === 'submitted' && (
                      <>
                        <Button
                          variant='default'
                          size='sm'
                          className='bg-success hover:bg-kp-green text-white transition-all duration-300'
                          onClick={app.onAccept}
                        >
                          <CheckCircle className='mr-1 h-3 w-3' /> Accept
                        </Button>
                        <Button
                          variant='default'
                          size='sm'
                          className='bg-error hover:bg-red-600 text-white transition-all duration-300'
                          onClick={app.onReject}
                        >
                          <XCircle className='mr-1 h-3 w-3' /> Reject
                        </Button>
                      </>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        );
      default:
        return (
          <div className='flex items-center space-x-2'>
            {isHeader ? (
              <p className='font-mono text-xs uppercase text-dark-gray dark:text-mid-gray font-semibold'>
                {section.topTitle}
              </p>
            ) : (
              <div
                className={`font-medium text-sm ${section.customClass || 'text-primary dark:text-dark-mode-text'}`}
              >
                {section.bottomTitle}
              </div>
            )}
          </div>
        );
    }
  };

  return (
    <motion.div
      className={`w-full ${
        isHeader
          ? 'bg-secondary-background dark:bg-dark-mode-background sticky top-0 z-10'
          : 'transition-colors duration-300'
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div
        className={`flex flex-col sm:flex-row items-start sm:items-center px-4 sm:px-6 py-4 ${
          isHeader
            ? 'rounded-t-xl'
            : 'border-b border-line-gray dark:border-line-blue hover:bg-background-accent dark:hover:bg-dark-mode-accent transition-all duration-300'
        }`}
      >
        {sections.map((section, index) => (
          <div
            key={index}
            className='w-full sm:w-auto mb-2 sm:mb-0'
            style={{ flex: section.flex }}
          >
            {renderSection(section)}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default React.memo(TableView);
