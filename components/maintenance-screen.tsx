import { Construction } from "lucide-react"

export default function MaintenanceScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Construction className="w-8 h-8 text-orange-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Under Maintenance</h1>
        <p className="text-gray-600 mb-6">
          We're currently performing some maintenance on our website. We'll be back shortly.
        </p>
        <div className="text-sm text-gray-500">
          Please check back later or contact us for urgent inquiries.
        </div>
        <div className="mt-6 text-xs text-gray-400">
          Yesha Enterprises
        </div>
      </div>
    </div>
  )
}