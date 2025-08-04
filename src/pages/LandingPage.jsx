import React from "react";
import {
  ChevronRightIcon,
  CodeBracketIcon,
  UserGroupIcon,
  RocketLaunchIcon,
  DevicePhoneMobileIcon,
  ComputerDesktopIcon,
} from "@heroicons/react/24/outline";

const DevTinderLanding = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <CodeBracketIcon className="h-8 w-8 text-blue-400 mr-3" />
              <h1 className="text-2xl font-bold text-white">DevTinder</h1>
            </div>
            <div className="flex space-x-4">
              <button className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300">
                Learn More
              </button>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md text-sm font-medium transition duration-300">
                Sign Up Now
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl pb-3 md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Where Developers Connect & Code Together
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            The developer-focused collaboration platform that matches
            programmers and students based on skills and project interests.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition duration-300 flex items-center justify-center">
              Find Your Perfect Coding Partner
              <ChevronRightIcon className="ml-2 h-5 w-5" />
            </button>
            <button className="border border-gray-600 hover:border-gray-500 text-white px-8 py-4 rounded-lg text-lg font-semibold transition duration-300">
              Watch Demo
            </button>
          </div>
        </div>
      </section>

      {/* What is DevTinder Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <RocketLaunchIcon className="h-12 w-12 text-blue-400 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What is DevTinder?
            </h2>
            <p className="text-lg text-gray-300 max-w-4xl mx-auto">
              DevTinder revolutionizes how developers find collaborators by
              combining the intuitive matching experience of modern dating apps
              with the specific needs of the programming community. Whether
              you're looking for a hackathon teammate, open-source contributor,
              or side project partner, DevTinder connects you with developers
              who complement your skills and share your passion for coding.
            </p>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            ✨ Key Features
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-blue-500 transition duration-300">
              <UserGroupIcon className="h-10 w-10 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold mb-3">
                Smart Profile Matching
              </h3>
              <ul className="text-gray-300 space-y-2">
                <li>
                  • Create detailed profiles showcasing your programming
                  languages, frameworks, and experience level
                </li>
                <li>
                  • Advanced algorithm matches you with developers who
                  complement your skillset
                </li>
                <li>
                  • Browse potential collaborators with smooth, swipe-style
                  interactions
                </li>
              </ul>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-blue-500 transition duration-300">
              <CodeBracketIcon className="h-10 w-10 text-purple-400 mb-4" />
              <h3 className="text-xl font-semibold mb-3">
                Project-Focused Connections
              </h3>
              <ul className="text-gray-300 space-y-2">
                <li>
                  • Send connection requests to developers aligned with your
                  project goals
                </li>
                <li>
                  • Streamlined communication eliminates awkward cold outreach
                </li>
                <li>
                  • Real-time notifications keep you updated on new matches and
                  messages
                </li>
              </ul>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-blue-500 transition duration-300">
              <ComputerDesktopIcon className="h-10 w-10 text-green-400 mb-4" />
              <h3 className="text-xl font-semibold mb-3">
                Modern, Developer-Friendly Interface
              </h3>
              <ul className="text-gray-300 space-y-2">
                <li>
                  • <strong>Dark theme</strong> designed for developers who code
                  in low-light environments
                </li>
                <li>
                  • <strong>Responsive design</strong> works seamlessly across
                  desktop and mobile devices
                </li>
                <li>
                  • <strong>Smooth animations</strong> and intuitive navigation
                  enhance user experience
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Perfect For Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            🎯 Perfect For
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-gray-900 rounded-lg overflow-hidden">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-6 py-4 text-left text-lg font-semibold text-blue-400">
                    Hackathon Teams
                  </th>
                  <th className="px-6 py-4 text-left text-lg font-semibold text-purple-400">
                    Open Source Projects
                  </th>
                  <th className="px-6 py-4 text-left text-lg font-semibold text-green-400">
                    Side Projects
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                <tr>
                  <td className="px-6 py-4 text-gray-300">
                    Find teammates with complementary skills before events
                  </td>
                  <td className="px-6 py-4 text-gray-300">
                    Connect with maintainers and contributors
                  </td>
                  <td className="px-6 py-4 text-gray-300">
                    Discover collaborators for ambitious personal projects
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-gray-300">
                    Form balanced teams quickly
                  </td>
                  <td className="px-6 py-4 text-gray-300">
                    Get guidance and mentorship
                  </td>
                  <td className="px-6 py-4 text-gray-300">
                    Bring different skill sets together
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-gray-300">
                    Improve your chances of success
                  </td>
                  <td className="px-6 py-4 text-gray-300">
                    Contribute meaningfully to existing projects
                  </td>
                  <td className="px-6 py-4 text-gray-300">
                    Turn ideas into reality
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            🛠 Built with Modern Technology
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <h3 className="text-lg font-semibold text-blue-400 mb-2">
                Frontend
              </h3>
              <p className="text-gray-300">
                React with Tailwind CSS for a responsive, component-based
                interface
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <h3 className="text-lg font-semibold text-purple-400 mb-2">
                Backend
              </h3>
              <p className="text-gray-300">
                Supabase for authentication, real-time database, and secure file
                storage
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <h3 className="text-lg font-semibold text-green-400 mb-2">
                Experience
              </h3>
              <p className="text-gray-300">
                Swipe interactions, smooth animations, and instant updates
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose DevTinder Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            💡 Why Choose DevTinder?
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-3 h-3 bg-blue-400 rounded-full mt-2"></div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    Targeted Networking
                  </h3>
                  <p className="text-gray-300">
                    Unlike general professional networks, DevTinder specifically
                    connects developers looking for hands-on collaboration
                    opportunities.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-3 h-3 bg-purple-400 rounded-full mt-2"></div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    Skill-Based Matching
                  </h3>
                  <p className="text-gray-300">
                    Our algorithm focuses on technical compatibility and project
                    alignment, not just networking.
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-3 h-3 bg-green-400 rounded-full mt-2"></div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    Streamlined Process
                  </h3>
                  <p className="text-gray-300">
                    Skip the awkward introductions and jump straight into
                    meaningful collaboration discussions.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-3 h-3 bg-yellow-400 rounded-full mt-2"></div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    Real-Time Experience
                  </h3>
                  <p className="text-gray-300">
                    Instant profile updates, connection notifications, and
                    seamless communication keep you engaged.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            🌟 Ready to Find Your Coding Partner?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of developers who are already building amazing
            projects together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition duration-300">
              Sign Up Now
            </button>
            <button className="border border-gray-600 hover:border-gray-500 text-white px-8 py-4 rounded-lg text-lg font-semibold transition duration-300">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Available on All Devices Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <DevicePhoneMobileIcon className="h-12 w-12 text-blue-400 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-6">
            📱 Available on All Devices
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            DevTinder's responsive design and mobile-optimized swipe
            interactions mean you can browse potential collaborators anywhere,
            anytime. Whether you're at your desk or on the go, finding your next
            coding partner is just a swipe away.
          </p>
          <p className="text-xl font-semibold text-blue-400 italic">
            DevTinder - Swipe Right on Your Next Great Project
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-700 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <CodeBracketIcon className="h-6 w-6 text-blue-400 mr-2" />
              <span className="text-lg font-semibold">DevTinder</span>
            </div>
            <div className="text-gray-400 text-sm">
              © 2025 DevTinder. Connecting developers worldwide.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DevTinderLanding;
