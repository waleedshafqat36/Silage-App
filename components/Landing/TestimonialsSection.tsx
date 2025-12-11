"use client";

import { useState, useEffect } from "react";

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  const testimonials = [
    {
      name: "Rajesh Kumar",
      farm: "Green Valley Dairy, Punjab",
      image: "👨‍🌾",
      quote:
        "KM Silage transformed our farm's productivity. Our cows produce 25% more milk, and they're visibly healthier. Highly recommended!",
      rating: 5,
    },
    {
      name: "Priya Singh",
      farm: "Singh's Organic Cattle Ranch, Haryana",
      image: "👩‍🌾",
      quote:
        "The quality is consistent and reliable. We've been using KM Silage for 3 years now, and it's the best investment for our livestock.",
      rating: 5,
    },
    {
      name: "Vikram Patel",
      farm: "Patel Agriculture Solutions, Gujarat",
      image: "👨‍🌾",
      quote:
        "Customer service is exceptional. They helped us optimize our feeding schedule and we saved money while improving animal health.",
      rating: 5,
    },
    {
      name: "Deepak Sharma",
      farm: "Sharma's Mixed Livestock Farm, MP",
      image: "👨‍🌾",
      quote:
        "The nutritional value is outstanding. Our vet noticed improved digestion and overall health in all our animals within weeks.",
      rating: 5,
    },
    {
      name: "Neha Gupta",
      farm: "Modern Dairy Solutions, Rajasthan",
      image: "👩‍🌾",
      quote:
        "Switching to KM Silage was the best decision we made. Quality consistency and excellent delivery service every single time.",
      rating: 5,
    },
  ];

  // Autoplay carousel
  useEffect(() => {
    if (!autoplay) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [autoplay, testimonials.length]);

  const handlePrev = () => {
    setAutoplay(false);
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const handleNext = () => {
    setAutoplay(false);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section
      id="testimonials"
      className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-green-50 via-white to-blue-50"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            What Our Farmers Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real stories from real farmers who trust KM Silage for their
            livestock.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4 md:px-6">
                  <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 max-w-2xl mx-auto">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="text-6xl flex-shrink-0">
                        {testimonial.image}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900">
                          {testimonial.name}
                        </h3>
                        <p className="text-sm text-green-600 font-semibold">
                          {testimonial.farm}
                        </p>
                        <div className="flex gap-1 mt-2">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <span key={i} className="text-2xl">
                              ⭐
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <p className="text-lg text-gray-700 italic leading-relaxed mb-6">
                      &ldquo;{testimonial.quote}&ldquo;
                    </p>

                    <div className="h-1 w-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={handlePrev}
            onMouseEnter={() => setAutoplay(false)}
            onMouseLeave={() => setAutoplay(true)}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 md:-translate-x-12 z-10 bg-gradient-to-r from-green-600 to-emerald-600 hover:shadow-lg text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
          >
            ←
          </button>
          <button
            onClick={handleNext}
            onMouseEnter={() => setAutoplay(false)}
            onMouseLeave={() => setAutoplay(true)}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 md:translate-x-12 z-10 bg-gradient-to-r from-green-600 to-emerald-600 hover:shadow-lg text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
          >
            →
          </button>

          {/* Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setAutoplay(false);
                  setCurrentIndex(index);
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-gradient-to-r from-green-600 to-emerald-600 w-8"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 pt-12 border-t border-gray-200">
          <div className="text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">
              10,000+
            </div>
            <p className="text-gray-600">Happy Farmers</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-emerald-600 mb-2">
              4.9/5
            </div>
            <p className="text-gray-600">Average Rating</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">20+</div>
            <p className="text-gray-600">Years Trusted</p>
          </div>
        </div>
      </div>
    </section>
  );
}
