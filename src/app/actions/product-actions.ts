
'use server';

import { addProduct, deleteProduct, updateProduct } from '@/lib/products';
import { z } from 'zod';
import { Product } from '@/lib/types';
import { uploadImage } from '@/lib/storage';

const cleanAndSplit = (input: string | undefined): string[] => {
    if (!input) return [];
    return input.split('\n').map(s => s.trim()).filter(Boolean);
};

const fileSchema = z.custom<File>(
  (file) => file instanceof File,
  "Image is required."
).refine(
    (file) => file.size <= 5000000, `Max file size is 5MB.`
).refine(
    (file) => ['image/jpeg', 'image/png', 'image/webp'].includes(file.type),
    'Only .jpg, .png, and .webp formats are supported.'
);

const AddProductSchema = z.object({
  name: z.string().min(5, 'Title must be at least 5 characters.'),
  category: z.string().min(3, 'Category must be at least 3 characters.'),
  description: z.string().min(10, 'Short description must be at least 10 characters.'),
  longDescription: z.string().min(20, 'Long description must be at least 20 characters.'),
  image: fileSchema,
  price: z.coerce.number().positive('Price must be a positive number.'),
  salePrice: z.coerce.number().positive('Sale price must be a positive number.').optional().or(z.literal('')),
  features: z.string().min(10, 'Please list at least one feature.'),
  requirements: z.string().optional(),
  rating: z.coerce.number().min(0).max(5),
  reviewCount: z.coerce.number().min(0),
});


const UpdateProductSchema = AddProductSchema.extend({
  image: fileSchema.or(z.string().url()).optional(),
});


type AddFormValues = z.infer<typeof AddProductSchema>;
type UpdateFormValues = z.infer<typeof UpdateProductSchema>;

export async function addProductAction(values: AddFormValues) {
    try {
        const validatedData = AddProductSchema.parse(values);
        const { salePrice, features, requirements, image, ...rest } = validatedData;
        
        const imageUrl = await uploadImage(image, `products/${Date.now()}-${image.name}`);

        const productData: Omit<Product, 'id'> = {
            ...rest,
            image: imageUrl,
            features: cleanAndSplit(features),
            requirements: cleanAndSplit(requirements),
            ...(salePrice ? { salePrice } : {}),
        };

        await addProduct(productData);
        
        return { success: true };
    } catch (error) {
        if (error instanceof z.ZodError) {
            return { success: false, error: error.errors.map(e => e.message).join(', ') };
        }
        console.error(error);
        return { success: false, error: 'An unexpected error occurred.' };
    }
}

export async function updateProductAction(id: string, values: UpdateFormValues) {
    try {
        const validatedData = UpdateProductSchema.parse(values);
        const { salePrice, features, requirements, image, ...rest } = validatedData;
        
        let imageUrl: string | undefined = undefined;
        if (image && typeof image !== 'string') {
            imageUrl = await uploadImage(image, `products/${Date.now()}-${image.name}`);
        } else if (typeof image === 'string') {
            imageUrl = image;
        }

        const productData: Record<string, any> = {
            ...rest,
            features: cleanAndSplit(features),
            requirements: cleanAndSplit(requirements),
        };
        
        if (imageUrl) {
            productData.image = imageUrl;
        }

        if (salePrice) {
            productData.salePrice = salePrice;
        } else {
            const { firestore } = await import('firebase-admin');
            productData.salePrice = firestore.FieldValue.delete();
        }

        await updateProduct(id, productData);
        
        return { success: true };
    } catch (error) {
        if (error instanceof z.ZodError) {
            return { success: false, error: error.errors.map(e => e.message).join(', ') };
        }
        console.error(error);
        return { success: false, error: 'An unexpected error occurred.' };
    }
}


export async function deleteProductAction(id: string) {
    try {
        if (!id) throw new Error('Product ID is required.');
        await deleteProduct(id);
        return { success: true };
    } catch (error) {
        console.error(error);
        return { success: false, error: 'Failed to delete product.' };
    }
}
