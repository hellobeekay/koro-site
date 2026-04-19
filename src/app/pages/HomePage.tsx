import { useState } from 'react';
import { HoldTextReveal } from '../components/HoldTextReveal';
import { BrandInfo } from '../components/BrandInfo';
import { ProjectsGallery } from '../components/ProjectsGallery';
import { BrandEthos } from '../components/BrandEthos';
import { CallToAction } from '../components/CallToAction';
import { UnblurHero } from '../components/UnblurHero';

export function HomePage() {
  const [isHolding, setIsHolding] = useState(false);

  return (
    <div className="relative bg-black">
      <div className="relative w-screen h-screen overflow-hidden">
        <UnblurHero />
        <HoldTextReveal onHoldChange={setIsHolding} />

        {!isHolding && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <h1 className="text-white text-center">
              Here to start a creative riot.
            </h1>
          </div>
        )}
      </div>

      <BrandInfo />
      <ProjectsGallery />
      <BrandEthos />
      <CallToAction />
    </div>
  );
}
