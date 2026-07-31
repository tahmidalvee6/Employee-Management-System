import { createContext, useState, useEffect, useContext } from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import api from "../api/axios";
import { auth } from "../firebase";

const AuthContext = createContext(null);


export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [loading, setLoading] = useState(true);

    const refreshSession = async () => {
        const storedToken = localStorage.getItem("token");
        if(!storedToken) {
            setUser(null);
            setToken(null);
            setLoading(false);
            return;
        }
        try {
            const {data} = await api.get("/auth/session")
            setUser(data.user);
        }catch(error) {
            localStorage.removeItem("token");
            setUser(null);
            setToken(null);
        }finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        refreshSession();
    }, []);

    const login = async (email, password, role_tpe) => {
        try {
            const { data } = await api.post("/auth/login", {
                email,
                password,
                role_type: role_tpe
            });

            localStorage.setItem("token", data.token);
            setToken(data.token);
            setUser(data.user);
            return data.user;
        } catch (error) {
            throw new Error(error.response?.data?.error || error.message || "Login failed");
        }
    }

    const loginWithProvider = async (role_tpe) => {
        if (!auth) {
            throw new Error("Firebase is not configured. Please add your Firebase config values.");
        }

        try {
            const provider = new GoogleAuthProvider();
            const firebaseUser = await signInWithPopup(auth, provider);
            const firebaseToken = await firebaseUser.user.getIdToken();
            const email = firebaseUser.user.email;

            const { data } = await api.post("/auth/login", {
                email,
                role_type: role_tpe,
                firebaseToken,
            });

            localStorage.setItem("token", data.token);
            setToken(data.token);
            setUser(data.user);
            return data.user;
        } catch (error) {
            throw new Error(error.response?.data?.error || error.message || "Login failed");
        }
    }

    const logout = async () => {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
    }

    const value = { user, token, loading, login, loginWithProvider, logout, refreshSession };
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if(!ctx) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return ctx; 
}   

