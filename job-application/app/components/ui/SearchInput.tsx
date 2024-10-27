import { FaSearch } from 'react-icons/fa';
import { IconBaseProps } from 'react-icons';

type IconProps = IconBaseProps & { className?: string; 'aria-hidden'?: string };

interface SearchInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function SearchInput({ value, onChange }: SearchInputProps) {
  return (
    <div className="max-w-3xl mx-auto mb-12">
      <div className="relative">
        <input
          type="text"
          placeholder="Search jobs..."
          className="w-full p-5 pl-14 rounded-full border-2 border-primary-300 dark:border-primary-700 bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 placeholder-neutral-500 dark:placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 transition duration-300 text-lg"
          value={value}
          onChange={onChange}
        />
        <FaSearch 
          className="absolute left-5 top-1/2 transform -translate-y-1/2 text-current text-xl" 
          aria-hidden="true" 
          {...({} as IconProps)}
        />
      </div>
    </div>
  );
}
