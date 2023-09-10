import { useState } from 'react'
import './Filter.css'
const initialVal = {
    statusFilter: 'All',
    type: 'All',
    input: ''
}
export default function Filter({ filter }) {
    const [data, setData] = useState(initialVal)
    function handleChange(e) {
        let obj = {
            ...data,
            [e.target.name]: e.target.value
        }
        setData(obj);
        filter(obj);
    }
    return (
        <nav className="filter">
            <div>
                <label htmlFor="statusFilter">Status</label>
                <select name="statusFilter" onChange={handleChange} value={data.statusFilter}>
                    <option value="All">All</option>
                    <option value="cpt">Complete</option>
                    <option value="inCpt">InComplete</option>
                </select>
            </div>
            <div>
                <label htmlFor="type">Type</label>
                <select name="type" onChange={handleChange} value={data.box}>
                    <option value="All">All</option>
                    <option value="reg">Regular</option>
                    <option value="irreg">Irregular</option>
                </select>
            </div>
            <input type="text" name="input" onChange={handleChange} value={data.input} placeholder="Search" />
        </nav>
    )
}