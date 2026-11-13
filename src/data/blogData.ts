import { Article, Service, Project } from '../types';

export const PROFILE_DATA = {
  displayName: 'M R S',
  fullName: 'M R S',
  username: 'mrxshahin',
  role: 'Founder, Web Manager & Remote Operations Specialist',
  headline: 'Remote IT Support, Virtual Assistance & Administrative Operations Specialist',
  subHeadline:
    'I help businesses, entrepreneurs, and individuals simplify their daily operations, solve technical problems, manage digital tasks, and stay productive — without the overhead of hiring a full-time employee.',
  availability: 'Open for Remote Contracts, Consultations & Web Solutions',
  timezone: 'UTC+6 · Available for Asynchronous Remote Collaboration',
  languages: ['English', 'Bengali'],
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
    'I am M R S (@mrxshahin), an online entrepreneur, web manager, and remote operations specialist authoring technical guides and supporting digital workflows since 2018, backed by a certified 360-Hour Computer Systems Course.',
    'Through MRS ADMIN and the M R S Multiverse ecosystem, my goal is straightforward: share practical business, side-income, and technology resources while providing direct remote IT troubleshooting, virtual assistance, website management, and professional CV design.',
    'Alongside client services, M R S supports the M R S Charity Foundation (“Poverty Ends With Us — Humanity United Against Poverty”), dedicated to helping underprivileged individuals and students.'
  ],
  coreValues: [
    {
      title: 'Accuracy & Clean Execution',
      detail: 'Structured spreadsheets, tested web layouts, and clear documentation delivered with careful attention to detail.'
    },
    {
      title: 'Asynchronous Remote Readiness',
      detail: 'Organized progress across international time zones with clear written updates and minimal back-and-forth.'
    },
    {
      title: 'Zero-Capital Student Guidance',
      detail: 'Practical earning guides and digital skill roadmaps for students without upfront fees or misleading schemes.'
    },
    {
      title: 'Direct Owner Communication',
      detail: 'Every task, CV, web setup, and support request is handled directly with M R S via WhatsApp, email, or Calendly.'
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
    summary: 'Hardware, software, OS diagnostics, and user support to keep systems running reliably.',
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
    summary: 'Free up your time with structured data organization, communications, and task coordination.',
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
    summary: 'Practical administration for Blogger, WordPress, and web portals to keep pages clean and responsive.',
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
    summary: 'Translating technology, apps, and workflows into clear guides and knowledge bases.',
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
    badge: 'Research',
    summary: 'Gathering reliable information, comparing digital tools, and organizing clear findings.',
    tasks: [
      'Finding and evaluating online resources and options',
      'Researching websites, apps, and technology solutions',
      'Comparing digital tools and identifying practical alternatives',
      'Organizing research findings into clear, useful reports',
      'Testing online services and documenting user experiences'
    ]
  },
  {
    id: 'ai-productivity',
    icon: 'Sparkles',
    title: 'AI Tools & Productivity Assistance',
    badge: 'Modern Stack',
    summary: 'Using practical AI tools and structured workflows to assist content, research, and daily tasks.',
    tasks: [
      'Using modern AI tools to support research, writing, and content development',
      'Improving repetitive workflows with practical digital tools',
      'Assisting with AI-generated content review and human editing',
      'Developing structured prompt systems for writing and research',
      'Exploring no-code and low-code solutions for business needs'
    ]
  },
  {
    id: 'social-media',
    icon: 'Share2',
    title: 'Social Media & Online Business Support',
    badge: 'Branding',
    summary: 'Supporting online channels with organized copy, schedules, and consistent messaging.',
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
    description:
      'Solve everyday technical roadblocks remotely. From Windows and Android troubleshooting to software setup and clear step-by-step user documentation.',
    highlights: [
      'Windows PC maintenance and troubleshooting',
      'Android device issues and app diagnostics',
      'Browser, Wi-Fi, and software configurations',
      'Clear step-by-step guides so issues are easier to manage'
    ],
    deliverables: ['Issue Resolution', 'Step-by-Step Guide', 'Follow-Up Notes'],
    pricingHint: 'Discussed directly per task scope via WhatsApp or Email',
    badge: 'Core Service',
    whatsappPreset: 'Hi M R S, I need Remote IT Support for my system. Can we discuss?'
  },
  {
    id: 'virtual-assistant',
    title: 'Dedicated Virtual Assistance & Office Admin',
    tagline: 'Data entry, spreadsheets, email triage, and web research',
    description:
      'Offload routine administrative and data tasks. Organized spreadsheets, structured Word/PowerPoint documents, inbox organization, and reliable async communication.',
    highlights: [
      'Data entry, verification, and spreadsheet organization (Excel & Sheets)',
      'Email management, inbox organization, and correspondence',
      'Form filling, document preparation, and formatting',
      'Accurate, deadline-focused asynchronous execution'
    ],
    deliverables: ['Organized Sheets/Docs', 'Inbox Support', 'Clear Status Updates'],
    pricingHint: 'Agreed directly per task or ongoing schedule',
    badge: 'Operations',
    whatsappPreset: 'Hello M R S, I am interested in your Virtual Assistance & Admin Support services.'
  },
  {
    id: 'cv-design',
    title: 'Advanced Professional CV & Resume Design',
    tagline: 'Structured for readability, ATS compatibility, and clear career presentation',
    description:
      'Get a clean, well-structured curriculum vitae tailored to highlight your education, experience, strengths, and practical skills.',
    highlights: [
      'Clean, ATS-friendly layout designed for modern applications',
      'Clear typography and structured section hierarchy',
      'Deliverables tailored directly to your requirements via WhatsApp',
      'Direct one-on-one consultation with M R S'
    ],
    deliverables: ['Custom CV Design', 'Print-Ready PDF', 'Editable Document'],
    pricingHint: 'Affordable rates discussed directly via WhatsApp',
    badge: 'Featured',
    whatsappPreset: 'Hi M R S, I would like to order an Advanced Professional CV. Please share the details and requirements!'
  },
  {
    id: 'blogspot-templates',
    title: 'Blogspot Templates & Website Management',
    tagline: 'Mobile-friendly Blogspot themes, customization, and content support',
    description:
      'Clean, responsive Blogspot templates and custom template styling tailored to your branding, plus ongoing Blogger and WordPress management.',
    highlights: [
      'Mobile-responsive layouts built to work cleanly on Blogger (?m=1)',
      'Custom Blogspot template styling tailored to your branding',
      'Routine article publishing, formatting, and usability checks',
      'Guided theme installation and layout troubleshooting'
    ],
    deliverables: ['Blogspot XML Theme', 'Customization Support', 'Content & SEO Checks'],
    pricingHint: 'Agreed directly via WhatsApp or Email',
    whatsappPreset: 'Hi M R S, I need assistance with Blogspot templates or website management.'
  }
];

export const ARTICLES: Article[] = [
  {
    id: 'post-1',
    slug: 'welcome-to-mrs-multiverse',
    title: 'Hello, I’m M R S — Welcome to My Portfolio & Earning Ecosystem',
    excerpt:
      'An online entrepreneur, web manager, and content creator focused on empowering individuals to achieve their personal and financial goals through accessible platforms.',
    category: 'Business Hub',
    publishedAt: 'Owner Overview',
    readTime: '4 min read',
    featured: true,
    author: {
      name: 'M R S',
      role: 'Founder & Web Manager'
    },
    tags: ['Entrepreneurship', 'Web Management', 'Multiverse', 'Services'],
    content: `
### Welcome to My Multiverse

I am an online entrepreneur, web manager, and content creator focused on helping individuals work toward their personal and financial goals. Through my websites and upcoming projects, my aim is to provide accessible, practical resources for every stage of your journey.

---

### About My Websites and Services

#### 1. Business Hub
A guide to starting, managing, and growing an online or small business. Whether you are just beginning or already managing projects, you will find straightforward strategies and practical tips.

#### 2. Money-Making Platform
Finding genuine online work or side gigs can be difficult without trustworthy direction. This pillar focuses on practical earning methods tailored for students, professionals, and individuals looking to build side income.

#### 3. Learning & Tricks Corner
Continuous learning supports long-term growth. This section covers practical digital tips, online skills, and technical workflows to help you work smarter.

---

### Mission & Future Vision

My primary objective is to keep resources simple, accessible, and user-friendly. As part of that roadmap, I am working toward AI-assisted tools for better navigation, personalized resource recommendations, and smoother user support.

---

### Supporting Students & Aspiring Earners

One of my core initiatives is sharing practical earning methods tailored for students — straightforward approaches that can be started alongside classes without requiring upfront capital.

---

### Projects in Planning & Services Available Now

- **Tracking App (Planned):** A project concept focused on helping families, friends, and loved ones stay connected and safe.
- **Custom Services Available Now:**
  1. **Advanced, Professional CV Design:** Tailored CVs arranged directly via WhatsApp.
  2. **Blogspot Templates:** Clean, responsive Blogspot templates available directly through WhatsApp.
  3. **Customized Blogspot Templates:** Personalized Blogspot layouts tailored to your branding and preferences.
`
  },
  {
    id: 'post-2',
    slug: 'student-earning-methods-zero-investment',
    title: 'Practical Online Earning Paths for Students (Zero Upfront Cost)',
    excerpt:
      'Realistic, skill-based ways for college and university students to build experience and earn around flexible study hours without paying upfront fees.',
    category: 'Student Earning',
    publishedAt: 'Student Guide',
    readTime: '5 min read',
    featured: true,
    author: {
      name: 'M R S',
      role: 'Founder & Web Manager'
    },
    tags: ['Students', 'Zero Capital', 'Remote Skills', 'Digital Work'],
    content: `
### Earning Alongside Your Studies

Balancing coursework, exams, and living expenses is challenging. The digital economy offers genuine ways to build skills and earn using a laptop or smartphone and an internet connection — without paying to join.

---

#### 1. Virtual & Micro-Freelance Assistance for Small Businesses
Many small business owners lack time for everyday digital tasks such as formatting documents, updating product lists, or organizing spreadsheets in Google Sheets and Excel.
- **How to start:** Practice clean document and spreadsheet formatting, create two sample files, and offer part-time remote assistance to local or online businesses.

#### 2. Organized Study Notes & Academic Summaries
Well-structured summaries, formula sheets, and lecture outlines save fellow students hours of review time.
- **Key advantage:** Builds deep mastery of your own coursework while helping peers.

#### 3. Transcription, Proofreading & Editing
Podcast hosts, YouTube creators, and bloggers regularly need transcripts cleaned up and articles proofread for grammar and clarity.
- **Tools:** Start with a plain text editor or Google Docs and focus on careful manual checking.

#### 4. Blogspot & Simple Website Setup
Many beginners want a clean blog or portfolio page but struggle with installing themes, fixing mobile layouts, and configuring menus.
- **How to start:** Learn Blogger Theme XML basics and mobile responsiveness checks so you can offer clean starter setups.

#### 5. Social Media Graphics & Thumbnails
Creators and small shops frequently need clean post graphics and thumbnails made with free tools like Canva or Figma.

#### 6. Online Peer Tutoring
If you perform well in mathematics, science, English, or programming, tutoring school students online fits naturally around university schedules.

---

### Golden Rules for Student Earners
- **Protect your study hours:** Keep side work balanced so coursework never suffers.
- **Avoid pay-to-work schemes:** Never pay an "application fee" or "security deposit" to receive work.
- **Build compounding skills:** Choose work that strengthens your long-term career profile.
`
  },
  {
    id: 'post-3',
    slug: 'blogger-seo-mobile-optimization-mastery',
    title: 'Blogger SEO & Mobile Optimization: Making Blogspot Fast and Clean',
    excerpt:
      'Practical steps to remove heavy scripts, fix broken mobile ?m=1 layouts, and configure clean meta tags on Blogger.',
    category: 'Tech & Tricks',
    publishedAt: 'Technical Guide',
    readTime: '5 min read',
    featured: false,
    author: {
      name: 'M R S',
      role: 'Web Manager'
    },
    tags: ['Blogger', 'SEO', 'Web Performance', 'Mobile Friendly'],
    content: `
### Why Older Blogspot Sites Struggle on Mobile

Many older Blogger templates look acceptable on desktop monitors but break down on phones via the \`?m=1\` mobile view due to blocking CSS, outdated scripts, or hanging preloader animations.

---

#### 1. Remove Hanging Preloaders and Heavy Scripts
Outdated themes often include preloader overlays and legacy JavaScript bundles that delay page rendering.
- Hide broken preloaders cleanly via CSS
- Remove unused third-party widgets and ad clutter
- Load only essential scripts with \`defer\` or \`async\` where appropriate

#### 2. Verify the Mobile Viewport Meta Tag
Ensure your Blogger XML head contains a proper viewport declaration:
\`\`\`html
<meta content='width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=5' name='viewport'/>
\`\`\`
Without this tag, mobile browsers render zoomed-out desktop widths and cause horizontal scrolling.

#### 3. Keep Layouts Clean and Typography Readable
Prioritize clear font sizing, sufficient line height, clean contrast, and lightweight CSS so articles load fast on mobile connections.

---

### Need Help With Your Blogspot Template?
Reach out via WhatsApp or the inquiry form if you need a clean Blogspot template or custom mobile-friendly styling.
`
  },
  {
    id: 'post-4',
    slug: 'business-hub-small-steps-to-scalable-ventures',
    title: 'Starting Small: Turning Practical Digital Skills into Reliable Services',
    excerpt:
      'Operational habits and clear communication principles for moving from one-off tasks to dependable remote client work.',
    category: 'Business Hub',
    publishedAt: 'Business Guide',
    readTime: '5 min read',
    featured: false,
    author: {
      name: 'M R S',
      role: 'Remote Operations Specialist'
    },
    tags: ['Business', 'Operations', 'Remote Work', 'Communication'],
    content: `
### The Power of Small Steps

As our guiding motto states: *"If you want to build something big, you have to start with a small step."*

Waiting for a perfect big idea often delays real progress. Sustainable online work comes from solving clear, everyday problems reliably.

---

#### Step 1: Solve One Clear Problem Well
Focus on specific tasks people genuinely need help with — such as fixing a slow PC, formatting an ATS-friendly CV, organizing messy spreadsheets, or repairing a broken blog layout.

#### Step 2: Keep Communication Direct and Clear
Direct channels like email, WhatsApp, and scheduled calls reduce confusion. Confirm expectations, deliverables, and timelines clearly before starting work.

#### Step 3: Document What You Deliver
Providing organized files and step-by-step instructions makes it easy for clients to trust your work and return when new tasks come up.
`
  },
  {
    id: 'post-5',
    slug: 'family-tracking-safety-tech-connectivity',
    title: 'Upcoming Project Vision: Keeping Loved Ones Safe and Connected',
    excerpt:
      'Overview of our planned tracking app concept aimed at helping families and friends stay connected with peace of mind.',
    category: 'Future Tech',
    publishedAt: 'Project Roadmap',
    readTime: '3 min read',
    featured: false,
    author: {
      name: 'M R S',
      role: 'Project Founder'
    },
    tags: ['Tracking App', 'Safety', 'Future Projects'],
    content: `
### Staying Connected With the People Who Matter

As part of the M R S Multiverse roadmap, one of the key projects in planning is a dedicated **Tracking App** designed to help families, friends, and important contacts stay connected and safe.

---

### Core Goal of the Project
- **Peace of Mind for Families:** Make it simple for trusted family members and loved ones to stay aware of each other’s safety.
- **User-Friendly Design:** Keep setup and daily use straightforward so non-technical users can use it comfortably.
- **Privacy Respect:** Build location connectivity around consent and trust rather than intrusive advertising.

Anyone interested in following progress or joining early testing once ready can register interest through the waitlist form on this site.
`
  },
  {
    id: 'post-6',
    slug: 'passive-income-and-smart-money-habits',
    title: 'Digital Income Realities: Separating Genuine Skills from Online Traps',
    excerpt:
      'How to spot misleading online income promises and focus on real digital assets, freelancing, and practical web skills.',
    category: 'Money-Making',
    publishedAt: 'Resource Guide',
    readTime: '4 min read',
    featured: false,
    author: {
      name: 'M R S',
      role: 'Content Creator'
    },
    tags: ['Digital Skills', 'Scam Prevention', 'Online Work'],
    content: `
### Real Value Comes Before Income

No legitimate online income stream works magically overnight. Whether you build web templates, write helpful guides, or provide remote administrative support, real results come from solving real problems consistently.

---

#### Practical Focus Areas
1. **Reusable Digital Work:** Templates, documentation, and organized digital resources.
2. **Client Services:** IT troubleshooting, virtual assistance, CV formatting, and CMS management.
3. **Helpful Web Content:** Clear, honest tutorials and tool guides written for real readers.

#### Red Flags to Avoid
- Requests for upfront "joining fees" or deposits to unlock tasks.
- Promises of guaranteed daily returns with zero skill or effort.
- Systems where earnings depend solely on recruiting other people.
`
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'tracking-app',
    title: 'Loved Ones Tracking App',
    subtitle: 'Planned safety & location connectivity tool for families and friends',
    description:
      'A planned application focused on helping families, friends, and trusted contacts stay connected and safe with straightforward location awareness.',
    status: 'Planned Project',
    statusColor: 'amber',
    keyFeatures: [
      'Designed around family & close-contact safety connectivity',
      'Simple, accessible interface for everyday users',
      'Consent-based sharing without ad clutter'
    ],
    ctaText: 'Register Interest / Waitlist',
    isWaitlist: true
  },
  {
    id: 'ai-portal',
    title: 'AI-Assisted Website & Resource Hub',
    subtitle: 'Planned smart navigation and personalized resource tools',
    description:
      'An upcoming upgrade aimed at making resource discovery, content navigation, and user guidance faster and more intuitive.',
    status: 'Planned Upgrade',
    statusColor: 'emerald',
    keyFeatures: [
      'Streamlined navigation to relevant guides and services',
      'Faster resource discovery for students and entrepreneurs',
      'Practical workflow & content tools'
    ],
    ctaText: 'Register Interest',
    isWaitlist: true
  },
  {
    id: 'charity-foundation',
    title: 'M R S Charity Foundation',
    subtitle: '“Poverty Ends With Us” — Humanity United Against Poverty',
    description:
      'Our dedicated non-profit initiative focused on supporting underprivileged individuals and helping students continue their education.',
    status: 'Live Foundation',
    statusColor: 'blue',
    keyFeatures: [
      'Guided by the mission: Humanity United Against Poverty',
      'Focused on supporting underprivileged families and students',
      'Official updates published on mrscharityfoundation.blogspot.com'
    ],
    externalUrl: 'https://mrscharityfoundation.blogspot.com/',
    ctaText: 'Visit Charity Website',
    isWaitlist: false
  },
  {
    id: 'mrx-portal',
    title: 'MRX Shahin Tech Portal',
    subtitle: 'Free earning methods, website reviews & technical guides',
    description:
      'A sister portal dedicated to practical tech tutorials, website reviews, student earning ideas, and motivational writing.',
    status: 'Live Portal',
    statusColor: 'indigo',
    keyFeatures: [
      'Practical online earning and skill guides',
      'Honest website and tool breakdowns',
      'Technology tips and motivational notes'
    ],
    externalUrl: 'https://mrxshahin.blogspot.com/',
    ctaText: 'Visit MRX Shahin Portal',
    isWaitlist: false
  }
];

export const FAQS = [
  {
    q: 'What does M R S (mrxshahin) specialize in?',
    a: 'M R S provides Remote IT Support, Virtual Assistance, Administrative Support, Website Content Management (Blogger & WordPress), Professional CV Design, and Technical Writing.'
  },
  {
    q: 'What are your credentials and background?',
    a: 'Certified with a 360-Hour Computer Systems Course, writing technical guides and managing web projects since 2018 across asynchronous remote workflows.'
  },
  {
    q: 'How can I schedule a consultation or hire you?',
    a: 'You can book directly via Calendly (calendly.com/mrxshahin), message on WhatsApp (+880 9611-056361), or email mr216873@gmail.com.'
  },
  {
    q: 'Are your student earning guides free to access?',
    a: 'Yes, 100%. All student guides focus on zero-upfront-cost methods and strictly warn against pay-to-work schemes.'
  }
];
