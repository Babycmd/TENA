import { useState, useEffect } from 'react'
import axios from 'axios'

const Admin = () => {
  const [bookings, setBookings] = useState([])
  const [users, setUsers] = useState([])
  const [activeTab, setActiveTab] = useState('bookings')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token')
        if (activeTab === 'bookings') {
          const response = await axios.get('http://localhost:5000/api/admin/bookings', {
            headers: { Authorization: `Bearer ${token}` }
          })
          setBookings(response.data.bookings)
        } else {
          const response = await axios.get('http://localhost:5000/api/admin/users', {
            headers: { Authorization: `Bearer ${token}` }
          })
          setUsers(response.data.users)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
        // Demo data
        if (activeTab === 'bookings') {
          setBookings([
            { _id: '1', patientName: 'John Doe', doctorName: 'Dr. Sarah', date: '2024-02-20', status: 'confirmed' },
            { _id: '2', patientName: 'Jane Smith', doctorName: 'Dr. Michael', date: '2024-02-21', status: 'pending' },
          ])
        } else {
          setUsers([
            { _id: '1', name: 'John Doe', email: 'john@example.com', role: 'user' },
            { _id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'user' },
          ])
        }
      }
    }
    fetchData()
  }, [activeTab])

  return (
    <div className="min-h-screen py-12 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-black mb-8 text-gray-800 dark:text-white">Admin Dashboard 👨‍💼</h1>
        
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('bookings')}
            className={`px-4 py-2 rounded-lg ${activeTab === 'bookings' ? 'bg-green-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
          >
            All Bookings
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`px-4 py-2 rounded-lg ${activeTab === 'users' ? 'bg-green-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
          >
            All Users
          </button>
        </div>

        {activeTab === 'bookings' ? (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div key={booking._id} className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-gray-800 dark:text-white">{booking.patientName}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{booking.doctorName} - {booking.date}</p>
                </div>
                <select
                  className="px-3 py-1 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                  defaultValue={booking.status}
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {users.map((user) => (
              <div key={user._id} className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-gray-800 dark:text-white">{user.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
                </div>
                <span className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-sm text-gray-700 dark:text-gray-300">
                  {user.role}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Admin
