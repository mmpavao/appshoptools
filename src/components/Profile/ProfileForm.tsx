import React from 'react';
import { User } from '../../types';
import { 
  Building2, 
  User as UserIcon, 
  Mail, 
  Phone,
  Globe,
  MessageSquare,
  Facebook as FacebookIcon,
  Instagram as InstagramIcon,
  Youtube as YoutubeIcon
} from 'lucide-react';

interface ProfileFormProps {
  initialData: User;
  companyName: string;
  onSubmit: (data: Partial<User>) => Promise<void>;
}

const ProfileForm = ({ initialData, companyName, onSubmit }: ProfileFormProps) => {
  const [formData, setFormData] = React.useState({
    name: initialData.name || '',
    phone: initialData.phone || '',
    website: initialData.website || '',
    wechat: initialData.wechat || '',
    facebook: initialData.facebook || '',
    instagram: initialData.instagram || '',
    youtube: initialData.youtube || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Company - Read Only */}
        <div>
          <label
            htmlFor="company"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Company
          </label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Building2 className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              name="company"
              id="company"
              value={companyName}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500"
              disabled
            />
          </div>
        </div>

        {/* Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Name
          </label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <UserIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your name"
            />
          </div>
        </div>

        {/* Email - Read Only */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="email"
              name="email"
              id="email"
              value={initialData.email}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500"
              disabled
            />
          </div>
        </div>

        {/* Phone */}
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Phone
          </label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Phone className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="tel"
              name="phone"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your phone number"
            />
          </div>
        </div>

        {/* Website */}
        <div>
          <label
            htmlFor="website"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Website
          </label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Globe className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="url"
              name="website"
              id="website"
              value={formData.website}
              onChange={handleChange}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your website"
            />
          </div>
        </div>

        {/* WeChat */}
        <div>
          <label
            htmlFor="wechat"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            WeChat
          </label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MessageSquare className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              name="wechat"
              id="wechat"
              value={formData.wechat}
              onChange={handleChange}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your WeChat ID"
            />
          </div>
        </div>

        {/* Facebook */}
        <div>
          <label
            htmlFor="facebook"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Facebook
          </label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FacebookIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="url"
              name="facebook"
              id="facebook"
              value={formData.facebook}
              onChange={handleChange}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your Facebook profile"
            />
          </div>
        </div>

        {/* Instagram */}
        <div>
          <label
            htmlFor="instagram"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Instagram
          </label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <InstagramIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="url"
              name="instagram"
              id="instagram"
              value={formData.instagram}
              onChange={handleChange}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your Instagram profile"
            />
          </div>
        </div>

        {/* YouTube */}
        <div>
          <label
            htmlFor="youtube"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            YouTube
          </label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <YoutubeIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="url"
              name="youtube"
              id="youtube"
              value={formData.youtube}
              onChange={handleChange}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your YouTube channel"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default ProfileForm;