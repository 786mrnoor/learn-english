import './Table.css'
export default function Table({ tableAction, data, length }) {
    return (
        <div className="tableContainer">
            <p style={{ textAlign: 'center', marginBottom: '10px', fontSize: '19px' }}>{data.length} out of {length}</p>
            <table border="1">
                <thead>
                    <tr>
                        <th nowrap='true'>SENTENCE IN HINDI</th>
                        <th nowrap='true'>SENTENCE IN ENGLISH</th>
                        <th nowrap='true' style={{ width: '130px', minWidth: '130px' }}>Actions</th>
                    </tr>
                </thead>
                <tbody id="container">
                    {data.map(item =>
                        <tr key={item.id} className={item.sts}>
                            <td>{item.hin}</td>
                            <td>{item.eng}</td>
                            <td>
                                <button type='button' onClick={() => tableAction('edit', item)}>Edit</button>
                                <button type='button' onClick={() => tableAction('del', item.id)}>Del</button>
                                <button type='button' onClick={() => tableAction('cpt', item)}>{item.sts === 'cpt' ? 'inc' : 'cpt'}</button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}