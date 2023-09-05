import { useState } from 'react'
import './Filter.css'
const initialVal = {
    statusFilter: 'All',
    box: 'All',
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
                <label htmlFor="box">Box</label>
                <select name="box" onChange={handleChange} value={data.box}>
                    <option value="All">All</option>
                    <option value="B1">Box 1</option>
                    <option value="B2">Box 2</option>
                    <option value="B3">Box 3</option>
                    <option value="B4">Box 4</option>
                    <option value="B5">Box 5</option>
                    <option value="B6">Box 6</option>
                </select>
            </div>
            <input type="text" name="input" onChange={handleChange} value={data.input} placeholder="Search" />
        </nav>
    )
}