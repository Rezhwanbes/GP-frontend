import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [userProgress, setUserProgress] = useState({
        currentLevel: 1,
        completedLevels: []
    });

    useEffect(() => {
        const initializeAuth = async () => {
            const storedUser = localStorage.getItem('user');
            const token = localStorage.getItem('token');

            if (storedUser && token) {
                try {
                    setUser(JSON.parse(storedUser));
                    await fetchUserProgress(token);
                } catch (error) {
                    console.error("Initialization error:", error);
                    logout();
                }
            }
            setIsLoading(false);
        };

        initializeAuth();
    }, []);

    const fetchUserProgress = async (token) => {
        try {
            const response = await fetch('http://localhost:5000/api/auth/progress', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch progress');
            }

            const data = await response.json();
            setUserProgress({
                currentLevel: data.current_level,
                completedLevels: data.completed_levels || []
            });
        } catch (err) {
            console.error('Error fetching progress:', err);
            throw err;
        }
    };

    const login = async (userData, token) => {
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', token);
        setUser(userData);
        await fetchUserProgress(token);
    };

    const logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setUser(null);
        setUserProgress({
            currentLevel: 1,
            completedLevels: []
        });
    };

    const completeLevel = async (levelId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:5000/api/auth/progress/${levelId}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Failed to complete level');
            }

            const data = await response.json();
            setUserProgress({
                currentLevel: data.current_level,
                completedLevels: data.completed_levels
            });
            return true;
        } catch (err) {
            console.error('Error completing level:', err);
            return false;
        }
    };

    return (
        <AuthContext.Provider value={{
            user,
            isLoading,
            login,
            logout,
            userProgress,
            completeLevel
        }}>
            {!isLoading && children}
        </AuthContext.Provider>
    );
};