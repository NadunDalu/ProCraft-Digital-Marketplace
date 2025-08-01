
'use client';

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Pencil, PlusCircle, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

const initialGiveaways = [
    {
      id: 1,
      title: 'Lifetime Canva Pro Subscription',
      endDate: 'August 31, 2024',
      status: 'Active',
    },
  ];

export default function AdminGiveawaysPage() {
  const { toast } = useToast();
  const [giveaways, setGiveaways] = useState(initialGiveaways);

  const handleDelete = (id: number) => {
    setGiveaways(giveaways.filter(g => g.id !== id));
    toast({
        title: "Giveaway Deleted",
        description: "The giveaway has been successfully removed.",
        variant: "destructive"
    })
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Giveaways</CardTitle>
         <Button size="sm" asChild>
            <Link href="/admin/giveaways/new">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Giveaway
            </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {giveaways.map((giveaway) => (
              <TableRow key={giveaway.id}>
                <TableCell className="font-medium">{giveaway.title}</TableCell>
                <TableCell>{giveaway.endDate}</TableCell>
                <TableCell>
                  <Badge variant={giveaway.status === 'Active' ? 'default' : 'secondary'}>
                    {giveaway.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" asChild>
                        <Link href={`/admin/giveaways/edit/${giveaway.id}`}>
                            <Pencil className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                        </Link>
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                         <Button variant="destructive" size="icon">
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete this
                            giveaway.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(giveaway.id)}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
         {giveaways.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
                No giveaways found.
            </div>
        )}
      </CardContent>
    </Card>
  );
}
