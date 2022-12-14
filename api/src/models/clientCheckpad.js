const connection = require('./connection');


const findAll = async () => {

    const query = `SELECT * FROM client_checkpad where status != 'Fechada' and deletedAt IS NULL`;

    const [clientCheckpad] = await connection.execute(query);

    return clientCheckpad;
};

const findOrFail = async (id) => {

    const query = 'SELECT * FROM client_checkpad WHERE id = ? and status != "Fechada" and deletedAt IS NULL';

    const [clientCheckpad] = await connection.execute(query, [id]);

    return clientCheckpad;
};

const store = async (client_id, checkpad_id) => {

    const dateUTC = new Date(Date.now());

    const query = 'INSERT INTO client_checkpad (checkpad_id, client_id, total_price, status, createdAt, updatedAt) VALUES ( ?,?,?,?,?,? )';

    const [createdClientCheckpad] = await connection.execute(query, [checkpad_id, client_id, 0, 'Aberta', dateUTC, dateUTC]);

    return { insertId: createdClientCheckpad.insertId};

};

const update = async (id, client) => {

    const { checkpad_id, client_id, total_price } = client;

    const dateUTC = new Date(Date.now());

    const query = 'UPDATE client_checkpad SET checkpad_id = ?, client_id = ?, total_price = ?, updatedAt = ? WHERE id = ?';

    const [updatedClientCheckpad] = await connection.execute(query, [checkpad_id, client_id, total_price, dateUTC, id]);

    return updatedClientCheckpad;
};

const remove = async (id) => {

    const dateUTC = new Date(Date.now());

    const query = 'UPDATE client_checkpad  SET deletedAt = ? WHERE id = ?';

    const [deletedClientCheckpad] = await connection.execute(query, [dateUTC, id]);

    return deletedClientCheckpad;
};

const attTotalPrice = async (id, item, quantity) => {

    const dateUTC = new Date(Date.now());

    if(!quantity) quantity = 1;

    const clientCheckpadQuery = 'SELECT * FROM client_checkpad WHERE id = ? and status = "Aberta"';

    const [clientCheckpad] = await connection.execute(clientCheckpadQuery, [id]);

    const newTotalPrice = Number(clientCheckpad[0].total_price) + (Number(item.price) * quantity);

    const query = 'UPDATE client_checkpad SET total_price = ?, updatedAt = ? WHERE id = ?';

    const [updatedClientCheckpad] = await connection.execute(query, [newTotalPrice, dateUTC, id]);

    return updatedClientCheckpad;
};

const closeCheckpad = async (id) => {

    const dateUTC = new Date(Date.now());

    const query = "UPDATE client_checkpad SET status = 'Fechada', updatedAt = ? WHERE id = ?";

    const [updatedClientCheckpad] = await connection.execute(query, [dateUTC, id]);

    return updatedClientCheckpad;
};

const isClosed = async (id) => {

    const query = 'SELECT * FROM client_checkpad WHERE id = ? and status != "Fechada"';

    const [clientCheckpad] = await connection.execute(query, [id]);
    
    if(clientCheckpad.length === 0){
        return true;
    }
    return false;
};

const getClient = async (id) => {

    const query = 'SELECT client_id FROM client_checkpad WHERE id = ? and status != "Fechada"';

    const [client] = await connection.execute(query, [id]);
    
    return client;
};

const getCheckpad = async (id) => {

    const query = 'SELECT checkpad_id FROM client_checkpad WHERE id = ? and status != "Fechada"';

    const [checkpad] = await connection.execute(query, [id]);
    
    return checkpad;
};

module.exports = {
    findAll,
    findOrFail,
    store,
    update,
    remove,
    attTotalPrice,
    closeCheckpad,
    isClosed,
    getClient,
    getCheckpad
};