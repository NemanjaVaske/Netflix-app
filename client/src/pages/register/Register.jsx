import './register.scss';
import { useState, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

const Register = () => {

    const[email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const history = useHistory();

    const emailRef = useRef();

    const handleStart = () =>{
        setEmail(emailRef.current.value);
    }

    

    const handleFinish = async(e)=>{
        e.preventDefault();
        try {
            await axios.post("http://localhost:8800/api/auth/register" , { username, email, password });
            history.push("/login")
        } catch (error) {
            console.log(error)
        }
    }
   
    return (
        <div>
            <div className="register">
                <div className="top">
                    <div className="wrapper">
                        <img className="logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png" alt="" />
                        
                            <Link to="/login" className="loginButton">Sign In</Link>
                        
                    </div>
                </div>
                <div className="container">
                    <h1>Unlimited movies, TV shows, and more.</h1>
                    <h2>Watch anywhere. Cancel anytime.</h2>
                    <p>
                      Ready to watch? Enter your email to create or restart your membership.
                    </p>
                    {!email ? (
                        <div className="input">
                            <input type="email" placeholder="email adress" ref={emailRef}/>
                            <button className="registerButton" onClick={handleStart}>Get Started</button>
                        </div>
                    ) : (
                        <form className="input">
                            <input type="text" placeholder="username" onChange={(e)=>setUsername(e.target.value)} />
                            <input type="password" placeholder="password" onChange={(e)=>setPassword(e.target.value)} />
                            <button className="registerButton" onClick={handleFinish}>Start</button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Register;
