import React, { useState, useRef } from 'react';
import { Upload, AlertCircle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '../hooks/use-toast';

interface GuestCsvImporterProps {
  eventId: string;
  onImportSuccess: (guests: any[]) => void;
}

const GuestCsvImporter: React.FC<GuestCsvImporterProps> = ({ eventId, onImportSuccess }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length) {
      processFile(files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length) {
      processFile(files[0]);
    }
  };

  const processFile = async (file: File) => {
    // Reset states
    setError(null);
    setSuccess(null);
    setIsProcessing(true);

    // Check file type
    if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
      setError('Please upload a CSV file');
      setIsProcessing(false);
      return;
    }

    try {
      const text = await readFileAsText(file);
      const { headers, data } = parseCSV(text);
      
      // Validate required columns
      const requiredColumns = ['name', 'organization', 'job_title', 'email', 'phone'];
      const headerLower = headers.map(h => h.toLowerCase().trim());
      
      const missingColumns = requiredColumns.filter(col => 
        !headerLower.some(h => h === col || h.replace(/[_\s]/g, '') === col.replace(/[_\s]/g, ''))
      );
      
      if (missingColumns.length > 0) {
        setError(`Missing required columns: ${missingColumns.join(', ')}`);
        setIsProcessing(false);
        return;
      }

      // Map CSV data to guest objects
      const guests = data.map((row, index) => {
        // Find the index of each required column in the headers
        const nameIndex = headerLower.findIndex(h => h === 'name' || h.replace(/[_\s]/g, '') === 'name');
        const orgIndex = headerLower.findIndex(h => 
          h === 'organization' || h === 'company' || h.replace(/[_\s]/g, '') === 'organization' || h.replace(/[_\s]/g, '') === 'company'
        );
        const jobTitleIndex = headerLower.findIndex(h => 
          h === 'job_title' || h === 'jobtitle' || h === 'title' || h.replace(/[_\s]/g, '') === 'jobtitle'
        );
        const emailIndex = headerLower.findIndex(h => h === 'email' || h.replace(/[_\s]/g, '') === 'email');
        const phoneIndex = headerLower.findIndex(h => h === 'phone' || h.replace(/[_\s]/g, '') === 'phone');

        return {
          id: `import-${Date.now()}-${index}`, // Generate a temporary ID
          name: row[nameIndex] || 'Unknown',
          organization: row[orgIndex] || '',
          jobTitle: row[jobTitleIndex] || '',
          contact: {
            email: row[emailIndex] || '',
            phone: row[phoneIndex] || ''
          },
          eventId: eventId,
          registered: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          status: 'registered'
        };
      });

      // Filter out empty rows
      const validGuests = guests.filter(guest => guest.name && guest.name !== 'Unknown');

      if (validGuests.length === 0) {
        setError('No valid guest data found in the CSV file');
        setIsProcessing(false);
        return;
      }

      // Call the success callback with the parsed guests
      onImportSuccess(validGuests);
      
      // Show success message
      setSuccess(`Successfully imported ${validGuests.length} guests`);
      toast({
        title: "Import Successful",
        description: `Imported ${validGuests.length} guests for this event.`,
        variant: "default",
      });
      
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (err) {
      setError('Error processing CSV file. Please check the format and try again.');
      console.error('CSV import error:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  const readFileAsText = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          resolve(event.target.result as string);
        } else {
          reject(new Error('Failed to read file'));
        }
      };
      reader.onerror = () => reject(new Error('File reading error'));
      reader.readAsText(file);
    });
  };

  const parseCSV = (text: string) => {
    // Split by lines and handle different line endings
    const lines = text.split(/\r\n|\n|\r/).filter(line => line.trim() !== '');
    
    if (lines.length === 0) {
      throw new Error('CSV file is empty');
    }

    // Extract headers from the first line
    const headers = lines[0].split(',').map(header => header.trim());
    
    // Parse data rows
    const data = lines.slice(1).map(line => {
      // Handle quoted values with commas inside
      const values: string[] = [];
      let currentValue = '';
      let insideQuotes = false;
      
      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        
        if (char === '"') {
          insideQuotes = !insideQuotes;
        } else if (char === ',' && !insideQuotes) {
          values.push(currentValue.trim());
          currentValue = '';
        } else {
          currentValue += char;
        }
      }
      
      // Add the last value
      values.push(currentValue.trim());
      
      // If we have fewer values than headers, pad with empty strings
      while (values.length < headers.length) {
        values.push('');
      }
      
      return values;
    });

    return { headers, data };
  };

  return (
    <div className="w-full">
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center ${
          isDragging ? 'border-gold bg-gold/5' : 'border-gray-300 dark:border-gray-600'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <Upload className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500 mb-4" />
        <h3 className="text-lg font-medium mb-2">Import Guest List</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Drag and drop a CSV file or click to browse
        </p>
        
        <input
          type="file"
          ref={fileInputRef}
          accept=".csv"
          onChange={handleFileChange}
          className="hidden"
          id="csv-file-input"
        />
        
        <Button
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          disabled={isProcessing}
          className="mx-auto"
        >
          {isProcessing ? 'Processing...' : 'Select CSV File'}
        </Button>
        
        {error && (
          <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-md flex items-start">
            <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}
        
        {success && (
          <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-md flex items-start">
            <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
            <span>{success}</span>
          </div>
        )}
      </div>
      
      <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
        <p className="font-medium mb-1">CSV Format Requirements:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>File must be in CSV format</li>
          <li>Required columns: name, organization, job_title, email, phone</li>
          <li>First row should contain column headers</li>
          <li>Column names are case-insensitive</li>
        </ul>
      </div>
    </div>
  );
};

export default GuestCsvImporter;
