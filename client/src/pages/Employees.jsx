import { useCallback, useEffect, useState } from "react"
import { dummyEmployeeData, DEPARTMENTS } from "../assets/assets.jsx"
import { Plus, Search, XIcon } from "lucide-react"
import EmployeeCard from "../components/EmployeeCard"
import EmployeeForm from "../components/EmployeeForm"
import api from "../api/axios"

const Employees = () => {
    const [employees, setEmployees] = useState([])
    const [filteredEmployees, setFilteredEmployees] = useState([])
    const [selectedDept, setSelectedDept] = useState('')
    const [searchTerm, setSearchTerm] = useState('')
    const [showForm, setShowForm] = useState(false)
    const [selectedEmployee, setSelectedEmployee] = useState(null)

    const fetchEmployees = useCallback(async () => {
        try {
            const url = selectedDept ? `/employees?department=${selectedDept}` : "/employees";
            const res = await api.get(url)
            setEmployees(res.data)
        } catch (error) {
            console.error("Error fetching employees:", error);
        }
    }, [selectedDept])

    useEffect(() => {
        fetchEmployees()
    }, [fetchEmployees])

    useEffect(() => {
        const filtered = employees.filter(emp =>
            emp.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            emp.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            emp.email.toLowerCase().includes(searchTerm.toLowerCase())
        )
        setFilteredEmployees(filtered)
    }, [employees, searchTerm])

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Employees</h1>
                <button
                    onClick={() => { setShowForm(true); setSelectedEmployee(null) }}
                    className="flex gap-2 items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    <Plus size={20} />
                    Add Employee
                </button>
            </div>

            <div className="mb-6 flex gap-4 flex-wrap">
                <div className="flex-1 min-w-64">
                    <div className="relative">
                        <Search className="absolute left-3 top-3 text-slate-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search by name or email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>
                <select
                    value={selectedDept}
                    onChange={(e) => setSelectedDept(e.target.value)}
                    className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">All Departments</option>
                    {DEPARTMENTS.map(dept => (
                        <option key={dept} value={dept}>{dept}</option>
                    ))}
                </select>
                {selectedDept && (
                    <button
                        onClick={() => setSelectedDept('')}
                        className="px-4 py-2 bg-slate-300 text-slate-700 rounded-lg hover:bg-slate-400 flex gap-2 items-center"
                    >
                        <XIcon size={18} />
                        Clear
                    </button>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEmployees.map(employee => (
                    <div key={employee.id} onClick={() => { setSelectedEmployee(employee); setShowForm(true) }} className="cursor-pointer">
                        <EmployeeCard employee={employee} onDelete={fetchEmployees} onEdit={(emp) => { setSelectedEmployee(emp); setShowForm(true) }} />
                    </div>
                ))}
            </div>

            {showForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
                    <div className="bg-white rounded-lg max-h-96 overflow-y-auto w-full max-w-2xl">
                        <EmployeeForm
                            initialData={selectedEmployee}
                            onSuccess={() => { fetchEmployees(); setShowForm(false) }}
                            onCancel={() => { setShowForm(false); setSelectedEmployee(null) }}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}

export default Employees