import { useState } from 'react'
import { X } from 'lucide-react'
import api from '../../api/axios'
import toast from 'react-hot-toast'

const ApplyLeaveModal = ({open, onClose, onSuccess}) => {
    const [formData, setFormData] = useState({ leaveType: 'SICK', reason: '', days: 1 })
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            await api.post('/leaves', formData)
            onSuccess();
            onClose();
        } catch (error) {
            toast.error(error.response?.data?.error || error?.message)
        }
    }

    return (
        <>
            {open && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-96">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">Apply Leave</h2>
                            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                                <X size={24} />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Leave Type</label>
                                <select
                                    name="leaveType"
                                    value={formData.leaveType}
                                    onChange={(e) => setFormData({ ...formData, leaveType: e.target.value })}
                                    className="w-full border rounded px-3 py-2"
                                >
                                    <option value="SICK">Sick Leave</option>
                                    <option value="CASUAL">Casual Leave</option>
                                    <option value="EARNED">Earned Leave</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Number of Days</label>
                                <input
                                    type="number"
                                    name="days"
                                    min="1"
                                    value={formData.days}
                                    onChange={(e) => setFormData({ ...formData, days: parseInt(e.target.value) })}
                                    className="w-full border rounded px-3 py-2"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Reason</label>
                                <textarea
                                    name="reason"
                                    value={formData.reason}
                                    onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                                    className="w-full border rounded px-3 py-2"
                                    rows="3"
                                />
                            </div>
                            <div className="flex gap-2 justify-end">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="px-4 py-2 text-gray-700 border rounded hover:bg-gray-100"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-400"
                                >
                                    {loading ? 'Submitting...' : 'Apply'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}

export default ApplyLeaveModal