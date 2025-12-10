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
  const [isFocused, setIsFocused] = useState(false);

  const inputType =
    type === "password" && showPasswordToggle
      ? showPassword
        ? "text"
        : "password"
      : type;

  const hasValue = value.length > 0;
  const isActive = isFocused || hasValue;

  return (
    <div className="relative mb-7">
      <div className="relative">
        {/* Input field */}
        <input
          type={inputType}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder=" "
          autoComplete={autoComplete}
          className={`peer w-full px-4 pt-6 pb-3 rounded-lg border-2 transition-all duration-300 bg-white text-gray-900 font-medium text-base
            ${
              error
                ? "border-red-500 focus:border-red-600 focus:ring-2 focus:ring-red-200 shadow-sm"
                : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 shadow-sm hover:shadow-md hover:border-gray-400"
            }
            focus:outline-none focus:shadow-lg
          `}
        />

        {/* Floating Label */}
        <label
          className={`absolute left-4 pointer-events-none font-semibold transition-all duration-300 ease-out
            ${
              isActive
                ? "top-2 text-xs text-blue-600 scale-90 origin-left"
                : "top-6 text-sm text-gray-600"
            }
            ${error && isActive ? "text-red-600" : ""}
          `}
        >
          {label}
        </label>

        {/* Password visibility toggle button */}
        {showPasswordToggle && type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
            tabIndex={-1}
          >
            {showPassword ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path
                  fillRule="evenodd"
                  d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7C5.522 17 .732 14.057.458 10z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781z"
                  clipRule="evenodd"
                />
                <path
                  fillRule="evenodd"
                  d="M15.171 13.576l1.414 1.414a1 1 0 001.414-1.414l-14-14a1 1 0 00-1.414 1.414l2.06 2.06C1.273 5.943 1 10 1 10c1.274 4.057 5.065 7 9.542 7a10 10 0 006.118-1.884l2.511 2.511z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>
        )}
      </div>

      {/* Error message */}
      {error && (
        <p className="mt-2 text-sm text-red-600 font-semibold flex items-center gap-2 animate-shake">
          <span className="text-base">⚠️</span>
          {error}
        </p>
      )}
    </div>
  );
}
