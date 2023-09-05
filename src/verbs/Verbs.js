export default function Verbs() {
    return (
        <>
            <nav className="filter">
                <div>
                    <label htmlFor="statusFilter">Status</label>
                    <select id="statusFilter">
                        <option value="All">All</option>
                        <option value="cpt">Complete</option>
                        <option value="inCpt">InComplete</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="box">Box</label>
                    <select id="box">
                        <option value="All">All</option>
                        <option value="B1">Box 1</option>
                        <option value="B2">Box 2</option>
                        <option value="B3">Box 3</option>
                        <option value="B4">Box 4</option>
                        <option value="B5">Box 5</option>
                        <option value="B6">Box 6</option>
                    </select>
                </div>
                <input type="text" id="input" placeholder="Search" />
            </nav>

            <div className="tableContainer">
                <p>2 out of 3</p>
                <table border="1">
                    <thead>
                        <tr>
                            <th nowrap='true'>SENTENCE IN HINDI</th>
                            <th nowrap='true'>SENTENCE IN ENGLISH</th>
                            <th nowrap='true' style={{ width: '160px', minWidth: '160px' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody id="container">

                    </tbody>
                </table>
            </div>
        </>
    )
}