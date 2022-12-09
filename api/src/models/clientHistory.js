const connection = require('./connection');


const findAll = async () => {

    const query = 'SELECT * FROM client_history WHERE deletedAt IS NULL';

    const [clientHistory] = await connection.execute(query);

    return clientHistory;
};

const findOrFail = async (id) => {

    const query = 'SELECT * FROM client_history WHERE id = ? and deletedAt IS NULL';

    const [clientHistory] = await connection.execute(query, [id]);

    return clientHistory;
};

const store = async (client) => {

    const { date, total_price, consumed_items, quantity, client_id, client_checkpad_id } = client;

    const dateUTC = new Date(Date.now());

    const query = 'INSERT INTO client_history (date, total_price, consumed_items, quantity, client_id, client_checkpad_id, createdAt, updatedAt) VALUES ( ?,?,?,?,?,?,?,? )';

    const [createdClientHistory] = await connection.execute(query, [ date, total_price, consumed_items, quantity, client_id, client_checkpad_id, dateUTC, dateUTC]);

    return { insertId: createdClientHistory.insertId};

};

const update = async (id, client) => {

    const { date, total_price, consumed_items, quantity, client_id } = client;

    const dateUTC = new Date(Date.now());

    const query = 'UPDATE client_history SET date = ?, total_price = ?, consumed_items = ?,quantity = ?, client_id = ?, updatedAt = ? WHERE id = ?';

    const [updatedClientHistory] = await connection.execute(query, [date, total_price, consumed_items, quantity, client_id, dateUTC, id]);

    return updatedClientHistory;
};

const remove = async (id) => {

    const dateUTC = new Date(Date.now());

    const query = 'UPDATE client_history SET deletedAt = ? WHERE id = ?';

    const [deletedClientHistory] = await connection.execute(query, [dateUTC, id]);

    return deletedClientHistory;
};

const sendToHistory = async(item, quantity, client_id, client_checkpad_id) => {

    const dateUTC = new Date(Date.now());

    const client = {
        "date": dateUTC,
        "total_price": item.price,
        "consumed_items": item.name,
        "quantity": quantity,
        "client_id": Number(client_id),
        "client_checkpad_id": Number(client_checkpad_id)
    };

    store(client);
};

module.exports = {
    findAll,
    findOrFail,
    store,
    update,
    remove,
    sendToHistory
};