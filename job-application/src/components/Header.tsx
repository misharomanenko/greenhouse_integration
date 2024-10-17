import Link from 'next/link';
import { FaUser } from 'react-icons/fa';
import { useState } from 'react';
import { currentUser } from '../data/user';

const Header = () => {
  const [showUserInfo, setShowUserInfo] = useState(false);

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md fixed top-0 left-0 right-0 z-50 w-full">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-gray-800 dark:text-gray-100">
          Company Name
        </Link>
        <div className="relative">
          <button 
            className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
            onClick={() => setShowUserInfo(!showUserInfo)}
          >
            <FaUser size={24} />
          </button>
          {showUserInfo && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-md shadow-lg py-1 z-10">
              <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200">
                <p><strong>Name:</strong> {currentUser.name}</p>
                <p><strong>Email:</strong> {currentUser.email}</p>
                <p><strong>Country:</strong> {currentUser.country}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
