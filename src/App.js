import { useState } from 'react';
import './App.css';

function App() {
  const [clicked, setClicked] = useState(0);
  return (
    <div className="App">
      <h1>This is Only Test Purpose</h1>
      <h1>You Clicked {clicked}</h1>
      <button onClick={() => setClicked(clicked + 1)}>Click Me</button>
    </div>
  );
}

export default App;
