import React from 'react';

const DocumentTableSkeleton: React.FC = () => {
  return (
    <div className="animate-pulse">
      <div className="h-4 bg-gray-300 rounded mb-4"></div>
      <div className="space-y-2">
        {[...Array(27)].map((_, index) => (
          <div key={index} className="flex space-x-4">
            <div className="w-1/4 h-4 bg-gray-300 rounded"></div>
            <div className="w-1/2 h-4 bg-gray-300 rounded"></div>
            <div className="w-1/4 h-4 bg-gray-300 rounded"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocumentTableSkeleton; 