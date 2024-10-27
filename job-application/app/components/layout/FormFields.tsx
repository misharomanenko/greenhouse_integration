import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

import { Checkbox } from '@/app/components/shared/Form/checkbox';
import { Input } from '@/app/components/shared/Form/input';
import { Label } from '@/app/components/shared/Form/label';
import {
  RadioGroup,
  RadioGroupItemWithLabel,
} from '@/app/components/shared/Form/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/shared/Form/select';
import { Textarea } from '@/app/components/shared/Form/textarea';

import { FileUpload } from '../shared/Form/file-upload';

export interface Field {
  name: string;
  type: 'input' | 'checkbox' | 'radio' | 'select' | 'textarea' | 'file';
  label: string;
  options?: string[] | { value: string; label: string }[];
  icon?: LucideIcon;
  required: boolean;
  readOnly?: boolean;  // Add this line
  validation?: {
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    custom?: (value: any) => boolean | string;
  };
}

interface FormFieldProps {
  field: Field & {
    id: string;
    value: any;
    onChange:
      | ((value: any) => void)
      | ((file: File | null, fileKey: string | null) => void);
  };
  disabled?: boolean;
  error?: string;
  applicationId?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  field,
  disabled,
  error,
  applicationId,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const commonLabelClass =
    'text-sm font-medium text-gray-700 mb-2 block dark:text-gray-300';
  const commonInputClass =
    'w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 bg-white dark:bg-gray-800';

  const inputVariants = {
    initial: { scale: 0.95, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.95, opacity: 0 },
    transition: { type: 'spring', stiffness: 300, damping: 30 },
  };

  const renderError = (error: string) => (
    <motion.p
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className='mt-1 text-sm text-red-600 dark:text-red-400'
    >
      {error}
    </motion.p>
  );

  const renderLabel = () => {
    return (
      <Label htmlFor={field.name} className={commonLabelClass}>
        {field.label}{' '}
        {field.required && <span className='text-red-500'>*</span>}
      </Label>
    );
  };

  const isFieldDisabled = disabled || field.readOnly;

  const renderField = () => {
    switch (field.type) {
      case 'input':
        return (
          <>
            {renderLabel()}
            <Controller
              name={field.name}
              control={control}
              rules={{ required: field.required }}
              render={({ field: { onChange: fieldOnChange, ...rest } }) => (
                <Input
                  {...rest}
                  onChange={(e) => {
                    fieldOnChange(e);
                    // Check if onChange is a function that takes a single value
                    if (
                      typeof field.onChange === 'function' &&
                      field.onChange.length === 1
                    ) {
                      (field.onChange as (value: any) => void)(e.target.value);
                    }
                  }}
                  className={commonInputClass}
                  disabled={isFieldDisabled}
                />
              )}
            />
          </>
        );
      case 'checkbox':
        return (
          <motion.div
            variants={inputVariants}
            initial='initial'
            animate='animate'
            exit='exit'
          >
            {renderLabel()}
            <div className='mt-2 grid grid-cols-2 gap-3'>
              {field.options?.map((option) => {
                const optionValue =
                  typeof option === 'string' ? option : option.value;
                const optionLabel =
                  typeof option === 'string' ? option : option.label;
                return (
                  <motion.label
                    key={optionValue}
                    className='flex items-center space-x-3 bg-white dark:bg-gray-800 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 border border-gray-200 dark:border-gray-600 cursor-pointer'
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Controller
                      name={field.name}
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Checkbox
                          checked={value}
                          onCheckedChange={onChange}
                          value={optionValue}
                          className='text-blue-600 focus:ring-blue-500'
                          disabled={isFieldDisabled}
                        />
                      )}
                    />
                    <span className='text-sm text-gray-700 dark:text-gray-300'>
                      {optionLabel}
                    </span>
                  </motion.label>
                );
              })}
            </div>
          </motion.div>
        );
      case 'radio':
        return (
          <motion.div
            variants={inputVariants}
            initial='initial'
            animate='animate'
            exit='exit'
          >
            {renderLabel()}
            <Controller
              name={field.name}
              control={control}
              render={({ field: { onChange, value } }) => (
                <RadioGroup
                  onValueChange={onChange}
                  value={value}
                  className='mt-2 space-y-2'
                  disabled={isFieldDisabled}
                >
                  {field.options?.map((option) => {
                    const optionValue =
                      typeof option === 'string' ? option : option.value;
                    const optionLabel =
                      typeof option === 'string' ? option : option.label;
                    return (
                      <RadioGroupItemWithLabel
                        key={optionValue}
                        value={optionValue}
                        label={optionLabel}
                        disabled={isFieldDisabled}
                      />
                    );
                  })}
                </RadioGroup>
              )}
            />
          </motion.div>
        );
      case 'textarea':
        return (
          <motion.div
            variants={inputVariants}
            initial='initial'
            animate='animate'
            exit='exit'
          >
            {renderLabel()}
            <Controller
              name={field.name}
              control={control}
              render={({ field: { onChange, value } }) => (
                <Textarea
                  value={value}
                  onChange={onChange}
                  className={`${commonInputClass} min-h-[250px] resize-y`}
                  placeholder={`Describe your ${field.label.toLowerCase()}`}
                  disabled={isFieldDisabled}
                  maxWords={250}
                />
              )}
            />
          </motion.div>
        );
      case 'select':
        return (
          <motion.div
            variants={inputVariants}
            initial='initial'
            animate='animate'
            exit='exit'
          >
            {renderLabel()}
            <Controller
              name={field.name}
              control={control}
              render={({ field: { onChange, value } }) => (
                <Select
                  onValueChange={onChange}
                  value={value}
                  disabled={isFieldDisabled}
                >
                  <SelectTrigger
                    className={`${commonInputClass} flex justify-between items-center group`}
                  >
                    <SelectValue
                      placeholder={`Select ${field.label.toLowerCase()}`}
                    />
                    <motion.span
                      className='text-gray-400 group-hover:text-blue-500 transition-colors duration-200'
                      whileHover={{ rotate: 180 }}
                    ></motion.span>
                  </SelectTrigger>
                  <SelectContent className='bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-md shadow-lg'>
                    {field.options?.map((option) => {
                      const optionValue =
                        typeof option === 'string' ? option : option.value;
                      const optionLabel =
                        typeof option === 'string' ? option : option.label;
                      return (
                        <SelectItem
                          key={optionValue}
                          value={optionValue}
                          className='py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200'
                        >
                          {optionLabel}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              )}
            />
          </motion.div>
        );
      case 'file':
        return (
          <div className='space-y-2'>
            {renderLabel()}
            <FileUpload
              onChange={(fileData) => field.onChange(fileData.file, field.name)}
              value={field.value}
              disabled={isFieldDisabled}
              fileType={field.name === 'resume' ? 'resume' : 'coverLetter'} 
              label={field.label}
              showLabel={false}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      variants={inputVariants}
      initial='initial'
      animate='animate'
      exit='exit'
    >
      {renderField()}
      {errors[field.name] && renderError(errors[field.name]?.message as string)}
    </motion.div>
  );
};
