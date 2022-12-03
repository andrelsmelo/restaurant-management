const checkpadModel = require('../models/checkpad');

const findAll = async (req, res) => {

    const checkpads = await checkpadModel.findAll();

    if (checkpads.length === 0) {
        return res.status(200).json({message: 'Nenhuma comanda cadastrada'});
    }

    return res.status(200).json(checkpads);
};

const findOrFail = async (req, res) => {

    const {id} = req.params;

    const checkpad = await checkpadModel.findOrFail(id);

    if (checkpad.length === 0) {
        return res.status(200).json({message: 'Essa comanda não existe'});
    }

    return res.status(200).json(checkpad);
};

const store = async (req, res) => {

    const createdCheckpad = await checkpadModel.store(req.body);

    return res.status(200).json(createdCheckpad);
};

const update = async (req, res) => {

    const { id } = req.params;

    const updatedCheckpad = req.body;

    await checkpadModel.update(id, updatedCheckpad);

    return res.status(204).json();
};

const remove = async (req, res) => {

    const { id } = req.params;

    await checkpadModel.remove(id);

    return res.status(204).json();
};

module.exports = {
    findAll,
    findOrFail,
    store,
    update,
    remove
};