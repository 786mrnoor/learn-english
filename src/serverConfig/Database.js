import { getDatabase, ref, get, set, child, update, remove } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-database.js";
import app from './firebaseApp';

const db = getDatabase(app);

function InsertData(data, adrs, setData, setLoad) {
    set(ref(db, adrs + "/" + data.id), data)
        .then(() => {
            getAllData(adrs, setData, setLoad)
        })
        .catch((err) => {
            alert('error');
            console.log(err.code);
            console.log(err.message);
        })
}

function getAllData(adrs, setData, setLoad) {
    get(child(ref(db), adrs)).then((data) => {
        let dataArr = [];
        data.forEach(item => {
            dataArr.push(item.val())
        })
        setData(dataArr.sort((a, b) => {
            let a1 = new Date(JSON.parse(a.time))
            let b1 = new Date(JSON.parse(b.time))

            return b1 - a1
        }))
        setLoad(false);
    })
        .catch(err => {
            console.log(err.code);
            console.log(err.message);
            if (err.message == 'Permission denied') {
                // logout();
            }
        })
}

function updateData(data, id, adrs, setData, setLoad) {
    update(ref(db, adrs + "/" + id), data)
        .then(() => {
            getAllData(adrs, setData, setLoad)
        })
        .catch((err) => {
            alert('error', err);
        })
}
function deleteData(id, adrs, setData, setLoad) {
    remove(ref(db, adrs + "/" + id))
        .then(() => {
            getAllData(adrs, setData, setLoad)
        })
        .catch((err) => {
            alert('error', err);
        })
}

function existData(adrs, id, setTopic, setData, setLoad, navigate) {
    const dbRef = ref(db);
    get(child(dbRef, adrs))
        .then((data) => {
            if (data.exists()) {
                setTopic(data.val())
                getAllData(`Questions/${id}`, setData, setLoad);
            }
            else {
                navigate('/');
            }
        })
}

function updateMultipleData(data, adrs, setData, setLoad) {
    update(ref(db), data)
        .then(() => {
            getAllData(adrs, setData, setLoad);
        })
        .catch((err) => {
            alert('error', err);
        })
}


function uniqueId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

export { uniqueId, getAllData, InsertData, updateData, deleteData }