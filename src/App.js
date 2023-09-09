import './App.css';
import { HashRouter } from 'react-router-dom';
import { useState, useEffect } from 'react';
import UserContext from './component/UserContext';
import MyRoutes from './component/MyRoutes';
import Loader from './component/Loader';

import { getCurrentUser } from './serverConfig/Authentication';

function App() {
  const [appUser, setAppUser] = useState(null);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    setShowLoader(true);
    getCurrentUser(setUser);
  }, []);

  function setUser(type, u) {
    if (type === 'login') {
      setAppUser({
        email: u.email,
        name: u.displayName,
        photoURL: u.photoURL,
        id: u.uid
      });
      setShowLoader(false);
    }
    if (type === 'logout') {
      setShowLoader(false)
      setAppUser('logout');
    }
  }


  return (
    <HashRouter>
      <UserContext.Provider value={appUser}>

        {/* <Loader showLoader={showLoader} /> */}
        <MyRoutes />

      </UserContext.Provider>
    </HashRouter>
  );
}

export default App;
