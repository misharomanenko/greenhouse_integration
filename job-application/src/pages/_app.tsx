import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Header from "@/components/Header";
import { useEffect } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    fetch('/api/greenhouse')
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error fetching job details:', error));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 dark:from-neutral-900 dark:to-neutral-800">
      <Header />
      <div className="pt-16"> {/* Add padding-top to account for fixed header */}
        <Component {...pageProps} />
      </div>
    </div>
  );
}
