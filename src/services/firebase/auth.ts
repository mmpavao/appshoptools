import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import { auth, db } from '../../config/firebase';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { User, Company } from '../../types';

export const signIn = async (email: string, password: string): Promise<User> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
    
    if (!userDoc.exists()) {
      throw new Error('User profile not found');
    }

    return userDoc.data() as User;
  } catch (error) {
    const e = error as { code?: string, message: string };
    switch (e.code) {
      case 'auth/user-not-found':
        throw new Error('No user found with this email');
      case 'auth/wrong-password':
        throw new Error('Invalid password');
      default:
        throw new Error('Failed to sign in');
    }
  }
};

export const signUp = async (
  email: string, 
  password: string, 
  name: string,
  phone: string,
  companyName: string
): Promise<User> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;
    
    // Create company first
    const companyRef = doc(db, 'companies', 'company_' + uid);
    const company: Company = {
      id: companyRef.id,
      name: companyName,
      masterId: uid,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    await setDoc(companyRef, company);

    // Then create user with company reference
    const userRef = doc(db, 'users', uid);
    const user: User = {
      id: uid,
      name,
      email,
      phone,
      role: 'master',
      companyId: companyRef.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    await setDoc(userRef, user);

    return user;
  } catch (error) {
    const e = error as { code?: string, message: string };
    switch (e.code) {
      case 'auth/email-already-in-use':
        throw new Error('Email already registered');
      case 'auth/weak-password':
        throw new Error('Password is too weak');
      default:
        throw new Error('Failed to create account');
    }
  }
};

export const signOut = async (): Promise<void> => {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    throw new Error('Failed to sign out');
  }
};

export const getCurrentUser = (): Promise<FirebaseUser | null> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        unsubscribe();
        resolve(user);
      },
      reject
    );
  });
};