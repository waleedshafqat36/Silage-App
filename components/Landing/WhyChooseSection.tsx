"use client";

import { useState } from "react";

export default function WhyChooseSection() {
  const [activeCard, setActiveCard] = useState(0);

  const benefits = [
    {
      title: "Superior Nutrition",
      description:
        "Preserves 95% of nutrients compared to 70% with traditional methods",
      icon: "📊",
      details: [
        "Higher protein content",
        "More vitamins & minerals",
        "Better digestibility",
      ],
    },
    {
      title: "Proven Results",
      description:
        "Farmers report 20% increase in milk production and weight gain",
      icon: "📈",
      details: [
        "Increased productivity",
        "Healthier livestock",
        "Consistent quality",
      ],
    },
    {
      title: "Year-Round Supply",
      description: "Store feed for months with zero quality degradation",
      icon: "📅",
      details: ["Long shelf life", "Weather independent", "Always available"],
    },
    {
      title: "Expert Support",
      description:
        "24/7 customer support and agricultural consultation included",
      icon: "👨‍🌾",
      details: ["Expert advice", "Dedicated team", "Problem solving"],
    },
  ];

  return (
    <section
      id="why-choose"
      className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Why Choose KM Silage?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of farmers who trust KM Silage for superior feed
            quality and livestock health.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Interactive Cards */}
          <div className="space-y-4">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                onClick={() => setActiveCard(index)}
                className={`cursor-pointer p-6 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                  activeCard === index
                    ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg scale-105"
                    : "bg-white border-2 border-gray-200 text-gray-900 hover:border-green-400"
                }`}
              >
                <div className="flex items-start gap-4">
                  <span className="text-3xl">{benefit.icon}</span>
                  <div>
                    <h3
                      className={`text-lg font-bold mb-2 ${
                        activeCard === index ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {benefit.title}
                    </h3>
                    <p
                      className={`text-sm ${
                        activeCard === index ? "text-green-50" : "text-gray-600"
                      }`}
                    >
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right side - Details */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-green-200 to-blue-200 rounded-3xl opacity-20 blur-2xl"></div>
            <div className="relative bg-white p-8 rounded-3xl shadow-2xl space-y-6">
              <div className="text-6xl">{benefits[activeCard].icon}</div>
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-3">
                  {benefits[activeCard].title}
                </h3>
                <p className="text-gray-600 text-lg mb-6">
                  {benefits[activeCard].description}
                </p>
              </div>

              <div className="space-y-3 border-t border-gray-200 pt-6">
                <h4 className="font-semibold text-gray-900">Key Benefits:</h4>
                <ul className="space-y-2">
                  {benefits[activeCard].details.map((detail, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-3 text-gray-600"
                    >
                      <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Testimonial Quote */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border-l-4 border-green-600">
                <p className="text-sm text-gray-700 italic">
                  &ldquo;Since switching to KM Silage, our farm&apos;s
                  productivity has increased significantly and our animals are
                  healthier than ever.&rdquo;
                </p>
                <p className="text-xs font-semibold text-green-700 mt-2">
                  - Farmer Raj, Punjab
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
