
import React from 'react';
import Navbar from '@/components/navbar';
import Footer from '@/components/layout/Footer';
import WordPressConnectivityTest from '@/components/wordpress/WordPressConnectivityTest';

const WordPressTest = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar transparent={false} />
      
      <main className="flex-grow py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <h1 className="text-3xl font-bold mb-8 font-playfair text-center">WordPress Integration Test</h1>
          <p className="text-gray-400 text-center max-w-2xl mx-auto mb-12">
            This page helps you verify if your React application can connect to a WordPress site's REST API.
            By default, it connects to a demo WordPress API, but you can change the URL to test your own WordPress site.
          </p>
          
          <WordPressConnectivityTest />
          
          <div className="mt-12 text-center">
            <p className="text-sm text-gray-500">
              To test with your own WordPress site, make sure:
            </p>
            <ul className="text-sm text-gray-500 mt-2 list-disc list-inside">
              <li>Your WordPress site has REST API enabled</li>
              <li>CORS is properly configured to allow requests from your domain</li>
              <li>If your API endpoints require authentication, you'll need to implement authentication in a real integration</li>
            </ul>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default WordPressTest;
