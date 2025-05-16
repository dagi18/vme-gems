import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

interface AIOBadgeProps {
  name: string;
  organization: string;
  role: string;
  country: string;
  qrValue: string;
  printMode?: boolean;
}

const AIOBadge: React.FC<AIOBadgeProps> = ({
  name,
  organization,
  role,
  country,
  qrValue,
  printMode = false
}) => {
  // A5 dimensions in pixels (assuming 96 DPI)
  // A5 is 148mm × 210mm
  // At 96 DPI this is approximately 559 × 794 pixels
  return (
    <div className={`relative bg-white ${printMode ? 'w-[559px] h-[794px]' : 'w-full md:w-[559px] h-[794px]'} overflow-hidden`}>
      {/* Left side pattern */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-b from-[#FF6B6B] via-[#4ECDC4] to-[#FFE66D]"></div>
      
      {/* Main content */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Header with AIO logo */}
        <div className="p-8 text-center">
          <img 
            src="/aio-logo.png" 
            alt="AIO Logo" 
            className="h-24 mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold text-[#1B3C87] mb-2">
            51st CONFERENCE & ANNUAL
          </h1>
          <h2 className="text-xl font-bold text-[#1B3C87]">
            GENERAL ASSEMBLY
          </h2>
          <p className="text-lg mt-2 text-[#1B3C87]">
            ADDIS ABABA, ETHIOPIA
          </p>
        </div>

        {/* Attendee Information */}
        <div className="flex-grow px-8 py-4">
          <div className="text-center space-y-4">
            <h3 className="text-3xl font-bold text-[#1B3C87]">{name}</h3>
            <p className="text-xl text-gray-700">{organization}</p>
            <p className="text-lg text-gray-600">Country: {country}</p>
            <p className="text-xl font-semibold text-[#1B3C87] uppercase">{role}</p>
          </div>
          
          {/* QR Code */}
          <div className="mt-8 flex justify-center">
            <div className="p-2 bg-white rounded-lg shadow-lg">
              <QRCodeSVG 
                value={qrValue}
                size={150}
                level="H"
                includeMargin={true}
              />
            </div>
          </div>
        </div>

        {/* Footer with partner logos */}
        <div className="p-6 bg-gray-50">
          <div className="flex justify-between items-center">
            <img 
              src="/aio-small.png" 
              alt="AIO" 
              className="h-12"
            />
            <img 
              src="/apex-logo.png" 
              alt="APEX" 
              className="h-12"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIOBadge;
