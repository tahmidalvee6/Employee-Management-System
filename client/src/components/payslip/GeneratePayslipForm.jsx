import { useState } from 'react'
import { Download } from 'lucide-react'
import { dummyEmployeeData } from '../../assets/assets'
import api from '../../api/axios'
import toast from 'react-hot-toast'

const GeneratePayslipForm = ({ employees, onSuccess }) => {

    const [isOpen, setIsOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const renderBtn = () => (
        <button className="flex gap-2 items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            <Download size={18} />
        </button>
    )

    if (!employees || employees.length === 0) {
        return <p className="text-slate-500 text-sm">No employees available to generate payslip.</p>
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        const data = new FormData(e.target);
        try {
            await api.post('/payslips', data)
            setIsOpen(false)
            onSuccess()
        } catch (error) {
            toast.error(error.response?.data?.error || error.message);
        }
        setLoading(false)
    }

    return (
        <>
            {renderBtn()}
            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-96">
                        <h2 className="text-xl font-bold mb-4">Generate Payslip</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Select Employee</label>
                                <select name="employeeId" required className="w-full border rounded px-3 py-2">
                                    <option value="">Choose an employee</option>
                                    {employees.map((emp) => (
                                        <option key={emp.id} value={emp.id}>
                                            {emp.firstName} {emp.lastName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Month</label>
                                <input type="month" name="month" required className="w-full border rounded px-3 py-2" />
                            </div>
                            <div className="flex gap-2 justify-end">
                                <button
                                    type="button"
                                    onClick={() => setIsOpen(false)}
                                    className="px-4 py-2 text-gray-700 border rounded hover:bg-gray-100"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-green-400"
                                >
                                    {loading ? 'Generating...' : 'Generate'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}

export default GeneratePayslipForm