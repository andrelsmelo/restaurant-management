import { useState, useEffect, useRef } from 'react';
import api from '../../service/api';
import Modal from 'react-modal';
import { useToasts } from 'react-toast-notifications'

function Menu() {

    const [menu, setMenu] = useState();
    const [modalIsOpen, setModaIsOpen] = useState(false);
    const [foodCategorys, setFoodCategorys] = useState(null);
    const [filterOption, setFilterOption] = useState(0);
    const nameRef = useRef(null);
    const descriptionRef = useRef(null);
    const priceRef = useRef(null);
    const categoryRef = useRef(null);

    const { addToast } = useToasts();

    function openModal() {
        setModaIsOpen(true);
    }

    function closeModal() {
        setModaIsOpen(false);
    }

    useEffect(() => {
        api.get('food-category').then(res => {
            setFoodCategorys(res.data);
        })
    }, []);

    useEffect(() => {
        api.get('menu').then(res => {
            setMenu(res.data);
        })
    }, [])

    function filterOptions(id) {
        if (id !== 'Selecione uma categoria') {
            api.get(`/menu-filtered/${id}`)
                .then(function (res) {
                    setMenu(res.data);
                })
                .catch(function (error) {
                    console.error(error);
                })
        } else {
            api.get('menu').then(res => {
                setMenu(res.data);
            })
        }
    }

    const filterMenu = e => {
        filterOptions(e.target.value)
        setFilterOption(e.target.value)
    }

    function registerNewMenuItem() {

        let data = {
            name: nameRef.current.value,
            description: descriptionRef.current.value,
            price: priceRef.current.value,
            food_category_id: categoryRef.current.value,
        }

        api.post('menu', data)
            .then(function (res) {
                api.get('menu').then(res => {
                    setMenu(res.data);
                })
                addToast('Item inserido com succeso', {
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

    function deleteMenuItem(id) {
        api.put(`menu/${id}/delete`)
            .then(function (res) {
                api.get('menu').then(res => {
                    setMenu(res.data);
                })
                addToast('Item de menu deletado com succeso.', {
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
        <main className="container">
            <div className="row d-flex flex-column mb-3 text-center align-items-center">
                <div className='col-6 fs-2'>Menu</div>
                <div className='col-3 mb-3'>
                    <button type="button" className="btn btn-secondary p-2 m-2" onClick={openModal}>Registrar novo item</button>
                </div>
                <div className="col-6 mb-3">
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Procure algum item" aria-label="Search" />
                        <button className="btn btn-outline-success" type="submit">Procurar</button>
                    </form>
                </div>
            </div>
            <div className="row">
                <select className="form-select m-3" value={filterOption} onChange={filterMenu} aria-label="Default select example">
                    <option>Selecione uma categoria</option>
                    {foodCategorys &&
                        foodCategorys?.map((foodCategory) =>
                            <option key={foodCategory.id} value={foodCategory.id}>{foodCategory.name}</option>
                        )}
                </select>
            </div>
            <hr />
                {menu &&
                    menu?.map((menu) =>
                    <div className="row">
                        <div className="row d-flex justify-content-between">
                            <div className="col-10 m-2 p-1 fs-2">
                                {menu.name}
                            </div>
                            <div className="col-1 d-flex justify-content-center m-2 p-1 align-items-center fs-3">
                                {menu.price}
                            </div>
                        </div>
                        <div className="row d-flex justify-content-between">
                            <div className="col-8 my-3 fs-5 mb-2">
                                {menu.description}
                            </div>
                            <div className="col-1 d-flex justify-content-center m-2 p-1 align-items-center fs-3">
                                <button type="button" className="btn btn-danger mx-2" onClick={() => deleteMenuItem(menu.id)}>Deletar</button>
                            </div>
                        </div>
                        <hr/>
                    </div>
                    )}

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
                            <input type="text" className="form-control" ref={nameRef} placeholder="Nome" aria-label="Username" aria-describedby="basic-addon1" />
                        </div>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" ref={descriptionRef} placeholder="Descrição" aria-label="Username" aria-describedby="basic-addon1" />
                        </div>
                        <div className="input-group mb-3">
                            <input type="number" className="form-control" ref={priceRef} placeholder="Preço" aria-label="Username" aria-describedby="basic-addon1" />
                        </div>
                        <div className="input-group mb-3">
                            <select className="form-select m-3" ref={categoryRef} aria-label="Default select example">
                                <option>Selecione uma categoria</option>
                                {foodCategorys &&
                                    foodCategorys?.map((foodCategory) =>
                                        <option key={foodCategory.id} value={foodCategory.id}>{foodCategory.name}</option>
                                    )}
                            </select>
                        </div>
                    </div>
                    <div className="row d-flex justify-content-center m-3">
                        <button type="button" className="btn btn-secondary col-3 m-3" onClick={closeModal}>Fechar</button>
                        <button type="button" className="btn btn-success col-3 m-3" onClick={registerNewMenuItem}>Registrar</button>
                    </div>
                </Modal>
            </div>
        </main>
    );
}

export default Menu;