import { createContext, useEffect, useState } from "react";
import API from "../api/axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await API.get("/api/check-user");
                setUser(res.data);
            } catch (err) {
                setUser(null);
            }
        };
        checkAuth();
    }, []);

    useEffect(() => {
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
        } else {
            localStorage.removeItem("user");
        }
    }, [user]);


    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;