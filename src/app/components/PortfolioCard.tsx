import { useState } from 'react';

interface Project {
  id: number;
  name: string;
  year: string;
  type: string;
  client: string;
  image: string;
}

interface PortfolioCardProps {
  project: Project;
  onClick: () => void;
}

export function PortfolioCard({ project, onClick }: PortfolioCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative aspect-square overflow-hidden bg-gray-100 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* Thumbnail Image */}
      <img
        src={project.image}
        alt={project.name}
        className="w-full h-full object-cover"
      />

      {/* Hover Overlay */}
      <div
        className={`absolute inset-0 bg-black/70 flex flex-col justify-between text-white transition-opacity duration-300 p-6 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Year - Top Right */}
        <div className="flex justify-end">
          <div className="text-sm text-gray-300">{project.year}</div>
        </div>

        {/* Project Info - Bottom Left */}
        <div>
          <div className="mb-1">{project.name}</div>
          <div className="text-sm text-gray-300">Branding and Identity</div>
        </div>
      </div>
    </div>
  );
}