
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { getProductById } from '@/lib/products';
import { notFound } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Product } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import { updateProductAction } from '@/app/actions/product-actions';

const formSchema = z.object({
  name: z.string().min(5, 'Title must be at least 5 characters.'),
  category: z.string().min(3, 'Category must be at least 3 characters.'),
  description: z.string().min(10, 'Short description must be at least 10 characters.'),
  longDescription: z.string().min(20, 'Long description must be at least 20 characters.'),
  image: z.string().url('Must be a valid URL.'),
  price: z.coerce.number().positive('Price must be a positive number.'),
  salePrice: z.coerce.number().positive('Sale price must be a positive number.').optional().or(z.literal('')),
  features: z.string().min(10, 'Please list at least one feature.'),
  requirements: z.string().optional(),
  rating: z.coerce.number().min(0).max(5),
  reviewCount: z.coerce.number().min(0),
});

export default function EditProductPage({ params }: { params: { id: string } }) {
  const { toast } = useToast();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      category: '',
      description: '',
      longDescription: '',
      image: '',
      price: 0,
      salePrice: '',
      features: '',
      requirements: '',
      rating: 0,
      reviewCount: 0,
    },
  });

  useEffect(() => {
    async function fetchProduct() {
      setIsLoading(true);
      const fetchedProduct = await getProductById(params.id);
      if (!fetchedProduct) {
        notFound();
      }
      setProduct(fetchedProduct);
      form.reset({
        ...fetchedProduct,
        salePrice: fetchedProduct.salePrice ?? '',
        features: fetchedProduct.features.join('\n'),
        requirements: fetchedProduct.requirements?.join('\n') ?? '',
      });
      setIsLoading(false);
    }
    fetchProduct();
  }, [params.id, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    const result = await updateProductAction(params.id, values);

    if (result.success) {
        toast({
            title: "Product updated!",
            description: "The product has been successfully modified.",
        });
        router.push('/admin/products');
    } else {
        toast({
            title: "Error",
            description: result.error,
            variant: "destructive",
        });
    }
    setIsSubmitting(false);
  }

  if (isLoading) {
    return (
        <div className="max-w-4xl mx-auto">
             <Skeleton className="h-8 w-32 mb-4" />
             <Card>
                <CardHeader>
                    <Skeleton className="h-8 w-48" />
                    <Skeleton className="h-4 w-64" />
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                     <Skeleton className="h-20 w-full" />
                     <Skeleton className="h-32 w-full" />
                     <div className="flex justify-end gap-2 pt-4">
                        <Skeleton className="h-10 w-24" />
                        <Skeleton className="h-10 w-24" />
                     </div>
                </CardContent>
             </Card>
        </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Link href="/admin/products" className={cn("flex items-center gap-2 mb-4 text-sm font-medium hover:text-primary")}>
        <ArrowLeft className="h-4 w-4" />
        Back to Products
      </Link>
      <Card>
        <CardHeader>
          <CardTitle>Edit Product</CardTitle>
          <CardDescription>Modify the details of the existing product below.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Full-Stack Web Dev Course" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Online Courses" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Short Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="A brief summary of the product..."
                        className="resize-none"
                        rows={2}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="longDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Long Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="A detailed description of the product..."
                        className="resize-none"
                        rows={5}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Image URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://placehold.co/600x400.png" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid md:grid-cols-2 gap-6">
                 <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price ($)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g., 99.99" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="salePrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sale Price ($) (Optional)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g., 79.99" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
               <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="rating"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rating (0-5)</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.1" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="reviewCount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Review Count</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>


               <FormField
                control={form.control}
                name="features"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Features</FormLabel>
                     <CardDescription>
                        List each feature on a new line.
                      </CardDescription>
                    <FormControl>
                      <Textarea
                        placeholder="- Feature 1\n- Feature 2\n- Feature 3"
                        className="resize-none"
                        rows={4}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

               <FormField
                control={form.control}
                name="requirements"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Requirements (Optional)</FormLabel>
                     <CardDescription>
                        List each requirement on a new line.
                      </CardDescription>
                    <FormControl>
                      <Textarea
                        placeholder="- Requirement 1\n- Requirement 2"
                        className="resize-none"
                        rows={3}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => router.push('/admin/products')} disabled={isSubmitting}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                   {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                   Save Changes
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
