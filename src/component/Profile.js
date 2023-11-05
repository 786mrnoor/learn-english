import './Profile.css'
import { NavLink } from "react-router-dom";

import pic from './pic.jpg'
import Loader from './Loader';
import { useContext, useState } from 'react';
import UserContext from './UserContext';
import { logout, auth } from '../serverConfig/Authentication';
import { profilePicUpload } from '../serverConfig/storage';
// import CropImage from './CropImage';


export default function Profile() {
    const [showLoader, setShowLoader] = useState(false);
    const [show, setShow] = useState(false);
    const appUser = useContext(UserContext);
    // const [cropShow, setCropShow] = useState(false);
    // const [src, setSrc] = useState('');

    if (appUser !== 'logout' && appUser !== null) {
        if (!appUser.name) {
            appUser.name = auth.currentUser.displayName;
        }
    }
    function handleInput(e) {
        let file = e.target.files[0];
        if (!file) return;
        if (file.type.includes('image')) {
            setShowLoader(true);
            getReduceImg(appUser.id, file, showOutPut);
        }
        else {
            alert('Upload Only Image File')
        }
    }
    function showOutPut(type, u) {
        if (type === 'signup') {
            appUser.photoURL = u.photoURL;
            setShowLoader(false);
        }
    }

    return (
        <>
            <Loader showLoader={showLoader} />
            <img src={appUser ? appUser.photoURL ? appUser.photoURL : pic : pic} alt="Profile" onClick={() => setShow(!show)} />
            <div className="profile" style={{ display: show ? 'block' : 'none' }} >
                <p>{appUser ? appUser.email : ''}</p>
                <div className="imgContainer">
                    <img src={appUser ? appUser.photoURL ? appUser.photoURL : pic : pic} alt="" className='btn' />
                    <input type="file" id='ProfilePicBtn' onInput={handleInput} style={{ display: 'none' }} accept="image/*" multiple={false} />
                    <label htmlFor="ProfilePicBtn">edit</label>
                    <h2>Hi, <span id="name">{appUser ? appUser.name : ''}</span>!</h2>
                    <NavLink to="manage-account">Mange your account</NavLink>
                    <footer>
                        <button type="button" onClick={logout}>Sign out</button>
                    </footer>
                </div>
            </div>
            {/* <CropImage src={src} cropShow={cropShow} /> */}
        </>
    )
}

function getReduceImg(id, file, showOutPut) {
    let img = document.createElement('img');
    let u = URL.createObjectURL(file);
    img.src = u;
    img.addEventListener('load', () => {
        let w = img.naturalWidth;
        let h = img.naturalHeight;
        if (w < 1000 || h < 1000) {
        }

        else if ((w >= 1000 && w < 2000) || (h >= 1000 && h < 2000)) {
            w *= 0.8;
            h *= 0.8;
        }
        else if ((w >= 2000 && w < 3000) || (h >= 2000 && h < 3000)) {
            w *= 0.6;
            h *= 0.6;
        }
        else if ((w >= 3000 && w < 4000) || (h >= 3000 && h < 4000)) {
            w *= 0.3;
            h *= 0.3;
        }
        else {
            w *= 0.1;
            h *= 0.1;
        }

        let canvas = document.createElement('canvas');
        let ctx = canvas.getContext('2d');
        canvas.width = w;
        canvas.height = h;
        ctx.drawImage(img, 0, 0, w, h);

        let newUrl = canvas.toDataURL('image/jpeg', 0.5);

        profilePicUpload(id, newUrl, showOutPut);
        URL.revokeObjectURL(u);
    })

}