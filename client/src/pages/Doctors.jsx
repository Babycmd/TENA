import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const Doctors = () => {
  const [doctors, setDoctors] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Demo data - works without backend
    setDoctors([
      { _id: '1', name: 'Dr. Sarah Johnson', specialty: 'Cardiology', hospital: 'City General', experience: 15, rating: 4.8 },
      { _id: '2', name: 'Dr. Michael Chen', specialty: 'Neurology', hospital: 'Unity Medical', experience: 12, rating: 4.9 },
      { _id: '3', name: 'Dr. Emily Brown', specialty: 'Pediatrics', hospital: 'Health Plus', experience: 10, rating: 4.7 },
      { _id: '4', name: 'Dr. James Wilson', specialty: 'Orthopedics', hospital: 'City General', experience: 18, rating: 4.9 },
    ])
    setLoading(false)
  }, [])

  if (loading) return <div className="min-h-screen py-20 bg-gray-50 dark:bg-gray-900 text-center text-gray-800 dark:text-white">Loading...</div>

  return (
    <div className="min-h-screen py-12 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-black text-center mb-8 text-gray-800 dark:text-white">Our Expert Doctors 👨‍⚕️</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map((doctor) => (
            <div key={doctor._id} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {doctor.name.charAt(0)}
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white">{doctor.name}</h3>
                  <p className="text-green-600 dark:text-green-400">{doctor.specialty}</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-2">{doctor.hospital?.name || doctor.hospital}</p>
              <p className="text-gray-600 dark:text-gray-400 mb-2">{doctor.experience} years experience</p>
              <p className="text-gray-600 dark:text-gray-400 mb-4">⭐ {doctor.rating}</p>
              <Link to={`/booking/${doctor._id}`} className="block text-center bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-xl transition-all">
                Book Appointment
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Doctors
