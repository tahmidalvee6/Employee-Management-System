import { ShieldIcon, UserIcon } from "lucide-react"
import { Link, Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import Loading from "../components/Loading"
import LoginLeftSide from "../components/LoginLeftSide"

const LoginLanding = () => {
    const {user, loading} = useAuth()
    if(loading) return <Loading/>
    if(user) return <Navigate to="/"/>

    const portalOptions = [
        {
            to: "/login/admin",
            title: "Admin Portal",
            desciption: "Manage employees, departments, payroll, and system configuration.",
            icon: ShieldIcon,
            color: "from-indigo-500 to-purple-600",
            iconBg: "bg-indigo-100 text-indigo-600",
        },
        {
            to: "/login/employee",
            title: "Employee Portal",
            desciption: "View your profile, track attendance, request time off, and access payslips.",
            icon: UserIcon,
            color: "from-emerald-500 to-teal-600",
            iconBg: "bg-emerald-100 text-emerald-600",
        }
    ]
    return (
        <div className="min-h-screen flex flex-col md:flex-row">
            <LoginLeftSide />
            <div className="flex-1 flex items-center justify-center p-6 sm:p-12 lg:p-16 bg-gradient-to-br from-slate-50 via-white to-indigo-50">
                <div className="w-full max-w-md animate-fade-in relative z-10">
                    <div className="mb-10 text-center md:text-left">
                        <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-3">Welcome Back</h2>
                        <p className="text-slate-500">Select your portal to securely access the system.</p>
                    </div>

                    <div className="space-y-4">
                        {portalOptions.map((portal) => (
                            <Link key={portal.to} to={portal.to}
                                className="group block bg-white border border-slate-200 rounded-xl p-6 sm:p-6 transition-all duration-300 hover:border-transparent hover:shadow-xl hover:-translate-y-1">
                                <div className={`relative overflow-hidden rounded-xl p-0.5 bg-gradient-to-r ${portal.color} group-hover:scale-[1.02] transition-transform`}>
                                    <div className="bg-white rounded-xl h-full">
                                        <div className="flex items-center justify-between p-5">
                                            <div className="flex items-center gap-4">
                                                <div className={`w-12 h-12 rounded-xl ${portal.iconBg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                                                    <portal.icon className="w-6 h-6" />
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-semibold text-slate-800 group-hover:text-slate-900">{portal.title}</h3>
                                                    <p className="text-sm text-slate-500 mt-0.5">{portal.desciption}</p>
                                                </div>
                                            </div>
                                            <div className="text-slate-300 group-hover:text-slate-400 transition-colors">
                                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M5 10H15M15 10L10 5M15 10L10 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    <div className="mt-12 text-center md:text-left text-sm text-slate-400">
                        <p>&copy; {new Date().getFullYear()} Employee Management System. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginLanding