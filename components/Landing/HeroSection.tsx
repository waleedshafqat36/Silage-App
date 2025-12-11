export default function HeroSection() {
  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-16">
      {/* Background with gradient and animated shapes */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-blue-50"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left space-y-8">
            <div className="space-y-4">
              <div className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">
                🌾 Premium Animal Feed Preservation
              </div>
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-blue-600 bg-clip-text text-transparent leading-tight">
                Preserve Nature&apos;s Best Nutrition
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl">
                KM Silage delivers superior feed preservation solutions for
                modern farmers. Keep your livestock healthy and productive
                year-round with scientifically formulated silage.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="#how-it-works"
                className="px-8 py-4 border-2 border-green-600 text-green-600 font-bold rounded-lg hover:bg-green-50 transition-all duration-300"
              >
                Learn More
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-8">
              <div>
                <div className="text-3xl font-bold text-green-600">10K+</div>
                <p className="text-gray-600 text-sm">Farmers Trust Us</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-emerald-600">50K+</div>
                <p className="text-gray-600 text-sm">Tons Preserved</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600">20+</div>
                <p className="text-gray-600 text-sm">Years Expert</p>
              </div>
            </div>
          </div>

          {/* Illustration */}
          <div className="relative h-96 md:h-full flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-400 rounded-3xl opacity-20 blur-3xl"></div>
            <div className="relative z-10 w-full h-96 bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl shadow-2xl flex items-center justify-center overflow-hidden">
              <div className="text-center text-white p-8">
                <div className="text-6xl mb-4">🌾</div>
                <p className="text-lg font-semibold">Fresh Silage Quality</p>
                <p className="text-sm opacity-90 mt-2">
                  Preserving nutrients for optimal livestock nutrition
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <div className="text-3xl text-green-600">↓</div>
      </div>
    </section>
  );
}
