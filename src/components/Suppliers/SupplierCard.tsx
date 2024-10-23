import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Pencil, FileText, ExternalLink } from 'lucide-react';

interface SupplierCardProps {
  supplier: {
    id: string;
    companyName: string;
    contactName: string;
    phoneNumber: string;
    email: string;
    website?: string;
    wechat?: string;
    country: string;
    notes?: string;
    logo?: string;
    catalogs?: Array<{ name: string; url: string }>;
  };
  onEdit: (id: string) => void;
}

const SupplierCard = ({ supplier, onEdit }: SupplierCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div
        className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center space-x-4">
          {/* Logo/Avatar */}
          <div className="flex-shrink-0">
            {supplier.logo ? (
              <img
                src={supplier.logo}
                alt={supplier.companyName}
                className="w-12 h-12 rounded-full object-cover border border-gray-200"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-blue-600 font-semibold text-lg">
                  {supplier.companyName.charAt(0)}
                </span>
              </div>
            )}
          </div>

          {/* Basic Info */}
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 truncate">
              {supplier.companyName}
            </h3>
            <p className="text-sm text-gray-600">
              {supplier.contactName} • {supplier.phoneNumber}
            </p>
          </div>

          {/* Expand/Collapse Icon */}
          <div className="flex-shrink-0 text-gray-400">
            {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="border-t border-gray-200">
          <div className="p-4 space-y-4">
            {/* Contact Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500">Email</h4>
                <p className="text-gray-900">{supplier.email}</p>
              </div>
              {supplier.website && (
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Website</h4>
                  <a
                    href={supplier.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 flex items-center"
                  >
                    {supplier.website}
                    <ExternalLink size={14} className="ml-1" />
                  </a>
                </div>
              )}
              {supplier.wechat && (
                <div>
                  <h4 className="text-sm font-medium text-gray-500">WeChat</h4>
                  <p className="text-gray-900">{supplier.wechat}</p>
                </div>
              )}
              <div>
                <h4 className="text-sm font-medium text-gray-500">Country</h4>
                <p className="text-gray-900">{supplier.country}</p>
              </div>
            </div>

            {/* Notes */}
            {supplier.notes && (
              <div>
                <h4 className="text-sm font-medium text-gray-500">Notes</h4>
                <p className="text-gray-900 whitespace-pre-line">{supplier.notes}</p>
              </div>
            )}

            {/* Documents */}
            {supplier.catalogs && supplier.catalogs.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">Documents</h4>
                <div className="space-y-2">
                  {supplier.catalogs.map((doc, index) => (
                    <a
                      key={index}
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-sm text-gray-600 hover:text-blue-600"
                    >
                      <FileText size={16} />
                      <span>{doc.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Edit Button */}
            <div className="flex justify-end pt-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(supplier.id);
                }}
                className="flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-800"
              >
                <Pencil size={16} />
                <span>Edit Supplier</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupplierCard;