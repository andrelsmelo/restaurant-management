const connection = require('./connection');


const findAll = async () => {

    const query = 'SELECT * FROM food_category';

    const [foodCategorys] = await connection.execute(query);

    return foodCategorys;
};

const findOrFail = async (id) => {

    const query = 'SELECT * FROM food_category WHERE id = ?';

    const [foodCategory] = await connection.execute(query, [id]);

    return foodCategory;
};

const store = async (client) => {

    const { name } = client;

    const dateUTC = new Date(Date.now());

    const query = 'INSERT INTO food_category (name, createdAt, updatedAt) VALUES ( ?,?,? )';

    const [createdFoodCategory] = await connection.execute(query, [name, dateUTC, dateUTC]);

    return { insertId: createdFoodCategory.insertId};

};

const update = async (id, foodCategory) => {

    const { name } = foodCategory;

    const dateUTC = new Date(Date.now());

    const query = 'UPDATE food_category SET name = ?, updatedAt = ? WHERE id = ?';

    const [updatedFoodCategory] = await connection.execute(query, [name, dateUTC, id]);

    return updatedFoodCategory;
};

const remove = async (id) => {

    const query = 'DELETE FROM food_category WHERE id = ?';

    const [deletedFoodCategory] = await connection.execute(query, [id]);

    return deletedFoodCategory;
};

module.exports = {
    findAll,
    findOrFail,
    store,
    update,
    remove
};