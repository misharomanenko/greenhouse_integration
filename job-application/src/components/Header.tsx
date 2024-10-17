import Link from 'next/link';
import { FaUser } from 'react-icons/fa';

const Header = () => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-gray-800 dark:text-gray-100 -ml-4">
          Company Name
        </Link>
        <button className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100">
          <FaUser size={24} />
        </button>
      </div>
    </header>
  );
};

export default Header;
