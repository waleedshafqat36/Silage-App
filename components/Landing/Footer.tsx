import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative bg-gray-900 text-gray-300">
      {/* Gradient divider */}
      <div className="h-1 bg-gradient-to-r from-green-600 via-emerald-600 to-blue-600"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white flex items-center gap-2">
              🌾 KM Silage
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Providing premium feed preservation solutions for farmers across
              India since 2003.
            </p>
            <div className="flex gap-4 pt-4">
              <a
                href="#"
                className="text-2xl hover:text-green-400 transition-colors duration-300"
              >
                📘
              </a>
              <a
                href="#"
                className="text-2xl hover:text-green-400 transition-colors duration-300"
              >
                🐦
              </a>
              <a
                href="#"
                className="text-2xl hover:text-green-400 transition-colors duration-300"
              >
                📱
              </a>
              <a
                href="#"
                className="text-2xl hover:text-green-400 transition-colors duration-300"
              >
                ▶️
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-white">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#about"
                  className="text-gray-400 hover:text-green-400 transition-colors duration-300"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#why-choose"
                  className="text-gray-400 hover:text-green-400 transition-colors duration-300"
                >
                  Why Choose Us
                </a>
              </li>
              <li>
                <a
                  href="#how-it-works"
                  className="text-gray-400 hover:text-green-400 transition-colors duration-300"
                >
                  How It Works
                </a>
              </li>
              <li>
                <a
                  href="#testimonials"
                  className="text-gray-400 hover:text-green-400 transition-colors duration-300"
                >
                  Testimonials
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-gray-400 hover:text-green-400 transition-colors duration-300"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-white">Products</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-green-400 transition-colors duration-300"
                >
                  Grass Silage
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-green-400 transition-colors duration-300"
                >
                  Corn Silage
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-green-400 transition-colors duration-300"
                >
                  Mixed Feed
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-green-400 transition-colors duration-300"
                >
                  Premium Plus
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-white">Support</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-green-400 transition-colors duration-300"
                >
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-green-400 transition-colors duration-300"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-green-400 transition-colors duration-300"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-green-400 transition-colors duration-300"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 mb-12">
          <div className="max-w-2xl">
            <h4 className="text-2xl font-bold text-white mb-2">Stay Updated</h4>
            <p className="text-green-50 mb-4">
              Get the latest news about silage farming, animal nutrition tips,
              and exclusive offers.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg focus:outline-none text-gray-900 font-medium placeholder-gray-500"
              />
              <button className="px-6 py-3 bg-white text-green-600 font-bold rounded-lg hover:bg-gray-100 transition-colors duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Copyright */}
            <div className="text-sm text-gray-400 text-center md:text-left">
              <p>&copy; 2024 KM Silage. All rights reserved.</p>
            </div>

            {/* Trust Badges */}
            <div className="flex justify-center gap-6 text-xs text-gray-400">
              <div className="flex flex-col items-center gap-1">
                <span className="text-2xl">✅</span>
                <span>ISO Certified</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="text-2xl">🏆</span>
                <span>Award Winning</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="text-2xl">🔒</span>
                <span>Secure</span>
              </div>
            </div>

            {/* Additional Info */}
            <div className="text-sm text-gray-400 text-center md:text-right">
              <p>Made with ❤️ for farmers across India</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
