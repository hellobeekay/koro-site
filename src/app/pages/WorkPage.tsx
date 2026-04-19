import { useState } from 'react';
import { PortfolioGrid } from '../components/PortfolioGrid';
import { ProjectDetail } from '../components/ProjectDetail';

export function WorkPage() {
  const [selectedProject, setSelectedProject] = useState<{
    name: string;
    year: string;
    type: string;
    client: string;
  } | null>(null);

  if (selectedProject) {
    return (
      <ProjectDetail
        project={selectedProject}
        onBack={() => setSelectedProject(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pt-24">
      <div className="max-w-7xl mx-auto px-8 py-16">
        <header className="mb-16">
          <h1 className="mb-6">Selected Works</h1>
          <p className="max-w-2xl text-gray-400">
            A curated collection of creative projects spanning branding, design, and visual storytelling.
            Each project represents a unique collaboration with forward-thinking clients who value exceptional craft and innovation.
          </p>
        </header>

        <PortfolioGrid onProjectClick={setSelectedProject} />
      </div>
    </div>
  );
}
