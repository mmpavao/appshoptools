import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../../store/authStore';
import ProfileForm from '../../components/Profile/ProfileForm';
import AvatarEditor from '../../components/Profile/AvatarEditor';
import { User } from '../../types';
import { getCompanyName } from '../../services/firebase/company';

const ProfilePage = () => {
  const { user, updateProfile } = useAuthStore();
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [companyName, setCompanyName] = useState('');

  useEffect(() => {
    if (user?.companyId) {
      loadCompanyName();
    }
  }, [user?.companyId]);

  const loadCompanyName = async () => {
    if (!user?.companyId) return;
    try {
      const name = await getCompanyName(user.companyId);
      setCompanyName(name);
    } catch (err) {
      console.error('Error loading company name:', err);
    }
  };

  const handleProfileUpdate = async (data: Partial<User>) => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);
      setSuccess(null);
      await updateProfile(data);
      setSuccess('Profile updated successfully');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarUpdate = async (avatarUrl: string) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(null);
      await updateProfile({ avatar: avatarUrl });
      setSuccess('Profile picture updated successfully');
      setIsAvatarModalOpen(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update profile picture');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="text-center py-12 text-gray-500">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Profile Settings</h1>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded relative">
          {success}
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center space-x-4 mb-8">
          <div
            onClick={() => setIsAvatarModalOpen(true)}
            className="relative group cursor-pointer"
          >
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center border-2 border-gray-200">
                <span className="text-2xl font-semibold text-gray-400">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            <div className="absolute inset-0 rounded-full bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-white text-sm">Change Photo</span>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900">{user.name}</h2>
            <p className="text-sm text-gray-500">{user.email}</p>
            <p className="text-sm text-gray-500">Role: {user.role}</p>
          </div>
        </div>

        <ProfileForm
          initialData={user}
          companyName={companyName}
          onSubmit={handleProfileUpdate}
        />
      </div>

      <AvatarEditor
        isOpen={isAvatarModalOpen}
        onClose={() => setIsAvatarModalOpen(false)}
        onSave={handleAvatarUpdate}
        currentAvatar={user.avatar}
      />
    </div>
  );
};

export default ProfilePage;