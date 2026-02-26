
import Image from 'next/image';
import { Building, Target, Users, Sparkles } from 'lucide-react';
import Header from '@/components/header';
import Footer from '@/components/footer';

const values = [
  {
    icon: Building,
    title: 'Our Mission',
    desc: 'To curate and deliver top-tier digital products that accelerate innovation and learning, making professional-grade tools accessible to everyone.',
    gradient: 'from-blue-500 to-primary',
  },
  {
    icon: Target,
    title: 'Our Vision',
    desc: 'To be the most trusted and comprehensive marketplace for digital goods, fostering a community of skilled and successful individuals.',
    gradient: 'from-primary to-accent',
  },
  {
    icon: Users,
    title: 'Our Values',
    desc: 'We believe in quality, integrity, and customer success. We are passionate about empowering our users through reliable products and exceptional support.',
    gradient: 'from-accent to-pink-500',
  },
];

export default function AboutPage() {
  return (
    <>
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden py-24 text-center">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="glow-orb animate-float absolute -top-20 left-1/2 -translate-x-1/2 h-[500px] w-[500px] rounded-full bg-primary/15 opacity-60" />
        </div>
        <div className="container mx-auto px-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6">
            <Sparkles className="h-3.5 w-3.5" />
            Our Story
          </div>
          <h1 className="font-headline text-5xl md:text-6xl font-extrabold tracking-tight">
            About <span className="gradient-text">ProCraft</span>
          </h1>
          <p className="mt-6 text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We are dedicated to providing the highest quality digital tools and educational resources to empower creators, developers, and professionals around the globe.
          </p>
        </div>
      </section>

      {/* Team image */}
      <div className="container mx-auto px-4 mb-20">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-primary/10 border border-border/40">
          <Image
            src="https://placehold.co/1200x500.png"
            alt="Our team working"
            width={1200}
            height={500}
            className="w-full h-auto object-cover"
            data-ai-hint="team collaboration"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
        </div>
      </div>

      {/* Value cards */}
      <section className="container mx-auto px-4 pb-24">
        <div className="grid md:grid-cols-3 gap-6">
          {values.map(({ icon: Icon, title, desc, gradient }) => (
            <div key={title} className="group relative rounded-2xl border border-border/60 bg-card p-8 text-center overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-primary/30">
              {/* Background gradient glow */}
              <div className="absolute inset-0 -z-10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br from-primary/5 to-accent/5" />

              {/* Icon */}
              <div className={`mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${gradient} shadow-lg`}>
                <Icon className="h-7 w-7 text-white" />
              </div>
              <h3 className="font-headline text-xl font-bold mb-3">{title}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}
