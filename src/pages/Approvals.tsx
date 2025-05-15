
import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Users, CheckCircle, XCircle } from 'lucide-react';
import { mockApi, Approval } from '../services/mockApi';
import { useToast } from '../hooks/use-toast';

const Approvals: React.FC = () => {
  const [approvals, setApprovals] = useState<Approval[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'events' | 'vendors'>('events');
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchApprovals = async () => {
      setIsLoading(true);
      try {
        const data = await mockApi.getApprovals();
        setApprovals(data);
      } catch (error) {
        console.error('Error fetching approvals:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchApprovals();
  }, []);

  const filteredApprovals = approvals.filter(
    approval => approval.type === (activeTab === 'events' ? 'event' : 'vendor')
  );

  const handleApprove = (id: string) => {
    // Simulate approval
    toast({
      title: "Approved",
      description: "The item has been approved successfully.",
    });
  };

  const handleReject = (id: string) => {
    // Simulate rejection
    toast({
      title: "Rejected",
      description: "The item has been rejected.",
      variant: "destructive",
    });
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">Approvals</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Review and manage pending approval requests
        </p>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow mb-6">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('events')}
              className={`px-4 py-4 text-sm font-medium ${
                activeTab === 'events'
                  ? 'border-b-2 border-gold text-gold'
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              Events
            </button>
            <button
              onClick={() => setActiveTab('vendors')}
              className={`px-4 py-4 text-sm font-medium ${
                activeTab === 'vendors'
                  ? 'border-b-2 border-gold text-gold'
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              Vendors
            </button>
          </nav>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-10 h-10 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : filteredApprovals.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <CheckCircle size={48} className="text-gray-300 dark:text-gray-600 mb-3" />
            <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">No pending approvals</h3>
            <p className="text-gray-500 dark:text-gray-400">All items have been reviewed</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredApprovals.map((approval) => (
              <div key={approval.id} className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-lg font-medium text-gray-900 dark:text-white">{approval.name}</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Created on {approval.createdOn}</p>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100">
                    {approval.status === 'draft' ? 'Draft' : 'Pending'}
                  </span>
                </div>
                
                <p className="mb-4 text-gray-600 dark:text-gray-300">{approval.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Calendar size={16} className="mr-2" />
                    <span>{approval.date}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <MapPin size={16} className="mr-2" />
                    <span>{approval.location}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Users size={16} className="mr-2" />
                    <span>Max Guests: {approval.maxGuests}</span>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row items-center justify-between">
                  <div className="mb-3 sm:mb-0 w-full sm:w-auto">
                    <textarea
                      placeholder="Add any notes about this approval decision"
                      className="w-full sm:w-80 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-gold focus:border-gold bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      rows={2}
                    />
                  </div>
                  
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleReject(approval.id)}
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      <XCircle size={16} className="mr-2" />
                      Reject
                    </button>
                    
                    <button
                      onClick={() => handleApprove(approval.id)}
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gold hover:bg-gold-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold"
                    >
                      <CheckCircle size={16} className="mr-2" />
                      Approve
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Approvals;
