import { useContext, useState } from 'react';
import ResultBox from './ResultBox';
import './QuizBox.css'
import UserContext from '../component/UserContext';
export default function QuizBox({ quizSetting, questions, updateResult, reset }) {
    const [quest, setQuest] = useState(questions);
    const [answer, setAnswer] = useState([]);
    const [index, setIndex] = useState(0);
    const [quizSet, setQuizSet] = useState(quizSetting);
    const [dbUpdated, setDbUpdated] = useState(false);
    const [showOption, setShowOption] = useState(false);
    const appUser = useContext(UserContext);
    if (quizSetting.start !== quizSet.start) {
        //if reset 
        if (questions === false) {
            setQuest(false);
            setAnswer([]);
            setDbUpdated(false);
            setIndex(0);
        } else {
            setQuest([...questions]);
        }
        setQuizSet({ ...quizSetting });
    }
    function selectedOption(e) {
        let elem = e.target;
        if (quest[index][quizSet.ans].trim() === elem.innerText.trim()) {
            setAnswer([...answer, true]);
        }
        else {
            setAnswer([...answer, false]);
        }
    }
    function next(n) {
        //if over
        if (index + n >= quest.length) {
            setQuizSet({ ...quizSet, over: true, result: true });
            if (!dbUpdated) {
                setDbUpdated(true);
                let obj = {};
                quest.forEach((elem, i) => {
                    obj[`vocab/${appUser.id}/${elem.id}/att`] = elem.att + 1;
                    obj[`vocab/${appUser.id}/${elem.id}/crt`] = elem.crt + (answer[i] ? 1 : 0);
                })
                updateResult(obj)
            }
            setShowOption(false);
            return;
        }
        setIndex((i) => i + n);
        setShowOption(false);
    }
    function setData(d) {
        let txt = ''
        for (let i in d) {
            if (d[i] === ' ') {
                txt += ' ';
            }
            else {
                txt += 'X';
            }
        }
        return txt;
    }
    function resultBoxAction(type, i) {
        if (type === 'show') {
            setQuizSet({ ...quizSet, over: false });
            setIndex(i);
        }
        if (type === 'playAgain') {
            reset()
        }
    }
    if (!quizSet.start && !quest) {
        return null;
    }
    else if (quizSet.start && quest && !quizSet.over) {
        return (
            <div className="quiz-box">
                <header>
                    <h3>Question No. : {index + 1} out of {quest.length}</h3>
                    <div className='check-box'>
                        <label htmlFor="ShowOption">
                            {/* <input type="checkbox" id='ShowOption' /> */}
                            <div onClick={() => setShowOption(!showOption)} className={showOption ? 'slider checked' : 'slider'}></div>
                        </label>
                    </div>
                </header>
                <main>
                    <h3>{quest[index][quizSet.quest]}</h3>
                    <ul id="options" className={index < answer.length ? 'disabled' : ''}>
                        <li onClick={selectedOption} className={answer.length > index ? answer[index] ? 'correct' : 'correct' : ''} data-show={setData(quest[index][quizSet.ans])}>{quest[index][quizSet.ans]}</li>
                        <li onClick={selectedOption} className={answer.length > index ? answer[index] ? '' : 'incorrect' : ''} >False</li>
                    </ul>
                    <div className={index < answer.length ? quest[index]['eg'].length ? 'example-container show' : 'example-container' : 'example-container'}>
                        <div className='example'>
                            <h4>Example:</h4>
                            <p>{quest[index]['eg']}</p>
                        </div>
                    </div>
                </main>
                <footer>
                    <button onClick={() => next(-1)} className={index > 0 ? '' : 'disabled'}>Previous</button>
                    <button onClick={() => next(quest.length)} style={{ display: quizSet.result ? 'inline-block' : 'none' }}>Show My Score</button>
                    <button onClick={() => next(1)} className={index < answer.length ? '' : 'disabled'}>Next</button>
                </footer>
            </div>
        )
    }
    else if (quizSet.over) {
        return (
            <ResultBox answer={answer} resultBoxAction={resultBoxAction} />
        )
    }
};


// else if (showObj.quizBox)