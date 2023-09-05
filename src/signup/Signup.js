import { NavLink, useNavigate } from 'react-router-dom'
import './Signup.css'
import { useState } from 'react';
import { signup } from '../serverConfig/Authentication';
import Loader from '../component/Loader';
import UserContext from '../component/UserContext';

const initialVal = {
    name: '',
    email: '',
    pass: ''
}
const initPass = {
    upper: false,
    lower: false,
    digit: false,
    special: false,
    min: false
}
export default function SignUp() {
    const navigate = useNavigate();
    const [data, setData] = useState(initialVal);
    const [check, setCheck] = useState(initPass);
    const [err, setErr] = useState(initialVal);
    const [showLoader, setShowLoader] = useState(false);

    function handleInput(e) {
        if (e.target.name === 'pass') {
            let val = e.target.value;
            if (val.search(/[A-Z]/) !== -1) {
                setCheck((i) => { return { ...i, upper: true } })
            }
            else {
                setCheck((i) => { return { ...i, upper: false } })
            }
            if (val.search(/[a-z]/) !== -1) {
                setCheck((i) => { return { ...i, lower: true } })
            }
            else {
                setCheck((i) => { return { ...i, lower: false } })
            }
            if (val.search(/[0-9]/) !== -1) {
                setCheck((i) => { return { ...i, digit: true } })
            }
            else {
                setCheck((i) => { return { ...i, digit: false } })
            }
            if (val.search(/[`~!@#$%^&*)(?.><]/) !== -1) {
                setCheck((i) => { return { ...i, special: true } })
            }
            else {
                setCheck((i) => { return { ...i, special: false } })
            }
            if (val.length > 7) {
                setCheck((i) => { return { ...i, min: true } })
            }
            else {
                setCheck((i) => { return { ...i, min: false } })
            }
        }
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }
    function handleSubmit() {
        let valid = true;
        let obj = {
            name: data.name.toUpperCase(),
            email: data.email.toLowerCase(),
            pass: data.pass
        }
        if (obj.name === '' || obj.name.length < 3) {
            setErr((e) => { return { ...e, name: 'Enter Your Name Correctly' } });
            valid = false;
        }
        else {
            setErr((e) => { return { ...e, name: '' } });
        }

        let pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (obj.email == '' || !pattern.test(obj.email)) {
            setErr((e) => { return { ...e, email: 'Please Enter email correctly' } });
            valid = false;
        }
        else {
            setErr((e) => { return { ...e, email: '' } });
        }

        if (obj.pass === '' ||
            obj.pass.search(/[A-Z]/) === -1 ||
            obj.pass.search(/[a-z]/) === -1 ||
            obj.pass.search(/[0-9]/) === -1 ||
            obj.pass.search(/[\W]/) === -1 ||
            obj.pass.search(/\s/) !== -1 ||
            obj.pass.length < 8
        ) {
            setErr((e) => { return { ...e, pass: 'Invalid Password' } });
            valid = false;
        }
        else {
            setErr((e) => { return { ...e, pass: '' } });
        }
        if (valid) {
            console.log(obj);
            setShowLoader(true);
            signup(obj, showOutPut)
        }
        return false;
    }
    function showOutPut(type, error) {
        if (type === 'signup') {
            navigate('/');
        }
        if (type === 'err') {
            setShowLoader(false);
            let code = error.code;
            if (code === 'auth/email-already-in-use') {
                setErr((e) => { return { ...e, email: 'auth/email-already-in-use' } })
            }
        }
    }

    return (
        <div className="signupContainer">
            <Loader showLoader={showLoader} />
            <h1>SignUp</h1>
            <form>
                <main>
                    <div className="inputField">
                        <input type="text" name="name" value={data.name} onChange={handleInput} required spellCheck="false" autoComplete="off" />
                        <p>{err.name}</p>
                        <span>Name</span>
                    </div>
                    <div className="inputField">
                        <input type="text" name="email" value={data.email} onChange={handleInput} required spellCheck="false" />
                        <p>{err.email}</p>
                        <span>Email</span>
                    </div>
                    <div className="inputField">
                        <input type="password" name="pass" value={data.pass} onChange={handleInput} required spellCheck="false" autoComplete="off" />
                        <p>{err.pass}</p>
                        <span>Password</span>
                    </div>
                    <div className="passwordChecker">
                        <p className={check.upper ? 'validate' : ''}>One uppercase character</p>
                        <p className={check.lower ? 'validate' : ''}>One lowercase character</p>
                        <p className={check.digit ? 'validate' : ''}>One number(0-9)</p>
                        <p className={check.special ? 'validate' : ''}>One special character</p>
                        <p className={check.min ? 'validate' : ''}>8 characters minimum</p>
                    </div>
                </main>
                <footer>
                    <button type="button" onClick={handleSubmit}>SignUp</button>
                    <p>Already have an account?<NavLink to="/login">Login</NavLink></p>
                </footer>
            </form>
        </div>
    )
}