import { createContext, useEffect, useState } from 'react';

export const DataContext = createContext(null);

const DataProvider = ({ children }) => {
    const [user, setUser] = useState({
        userId: '',
        name: '',
        username: '',
        email: '',
        pic: '',
        location: '',
        interests: []
    });
    const API_URL = 'http://localhost:5000'
    useEffect(() => {
        const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
        if (userInfo !== null) {
            Object.entries(userInfo).forEach(([key, value]) => {
                // Ensure key is valid before updating setUser
                if (key) {
                    setUser(prevUser => ({
                        ...prevUser,
                        [key]: value
                    }));
                }
                // else {
                //     console.error(`Invalid key: ${key}`);
                // }
            });
        }
    }, []);

    return (<DataContext.Provider value={{ user, setUser,API_URL }}>{children}</DataContext.Provider>)
}

export default DataProvider;