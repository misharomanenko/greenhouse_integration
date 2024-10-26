import { Field } from '@/app/components/layout/ApplicationForm';
import { colleges } from '@/utils/misc/colleges';

export const designFields: Field[] = [
  { name: 'name', type: 'input', label: 'Name', required: true },
  { name: 'email', type: 'input', label: 'Email', required: true },
  { name: 'phone', type: 'input', label: 'Phone', required: false },
  {
    name: 'linkedin',
    type: 'input',
    label: 'LinkedIn Profile',
    required: false,
  },
  {
    name: 'relevantLinks',
    type: 'input',
    label: 'Relevant Links',
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
    type: 'input',
    label: 'Expected graduation date',
    required: false,
  },
  {
    name: 'projectExperience',
    type: 'textarea',
    label: 'Describe a significant design project you have worked on',
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
    name: 'additionalContent',
    type: 'input',
    label:
      "[Optional] Feel free to submit an additional link to content you've created that is representative of who you are and what you care about. This can be your Twitter handle, portfolio, Youtube Channel, etc.",
    required: false,
  },
  {
    name: 'resume',
    type: 'file',
    label: 'Resume',
    required: false,
  },
  {
    name: 'coverLetter',
    type: 'file',
    label: 'Cover Letter',
    required: false,
  },
];
