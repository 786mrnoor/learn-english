import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";

import app from './firebaseApp'
const auth = getAuth(app);

function getCurrentUser(setUser) {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            setUser('login', auth.currentUser);
        }
        else {
            setUser('logout');
        }
    });
}

function signup(obj, showOutPut) {
    createUserWithEmailAndPassword(auth, obj.email, obj.pass)
        .then((userCredential) => {
            // const user = userCredential.user;
            updateProfile(auth.currentUser, {
                displayName: obj.name
            })
                .then(() => {
                    showOutPut('signup');
                }).catch((error) => {

                });
        })
        .catch((error) => {
            showOutPut('err', error)
            console.log(error.code);
            console.log(error.message);
        });
}

function login(email, password, showVal) {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            showVal('login');
            // window.location.href = 'index.html';
        })
        .catch((error) => {
            showVal('err', error)
        });
}

function logout() {
    signOut(auth).then(() => {

    }).catch((error) => {
        console.log('An error happened.')
    });
}

export { getCurrentUser, signup, login, logout }