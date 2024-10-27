import React from 'react';

import { Checkbox } from '@/app/components/shared/Form/checkbox';
import { Label } from '@/app/components/shared/Form/label';
import { engineeringFieldOptions } from '@/utils/tracks/engineeringFields';

interface AdvancedFiltersProps {
  filters: {
    engineeringFields: string[];
    hasResume: boolean;
    hasCoverLetter: boolean;
    hasGithub: boolean;
    graduationDateStart: string;
    graduationDateEnd: string;
  };
  onChange: (key: string, value: any) => void;
}

const AdvancedFilters: React.FC<AdvancedFiltersProps> = ({
  filters,
  onChange,
}) => {
  return (
    <div className='space-y-4'>
      <div>
        <Label>Engineering Fields</Label>
        <div className='grid grid-cols-2 gap-2'>
          {engineeringFieldOptions.map((field) => (
            <div key={field} className='flex items-center space-x-2'>
              <Checkbox
                id={field}
                checked={filters.engineeringFields.includes(field)}
                onCheckedChange={(checked) => {
                  const updatedFields = checked
                    ? [...filters.engineeringFields, field]
                    : filters.engineeringFields.filter((f) => f !== field);
                  onChange('engineeringFields', updatedFields);
                }}
              />
              <Label htmlFor={field}>{field}</Label>
            </div>
          ))}
        </div>
      </div>
      <div className='flex items-center space-x-2'>
        <Checkbox
          id='hasResume'
          checked={filters.hasResume}
          onCheckedChange={(checked) => onChange('hasResume', checked)}
        />
        <Label htmlFor='hasResume'>Has Resume</Label>
      </div>
      <div className='flex items-center space-x-2'>
        <Checkbox
          id='hasCoverLetter'
          checked={filters.hasCoverLetter}
          onCheckedChange={(checked) => onChange('hasCoverLetter', checked)}
        />
        <Label htmlFor='hasCoverLetter'>Has Cover Letter</Label>
      </div>
      <div className='flex items-center space-x-2'>
        <Checkbox
          id='hasGithub'
          checked={filters.hasGithub}
          onCheckedChange={(checked) => onChange('hasGithub', checked)}
        />
        <Label htmlFor='hasGithub'>Has GitHub</Label>
      </div>
    </div>
  );
};

export default AdvancedFilters;
