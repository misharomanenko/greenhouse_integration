'use client';

import { useParams, useRouter } from 'next/navigation';
import React from 'react';

import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { FaBriefcase, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

import { jobListings } from '@/app/data/jobListings';
import { Button } from '@/app/components/ui/button';
import { Field } from '@/app/components/layout/FormFields';
import ApplicationForm from '@/app/components/layout/ApplicationForm';
import { currentUser } from '@/app/data/mockUser';
import { useApplicationSubmission } from '@/app/hooks/core/useApplicationApi';
import { message } from 'antd';

const SETTINGS_MESSAGE = {
  title: "Profile Information",
  description: "These fields are managed in your profile settings. Click below to edit.",
};

const applicationFields: Field[] = [
  // Personal Information
  { name: 'first_name', type: 'input', label: 'First Name', required: true, readOnly: true },
  { name: 'last_name', type: 'input', label: 'Last Name', required: true, readOnly: true },
  { name: 'company', type: 'input', label: 'Current Company', required: false, readOnly: true },
  { name: 'title', type: 'input', label: 'Current Title', required: false, readOnly: true },
  
  // Contact Information
  {
    name: 'phone_numbers',
    type: 'select',
    label: 'Phone Type',
    required: true,
    options: ['mobile', 'home', 'work'],
    readOnly: true
  },
  { name: 'phone_value', type: 'input', label: 'Phone Number', required: true, readOnly: true },
  
  {
    name: 'email_addresses',
    type: 'select',
    label: 'Email Type',
    required: true,
    options: ['personal', 'work'],
    readOnly: true
  },
  { name: 'email_value', type: 'input', label: 'Email Address', required: true, readOnly: true },
  
  // Addresses
  {
    name: 'addresses',
    type: 'select',
    label: 'Address Type',
    required: false,
    options: ['home', 'work'],
    readOnly: true
  },
  { name: 'address_value', type: 'input', label: 'Address', required: false, readOnly: true },
  
  // Websites & Social Media
  {
    name: 'website_addresses',
    type: 'select',
    label: 'Website Type',
    required: false,
    options: ['personal', 'company', 'portfolio'],
    readOnly: true
  },
  { name: 'website_value', type: 'input', label: 'Website URL', required: false, readOnly: true },
  
  { name: 'social_media', type: 'input', label: 'Social Media Profiles', required: false, readOnly: true },
  { name: 'resume', type: 'file', label: 'Resume', required: true },
];

export default function JobPage() {
  const params = useParams();
  const router = useRouter();
  const jobId = params.id as string;
  
  const job = jobListings.find(j => j.id === jobId);

  if (!job) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Job not found</h1>
        <Button onClick={() => router.push('/')}>Back to Jobs</Button>
      </div>
    );
  }

  // Transform the mock user data into the format expected by the form
  const initialValues = {
    first_name: currentUser.first_name,
    last_name: currentUser.last_name,
    company: currentUser.company,
    title: currentUser.title,
    is_private: currentUser.is_private,
    
    // Get primary phone number if exists
    phone_numbers: currentUser.phone_numbers[0]?.type || 'mobile',
    phone_value: currentUser.phone_numbers[0]?.value || '',
    
    // Get primary email if exists
    email_addresses: currentUser.email_addresses[0]?.type || 'personal',
    email_value: currentUser.email_addresses[0]?.value || '',
    
    // Get primary address if exists
    addresses: currentUser.addresses[0]?.type || 'home',
    address_value: currentUser.addresses[0]?.value || '',
    
    // Get primary website if exists
    website_addresses: currentUser.website_addresses[0]?.type || 'personal',
    website_value: currentUser.website_addresses[0]?.value || '',
    
    // Join social media profiles with commas
    social_media: currentUser.social_media_addresses
      .map(sm => sm.value)
      .join(', '),
    
    // Get most recent employment if exists
    employment_company: currentUser.employments[0]?.company_name || '',
    employment_title: currentUser.employments[0]?.title || '',
    employment_start_date: currentUser.employments[0]?.start_date || '',
    employment_end_date: currentUser.employments[0]?.end_date || '',
    
    // Initialize other fields as empty
    education: '',
    school: '',
    discipline: '',
    education_start_date: '',
    education_end_date: '',
    tags: currentUser.tags.join(', '),
    resume: null,
    cover_letter: null
  };

  const { submitApplication, saveApplication } = useApplicationSubmission();

  const handleSubmit = async (data: any) => {
    const resumeFile = data.resume;
    await submitApplication(jobId, [{
      type: 'resume',
      file: resumeFile.file,
      content: resumeFile.content
    }]);
  };

  // Remove or modify handleSave since we're handling save in FileUpload
  const handleSave = async (data: any) => {
    // Don't do anything since FileUpload handles the save
    return;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Button
        variant="ghost"
        className="mb-6"
        onClick={() => router.push('/')}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Jobs
      </Button>

      <div>
        <h1 className="text-3xl font-bold">{job.title}</h1>
        <p className="text-xl text-muted-foreground">{job.company}</p>
        
        <div className="space-y-4 mt-6">
          <div className="flex items-center text-gray-600 dark:text-gray-300">
            <FaBriefcase className="mr-3 text-gray-400" size={16} />
            <span>{job.company}</span>
          </div>
          <div className="flex items-center text-gray-600 dark:text-gray-300">
            <FaMapMarkerAlt className="mr-3 text-gray-400" size={16} />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center">
            <FaClock className="mr-3 text-gray-400" size={16} />
            <span className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm px-4 py-2 rounded-full">
              {job.type}
            </span>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Description</h3>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            {job.description}
          </p>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Application Form</h3>
        
        {/* Add this settings message */}
        <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <h4 className="text-lg font-medium text-gray-900 dark:text-gray-100">
            {SETTINGS_MESSAGE.title}
          </h4>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {SETTINGS_MESSAGE.description}
          </p>
          <Button
            variant="link"
            className="mt-2 text-primary-blue hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 p-0"
            onClick={() => router.push('/settings')}
          >
            Go to Settings
          </Button>
        </div>

        <ApplicationForm
          applicationType="job"
          fields={applicationFields}
          initialValues={initialValues}
          onSubmit={handleSubmit}
          onSave={handleSave}
        />
      </div>
    </motion.div>
  );
}
