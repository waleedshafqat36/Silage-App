"use client";

import { useState } from "react";
import { showToast } from "@/utils/toast";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    farmName: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName || !formData.email || !formData.message) {
      showToast("Please fill in all required fields", "error");
      return;
    }

    setLoading(true);

    try {
      // Simulate form submission (in production, connect to your backend)
      await new Promise((resolve) => setTimeout(resolve, 1500));

      showToast(
        "Message sent successfully! We'll be in touch soon.",
        "success"
      );
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        farmName: "",
        message: "",
      });
    } catch (error) {
      showToast("Failed to send message. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative py-20 px-4 sm:px-6 lg:px-8 bg-white"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left side - Info */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                Get in Touch
              </h2>
              <p className="text-xl text-gray-600">
                Have questions about KM Silage? Our expert team is ready to help
                you improve your farm productivity.
              </p>
            </div>

            {/* Contact Info Cards */}
            <div className="space-y-4">
              {/* Address */}
              <div className="flex gap-4 p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200 hover:shadow-lg transition-all duration-300">
                <div className="text-3xl flex-shrink-0">📍</div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Address</h3>
                  <p className="text-gray-600 text-sm">
                    KM Silage Headquarters
                    <br />
                    Agricultural Business Park
                    <br />
                    Delhi, India 110001
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-4 p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-200 hover:shadow-lg transition-all duration-300">
                <div className="text-3xl flex-shrink-0">📞</div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Phone</h3>
                  <p className="text-gray-600 text-sm">
                    +91-11-XXXX-XXXX
                    <br />
                    Mon-Fri: 9:00 AM - 6:00 PM IST
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-4 p-6 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl border border-emerald-200 hover:shadow-lg transition-all duration-300">
                <div className="text-3xl flex-shrink-0">✉️</div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Email</h3>
                  <p className="text-gray-600 text-sm">
                    contact@kmsilage.com
                    <br />
                    support@kmsilage.com
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex gap-4 p-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-200 hover:shadow-lg transition-all duration-300">
                <div className="text-3xl flex-shrink-0">🕐</div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">
                    Business Hours
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Monday - Friday: 9:00 AM - 6:00 PM
                    <br />
                    Saturday: 10:00 AM - 4:00 PM
                    <br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Form */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-green-200 to-blue-200 rounded-3xl opacity-20 blur-2xl"></div>
            <form
              onSubmit={handleSubmit}
              className="relative bg-white p-8 md:p-10 rounded-3xl shadow-2xl space-y-6"
            >
              <h3 className="text-2xl font-bold text-gray-900">
                Send us a Message
              </h3>

              {/* Full Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Your name"
                  disabled={loading}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-600 focus:ring-2 focus:ring-green-200 outline-none transition-all duration-300 text-gray-900 font-medium placeholder-gray-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  disabled={loading}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-600 focus:ring-2 focus:ring-green-200 outline-none transition-all duration-300 text-gray-900 font-medium placeholder-gray-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91-XXXXXXXXXX"
                  disabled={loading}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-600 focus:ring-2 focus:ring-green-200 outline-none transition-all duration-300 text-gray-900 font-medium placeholder-gray-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
              </div>

              {/* Farm Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Farm Name
                </label>
                <input
                  type="text"
                  name="farmName"
                  value={formData.farmName}
                  onChange={handleChange}
                  placeholder="Your farm name"
                  disabled={loading}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-600 focus:ring-2 focus:ring-green-200 outline-none transition-all duration-300 text-gray-900 font-medium placeholder-gray-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your inquiry..."
                  rows={4}
                  disabled={loading}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-600 focus:ring-2 focus:ring-green-200 outline-none transition-all duration-300 text-gray-900 font-medium placeholder-gray-500 disabled:bg-gray-100 disabled:cursor-not-allowed resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>Send Message</>
                )}
              </button>

              <p className="text-xs text-gray-500 text-center">
                We will respond to your message within 24 hours.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
