import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";

const firebaseConfig = {
    apiKey: "AIzaSyDFK7CVl0uLr8B5o4JQ8dAfEsL4LEwFMr8",
    authDomain: "crud-7302b.firebaseapp.com",
    databaseURL: "https://crud-7302b-default-rtdb.firebaseio.com",
    projectId: "crud-7302b",
    storageBucket: "crud-7302b.appspot.com",
    messagingSenderId: "112669465268",
    appId: "1:112669465268:web:a5a323f6f13e8a379415e1"
};

const app = initializeApp(firebaseConfig);
export default app