import { useState } from 'react';
import './AddUpdate.css';
const initialVal = {
    mean: '',
    type: 'reg',
    verb0: '',
    verb1: '',
    verb2: '',
    verb3: '',
    verb4: '',

}
export default function AddUpdate({ showPopUp, addUpdate, editable, setClose }) {
    const [data, setData] = useState(initialVal);
    const [isEditable, setIsEditable] = useState(false);
    // let keyDown = false;
    // window.addEventListener('keyup', () => {
    //     console.log('\nup');
    //     keyDown = false;
    // });
    // window.addEventListener('keydown', (e) => {
    //     if (!keyDown) {
    //         if (showPopUp && e.ctrlKey && (e.key === 's' || e.key === 'S')) {
    //             e.preventDefault();
    //             keyDown = true;
    //             handleSubmit();
    //             console.log('\n\tdown');
    //         }
    //     }
    // })

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
        let obj = {
            mean: data.mean,
            type: data.type,
            verb: [
                data.verb0.toUpperCase(),
                data.verb1.toUpperCase(),
                data.verb2.toUpperCase(),
                data.verb3.toUpperCase(),
                data.verb4.toUpperCase()
            ]
        }
        if (obj.mean === '') {
            console.log('Please Fill The Meaning Field.');
            // alert('Please Fill The Meaning Field.');
            return
        }
        for (let i of obj.verb) {
            if (i === '') {
                console.log('Please Fill All The Verbs Box.');
                // alert('Please Fill All The Verbs Box.');
                return
            }
        }
        if (isEditable) {
            obj.id = data.id;
            obj.sts = data.sts;
            obj.time = data.time;
            addUpdate('Update', obj);
            return
        }
        else {
            setData(initialVal);
            addUpdate('Add', obj);
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
                    <h2>{editable ? 'Update' : 'Add New'} Verb</h2>
                    <button type="button" onClick={close}>X</button>
                </header>
                <main>
                    <ul>
                        <li>
                            <label htmlFor="hin">Meaning</label>
                            <input type="text" id="mean" value={data.mean} onChange={handleChange} />
                        </li>
                        <li>
                            <label htmlFor="eng">Verb1</label>
                            <input type="text" id="verb0" value={data.verb0} onChange={handleChange} />
                        </li>
                        <li>
                            <label htmlFor="eng">Verb2</label>
                            <input type="text" id="verb1" value={data.verb1} onChange={handleChange} />
                        </li>
                        <li>
                            <label htmlFor="eng">Verb3</label>
                            <input type="text" id="verb2" value={data.verb2} onChange={handleChange} />
                        </li>
                        <li>
                            <label htmlFor="eng">Verb4</label>
                            <input type="text" id="verb3" value={data.verb3} onChange={handleChange} />
                        </li>
                        <li>
                            <label htmlFor="eng">Verb5</label>
                            <input type="text" id="verb4" value={data.verb4} onChange={handleChange} />
                        </li>
                        <li>
                            <label htmlFor="type">Box</label>
                            <select id="type" value={data.type} onChange={handleChange}>
                                <option value="reg">Regular</option>
                                <option value="irreg">Irregular</option>
                            </select>
                        </li>
                    </ul>
                </main>
                <footer>
                    <button onClick={() => setData(initialVal)}>Reset</button>
                    <button type='button' onClick={handleSubmit}>{editable ? 'Update' : 'Add'} Verb</button>
                </footer>
            </div>
        </div>
    )
}