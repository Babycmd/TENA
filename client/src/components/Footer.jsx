import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-black text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-black text-tena-green mb-4">TENAFLOW</h3>
            <p className="text-gray-400">Your trusted healthcare booking platform.</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/hospitals" className="text-gray-400 hover:text-tena-green">Hospitals</Link></li>
              <li><Link to="/doctors" className="text-gray-400 hover:text-tena-green">Doctors</Link></li>
              <li><Link to="/booking" className="text-gray-400 hover:text-tena-green">Book Now</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <p className="text-gray-400">Email: support@tenaflow.com</p>
            <p className="text-gray-400">Phone: 0978788034</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-tena-green">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-tena-green">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; 2024 Tena Flow. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
