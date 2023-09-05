import './Profile.css'
import { NavLink } from "react-router-dom";

import pic from './pic.jpg'
import { useContext, useState } from 'react';
import UserContext from './UserContext';
import { logout } from '../serverConfig/Authentication';

export default function Profile() {
    const [show, setShow] = useState(false);
    const appUser = useContext(UserContext);

    return (
        <>
            <img src={appUser ? appUser.photoURL ? appUser.photoURL : pic : pic} alt="Profile" onClick={() => setShow(!show)} />
            <div className="profile" style={{ display: show ? 'block' : 'none' }} >
                <p>{appUser ? appUser.email : ''}</p>
                <div className="imgContainer">
                    <img src={appUser ? appUser.photoURL ? appUser.photoURL : pic : pic} alt="" />
                    <input type="file" id='ProfilePicBtn' style={{ display: 'none' }} accept="image/*" multiple={false} />
                    <label htmlFor="ProfilePicBtn">edit</label>
                    <h2>Hi, <span id="name">{appUser ? appUser.name : ''}</span>!</h2>
                    <NavLink to="manage-account">Mange your account</NavLink>
                    <footer>
                        <button type="button" onClick={logout}>Sign out</button>
                    </footer>
                </div>
            </div>
        </>
    )
}