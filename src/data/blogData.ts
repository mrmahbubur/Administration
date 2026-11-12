import { Article, Service, Project } from '../types';

export const PROFILE_DATA = {
  displayName: 'M R S',
  fullName: 'M R S',
  username: 'mrxshahin',
  role: 'Founder, Web Manager & Remote Operations Specialist',
  headline: 'Remote IT Support, Virtual Assistance & Administrative Operations Specialist',
  subHeadline: 'I help businesses, entrepreneurs, and individuals simplify their daily operations, solve technical problems, manage digital tasks, and stay productive — without the overhead of hiring a full-time employee.',
  availability: 'Open for Remote Contracts, Consultations & Web Solutions',
  timezone: 'UTC+6 (Async Coverage Across US, UK, EU & APAC Time Zones)',
  languages: ['English (Professional)', 'Bengali (Native)'],
  experienceSince: '2018',
  gravatarUrl: 'https://gravatar.com/mrxshahin',
  phone: '+8809611056361',
  phoneFormatted: '+880 9611-056361',
  email: 'mr216873@gmail.com',
  calendlyUrl: 'https://calendly.com/mrxshahin',
  linkedinUrl: 'https://www.linkedin.com/in/mrmahbubur',
  twitterUrl: 'https://x.com/Mrshahinx',
  twitterHandle: '@Mrshahinx',
  blueskyUrl: 'https://bsky.app/profile/mrxshahin.bsky.social',
  blueskyHandle: 'mrxshahin.bsky.social',
  wordpressUrl: 'https://mrxshahin.wordpress.com',
  charityUrl: 'https://mrscharityfoundation.blogspot.com/',
  quote: 'If you want to build something big, you have to start with a small step.',
  aboutTitle: 'About M R S — Independent Digital Operations & Multiverse Mission',
  aboutParagraphs: [
    'I am M R S (@mrxshahin), an independent online entrepreneur, remote IT specialist, and web manager building practical digital systems since 2018. After completing a certified 360-Hour Computer Systems Course, I focused on bridging technical troubleshooting with everyday administrative and digital growth needs.',
    'Through MRS ADMIN and the broader M R S Multiverse, my focus is straightforward: give small businesses, solo founders, and students reliable guidance and hands-on support without unnecessary complexity or inflated agency overhead.',
    'Beyond client operations and web management, a portion of proceeds from custom services goes directly toward the M R S Charity Foundation — funding student scholarships, exam support, computer literacy workshops, and grassroots community relief.'
  ],
  coreValues: [
    {
      title: 'Accuracy & Clean Execution',
      detail: 'Structured spreadsheets, tested web layouts, and clear documentation delivered right the first time.'
    },
    {
      title: 'Asynchronous Global Readiness',
      detail: 'Reliable progress across international time zones with clear written updates and minimal back-and-forth.'
    },
    {
      title: 'Zero-Capital Student Empowerment',
      detail: 'Vetted, practical earning guides designed for students without upfront fees or misleading schemes.'
    },
    {
      title: 'Direct Owner Accountability',
      detail: 'Every task, CV, web setup, and support ticket is handled directly by M R S via WhatsApp, email, or Calendly.'
    }
  ],
  credentials: [
    { label: 'Certified', value: '360-Hour Computer Systems Course' },
    { label: 'Technical Writing', value: 'Authoring Guides & Docs Since 2018' },
    { label: 'Remote Experience', value: 'Multi-Year Independent Online Operations' },
    { label: 'Work Style', value: 'Self-Directed, Async-Ready & Detail-Oriented' }
  ],
  whyWorkWithMe: [
    'Accuracy, reliability, clear communication, and independent problem-solving.',
    'Comfortable working remotely, handling asynchronous tasks, and organizing workloads around agreed deadlines.',
    'Focus on understanding the desired outcome, finding a practical way to achieve it, and delivering organized work with minimal unnecessary back-and-forth.',
    'Comfortable working across multiple international time zones.'
  ]
};

export const BLOG_METADATA = {
  title: 'MRS ADMIN',
  tagline: 'M R S Multiverse — Digital Entrepreneurship & Web Resources',
  author: 'M R S',
  email: PROFILE_DATA.email,
  phone: PROFILE_DATA.phone,
  whatsappNumber: '8809611056361',
  charityUrl: PROFILE_DATA.charityUrl,
  techPortalUrl: 'https://mrxshahin.blogspot.com/',
  quote: PROFILE_DATA.quote
};

export const PROFESSIONAL_CAPABILITIES = [
  {
    id: 'it-support',
    icon: 'Monitor',
    title: 'IT Support & Technical Troubleshooting',
    badge: 'Core Specialty',
    summary: 'Hardware, software, OS diagnostics, and user support to keep systems running without downtime.',
    tasks: [
      'Windows PC troubleshooting and basic system maintenance',
      'Android device support and app-related troubleshooting',
      'Browser, internet connectivity, Wi-Fi, and software issues',
      'Software installation, configuration, and step-by-step guidance',
      'Technical documentation and remote user desk support'
    ]
  },
  {
    id: 'virtual-assistance',
    icon: 'CheckSquare',
    title: 'Virtual Assistance & Administrative Support',
    badge: 'Operations',
    summary: 'Free up your executive time with structured data organization, communications, and task coordination.',
    tasks: [
      'Data entry, data organization, and document formatting',
      'Microsoft Word, Excel, PowerPoint, and office productivity tasks',
      'Email management, professional correspondence, and inbox triage',
      'Online research, information collection, and data verification',
      'Form filling, job application assistance, and document preparation'
    ]
  },
  {
    id: 'web-management',
    icon: 'Globe',
    title: 'Website Management & Digital Content',
    badge: 'Web & CMS',
    summary: 'End-to-end administration for Blogger, WordPress, and custom websites to maximize speed and reach.',
    tasks: [
      'Website content updates and basic website administration',
      'Blog post publishing and responsive content formatting',
      'WordPress and Blogger content management',
      'SEO-friendly article writing and on-page content optimization',
      'Website testing, troubleshooting, and basic usability checks'
    ]
  },
  {
    id: 'technical-writing',
    icon: 'FileText',
    title: 'Technical Writing & Documentation',
    badge: 'Since 2018',
    summary: 'Translating complex technology, apps, and workflows into crystal-clear guides and knowledge bases.',
    tasks: [
      'Writing technology guides, tutorials, and how-to articles',
      'Creating step-by-step troubleshooting instructions',
      'Explaining websites, apps, and digital tools in simple language',
      'Preparing FAQs, user guides, and knowledge-base articles',
      'Rewriting, proofreading, and improving existing technical content'
    ]
  },
  {
    id: 'online-research',
    icon: 'Search',
    title: 'Online Research & Digital Problem-Solving',
    badge: 'Market Intel',
    summary: 'Curating vetted information, evaluating competitors, and testing tools for smart decision making.',
    tasks: [
      'Finding and evaluating online resources and vendor options',
      'Researching websites, apps, and technology solutions',
      'Comparing digital tools and identifying practical alternatives',
      'Organizing research findings into clear, useful executive reports',
      'Testing online services and documenting user experiences'
    ]
  },
  {
    id: 'ai-productivity',
    icon: 'Sparkles',
    title: 'AI Tools & Productivity Assistance',
    badge: 'Modern Stack',
    summary: 'Integrating practical AI tools and no-code workflows to accelerate content and research output.',
    tasks: [
      'Using modern AI tools to support research, writing, and content development',
      'Improving repetitive workflows with practical digital tools',
      'Assisting with AI-generated content review and human editing',
      'Developing detailed prompt systems for writing and research',
      'Exploring no-code and low-code solutions for business needs'
    ]
  },
  {
    id: 'social-media',
    icon: 'Share2',
    title: 'Social Media & Online Business Support',
    badge: 'Branding',
    summary: 'Keeping channels active, consistent, and aligned with your digital services.',
    tasks: [
      'Preparing social media posts, captions, and content descriptions',
      'Managing content schedules and organizing publishing materials',
      'Creating promotional copy for websites, apps, and digital services',
      'Assisting with basic online brand and content management',
      'Supporting digital projects through coordination and documentation'
    ]
  }
];

export const SERVICES: Service[] = [
  {
    id: 'remote-support',
    title: 'Remote IT Support & Technical Troubleshooting',
    tagline: 'Windows PC, Android, Software & Network Problem-Solving',
    description: 'Solve irritating technical roadblocks quickly. From Windows and Android diagnostics to software installations and step-by-step user documentation.',
    highlights: [
      'Windows PC maintenance and troubleshooting',
      'Android device issues and app diagnostics',
      'Browser, Wi-Fi, and software configurations',
      'Clear step-by-step guides so issues never recur'
    ],
    deliverables: ['Issue Resolution', 'Step-by-Step Fix Guide', 'Preventative Advice'],
    pricingHint: 'Hourly or Monthly Retainer Available',
    badge: 'Popular',
    whatsappPreset: 'Hi M R S, I need Remote IT Support for my system. Can we discuss?'
  },
  {
    id: 'virtual-assistant',
    title: 'Dedicated Virtual Assistance & Office Admin',
    tagline: 'Data entry, spreadsheets, email triage, and web research',
    description: 'Offload routine administrative and data operations. Clean spreadsheets, structured Word/PowerPoint decks, inbox organization, and reliable async communication.',
    highlights: [
      'Data entry, verification, and spreadsheet organization (Excel & Sheets)',
      'Email management, inbox zero triage, and correspondence',
      'Form filling, document preparation, and formatting',
      'Accurate, deadline-focused async execution across time zones'
    ],
    deliverables: ['Organized Sheets/Docs', 'Processed Inboxes', 'Daily/Weekly Status Log'],
    pricingHint: 'Flexible Part-time / Project-based',
    badge: 'High Value',
    whatsappPreset: 'Hello M R S, I am interested in your Virtual Assistance & Admin Support services.'
  },
  {
    id: 'cv-design',
    title: 'Advanced Professional CV & Resume Design',
    tagline: 'Tailored for recruiters, ATS parsers, and executive impact',
    description: 'Transform your career trajectory with a modern, ATS-friendly curriculum vitae designed to highlight your core achievements, hard skills, and unique personal brand.',
    highlights: [
      'ATS-Compliant layout that passes automated applicant scanners',
      'Custom typography and visual hierarchy tailored to your industry',
      'Editable formats: Print-ready PDF + editable Word/Docs file',
      'Rapid 24-48 hour turnaround with WhatsApp direct consultation'
    ],
    deliverables: ['Custom ATS PDF', 'Editable Source File', 'Cover Letter Template', 'LinkedIn Profile Tips'],
    pricingHint: 'Affordable Rates · Special Student Discounts Available',
    badge: 'Featured',
    whatsappPreset: 'Hi M R S, I would like to order an Advanced Professional CV. Please share the details and requirements!'
  },
  {
    id: 'blogspot-templates',
    title: 'Premium Blogspot & WordPress CMS Management',
    tagline: 'Ultra-fast, mobile-first themes, SEO tuning, and content publishing',
    description: 'Stop using bloated, broken themes. We manage blog formatting, repair mobile responsiveness issues, optimize on-page SEO, and provide clean custom templates.',
    highlights: [
      'Mobile-responsive with fluid touch navigation on ?m=1',
      'Clean schema markup for high Google Search rankings',
      'Routine article publishing, formatting, and usability audits',
      'Easy 1-click XML upload with comprehensive documentation'
    ],
    deliverables: ['Theme Remodel', 'SEO Audit', 'Content Management', 'Speed Optimization'],
    pricingHint: 'Project or Monthly Retainer',
    whatsappPreset: 'Hi M R S, I need assistance with my Blogspot / WordPress website management.'
  }
];

export const ARTICLES: Article[] = [
  {
    id: 'post-1',
    slug: 'welcome-to-mrs-multiverse',
    title: 'Hello, I’m M R S — Welcome to My Portfolio & Earning Ecosystem',
    excerpt: 'A dedicated online entrepreneur, web manager, and content creator passionate about empowering individuals to achieve their personal and financial goals through structured platforms.',
    category: 'Business Hub',
    publishedAt: 'Dec 16, 2025',
    readTime: '4 min read',
    featured: true,
    author: {
      name: 'M R S',
      role: 'Remote IT Support & Digital Creator'
    },
    tags: ['Entrepreneurship', 'Web Management', 'Passive Income', 'Ecosystem'],
    content: `
### Welcome to My Multiverse

A dedicated online entrepreneur, web manager, and content creator passionate about empowering individuals to achieve their personal and financial goals. Through my various websites and upcoming projects, I aim to provide accessible, valuable resources that can assist you at every stage of your journey.

Let me tell you more about what I do, the services I offer, and what you can look forward to in the future.

---

### About My Websites and Services

#### 1. Business Hub
This platform serves as your comprehensive guide to starting, managing, and growing your business. Whether you’re a beginner or an experienced entrepreneur, I share insights, strategies, and practical tips to help you succeed. My goal is to make entrepreneurship straightforward and achievable for everyone.

#### 2. Money-Making Platform
Earning online or through side gigs can be challenging without proper guidance. That’s why I created this platform — to share effective methods and strategies to help you increase your income. From simple side hustle ideas to more advanced earning techniques, I provide practical advice tailored for students, professionals, and anyone looking to boost their earnings.

#### 3. Learning & Tricks Corner
Continuous learning is key to growth. I regularly update this website with new tricks, tips, and skills that can help you improve your personal and professional life. This includes innovative online earning methods, personal development tips, and trending skills to help you stand out.

---

### Our Mission & Future Vision

My main objective is to make all these services as simple, accessible, and user-friendly as possible. To achieve this, I am developing an **advanced, AI-powered website** that will enhance your experience through personalized recommendations, faster navigation, and automated support. This upgrade aims to make accessing resources seamless and efficient, saving you time and effort.

---

### Supporting Students & Aspiring Earners

One of my core initiatives is creating **new earning tricks tailored for students**. I understand the financial challenges students face, and I want to provide practical, easy-to-implement methods that help them earn extra income while studying. These tricks are designed to be simple, quick, and effective, helping students gain financial independence and confidence to rise above challenges.

---

### Exciting Projects & Services Coming Soon

Innovation is my passion, and I have several exciting projects in development:

- **A Tracking App:** This app will allow you to keep your loved ones safe and connected. Whether it’s family, friends, or important contacts, this tool will help you monitor their location and stay in touch effortlessly, promoting safety and peace of mind.
- **More Websites & Tools:** I am continuously working on new platforms and tools focused on safety, earning opportunities, personal development, and more.

---

### Special Services Available Now

In addition to my websites and upcoming projects, I also offer some exclusive services to help you elevate your online presence and professional image:

1. **Create an Advanced, Professional CV:** Need a standout CV to impress employers or clients? I can help you design a professional, advanced CV that highlights your strengths and skills. You can get this service easily through WhatsApp — just send me a message, and I’ll assist you in creating a compelling CV tailored to your needs.
2. **Buy Blogspot Templates:** Want a stylish, professional Blogspot template? I offer a variety of customizable templates that you can purchase directly through WhatsApp. Whether you're starting a blog or a website, I have templates suitable for all niches.
3. **Customized Blogspot Templates:** Looking for a unique and personalized blog template? I also provide customized Blogspot templates tailored specifically to your branding and design preferences. Reach out via WhatsApp, and I’ll help you create a stunning, one-of-a-kind blog design.

---

### Let's Work Together

Thank you for visiting my portfolio. My mission is to provide valuable, easy-to-access resources and services that help you grow, succeed, and stay connected. Whether you're looking to start a business, earn extra income, learn new skills, or enhance your online presence, I’m here to support you every step of the way.

Feel free to explore my websites, take advantage of the services offered, and stay tuned for the exciting new projects coming soon. Let’s work together to make success more accessible for everyone!
`
  },
  {
    id: 'post-2',
    slug: 'student-earning-methods-zero-investment',
    title: 'Top 7 Legitimate Online Earning Methods for Students (Zero Upfront Cost)',
    excerpt: 'Practical, realistic, and tested ways for college and university students to earn between $150 to $600/month around flexible study hours without scams.',
    category: 'Student Earning',
    publishedAt: 'Jan 10, 2026',
    readTime: '6 min read',
    featured: true,
    author: {
      name: 'M R S',
      role: 'Student Earning Specialist'
    },
    tags: ['Students', 'Side Hustles', 'Zero Capital', 'Remote Work'],
    content: `
### Breaking Free from Student Budget Bottlenecks

As students, balancing coursework, exams, and living expenses can be overwhelming. The good news is the digital economy offers numerous legitimate ways to earn real income using only a laptop or smartphone and an internet connection.

Here are the top 7 vetted strategies that provide real value without requiring any upfront capital.

---

#### 1. Micro-Freelancing for Local Businesses
Small business owners often lack time to manage basic digital tasks — formatting documents, basic photo retouching, or inputting inventory data into Google Sheets.
- **How to start:** Reach out to local shops or online sellers offering 5 hours of remote task assistance.
- **Estimated earnings:** $8 - $15/hour.

#### 2. Academic & Study Notes Monetization
If you take organized, clear notes during lectures, those study resources hold immense value for classmates and junior batches.
- **Platforms:** Share summaries, cheat sheets, and exam prep blueprints on digital marketplaces or peer groups.
- **Key advantage:** Work once, earn repeatedly every semester.

#### 3. AI-Assisted Transcription and Proofreading
Content creators and podcasters constantly need transcripts cleaned up and checked for grammatical accuracy.
- **Tools:** Use automated speech-to-text tools to get a rough draft, then manually polish grammar, speaker tags, and timestamps.
- **Estimated earnings:** $12 - $22 per audio hour.

#### 4. Blogspot & Micro-Site Setup Services
Countless beginners want a clean blog but struggle with template installation, widget placement, and mobile styling.
- **How to start:** Learn the basics of Blogger XML and CSS (or leverage MRS Admin templates) and offer a $25 "Complete Blog Setup" package.

#### 5. Social Media Graphics & Thumbnail Design
YouTube creators and Instagram business accounts always need eye-catching thumbnails and carousel graphics.
- **Tools:** Canva Free, Figma, or open-source vector tools.
- **Key takeaway:** Consistency and understanding click-through rates will keep clients paying monthly retainers.

#### 6. Online Peer Tutoring & Language Practice
If you excel in mathematics, coding, science, or English fluency, tutoring school students online is one of the highest-paying flexible student jobs.
- **Rate:** $10 - $25/hour depending on subject complexity.

#### 7. Digital Asset Packs & Notion Templates
Create budgeting templates, student exam trackers, or social media planners once and distribute them with zero inventory overhead.

---

### Golden Rules for Student Earners
- **Protect your study hours:** Cap side work at 10-15 hours per week.
- **Avoid pay-to-work schemes:** Any gig asking for an "application fee" or "security deposit" is a scam.
- **Focus on compounding skills:** Choose side gigs that build skills applicable to your future career.
`
  },
  {
    id: 'post-3',
    slug: 'blogger-seo-mobile-optimization-mastery',
    title: 'Blogger SEO & Speed Mastery: Transforming Blogspot into a High-Performance Site',
    excerpt: 'Step-by-step techniques to eliminate slow scripts, fix broken mobile responsive layouts, and configure canonical meta tags for first-page search rankings.',
    category: 'Tech & Tricks',
    publishedAt: 'Feb 02, 2026',
    readTime: '5 min read',
    featured: false,
    author: {
      name: 'M R S',
      role: 'Web Manager & SEO Strategist'
    },
    tags: ['Blogger', 'SEO', 'Web Performance', 'Mobile Friendly'],
    content: `
### Why Most Blogspot Sites Lose Visitors on Mobile

Many Blogger templates look decent on desktop monitors, but completely break down when viewed on mobile phones via the default \`?m=1\` mobile switch. Leftover code from third-party themes introduces blocking CSS, uncompressed images, and clunky navigation.

Here is how you can transform your Blogspot site into a lighting-fast, mobile-friendly powerhouse.

---

#### 1. Defer or Eliminate Heavy Third-Party Scripts
Old Blogger templates often include Font Awesome 4.7 CDN scripts, outdated jQuery libraries, and clunky preloader animations that freeze the viewport on initial load.
- Remove preloader overlays with \`display:none !important;\`
- Switch to modern SVG icons or lightweight CDN fonts
- Always specify \`defer\` or \`async\` attributes on analytics scripts.

#### 2. Fix the Mobile Viewport Meta Tag
Ensure your template head contains the modern viewport declaration:
\`\`\`html
<meta content='width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=5' name='viewport'/>
\`\`\`
Without this, mobile browsers simulate desktop zoom, causing horizontal scrolling and poor Core Web Vitals.

#### 3. Optimize Image Sizes and Serve WebP
Instead of uploading raw 4000px camera photos, resize images to max 1200px width before uploading. Blogger's image CDN supports dynamic resizing parameters such as \`/w800/\` or \`/s800/\`.

#### 4. Clean Canonical Links and Social Graph Tags
Ensure your theme has dynamic canonical URLs and Open Graph meta tags so your posts look stunning when shared across WhatsApp, Facebook, and Twitter.

---

### Need Help Optimizing Your Website?
Check out our **Customized Web Services** right here on MRS ADMIN. We build fast, mobile-friendly layouts, configure responsive navigation, and boost page speeds.
`
  },
  {
    id: 'post-4',
    slug: 'business-hub-small-steps-to-scalable-ventures',
    title: 'The Digital Business Playbook: Moving from Side Hustles to Scalable Ventures',
    excerpt: 'Practical systems, mindset shifts, and operational habits needed to turn one-off freelancing gigs into a repeatable digital business.',
    category: 'Business Hub',
    publishedAt: 'Feb 24, 2026',
    readTime: '7 min read',
    featured: false,
    author: {
      name: 'M R S',
      role: 'Digital Entrepreneur'
    },
    tags: ['Business Growth', 'Scalability', 'Operations', 'Strategy'],
    content: `
### The Power of Small Steps

As our motto states: *"If you want to build something big, you have to start with a small step."*

Too many aspiring entrepreneurs wait for the "perfect idea" or large capital investment before taking action. In reality, modern digital entrepreneurship is built on rapid iteration, micro-experiments, and steady trust building.

---

#### Step 1: Identify One Specific Problem
Don't attempt to build an "everything store" or generic agency. Target a clear pain point:
- "Lawyers who need clean website landing pages"
- "Students preparing for overseas university applications who need formatted CVs"
- "Local restaurants needing WhatsApp ordering menus"

#### Step 2: Establish Direct Communication Channels
Email and WhatsApp remain the highest-converting communication channels worldwide. Providing direct, transparent, and respectful responses to clients wins over anonymous corporate forms every single time.

#### Step 3: Productize Your Service
Instead of billing hourly for ambiguous tasks, package your offering:
- Clear scope
- Guaranteed turnaround time
- Upfront fixed price

This builds immediate buyer confidence and eliminates pricing friction.
`
  },
  {
    id: 'post-5',
    slug: 'family-tracking-safety-tech-connectivity',
    title: 'The Architecture of Safety: Why We Are Building the Loved Ones Tracking App',
    excerpt: 'An inside look at our upcoming safety-first GPS tracking app designed to keep families connected with privacy, live geofencing, and panic alerts.',
    category: 'Future Tech',
    publishedAt: 'Mar 15, 2026',
    readTime: '4 min read',
    featured: false,
    author: {
      name: 'M R S',
      role: 'Project Lead & Product Manager'
    },
    tags: ['GPS Tracking', 'Family Safety', 'Mobile App', 'IoT'],
    content: `
### Keeping Your Loved Ones Safe and Connected

In an increasingly busy world, peace of mind regarding the safety of elderly parents, children, and close friends is invaluable. 

As part of the **M R S Multiverse** expansion, we are engineering a dedicated **Tracking App** built on three foundational pillars:

---

#### 1. Real-Time Accurate Location Sharing
Low-battery GPS streaming with intelligent background sync, giving family members instant visibility without draining smartphone batteries.

#### 2. Safe-Zone Geofencing Alerts
Set designated safe perimeters (school, home, workplace, commute routes). Receive an instant notification when a family member arrives or departs safely.

#### 3. One-Touch Emergency SOS
In any uncomfortable or urgent situation, a discrete 3-second long press sends live coordinates and emergency alerts to trusted guardians simultaneously.

---

### Privacy and Data Dignity
Unlike invasive tracking software that sells user analytics to advertisers, our app is built with end-to-end encryption. Your family's movement data belongs exclusively to you.

Join the early VIP waitlist below to test our upcoming closed beta!
`
  },
  {
    id: 'post-6',
    slug: 'passive-income-and-smart-money-habits',
    title: 'Passive Income Realities: Vetted Online Earning Avenues vs Shiny Traps',
    excerpt: 'Separating genuine online revenue streams like digital assets and affiliate marketing from get-rich-quick scams.',
    category: 'Money-Making',
    publishedAt: 'Mar 28, 2026',
    readTime: '5 min read',
    featured: false,
    author: {
      name: 'M R S',
      role: 'Financial Literacy Contributor'
    },
    tags: ['Passive Income', 'Financial Freedom', 'Smart Money', 'Affiliate'],
    content: `
### The Truth About "Passive" Income

Passive income is never 100% effortless from day one. It requires **upfront labor and strategy** that pays dividends over time. 

Understanding this distinction protects you from falling into online schemes that promise overnight wealth.

---

#### Realistic Passive Streams
1. **Evergreen Digital Templates**: Blogspot skins, resume layouts, spreadsheet trackers.
2. **Affiliate Content & Reviews**: High-intent tutorials recommending verified web hosts, tools, or books.
3. **Information Hubs**: Curated blogs answering niche search questions, monetized through display networks or sponsorships.

#### Red Flags to Avoid
- Demands for upfront "joining fees" or cryptocurrency transfer deposits.
- Claims of guaranteed 10% daily ROI.
- Systems requiring you to recruit 3 more people to make any profit.

Stick to creating genuine value for real people, and the financial returns will follow naturally.
`
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'tracking-app',
    title: 'Loved Ones Live Tracking App',
    subtitle: 'Safety, connectivity, and peace of mind for families',
    description: 'An advanced mobile application enabling real-time location tracking for family members and friends. Features smart safe-zone alerts, low-battery GPS monitoring, and emergency SOS triggers.',
    status: 'In Development',
    statusColor: 'amber',
    keyFeatures: [
      'Real-time GPS tracking with high privacy encryption',
      'Geofencing alerts when loved ones arrive at work or home',
      'Battery status monitoring of linked devices',
      'Instant panic/SOS broadcast with live route playback'
    ],
    ctaText: 'Join Closed Beta Waitlist',
    isWaitlist: true
  },
  {
    id: 'ai-portal',
    title: 'AI-Powered Earning & Content Hub',
    subtitle: 'Next-generation intelligent assistant for creators',
    description: 'A specialized platform offering automated blogging prompts, niche keyword research, and personalized earning strategy recommendations driven by smart AI logic.',
    status: 'Beta Preview',
    statusColor: 'emerald',
    keyFeatures: [
      'Personalized earning recommendations based on user skills',
      'Instant blog post structure and SEO keyword suggestions',
      'Interactive tools for student productivity and study planning'
    ],
    ctaText: 'Explore Features',
    isWaitlist: true
  },
  {
    id: 'charity-foundation',
    title: 'M R S Charity Foundation',
    subtitle: '“Poverty Ends With Us” — Humanity United Against Poverty',
    description: 'Our dedicated non-profit initiative focused on grassroots relief, student educational sponsorships, food drives, and empowering underprivileged youth with self-sustaining digital skills.',
    status: 'Live Foundation',
    statusColor: 'blue',
    keyFeatures: [
      'Direct student educational aid and examination sponsorships',
      'Community food drives and emergency winter assistance',
      'Free computer literacy and digital skill workshops',
      '100% transparent donation reports and photo audits'
    ],
    externalUrl: 'https://mrscharityfoundation.blogspot.com/',
    ctaText: 'Visit Charity Website',
    isWaitlist: false
  },
  {
    id: 'mrx-portal',
    title: 'MRX Shahin Tech Portal',
    subtitle: 'Free earning methods, legit website reviews & inspiring thoughts',
    description: 'A sister hub dedicated to in-depth technical tutorials, honest platform reviews, student side gigs, and motivational insights for aspiring digital pioneers.',
    status: 'Live Foundation',
    statusColor: 'indigo',
    keyFeatures: [
      'Daily curated free online earning methods',
      'Vetted legitimate website breakdowns',
      'Motivational insights and productivity frameworks'
    ],
    externalUrl: 'https://mrxshahin.blogspot.com/',
    ctaText: 'Visit MRX Shahin Portal',
    isWaitlist: false
  }
];

export const FAQS = [
  {
    q: 'What is M R S (mrxshahin) specializing in?',
    a: 'M R S provides Remote IT Support, Virtual Assistance, Administrative Support, Website Content Management (Blogger & WordPress), and Technical Writing for international clients, businesses, and entrepreneurs.'
  },
  {
    q: 'What are your certifications and background?',
    a: 'Certified with a 360-hour Computer Systems Course, actively publishing technology guides and how-to documentation since 2018, with years of independent remote work experience across multiple time zones.'
  },
  {
    q: 'How can I schedule a consultation or hire you?',
    a: 'You can book directly via Calendly (calendly.com/mrxshahin), send a message on WhatsApp (+880 9611-056361), or email mr216873@gmail.com.'
  },
  {
    q: 'Are your student earning methods really free?',
    a: 'Yes, 100%. Every guide published under the Student Initiative requires zero upfront financial capital. We strictly denounce pay-to-work schemes and referral traps.'
  }
];
