import { create } from 'zustand';
import { User } from '../types';
import { signIn, signUp, signOut, getCurrentUser } from '../services/firebase/auth';
import { getUserProfile, updateUserProfile } from '../services/firebase/user';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  initAuth: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  loading: true,
  error: null,

  initAuth: async () => {
    try {
      const firebaseUser = await getCurrentUser();
      if (firebaseUser) {
        const userProfile = await getUserProfile(firebaseUser.uid);
        if (userProfile) {
          set({ user: userProfile, isAuthenticated: true, loading: false });
          return;
        }
      }
      set({ loading: false });
    } catch (error) {
      console.error('Auth initialization error:', error);
      set({ loading: false });
    }
  },

  login: async (email: string, password: string) => {
    try {
      set({ loading: true, error: null });
      const user = await signIn(email, password);
      set({ user, isAuthenticated: true, loading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Login failed', 
        loading: false 
      });
    }
  },

  register: async (email: string, password: string, name: string) => {
    try {
      set({ loading: true, error: null });
      const user = await signUp(email, password, name);
      set({ user, isAuthenticated: true, loading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Registration failed',
        loading: false
      });
    }
  },

  logout: async () => {
    try {
      await signOut();
      set({ user: null, isAuthenticated: false });
    } catch (error) {
      console.error('Logout error:', error);
    }
  },

  updateProfile: async (data: Partial<User>) => {
    try {
      const { user } = get();
      if (!user) throw new Error('No user logged in');
      
      const updatedUser = await updateUserProfile(user.id, data);
      set({ user: updatedUser });
    } catch (error) {
      console.error('Profile update error:', error);
      throw error;
    }
  },

  clearError: () => set({ error: null }),
}));