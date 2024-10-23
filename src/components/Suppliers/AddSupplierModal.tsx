import React, { useState, useEffect } from 'react';
import { X, Upload } from 'lucide-react';
import countryList from '../../utils/countryList';
import { phoneCountryCodes } from '../../utils/phoneCountryCodes';
import { Supplier } from '../../types/supplier';
import { useAuthStore } from '../../store/authStore';

interface AddSupplierModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (supplierData: Partial<Supplier>) => Promise<void>;
  initialData?: Supplier | null;
}

const AddSupplierModal = ({ isOpen, onClose, onSave, initialData }: AddSupplierModalProps) => {
  const { user } = useAuthStore();
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    phoneCountry: '+86',
    phoneNumber: '',
    email: '',
    website: '',
    wechat: '',
    notes: '',
    country: 'CN',
    logo: null as File | null,
    catalogs: [] as File[],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) {
      const [phoneCountry, ...phoneRest] = initialData.phoneNumber.split(' ');
      setFormData({
        companyName: initialData.companyName || '',
        contactName: initialData.contactName || '',
        phoneCountry: phoneCountry,
        phoneNumber: phoneRest.join(' ') || '',
        email: initialData.email || '',
        website: initialData.website || '',
        wechat: initialData.wechat || '',
        notes: initialData.notes || '',
        country: initialData.country || 'CN',
        logo: null,
        catalogs: [],
      });
    } else {
      setFormData({
        companyName: '',
        contactName: '',
        phoneCountry: '+86',
        phoneNumber: '',
        email: '',
        website: '',
        wechat: '',
        notes: '',
        country: 'CN',
        logo: null,
        catalogs: [],
      });
    }
  }, [initialData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'logo' | 'catalogs') => {
    const files = e.target.files;
    if (!files) return;

    if (field === 'logo') {
      setFormData({
        ...formData,
        logo: files[0],
      });
    } else {
      setFormData({
        ...formData,
        catalogs: [...formData.catalogs, ...Array.from(files)],
      });
    }
  };

  const removeCatalog = (index: number) => {
    setFormData({
      ...formData,
      catalogs: formData.catalogs.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.companyId) {
      setError('User company not found');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const supplierData: Partial<Supplier> = {
        companyName: formData.companyName,
        contactName: formData.contactName,
        phoneNumber: `${formData.phoneCountry} ${formData.phoneNumber}`,
        email: formData.email,
        website: formData.website || undefined,
        wechat: formData.wechat || undefined,
        country: formData.country,
        notes: formData.notes || undefined,
        companyId: user.companyId,
      };

      await onSave(supplierData);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save supplier');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">
            {initialData ? 'Edit Supplier' : 'Add New Supplier'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company Name
              </label>
              <input
                type="text"
                name="companyName"
                required
                value={formData.companyName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contact Name
              </label>
              <input
                type="text"
                name="contactName"
                required
                value={formData.contactName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <div className="flex space-x-2">
                <select
                  name="phoneCountry"
                  value={formData.phoneCountry}
                  onChange={handleInputChange}
                  className="w-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  disabled={loading}
                >
                  {phoneCountryCodes.map(code => (
                    <option key={code.code} value={code.code}>
                      {code.code}
                    </option>
                  ))}
                </select>
                <input
                  type="tel"
                  name="phoneNumber"
                  required
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Website
              </label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                WeChat
              </label>
              <input
                type="text"
                name="wechat"
                value={formData.wechat}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Country
              </label>
              <select
                name="country"
                required
                value={formData.country}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                disabled={loading}
              >
                {countryList.map(country => (
                  <option key={country.code} value={country.code}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notes
              </label>
              <textarea
                name="notes"
                rows={3}
                value={formData.notes}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Logo
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, 'logo')}
                className="w-full"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Catalogs
              </label>
              <input
                type="file"
                multiple
                accept=".pdf,.doc,.docx"
                onChange={(e) => handleFileChange(e, 'catalogs')}
                className="w-full"
                disabled={loading}
              />
              {formData.catalogs.length > 0 && (
                <div className="mt-2 space-y-1">
                  {formData.catalogs.map((file, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <span>{file.name}</span>
                      <button
                        type="button"
                        onClick={() => removeCatalog(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              disabled={loading}
            >
              {loading ? 'Saving...' : initialData ? 'Update Supplier' : 'Add Supplier'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSupplierModal;