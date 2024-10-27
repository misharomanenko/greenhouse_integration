'use client';

import { useTheme } from 'next-themes';
import React, { useCallback, useEffect, useState } from 'react';

import { IconMoon, IconSun, IconUser } from '@tabler/icons-react';

import ModernLoader from '@/app/components/shared/Indicators/Loader';
import SettingsInput from '@/app/components/shared/Select/SettingsInput';
import { Button } from '@/app/components/ui/button';
import { Switch } from '@/app/components/ui/switch';
import { currentUser } from '@/app/data/mockUser';

const tabs = [
  { id: 'personal', label: 'Personal', icon: IconUser },
  { id: 'appearance', label: 'Appearance', icon: IconSun },
] as const;

type TabId = (typeof tabs)[number]['id'];

const SettingsPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabId>('personal');
  const [name, setName] = useState(`${currentUser.first_name} ${currentUser.last_name}`);
  const [saving, setSaving] = useState(false);
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setLoading(false);
  }, []);

  const renderPersonalTabContent = () => {
    return (
      <div className="space-y-6">
        <SettingsInput
          id='name'
          label='Full Name'
          value={name}
          helperText='Your full name'
          isEditable={true}
          onChange={setName}
        />
        <SettingsInput
          id='company'
          label='Company'
          value={currentUser.company}
          helperText='Your current company'
          isEditable={true}
          onChange={() => {}}
        />
        <SettingsInput
          id='title'
          label='Title'
          value={currentUser.title}
          helperText='Your current title'
          isEditable={true}
          onChange={() => {}}
        />
        
        {currentUser.phone_numbers.map((phone, index) => (
          <SettingsInput
            key={`phone-${index}`}
            id={`phone-${index}`}
            label={`${phone.type.charAt(0).toUpperCase() + phone.type.slice(1)} Phone`}
            value={phone.value}
            helperText='Your phone number'
            isEditable={true}
            onChange={() => {}}
          />
        ))}

        {currentUser.email_addresses.map((email, index) => (
          <SettingsInput
            key={`email-${index}`}
            id={`email-${index}`}
            label={`${email.type.charAt(0).toUpperCase() + email.type.slice(1)} Email`}
            value={email.value}
            helperText='Your email address'
            isEditable={true}
            onChange={() => {}}
          />
        ))}

        {currentUser.addresses.map((address, index) => (
          <SettingsInput
            key={`address-${index}`}
            id={`address-${index}`}
            label={`${address.type.charAt(0).toUpperCase() + address.type.slice(1)} Address`}
            value={address.value}
            helperText='Your address'
            isEditable={true}
            onChange={() => {}}
          />
        ))}

        {currentUser.website_addresses.map((website, index) => (
          <SettingsInput
            key={`website-${index}`}
            id={`website-${index}`}
            label={`${website.type.charAt(0).toUpperCase() + website.type.slice(1)} Website`}
            value={website.value}
            helperText='Your website'
            isEditable={true}
            onChange={() => {}}
          />
        ))}

        {currentUser.social_media_addresses.map((social, index) => (
          <SettingsInput
            key={`social-${index}`}
            id={`social-${index}`}
            label={`Social Media ${index + 1}`}
            value={social.value}
            helperText='Your social media profile'
            isEditable={true}
            onChange={() => {}}
          />
        ))}
      </div>
    );
  };

  const renderAppearanceTabContent = () => {
    if (!mounted) return null;

    const currentTheme = theme === 'system' ? systemTheme : theme;

    return (
      <div className='space-y-6'>
        <div className='flex items-center justify-between'>
          <div>
            <h3 className='text-lg font-medium'>Theme</h3>
            <p className='text-sm text-gray-500'>Choose your preferred theme</p>
          </div>
          <div className='flex items-center space-x-2'>
            <IconSun className='h-5 w-5 text-gray-500' />
            <Switch
              checked={currentTheme === 'dark'}
              onCheckedChange={(checked) =>
                setTheme(checked ? 'dark' : 'light')
              }
              aria-label='Toggle theme'
            />
            <IconMoon className='h-5 w-5 text-gray-500' />
          </div>
        </div>
      </div>
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'personal':
        return renderPersonalTabContent();
      case 'appearance':
        return renderAppearanceTabContent();
      default:
        return null;
    }
  };
  
  if (loading) return <ModernLoader />;

  return (
    <div className='space-y-8'>
      <div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0'>
        <nav className='flex flex-wrap gap-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg'>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`${
                activeTab === tab.id
                  ? 'bg-white dark:bg-gray-700 text-primary-blue shadow-sm'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              } flex items-center px-4 py-2 rounded-md font-medium text-sm transition-all duration-200 ease-in-out`}
            >
              <tab.icon className='mr-2 h-5 w-5' />
              {tab.label}
            </button>
          ))}
        </nav>

        {activeTab === 'personal' && (
          <Button
            onClick={() => setSaving(true)}
            disabled={saving}
            className='bg-primary-blue hover:bg-primary-blue-dark text-white transition-all duration-200 ease-in-out'
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        )}
      </div>

      <div className='p-6'>{renderTabContent()}</div>
    </div>
  );
};

export default SettingsPage;
