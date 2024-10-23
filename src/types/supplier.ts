export interface Supplier {
  id: string;
  companyName: string;
  contactName: string;
  phoneNumber: string;
  email: string;
  website?: string;
  wechat?: string;
  country: string;
  notes?: string;
  logo?: string;
  catalogs?: Array<{ name: string; url: string }>;
  createdAt: string;
  updatedAt: string;
}