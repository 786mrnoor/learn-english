import './Nav.css'
import { NavLink, Outlet } from "react-router-dom";
import Profile from './Profile';

export default function Nav() {
    return (
        <>
            <nav className="topNav">
                <ul>
                    <li><NavLink to="/">Home</NavLink></li>
                    <li><NavLink to="nouns">Nouns</NavLink></li>
                    <li><NavLink to="verbs">Verbs</NavLink></li>
                    <li><NavLink to="vocab">Vocab</NavLink></li>
                </ul>
                <Profile />
            </nav>
            <Outlet />
        </>
    )
}