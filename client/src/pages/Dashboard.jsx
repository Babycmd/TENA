import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import axios from 'axios'

const Dashboard = () => {
  const { user, loading } = useContext(AuthContext)
  const navigate = useNavigate()
  const [bookings, setBookings] = useState([])

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login')
    }
  }, [user, loading, navigate])

  useEffect(() => {
    const fetchBookings = async () => {
      if (!user) return
      try {
        const token = localStorage.getItem('token')
        const response = await axios.get('http://localhost:5000/api/booking/my-bookings', {
          headers: { Authorization: `Bearer ${token}` }
        })
        setBookings(response.data.bookings)
      } catch (error) {
        console.error('Error fetching bookings:', error)
      }
    }
    fetchBookings()
  }, [user])

  if (loading) return <div className="min-h-screen py-20 text-center text-gray-800 dark:text-white bg-gray-50 dark:bg-gray-900">Loading...</div>
  if (!user) return null

  return (
    <div className="min-h-screen py-12 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-black mb-8 text-gray-800 dark:text-white">Welcome, {user.name}! 👋</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg text-center">
            <div className="text-4xl mb-2">📅</div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{bookings.length}</h3>
            <p className="text-gray-600 dark:text-gray-400">Total Bookings</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg text-center">
            <div className="text-4xl mb-2">✅</div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{bookings.filter(b => b.status === 'confirmed').length}</h3>
            <p className="text-gray-600 dark:text-gray-400">Confirmed</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg text-center">
            <div className="text-4xl mb-2">⏳</div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{bookings.filter(b => b.status === 'pending').length}</h3>
            <p className="text-gray-600 dark:text-gray-400">Pending</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 mb-8">
          <Link to="/doctors" className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl transition-all">Book New Appointment</Link>
          <Link to="/my-bookings" className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-all">View All Bookings</Link>
          <Link to="/age-calculator" className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-all">Age Calculator</Link>
        </div>

        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Recent Bookings</h2>
        <div className="space-y-4">
          {bookings.slice(0, 5).map((booking) => (
            <div key={booking._id} className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg flex justify-between items-center">
              <div>
                <h3 className="font-bold text-gray-800 dark:text-white">{booking.doctorName || 'Doctor'}</h3>
                <p className="text-gray-600 dark:text-gray-400">{booking.date} at {booking.time}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm ${
                booking.status === 'confirmed' ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' : 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400'
              }`}>
                {booking.status}
              </span>
            </div>
          ))}
          {bookings.length === 0 && <p className="text-gray-600 dark:text-gray-400">No bookings yet.</p>}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
