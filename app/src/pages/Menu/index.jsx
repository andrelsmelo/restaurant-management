import React, { useState, useEffect } from 'react';
import api from '../../service/api';
function Menu() {

    const [menu, setMenu] = useState();

    useEffect(() => {
        api.get('menu').then(res => {
            setMenu(res.data);
        })
    }, []);

    return (
        <main className="container">
            <h1>Menu</h1>
            <ul>
                {menu?.map((menu) =>
                    <li key={menu.id}>
                        <p>Item: {menu.name}</p>
                        <p>Descriçao: {menu.description}</p>
                        <p>Preço: {menu.price}</p>
                    </li>
                )}
            </ul>
        </main>
    );
}

export default Menu;