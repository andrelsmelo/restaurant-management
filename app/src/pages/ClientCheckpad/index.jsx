import { useState, useEffect, useRef } from 'react';
import { useToasts } from 'react-toast-notifications'
import api from '../../service/api';
import Modal from 'react-modal';

function ClientCheckpad() {

    const [modalIsOpen, setModaIsOpen] = useState(false);
    const [clientCheckpads, setClientCheckpads] = useState(null);
    const [availableCheckpads, setAvailableCheckpads] = useState(null);
    const [availableClients, setAvailableClients] = useState(null);
    const clientRef = useRef(null);
    const checkpadRef = useRef(null);

    function openModal() {
        setModaIsOpen(true);
    }

    function closeModal() {
        setModaIsOpen(false);
    }

    const { addToast } = useToasts();


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
                api.get('checkpad').then(res => {
                    setAvailableCheckpads(res.data);
                })
                api.get('client-checkpad').then(res => {
                    setClientCheckpads(res.data);
                })
                addToast(`Comanda inserida com succeso, id: ${res.data.insertId}`, {
                    appearance: 'success',
                    autoDismiss: true,
                })
            })
            .catch(function (error) {
                addToast(error.message, {
                    appearance: 'error',
                    autoDismiss: true,
                })
            });
        closeModal();
    }

    function closeClientCheckpad(id) {
        api.put(`client-checkpad/${id}/close`)
            .then(function (res) {
                api.get('checkpad').then(res => {
                    setAvailableCheckpads(res.data);
                })
                api.get('client-checkpad').then(res => {
                    setClientCheckpads(res.data);
                })
                addToast(`Comanda fechada com succeso. Status ${res.status}`, {
                    appearance: 'success',
                    autoDismiss: true,
                })
            })
            .catch(function (error) {
                addToast(error.message, {
                    appearance: 'error',
                    autoDismiss: true,
                })
            });
    }

    return (
        <main>
            <div className="container">
                <div className="row d-flex justify-content-center text-center my-5">
                    <div className='col-6 fs-3' >Clientes com comandas abertas</div>
                    <div className='col-3 fs-3'>
                        <button type="button" className="btn btn-secondary p-2 m-2" onClick={openModal}>Registrar nova comanda</button>
                    </div>
                </div>
                <div className="row d-flex">
                    <div className="col-3">
                        <ul className="list-group text-center">
                            {availableCheckpads?.map((checkpad) =>
                                <li className="list-group-item list-group-item-action list-group-item-dark m-1 p-1 rounded-pill" key={checkpad.id} >{checkpad.id + ' - ' + checkpad.status}</li>
                            )}
                        </ul>
                    </div>
                    <div className="col-9">
                        <table className="table table-striped text-center align-middle">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Id do Cliente</th>
                                    <th>Id da Comanda</th>
                                    <th>Itens Consumidos</th>
                                    <th>Pre??o</th>
                                    <th>Status</th>
                                    <th>A????es</th>
                                </tr>
                            </thead>
                            <tbody>
                                {clientCheckpads &&
                                    clientCheckpads.map((clientCheckpad) =>
                                        <tr>
                                            <th scope="row">{clientCheckpad.id}</th>
                                            <th>{clientCheckpad.checkpad_id}</th>
                                            <th>{clientCheckpad.client_id}</th>
                                            <td>{clientCheckpad.consumed_items == null ? 'Nada Consumido' : clientCheckpad.consumed_items}</td>
                                            <td>{clientCheckpad.total_price}</td>
                                            <td>{clientCheckpad.status}</td>
                                            <td>
                                                <button type="button" className="btn btn-danger" onClick={() => closeClientCheckpad(clientCheckpad.id)}>Fechar Comanda
                                                </button>
                                            </td>
                                        </tr>
                                    )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="modal-container">
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    contentLabel="Example Modal"
                    overlayClassName="modal-overlay"
                    className="modal-content"
                >
                    <div className="row justify-content-center text-center">
                        <h5 className='col-6'>Abrir comanda</h5>
                    </div>
                    <div className="row">
                        <select className="form-select m-3" ref={clientRef} aria-label="Default select example">
                            <option selected>Selecione um cliente</option>
                            {availableClients &&
                                availableClients.map((client) =>
                                    <option key={client.id} value={client.id}>{client.name}</option>
                                )}
                        </select>
                        <select className="form-select m-3" ref={checkpadRef} aria-label="Default select example">
                            <option selected>Selecione uma comanda</option>
                            {availableCheckpads &&
                                availableCheckpads.map((checkpad) =>
                                    <option key={checkpad.id} value={checkpad.id}>{checkpad.id + ' - ' + checkpad.status}</option>
                                )}
                        </select>
                    </div>
                    <div className="row d-flex justify-content-center m-3">
                        <button type="button" className="btn btn-secondary col-3 m-3" onClick={closeModal}>Fechar</button>
                        <button type="button" className="btn btn-success col-3 m-3" onClick={OpenCheckpad}>Registrar</button>
                    </div>
                </Modal>
            </div>
        </main>
    );
}

export default ClientCheckpad;