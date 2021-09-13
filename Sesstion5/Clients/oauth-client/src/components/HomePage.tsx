import React from 'react'
import { useHistory } from 'react-router-dom';

export default function Homepage() {
    const history = useHistory();

    const protectedBtc = ()=>{
        return history.push('/protected');
    }
    const login = ()=>{
        return history.push('/login');

    }
    return (
        <div>
            Home
            <br />
            <button type="button" onClick={protectedBtc}>protected</button>
            <button type="button" onClick={login}>login</button>

        </div>
    )
}
