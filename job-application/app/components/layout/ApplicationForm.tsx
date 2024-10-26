import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FieldError, FormProvider, useForm } from 'react-hook-form';

import { message } from 'antd';
import { formatDistanceToNow } from 'date-fns';
import { motion } from 'framer-motion';
import { Variants } from 'framer-motion';
import { debounce, get, isEmpty, isNil, omit } from 'lodash';
import { Loader2, Save, Send } from 'lucide-react';
import axios from 'axios';

import { FormField } from '@/app/components/layout/FormFields';
import ModernLoader from '@/app/components/shared/Indicators/Loader';
import { Button } from '@/app/components/ui/button';
import { useFieldValidation } from '@/app/hooks/misc/useFieldValidation';
import { currentUser } from '@/app/data/mockUser';
import { useParams } from 'next/navigation';
import { useApplicationSubmission } from '@/app/hooks/core/useApplicationApi';

// Types
export interface Field {
  name: string;
  type: 'input' | 'checkbox' | 'radio' | 'select' | 'textarea' | 'file';
  label: string;
  options?: string[] | { value: string; label: string }[];
  required: boolean;
  validation?: {
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    custom?: (value: any) => boolean | string;
  };
}

interface ApplicationFormProps {
  applicationType: 'Design' | 'Engineering' | 'Product' | 'job';
  applicationId?: string;
  fields: Field[];
  readOnly?: boolean;
  initialValues?: any;
  onSubmit?: (data: any) => Promise<void>;
  onSave?: (data: any) => Promise<void>;
}

// Types and animations defined outside component
const staggerChildren: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const fadeInUp: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const ApplicationForm: React.FC<ApplicationFormProps> = ({
  applicationType,
  applicationId,
  fields,
  readOnly = false,
  initialValues,
  onSubmit,
  onSave
}) => {
  // Move useParams inside the component
  const params = useParams();
  const jobId = params.id;
  
  // Use useApplicationSubmission instead
  const { submitApplication } = useApplicationSubmission();

  const methods = useForm({
    defaultValues: initialValues,
    mode: 'onChange',
  });
  
  const {
    handleSubmit,
    reset,
    setValue,
    watch,
    trigger,
    formState: { errors, isDirty },
  } = methods;
  
  const { validateField, fieldErrors } = useFieldValidation(fields);

  const [applicationState, setApplicationState] = useState({
    isLoading: false,
    isSubmitting: false,
    isConfirmDialogOpen: false,
    confirmName: '',
    lastSaved: null as Date | null,
    isEditable: true,
  });

  const [showSubmitModal, setShowSubmitModal] = useState(false);


  const handleFieldChange = useCallback(
    (fieldName: string, value: any) => {
      setValue(fieldName, value);
      validateField(fieldName, value);
    },
    [setValue, validateField]
  );

  const handleSave = useCallback(
    async (data: any) => {
      try {
        // Don't do anything since FileUpload handles the save
        return;
      } catch (error) {
        console.error('Error saving application:', error);
      }
    },
    []
  );

  const handleFileChange = useCallback(
    (fieldName: string, file: File | null, fileKey: string | null) => {
      setValue(fieldName, fileKey);
      validateField(fieldName, fileKey);

      if (!isNil(file) && !isNil(fileKey)) {
        handleSave({ [fieldName]: fileKey });
      }
    },
    [setValue, validateField, handleSave]
  );

  const formattedFields = useMemo(
    () =>
      fields?.map((field, index) => ({
        ...field,
        id: `${field.name}-${index}`,
        value: methods.watch(field.name),
        onChange:
          field.type === 'file'
            ? (file: File | null, fileKey: string | null) =>
                handleFileChange(field.name, file, fileKey)
            : (value: any) => handleFieldChange(field.name, value),
        onSave: field.type === 'file' ? () => handleSave({ [field.name]: methods.watch(field.name) }) : undefined,
      })),
    [fields, methods.watch, handleFieldChange, handleFileChange, handleSave]
  );

  const handleSubmitForm = useCallback(
    async (data: any) => {
      try {
        setApplicationState((prev) => ({ ...prev, isSubmitting: true }));
        
        // Use the submitApplication function from the hook
        const response = await submitApplication(jobId as string, {
          first_name: data.first_name,
          last_name: data.last_name,
          email_value: data.email_value,
          phone_value: data.phone_value,
          resume: data.resume,
          website_value: data.website_value,
          website_addresses: data.website_addresses,
          phone_numbers: data.phone_numbers,
          email_addresses: data.email_addresses,
          address_value: data.address_value,
          addresses: data.addresses,
          social_media: data.social_media
        });

        if (response) {
          message.success('Application submitted successfully');
          await onSubmit?.(data);
        } else {
          throw new Error('Failed to submit application');
        }
      } catch (error) {
        console.error('Error submitting application:', error);
        message.error(error instanceof Error ? error.message : 'Failed to submit application');
      } finally {
        setApplicationState((prev) => ({ ...prev, isSubmitting: false }));
      }
    },
    [jobId, onSubmit, submitApplication]
  );

  const handleConfirmSubmit = useCallback(() => {
    handleSubmit(handleSubmitForm)();
  }, [handleSubmit, handleSubmitForm]);

  const getErrorMessage = (
    error: FieldError | undefined
  ): string | undefined => {
    if (typeof error === 'string') return error;
    return get(error, 'message');
  };

  if (applicationState.isLoading)
    return (
      <div className='flex justify-center items-center h-screen'>
        <ModernLoader />
      </div>
    );

  return (
    <FormProvider {...methods}>
      <form onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(handleSubmitForm)(e);
      }} className='space-y-6'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='mx-auto bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl mb-16 sm:mb-24'
        >
          <motion.div
            variants={staggerChildren}
            initial='initial'
            animate='animate'
            className='space-y-3 sm:space-y-4'
          >
            {formattedFields.map((field) => (
              <motion.div key={field.id} variants={fadeInUp}>
                <FormField
                  field={field}
                  disabled={!applicationState.isEditable || readOnly}
                  applicationId={applicationId}
                  error={getErrorMessage(errors[field.name] as FieldError)}
                />
              </motion.div>
            ))}
          </motion.div>

          {!readOnly && (
            <div className='flex flex-col sm:flex-row justify-between items-center mt-6 sm:mt-8 space-y-4 sm:space-y-0 sm:space-x-4'>
              <div className='flex items-center space-x-4'>
                <Button
                  type='button'
                  onClick={(e) => {
                    e.preventDefault();
                    handleSave(methods.getValues());
                  }}
                  disabled={applicationState.isSubmitting || !isDirty}
                  className='w-full sm:w-auto px-6 py-2.5 bg-primary-blue text-white rounded-full hover:bg-light-blue transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center space-x-2'
                >
                  <Save size={18} />
                  <span>Save Draft</span>
                </Button>
                {applicationState.lastSaved && (
                  <span className='text-sm text-gray-500'>
                    Last saved {formatDistanceToNow(applicationState.lastSaved)}{' '}
                    ago
                  </span>
                )}
              </div>
              <Button
                type='button'
                onClick={handleConfirmSubmit}
                disabled={applicationState.isSubmitting || !isEmpty(errors)}
                className='w-full sm:w-auto px-6 py-2.5 bg-primary-blue text-white rounded-full hover:bg-light-blue transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center space-x-2'
              >
                {applicationState.isSubmitting ? (
                  <>
                    <span className='animate-spin mr-2'>
                      <Loader2 size={18} />
                    </span>
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    <span>Submit Application</span>
                  </>
                )}
              </Button>
            </div>
          )}
        </motion.div>
      </form>
    </FormProvider>
  );
};

export default ApplicationForm;
