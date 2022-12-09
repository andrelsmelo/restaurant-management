const connection = require('./connection');


const findAll = async () => {

    const query = 'SELECT * FROM menu WHERE deletedAt IS NULL';

    const [menu] = await connection.execute(query);

    return menu;
};

const findOrFail = async (id) => {

    const query = 'SELECT * FROM menu WHERE id = ? and deletedAt IS NULL';

    const [menu] = await connection.execute(query, [id]);

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

    const dateUTC = new Date(Date.now());

    const query = 'UPDATE menu SET deletedAt = ? WHERE id = ?';

    const [deletedMenu] = await connection.execute(query, [dateUTC, id]);

    return deletedMenu;
};

const filter = async(food_category_id) => {

    const query = 'SELECT * FROM menu WHERE food_category_id = ?';

    const [menu] = await connection.execute(query, [food_category_id]);

    return menu;

};

module.exports = {
    findAll,
    findOrFail,
    store,
    update,
    remove,
    filter
};