import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import LoginLeftSide from "./LoginLeftSide"
import { ArrowLeftIcon, EyeIcon, EyeOffIcon, Loader2Icon, MailIcon } from "lucide-react"
import { useAuth } from "../context/AuthContext"
import toast from "react-hot-toast"
import { FaGoogle } from "react-icons/fa"

const LoginForm = ({ role, title, subtitle }) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [googleLoading, setGoogleLoading] = useState(false)
    const { login, loginWithProvider } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("")
        setLoading(true)
        try {
            await login(email, password, role)
            navigate("/dashboard")
        } catch (error) {
            toast.error(error.message || "Login failed")
        } finally {
            setLoading(false)
        }
    }

    const handleGoogleLogin = async () => {
        setError("")
        setGoogleLoading(true)
        try {
            await loginWithProvider(role)
            navigate("/dashboard")
        } catch (error) {
            toast.error(error.message || "Login failed")
        } finally {
            setGoogleLoading(false)
        }
    }

    const isEmployee = role === "employee"

    return (
        <div className="min-h-screen flex flex-col md:flex-row">
            <LoginLeftSide />

            <div className="flex-1 flex items-center justify-center p-6 sm:p-12 bg-gradient-to-br from-slate-50 via-white to-indigo-50">
                <div className="w-full max-w-md animate-fade-in">
                    <Link to="/login" className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-700 text-sm mb-10 transition-colors group">
                        <ArrowLeftIcon size={16} className="group-hover:-translate-x-1 transition-transform" />
                        Back to portals
                    </Link>
                    <div className="mb-8">
                        <h1 className="text-2xl sm:text-3xl font-medium text-zinc-800">{title}</h1>
                        <p className="text-slate-500 text-sm sm:text-base mt-2"> {subtitle} </p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 bg-rose-50 border border-rose-200 text-rose-700 text-sm rounded-xl flex items-start gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                            {error}
                        </div>
                    )}

                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Email address</label>
                            <div className="relative">
                                <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    placeholder="you@company.com"
                                    className="pl-10"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="pr-11"
                                    placeholder="**********"
                                />
                                <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors" onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-indigo-600 text-white py-3 rounded-xl font-medium hover:bg-indigo-700 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg shadow-indigo-200"
                        >
                            {loading && <Loader2Icon className="animate-spin h-4 w-4" />}
                            Sign in
                        </button>

                        {isEmployee && (
                            <>
                                <div className="flex items-center gap-3">
                                    <div className="h-px flex-1 bg-slate-200" />
                                    <span className="text-xs uppercase text-slate-400">or continue with</span>
                                    <div className="h-px flex-1 bg-slate-200" />
                                </div>

                                <button
                                    type="button"
                                    onClick={handleGoogleLogin}
                                    disabled={googleLoading}
                                    className="w-full bg-white border border-slate-200 hover:border-slate-300 text-slate-700 py-3.5 rounded-xl font-medium flex items-center justify-center gap-3 transition-all duration-200 hover:shadow-md disabled:opacity-50 group"
                                >
                                    {googleLoading && <Loader2Icon className="animate-spin h-4 w-4" />}
                                    <FaGoogle className="text-red-500 text-lg group-hover:scale-110 transition-transform" />
                                    Sign in with Google
                                </button>
                                <p className="text-xs text-slate-400 text-center mt-4">
                                    Use your company email address to sign in with Google.
                                </p>
                            </>
                        )}

                        {!isEmployee && (
                            <div className="flex items-center gap-3 mt-6">
                                <div className="h-px flex-1 bg-slate-200" />
                                <span className="text-xs uppercase text-slate-400">Admin access</span>
                                <div className="h-px flex-1 bg-slate-200" />
                            </div>
                        )}
                    </form>

                    <div className="mt-8 text-center text-sm text-slate-400">
                        <p>&copy; {new Date().getFullYear()} Employee Management System. All rights reserved.</p>
                    </div>
                </div>
            </div>

        </div>
    )
}
export default LoginForm
