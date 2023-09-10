import './Verbs.css'
import { useContext, useEffect, useState } from 'react';
import UserContext from '../component/UserContext';
import { useNavigate } from 'react-router-dom';
import { uniqueId, getAllData, InsertData, updateData, deleteData } from '../serverConfig/Database';

import Loader from '../component/Loader';
import Filter from './Filter'
import Table from './Table'
import AddUpdate from './AddUpdate';

export default function Verbs() {
    const [db, setDb] = useState([]);
    const [data, setData] = useState([]);
    const [showPopUp, setShowPopUp] = useState(false);
    const [editable, setEditable] = useState(false);

    function setBoth(d) {
        setDb(d);
        setData(d);
    }
    const appUser = useContext(UserContext);
    const [showLoader, setShowLoader] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        if (appUser !== 'logout' && appUser !== null) {
            getAllData(`verbs/${appUser.id}`, setBoth, setShowLoader);
        }
        if (appUser === 'logout') {
            navigate('login');
        }
    }, [appUser]);

    function filterData(obj) {
        let inputVal = obj.input.toUpperCase();
        let typeVal = obj.type;

        let newData = db.filter((item) => {
            for (let i of item.verb) {
                if (
                    (i.toUpperCase().includes(inputVal)) &&
                    (typeVal == 'All' || typeVal == item.type) &&
                    (obj.statusFilter === 'All' || obj.statusFilter === item.sts)
                ) {
                    return true;
                };
            }
            return false;
        });
        setData(newData);
    }
    function tableAction(type, id) {
        if (type === 'edit') {
            setShowPopUp(true);
            let obj = {
                id: id.id,
                mean: id.mean,
                type: id.type,
                verb0: id.verb[0],
                verb1: id.verb[1],
                verb2: id.verb[2],
                verb3: id.verb[3],
                verb4: id.verb[4],
                time: id.time,
                sts: id.sts
            }
            setEditable(obj);
        }
        if (type === 'del') {
            if (window.confirm('Do You Want to Delete The Verb.')) {
                setShowLoader(true);
                deleteData(id, `verbs/${appUser.id}`, setBoth, setShowLoader);
            }
        }
        if (type === 'cpt') {
            if (window.confirm(`Do You Want to ${id.sts === 'cpt' ? 'InComplete' : 'Complete'} The Question`)) {
                let obj = { sts: id.sts === 'cpt' ? 'inCpt' : 'cpt' };
                setShowLoader(true);
                updateData(obj, id.id, `verbs/${appUser.id}`, setBoth, setShowLoader);
            }
        }
    }
    function checkDuplicate(obj) {
        for (let i of db) {
            for (let j = 0; j < 5; j++) {
                if (i.verb[j] === obj.verb[j]) {
                    if (window.confirm('This Verb is Already Added.\nDo you want to readd.')) {
                        return false;
                    }
                    else {
                        return true;
                    }
                }
            }
        }
    }
    function addUpdate(type, obj) {
        let dup = checkDuplicate(obj);
        if (dup) {
            return;
        }
        setShowLoader(true);
        setShowPopUp(false);
        obj.time = JSON.stringify(new Date())
        if (type === 'Add') {
            obj.id = uniqueId();
            obj.sts = 'inCpt';
            InsertData(obj, `verbs/${appUser.id}`, setBoth, setShowLoader);
        }
        if (type === 'Update') {
            setEditable(false);
            updateData(obj, obj.id, `verbs/${appUser.id}`, setBoth, setShowLoader);
        }
    }
    function setClose(t) {
        if (t === 'edit') {
            setEditable(false);
        }
        setShowPopUp(false);
    }

    return (
        <>
            <Loader showLoader={showLoader} />
            <Filter filter={filterData} />
            <Table tableAction={tableAction} data={data} length={db.length} />
            <AddUpdate showPopUp={showPopUp} addUpdate={addUpdate} editable={editable} setClose={setClose} />
            <div className="addBtnBox">
                <button type="button" onClick={() => setShowPopUp(true)}>+</button>
            </div>
        </>
    )
}