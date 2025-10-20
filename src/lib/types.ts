
import { z } from 'zod';

const ReviewSchema = z.object({
  id: z.number(),
  name: z.string(),
  avatar: z.string(),
  rating: z.number().min(1).max(5),
  review: z.string().optional(), // Make text review optional
  reviewImage: z.string().optional(), // Add optional image review
});

export const ProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  category: z.string(),
  description: z.string(),
  longDescription: z.string(),
  image: z.string(),
  cardImage: z.string().optional(),
  price: z.number(),
  salePrice: z.number().optional(),
  features: z.array(z.string()),
  requirements: z.array(z.string()).optional(),
  rating: z.number(),
  reviewCount: z.number(),
  reviews: z.array(ReviewSchema).optional(),
});

export const ProductsSchema = z.array(ProductSchema);

export type Product = z.infer<typeof ProductSchema>;
export type Review = z.infer<typeof ReviewSchema>;
