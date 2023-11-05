import './ResultBox.css';
export default function ResultBox({ answer, resultBoxAction }) {
    let score = 0;
    let list = answer.map((item, i) => {
        score += item ? 1 : 0;
        return (<li onClick={() => resultBoxAction('show', i)} key={i} className={item ? 'correct' : 'incorrect'}>{i + 1}</li>)
    }
    )

    return (
        <div className="result-box">
            <header>
                <h3>Your Score is : {score}  out of {answer.length}</h3>
            </header>
            <main>
                <ul id="resultUL">
                    {list}
                </ul>
            </main>
            <footer>
                <button onClick={() => resultBoxAction('playAgain')}>Play Again</button>
            </footer>
        </div>
    )
};

{/* <li className="correct">1</li>
                    <li className="incorrect">2</li>
                    <li className="incorrect">3</li>
                    <li className="incorrect">4</li>
                    <li className="correct">5</li> */}
