interface BrandInfoProps {}

export function BrandInfo({}: BrandInfoProps) {
  return (
    <section className="min-h-screen bg-black flex items-center justify-center px-8 py-20">
      <div className="max-w-5xl">
        <p className="text-white text-4xl md:text-5xl lg:text-6xl leading-tight">
          Our creative house assembles teams from diverse marketing expertise—strategy, design, web, 3D, production and more—without the barriers of silos.
        </p>
      </div>
    </section>
  );
}