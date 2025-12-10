"use client";

import { useState } from "react";

interface InputProps {
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  showPasswordToggle?: boolean;
  placeholder?: string;
  autoComplete?: string;
}

export function Input({
  label,
  type = "text",
  value,
  onChange,
  error,
  showPasswordToggle = false,
  autoComplete,
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const inputType =
    type === "password" && showPasswordToggle
      ? showPassword
        ? "text"
        : "password"
      : type;

  return (
    <div className="relative mb-6">
      <div className="relative">
        {/* ⭐ Input must have `peer` class for label color change */}
        <input
          type={inputType}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder=" "
          autoComplete={autoComplete}
          className={`peer w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 bg-white text-gray-900 font-medium placeholder-gray-400
            ${
              error
                ? "border-red-500 focus:border-red-600 focus:ring-2 focus:ring-red-200 shadow-md"
                : "border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 shadow-sm hover:shadow-md"
            }
            focus:outline-none
          `}
        />

        {/* ⭐ LABEL — this will now change color properly */}
        <label
          className={`absolute left-4 top-3.5 text-gray-700 transition-all duration-200 pointer-events-none font-medium text-sm
            peer-focus:top-1 peer-focus:text-xs peer-focus:font-bold peer-focus:text-blue-600
            ${value.length > 0 ? "top-1 text-xs font-bold text-blue-600" : ""}
          `}
        >
          {label}
        </label>

        {/* Eye icon */}
        {showPasswordToggle && type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
          >
            {showPassword ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781z" />
                <path d="M15.171 13.576l1.414 1.414a1 1 0 001.414-1.414l-14-14a1 1 0 00-1.414 1.414l2.06 2.06C1.273 5.943 1 10 1 10c1.274 4.057 5.065 7 9.542 7a10 10 0 006.118-1.884l2.511 2.511z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7C5.522 17 .732 14.057.458 10z" />
              </svg>
            )}
          </button>
        )}
      </div>

      {error && (
        <p className="mt-2 text-sm text-red-600 font-semibold flex items-center gap-1.5">
          <span className="text-lg">⚠️</span>
          {error}
        </p>
      )}
    </div>
  );
}
