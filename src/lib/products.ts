export type Product = {
  id: string;
  name: string;
  category: string;
  description: string;
  longDescription: string;
  image: string;
  price: number;
  salePrice?: number;
  features: string[];
  requirements?: string[];
  rating: number;
  reviewCount: number;
};

const products: Product[] = [
  {
    id: 'chatgpt-plus',
    name: 'ChatGPT Plus Account',
    category: 'AI & Productivity',
    description: '1-Month Subscription with enhanced features and priority access.',
    longDescription: 'Unlock the full potential of AI with a ChatGPT Plus account. Get faster response times, priority access to new features, and access to the more powerful GPT-4 model. Ideal for professionals, developers, and creators who need a reliable and advanced AI assistant.',
    image: 'https://placehold.co/600x400.png',
    price: 25.00,
    salePrice: 20.00,
    features: ['Access to GPT-4', 'Faster response times', 'Priority access to new features', '24/7 support'],
    rating: 5,
    reviewCount: 125,
  },
  {
    id: 'canva-pro',
    name: 'Canva Pro Account',
    category: 'Design Tools',
    description: '1-Year Subscription for unlimited creative possibilities.',
    longDescription: 'Empower your creativity with Canva Pro. Access a massive library of templates, photos, and fonts. Features include one-click background remover, magic resize for any platform, and brand kits to maintain your visual identity. Perfect for marketers, designers, and small business owners.',
    image: 'https://placehold.co/600x400.png',
    price: 120.00,
    features: ['100+ million stock photos, videos, audio, and more', 'Magic Resize', 'Background Remover', 'Brand Kit management'],
    requirements: ['Web browser and internet connection'],
    rating: 4.8,
    reviewCount: 340,
  },
  {
    id: 'ccna-course',
    name: 'CCNA 200-301 Course',
    category: 'Online Courses',
    description: 'Comprehensive video course to ace the CCNA certification exam.',
    longDescription: 'Prepare for the CCNA 200-301 exam with this in-depth video course. Covering all exam topics including network fundamentals, network access, IP connectivity, IP services, security fundamentals, and automation and programmability. Includes labs and practice exams.',
    image: 'https://placehold.co/600x400.png',
    price: 99.99,
    features: ['40+ hours of video content', 'Hands-on lab exercises', 'Practice exams', 'Lifetime access'],
    requirements: ['Basic computer literacy', 'No prior networking knowledge required'],
    rating: 4.9,
    reviewCount: 89,
  },
  {
    id: 'full-stack-dev-course',
    name: 'Full-Stack Web Dev Course',
    category: 'Online Courses',
    description: 'Master front-end and back-end development with our project-based course.',
    longDescription: 'Become a full-stack developer by learning the most in-demand technologies. This course covers HTML, CSS, JavaScript, React, Node.js, Express, and databases like MongoDB and PostgreSQL. Build real-world projects and create a portfolio to showcase your skills.',
    image: 'https://placehold.co/600x400.png',
    price: 149.99,
    salePrice: 119.99,
    features: ['Project-based learning', 'Covers MERN and PERN stacks', 'Code reviews and community support', 'Certificate of completion'],
    rating: 4.7,
    reviewCount: 215,
  },
  {
    id: 'tryhackme-premium',
    name: 'Try Hack Me Premium',
    category: 'Cybersecurity',
    description: '1-Year Premium access for hands-on cybersecurity training.',
    longDescription: 'Learn cybersecurity through gamified labs and challenges. Try Hack Me Premium unlocks all learning paths and rooms, giving you access to a vast range of topics from ethical hacking to digital forensics. Perfect for beginners and seasoned professionals looking to sharpen their skills.',
    image: 'https://placehold.co/600x400.png',
    price: 75.00,
    features: ['Access to all 500+ rooms', 'Guided learning paths', 'In-browser attack machines', 'Compete on leaderboards'],
    requirements: ['Web browser and internet connection'],
    rating: 4.9,
    reviewCount: 180,
  },
   {
    id: 'ui-ux-design-course',
    name: 'UI/UX Design Masterclass',
    category: 'Online Courses',
    description: 'Learn to design beautiful and user-friendly interfaces from scratch.',
    longDescription: 'This comprehensive masterclass covers the entire design process, from user research and wireframing to prototyping and usability testing. Learn industry-standard tools like Figma and Adobe XD, and build a portfolio of compelling design projects.',
    image: 'https://placehold.co/600x400.png',
    price: 110.00,
    features: ['Figma and Adobe XD tutorials', 'User research techniques', 'Prototyping and animation', 'Portfolio-building projects'],
    requirements: ['No prior design experience needed'],
    rating: 4.8,
    reviewCount: 150,
  },
];

export function getProducts(): Product[] {
  return products;
}

export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id);
}

export function getCategories(): string[] {
  const categories = products.map(p => p.category);
  return ['All', ...Array.from(new Set(categories))];
}
