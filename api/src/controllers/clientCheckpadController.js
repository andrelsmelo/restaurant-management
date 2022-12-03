const clientCheckpadModel = require('../models/clientCheckpad');
const clientModel = require('../models/client');
const checkpadModel = require('../models/checkpad');
const menuModel = require('../models/menu');
const clientHistoryModel = require('../models/clientHistory');


const findAll = async (req, res) => {

    const clientCheckpads = await clientCheckpadModel.findAll();

    return res.status(200).json(clientCheckpads);
};

const findOrFail = async (req, res) => {

    const {id} = req.params;

    const clientCheckpad = await clientCheckpadModel.findOrFail(id);

    if (clientCheckpad.length === 0) {
        return res.status(404).json('Não existe esse cliente');
    }

    return res.status(200).json(clientCheckpad);
};

const store = async (req, res) => {


    const { client_id, checkpad_id } = req.body;

    try {
        await clientModel.findOrFail(client_id);

        const isCheckpadAvailable = await checkpadModel.isAvailable(checkpad_id);

        if(!isCheckpadAvailable) {
            return res.status(400).json({ message: 'Comanda indisponivel' });
        }

        const createdClientCheckpad = await clientCheckpadModel.store(client_id, checkpad_id);

        const checkpadStatus = await checkpadModel.changeCheckpadStatus(checkpad_id);
        console.log(checkpadStatus);

        return res.status(200).json(createdClientCheckpad);
    } catch (e) {
        console.log(e);
        return res.status(400).json({ message: 'Não foi possivel registrar a comanda!' });
    }
};

const update = async (req, res) => {

    const { id } = req.params;

    const updatedClientCheckpad = req.body;

    await clientCheckpadModel.update(id, updatedClientCheckpad);

    return res.status(204).json();
};

const remove = async (req, res) => {

    const { id } = req.params;

    await clientCheckpadModel.remove(id);

    return res.status(204).json();
};

const attTotalPrice = async (req, res) => {

    const { id } = req.params;

    const { consumed_item, quantity } = req.body;

    const clientCheckpad = await clientCheckpadModel.isClosed(id);
    
    console.log(clientCheckpad);

    if (clientCheckpad) {
        return res.status(404).json('Essa comanda já fechou');
    }

    const item = await menuModel.findOrFail(consumed_item);

    if(item.length === 0){
        return res.status(400).json('Item inválido');
    }

    await clientCheckpadModel.attTotalPrice(id, item[0], quantity);

    await clientHistoryModel.sendToHistory(item[0], id, quantity);

    return res.status(200).json('Item adicionado corretamente');
};

const closeCheckpad = async (req, res) => {

    const { id } = req.params;

    await clientCheckpadModel.closeCheckpad(id);

    return res.status(204).json();
};

module.exports = {
    findAll,
    findOrFail,
    store,
    update,
    remove,
    attTotalPrice,
    closeCheckpad
};