
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

const giveaways = [
    {
      id: 1,
      title: 'Lifetime Canva Pro Subscription',
      endDate: 'August 31, 2024',
      status: 'Active',
    },
  ];

export default function AdminGiveawaysPage() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Giveaways</CardTitle>
         <Button size="sm">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Giveaway
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
                    <Button variant="outline" size="icon">
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button variant="destructive" size="icon">
                      <Trash2 className="h-4 w-4" />
                       <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

