export interface User {
  id: string;
  name: string;
  email: string;
  role: 'master' | 'admin' | 'manager' | 'user';
  companyId: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
}

export interface Company {
  id: string;
  name: string;
  masterId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Supplier {
  id: string;
  companyId: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  website?: string;
  wechat?: string;
  notes?: string;
  country: string;
  logo?: string;
  catalogs?: Array<{ name: string; url: string }>;
}

export interface Product {
  id: string;
  companyId: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  supplierId: string;
  isWinner?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}