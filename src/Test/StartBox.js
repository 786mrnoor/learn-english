import { useEffect } from 'react';
import './StartBox.css';
import { useState } from 'react';
let initialFilter = {
    status: 'All',
    filter: 'All',
    from: 0,
    numOfQues: '',
    question: 'hin'
}
export default function StartBox({ start, db, showObj }) {
    const [quest, setQuest] = useState(db);
    const [filterObj, setFilterObj] = useState(initialFilter);
    const [isStart, setIsStart] = useState(false);

    function filter(e) {
        let obj = filterObj;
        if (e) {
            obj = { ...obj, [e.target.id]: e.target.value }
        }
        setQuest(db.filter(elem => {
            if (
                (obj.status === 'All' || obj.status === elem.sts)
                &&
                (obj.filter === 'All' || elem[obj.filter] >= obj.from ||
                    (obj.filter === 'notAtt' && elem.att < obj.from) ||
                    (obj.filter === 'notCrt' && elem.crt < obj.from))
            ) {
                return true;
            }
        }))
        setFilterObj(obj);
    }
    function startQuiz() {
        start(quest, filterObj.numOfQues, filterObj.question);
        setIsStart(true);
    }
    useEffect(() => {
        if (!isStart) {
            filter();
        }
    }, [db])

    return (
        <div className="start-box" style={{ display: showObj.startBox ? 'block' : 'none' }}>
            <header>
                <h3>Total Questions: {quest.length}</h3>
            </header>
            <main>
                <div className="input-field">
                    <label htmlFor="question">Question</label>
                    <select id="question" onInput={filter}>
                        <option value="hin">Hindi</option>
                        <option value="eng">English</option>
                    </select>
                </div>
                <div className="input-field">
                    <label htmlFor="status">Status</label>
                    <select id="status" onInput={filter}>
                        <option value="All">All</option>
                        <option value="cpt">Complete</option>
                        <option value="inCpt">InComplete</option>
                    </select>
                </div>
                <div className="input-field">
                    <label htmlFor="filter">Filter</label>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <select id="filter" style={{ width: '36%' }} onInput={filter}>
                            <option value="All">All</option>
                            <option value="att">Attend</option>
                            <option value="crt">Correct</option>
                            <option value="notAtt">Not Attend</option>
                            <option value="notCrt">Not Correct</option>
                        </select>
                        <input type="number" onInput={filter} style={{ display: filterObj.filter === 'All' ? 'none' : 'inline-block' }} id='from' placeholder='How Many Time Minimum' />
                    </div>
                </div>
                <div className="input-field">
                    <label htmlFor="numOfQues">Number Of Question</label>
                    <input type="number" id='numOfQues' onInput={filter} />
                </div>
            </main>
            <footer>
                <button type="button" onClick={() => startQuiz()}>Start Quiz</button>
            </footer>
        </div>
    )
}