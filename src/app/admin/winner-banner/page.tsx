
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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const WINNER_BANNER_KEY = 'procraft-winner-banner';

const formSchema = z.object({
  winnerName: z.string().min(2, {
    message: 'Winner name must be at least 2 characters.',
  }),
  giveawayName: z.string().min(3, {
    message: 'Giveaway name must be at least 3 characters.',
  }),
  winnerImage: z
    .custom<FileList>()
    .refine((files) => files === undefined || files.length === 0 || (files?.[0]?.size <= 5000000), `Max file size is 5MB.`)
    .refine(
      (files) => files === undefined || files.length === 0 || ['image/jpeg', 'image/png', 'image/webp'].includes(files?.[0]?.type),
      'Only .jpg, .png, and .webp formats are supported.'
    ).optional(),
});

type WinnerBannerData = {
    winnerName: string;
    giveawayName: string;
    winnerImage: string;
}

export default function WinnerBannerPage() {
  const { toast } = useToast();
  const [currentBanner, setCurrentBanner] = useState<WinnerBannerData | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    const storedData = localStorage.getItem(WINNER_BANNER_KEY);
    if (storedData) {
      const data = JSON.parse(storedData);
      setCurrentBanner(data);
      form.reset(data);
    }
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      winnerName: 'John D.',
      giveawayName: 'Canva Pro',
      winnerImage: undefined,
    },
  });
  
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      form.setValue('winnerImage', event.target.files as FileList);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    const newBannerData = {
        winnerName: values.winnerName,
        giveawayName: values.giveawayName,
        winnerImage: imagePreview || currentBanner?.winnerImage || 'https://placehold.co/100x100.png',
    };
    
    localStorage.setItem(WINNER_BANNER_KEY, JSON.stringify(newBannerData));
    setCurrentBanner(newBannerData);

    toast({
        title: "Winner Banner Updated!",
        description: "The winner announcement banner has been successfully updated.",
    });
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
        <Card>
            <CardHeader>
            <CardTitle>Update Winner Banner</CardTitle>
            <CardDescription>Modify the details of the winner announcement banner on the giveaways page.</CardDescription>
            </CardHeader>
            <CardContent>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                        control={form.control}
                        name="winnerName"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Winner's Name</FormLabel>
                            <FormControl>
                            <Input placeholder="e.g., Jane Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                     <FormField
                        control={form.control}
                        name="giveawayName"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Giveaway Prize Name</FormLabel>
                            <FormControl>
                            <Input placeholder="e.g., Lifetime Canva Pro Subscription" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                </div>
                
                <FormField
                    control={form.control}
                    name="winnerImage"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Winner's Image (Optional)</FormLabel>
                        <FormControl>
                        <Input 
                            type="file" 
                            accept="image/png, image/jpeg, image/webp"
                            onChange={handleImageChange}
                        />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />

                <div className="flex justify-end pt-4">
                    <Button type="submit">
                    Save Changes
                    </Button>
                </div>
                </form>
            </Form>
            </CardContent>
      </Card>

      {currentBanner && (
         <Card>
            <CardHeader>
                <CardTitle>Current Banner Preview</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center text-center gap-4 bg-primary/10 p-6 rounded-lg">
                <Image
                    src={imagePreview || currentBanner.winnerImage}
                    alt={currentBanner.winnerName}
                    width={100}
                    height={100}
                    className="w-24 h-24 rounded-full border-4 border-primary/20 object-cover"
                />
                <p className="text-lg text-foreground/90 mt-4">
                    Congratulations to <span className="font-bold text-primary">{currentBanner.winnerName}</span> for winning the <span className="font-semibold">{currentBanner.giveawayName}</span> giveaway!
                    Stay tuned for our next exciting prize.
                </p>
            </CardContent>
         </Card>
      )}

    </div>
  );
}

