
'use server';

import { addProduct, deleteProduct, updateProduct } from '@/lib/products';
import { z } from 'zod';

const cleanAndSplit = (input: string | undefined): string[] => {
    if (!input) return [];
    return input.split('\n').map(s => s.trim()).filter(Boolean);
};

const AddProductFormSchema = z.object({
  name: z.string().min(5),
  category: z.string().min(3),
  description: z.string().min(10),
  longDescription: z.string().min(20),
  image: z.string().url(),
  price: z.coerce.number().positive(),
  salePrice: z.coerce.number().positive().optional().or(z.literal('')),
  features: z.string().min(10),
  requirements: z.string().optional(),
  rating: z.coerce.number().min(0).max(5),
  reviewCount: z.coerce.number().min(0),
});

const UpdateProductFormSchema = AddProductFormSchema;

export async function addProductAction(values: z.infer<typeof AddProductFormSchema>) {
    try {
        const validatedData = AddProductFormSchema.parse(values);
        const { salePrice, features, requirements, ...rest } = validatedData;
        
        const productData = {
            ...rest,
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
        return { success: false, error: 'An unexpected error occurred.' };
    }
}


export async function updateProductAction(id: string, values: z.infer<typeof UpdateProductFormSchema>) {
    try {
        const validatedData = UpdateProductFormSchema.parse(values);
        const { salePrice, features, requirements, ...rest } = validatedData;
        
        const productData: Record<string, any> = {
            ...rest,
            features: cleanAndSplit(features),
            requirements: cleanAndSplit(requirements),
        };

        if (salePrice) {
            productData.salePrice = salePrice;
        } else {
            // Firestore specific: delete the field if it's empty
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
