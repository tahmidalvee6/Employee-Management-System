import { createContext, useState, useEffect, useContext } from "react";
import api from "../api/axios";

const AuthContext = createContext(null);


export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);
            api.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
            api.get("/auth/me")
                .then((res) => setUser(res.data.user))
                .catch(() => {
                    localStorage.removeItem("token");
                    setToken(null);
                })
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
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

    const loginWithProvider = async (providerName, role_tpe) => {
        try {
            const { data } = await api.post("/auth/login", {
                email: providerName === "github" ? "github_user" : "google_user",
                password: "",
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

    const logout = async () => {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, token, login, logout, loginWithProvider, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);