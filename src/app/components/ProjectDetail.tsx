import heroCoffee from '@/assets/images/home/coffee-01.jpg';

import { ArrowLeft } from 'lucide-react';

interface ProjectDetailProps {
  project: {
    name: string;
    year: string;
    type: string;
    client: string;
  };
  onBack: () => void;
}

export function ProjectDetail({ project, onBack }: ProjectDetailProps) {
  return (
    <div className="min-h-screen bg-black text-white pt-24">
      <div className="max-w-7xl mx-auto px-8 py-8">
        {/* Back Button */}
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-16"
        >
          <ArrowLeft size={20} />
          <span className="uppercase tracking-wider">Back</span>
        </button>

        {/* Project Header */}
        <div className="mb-12">
          <div className="grid grid-cols-2 gap-16">
            {/* Left Side - Project Name and Details */}
            <div>
              <h1 className="mb-8 text-7xl uppercase tracking-tight">{project.name}</h1>
              <div className="space-y-1 text-sm text-gray-400 uppercase tracking-wider">
                <div>{project.year}</div>
                <div>{project.type}</div>
                <div>{project.client}</div>
              </div>
            </div>

            {/* Right Side - Description */}
            <div className="flex flex-col justify-end">
              <div className="text-sm text-gray-400 uppercase tracking-wider mb-4">
                Online Flagship Store
              </div>
              <p className="text-gray-300 leading-relaxed">
                Introducing {project.name}, a specialty coffee brand focused on origin, craft, and ritual.
                This project showcases packaging, photography, and digital touchpoints built around a warm, tactile identity.
              </p>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="w-full h-[80vh] mb-20">
          <img
            src={heroCoffee}
            alt={`${project.name} hero`}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Services and Information Section */}
        <div className="grid grid-cols-3 gap-16 mb-20">
          {/* Services - Left Side */}
          <div>
            <h3 className="mb-6 text-sm uppercase tracking-wider text-gray-400">Services</h3>
            <div className="space-y-2 text-gray-300">
              <p>Launch of e-commerce platform.</p>
              <p>Strategy, Design & Development.</p>
              <p>Year {project.year}</p>
            </div>
          </div>

          {/* Information - Center-Right */}
          <div className="col-span-2">
            <h3 className="mb-6 text-sm uppercase tracking-wider text-gray-400">Information</h3>
            <div className="space-y-6 text-gray-300 leading-relaxed">
              <p>
                In the Paris studio, the leather goods are designed in a refined and timeless style with a distinctly creative touch. 
                The perceived suppleness and light-weight look of the models is only possible through intricate technical development 
                mastered by the designers.
              </p>
              <p>
                The leather, sourced exclusively from Spanish and Italian certified tanneries, is sculpted to create organic shapes, 
                folds, draping or weaving.
              </p>
              <p>
                All production is entrusted to the craftsmen of Ubrique, a Spanish town specialized in luxury leather goods.
              </p>
              <p>
                In keeping with their promise of quality and creativity, the House unveils a new line of accessories. jewelry. 
                Themed collections exploring nature and its forms of expression, from the undulating movements of the wind to sculpted 
                rock textures. A collection gilded with 24-carat gold and crafted by artisans in Italy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}