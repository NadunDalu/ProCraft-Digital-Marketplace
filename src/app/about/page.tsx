import Image from 'next/image';
import { Building, Target, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center">
        <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight text-foreground">
          About ProCraft Digital Marketplace
        </h1>
        <p className="mt-4 text-lg text-foreground/80 max-w-3xl mx-auto">
          We are dedicated to providing the highest quality digital tools and educational resources to empower creators, developers, and professionals around the globe.
        </p>
      </div>

      <div className="relative my-12">
        <Image
          src="https://placehold.co/1200x500.png"
          alt="Our team working"
          width={1200}
          height={500}
          className="w-full h-auto rounded-lg shadow-lg object-cover"
          data-ai-hint="team collaboration"
        />
      </div>

      <div className="grid md:grid-cols-3 gap-8 text-center my-16">
        <Card>
          <CardHeader>
            <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit">
              <Building className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="font-headline mt-4">Our Mission</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              To curate and deliver top-tier digital products that accelerate innovation and learning, making professional-grade tools accessible to everyone.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit">
              <Target className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="font-headline mt-4">Our Vision</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              To be the most trusted and comprehensive marketplace for digital goods, fostering a community of skilled and successful individuals.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="font-headline mt-4">Our Values</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              We believe in quality, integrity, and customer success. We are passionate about empowering our users through reliable products and exceptional support.
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="my-16">
        <h2 className="text-center font-headline text-3xl font-bold mb-8">Meet the Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map(member => (
            <Card key={member.name} className="text-center">
              <CardContent className="pt-6">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarImage src={member.avatar} alt={member.name} data-ai-hint="professional headshot" />
                  <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h3 className="text-lg font-semibold">{member.name}</h3>
                <p className="text-primary">{member.role}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

const teamMembers = [
  { name: 'Alex Johnson', role: 'Founder & CEO', avatar: 'https://placehold.co/100x100.png' },
  { name: 'Maria Garcia', role: 'Head of Product', avatar: 'https://placehold.co/100x100.png' },
  { name: 'James Smith', role: 'Lead Developer', avatar: 'https://placehold.co/100x100.png' },
  { name: 'Emily White', role: 'Marketing Director', avatar: 'https://placehold.co/100x100.png' },
];
