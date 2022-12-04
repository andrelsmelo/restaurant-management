import React, { useState, useEffect, useRef } from 'react';
import api from '../../service/api';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function ClientCheckpad() {

    const [modalIsOpen, setModaIsOpen] = useState(false);
    const [clientCheckpads, setClientCheckpads] = useState(false);

    const [availableClients, setAvailableClients] = useState();
    const [availableCheckpads, setAvailableCheckpads] = useState();

    const clientRef = useRef(null);
    const checkpadRef = useRef(null);

    function openModal() {
        setModaIsOpen(true);
    }

    function closeModal() {
        setModaIsOpen(false);
    }

    useEffect(() => {
        api.get('client-checkpad').then(res => {
            setClientCheckpads(res.data);
        })
        api.get('client').then(res => {
            setAvailableClients(res.data);
        })
        api.get('checkpad').then(res => {
            setAvailableCheckpads(res.data);
        })
    }, []);

    function OpenCheckpad() {

        let data = {
            checkpad_id: checkpadRef.current.value,
            client_id: clientRef.current.value
        }

        api.post('client-checkpad', data)
            .then(function (res) {
                console.log(res);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

return (
    <main className="container">
        <h1>Clientes com comanda aberta</h1>
        <ul>
            {clientCheckpads &&
                clientCheckpads.map((clientCheckpad) =>
                    <li key={clientCheckpad.id}>
                        <p>Id do Cliente: {clientCheckpad.client_id}</p>
                        <p>Item consumido: {clientCheckpad.consumed_items}</p>
                        <p>Preço: {clientCheckpad.total_price}</p>
                        <p>Quantidade: {clientCheckpad.quantity}</p>
                    </li>
                )}
        </ul>
        <div className="modal-container">
            <button type="button" className="btn btn-primary" onClick={openModal}>Registrar comanda</button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Example Modal"
                overlayClassName="modal-overlay"
                className="modal-content"
            >
                <h2>Abrir comanda</h2>
                <div className="row">
                    <select className="form-select" ref={clientRef} aria-label="Default select example">
                        <option selected>Selecione um cliente</option>
                        {availableClients &&
                            availableClients.map((client) =>
                                <option value={client.id}>{client.name}</option>
                            )}
                    </select>
                    <select className="form-select" ref={checkpadRef} aria-label="Default select example">
                        <option selected>Selecione uma comanda</option>
                        {availableCheckpads &&
                            availableCheckpads.map((checkpad) =>
                                <option value={checkpad.id}>{checkpad.id + ' - ' + checkpad.status}</option>
                            )}
                    </select>
                </div>
                <div className="row d-flex justify-content-between">
                    <button type="button" className="btn btn-secondary col-3" onClick={closeModal}>Fechar</button>
                    <button type="button" className="btn btn-success col-3" onClick={OpenCheckpad}>Registrar</button>
                </div>
            </Modal>
        </div>
    </main>
);
}

export default ClientCheckpad;