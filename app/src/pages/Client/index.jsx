import React, { useState, useEffect } from 'react';
import api from '../../service/api';


function Clients() {

    const [clients, setClients] = useState();

    useEffect(() => {
        api.get('client').then(res => {
            setClients(res.data);
        })
    }, []);

    return (
        <main className="container">
            <h1>Página de Clientes</h1>
            <ul>
                {clients?.map((client) =>
                    <li key={client.id}>
                        <p>Nome: {client.name}</p>
                        <p>CPF: {client.cpf}</p>
                        <p>Telefone: {client.phone}</p>
                    </li>
                )}
            </ul>
        </main>
    );
}

export default Clients;