import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Animated Gradient Background */}
      <section className="animated-gradient min-h-[80vh] flex items-center justify-center relative overflow-hidden">
        {/* Animated shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="shape-1 absolute w-64 h-64 rounded-full bg-white/10 blur-3xl animate-pulse"></div>
          <div className="shape-2 absolute w-96 h-96 rounded-full bg-green-300/20 blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="shape-3 absolute w-72 h-72 rounded-full bg-blue-300/15 blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 drop-shadow-lg">
            Welcome to <span className="text-yellow-300">Tena Flow</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/95 mb-8 max-w-3xl mx-auto font-medium">
            Your trusted healthcare booking platform. Book appointments with top doctors and hospitals easily.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/doctors" className="bg-white text-green-700 px-8 py-4 rounded-full font-bold text-lg hover:shadow-2xl hover:scale-110 transition-all duration-300">
              Find Doctors
            </Link>
            <Link to="/hospitals" className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/30 transition-all duration-300">
              Browse Hospitals
            </Link>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-8 h-12 border-4 border-white/70 rounded-full flex justify-center pt-2">
            <div className="w-2 h-3 bg-white rounded-full animate-ping"></div>
          </div>
        </div>
      </section>

      {/* Quick Features Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-800 dark:text-white">
            Quick Features
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-12 text-lg">
            Everything you need for your healthcare journey
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link to="/age-calculator" className="group bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-transparent hover:border-green-500">
              <div className="text-6xl mb-4 text-center">🎂</div>
              <h3 className="text-xl font-bold mb-2 text-center text-gray-800 dark:text-white group-hover:text-green-600">Age Calculator</h3>
              <p className="text-gray-600 dark:text-gray-300 text-center">Calculate your age with smooth animation</p>
            </Link>
            <Link to="/ai-chat" className="group bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-transparent hover:border-blue-500">
              <div className="text-6xl mb-4 text-center">🤖</div>
              <h3 className="text-xl font-bold mb-2 text-center text-gray-800 dark:text-white group-hover:text-blue-600">TENA AI Chat</h3>
              <p className="text-gray-600 dark:text-gray-300 text-center">Get health advice from our AI assistant</p>
            </Link>
            <Link to="/nutrition-game" className="group bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-transparent hover:border-orange-500">
              <div className="text-6xl mb-4 text-center">🎮</div>
              <h3 className="text-xl font-bold mb-2 text-center text-gray-800 dark:text-white group-hover:text-orange-600">Lunchbox Hero</h3>
              <p className="text-gray-600 dark:text-gray-300 text-center">Fun nutrition game - catch healthy foods!</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-800 dark:text-white">
            Why Choose Tena Flow?
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-12 text-lg">
            We make healthcare accessible to everyone
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="text-6xl mb-4">🏥</div>
              <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">Top Hospitals</h3>
              <p className="text-gray-600 dark:text-gray-300">Access to the best hospitals in your area</p>
            </div>
            <div className="text-center p-6">
              <div className="text-6xl mb-4">👨‍⚕️</div>
              <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">Expert Doctors</h3>
              <p className="text-gray-600 dark:text-gray-300">Book appointments with experienced specialists</p>
            </div>
            <div className="text-center p-6">
              <div className="text-6xl mb-4">📱</div>
              <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">Easy Booking</h3>
              <p className="text-gray-600 dark:text-gray-300">Book appointments in just a few clicks</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-teal-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4 text-white">Ready to Book Your Appointment?</h2>
          <p className="text-white/90 mb-8 text-lg">Join thousands of happy patients</p>
          <Link to="/register" className="inline-block bg-white text-green-700 px-10 py-4 rounded-full font-bold text-lg hover:shadow-2xl hover:scale-110 transition-all duration-300">
            Get Started Now
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home
