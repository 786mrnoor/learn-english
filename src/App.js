import './App.css';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Contact from './Contact';
import About from './About';
import Nav from './Nav';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<Nav />} >
          <Route index element={<Home />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/about' element={<About />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
