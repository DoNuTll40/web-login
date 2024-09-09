/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
// import { useNavigate } from "react-router-dom";
import axios from "../configs/axios";
import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

function AuthContextProvider(props) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false)
    // const navigate = useNavigate();

    const token = sessionStorage.getItem('accessToken')

    useEffect( () => {
        if(token){
            fetchUser();
        }
    }, [])

    const fetchUser = async () => {
        setLoading(true)
        try {
            const rs = await axios.get('/auth/me', {
                headers: {
                    Authorization: token
                },
                withCredentials: true
            })

            if(rs.status === 200){
                setUser(rs.data.data.user)
            }
        }catch(err){
            console.log(err)
        }finally {
            setLoading(false)
        }
    }

    const logout = async () => {
        const rs = await axios.post('/auth/sign-out', {}, {
            withCredentials: true
        })
        if(rs.status === 200){
            sessionStorage.removeItem("accessToken")
            setUser(null);
            // navigate('/')
        }
    };

    const value = { user, setUser, logout, loading }

  return (
    <AuthContext.Provider value={value}>
        {props.children}
    </AuthContext.Provider>
  )
}

export { AuthContextProvider };
export default AuthContext;