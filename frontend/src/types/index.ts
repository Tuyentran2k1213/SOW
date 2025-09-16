export interface Terms {
  id: number;
  language: string;
  title: string;
  content: string;
  section: string;
  order: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Product {
  id: number;
  articleNo: string;
  productService: string;
  inPrice: number;
  price: number;
  unit: string;
  inStock: number;
  description: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  company?: string;
  role?: string;
}

export interface ApiError {
  message: string;
  status?: number;
  code?: string;
}
