export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative py-20 px-4 sm:px-6 lg:px-8 bg-white"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            What is Silage?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Silage is a fermented livestock feed that preserves the nutritional
            value of crops like grass and corn. KM Silage uses advanced
            fermentation science to ensure maximum preservation and quality.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="group bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl border border-green-200 hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="text-5xl mb-4">🔬</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Scientific Formula
            </h3>
            <p className="text-gray-600">
              Our advanced fermentation process ensures optimal nutrient
              retention and prevents spoilage, backed by decades of agricultural
              research.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="group bg-gradient-to-br from-blue-50 to-cyan-50 p-8 rounded-2xl border border-blue-200 hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="text-5xl mb-4">💪</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Enhanced Nutrition
            </h3>
            <p className="text-gray-600">
              Preserved with essential vitamins, minerals, and proteins that
              keep your livestock healthy, productive, and thriving year-round.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="group bg-gradient-to-br from-emerald-50 to-teal-50 p-8 rounded-2xl border border-emerald-200 hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="text-5xl mb-4">♻️</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Eco-Friendly
            </h3>
            <p className="text-gray-600">
              Sustainable feed preservation reduces waste and environmental
              impact while maximizing resource efficiency for your farm.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="group bg-gradient-to-br from-amber-50 to-orange-50 p-8 rounded-2xl border border-amber-200 hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="text-5xl mb-4">🏆</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Quality Assured
            </h3>
            <p className="text-gray-600">
              Every batch is tested for quality, purity, and nutritional
              content. We guarantee the best results for your livestock.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="group bg-gradient-to-br from-rose-50 to-pink-50 p-8 rounded-2xl border border-rose-200 hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="text-5xl mb-4">💰</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Cost Effective
            </h3>
            <p className="text-gray-600">
              Reduce feed costs while improving animal health. Our efficient
              preservation methods save you money long-term.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="group bg-gradient-to-br from-purple-50 to-violet-50 p-8 rounded-2xl border border-purple-200 hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="text-5xl mb-4">🚚</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Quick Delivery
            </h3>
            <p className="text-gray-600">
              Fast, reliable delivery to farms across the region. We ensure your
              feed arrives fresh and ready to use.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
