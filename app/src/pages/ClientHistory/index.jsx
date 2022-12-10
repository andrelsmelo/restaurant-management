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
                <div className="row d-flex justify-content-center text-center my-5">
                    <div className='col-6 fs-2' >Historico de Clientes</div>
                </div>
            <table className="table table-striped">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Id do cliente</th>
                    <th scope="col">Item consumido</th>
                    <th scope="col">Preço</th>
                    <th scope="col">Quantidade</th>
                    <th scope="col">Data</th>
                    </tr>
                </thead>
                <tbody>
                    {clientHistory?.map((clientHistory) =>
                    <tr>
                    <th scope="row">{clientHistory.id}</th>
                    <td>{clientHistory.client_id}</td>
                    <td>{clientHistory.consumed_items}</td>
                    <td>{clientHistory.total_price}</td>
                    <td>{clientHistory.quantity}</td>
                    <td>{clientHistory.date}</td>
                    </tr>
                )}
                </tbody>
            </table>
            <ul>

            </ul>
        </main>
    );
}

export default ClientHistory;