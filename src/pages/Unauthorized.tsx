
import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert } from 'lucide-react';

const Unauthorized: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="text-center">
        <div className="bg-red-100 dark:bg-red-900/20 rounded-full p-3 inline-block mb-6">
          <ShieldAlert size={40} className="text-red-600 dark:text-red-500" />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Access Denied</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          You don't have permission to access this page.
        </p>
        
        <Link 
          to="/" 
          className="px-4 py-2 bg-gold hover:bg-gold-dark text-white rounded-md transition-colors"
        >
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;
