
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
  whatsappMessage: z.string().optional(),
});

export const ProductsSchema = z.array(ProductSchema);

export type Product = z.infer<typeof ProductSchema>;
export type Review = z.infer<typeof ReviewSchema>;

// Banners
export const BannerSchema = z.object({
  id: z.string(),
  image: z.string(), // base64 data URL
  createdAt: z.string().optional(),
});
export const BannersSchema = z.array(BannerSchema);
export type Banner = z.infer<typeof BannerSchema>;

// Giveaways
export const GiveawaySchema = z.object({
  _id: z.string().optional(),
  id: z.union([z.string(), z.number()]).optional(),
  title: z.string(),
  description: z.string(),
  image: z.string(),
  endDate: z.string(),
  instructions: z.string().optional(),
});
export type Giveaway = z.infer<typeof GiveawaySchema>;

// Winners
export const WinnerSchema = z.object({
  _id: z.string().optional(),
  id: z.union([z.string(), z.number()]).optional(),
  giveawayId: z.union([z.string(), z.number()]).optional(),
  name: z.string(),
  prize: z.string(),
  avatar: z.string().optional(),
});
export type Winner = z.infer<typeof WinnerSchema>;

// Site Reviews
export const SiteReviewSchema = z.object({
  _id: z.string().optional(),
  id: z.string().optional(),
  name: z.string(),
  text: z.string().optional(),
  image: z.string().optional(),
});
export type SiteReview = z.infer<typeof SiteReviewSchema>;
