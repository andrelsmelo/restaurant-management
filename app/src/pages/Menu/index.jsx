import { useState, useEffect } from 'react';
import api from '../../service/api';
function Menu() {

    const [menu, setMenu] = useState();
    const [foodCategorys, setFoodCategorys] = useState(null);
    const [filterOption, setFilterOption] = useState(0);

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
        api.get(`/menu-filtered/${id}`)
          .then(function (res) {
            setMenu(res.data);
          })
          .catch(function (error) {
            console.error(error);
          })
    }

    const duasChamadas = e => {
        filterOptions(e.target.value)
        setFilterOption(e.target.value)
    }

    return (
        <main className="container">
            <div className="row d-flex flex-column mb-3 text-center align-items-center">
                <div className="col-3 fs-1 my-3">
                    Menu
                </div>
                <div className="col-6 mb-3">
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Procure algum item" aria-label="Search" />
                        <button className="btn btn-outline-success" type="submit">Procurar</button>
                    </form>
                </div>
            </div>
            <div className="row">
                <select className="form-select m-3" value={filterOption} onChange={duasChamadas} aria-label="Default select example">
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
                            <div className="col-8 m-2 p-1 fs-2">
                                {menu.name}
                            </div>
                            <div className="col-1 d-flex justify-content-center m-2 p-1 align-items-center fs-3">
                                {menu.price}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-8 my-3 fs-5 mb-2">
                                {menu.description}
                            </div>
                        </div>
                        <hr />
                    </div>
                )}
        </main>
    );
}

export default Menu;