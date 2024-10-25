import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Header from "app/components/Header";
import Layout from "app/layout";
import { useEffect } from 'react';
import { ThemeProvider } from 'next-themes';

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    fetch('/api/greenhouse-api/get-job-listing')
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error fetching job details:', error));
  }, []);

  return (
    <ThemeProvider attribute="class">
      <Layout>
        <Header />
        <div className="pt-10">
          <Component {...pageProps} />
        </div>
      </Layout>
    </ThemeProvider>
  );
}

