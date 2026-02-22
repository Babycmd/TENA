import { useState, useEffect } from 'react'

const Hospitals = () => {
  const [hospitals, setHospitals] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Demo data - works without backend
    setHospitals([
      { _id: '1', name: 'City General Hospital', address: '123 Main St', phone: '555-0101', specialties: ['Cardiology', 'Neurology'] },
      { _id: '2', name: 'Unity Medical Center', address: '456 Oak Ave', phone: '555-0102', specialties: ['Pediatrics', 'Oncology'] },
      { _id: '3', name: 'Health Plus Hospital', address: '789 Pine Rd', phone: '555-0103', specialties: ['Orthopedics', 'Surgery'] },
    ])
    setLoading(false)
  }, [])

  if (loading) return <div className="min-h-screen py-20 bg-gray-50 dark:bg-gray-900 text-center text-gray-800 dark:text-white">Loading...</div>

  return (
    <div className="min-h-screen py-12 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-black text-center mb-8 text-gray-800 dark:text-white">Our Hospitals 🏥</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hospitals.map((hospital) => (
            <div key={hospital._id} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all">
              <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">{hospital.name}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-2">{hospital.address}</p>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{hospital.phone}</p>
              <div className="flex flex-wrap gap-2">
                {hospital.specialties?.map((spec, i) => (
                  <span key={i} className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-3 py-1 rounded-full text-sm">
                    {spec}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Hospitals
