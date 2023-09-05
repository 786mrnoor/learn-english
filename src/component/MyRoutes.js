import { Route, Routes } from 'react-router-dom';
import Sentences from '../sentences/Sentences';
import Verbs from '../verbs/Verbs';
import Nav from '../component/Nav';
import Login from '../login/Login';
import SignUp from '../signup/Signup';

export default function MyRoutes() {
    return (
        <Routes>
            <Route path='/' element={<Nav />} >
                <Route index element={<Sentences />} />
                <Route path='/verbs' element={<Verbs />} />
            </Route>

            <Route>
                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<SignUp />} />
            </Route>
        </Routes>
    )
}