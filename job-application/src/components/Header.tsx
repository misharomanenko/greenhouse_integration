import Link from 'next/link';
import { FaUser, FaMoon, FaSun } from 'react-icons/fa';
import { useState } from 'react';
import { currentUser } from '../types/user';
import { useTheme } from 'next-themes';

const Header = () => {
  const [showUserInfo, setShowUserInfo] = useState(false);
  const { theme, setTheme } = useTheme();

  return (
    <header className="dark:bg-neutral-800 shadow-md fixed top-0 left-0 right-0 z-50 w-full">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-primary-600 dark:text-primary-400">
          JobBoard
        </Link>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="text-neutral-600 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
          >
            {theme === 'dark' ? <FaSun size={20} /> : <FaMoon size={20} />}
          </button>
          <div className="relative">
            <button 
              className="text-neutral-600 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              onClick={() => setShowUserInfo(!showUserInfo)}
            >
              <FaUser size={20} />
            </button>
            {showUserInfo && (
              <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-neutral-700 rounded-md shadow-lg py-2 z-10">
                <div className="px-4 py-2 text-sm text-neutral-700 dark:text-neutral-200 break-words">
                  <p className="font-semibold mb-1">{currentUser.first_name} {currentUser.last_name}</p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-2">{currentUser.email_addresses[0].value}</p>
                  <p className="text-xs">{currentUser.addresses[0].value}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
