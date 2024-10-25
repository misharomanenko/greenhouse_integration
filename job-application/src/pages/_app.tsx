import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Header from "@/components/Header";
import Layout from "@/components/Layout";
import { useEffect } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    fetch('/api/greenhouse-api/get-job-listing')
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error fetching job details:', error));
  }, []);

  return (
    <Layout>
      <Header />
      <div className="pt-16">
        <Component {...pageProps} />
      </div>
    </Layout>
  );
}
