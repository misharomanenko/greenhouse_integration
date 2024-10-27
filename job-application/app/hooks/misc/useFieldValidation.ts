import { useCallback, useState } from 'react';

import { Field } from '@/app/components/layout/ApplicationForm';

export const useFieldValidation = (fields: Field[]) => {
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const validateField = useCallback(
    (fieldName: string, value: any) => {
      let error = '';
      const field = fields.find((f) => f.name === fieldName);

      if (field) {
        if (field.required && !value) {
          error = `${field.label} is required`;
        }
        // Add more field-specific validations here
      }

      setFieldErrors((prev) => ({ ...prev, [fieldName]: error }));
    },
    [fields]
  );

  return { validateField, fieldErrors };
};
