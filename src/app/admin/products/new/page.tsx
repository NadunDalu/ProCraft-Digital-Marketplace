
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
import { ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const formSchema = z.object({
  name: z.string().min(5, 'Title must be at least 5 characters.'),
  category: z.string().min(3, 'Category must be at least 3 characters.'),
  description: z.string().min(10, 'Short description must be at least 10 characters.'),
  longDescription: z.string().min(20, 'Long description must be at least 20 characters.'),
  image: z
    .custom<FileList>()
    .refine((files) => files?.length > 0, 'An image is required.')
    .refine((files) => files?.[0]?.size <= 5000000, `Max file size is 5MB.`)
    .refine(
      (files) => ['image/jpeg', 'image/png', 'image/webp'].includes(files?.[0]?.type),
      'Only .jpg, .png, and .webp formats are supported.'
    ),
  price: z.coerce.number().positive('Price must be a positive number.'),
  salePrice: z.coerce.number().positive('Sale price must be a positive number.').optional(),
  features: z.string().min(10, 'Please list at least one feature.'),
  requirements: z.string().optional(),
});

export default function NewProductPage() {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      category: '',
      description: '',
      longDescription: '',
      image: undefined,
      price: 0,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log({
        ...values,
        image: values.image[0].name,
    });
    toast({
        title: "Product created!",
        description: "The new product has been successfully added.",
    });
    router.push('/admin/products');
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Link href="/admin/products" className={cn("flex items-center gap-2 mb-4 text-sm font-medium hover:text-primary")}>
        <ArrowLeft className="h-4 w-4" />
        Back to Products
      </Link>
      <Card>
        <CardHeader>
          <CardTitle>Add New Product</CardTitle>
          <CardDescription>Fill in the details below to add a new product to your catalog.</CardDescription>
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

              <div className="grid md:grid-cols-3 gap-6">
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
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field: { onChange, value, ...rest } }) => (
                    <FormItem>
                      <FormLabel>Product Image</FormLabel>
                      <FormControl>
                        <Input 
                          type="file" 
                          accept="image/png, image/jpeg, image/webp"
                          onChange={(event) => {
                            onChange(event.target.files);
                          }}
                          {...rest}
                        />
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
                        placeholder="- Feature 1&#10;- Feature 2&#10;- Feature 3"
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
                        placeholder="- Requirement 1&#10;- Requirement 2"
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
                <Button type="button" variant="outline" onClick={() => router.push('/admin/products')}>
                  Cancel
                </Button>
                <Button type="submit">
                   Create Product
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
