import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { Company } from '../../types';

export const getCompanyName = async (companyId: string): Promise<string> => {
  try {
    const companyDoc = await getDoc(doc(db, 'companies', companyId));
    if (companyDoc.exists()) {
      const company = companyDoc.data() as Company;
      return company.name;
    }
    return '';
  } catch (error) {
    console.error('Error fetching company name:', error);
    return '';
  }
};