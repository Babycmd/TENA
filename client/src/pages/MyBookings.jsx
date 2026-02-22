import { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import axios from 'axios'
import { Link } from 'react-router-dom'

const MyBookings = () => {
  const { user } = useContext(AuthContext)
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)

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
      setLoading(false)
    }
    fetchBookings()
  }, [user])

  if (loading) return <div className="min-h-screen py-20 text-center text-gray-800 dark:text-white bg-gray-50 dark:bg-gray-900">Loading...</div>

  return (
    <div className="min-h-screen py-12 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-black mb-8 text-gray-800 dark:text-white">My Bookings 📋</h1>
        
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div key={booking._id} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">{booking.doctorName || 'Doctor'}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-1">📅 {booking.date}</p>
                  <p className="text-gray-600 dark:text-gray-400 mb-1">⏰ {booking.time}</p>
                  {booking.symptoms && <p className="text-gray-600 dark:text-gray-400">Symptoms: {booking.symptoms}</p>}
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  booking.status === 'confirmed' ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' : 
                  booking.status === 'cancelled' ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' : 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400'
                }`}>
                  {booking.status}
                </span>
              </div>
            </div>
          ))}
          {bookings.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400 mb-4">No bookings yet</p>
              <Link to="/doctors" className="inline-block px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl transition-all">Book Your First Appointment</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MyBookings
