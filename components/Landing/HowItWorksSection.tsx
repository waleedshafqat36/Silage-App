export default function HowItWorksSection() {
  const steps = [
    {
      number: "01",
      title: "Quality Selection",
      description:
        "We source premium crops and grass from trusted local farmers",
      icon: "🌾",
      details:
        "Only the finest raw materials are selected for our fermentation process",
    },
    {
      number: "02",
      title: "Preparation",
      description: "Crops are chopped and prepared with scientific precision",
      icon: "✂️",
      details:
        "Optimal particle size ensures better fermentation and nutrient preservation",
    },
    {
      number: "03",
      title: "Fermentation",
      description: "Advanced fermentation using beneficial bacteria cultures",
      icon: "🧪",
      details:
        "Controlled temperature and humidity create ideal fermentation conditions",
    },
    {
      number: "04",
      title: "Quality Control",
      description: "Every batch is tested for nutrition and safety standards",
      icon: "🔬",
      details: "Lab-tested to ensure maximum nutrition and zero contamination",
    },
    {
      number: "05",
      title: "Packaging",
      description: "Sealed in protective packaging to maintain freshness",
      icon: "📦",
      details: "Climate-controlled storage preserves quality until delivery",
    },
    {
      number: "06",
      title: "Delivery",
      description: "Fast delivery to your farm in optimal condition",
      icon: "🚚",
      details: "Your animals get the freshest, most nutritious feed possible",
    },
  ];

  return (
    <section
      id="how-it-works"
      className="relative py-20 px-4 sm:px-6 lg:px-8 bg-white"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our proven 6-step process ensures the highest quality silage for
            your farm.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              {/* Connecting line (hidden on mobile) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-24 -right-4 w-8 h-1 bg-gradient-to-r from-green-400 to-emerald-400 group-hover:w-16 transition-all duration-300"></div>
              )}

              {/* Card */}
              <div className="relative bg-gradient-to-br from-white to-green-50 p-8 rounded-2xl border-2 border-gray-200 hover:border-green-400 transition-all duration-300 hover:shadow-xl h-full">
                {/* Step Number */}
                <div className="absolute top-4 right-4 text-5xl font-bold text-transparent bg-gradient-to-r from-green-200 to-emerald-200 bg-clip-text opacity-50">
                  {step.number}
                </div>

                {/* Icon */}
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {step.icon}
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 mb-4">{step.description}</p>
                <p className="text-sm text-gray-500 italic">{step.details}</p>

                {/* Hover effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Timeline Alternative View */}
        <div className="mt-16 pt-12 border-t border-gray-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Complete Timeline
          </h3>
          <div className="space-y-4">
            {steps.map((step, index) => (
              <div
                key={index}
                className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold flex items-center justify-center flex-shrink-0">
                  {step.number}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900">{step.title}</h4>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </div>
                <div className="text-3xl">{step.icon}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
