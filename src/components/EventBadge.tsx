
import React from 'react';
import { QrCode } from 'lucide-react';

interface EventBadgeProps {
  name: string;
  type: string;
  event?: string;
  date?: string;
  time?: string;
  location?: string;
  qrValue: string;
  logo?: string;
  printMode?: boolean;
  title?: string;
  organization?: string;
  badgeType?: string;
}

const EventBadge: React.FC<EventBadgeProps> = ({
  name,
  type,
  event,
  date,
  time,
  location,
  qrValue,
  logo = '/lovable-uploads/8b8ba947-ce02-4dae-b677-d70b3a0211b3.png',
  printMode = false,
  title = 'Attendee',
  organization = '',
  badgeType = 'VISITOR'
}) => {
  return (
    <div className={`bg-white ${printMode ? 'w-[300px] h-[480px]' : 'w-full md:w-[300px] h-auto'}`}>
      {/* Name section */}
      <div className="p-4 text-center">
        <h3 className="text-2xl font-bold text-black">{name}</h3>
      </div>
      
      {/* Organization section */}
      <div className="p-2 text-center">
        <p className="text-lg text-gray-700">{organization}</p>
      </div>
      
      {/* Job title section */}
      <div className="p-2 text-center">
        <p className="text-lg font-bold uppercase tracking-wider">{title}</p>
      </div>
      
      {/* QR Code section */}
      <div className="p-3 mt-4 mb-4 flex justify-center">
        {qrValue ? (
          <img 
            src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(qrValue)}`} 
            alt="QR Code"
            className="w-48 h-48"
          />
        ) : (
          <QrCode size={180} />
        )}
      </div>
      
      {/* Badge type footer */}
      <div className="bg-blue-600 p-4 mt-auto flex justify-center items-center">
        <span className="text-white font-bold tracking-wider uppercase text-xl">{badgeType}</span>
      </div>
    </div>
  );
};

export default EventBadge;
