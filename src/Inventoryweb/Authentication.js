import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext, createContext } from 'react';

const AuthContext = createContext();

const Authentication = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("UserDetails"));
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    const loginAction = async (data) => {
        try {
            const response = await fetch('https://inventory-api.vercel.app/postemail', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data),
            });

            const res = await response.json();
            console.log(res);
            if (res.data.length === 1) {
                const userData = {
                    id: res.data[0].id,
                    name: res.data[0].name,
                };
                setUser(userData);
                localStorage.setItem("UserDetails", JSON.stringify(userData));
                navigate('/addbusiness');
            } else {
                alert(res.message);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("UserDetails");
        navigate('/');
    };

    return (
        <AuthContext.Provider value={{ user, loginAction, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default Authentication;

export const useAuth = () => {
    return useContext(AuthContext);
};
