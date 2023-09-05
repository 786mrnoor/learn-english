import { NavLink, useNavigate } from 'react-router-dom';
import './Login.css';
import { login } from '../serverConfig/Authentication';
import { useState } from 'react';
import Loader from '../component/Loader';

export default function Login() {
    const navigate = useNavigate();
    const [showLoader, setShowLoader] = useState(false);
    const [data, setData] = useState({ email: '', pass: '' });
    const [err, setErr] = useState({ email: '', pass: '' });

    function handleLogin() {
        let valid = true;
        let pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (data.email === '' || !pattern.test(data.email)) {
            setErr((e) => { return { ...e, email: 'Please Enter a Valid Email' } })
            valid = false;
        }
        else {
            setErr((e) => { return { ...e, email: false } })
        }
        if (data.pass === '') {
            setErr((e) => { return { ...e, pass: 'Please Fill The Password' } })
            valid = false;
        }
        else {
            setErr((e) => { return { ...e, pass: false } })
        }
        if (valid) {
            setShowLoader(true);
            login(data.email, data.pass, showVal)
        }
    }
    function showVal(type, error) {
        if (type === 'login') {
            navigate('/');
        }
        if (type === 'err') {
            setShowLoader(false);
            let code = error.code;
            if (code === 'auth/wrong-password') {
                setErr((e) => { return { ...e, pass: 'Password Not Match' } })
            }
            else if (code === 'auth/invalid-email') {
                setErr((e) => { return { ...e, email: 'Invalid email' } })
            }
            else if (code === 'auth/user-not-found') {
                setErr((e) => { return { ...e, email: 'User Not Found' } })
            }
            else if (code === 'auth/too-many-requests') {
                alert('Too many Request');
            }
            else {
                alert(error.message);
            }
        }
    }
    function handleInput(e) {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }
    return (
        <div className="loginContainer">
            <Loader showLoader={showLoader} />
            <h1>Login</h1>
            <main>
                <div className="inputField">
                    <input type="text" name="email" value={data.email} onInput={handleInput} required />
                    <p style={{ display: err.email ? 'block' : 'none' }}>{err.email}</p>
                    <span>Email</span>
                </div>
                <div className="inputField">
                    <input type="text" name="pass" value={data.pass} onInput={handleInput} required />
                    <p style={{ display: err.pass ? 'block' : 'none' }}>{err.pass}</p>
                    <span>Password</span>
                </div>
            </main>
            <footer>
                <button type="button" onClick={handleLogin}>Login</button>
                <p>Don't have an account? <NavLink to="/signup">Signup</NavLink></p>
            </footer>
        </div>
    )
}