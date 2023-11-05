import { Route, Routes } from 'react-router-dom';
import Sentences from '../sentences/Sentences';
import Verbs from '../verbs/Verbs';
import Nav from '../component/Nav';
import Login from '../login/Login';
import SignUp from '../signup/Signup';
import Error from '../error/Error';
import UploadData from '../uploadData/UploadData';
import Nouns from '../noun/Nouns';
import Vocab from '../vocab/Vocab';

export default function MyRoutes() {
    return (
        <Routes>
            <Route path='/' element={<Nav />} >
                <Route index element={<Sentences />} />
                <Route path='/nouns' element={<Nouns />} />
                <Route path='/verbs' element={<Verbs />} />
                <Route path='/vocab' element={<Vocab />} />
            </Route>

            <Route>
                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<SignUp />} />
            </Route>
            <Route path='*' element={<Error />} />
        </Routes>
    )
}