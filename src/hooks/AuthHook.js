
import { useContext } from 'react';
import AuthContext from '../contexts/AuthContext'

export default function AuthHook() {
    return useContext(AuthContext)
}