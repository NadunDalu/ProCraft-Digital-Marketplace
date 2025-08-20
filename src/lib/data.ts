
export const products = [
  {
    id: '1',
    name: 'Full-Stack Web Development Course',
    category: 'Online Courses',
    description: 'Master front-end and back-end development with our comprehensive course.',
    longDescription: 'This course covers everything from HTML/CSS and JavaScript basics to advanced topics like React, Node.js, and databases. You will build real-world projects and gain the skills needed to become a professional full-stack developer.',
    image: 'https://placehold.co/600x400.png',
    price: 99.99,
    salePrice: 79.99,
    features: [
      '30+ hours of video content',
      'Hands-on projects and assignments',
      'Access to a community of learners',
      'Certificate of completion'
    ],
    requirements: [
      'A computer with internet access',
      'Basic computer literacy'
    ],
    rating: 4.8,
    reviewCount: 1250,
  },
  {
    id: '2',
    name: 'UI/UX Design Masterclass',
    category: 'Design',
    description: 'Learn to design beautiful and user-friendly interfaces from scratch.',
    longDescription: 'This masterclass will guide you through the entire design process, from user research and wireframing to prototyping and usability testing. You will learn to use industry-standard tools like Figma and Adobe XD.',
    image: 'https://placehold.co/600x400.png',
    price: 89.99,
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
  },
  {
    id: '3',
    name: 'ChatGPT Prompt Engineering Guide',
    category: 'AI Tools',
    description: 'Unlock the full potential of AI with advanced prompt engineering techniques.',
    longDescription: 'Learn how to craft effective prompts to get the most out of large language models like ChatGPT. This guide covers everything from basic prompting to advanced techniques for creative writing, coding, and problem-solving.',
    image: 'https://placehold.co/600x400.png',
    price: 29.99,
    features: [
      'Comprehensive PDF guide',
      'Library of ready-to-use prompts',
      'Tips for various use cases',
      'Lifetime updates'
    ],
    requirements: [
      'Access to an AI model like ChatGPT'
    ],
    rating: 4.7,
    reviewCount: 2300,
  },
   {
    id: '4',
    name: 'CCNA 200-301 Certification Course',
    category: 'Certifications',
    description: 'Prepare for the Cisco CCNA exam with our in-depth video course and labs.',
    longDescription: 'This course is designed to help you pass the CCNA 200-301 exam on your first try. It covers all exam topics, including network fundamentals, network access, IP connectivity, IP services, security fundamentals, and automation.',
    image: 'https://placehold.co/600x400.png',
    price: 129.99,
    features: [
        '50+ hours of video lectures',
        'Hands-on labs with Packet Tracer',
        'Practice exams and quizzes',
        'Study notes and cheat sheets'
    ],
    requirements: [
        'Basic understanding of networking concepts is helpful but not required.'
    ],
    rating: 4.8,
    reviewCount: 1800
  },
  {
    id: '5',
    name: 'TryHackMe Premium Voucher',
    category: 'Cybersecurity',
    description: 'Get a 12-month voucher for TryHackMe to learn and practice cybersecurity skills.',
    longDescription: 'TryHackMe is an online platform that teaches cybersecurity through short, gamified labs. This voucher gives you 12 months of premium access to all learning paths, labs, and challenges.',
    image: 'https://placehold.co/600x400.png',
    price: 75.00,
    salePrice: 60.00,
    features: [
        '12-month premium access',
        'Unlimited access to all learning paths',
        'Private machines for hacking practice',
        'Official training content'
    ],
    requirements: [
        'A web browser and internet connection'
    ],
    rating: 4.9,
    reviewCount: 3100
  },
  {
    id: '6',
    name: 'Canva Pro Subscription (1 Year)',
    category: 'Design',
    description: 'Unleash your creativity with a one-year subscription to Canva Pro.',
    longDescription: 'Canva Pro is the ultimate design tool for creating professional graphics, presentations, and videos. Get access to millions of premium stock photos, videos, audio, and graphics, plus advanced features like Brand Kit and Magic Resize.',
    image: 'https://placehold.co/600x400.png',
    price: 119.99,
    features: [
        '100+ million premium stock photos, videos, audio, and graphics',
        '610,000+ premium and free templates',
        'Magic Resize and Background Remover',
        '100GB of cloud storage'
    ],
    requirements: [
        'A Canva account (can be created for free)'
    ],
    rating: 4.9,
    reviewCount: 5400
  },
  {
    id: '7',
    name: 'Doctor Lite (1 Year)',
    category: 'Healthcare',
    description: 'Unleash your healthcare potential with a one-year subscription to Doctor Lite.',
    longDescription: 'Doctor Lite is the ultimate healthcare tool for managing your medical practice. Get access to millions of premium stock photos, videos, audio, and graphics, plus advanced features like Brand Kit and Magic Resize.',
    image: 'https://placehold.co/600x400.png',
    price: 229.99,
    features: [
        '100+ million premium doctors, consultants, and specialists',
        '610,000+ premium and free templates',
        'Magic Resize and Background Remover',
        '100GB of cloud storage'
    ],
    requirements: [
        'A Doctor Lite (can be created for free)'
    ],
    rating: 4.9,
    reviewCount: 100
  }
];

export const giveaways = [
  {
    id: 1,
    title: 'Lifetime CISCO Subscription',
    description: 'Win a lifetime subscription to Canva Pro and unlock your creative potential. Get access to millions of premium assets and tools to bring your ideas to life.',
    image: 'https://placehold.co/800x400.png',
    endDate: 'August 31, 2024',
  },
];

export const winners = [
    { id: 1, name: 'Induwara Lakshan', prize: 'TryHack me', avatar: 'https://placehold.co/100x100.png' }, //latest winner banner details enter as id = 1 (This shown at the banner)
    { id: 2, name: 'Sarah L.', prize: 'CCNA Course', avatar: 'https://placehold.co/100x100.png' },
    { id: 3, name: 'Mike R.', prize: 'ChatGPT Plus', avatar: 'https://placehold.co/100x100.png' },
    { id: 4, name: 'Emily T.', prize: 'Full-Stack Course', avatar: 'https://placehold.co/100x100.png' },
    { id: 5, name: 'Chris B.', prize: 'Try Hack Me', avatar: 'https://placehold.co/100x100.png' },
    { id: 6, name: 'Jessica P.', prize: 'UI/UX Masterclass', avatar: 'https://placehold.co/100x100.png' },
];

export const reviews = [
  {
    id: 1,
    name: 'Alex Johnson',
    avatar: 'https://placehold.co/100x100.png',
    review: 'The Full-Stack course was incredible! I went from knowing basic HTML to building full applications. Highly recommended for anyone serious about web development.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Maria Garcia',
    avatar: 'https://placehold.co/100x100.png',
    review: 'I loved the UI/UX Masterclass. The instructor was clear, and the projects were very practical. My design portfolio has never looked better.',
    rating: 5,
  },
  {
    id: 3,
    name: 'David Smith',
    avatar: 'https://placehold.co/100x100.png',
    review: 'The TryHackMe voucher is fantastic value. I\'ve learned so much about cybersecurity in a fun, hands-on way. It\'s like a playground for ethical hackers.',
    rating: 5,
  },
  {
    id: 4,
    name: 'Jessica Williams',
    avatar: 'https://placehold.co/100x100.png',
    review: 'Canva Pro has been a game-changer for my small business. I can create professional-looking marketing materials in minutes without any design skills.',
    rating: 5,
  },
  {
    id: 5,
    name: 'Chen Wang',
    avatar: 'https://placehold.co/100x100.png',
    review: 'The CCNA course is very thorough and well-structured. The labs are especially helpful for understanding complex networking concepts. I feel confident for my exam.',
    rating: 4,
  },
  {
    id: 6,
    name: 'Fatima Al-Fassi',
    avatar: 'https://placehold.co/100x100.png',
    review: 'The Prompt Engineering guide is a must-have for anyone using AI regularly. It\'s packed with clever tricks to get much more accurate and creative results.',
    rating: 5,
  },
];
