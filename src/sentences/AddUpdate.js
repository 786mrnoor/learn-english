import { useState } from 'react';
import './AddUpdate.css';
const initialVal = {
    hin: '',
    eng: '',
    box: 'B1'
}
export default function AddUpdate({ showPopUp, addUpdate, editable, setClose }) {
    const [data, setData] = useState(initialVal);
    const [isEditable, setIsEditable] = useState(false);

    if (isEditable !== editable) {
        if (editable) {
            setData(editable);
        }
        else {
            setData(initialVal);
        }
        setIsEditable(editable);
    }

    function handleChange(e) {
        setData({
            ...data,
            [e.target.id]: e.target.value
        })
    }
    function handleSubmit() {
        if (data.box === '' || data.hin === '' || data.eng === '') {
            alert('Please Fill All The Fields');
            return
        }
        if (isEditable) {
            addUpdate('Update', data);
            return
        }
        else {
            setData(initialVal);
            addUpdate('Add', data);
        }
    }
    function close() {
        if (isEditable) {
            setData(initialVal);
            setClose('edit');
        }
        setClose('close');
    }
    return (
        <div className="popUp" style={{ display: showPopUp ? 'block' : 'none' }}>
            <div className="addBox">
                <header>
                    <h2>{editable ? 'Update' : 'Add New'} Sentence</h2>
                    <button type="button" onClick={close}>X</button>
                </header>
                <main>
                    <ul>
                        <li>
                            <label htmlFor="hin">Hindi</label>
                            <input type="text" id="hin" value={data.hin} onChange={handleChange} />
                        </li>
                        <li>
                            <label htmlFor="eng">English</label>
                            <input type="text" id="eng" value={data.eng} onChange={handleChange} />
                        </li>
                        <li>
                            <label htmlFor="box">Box</label>
                            <select id="box" value={data.box} onChange={handleChange}>
                                <option value="B1">Box 1</option>
                                <option value="B2">Box 2</option>
                                <option value="B3">Box 3</option>
                                <option value="B4">Box 4</option>
                                <option value="B5">Box 5</option>
                                <option value="B6">Box 6</option>
                            </select>
                        </li>
                    </ul>
                </main>
                <footer>
                    <button onClick={() => setData(initialVal)}>Reset</button>
                    <button type='button' onClick={handleSubmit}>{editable ? 'Update' : 'Add'} Sentence</button>
                </footer>
            </div>
        </div>
    )
}