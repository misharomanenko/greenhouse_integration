import { Field } from '@/app/components/layout/ApplicationForm';

export const productFields: Field[] = [
  { name: 'name', type: 'input', label: 'Name', required: true },
  { name: 'email', type: 'input', label: 'Email', required: true },
  { name: 'resume', type: 'file', label: 'Resume', required: true },
  { name: 'phone', type: 'input', label: 'Phone', required: false },
  {
    name: 'coverLetter',
    type: 'file',
    label: 'Cover Letter',
    required: false,
  },
  {
    name: 'relevantLinks',
    type: 'input',
    label: 'Relevant Links',
    required: false,
  },
  { name: 'college', type: 'input', label: 'College', required: false }, // Added school field
  {
    name: 'currentCompany',
    type: 'input',
    label: 'What company are you currently working at?',
    required: false,
  },
  {
    name: 'currentRole',
    type: 'input',
    label: 'What is your current role?',
    required: false,
  },
  {
    name: 'idealCompanySize',
    type: 'checkbox',
    label: "What is the ideal size of company you'd like to work at?",
    options: ['500+', '201-500', '101-200', '51-100', '1-50'],
    required: false,
  },
  // ... (make sure to include all the other fields from the original productFields array)
];
