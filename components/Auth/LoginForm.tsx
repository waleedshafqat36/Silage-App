"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Input } from "@/components/Input/Input";
import { showToast } from "@/components/Toast/Toast";

interface FormErrors {
  email?: string;
  password?: string;
}

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [shakeError, setShakeError] = useState(false);
  const router = useRouter();

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Password validation
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const triggerShakeAnimation = () => {
    setShakeError(true);
    setTimeout(() => setShakeError(false), 600);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      triggerShakeAnimation();
      showToast("Please fix the errors in the form", "error");
      return;
    }

    setLoading(true);

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    setLoading(false);

    if (res?.error) {
      triggerShakeAnimation();
      showToast(res.error || "Invalid email or password", "error");
      return;
    }

    // Successful sign in
    showToast("Logged in successfully! Redirecting...", "success");
    
    // Redirect both admin and users to home page
    setTimeout(() => {
      router.push("/");
    }, 500);
  };

  return (
    <div
      className={`w-full max-w-md transition-all duration-300 ${
        shakeError ? "animate-shake" : ""
      }`}
    >
      <div className="backdrop-blur-xl bg-white/90 rounded-2xl shadow-2xl p-8 border border-white/50 hover:shadow-3xl transition-all duration-300 hover:border-white/70">
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="inline-block mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg">
              🔐
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 bg-clip-text text-transparent mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-600 text-sm font-medium">
            Sign in to your account to continue
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-0">
          <Input
            label="Email Address"
            type="email"
            value={email}
            onChange={setEmail}
            error={errors.email}
            placeholder=" "
            autoComplete="email"
          />

          <Input
            label="Password"
            type="password"
            value={password}
            onChange={setPassword}
            error={errors.password}
            showPasswordToggle
            placeholder=" "
            autoComplete="current-password"
          />

          {/* Forgot Password Link */}
          <div className="flex justify-end mb-6 mt-2">
            <Link
              href="/auth/forgot-password"
              className="text-sm text-blue-600 hover:text-blue-700 font-semibold transition-colors"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 px-4 rounded-xl font-bold text-white transition-all duration-300 mt-8 text-lg ${
              loading
                ? "bg-blue-400 cursor-not-allowed opacity-75 shadow-md"
                : "bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 hover:from-blue-700 hover:via-blue-600 hover:to-purple-700 active:scale-95 shadow-lg hover:shadow-2xl"
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
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
                Signing in...
              </span>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="my-8 flex items-center gap-3">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
          <span className="text-gray-500 text-xs font-bold px-2">
            NEW USER?
          </span>
          <div className="flex-1 h-px bg-gradient-to-l from-transparent via-gray-300 to-transparent"></div>
        </div>

        {/* Signup Link */}
        <div className="text-center">
          <Link
            href="/auth/signup"
            className="inline-block w-full py-3 px-4 rounded-xl border-2 border-blue-600 text-blue-600 font-bold hover:bg-blue-50 transition-all duration-300 hover:shadow-md"
          >
            Create Account
          </Link>
        </div>

        {/* Footer */}
        <p className="text-xs text-gray-600 text-center mt-6 leading-relaxed">
          By signing in, you agree to our{" "}
          <a href="#" className="text-blue-600 hover:underline font-semibold">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-blue-600 hover:underline font-semibold">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
}
