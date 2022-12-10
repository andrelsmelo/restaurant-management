import React, { useEffect, useState } from 'react';
import api from '../../service/api';
import { useToasts } from 'react-toast-notifications'

function InsertItem() {

    const [clientCheckpads, setClientCheckpads] = useState(null);
    const [menuItem, setMenuItem] = useState(null);
    const [item, setItem] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [checkpadId, setCheckpadId] = useState(null);

    const { addToast } = useToasts();

    useEffect(() => {
        api.get('client-checkpad').then(res => {
            setClientCheckpads(res.data);
        })
        api.get('menu').then(res => {
            setMenuItem(res.data);
        })
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault()

        let data = {
            consumed_item: item,
            quantity: quantity
        }

        api.put(`/client-checkpad/${checkpadId}/new-item`, data)
        .then(function (res) {
            addToast(`Item inserido com succeso`, {
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

    function changeChekpadId(id) {
        setCheckpadId(id)
    }

    function handleQuantity(id) {
        var e = document.getElementById(`quantity-${id}`);
        var value = e.value;
        console.log(value);
        setQuantity(value);
    }
    
    function handleItem(id) {
        var e = document.getElementById(`item-${id}`);
        var value = e.value;
        console.log(value);
        setItem(value);
    }

    return (
        <main className="container">
                <div className="row d-flex justify-content-center text-center my-5">
                    <div className='col-8 fs-3' >Inserção de itens</div>
                </div>
                <div className="row d-flex justify-content-center">
                <ul className="col-9">
                    {clientCheckpads && 
                    clientCheckpads.map((clientCheckpad) =>
                    <form onSubmit={handleSubmit} >
                        <div className="input-group mb-3">
                            <span className="input-group-text">Comanda {clientCheckpad.checkpad_id}</span>
                            <select className="form-select" id={'item-' + clientCheckpad.id} aria-label="Default select example" onChange={() => handleItem(clientCheckpad.id)}>
                            <option selected>Escolha um item</option>
                                {menuItem &&
                                menuItem.map((item) =>
                                <option value={item.id}>{item.name}</option>
                                )}
                            </select>
                            <input type="number" className="form-control" id={'quantity-' + clientCheckpad.id} onChange={() => handleQuantity(clientCheckpad.id)} placeholder="Quantidade"></input>
                            <button className="btn btn-outline-success" type="submit" id="button-addon2" onClick={() => changeChekpadId(clientCheckpad.id)}>Inserir</button>
                        </div>
                    </form>
                    )}
                </ul>
                </div>
        </main>
    );
}

export default InsertItem;