import React from 'react'
import { useHistory } from 'react-router-dom';
import AuthService from '../services/AuthService';

export default function CallBackLogin() {
    const authService:AuthService=new AuthService();
    authService.redirectCallback();
    const history = useHistory();
    history.push('/');
    return (
        <div>
            CallBackLogin
        </div>
    )
}
