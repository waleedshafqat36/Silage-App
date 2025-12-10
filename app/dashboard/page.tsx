import Navbar from "@/components/Navbar/Navbar";

export default function DashboardPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
              Dashboard
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Welcome! You are successfully logged in. Click the logout button
              in the top right to sign out.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Create Post
                </h3>
                <p className="text-gray-600">
                  Write and publish new blog posts
                </p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  My Posts
                </h3>
                <p className="text-gray-600">Manage your published content</p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Settings
                </h3>
                <p className="text-gray-600">
                  Update your profile and preferences
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
