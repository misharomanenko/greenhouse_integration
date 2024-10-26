import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { motion } from 'framer-motion';
import { Settings, Home } from 'lucide-react';
import ParaformIcon from '@/public/paraform';

const NavBar: React.FC = () => {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === path;
    }
    return pathname?.startsWith(path);
  };

  return (
    <motion.nav
      className="fixed left-0 top-0 z-30 flex h-full w-[4.5rem] flex-col bg-white dark:bg-gray-900 rounded-lg shadow-md backdrop-blur-xl bg-opacity-95 dark:bg-opacity-95 border-r border-gray-100 dark:border-gray-800"
    >
      <motion.div className='mb-8 flex justify-center px-4 py-6'>
        <Link
          href={`/`}
          className='flex cursor-pointer justify-center'
          prefetch={true}
        >
          <motion.div
            whileHover={{ scale: 1.05, rotate: 5 }}
            whileTap={{ scale: 0.95, rotate: -5 }}
            transition={{ duration: 0.2 }}
          >
            <ParaformIcon className="w-8 h-8" />
          </motion.div>
        </Link>
      </motion.div>

      <div className="flex flex-col items-center space-y-4">
        <Link href="/" className="flex cursor-pointer justify-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`p-2 rounded-lg ${
              isActive('/')
                ? 'bg-gray-100 dark:bg-gray-800 text-primary-blue dark:text-primary-blue'
                : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400'
            }`}
          >
            <Home className="w-6 h-6" />
          </motion.div>
        </Link>

        <Link href="/settings" className="flex cursor-pointer justify-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`p-2 rounded-lg ${
              isActive('/settings')
                ? 'bg-gray-100 dark:bg-gray-800 text-primary-blue dark:text-primary-blue'
                : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400'
            }`}
          >
            <Settings className="w-6 h-6" />
          </motion.div>
        </Link>
      </div>

      <div className="mt-auto mb-6 flex justify-center">
        {/* Removed the settings link from here since it's now in the navigation section */}
      </div>
    </motion.nav>
  );
};

export default React.memo(NavBar);
