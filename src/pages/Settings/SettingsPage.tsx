import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProfilePage from '../Profile/ProfilePage';

const SettingsPage = () => {
  return (
    <Routes>
      <Route index element={<Navigate to="profile" replace />} />
      <Route path="profile" element={<ProfilePage />} />
    </Routes>
  );
};

export default SettingsPage;