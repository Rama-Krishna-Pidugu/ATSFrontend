// Mock data types
export interface Candidate {
  id: number;
  name: string;
  skills: string[];
  experience: string;
  education: string;
  contact: {
    email: string;
    phone: string;
    location: string;
  };
  summary: string;
  similarity_score: number;
  matchScore?: number;
}

export interface Education {
  degree: string;
  institution: string;
  year: string;
}

export interface WorkExperience {
  title: string;
  company: string;
  duration: string;
  description: string[];
}

// Generate mock candidates
export const mockCandidates: Candidate[] = [
  {
    id: 1,
    name: "Rahul Sharma",
    skills: ["React", "Node.js", "TypeScript", "MongoDB", "AWS"],
    experience: "6 years",
    education: "B.Tech in Computer Science, IIT Delhi, 2017",
    contact: {
      email: "rahul.sharma@example.com",
      phone: "+91 9876543210",
      location: "Bangalore"
    },
    summary: "Senior Frontend Developer at Tech Solutions Inc. and Frontend Developer at WebCraft",
    similarity_score: 92
  },
  {
    id: 2,
    name: "Priya Patel",
    skills: ["JavaScript", "React", "Node.js", "Express", "PostgreSQL"],
    experience: "4 years",
    education: "M.Tech in Information Technology, BITS Pilani, 2019",
    contact: {
      email: "priya.patel@example.com",
      phone: "+91 9876543211",
      location: "Hyderabad"
    },
    summary: "Full Stack Developer at InnovateTech",
    similarity_score: 85
  },
  {
    id: 3,
    name: "Aditya Kumar",
    skills: ["Java", "Spring Boot", "Hibernate", "MySQL", "Docker", "React"],
    experience: "7 years",
    education: "B.E in Information Technology, Pune University, 2016",
    contact: {
      email: "aditya.kumar@example.com",
      phone: "+91 9876543212",
      location: "Pune"
    },
    summary: "Senior Backend Developer at Enterprise Solutions and Java Developer at Tech Innovate",
    similarity_score: 78
  },
  {
    id: 4,
    name: "Neha Gupta",
    skills: ["React", "Redux", "JavaScript", "CSS", "Figma", "UI/UX"],
    experience: "5 years",
    education: "B.Des in User Experience Design, NID Ahmedabad, 2018",
    contact: {
      email: "neha.gupta@example.com",
      phone: "+91 9876543213",
      location: "Bangalore"
    },
    summary: "UI/UX Developer at Creative Design Studio and Frontend Developer at Digital Solutions",
    similarity_score: 88
  },
  {
    id: 5,
    name: "Vikram Singh",
    skills: ["Python", "Django", "Flask", "React", "AWS", "Docker"],
    experience: "8 years",
    education: "M.S. in Computer Science, Stanford University, 2015",
    contact: {
      email: "vikram.singh@example.com",
      phone: "+91 9876543214",
      location: "Mumbai"
    },
    summary: "Technical Lead at Global Tech Solutions and Senior Developer at Innovation Labs",
    similarity_score: 94
  },
];

// Mock skill distribution for dashboard
export const skillDistribution = [
  { name: "React", value: 65 },
  { name: "JavaScript", value: 80 },
  { name: "Node.js", value: 45 },
  { name: "TypeScript", value: 40 },
  { name: "Python", value: 30 },
  { name: "Java", value: 25 },
  { name: "AWS", value: 35 },
  { name: "Docker", value: 20 },
  { name: "MongoDB", value: 15 },
  { name: "PostgreSQL", value: 10 },
];

// Mock experience distribution for dashboard
export const experienceDistribution = [
  { name: "0-2 years", value: 15 },
  { name: "3-5 years", value: 30 },
  { name: "6-8 years", value: 25 },
  { name: "9-12 years", value: 20 },
  { name: "13+ years", value: 10 },
];

// Mock location distribution for dashboard
export const locationDistribution = [
  { name: "Bangalore", value: 40 },
  { name: "Mumbai", value: 20 },
  { name: "Hyderabad", value: 15 },
  { name: "Pune", value: 12 },
  { name: "Delhi", value: 8 },
  { name: "Chennai", value: 5 },
];

// Mock skill gaps for dashboard
export const skillGaps = [
  "30% of candidates lack Docker knowledge for DevOps roles",
  "Only 25% of React developers have experience with Next.js",
  "75% of backend developers lack cloud infrastructure experience",
  "Only 20% of candidates have experience with GraphQL"
];

// Mock screening questions based on skills
export const getScreeningQuestions = (skills: string[]) => {
  const questionBank = {
    "Microsoft Office": [
      "How do you use Excel for financial analysis and reporting?",
      "What advanced features of Microsoft Office have you used for financial modeling?",
      "How do you ensure data accuracy when working with large datasets in Excel?",
      "Describe your experience with creating automated reports using Microsoft Office tools"
    ],
    "Power BI": [
      "How do you create interactive dashboards in Power BI?",
      "What DAX formulas have you used for financial calculations?",
      "How do you handle data refresh and scheduling in Power BI?",
      "Describe your experience with Power BI data modeling"
    ],
    "Odoo ERP": [
      "What modules of Odoo have you worked with?",
      "How do you handle financial transactions in Odoo?",
      "Describe your experience with Odoo reporting and analytics",
      "How do you ensure data integrity in Odoo?"
    ],
    "SAP FICO": [
      "What are the key components of SAP FICO?",
      "How do you handle month-end closing in SAP?",
      "Describe your experience with SAP financial reporting",
      "How do you manage cost centers and profit centers in SAP?"
    ]
  };

  const questions: string[] = [];

  skills.forEach(skill => {
    const skillQuestions = questionBank[skill as keyof typeof questionBank];
    if (skillQuestions) {
      questions.push(...skillQuestions.slice(0, 2)); // Get first two questions for each skill
    }
  });

  return questions.slice(0, 5); // Return max 5 questions
};

// Mock outreach templates
export const getOutreachTemplate = (candidate: any) => {
  const { name, skills, contact } = candidate;
  const topSkills = skills.slice(0, 3).join(", ");
  
  return `Hi ${name},

I came across your profile and was impressed by your experience with ${topSkills}. Our client is hiring in ${contact.location} and I believe your skills would be a great fit.

We're looking for someone to join a dynamic team working on innovative projects. The role offers competitive compensation, flexibility, and opportunities for growth.

Would you be open to a quick call this week to discuss this opportunity further? If so, please suggest a convenient time.

Looking forward to connecting!

Best regards,
AI Recruiter
PeopleGPT`;
};
