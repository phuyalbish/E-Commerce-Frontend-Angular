export interface Post {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  stick: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
  discountPercentage: number;
}
export interface ProductObject {
  limit: number;
  skip: number;
  total: number;
  products: Post[];
}
