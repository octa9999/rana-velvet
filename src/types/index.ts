// Database entity types for Rana Velvet

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  parent_id: string | null;
  order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  children?: Category[];
  products?: Product[];
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  short_description: string | null;
  price: number;
  compare_at_price: number | null;
  cost_price: number | null;
  sku: string | null;
  stock_quantity: number;
  stock_status: 'in_stock' | 'out_of_stock' | 'low_stock';
  category_id: string;
  images: ProductImage[];
  variants: ProductVariant[];
  dimensions: ProductDimensions | null;
  materials: string[];
  colors: string[];
  tags: string[];
  seo_title: string | null;
  seo_description: string | null;
  is_featured: boolean;
  is_active: boolean;
  order: number;
  created_at: string;
  updated_at: string;
  category?: Category;
}

export interface ProductImage {
  id: string;
  product_id: string;
  url: string;
  alt_text: string | null;
  is_primary: boolean;
  order: number;
  created_at: string;
}

export interface ProductVariant {
  id: string;
  product_id: string;
  name: string;
  sku: string | null;
  price: number;
  compare_at_price: number | null;
  stock_quantity: number;
  options: Record<string, string>;
  is_active: boolean;
  created_at: string;
}

export interface ProductDimensions {
  length: number | null;
  width: number | null;
  height: number | null;
  weight: number | null;
  unit: string;
}

export interface Banner {
  id: string;
  title: string;
  subtitle: string | null;
  link_url: string | null;
  link_text: string | null;
  image: string;
  mobile_image: string | null;
  is_active: boolean;
  order: number;
  start_date: string | null;
  end_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string | null;
  content: string;
  avatar: string | null;
  rating: number;
  is_active: boolean;
  order: number;
  created_at: string;
  updated_at: string;
}

export interface Appointment {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  service: string;
  message: string | null;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  created_at: string;
  updated_at: string;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  status: 'new' | 'read' | 'replied' | 'closed';
  created_at: string;
  updated_at: string;
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'super_admin' | 'admin' | 'editor';
  avatar: string | null;
  is_active: boolean;
  last_login: string | null;
  created_at: string;
  updated_at: string;
}

export interface SiteSettings {
  id: string;
  key: string;
  value: string;
  type: 'string' | 'number' | 'boolean' | 'json';
  group: string;
  updated_at: string;
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Form types
export interface ProductFormData {
  name: string;
  slug: string;
  description: string;
  short_description: string;
  price: number;
  compare_at_price: number | null;
  cost_price: number | null;
  sku: string;
  stock_quantity: number;
  stock_status: 'in_stock' | 'out_of_stock' | 'low_stock';
  category_id: string;
  dimensions: ProductDimensions;
  materials: string[];
  colors: string[];
  tags: string[];
  seo_title: string;
  seo_description: string;
  is_featured: boolean;
  is_active: boolean;
}

export interface CategoryFormData {
  name: string;
  slug: string;
  description: string;
  image: string;
  parent_id: string | null;
  order: number;
  is_active: boolean;
}

export interface AppointmentFormData {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  service: string;
  message: string;
}

export interface InquiryFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}