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
            if (d[i] === ' ') {
                txt += ' ';
            } else {
                txt += 'X';
            }
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
        <div className="tableContainer noun">
            <header>
                <p>{data.length} out of {length}</p>
                <button type='button' onClick={showAll}>{all === '' ? 'Hide' : 'Show'} all</button>
                <button type='button' onClick={() => tableAction('showTest')}>Start Test</button>
            </header>
            <table>
                <thead>
                    <tr>
                        <th>Hindi</th>
                        <th>English</th>
                        <th style={{ minWidth: '50px' }}>Att / Crt</th>
                        <th nowrap='true' style={{ width: '130px', minWidth: '130px' }}>Actions</th>
                    </tr>
                </thead>
                <tbody id="container noun">
                    {data.map(item =>
                        <tr key={item.id} className={item.sts + all} onClick={(e) => showHide(e)}>
                            <td data-show={showData(item.hin)} >{item.hin}</td>
                            <td data-show={showData(item.eng)}>{item.eng}</td>
                            <td>{item.att} / {item.crt}</td>
                            <td>
                                <button type='button' onClick={() => tableAction('edit', item)}>Edit</button>
                                <button type='button' onClick={() => tableAction('del', item)}>Del</button>
                                <button type='button' onClick={() => tableAction('cpt', item)}>{item.sts === 'cpt' ? 'inc' : 'cpt'}</button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}