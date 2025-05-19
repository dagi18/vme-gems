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
    <div className={`relative ${printMode ? 'w-[559px] h-[794px]' : 'w-full md:w-[559px] h-[794px]'} overflow-hidden`}>
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center" 
        style={{ 
          backgroundImage: 'url("/aio-2025-banner.png")',
          opacity: 0.15
        }}
      />
      
      {/* Main content */}
      <div className="relative z-10 h-full flex flex-col bg-white bg-opacity-90">
        {/* Header with Conference Banner */}
        <div className="w-full h-48 bg-cover bg-center" 
          style={{ 
            backgroundImage: 'url("/aio-2025-banner.png")'
          }}
        />

        {/* Attendee Information */}
        <div className="flex-grow px-8 py-6">
          <div className="text-center space-y-6">
            <h3 className="text-4xl font-bold text-[#1B3C87]">{name}</h3>
            <p className="text-2xl text-gray-800">{organization}</p>
            <p className="text-xl text-gray-700">Country: {country}</p>
            <p className="text-2xl font-semibold text-[#1B3C87] mt-4 uppercase">{role}</p>
          </div>
          
          {/* QR Code */}
          <div className="mt-10 flex justify-center">
            <div className="p-3 bg-white rounded-xl shadow-xl">
              <QRCodeSVG 
                value={qrValue}
                size={180}
                level="H"
                includeMargin={true}
              />
            </div>
          </div>
        </div>

        {/* Footer with sponsor logos */}
        <div className="p-6 bg-white bg-opacity-90 border-t border-gray-200">
          <div className="grid grid-cols-3 gap-4 items-center justify-items-center">
            <img 
              src="/aio-small.png" 
              alt="AIO" 
              className="h-10"
            />
            <img 
              src="/apex-logo.png" 
              alt="APEX" 
              className="h-10"
            />
            <img 
              src="/eth-re-logo.png" 
              alt="Ethiopian Re" 
              className="h-10"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIOBadge;
