const connection = require('./connection');


const findAll = async () => {

    const query = 'SELECT * FROM clients WHERE deletedAt IS NULL';

    const [clients] = await connection.execute(query);

    return clients;
};

const findOrFail = async (id) => {

    const query = 'SELECT * FROM clients WHERE id = ? and deletedAt IS NULL';

    const [client] = await connection.execute(query, [id]);

    return client;
};

const store = async (client) => {

    const {name, cpf, phone} = client;

    const dateUTC = new Date(Date.now());

    const query = 'INSERT INTO clients (name, cpf, phone, createdAt, updatedAt) VALUES ( ?,?,?,?,? )';

    const [createdClient] = await connection.execute(query, [name, cpf, phone, dateUTC, dateUTC]);

    return { insertId: createdClient.insertId};

};

const update = async (id, client) => {

    const {name, cpf, phone} = client;

    const dateUTC = new Date(Date.now());

    const query = 'UPDATE clients SET name = ?, cpf = ?, phone = ?, updatedAt = ? WHERE id = ?';

    const [updatedClient] = await connection.execute(query, [name, cpf, phone, dateUTC, id]);

    return updatedClient;
};

const remove = async (id) => {

    const dateUTC = new Date(Date.now());

    const query = 'UPDATE clients SET deletedAt = ? WHERE id = ?';

    const [deletedClient] = await connection.execute(query, [dateUTC, id]);

    return deletedClient;
};

module.exports = {
    findAll,
    findOrFail,
    store,
    update,
    remove
};