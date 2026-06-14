import { PortfolioData } from "./types";

export const INITIAL_PORTFOLIO_DATA: PortfolioData = {
  "logoText": "NAUFAL WEBSITE",
  "socials": {
    "github": "https://github.com",
    "linkedin": "https://linkedin.com",
    "twitter": "https://twitter.com"
  },
  "hero": {
    "badge": "Muhammad Naufal Yasir",
    "titlePart1": "FULL-STACK",
    "titlePart2": "DEVELOPER",
    "titlePart3": "",
    "subtitle": "Full-Stack Architect & Digital Craftsman. Turning complex logic into magical user experiences through technical transmutation.",
    "viewPortfolioText": "View Portfolio",
    "contactMeText": "Contact Me"
  },
  "about": {
    "title": "I am Naufal",
    "description": "I specialize Full Stack Programmer focused on developing innovative, scalable, and high-performance digital solutions. With expertise in both front-end and back-end development, he is capable of building responsive, secure, and user-centric web applications that deliver exceptional user experiences. Possessing strong analytical skills, a continuous learning mindset, and the ability to collaborate effectively in dynamic environments, he consistently stays up to date with emerging technologies to create solutions that support business growth and digital transformation. Committed to quality, innovation, and problem-solving, Muhammad Naufal is dedicated to delivering meaningful impact and becoming a valuable strategic asset for organizations striving for long-term success.",
    "portraitUrl": "/src/assets/images/regenerated_image_1781372787357.jpg",
    "valueCards": [
      {
        "id": "1",
        "iconName": "Clock",
        "text": "Time is the ultimate reagent.",
        "badgeText": "UI Architect"
      },
      {
        "id": "2",
        "iconName": "Eye",
        "text": "Detail-driven at every pixel.",
        "badgeText": "React Master"
      },
      {
        "id": "3",
        "iconName": "MessageSquare",
        "text": "Clarity in communication.",
        "badgeText": "Cloud Native"
      }
    ]
  },
  "skills": [
    {
      "id": "s1",
      "category": "Front-End",
      "skills": [
        {
          "id": "s1-1",
          "name": "React Vite",
          "percent": 95
        },
        {
          "id": "s1-2",
          "name": "Tailwind CSS",
          "percent": 98
        },
        {
          "id": "s1-3",
          "name": "TypeScript",
          "percent": 90
        }
      ]
    },
    {
      "id": "s2",
      "category": "Back-End",
      "skills": [
        {
          "id": "s2-1",
          "name": "Node.js",
          "percent": 88
        },
        {
          "id": "s2-2",
          "name": "PostgreSQL",
          "percent": 82
        },
        {
          "id": "s2-3",
          "name": "GraphQL",
          "percent": 85
        }
      ]
    },
    {
      "id": "s3",
      "category": "DevOps",
      "skills": [
        {
          "id": "s3-1",
          "name": "Docker",
          "percent": 88
        },
        {
          "id": "s3-3",
          "name": "GitHub",
          "percent": 75
        },
        {
          "id": "s3-2",
          "name": "Postman",
          "percent": 92
        }
      ]
    }
  ],
  "projects": [
    {
      "id": "p1",
      "title": "Synthetix Dashboard",
      "category": "FRONT-END",
      "imageUrl": "/src/assets/images/project_dashboard_1781369015641.jpg",
      "tags": [
        "React",
        "D3.js",
        "Tailwind"
      ],
      "description": "A high-performance system designed to aggregate and display decentralized digital assets, real-time indicators, and market fluctuations.",
      "situation": "A modern fintech client needed a cohesive dashboard to visualize volatile digital assets, market trajectories, and live feeds with minimal UI lag.",
      "task": "I was responsible for designing and building the front-end layout and real-time visualization widgets, ensuring clean rendering cycles above 60 FPS under intensive data streams.",
      "action": "Using React Vite and D3.js, I created highly responsive custom canvas charts. I implemented modular components styled with modern Tailwind CSS utilities and configured throttled data-streaming handlers.",
      "result": "Optimized browser canvas performance by 40%, delivering a ultra-smooth trading playground experience received warmly by over 50,000 active global traders."
    },
    {
      "id": "p2",
      "title": "Aetheria CMS",
      "category": "FULL-STACK",
      "imageUrl": "/src/assets/images/project_cms_1781369028960.jpg",
      "tags": [
        "Next.js",
        "Prisma",
        "PostgreSQL"
      ],
      "description": "A blazing fast, creative-centric headless CMS engine featuring a declarative content builder and nested layout routers.",
      "situation": "Marketing and creative agencies found existing database web portals slow and inflexible for managing multi-dimensional campaigns.",
      "task": "Directly tasked with building the schema structure, dynamic drag-and-drop layout components, and background content caching APIs.",
      "action": "Built utilizing Next.js, Prisma, and PostgreSQL. Engineered custom key-value caching nodes and optimized SQL indices to accelerate common REST queries.",
      "result": "Accelerated API response times by 70%, enabling creative designers to publish modern product campaigns in hours instead of days."
    },
    {
      "id": "p3",
      "title": "Void Mobile App",
      "category": "MOBILE",
      "imageUrl": "/src/assets/images/project_mobile_1781369045030.jpg",
      "tags": [
        "React Native",
        "Expo",
        "Reanimated"
      ],
      "description": "A clean, distraction-free mobile portal focused on breathing-automation loops and minimal sensory wellness.",
      "situation": "Mobile users reported feeling overwhelmed by health trackers cluttered with telemetry, background alerts, and aggressive social prompts.",
      "task": "Tasked with delivering a clean user interface focusing entirely on relaxing timer sequences and rhythmic breathing exercises.",
      "action": "Developed in React Native alongside Expo. Leveraged Reanimated to ensure seamless tactile gestures, organic screen transitions, and low-latency audio sync.",
      "result": "Achieved a 50% decrease in program registration drop-off rates, gaining high ratings for user interface simplicity and eye comfort."
    },
    {
      "id": "p5",
      "title": "Cloud-Based Smart Health Tracker",
      "category": "FULL-STACK",
      "imageUrl": "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=600",
      "tags": [
        "Next.js",
        "GraphQL",
        "PostgreSQL",
        "Docker"
      ],
      "description": "A comprehensive health portal designed to aggregate and visualize personal fitness metrics and real-time medical sensor data.",
      "situation": "A healthcare startup targeted a cohesive portal for users and medical practitioners to securely share, monitor, and gain automated insights from wearable IoT sensors and diagnostic results.",
      "task": "I spearheaded the development of the real-time sensor aggregation pipeline, interactive patient dashboard, and end-to-end HIPAA-compliant database synchronization.",
      "action": "Utilizing GraphQL subscriptions for sub-second updates and D3.js for responsive metric visualization charts. Configured an optimized PostgreSQL database running in Docker with strict encryption keys and containerized local services.",
      "result": "Successfully reduced patient telemetry aggregation latency by 50% and supported the onboarding of over 12,000 active trial patients with positive feedback on data clarity."
    },
    {
      "id": "p6",
      "title": "Aetheria Smart Home IoT Hub",
      "category": "MOBILE",
      "imageUrl": "https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=600",
      "tags": [
        "React Native",
        "Expo",
        "WebSockets",
        "Node.js"
      ],
      "description": "A tranquil mobile companion dashboard offering sub-second sensory control and automation of smart home devices.",
      "situation": "Legacy smart home automation apps were cluttered, delayed, and suffered from fragmented compatibility issues between different manufacturers' APIs.",
      "task": "My objective was to build a distraction-free mobile interface with reliable sub-second status updates, smooth tactile feedback, and intuitive scene configuration.",
      "action": "Engineered utilizing React Native with Expo and Reanimated for sleek, organic sliding transitions and sensory UI cues. Connected local devices via raw WebSockets integrated with a lightweight Express server for near-zero network friction.",
      "result": "Deployed to App & Play Stores with a 4.8-star user rating. Users noted a 40% improvement in load times and highly praised the minimal, distraction-free aesthetic."
    }
  ],
  "experience": [
    {
      "id": "e1",
      "role": "Lead UI Architect",
      "company": "Nebula Corporation | 2021 - Present",
      "period": "2021 - Present",
      "description": "Spearheaded the development of a modular design system used across 15+ enterprise applications, reducing UI development time by 40% while ensuring pixel-perfect consistency."
    },
    {
      "id": "e2",
      "role": "Senior Full-Stack Developer",
      "company": "Etheric Labs | 2018 - 2021",
      "period": "2018 - 2021",
      "description": "Architected a distributed real-time analytics engine processing over 1M events daily. Optimized data ingestion pipelines resulting in a 30% reduction in server costs."
    }
  ],
  "testimonials": [
    {
      "id": "t1",
      "text": "Seorang Master of Coder tidak hanya mahir dalam menulis kode, tetapi juga mampu menciptakan pengalaman digital yang lebih baik. Kontribusinya membawa perubahan besar pada platform kami, menjadikannya lebih cepat, lebih efisien, dan lebih nyaman digunakan dalam waktu yang singkat.",
      "author": "Prabowo",
      "initials": "MBG",
      "role": "CTO, NEBULA"
    },
    {
      "id": "t2",
      "text": "Tidak mudah menemukan seorang developer yang memiliki pemahaman yang sama kuat terhadap aspek estetika maupun logika. Bekerja bersama mereka memberikan pengalaman yang mengesankan, karena setiap solusi yang dihadirkan selalu memadukan keindahan desain dengan ketepatan teknis.",
      "author": "Bahlil",
      "initials": "B",
      "role": "LEAD DESIGNER, FLUX"
    },
    {
      "id": "t3",
      "text": "Ketelitian mereka melampaui sekadar presisi. Setiap detail memiliki tujuan, dan setiap baris kode dioptimalkan untuk menghadirkan performa yang cepat, efisien, dan berkualitas tinggi.",
      "author": "Teddy",
      "initials": "T",
      "role": "FOUNDER, VOID"
    }
  ]
};
