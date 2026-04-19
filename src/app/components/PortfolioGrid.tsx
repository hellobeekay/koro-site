import { PortfolioCard } from './PortfolioCard';
import { COFFEE_PRODUCT_IMAGES } from '../content/coffeeProductImages';

const projects = [
  {
    id: 1,
    name: "Morning Ritual",
    year: "2024",
    type: "Brand",
    client: "Roast & Co.",
    image: COFFEE_PRODUCT_IMAGES[0]
  },
  {
    id: 2,
    name: "Single Origin",
    year: "2024",
    type: "Packaging",
    client: "Highland Beans",
    image: COFFEE_PRODUCT_IMAGES[1]
  },
  {
    id: 3,
    name: "Bean to Cup",
    year: "2023",
    type: "Campaign",
    client: "Artisan Roasters",
    image: COFFEE_PRODUCT_IMAGES[2]
  },
  {
    id: 4,
    name: "Cold Brew Line",
    year: "2024",
    type: "Product",
    client: "Urban Café Lab",
    image: COFFEE_PRODUCT_IMAGES[3]
  },
  {
    id: 5,
    name: "House Blend",
    year: "2023",
    type: "Identity",
    client: "Neighborhood Roastery",
    image: COFFEE_PRODUCT_IMAGES[4]
  },
  {
    id: 6,
    name: "Espresso Bar",
    year: "2024",
    type: "Spatial",
    client: "Third Wave Collective",
    image: COFFEE_PRODUCT_IMAGES[5]
  },
  {
    id: 7,
    name: "Nitro Series",
    year: "2024",
    type: "Launch",
    client: "Cascade Coffee",
    image: COFFEE_PRODUCT_IMAGES[0]
  },
  {
    id: 8,
    name: "Cupping Room",
    year: "2023",
    type: "Photography",
    client: "Terroir Lab",
    image: COFFEE_PRODUCT_IMAGES[1]
  },
  {
    id: 9,
    name: "Pour-Over Kit",
    year: "2024",
    type: "E-commerce",
    client: "Slow Drip Co.",
    image: COFFEE_PRODUCT_IMAGES[2]
  },
  {
    id: 10,
    name: "Micro-Lot",
    year: "2023",
    type: "Editorial",
    client: "Altitude Roasters",
    image: COFFEE_PRODUCT_IMAGES[3]
  },
  {
    id: 11,
    name: "Café Identity",
    year: "2024",
    type: "Branding",
    client: "Main Street Espresso",
    image: COFFEE_PRODUCT_IMAGES[4]
  },
  {
    id: 12,
    name: "Subscription Box",
    year: "2024",
    type: "Packaging",
    client: "Post Roast Club",
    image: COFFEE_PRODUCT_IMAGES[5]
  },
  {
    id: 13,
    name: "Roastery Tour",
    year: "2023",
    type: "Content",
    client: "Green Bean Media",
    image: COFFEE_PRODUCT_IMAGES[0]
  },
  {
    id: 14,
    name: "Latte Series",
    year: "2024",
    type: "Social",
    client: "Velvet Foam Studio",
    image: COFFEE_PRODUCT_IMAGES[1]
  },
  {
    id: 15,
    name: "Decaf Reserve",
    year: "2023",
    type: "Product",
    client: "Night Owl Roasters",
    image: COFFEE_PRODUCT_IMAGES[2]
  },
  {
    id: 16,
    name: "Barista Tools",
    year: "2024",
    type: "Industrial",
    client: "Steel & Steam",
    image: COFFEE_PRODUCT_IMAGES[3]
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