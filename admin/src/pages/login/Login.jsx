import { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import { login } from '../../context/authContext/apiCalls';
import { AuthContext } from '../../context/authContext/AuthContext';
import './login.css';

export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {isFetching, dispatch} = useContext(AuthContext);
    const history = useHistory();
    
    const handleLogin = async(e) =>{
        e.preventDefault();
        await login({email, password}, dispatch);
        history.push("/");
    };

    return (
        <div className="login">
            <form className="loginForm">
                <span className="loginMessage">Please Sign in to continue to Admin Dashboard</span>
                <input type="email" required placeholder="email" className="loginInput" onChange={(e)=>setEmail(e.target.value)} />
                <input type="password" required placeholder="password" className="loginInput" onChange={(e)=>setPassword(e.target.value)} />
                <button className="loginButton" onClick={handleLogin} disabled={isFetching} >Login</button>
            </form>
        </div>
    )
}
