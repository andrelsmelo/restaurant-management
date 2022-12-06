import { useState, useEffect } from 'react';
import api from '../../service/api';


function ClientHistory() {

    const [clientHistory, setClientHistory] = useState();

    useEffect(() => {
        api.get('client-history').then(res => {
            setClientHistory(res.data);
        })
    }, []);

    return (
        <main className="container">
            <h1>Historico de Clientes</h1>
            <ul>
                {clientHistory?.map((clientHistory) =>
                    <li key={clientHistory.id}>
                        <p>Id do Cliente: {clientHistory.client_id}</p>
                        <p>Item consumido: {clientHistory.consumed_items}</p>
                        <p>Preço: {clientHistory.total_price}</p>
                        <p>Quantidade: {clientHistory.quantity}</p>
                    </li>
                )}
            </ul>
        </main>
    );
}

export default ClientHistory;