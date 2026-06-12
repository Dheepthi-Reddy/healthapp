export interface Book {
  title: string;
  author: string;
  slug: string;
}

export interface Founder {
  id: string;
  name: string;
  photo?: string;
  slug: string;
  title: string;
  credentials: string[];
  specialty: string;
  bio: string;
  emoji: string;
  color: string;
  bg: string;
  linkedin?: string;
  instagram?: string;
  email?: string;
  initials: string;
  books?: Book[];
}

export const founders: Founder[] = [
  {
    id: "manmitha",
    name: "Dr. Manmitha Reddy",
    photo: "/images/manmitha.jpeg",
    slug: "manmitha",
    title: "Pulmonologist & Cardiologist",
    credentials: ["MD", "Pulmonologist", "Sr. DM Cardiology"],
    specialty: "Respiratory & Cardiovascular Health",
    bio: "Dr. Manmitha Reddy is a senior cardiologist and pulmonologist with extensive experience in diagnosing and treating complex cardiovascular and respiratory conditions. She is passionate about preventive care and helping patients understand their heart and lung health.",
    emoji: "🫀",
    color: "#A32D2D",
    bg: "#FCEBEB",
    linkedin: "https://www.linkedin.com/in/manmitha-reddy-vangeti-29b850336/",   
    instagram: "",
    email: "",
    initials: "MR",
    books: [
      {
        title: "Through the Doors of Life",
        author: "Dr. Manmitha Reddy",
        slug: "through-the-doors-of-life",
      },
    ],
  },
  {
    id: "srikanth",
    name: "Dr. Srikanth Reddy",
    slug: "srikanth",
    title: "General Surgeon & Urologist",
    credentials: ["MS", "General Surgeon", "Sr. MCh Urology"],
    specialty: "General Surgery & Urology",
    bio: "Dr. Srikanth Reddy is a senior urologist and general surgeon specialising in minimally invasive surgical techniques. With years of clinical experience, he is dedicated to delivering precise, patient-centred surgical care.",
    emoji: "⚕️",
    color: "#185FA5",
    bg: "#E6F1FB",
    linkedin: "https://linkedin.com/in/srikanth-reddy",   
    instagram: "",
    email: "",
    initials: "SR"
  },
  {
    id: "dheepthi",
    name: "Ms. Dheepthi Reddy",
    photo: "/images/dheepthi.jpeg",
    slug: "dheepthi",
    title: "Health Data Scientist",
    credentials: ["MS Data Science"],
    specialty: "Health Technology & Data Science",
    bio: "Dheepthi Reddy bridges the gap between clinical medicine and modern technology. With a Master's in Data Science, she leads the platform's AI and data initiatives — building tools that make health insights accessible, accurate, and actionable for everyone.",
    emoji: "💡",
    color: "#0F6E56",
    bg: "#E1F5EE",
    linkedin: "https://linkedin.com/in/dheepthi-reddyv",    
    instagram: "",
    email: "",
    initials: "DR"
  },
];