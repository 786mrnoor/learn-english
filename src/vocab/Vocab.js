import './Vocab.css'
import { useContext, useEffect, useState } from 'react';
import UserContext from '../component/UserContext';
import { useNavigate } from 'react-router-dom';
import { uniqueId, getAllData, InsertData, updateData, deleteData, updateMultipleData } from '../serverConfig/Database';

import Loader from '../component/Loader';
import Filter from './Filter'
import Table from './Table'
import AddUpdate from './AddUpdate';
import Test from '../Test/Test';

export default function Nouns() {
    const [db, setDb] = useState([]);
    const [data, setData] = useState([]);
    const [showPopUp, setShowPopUp] = useState(false);
    const [showTest, setShowTest] = useState(false);
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
            getAllData(`vocab/${appUser.id}`, setBoth, setShowLoader);
        }
        if (appUser === 'logout') {
            navigate('/');
        }
    }, [appUser]);

    function filterData(obj) {
        let inputVal = obj.input.toUpperCase();

        setData(db.filter((item) =>
        ((item.hin.toUpperCase().includes(inputVal) || item.eng.toUpperCase().includes(inputVal)) &&
            // (obj.type === 'All' || item.type === obj.type) &&
            (obj.statusFilter === 'All' || obj.statusFilter === item.sts))
        ));
    }
    function tableAction(type, obj) {
        if (type === 'edit') {
            setShowPopUp(true);
            setEditable(obj);
        }
        if (type === 'del') {
            if (window.confirm('Do You Want to Delete The Verb.')) {
                setShowLoader(true);
                deleteData(obj.id, `vocab/${appUser.id}`, setBoth, setShowLoader);
            }
        }
        if (type === 'cpt') {
            if (window.confirm(`Do You Want to ${obj.sts === 'cpt' ? 'InComplete' : 'Complete'} The Question`)) {
                let newObj = { sts: obj.sts === 'cpt' ? 'inCpt' : 'cpt' };
                setShowLoader(true);
                updateData(newObj, obj.id, `vocab/${appUser.id}`, setBoth, setShowLoader);
            }
        }
        if (type === 'showTest') {
            setShowTest(true);
        }
    }
    function checkDuplicate(obj) {
        for (let i of db) {
            if (i.eng === obj.eng) {
                if (window.confirm('This Noun is Already Added.\nDo you want to readd.')) {
                    return false;
                }
                else {
                    return true;
                }
            }
        }
        return false;
    }
    function addUpdate(type, obj) {
        if (type === 'Add') {
            let dup = checkDuplicate(obj);
            if (dup) {
                return;
            }
        }
        setShowLoader(true);
        setShowPopUp(false);
        obj.time = JSON.stringify(new Date());
        if (type === 'Add') {
            obj.id = uniqueId();
            obj.sts = 'inCpt';
            obj.att = 0;
            obj.crt = 0;
            InsertData(obj, `vocab/${appUser.id}`, setBoth, setShowLoader);
        }
        if (type === 'Update') {
            setEditable(false);
            updateData(obj, obj.id, `vocab/${appUser.id}`, setBoth, setShowLoader);
        }
    }
    function setClose(t) {
        if (t === 'edit') {
            setEditable(false);
        }
        setShowPopUp(false);
    }
    function updateResult(obj) {
        setShowLoader(true);
        updateMultipleData(obj, `vocab/${appUser.id}`, setBoth, setShowLoader);
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
            <Test db={db} showTest={showTest} setShowTest={setShowTest} updateResult={updateResult} />
        </>
    )
}