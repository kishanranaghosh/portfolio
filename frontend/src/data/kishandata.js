export const portfolioData = {
  personal: {
    name: "Kishan Rana Ghosh",
    title: "Full-Stack & Mobile Engineer",
    tagline:
      "I build scalable backend systems, modern mobile applications, and developer-focused products. Currently pursuing BS in Data Science at IIT Madras while exploring distributed systems, mobile engineering, and cloud-native applications.",
    email: "kishanghosh090@gmail.com",
    phone: "+91 9635859574",
    location: "Malda, West Bengal, India",
    github: "https://github.com/kishanranaghosh",
    linkedin: "https://www.linkedin.com/in/kishan-rana-ghosh-8b95832b9",
    portfolio: "https://kishanranaghosh.tech",
    leetcode: "https://leetcode.com/u/KishanRanaGhosh2005",
    resume: "../",
  },

  skills: [
    {
      id: 1,
      category: "Mobile Development",
      items: [
        "Kotlin",
        "Jetpack Compose",
        "Android SDK",
        "Coroutines",
        "ViewModel",
        "StateFlow",
        "SharedFlow",
        "Room Database",
        "Hilt",
        "Retrofit",
        "Coil",
        "Navigation Compose",
      ],
    },
    {
      id: 2,
      category: "Backend Development",
      items: [
        "Node.js",
        "Express.js",
        "REST APIs",
        "JWT Authentication",
        "Cookie Authentication",
        "Socket.IO",
        "Microservices Architecture",
        "gRPC",
        "Kafka",
        "API Design",
      ],
    },
    {
      id: 3,
      category: "Frontend Development",
      items: [
        "React",
        "Next.js",
        "TypeScript",
        "JavaScript",
        "Tailwind CSS",
        "Framer Motion",
        "Vite",
        "HTML5",
        "CSS3",
      ],
    },
    {
      id: 4,
      category: "Databases",
      items: ["MongoDB", "PostgreSQL", "MySQL", "SQLite", "Room Database"],
    },
    {
      id: 5,
      category: "Languages",
      items: [
        "JavaScript",
        "TypeScript",
        "Kotlin",
        "Java",
        "Python",
        "C++",
        "SQL",
      ],
    },
    {
      id: 6,
      category: "Tools & DevOps",
      items: [
        "Git",
        "GitHub",
        "Linux",
        "Arch Linux",
        "Docker",
        "Turborepo",
        "Postman",
        "VS Code",
        "Android Studio",
        "IntelliJ IDEA",
      ],
    },
  ],

  exploring: [
    "Spring Boot",
    "Distributed Systems",
    "Machine Learning",
    "Cloud Architecture",
    "System Design",
  ],

  projects: [
    {
      id: 1,
      name: "Venthen",
      featured: true,

      description:
        "A scalable multi-tenant campus management platform built for colleges and universities, providing a unified ecosystem for students, faculty, and administrators. Venthen combines academic management, attendance, communication, notifications, authentication, and institutional workflows with a production-oriented backend and dedicated mobile applications.",

      features: [
        "Multi-tenant SaaS architecture",
        "Hierarchical institution management",
        "Role-based access control (RBAC)",
        "Student, faculty, and administrator workflows",
        "Academic and semester management",
        "Attendance management",
        "Campus-wide announcements",
        "Real-time messaging and communication",
        "Push notification infrastructure",
        "Multi-device authentication and session management",
        "Background job processing",
        "Redis-based caching and presence",
        "Offline-capable mobile experience",
        "Media upload and processing pipeline",
        "Event-driven background workflows",
        "Containerized production infrastructure"
      ],

      tech: [
        "Go",
        "PostgreSQL",
        "Redis",
        "REST API",
        "JWT",
        "Docker",
        "Docker Compose",
        "Nginx",
        "Firebase Cloud Messaging",
        "Flutter",
        "Kotlin",
        "Jetpack Compose"
      ],

      status: "Currently Building",
      rating: "Featured Project",

      githubLink: "",
      liveLink: ""
    }
    ,
    {
      id: 2,
      name: "Venthen Space",
      featured: true,
      description:
        "A modern cloud storage and file management platform inspired by Dropbox, built to provide fast, organized, and reliable file storage with a clean web experience.",
      features: [
        "Cloud file storage",
        "File and folder management",
        "Drag-and-drop uploads",
        "Image and media previews",
        "File sharing",
        "Search and filtering",
        "Responsive web interface",
        "Optimized media delivery",
        "Modern dashboard experience",
      ],
      tech: [
        "Next.js",
        "TypeScript",
        "React",
        "ImageKit",
        "Hero UI",
        "Tailwind CSS",
      ],
      status: "Currently Building",
      rating: "Featured Project",
      githubLink: "https://github.com/kishanghosh090/dropbox",
      liveLink: "https://space.venthen.dev",
    },
    {
      id: 3,
      name: "Media Processing Pipeline",
      featured: true,
      description:
        "A reusable media processing pipeline for handling video uploads, transcoding, resolution management, HLS generation, and automated storage cleanup.",
      features: [
        "Video upload processing",
        "Video transcoding",
        "Custom resolution management",
        "HLS video generation",
        "Local storage management",
        "Automated storage cleanup",
        "Cloudinary integration",
        "AWS S3 integration",
        "Reusable NPM package",
      ],
      tech: ["Node.js", "TypeScript", "FFmpeg", "Cloudinary", "AWS S3", "NPM"],
      status: "Published",
      rating: "Featured Project",
      githubLink: "https://github.com/kishanghosh090/Media-Pipeline-sdk",
      liveLink: "https://mediasdk.venthen.dev",
    },
  ],

  education: [
    {
      id: 1,
      degree: "BS in Data Science and Applications",
      institution: "IIT Madras",
      year: "2024 – 2028",
      description:
        "Online degree focused on Data Science, Programming, Statistics, and Machine Learning.",
      highlights: [
        "Core coursework in Computer Science and Data Science",
        "Strong foundation in programming and problem-solving",
        "Hands-on projects in full-stack and Android development",
      ],
    },
    {
      id: 2,
      degree: "Bachelor of Science in Computer Science",
      institution: "Gour Mahavidyalaya",
      year: "2024 – Present",
      description: "Traditional undergraduate program in Computer Science.",
      highlights: [
        "Computer Science fundamentals",
        "Mathematics and algorithms",
      ],
    },
  ],

  certifications: [],

  experience: [
    {
      id: 1,
      title: "Web Developer Intern",
      company: "Blogrator Web Service",
      period: "2025 - present",
      description:
        "Worked on building and improving web applications with a focus on frontend development and backend integration.",
      achievements: [
        "Developed responsive web pages using modern JavaScript frameworks",
        "Integrated REST APIs and handled client-side data flow",
        "Collaborated with designers and backend developers to deliver features on time",
      ],
    },
  ],
};
