import { Field } from '@/app/components/layout/ApplicationForm';

import { designFields } from './designFields';
import { engineeringFields } from './engineeringFields';
import { productFields } from './productFields';
import { jobFields } from './jobFields'; // Create this new file

export const getFieldsForApplicationType = (type: string): Field[] => {
  switch (type) {
    case 'Design':
      return designFields;
    case 'Engineering':
      return engineeringFields;
    case 'Product':
      return productFields;
    case 'job':
      return jobFields;
    default:
      console.warn(`Unknown application type: ${type}`);
      return [];
  }
};
