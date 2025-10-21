export const products = [
  {
    id: '1',
    name: 'Self-Learning Package for the CCNA v1.1 (200-301)',
    category: 'Online Courses',
    description: 'Our comprehensive Self-Learning Package for the CCNA v1.1 (200-301) exam is designed for your success.',
    longDescription: 'This comprehensive self-learning package covers all the fundamental concepts for the CCNA 200-301 exam. You will dive deep into network fundamentals, network access, IP connectivity, IP services, security fundamentals, and an introduction to automation and programmability. This course is designed to provide you with the core skills needed to install, operate, and troubleshoot modern enterprise networks.',
    image: '/images/ccna.jpg',
    price: 25000,
    salePrice: 12000,
    features: [
      'All 3 official CCNA modules',
      'A massive 58% discount on your CCNA exam fee',
      'E-Certificates and official Digital Badges upon completion',
      'Flexible, anytime access to all your learning resources'
    ],
    requirements: [
      'A computer with internet access',
      'Basic computer literacy with Networking knowledge'
    ],
    rating: 4.8,
    reviewCount: 1250,
    reviews: [
      { id: 1, name: 'Alex Johnson', avatar: '/images/avatar-1.png', reviewImage: '/images/review-1.png', rating: 5 },
      { id: 4, name: 'Emily T.', avatar: '/images/avatar-2.png', reviewImage: '/images/review-4.png', rating: 5 },
      { id: 7, name: 'Ben Carter', avatar: '/images/avatar-3.png', reviewImage: '/images/review-7.png', rating: 5 }
    ]
  },
  {
    id: '2',
    name: 'UI/UX Design Masterclass',
    category: 'Design',
    description: 'Learn to design beautiful and user-friendly interfaces from scratch.',
    longDescription: 'This masterclass will guide you through the entire design process, from user research and wireframing to prototyping and usability testing. You will learn to use industry-standard tools like Figma and Adobe XD.',
    image: '/images/ui-ux-course.png',
    price: 8990.0,
    features: [
      '25+ hours of practical lessons',
      'Real-world case studies',
      'Portfolio-building projects',
      'Expert feedback and guidance'
    ],
    requirements: [
      'No prior design experience needed',
      'Access to Figma (free version is sufficient)'
    ],
    rating: 4.9,
    reviewCount: 980,
    reviews: [
      { id: 2, name: 'Maria Garcia', avatar: '/images/avatar-4.png', reviewImage: '/images/review-2.png', rating: 5 },
      { id: 8, name: 'Olivia Martinez', avatar: '/images/avatar-5.png', reviewImage: '/images/review-8.png', rating: 5 }
    ]
  },
  {
    id: '3',
    name: 'ChatGPT Prompt Engineering Guide',
    category: 'AI Tools',
    description: 'Unlock the full potential of AI with advanced prompt engineering techniques.',
    longDescription: 'Learn how to craft effective prompts to get the most out of large language models like ChatGPT. This guide covers everything from basic prompting to advanced techniques for creative writing, coding, and problem-solving.',
    image: '/images/chatgpt-guide.png',
    price: 2990.0,
    features: [
      'Comprehensive PDF guide',
      'Library of ready-to-use prompts',
      'Tips for various use cases',
      'Lifetime updates'
    ],
    requirements: ['Access to an AI model like ChatGPT'],
    rating: 4.7,
    reviewCount: 2300,
    reviews: [
      { id: 3, name: 'Mike R.', avatar: '/images/avatar-6.png', reviewImage: '/images/review-3.png', rating: 5 },
      { id: 6, name: 'Fatima Al-Fassi', avatar: '/images/avatar-7.png', reviewImage: '/images/review-6.png', rating: 5 },
      { id: 9, name: 'Chloe Kim', avatar: '/images/avatar-8.png', reviewImage: '/images/review-9.png', rating: 4 }
    ]
  },
  {
    id: '4',
    name: 'CCNA 200-301 Certification Course',
    category: 'Certifications',
    description: 'Prepare for the Cisco CCNA exam with our in-depth video course and labs.',
    longDescription: 'This course is designed to help you pass the CCNA 200-301 exam on your first try. It covers all exam topics, including network fundamentals, network access, IP connectivity, IP services, security fundamentals, and automation.',
    image: '/images/ccna-cert-course.png',
    price: 12990.0,
    features: [
      '50+ hours of video lectures',
      'Hands-on labs with Packet Tracer',
      'Practice exams and quizzes',
      'Study notes and cheat sheets'
    ],
    requirements: ['Basic understanding of networking concepts is helpful but not required.'],
    rating: 4.8,
    reviewCount: 1800,
    reviews: [
      { id: 5, name: 'Chen Wang', avatar: '/images/avatar-9.png', reviewImage: '/images/review-5.png', rating: 4 },
      { id: 10, name: 'Liam Murphy', avatar: '/images/avatar-10.png', reviewImage: '/images/review-10.png', rating: 5 }
    ]
  },
  {
    id: '5',
    name: 'TryHackMe Premium Voucher',
    category: 'Cybersecurity',
    description: 'Get a 12-month voucher for TryHackMe to learn and practice cybersecurity skills.',
    longDescription: 'TryHackMe is an online platform that teaches cybersecurity through short, gamified labs. This voucher gives you 12 months of premium access to all learning paths, labs, and challenges.',
    image: '/images/tryhackme-voucher.png',
    price: 7500.0,
    salePrice: 6000.0,
    features: [
      '12-month premium access',
      'Unlimited access to all learning paths',
      'Private machines for hacking practice',
      'Official training content'
    ],
    requirements: ['A web browser and internet connection'],
    rating: 4.9,
    reviewCount: 3100,
    reviews: [
      { id: 3, name: 'David Smith', avatar: '/images/avatar-11.png', reviewImage: '/images/review-11.png', rating: 5 },
      { id: 11, name: 'Aisha Khan', avatar: '/images/avatar-12.png', reviewImage: '/images/review-12.png', rating: 5 }
    ]
  },
  {
    id: '6',
    name: 'Canva Pro Subscription (1 Year)',
    category: 'Design',
    description: 'Unleash your creativity with a one-year subscription to Canva Pro.',
    longDescription: 'Canva Pro is the ultimate design tool for creating professional graphics, presentations, and videos. Get access to millions of premium stock photos, videos, audio, and graphics, plus advanced features like Brand Kit and Magic Resize.',
    image: '/images/canva-pro.png',
    price: 11999.0,
    features: [
      '100+ million premium stock photos, videos, audio, and graphics',
      '610,000+ premium and free templates',
      'Magic Resize and Background Remover',
      '100GB of cloud storage'
    ],
    requirements: ['A Canva account (can be created for free)'],
    rating: 4.9,
    reviewCount: 5400,
    reviews: [
      { id: 4, name: 'Jessica Williams', avatar: '/images/avatar-1.png', reviewImage: '/images/review-1.png', rating: 5 },
      { id: 12, name: 'Kenji Tanaka', avatar: '/images/avatar-2.png', reviewImage: '/images/review-2.png', rating: 5 }
    ]
  },
  {
    id: '7',
    name: 'Doctor Lite (1 Year)',
    category: 'Healthcare',
    description: 'Unleash your healthcare potential with a one-year subscription to Doctor Lite.',
    longDescription: 'Doctor Lite is the ultimate healthcare tool for managing your medical practice. Get access to millions of premium stock photos, videos, audio, and graphics, plus advanced features like Brand Kit and Magic Resize.',
    image: '/images/doctor-lite.png',
    price: 22999.0,
    features: [
      '100+ million premium doctors, consultants, and specialists',
      '610,000+ premium and free templates',
      'Magic Resize and Background Remover',
      '100GB of cloud storage'
    ],
    requirements: ['A Doctor Lite (can be created for free)'],
    rating: 4.9,
    reviewCount: 100
  }
];

export const giveaways = [
  {
    id: 1,
    title: 'Lifetime CISCO Subscription',
    description: 'Win a lifetime subscription to Canva Pro and unlock your creative potential. Get access to millions of premium assets and tools to bring your ideas to life.',
    image: '/images/giveaway.png',
    endDate: 'August 31, 2024',
  },
];

export const winners = [
    { id: 1, name: 'Induwara Lakshan', prize: 'TryHack me', avatar: '/images/avatar-1.png' }, //latest winner banner details enter as id = 1 (This shown at the banner)
    { id: 2, name: 'Sarah L.', prize: 'CCNA Course', avatar: '/images/avatar-2.png' },
    { id: 3, name: 'Mike R.', prize: 'ChatGPT Plus', avatar: '/images/avatar-3.png' },
    { id: 4, name: 'Emily T.', prize: 'Full-Stack Course', avatar: '/images/avatar-4.png' },
    { id: 5, name: 'Chris B.', prize: 'Try Hack Me', avatar: '/images/avatar-5.png' },
    { id: 6, name: 'Jessica P.', prize: 'UI/UX Masterclass', avatar: '/images/avatar-6.png' },
];

export const reviews = [
  {
    id: 1,
    name: 'Alex Johnson',
    avatar: '/images/avatar-1.png',
    reviewImage: '/images/review-1.png',
    rating: 5,
  },
  {
    id: 2,
    name: 'Maria Garcia',
    avatar: '/images/avatar-2.png',
    reviewImage: '/images/review-2.png',
    rating: 5,
  },
  {
    id: 3,
    name: 'David Smith',
    avatar: '/images/avatar-3.png',
    reviewImage: '/images/review-3.png',
    rating: 5,
  },
  {
    id: 4,
    name: 'Jessica Williams',
    avatar: '/images/avatar-4.png',
    reviewImage: '/images/review-4.png',
    rating: 5,
  },
  {
    id: 5,
    name: 'Chen Wang',
    avatar: '/images/avatar-5.png',
    reviewImage: '/images/review-5.png',
    rating: 4,
  },
  {
    id: 6,
    name: 'Fatima Al-Fassi',
    avatar: '/images/avatar-6.png',
    reviewImage: '/images/review-6.png',
    rating: 5,
  },
  {
    id: 7,
    name: 'Ben Carter',
    avatar: '/images/avatar-7.png',
    reviewImage: '/images/review-7.png',
    rating: 5,
  },
  {
    id: 8,
    name: 'Olivia Martinez',
    avatar: '/images/avatar-8.png',
    reviewImage: '/images/review-8.png',
    rating: 5,
  },
  {
    id: 9,
    name: 'Chloe Kim',
    avatar: '/images/avatar-9.png',
    reviewImage: '/images/review-9.png',
    rating: 4,
  },
  {
    id: 10,
    name: 'Liam Murphy',
    avatar: '/images/avatar-10.png',
    reviewImage: '/images/review-10.png',
    rating: 5,
  },
  {
    id: 11,
    name: 'Aisha Khan',
    avatar: '/images/avatar-11.png',
    reviewImage: '/images/review-11.png',
    rating: 5,
  },
  {
    id: 12,
    name: 'Kenji Tanaka',
    avatar: '/images/avatar-12.png',
    reviewImage: '/images/review-12.png',
    rating: 5,
  },
];
