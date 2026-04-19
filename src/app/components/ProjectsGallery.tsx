import { useRef, useState } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Project {
  id: number;
  name: string;
  client: string;
  year: string;
  services: string[];
  image: string;
}

const projects: Project[] = [
  {
    id: 1,
    name: 'Brand Evolution',
    client: 'Tech Startup Inc.',
    year: '2024',
    services: ['Branding', 'Strategy'],
    image: 'https://images.unsplash.com/photo-1758613654240-e531842faea6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMGJyYW5kaW5nJTIwcG9ydGZvbGlvfGVufDF8fHx8MTc2Mzk4NjI0M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: 2,
    name: 'Digital Experience',
    client: 'Fashion House',
    year: '2024',
    services: ['Web Design', 'Production'],
    image: 'https://images.unsplash.com/photo-1669062897193-f8a4215c2033?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3ZWIlMjBkZXNpZ258ZW58MXx8fHwxNzYzOTQ1MTI2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: 3,
    name: 'Product Launch',
    client: 'Wellness Co.',
    year: '2023',
    services: ['Packaging Design', 'Branding'],
    image: 'https://images.unsplash.com/photo-1669384536597-99ae8c881e65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYWNrYWdpbmclMjBkZXNpZ24lMjBwcm9kdWN0fGVufDF8fHx8MTc2MzkxNjc1Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: 4,
    name: 'Social Campaign',
    client: 'Urban Brand',
    year: '2024',
    services: ['Social Media', 'Content Creation'],
    image: 'https://images.unsplash.com/photo-1607968565043-36af90dde238?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NpYWwlMjBtZWRpYSUyMGNhbXBhaWdufGVufDF8fHx8MTc2Mzk4NjI0NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: 5,
    name: 'Visual Identity',
    client: 'Art Gallery',
    year: '2023',
    services: ['Creative Direction', 'Photography'],
    image: 'https://images.unsplash.com/photo-1611711522429-384bfeea79e0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMGRpcmVjdGlvbiUyMHBob3RvZ3JhcGh5fGVufDF8fHx8MTc2Mzk4NjI0NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: 6,
    name: 'Market Positioning',
    client: 'Finance Group',
    year: '2024',
    services: ['Strategy', 'Branding', 'Production'],
    image: 'https://images.unsplash.com/photo-1612541587845-9b5d36adc3ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmFuZCUyMHN0cmF0ZWd5JTIwZGVzaWdufGVufDF8fHx8MTc2Mzk0NDI3Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
];

export function ProjectsGallery() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [showLeftArrow, setShowLeftArrow] = useState(false);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 10);
      setShowLeftArrow(scrollLeft > 10);
    }
  };

  const scrollToNext = () => {
    if (scrollContainerRef.current) {
      const boxWidth = scrollContainerRef.current.clientWidth / 2.5;
      scrollContainerRef.current.scrollBy({
        left: boxWidth,
        behavior: 'smooth',
      });
    }
  };

  const scrollToPrev = () => {
    if (scrollContainerRef.current) {
      const boxWidth = scrollContainerRef.current.clientWidth / 2.5;
      scrollContainerRef.current.scrollBy({
        left: -boxWidth,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="relative bg-black py-20">
      <div 
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {projects.map((project) => (
          <div
            key={project.id}
            className="flex-shrink-0 snap-start h-screen px-4 first:pl-8 last:pr-8"
            style={{ width: '40vw' }}
          >
            <div className="relative h-full bg-zinc-900 rounded-2xl overflow-hidden group">
              {/* Project Info Header */}
              <div className="absolute top-0 left-0 right-0 z-10 p-8 flex justify-between items-start">
                {/* Left: Project name, client, year */}
                <div>
                  <h3 className="text-white text-2xl mb-2">{project.name}</h3>
                  <p className="text-zinc-400 text-sm">
                    {project.client} • {project.year}
                  </p>
                </div>

                {/* Right: Service tags */}
                <div className="flex flex-wrap gap-2 justify-end max-w-xs">
                  {project.services.map((service, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-white/10 backdrop-blur-sm text-white text-xs rounded-full border border-white/20"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>

              {/* Project Image */}
              <ImageWithFallback
                src={project.image}
                alt={project.name}
                className="w-full h-full object-cover"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/40 pointer-events-none" />
            </div>
          </div>
        ))}
      </div>

      {/* Left Arrow indicator */}
      {showLeftArrow && (
        <button
          onClick={scrollToPrev}
          className="fixed left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all"
          aria-label="View previous projects"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {/* Right Arrow indicator */}
      {showRightArrow && (
        <button
          onClick={scrollToNext}
          className="fixed right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all"
          aria-label="View more projects"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}