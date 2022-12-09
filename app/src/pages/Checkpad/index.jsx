import { useState, useEffect } from 'react';
import api from '../../service/api';

function Checkpad() {

    const [checkpads, setCheckpads] = useState();

    useEffect(() => {
        api.get('checkpad').then(res => {
            setCheckpads(res.data);
        })
    }, []);

    return (
        <main className="container">
            <h1>Lista de Comandas</h1>
            <ul>
                {checkpads?.map((checkpad) =>
                    <li key={checkpad.id}>{checkpad.id + ' - ' + checkpad.status}</li>
                )}
            </ul>
        </main>
    );
}

export default Checkpad;