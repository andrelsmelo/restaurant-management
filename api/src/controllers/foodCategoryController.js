const foodCategoryModel = require('../models/foodCategory');

const findAll = async (req, res) => {

    const foodCategorys = await foodCategoryModel.findAll();

    return res.status(200).json(foodCategorys);
};

const findOrFail = async (req, res) => {

    const {id} = req.params;

    const foodCategory = await foodCategoryModel.findOrFail(id);

    if (foodCategory.length === 0) {
        return res.status(404).json('Não existe essa categoria de comida');
    }

    return res.status(200).json(foodCategory);
};

const store = async (req, res) => {

    const createdFoodCategory = await foodCategoryModel.store(req.body);

    return res.status(200).json(createdFoodCategory);
};

const update = async (req, res) => {

    const { id } = req.params;

    const updatedFoodCategory = req.body;

    await foodCategoryModel.update(id, updatedFoodCategory);

    return res.status(204).json();
};

const remove = async (req, res) => {

    const { id } = req.params;

    await foodCategoryModel.remove(id);

    return res.status(204).json();
};

module.exports = {
    findAll,
    findOrFail,
    store,
    update,
    remove
};