
'use server';

import { addProduct, deleteProduct, updateProduct } from '@/lib/products';
import { uploadImage } from '@/lib/storage';
import { z } from 'zod';

const cleanAndSplit = (input: string | undefined): string[] => {
    if (!input) return [];
    return input.split('\n').map(s => s.trim()).filter(Boolean);
};

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

const imageSchema = z
    .any()
    .refine((files): files is FileList => files instanceof FileList && files.length > 0, 'An image is required.')
    .refine((files: FileList) => files[0].size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine(
      (files: FileList) => ACCEPTED_IMAGE_TYPES.includes(files[0].type),
      'Only .jpg, .png, and .webp formats are supported.'
    );

const optionalImageSchema = z
    .any()
    .optional()
    .refine((files): files is FileList | undefined => files === undefined || (files instanceof FileList && files.length > 0), 'Invalid file list.')
    .refine((files) => !files || files[0].size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine(
      (files) => !files || ACCEPTED_IMAGE_TYPES.includes(files[0].type),
      'Only .jpg, .png, and .webp formats are supported.'
    );


const BaseProductSchema = z.object({
  name: z.string().min(5),
  category: z.string().min(3),
  description: z.string().min(10),
  longDescription: z.string().min(20),
  price: z.coerce.number().positive(),
  salePrice: z.coerce.number().positive().optional().or(z.literal('')),
  features: z.string().min(10),
  requirements: z.string().optional(),
  rating: z.coerce.number().min(0).max(5),
  reviewCount: z.coerce.number().min(0),
});

const AddProductFormSchema = BaseProductSchema.extend({
    image: imageSchema
});

const UpdateProductFormSchema = BaseProductSchema.extend({
     image: optionalImageSchema
});


export async function addProductAction(values: z.infer<typeof AddProductFormSchema>) {
    try {
        const validatedData = AddProductFormSchema.parse(values);
        const { salePrice, features, requirements, image, ...rest } = validatedData;
        
        const file = image[0];
        const imageUrl = await uploadImage(file, 'products');

        const productData = {
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


export async function updateProductAction(id: string, values: z.infer<typeof UpdateProductFormSchema>) {
    try {
        const validatedData = UpdateProductFormSchema.parse(values);
        const { salePrice, features, requirements, image, ...rest } = validatedData;
        
        const productData: Record<string, any> = {
            ...rest,
            features: cleanAndSplit(features),
            requirements: cleanAndSplit(requirements),
        };

        if (image && image.length > 0) {
            const file = image[0];
            productData.image = await uploadImage(file, 'products');
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
