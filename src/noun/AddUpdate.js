import { useState } from 'react';
import './AddUpdate.css';
const initialVal = {
    eng: '',
    hin: '',
    type: 'fruits'
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
        if (data.hin === '' || data.eng === '') {
            alert('Please Fill All The Field.');
            return
        }
        data.eng = data.eng.toUpperCase();
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
                    <h2>{editable ? 'Update' : 'Add New'} Noun</h2>
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
                            <label htmlFor="type">Type</label>
                            <select id="type" value={data.type} onChange={handleChange}>
                                <option value="fruits">Fruits</option>
                                <option value="vegetables">Vegetables</option>
                            </select>
                        </li>
                    </ul>
                </main>
                <footer>
                    <button onClick={() => setData(initialVal)}>Reset</button>
                    <button type='button' onClick={handleSubmit}>{editable ? 'Update' : 'Add'} Noun</button>
                </footer>
            </div>
        </div>
    )
}

// let keyDown = true;
// window.addEventListener('keyup', (e) => {
//     console.log('up');
//     if (!keyDown) {
//         console.log('UP inner');
//         keyDown = true;
//     }
// })

// window.addEventListener('keydown', (e) => {
//     console.log('down');
//     if (keyDown) {
//         if (showPopUp && e.ctrlKey && (e.key === 's' || e.key === 'S')) {
//             console.log('down inner');
//             e.preventDefault();
//             keyDown = false;
//             handleSubmit();
//         }
//     }
// })