import { useState, useEffect } from "react"
import { User, Lock, LogOut } from "lucide-react"
import ProfileForm from "../components/ProfileForm"
import ChangePasswordModal from "../components/ChangePasswordModal"
import { useAuth } from "../context/AuthContext"
import api from "../api/axios"
import toast from 'react-hot-toast'

const Settings = () => {

    const { logout } = useAuth()
    const [profile, setProfile] = useState(null)
    const [loading, setLoading] = useState(false)
    const [changePasswordOpen, setChangePasswordOpen] = useState(false)

    useEffect(() => {
        setLoading(true);
        api.get('/employees/me')
            .then((res) => {
            const profile = res.data;
            if(profile) setProfile(profile)
        }).catch((error) => {
            toast.error(error.response?.data?.error || error.message)
        }).finally(() => {
            setLoading(false)
        })
    }, [])

    return (
        <div className="p-8 max-w-4xl">
            <h1 className="text-3xl font-bold mb-8">Settings</h1>

            {loading ? (
                <div>Loading...</div>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="md:col-span-1">
                            <div className="bg-white rounded-lg shadow p-6 space-y-4">
                                <button className="w-full flex items-center gap-2 px-4 py-2 text-left hover:bg-slate-100 rounded">
                                    <User size={20} />
                                    Profile
                                </button>
                                <button
                                    onClick={() => setChangePasswordOpen(true)}
                                    className="w-full flex items-center gap-2 px-4 py-2 text-left hover:bg-slate-100 rounded"
                                >
                                    <Lock size={20} />
                                    Change Password
                                </button>
                                <button
                                    onClick={logout}
                                    className="w-full flex items-center gap-2 px-4 py-2 text-left text-red-600 hover:bg-red-50 rounded"
                                >
                                    <LogOut size={20} />
                                    Logout
                                </button>
                            </div>
                        </div>
                        <div className="md:col-span-2">
                            {profile && <ProfileForm initialData={profile} />}
                        </div>
                    </div>
                </>
            )}
            <ChangePasswordModal open={changePasswordOpen} onClose={() => setChangePasswordOpen(false)} />
        </div>
    )
}

export default Settings