
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

const allProducts: Product[] = [
  {
    id: '1',
    name: 'Full-Stack Web Dev Course',
    category: 'Online Courses',
    description: 'Comprehensive course on full-stack web development.',
    longDescription:
      'This course covers everything you need to know about full-stack web development, from front-end frameworks like React to back-end technologies like Node.js and databases.',
    image: 'https://placehold.co/600x400.png',
    price: 99.99,
    salePrice: 79.99,
    features: ['React', 'Node.js', 'Express', 'MongoDB'],
    requirements: ['Basic JavaScript knowledge'],
    rating: 4.5,
    reviewCount: 120,
  },
  {
    id: '2',
    name: 'UI/UX Design Masterclass',
    category: 'Design',
    description: 'Learn to design beautiful and intuitive user interfaces.',
    longDescription:
      'A complete guide to UI/UX design, covering user research, wireframing, prototyping, and visual design. Learn to use tools like Figma and Adobe XD.',
    image: 'https://placehold.co/600x400.png',
    price: 89.99,
    features: ['Figma', 'Adobe XD', 'User Research', 'Prototyping'],
    rating: 4.8,
    reviewCount: 95,
  },
  {
    id: '3',
    name: 'ChatGPT Prompt Engineering',
    category: 'AI',
    description: 'Master the art of crafting effective prompts for AI models.',
    longDescription:
      'Unlock the full potential of language models by learning advanced prompt engineering techniques. This course is perfect for developers, writers, and marketers.',
    image: 'https://placehold.co/600x400.png',
    price: 49.99,
    features: ['Advanced Prompting', 'AI Model Fine-tuning', 'Use Case Analysis'],
    rating: 4.9,
    reviewCount: 210,
  },
  {
    id: '4',
    name: 'Canva Pro Annual Subscription',
    category: 'Design',
    description: 'Unlock premium features with a one-year Canva Pro plan.',
    longDescription: 'Get access to millions of premium stock photos, videos, and elements. Enjoy features like Brand Kit, Background Remover, and more to elevate your designs.',
    image: 'https://placehold.co/600x400.png',
    price: 119.99,
    features: ['Brand Kit', 'Background Remover', 'Content Planner', '100GB Cloud Storage'],
    rating: 4.7,
    reviewCount: 150,
  },
  {
    id: '5',
    name: 'CCNA 200-301 Certification Course',
    category: 'IT Certification',
    description: 'Prepare for the CCNA 200-301 exam with this comprehensive course.',
    longDescription: 'This course covers all the topics you need to pass the CCNA exam, including network fundamentals, network access, IP connectivity, IP services, security fundamentals, and automation and programmability.',
    image: 'https://placehold.co/600x400.png',
    price: 149.99,
    salePrice: 129.99,
    features: ['Network Fundamentals', 'IP Connectivity', 'Security Fundamentals', 'Automation'],
    requirements: ['Basic understanding of computer networks'],
    rating: 4.6,
    reviewCount: 180,
  },
  {
    id: '6',
    name: 'Try Hack Me Premium Account',
    category: 'Cybersecurity',
    description: 'Learn cybersecurity with a premium Try Hack Me account.',
    longDescription: 'Gain hands-on experience with a variety of cybersecurity topics through interactive labs and challenges. This premium account gives you access to all learning paths and content.',
    image: 'https://placehold.co/600x400.png',
    price: 75.00,
    features: ['Hands-on Labs', 'Learning Paths', 'Capture The Flag Challenges'],
    rating: 4.9,
    reviewCount: 300,
  },
];

export function getProducts(): Product[] {
  return allProducts;
}

export function getProductById(id: string): Product | undefined {
  return allProducts.find(product => product.id === id);
}

export function getCategories(): string[] {
  const categories = allProducts.map(p => p.category);
  return ['All', ...Array.from(new Set(categories))];
}
