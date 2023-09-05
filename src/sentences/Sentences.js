import './Sentece.css'
import { useContext, useEffect, useState } from 'react';
import UserContext from '../component/UserContext';
import { useNavigate } from 'react-router-dom';
import { uniqueId, getAllData, InsertData, updateData, deleteData } from '../serverConfig/Database';

import Loader from '../component/Loader';
import Filter from './Filter'
import Table from './Table'
import AddUpdate from './AddUpdate';

export default function Sentences() {
    const [db, setDb] = useState([]);
    const [data, setData] = useState([]);
    const [showPopUp, setShowPopUp] = useState(false);
    const [editable, setEditable] = useState(false);

    function setBoth(d) {
        setDb(d);
        setData(d);
    }
    const appUser = useContext(UserContext);
    const [showLoader, setShowLoader] = useState(false);
    const navigate = useNavigate();
    console.log('app', appUser);

    useEffect(() => {
        if (appUser !== 'logout' && appUser !== null) {
            getAllData(`snt/${appUser.id}`, setBoth, setShowLoader);
        }
        if (appUser === 'logout') {
            navigate('login');
        }
    }, [appUser]);

    function filterData(obj) {
        let inputVal = obj.input.toUpperCase();
        let boxVal = obj.box;
        setData(db.filter((item) =>
            ((item.hin.toUpperCase().includes(inputVal) || item.eng.toUpperCase().includes(inputVal)) && (boxVal === 'All' || boxVal === item.box) && (obj.statusFilter === 'All' || obj.statusFilter === item.sts))
        ));
    }
    function tableAction(type, id) {
        if (type === 'edit') {
            setShowPopUp(true);
            setEditable(id);
        }
        if (type === 'del') {
            if (window.confirm('Do You Want to Delete The Sentence.')) {
                setShowLoader(true);
                deleteData(id, `snt/${appUser.id}`, setBoth, setShowLoader);
            }
        }
        if (type === 'cpt') {
            if (window.confirm(`Do You Want to ${id.sts === 'cpt' ? 'InComplete' : 'Complete'} The Question`)) {
                let obj = { sts: id.sts === 'cpt' ? 'inCpt' : 'cpt' };
                setShowLoader(true);
                updateData(obj, id.id, `snt/${appUser.id}`, setBoth, setShowLoader);
            }
        }
    }
    function addUpdate(type, obj) {
        setShowLoader(true);
        setShowPopUp(false);
        obj.time = JSON.stringify(new Date())
        if (type === 'Add') {
            obj.id = uniqueId();
            obj.sts = 'inCpt';
            InsertData(obj, `snt/${appUser.id}`, setBoth, setShowLoader);
        }
        if (type === 'Update') {
            updateData(obj, obj.id, `snt/${appUser.id}`, setBoth, setShowLoader);
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