import { useState, useEffect, useRef } from 'react';
import api from '../../service/api';
import { useToasts } from 'react-toast-notifications'
import Modal from 'react-modal';


function Clients() {

    const [clients, setClients] = useState();
    const [modalIsOpen, setModaIsOpen] = useState(false);
    const nameRef = useRef(null);
    const cpfRef = useRef(null);
    const phoneRef = useRef(null);

    const { addToast } = useToasts();

    function openModal() {
        setModaIsOpen(true);
    }

    function closeModal() {
        setModaIsOpen(false);
    }

    useEffect(() => {
        api.get('client').then(res => {
            setClients(res.data);
        })
    }, []);

    function deleteClient(id) {
        api.put(`client/${id}/delete`)
            .then(function (res) {
                api.get('client').then(res => {
                    setClients(res.data);
                })
                addToast('Cliente deletado com succeso.', {
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

    function registerNewClient() {

        let data = {
            name: nameRef.current.value,
            cpf: cpfRef.current.value,
            phone: phoneRef.current.value
        }

        api.post('client', data)
            .then(function (res) {
                api.get('client').then(res => {
                    setClients(res.data);
                })
                addToast('Cliente inserido com succeso', {
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

    return (
        <main className="container">
              <div className="row d-flex justify-content-center text-center my-5">
                    <div className='col-6 fs-2' >Clientes</div>
                    <div className='col-3'>
                        <button type="button" className="btn btn-secondary p-2 m-2" onClick={openModal}>Registrar novo Cliente</button>
                    </div>
                </div>
            <table className="table table-striped text-center align-middle">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nome</th>
                        <th>CPF</th>
                        <th>Telefone</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {clients &&
                        clients.map((client) =>
                            <tr>
                                <th scope="row">{client.id}</th>
                                <td>{client.name}</td>
                                <td>{client.cpf}</td>
                                <td>{client.phone}</td>
                                <td>
                                    <button type="button" className="btn btn-danger mx-2" onClick={() => deleteClient(client.id)}>Deletar</button>
                                </td>
                            </tr>
                        )}
                </tbody>
            </table>
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
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon1">Nome</span>
                            <input type="text" className="form-control" ref={nameRef} placeholder="Nome" aria-label="Username" aria-describedby="basic-addon1" />
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon1">CPF</span>
                            <input type="text" className="form-control" ref={cpfRef} placeholder="CPF" aria-label="Username" aria-describedby="basic-addon1" />
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon1">Telefone</span>
                            <input type="text" className="form-control" ref={phoneRef} placeholder="Telefone" aria-label="Username" aria-describedby="basic-addon1" />
                        </div>
                    </div>
                    <div className="row d-flex justify-content-center m-3">
                        <button type="button" className="btn btn-secondary col-3 m-3" onClick={closeModal}>Fechar</button>
                        <button type="button" className="btn btn-success col-3 m-3" onClick={registerNewClient}>Registrar</button>
                    </div>
                </Modal>
            </div>
        </main>
    );
}

export default Clients;