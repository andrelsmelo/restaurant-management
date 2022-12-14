const connection = require('./connection');


const findAll = async () => {

    const query = 'SELECT * FROM checkpads WHERE deletedAt IS NULL';

    const [checkpad] = await connection.execute(query);

    return checkpad;
};

const findOrFail = async (id) => {

    const query = 'SELECT * FROM checkpads WHERE id = ? and deletedAt IS NULL';

    const [checkpad] = await connection.execute(query, [id]);

    return checkpad;
};

const store = async (Checkpad) => {

    const { status } = Checkpad;

    const dateUTC = new Date(Date.now());

    const query = 'INSERT INTO checkpads (status, createdAt, updatedAt) VALUES ( ?,?,? )';

    const [createdCheckpad] = await connection.execute(query, [status, dateUTC, dateUTC]);

    return { insertId: createdCheckpad.insertId};

};

const update = async (id, checkpad) => {

    const { status } = checkpad;

    const dateUTC = new Date(Date.now());

    const query = 'UPDATE checkpads SET status = ?, updatedAt = ? WHERE id = ?';

    const [updatedCheckpad] = await connection.execute(query, [status, dateUTC, id]);

    return updatedCheckpad;
};

const remove = async (id) => {

    const dateUTC = new Date(Date.now());

    const query = 'UPDATE checkpads SET deletedAt = ? WHERE id = ?';

    const [deletedCheckpad] = await connection.execute(query, [dateUTC, id]);

    return deletedCheckpad;
};

const isAvailable = async (id) => {

    const query = 'SELECT * FROM checkpads WHERE id = ? and status = "Disponível"';

    const [checkpad] = await connection.execute(query, [id]);

    if (checkpad.length === 0) {
        return false;
    }
    return true;
};

const changeCheckpadStatus = async (id) => {

    const dateUTC = new Date(Date.now());

    const statusQuery = 'SELECT status FROM checkpads WHERE id = ?';

    const [status] = await connection.execute(statusQuery, [id]);

    const query = 'UPDATE checkpads SET status = ?, updatedAt = ? WHERE id = ?';

    if(status[0].status === 'Disponível'){
        await connection.execute(query, ['Indisponível', dateUTC, id]);
        let message = 'Status alterado para Indisponível';
        return message;
    } else if (status[0].status === 'Indisponível') {
        await connection.execute(query, ['Disponível', dateUTC, id]);
        let message = 'Status alterado para Disponível';
        return message;
    }
};

const changeAllStatusAvailable = async () => {

    const dateUTC = new Date(Date.now());

    const query = 'UPDATE checkpads SET status = ?, updatedAt = ?';

    await connection.execute(query, ['Disponível', dateUTC]);
};

const changeAllStatusUnavailable = async () => {

    const dateUTC = new Date(Date.now());

    const query = 'UPDATE checkpads SET status = ?, updatedAt = ?';

    await connection.execute(query, ['Indisponível', dateUTC]);
};

module.exports = {
    findAll,
    findOrFail,
    store,
    update,
    remove,
    isAvailable,
    changeCheckpadStatus,
    changeAllStatusAvailable,
    changeAllStatusUnavailable
};