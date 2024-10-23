import { 
  collection, 
  doc, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc,
  query,
  orderBy,
  where,
  serverTimestamp,
  Timestamp
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../config/firebase';
import { Supplier } from '../../types/supplier';
import { useAuthStore } from '../../store/authStore';

const COLLECTION = 'suppliers';

export const getSuppliers = async (companyId: string) => {
  try {
    const q = query(
      collection(db, COLLECTION),
      where('companyId', '==', companyId),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate().toISOString(),
      updatedAt: doc.data().updatedAt?.toDate().toISOString()
    } as Supplier));
  } catch (error) {
    console.error('Error fetching suppliers:', error);
    throw error;
  }
};

export const getSuppliersByCountry = async (companyId: string, country: string) => {
  try {
    const q = query(
      collection(db, COLLECTION), 
      where('companyId', '==', companyId),
      where('country', '==', country),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate().toISOString(),
      updatedAt: doc.data().updatedAt?.toDate().toISOString()
    } as Supplier));
  } catch (error) {
    console.error('Error fetching suppliers by country:', error);
    throw error;
  }
};

export const addSupplier = async (data: Omit<Supplier, 'id' | 'createdAt' | 'updatedAt'>) => {
  try {
    const docRef = await addDoc(collection(db, COLLECTION), {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    
    return {
      id: docRef.id,
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error adding supplier:', error);
    throw error;
  }
};

export const updateSupplier = async (id: string, data: Partial<Supplier>) => {
  try {
    const docRef = doc(db, COLLECTION, id);
    const updateData = {
      ...data,
      updatedAt: serverTimestamp()
    };
    await updateDoc(docRef, updateData);
    return {
      id,
      ...data,
      updatedAt: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error updating supplier:', error);
    throw error;
  }
};

export const deleteSupplier = async (id: string) => {
  try {
    await deleteDoc(doc(db, COLLECTION, id));
  } catch (error) {
    console.error('Error deleting supplier:', error);
    throw error;
  }
};

export const uploadSupplierLogo = async (file: File): Promise<string> => {
  try {
    const filename = `supplier-logos/${Date.now()}-${file.name}`;
    const storageRef = ref(storage, filename);
    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef);
  } catch (error) {
    console.error('Error uploading supplier logo:', error);
    throw error;
  }
};

export const uploadSupplierCatalog = async (file: File) => {
  try {
    const filename = `supplier-catalogs/${Date.now()}-${file.name}`;
    const storageRef = ref(storage, filename);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return {
      name: file.name,
      url
    };
  } catch (error) {
    console.error('Error uploading supplier catalog:', error);
    throw error;
  }
};