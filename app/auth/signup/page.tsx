import SignupForm from "@/components/Auth/SignupForm";
import { ToastContainer } from "@/components/Toast/Toast";

export default function SignupPage() {
  return (
    <>
      <div className="min-h-screen w-full flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
        {/* Animated background shapes */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

        {/* Content */}
        <div className="relative z-10">
          <SignupForm />
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
