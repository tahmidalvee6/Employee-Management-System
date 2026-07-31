import { useEffect, useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import StatCard from "../components/StatCard"
import api from "../api/axios"
import toast from "react-hot-toast"

const Dashboard = () => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        api.get('/dashboard').then((res)=>setData(res.data)).catch((error)=>
        toast.error(error.response?.data?.error || error?.message)).finally(()=>
        setLoading(false))
    }, [])

    if (loading) return <div>Loading...</div>

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <StatCard title="Total Employees" value={data?.totalEmployees || 0} />
                <StatCard title="Today Attendance" value={data?.todayAttendance || 0} />
                <StatCard title="Pending Leaves" value={data?.pendingLeaves || 0} />
                <StatCard title="Total Payslips" value={data?.totalPayslips || 0} />
            </div>
        </div>
    )
}

export default Dashboard