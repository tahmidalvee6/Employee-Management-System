import { useEffect, useState } from "react"
import { dummyProfileData } from "../assets/assets"
import Loading from "../components/Loading"
import { Lock } from "lucide-react"
import ProfileForm from "../components/ProfileForm"
import ChangePasswordModal from "../components/ChangePasswordModal"
<<<<<<< HEAD
import { useAuth } from "../context/AuthContext"
import api from "../api/axios"

const Settings = () => {

    const {user} = useAuth()
=======

const Settings = () => {

>>>>>>> ca03ae14e9570d22225491143a38c5ac58307437
    const [profile, setProfile] = useState(null)
    const [loading, setLoading] = useState(true)
    const [showPasswordModal, setShowPasswordModal] = useState(false)

    const fetchProfile = async () => {
<<<<<<< HEAD
        try {
            const res = await api.get("/profile")
            const profile = res.data;
            if(profile) setProfile(profile)
        } catch (error) {
            toast.error(err?.response?.data?.error || err?.message)
        } finally {
            setLoading(false)
        }
=======
        setProfile(dummyProfileData)
        setTimeout(() => {
            setLoading(false);
        }, 1000);
>>>>>>> ca03ae14e9570d22225491143a38c5ac58307437
    }

    useEffect(()=>{
        fetchProfile()
<<<<<<< HEAD
    },[user])
=======
    },[])
>>>>>>> ca03ae14e9570d22225491143a38c5ac58307437

    if(loading) return <Loading />

    return(
        <div className="animate-fade-in">
            <div className="page-header">
                <h1 className="page-title">Settings</h1>
                <p className="page-subtitle">Manage your account and preferences</p>
            </div>

            {profile && <ProfileForm initialData={profile} onSuccess={fetchProfile} />}

            {/* Change Password trigger */}
            <div className="card max-w-md p-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-slate-100 rounded-lg">
                        <Lock className="w-5 h-5 text-slate-600" />
                    </div>
                    <div>
                        <p className="font-medium text-slate-900">Password</p>
                        <p className="text-sm text-slate-500">Update your account password</p>
                    </div>
                </div>
                <button onClick={()=> setShowPasswordModal(true)} className="btn-secondary text-sm">
                    Change
                </button>
            </div>

            <ChangePasswordModal open={showPasswordModal} onClose={()=> setShowPasswordModal(false)} />

        </div>
    )
}

export default Settings