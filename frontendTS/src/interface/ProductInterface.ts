export interface Product {
  _id: string;
  description: string;
  title: string;
  price: number;
  images: string[];
  reviews: {
    rate: number;
    counts: number;
  };
  stock: number;
}
