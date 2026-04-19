export function BrandEthos() {
  const ethos = ['INDEPENDENT', 'LGBTQIA+', 'B-CORP', '4 DAY WEEK'];

  return (
    <section className="min-h-screen bg-black flex items-center justify-center px-8 py-20">
      <div className="max-w-7xl w-full">
        <div className="flex flex-col gap-4 md:gap-6">
          {ethos.map((value, index) => (
            <div key={index} className="flex items-center justify-center">
              <h2 className="text-white text-5xl md:text-7xl lg:text-8xl">
                {value}
              </h2>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}