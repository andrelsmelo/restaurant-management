const connection = require('./connection');


const findAll = async () => {

    const query = 'SELECT * FROM menu';

    const [menu] = await connection.execute(query);

    return menu;
};

const findOrFail = async (id) => {

    const [menu] = await connection.execute(`SELECT * FROM menu WHERE id = ${id}`);

    return menu;
};

const store = async (menu, foodCategoryId) => {

    const { name, description, price } = menu;

    const dateUTC = new Date(Date.now());

    const query = 'INSERT INTO menu (name, description, price, createdAt, updatedAt, food_category_id) VALUES ( ?,?,?,?,?,? )';

    const [createdMenu] = await connection.execute(query, [name, description, price, dateUTC, dateUTC, foodCategoryId]);

    return { insertId: createdMenu.insertId};

};

const update = async (id, menu) => {

    const {name, description, price, food_category_id} = menu;

    const dateUTC = new Date(Date.now());

    const query = 'UPDATE menu SET name = ?, description = ?, price = ?, updatedAt = ?, food_category_id = ? WHERE id = ?';

    const [updatedMenu] = await connection.execute(query, [name, description, price, dateUTC, food_category_id, id]);

    return updatedMenu;
};

const remove = async (id) => {

    const query = 'DELETE FROM menu WHERE id = ?';

    const [deletedMenu] = await connection.execute(query, [id]);

    return deletedMenu;
};

module.exports = {
    findAll,
    findOrFail,
    store,
    update,
    remove
};