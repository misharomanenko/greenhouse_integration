import { Field } from '@/app/components/layout/ApplicationForm';

export const jobFields: Field[] = [
  // Personal Information
  { name: 'first_name', type: 'input', label: 'First Name', required: true },
  { name: 'last_name', type: 'input', label: 'Last Name', required: true },
  // ... rest of the fields from applicationFields array ...
];
