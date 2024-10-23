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
  serverTimestamp
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../config/firebase';
import { Product } from '../../types';

const COLLECTION = 'products';

export const getProducts = async () => {
  const q = query(collection(db, COLLECTION), orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
};

export const getProductsBySupplierId = async (supplierId: string) => {
  const q = query(
    collection(db, COLLECTION),
    where('supplierId', '==', supplierId),
    orderBy('createdAt', 'desc')
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
};

export const addProduct = async (data: Omit<Product, 'id'>) => {
  const docRef = await addDoc(collection(db, COLLECTION), {
    ...data,
    createdAt: serverTimestamp()
  });
  return { id: docRef.id, ...data };
};

export const updateProduct = async (id: string, data: Partial<Product>) => {
  const docRef = doc(db, COLLECTION, id);
  const updateData = {
    ...data,
    updatedAt: serverTimestamp()
  };
  await updateDoc(docRef, updateData);
  return { id, ...data };
};

export const deleteProduct = async (id: string) => {
  await deleteDoc(doc(db, COLLECTION, id));
};

export const uploadProductImage = async (file: File) => {
  const filename = `product-images/${Date.now()}-${file.name}`;
  const storageRef = ref(storage, filename);
  await uploadBytes(storageRef, file);
  return getDownloadURL(storageRef);
};