import { ChangeEvent } from 'react';
import { CartProduct } from './store/reducers/cart-reducer';

export type User = {
  _id: string;
  email: string;
  role: string;
  token: string;
};

export type Product = {
  _id: string;
  title: string;
  description: string;
  images: { url: string }[];
  price: number;
  quantity: number;
  ratings: [];
  slug: string;
  shipping: string;
  brand: string;
  category: Category;
  categories: Category[];
  subs: SubCategory[];
  color: string;
  colors: string[];
  brands: string[];
};

type YesOrNo = 'yes' | 'no';

type Color = 'Black' | 'Brown' | 'Silver' | 'White' | 'Blue' | '';

type Brand = 'Apple' | 'Samsung' | 'Microsoft' | 'Lenovo' | 'ASUS' | '';

type ImageUpload = { public_id: string; url: string };

export type ProductModel = {
  title: string;
  description: string;
  price: string;
  categories?: Category[];
  category:  string;
  subs: string[];
  shipping: string;
  quantity: string;
  images: ImageUpload[];
  colors: string[];
  brands: string[];
  color: Color;
  brand: Brand;
};

export type Category = {
  _id: string;
  name: string;
  slug: string;
};

export type SubCategory = {
  _id: string;
  name: string;
  slug: string;
};

export type Order = {
  _id: string;
  status: '';
  products: CartProduct[];
  paymentIntent: {
    id: string;
    amount: number;
    currency: string;
    status: string;
    created: any;
    payment_method_types: string[];
  };
};

export type InputOrSelectE = ChangeEvent<HTMLInputElement | HTMLSelectElement>;
export type SelectE = ChangeEvent<HTMLSelectElement>;
export type InputE = ChangeEvent<HTMLInputElement>;
