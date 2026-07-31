import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DEPARTMENTS } from '../assets/assets'
import api from '../api/axios'
import toast from 'react-hot-toast'

const EmployeeForm = ({ initialData, onSuccess, onCancel }) => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({})
    const isEditMode = !!initialData

    useEffect(() => {
        if (initialData) {
            setFormData(initialData)
        }
    }, [initialData])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        const method = isEditMode ? 'put' : 'post'
        const url = isEditMode ? `/employees/${initialData.id}` : '/employees'
        try {
            await api[method](url, formData)
            onSuccess ? onSuccess() : navigate("/employees")
        } catch(error) {
            toast.error(error.response?.data?.error || error.message);
        } finally {
            setLoading(false);
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
            <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-8">
                <h1 className="text-2xl font-bold text-slate-900 mb-6">
                    {isEditMode ? 'Edit Employee' : 'Add New Employee'}
                </h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm text-slate-700">
                        <div>
                            <label className="block mb-2">First Name</label>
                            <input type="text" name="firstName" value={formData.firstName || ''} onChange={handleChange} required />
                        </div>
                        <div>
                            <label className="block mb-2">Last Name</label>
                            <input type="text" name="lastName" value={formData.lastName || ''} onChange={handleChange} required />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm text-slate-700">
                        <div>
                            <label className="block mb-2">Email</label>
                            <input type="email" name="email" value={formData.email || ''} onChange={handleChange} required />
                        </div>
                        <div>
                            <label className="block mb-2">Phone</label>
                            <input type="tel" name="phone" value={formData.phone || ''} onChange={handleChange} required />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm text-slate-700">
                        <div>
                            <label className="block mb-2">Position</label>
                            <input type="text" name="position" value={formData.position || ''} onChange={handleChange} required />
                        </div>
                        <div>
                            <label className="block mb-2">Department</label>
                            <select name="department" defaultValue={initialData?.department || ""}>
                                <option value=""> Select Department </option>
                                {DEPARTMENTS.map((deptName) => (
                                    <option key={deptName} value={deptName}>
                                        {deptName}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm text-slate-700">
                        <div>
                            <label className="block mb-2">Join Date</label>
                            <input type="date" name="joinDate" value={formData.joinDate || ''} onChange={handleChange} required />
                        </div>
                        <div>
                            <label className="block mb-2">Basic Salary</label>
                            <input type="number" name="basicSalary" min="0" step="0.01" required value={formData.basicSalary || 0} onChange={handleChange} />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm text-slate-700">
                        <div>
                            <label className="block mb-2"> Allowances </label>
                            <input type="number" name="allowance" min="0" step="0.01" required defaultValue={initialData?.allowances || 0} />
                        </div>
                        <div>
                            <label className="block mb-2"> Deductions </label>
                            <input type="number" name="deduction" min="0" step="0.01" required defaultValue={initialData?.deductions || 0} />
                        </div>
                    </div>
                    {isEditMode && (
                        <div>
                            <label className="block mb-2"> Status </label>
                            <select name="employeeStatus" defaultValue={initialData?.employeeStatus || "ACTIVE"} >
                                <option value="ACTIVE"> Active</option>
                                <option value="INACTIVE">Inactive</option>
                            </select>
                        </div>
                    )}

                    <div>
                        <label className="block mb-2">Bio</label>
                        <textarea name="bio" rows="4" value={formData.bio || ''} onChange={handleChange} className="w-full border border-slate-300 rounded px-3 py-2"></textarea>
                    </div>

                    <div className="flex gap-4 justify-center">
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400"
                        >
                            {loading ? 'Saving...' : 'Save Employee'}
                        </button>
                        {onCancel && (
                            <button
                                type="button"
                                onClick={onCancel}
                                className="px-6 py-2 bg-slate-300 text-slate-700 rounded-lg hover:bg-slate-400"
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EmployeeForm