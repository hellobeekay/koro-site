export function CallToAction() {
  return (
    <section className="min-h-screen bg-[#3A04A6] flex items-center justify-center px-8 py-20">
      <div className="max-w-4xl w-full">
        <h2 className="text-white text-4xl md:text-6xl lg:text-7xl mb-8 md:mb-12">
          Excited?
          <br />
          We too are eager to share ideas.
        </h2>
        <button className="bg-white text-[#3A04A6] px-8 py-4 rounded-full text-lg md:text-xl hover:bg-gray-100 transition-colors duration-300">
          Let's Chat
        </button>
      </div>
    </section>
  );
}