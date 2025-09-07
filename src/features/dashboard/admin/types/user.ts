export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'ADMIN' | 'KASIR' | 'CUSTOMER';
  phone?: string;
  profilePicture?: string | null;
  isActive: boolean;
}
