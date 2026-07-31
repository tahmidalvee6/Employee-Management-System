import { useContext } from "react";
import { Plus, Trash2, Edit2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import api from "../api/axios";
import toast from "react-hot-toast";

const EmployeeCard = ({ employee, onDelete, onEdit }) => {
    const handleDelete = async () => {
        try {
            await api.delete(`/employees/${employee.id}`)
            onDelete()
        } catch (error) {
            toast.error(error.response?.data?.error || error.message);
        }
    }

    return (
        <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-semibold text-slate-900">
                    {employee.firstName} {employee.lastName}
                </h3>
                <div className="flex gap-2">
                    <button
                        onClick={() => onEdit(employee)}
                        className="p-2 hover:bg-blue-100 rounded-lg transition-colors text-blue-600"
                    >
                        <Edit2 size={18} />
                    </button>
                    <button
                        onClick={handleDelete}
                        className="p-2 hover:bg-red-100 rounded-lg transition-colors text-red-600"
                    >
                        <Trash2 size={18} />
                    </button>
                </div>
            </div>
            <p className="text-sm text-slate-600 mb-2">{employee.email}</p>
            <p className="text-sm text-slate-600 mb-2">{employee.phone}</p>
            <p className="text-sm font-medium text-slate-700">{employee.position}</p>
            <p className="text-xs text-slate-500 mt-2">{employee.department}</p>
        </div>
    )
}

export default EmployeeCard;