import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../config/firebase';
import { User } from '../../types';

export const createUserProfile = async (uid: string, userData: Partial<User>): Promise<User> => {
  const userRef = doc(db, 'users', uid);
  const newUser: User = {
    id: uid,
    name: userData.name || '',
    email: userData.email || '',
    role: userData.role || 'user',
    companyId: userData.companyId || '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  await setDoc(userRef, newUser);
  return newUser;
};

export const getUserProfile = async (uid: string): Promise<User | null> => {
  const userRef = doc(db, 'users', uid);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    return { id: userSnap.id, ...userSnap.data() } as User;
  }
  return null;
};

export const updateUserProfile = async (uid: string, userData: Partial<User>): Promise<User> => {
  const userRef = doc(db, 'users', uid);
  
  // If there's an avatar data URL, upload it to storage first
  if (userData.avatar && userData.avatar.startsWith('data:')) {
    const avatarRef = ref(storage, `avatars/${uid}`);
    await uploadString(avatarRef, userData.avatar, 'data_url');
    userData.avatar = await getDownloadURL(avatarRef);
  }

  const updateData = {
    ...userData,
    updatedAt: new Date().toISOString(),
  };

  await updateDoc(userRef, updateData);
  
  const updatedDoc = await getDoc(userRef);
  if (!updatedDoc.exists()) {
    throw new Error('Failed to update user profile');
  }

  return { id: updatedDoc.id, ...updatedDoc.data() } as User;
};