import { PortfolioCard } from './PortfolioCard';

const projects = [
  {
    id: 1,
    name: "Fashion Forward",
    year: "2024",
    type: "Photography",
    client: "Vogue Studio",
    image: "https://images.unsplash.com/photo-1571513722275-4b41940f54b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzYzOTc0MzQ4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: 2,
    name: "Urban Lines",
    year: "2024",
    type: "Product Design",
    client: "Minimal Co.",
    image: "https://images.unsplash.com/photo-1600869009498-8d429f88d4f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9kdWN0JTIwZGVzaWdufGVufDF8fHx8MTc2MzkwMzczNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: 3,
    name: "Nordic Architecture",
    year: "2023",
    type: "Architecture",
    client: "Nordic Build",
    image: "https://images.unsplash.com/photo-1663940019982-c14294717dbd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmNoaXRlY3R1cmUlMjBidWlsZGluZ3xlbnwxfHx8fDE3NjM5MTcyMzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: 4,
    name: "Creative Space",
    year: "2024",
    type: "Interior Design",
    client: "Studio Lab",
    image: "https://images.unsplash.com/photo-1554941829-202a0b2403b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMHN0dWRpb3xlbnwxfHx8fDE3NjM5NzU5OTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: 5,
    name: "Brand Evolution",
    year: "2023",
    type: "Branding",
    client: "Modern Corp",
    image: "https://images.unsplash.com/photo-1548094990-c16ca90f1f0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmFuZGluZyUyMGRlc2lnbnxlbnwxfHx8fDE3NjM5MTE2NTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: 6,
    name: "Luxury Living",
    year: "2024",
    type: "Interior Design",
    client: "Elite Homes",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnRlcmlvciUyMGRlc2lnbnxlbnwxfHx8fDE3NjM5MTkzNDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: 7,
    name: "Pure Essence",
    year: "2023",
    type: "Packaging",
    client: "Essence Beauty",
    image: "https://images.unsplash.com/photo-1720762224315-439072aa22c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYWNrYWdpbmclMjBkZXNpZ258ZW58MXx8fHwxNzYzOTYwNzYyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: 8,
    name: "Digital Realm",
    year: "2024",
    type: "Digital Art",
    client: "Meta Studios",
    image: "https://images.unsplash.com/photo-1634986666676-ec8fd927c23d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwYXJ0fGVufDF8fHx8MTc2MzkwOTA4Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: 9,
    name: "Minimalist Vision",
    year: "2023",
    type: "Photography",
    client: "Frame Gallery",
    image: "https://images.unsplash.com/photo-1643649215570-6f61cddc3acf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwcGhvdG9ncmFwaHl8ZW58MXx8fHwxNzYzOTcyNjg3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: 10,
    name: "Digital Interface",
    year: "2024",
    type: "Web Design",
    client: "Tech Innovate",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXNpZ258ZW58MXx8fHwxNzYzOTI2Njc2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: 11,
    name: "Visual Identity",
    year: "2023",
    type: "Graphic Design",
    client: "Brand Lab",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFwaGljJTIwZGVzaWdufGVufDF8fHx8MTc2MzkwMTc3Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: 12,
    name: "Magazine Spread",
    year: "2024",
    type: "Editorial",
    client: "Design Weekly",
    image: "https://images.unsplash.com/photo-1617050318658-a9a3175e34cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZGl0b3JpYWwlMjBkZXNpZ258ZW58MXx8fHwxNzYzOTc3MDY5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: 13,
    name: "Art Direction",
    year: "2023",
    type: "Creative Direction",
    client: "Vision Agency",
    image: "https://images.unsplash.com/photo-1536662788222-6927ce05daea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnQlMjBkaXJlY3Rpb258ZW58MXx8fHwxNzYzOTc3MDY5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: 14,
    name: "Brand System",
    year: "2024",
    type: "Brand Identity",
    client: "Start Co.",
    image: "https://images.unsplash.com/photo-1614036634955-ae5e90f9b9eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmFuZCUyMGlkZW50aXR5fGVufDF8fHx8MTc2Mzk3NzA3MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: 15,
    name: "Light & Shadow",
    year: "2023",
    type: "Photography",
    client: "Art Collective",
    image: "https://images.unsplash.com/photo-1586734073732-fd664fbd85c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMHBob3RvZ3JhcGh5fGVufDF8fHx8MTc2Mzk2NjI3NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: 16,
    name: "Studio Culture",
    year: "2024",
    type: "Brand Photography",
    client: "Design Studio",
    image: "https://images.unsplash.com/photo-1510074377623-8cf13fb86c08?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ24lMjBzdHVkaW98ZW58MXx8fHwxNzYzOTMxODk2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  }
];

interface PortfolioGridProps {
  onProjectClick: (project: { name: string; year: string; type: string; client: string }) => void;
}

export function PortfolioGrid({ onProjectClick }: PortfolioGridProps) {
  return (
    <div className="grid grid-cols-4 gap-6">
      {projects.map((project) => (
        <PortfolioCard 
          key={project.id} 
          project={project} 
          onClick={() => onProjectClick(project)}
        />
      ))}
    </div>
  );
}