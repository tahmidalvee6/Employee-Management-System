import { createContext, useState, useEffect, useContext } from "react";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, GithubAuthProvider, signOut } from "firebase/auth";
import api from "../api/axios";
import { auth, isFirebaseConfigured } from "../firebase";

const AuthContext = createContext(null);

const getAuthErrorMessage = (error) => {
    switch (error?.code) {
        case "auth/configuration-not-found":
            return "Firebase Authentication is not configured for this app. Enable Google or GitHub in Firebase Console and add this domain to Authorized domains.";
        case "auth/operation-not-allowed":
            return "This sign-in method is not enabled in Firebase Authentication.";
        case "auth/popup-closed-by-user":
            return "The sign-in popup was closed before completion.";
        default:
            return error?.message || "Login failed";
    }
};

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
        if (!isFirebaseConfigured || !auth) {
            throw new Error("Firebase is not configured yet. Please add your Firebase config values.");
        }

        try {
            const firebaseUser = await signInWithEmailAndPassword(auth, email, password);
            const firebaseToken = await firebaseUser.user.getIdToken();

            const { data } = await api.post("/auth/login", {
                email,
                password,
                role_type: role_tpe,
                firebaseToken,
            });

            localStorage.setItem("token", data.token);
            setToken(data.token);
            setUser(data.user);
            return data.user;
        } catch (error) {
            throw new Error(getAuthErrorMessage(error));
        }
    }

    const loginWithProvider = async (providerName, role_tpe) => {
        if (!isFirebaseConfigured || !auth) {
            throw new Error("Firebase is not configured yet. Please add your Firebase config values.");
        }

        try {
            const provider = providerName === "github"
                ? new GithubAuthProvider()
                : new GoogleAuthProvider();

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
            throw new Error(getAuthErrorMessage(error));
        }
    }

    const logout = async () => {
        if (auth) {
            await signOut(auth);
        }
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

