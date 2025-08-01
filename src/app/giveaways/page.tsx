import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Gift, Calendar, Users } from 'lucide-react';

export default function GiveawaysPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center">
        <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight text-foreground">
          ProCraft Giveaways
        </h1>
        <p className="mt-4 text-lg text-foreground/80 max-w-3xl mx-auto">
          Check out our exciting giveaways and stand a chance to win premium digital products and courses. Good luck!
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        {giveaways.map((giveaway) => (
          <Card key={giveaway.id} className="flex flex-col">
            <CardHeader>
              <div className="relative h-56 w-full">
                <Image
                  src={giveaway.image}
                  alt={giveaway.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-lg"
                  data-ai-hint="giveaway prize"
                />
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <CardTitle className="font-headline text-xl">{giveaway.title}</CardTitle>
              <p className="text-muted-foreground mt-2">{giveaway.description}</p>
              <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span>Ends on: {giveaway.endDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" />
                  <span>{giveaway.participants} participants</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                <Gift className="mr-2 h-4 w-4" />
                Enter Giveaway
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

const giveaways = [
  {
    id: 1,
    title: 'Lifetime Canva Pro Subscription',
    description: 'Win a lifetime subscription to Canva Pro and unlock your creative potential.',
    image: 'https://placehold.co/600x400.png',
    endDate: 'August 31, 2024',
    participants: 1204,
  },
  {
    id: 2,
    title: 'Full-Stack Developer Course Bundle',
    description: 'Get access to our complete Full-Stack Web Development and UI/UX Design courses.',
    image: 'https://placehold.co/600x400.png',
    endDate: 'September 15, 2024',
    participants: 876,
  },
  {
    id: 3,
    title: 'ChatGPT Plus for a Year',
    description: 'Enjoy a full year of ChatGPT Plus, on us! Get priority access to new features.',
    image: 'https://placehold.co/600x400.png',
    endDate: 'September 30, 2024',
    participants: 2531,
  },
];
