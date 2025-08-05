
import { z } from 'zod';

export const ProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  category: z.string(),
  description: z.string(),
  longDescription: z.string(),
  image: z.string().url(),
  price: z.number(),
  salePrice: z.number().optional(),
  features: z.array(z.string()),
  requirements: z.array(z.string()).optional(),
  rating: z.number(),
  reviewCount: z.number(),
});

export const ProductsSchema = z.array(ProductSchema);

export type Product = z.infer<typeof ProductSchema>;
