import { useRef, useState } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { COFFEE_PRODUCT_IMAGES } from '../content/coffeeProductImages';

interface Project {
  id: number;
  name: string;
  client: string;
  year: string;
  services: string[];
  image: string;
}

const [img1, img2, img3, img4, img5, img6] = COFFEE_PRODUCT_IMAGES;

const projects: Project[] = [
  {
    id: 1,
    name: 'Morning Ritual',
    client: 'Roast & Co.',
    year: '2024',
    services: ['Branding', 'Packaging'],
    image: img1,
  },
  {
    id: 2,
    name: 'Single Origin',
    client: 'Highland Beans',
    year: '2024',
    services: ['Photography', 'Web'],
    image: img2,
  },
  {
    id: 3,
    name: 'Bean to Cup',
    client: 'Artisan Roasters',
    year: '2023',
    services: ['Campaign', 'Social'],
    image: img3,
  },
  {
    id: 4,
    name: 'Cold Brew Line',
    client: 'Urban Café Lab',
    year: '2024',
    services: ['Product', 'Launch'],
    image: img4,
  },
  {
    id: 5,
    name: 'House Blend',
    client: 'Neighborhood Roastery',
    year: '2023',
    services: ['Identity', 'Merch'],
    image: img5,
  },
  {
    id: 6,
    name: 'Espresso Bar',
    client: 'Third Wave Collective',
    year: '2024',
    services: ['Spatial', 'Content'],
    image: img6,
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