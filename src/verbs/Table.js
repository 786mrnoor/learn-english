import { useState } from 'react';
import './Table.css'
export default function Table({ tableAction, data, length }) {
    const [all, setAll] = useState(' hide');
    function showHide(e) {
        if (e.target.type === 'button') {
            return;
        }
        e.currentTarget.classList.toggle('hide');
    }
    function showData(d) {
        let txt = ''
        for (let i = 0; i < d.length; i++) {
            txt += 'X';
        }
        return txt;
    }
    function showAll() {
        if (all === ' hide') {
            setAll('');
        }
        else {
            setAll(' hide')
        }
    }

    return (
        <div className="tableContainer verb">
            <header>
                <p>{data.length} out of {length}</p>
                <button type='button' onClick={showAll}>{all === '' ? 'Hide' : 'Show'} all</button>
            </header>
            <table>
                <thead>
                    <tr>
                        <th>Meaning</th>
                        <th>V1</th>
                        <th>V2</th>
                        <th>V3</th>
                        <th>V4</th>
                        <th>V5</th>
                        <th nowrap='true' style={{ width: '130px', minWidth: '130px' }}>Actions</th>
                    </tr>
                </thead>
                <tbody id="container">
                    {data.map(item =>
                        <tr key={item.id} className={item.sts + all} onClick={(e) => showHide(e)}>
                            <td>{item.mean}</td>
                            <td data-show={showData(item.verb[0])} >{item.verb[0]}</td>
                            <td data-show={showData(item.verb[1])}>{item.verb[1]}</td>
                            <td data-show={showData(item.verb[2])}>{item.verb[2]}</td>
                            <td data-show={showData(item.verb[3])}>{item.verb[3]}</td>
                            <td data-show={showData(item.verb[4])}>{item.verb[4]}</td>
                            <td>
                                <button type='button' onClick={() => tableAction('edit', item)}>Edit</button>
                                <button type='button' onClick={() => tableAction('del', item.id)}>Del</button>
                                <button type='button' onClick={() => tableAction('cpt', item)}>{item.sts === 'cpt' ? 'inc' : 'cpt'}</button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}