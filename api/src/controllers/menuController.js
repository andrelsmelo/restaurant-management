const menuModel = require('../models/menu');
const foodCategoryModel = require('../models/foodCategory');

const findAll = async (req, res) => {

    const menu = await menuModel.findAll();

    return res.status(200).json(menu);
};

const findOrFail = async (req, res) => {

    const { id } = req.params;

    const menu = await menuModel.findOrFail(id);

    if (menu.length === 0) {
        return res.status(404).json('Não existe esse item no menu');
    }

    return res.status(200).json(menu);
};

const store = async (req, res) => {

    const { food_category_id } = req.body;

    try {
        await foodCategoryModel.findOrFail(food_category_id);
        const createdMenu = await menuModel.store(req.body, food_category_id);

        return res.status(200).json(createdMenu);
    } catch (e) {
        return res.status(400).json({ message: 'Categoria inválida!' });
    }
};

const update = async (req, res) => {

    const { food_category_id } = req.body;
    const { id } = req.params;

    const updatedMenu = req.body;

    try {
        await foodCategoryModel.findOrFail(food_category_id);
        await menuModel.update(id, updatedMenu);

        return res.status(204).json();
    } catch (e) {
        return res.status(400).json({ message: 'Categoria inválida!' });
    }
};

const remove = async (req, res) => {

    const { id } = req.params;

    await menuModel.remove(id);

    return res.status(204).json();
};

module.exports = {
    findAll,
    findOrFail,
    store,
    update,
    remove
};