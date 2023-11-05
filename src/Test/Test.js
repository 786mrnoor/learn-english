import { useRef, useState } from 'react';
import QuizBox from './QuizBox';
import StartBox from './StartBox';
import './Test.css';
let initialBox = {
    startBox: true,
    quizBox: false,
    resultBox: false,
}
export default function Test({ db, showTest, setShowTest, updateResult }) {
    const [showObj, setShowObj] = useState(initialBox)
    const [questions, setQuestions] = useState(false);
    const [quizSetting, setQuizSetting] = useState({ quest: 'hin', ans: 'eng', start: false });
    function start(obj, len, question) {
        let arr = obj;
        for (let i = arr.length - 1; i > 0; i--) {
            let k = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[k]] = [arr[k], arr[i]];
        }
        let num = len == '' ? arr.length : len;
        setQuestions(arr.slice(0, num));
        setShowObj({ ...showObj, quizBox: true, startBox: false });
        setQuizSetting({
            quest: question,
            ans: question === 'hin' ? 'eng' : 'hin',
            start: true
        });
    }
    function reset() {
        setQuizSetting({
            ...quizSetting,
            start: false
        });
        setShowObj({ ...showObj, quizBox: false, startBox: true });
        setQuestions(false);
    }
    return (
        <div className="test-wrapper" style={{ display: showTest ? 'block' : 'none' }}>
            <button className='close' onClick={() => setShowTest(false)}>Close</button>
            <StartBox start={start} db={db} showObj={showObj} />
            <QuizBox questions={questions} quizSetting={quizSetting} updateResult={updateResult} reset={reset} />
        </div >
    )
};
