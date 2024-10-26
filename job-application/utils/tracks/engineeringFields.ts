import { Field } from '@/app/components/layout/ApplicationForm';
import { colleges } from '@/utils/misc/colleges';
import { graduationYears } from '@/utils/misc/gradYears';

export const engineeringFieldOptions = [
  'Software Engineering',
  'Data Science',
  'AI/ML',
];

export const engineeringFields: Field[] = [
  { name: 'name', type: 'input', label: 'Name', required: true },
  { name: 'email', type: 'input', label: 'Email', required: true },
  { name: 'phone', type: 'input', label: 'Phone', required: false },
  {
    name: 'linkedin',
    type: 'input',
    label: 'LinkedIn Profile',
    required: false,
  },
  { name: 'github', type: 'input', label: 'GitHub Profile', required: false },
  {
    name: 'relevantLinks',
    type: 'input',
    label:
      "(Optional) Feel free to submit an additional link to content you've created that is representative of who you are and what you care about. This can be your portfolio, X Handle, Youtube Channel, etc.",
    required: false,
  },
  {
    name: 'college',
    type: 'select',
    label: 'College',
    options: colleges,
    required: false,
  },
  {
    name: 'major',
    type: 'input',
    label: 'What is your major?',
    required: false,
  },
  {
    name: 'graduationDate',
    type: 'select',
    label: 'Expected graduation date',
    options: graduationYears,
    required: false,
  },
  {
    name: 'impactStatement',
    type: 'textarea',
    label:
      'What impact do you want to have on the world and why? Please limit your statement to 250 words maximum.',
    required: false,
  },
  {
    name: 'meaningfulExperience',
    type: 'textarea',
    label:
      'Describe your most meaningful experience(s) and why they matter to you. Please limit your statement to 250 words maximum.',
    required: false,
  },
  {
    name: 'resume',
    type: 'file',
    label: 'Resume',
    required: false,
  },
  {
    name: 'video',
    type: 'file',
    label: 'Video Introduction',
    required: false,
  },
];
