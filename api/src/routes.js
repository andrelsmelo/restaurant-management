const express = require('express');


const checkpadController = require('./controllers/checkpadController');
const clientCheckpadController = require('./controllers/clientCheckpadController');
const clientController = require('./controllers/clientController');
const clientHistoryController = require('./controllers/clientHistoryController');
const foodCategoryController = require('./controllers/foodCategoryController');
const menuController = require('./controllers/menuController');

const clientMiddleware = require('./middlewares/clientMiddleware');
const checkpadMiddleware = require('./middlewares/checkpadMiddleware');
const foodCategoryMiddleware = require('./middlewares/foodCategoryMiddleware');

const router = express.Router();

router.get('/is-alive', (req,res) => {
    res.status(200).json({message: 'Backend is alive'});
});

router.get('/checkpad', checkpadController.findAll);
router.get('/checkpad/:id', checkpadController.findOrFail);
router.post('/checkpad', checkpadMiddleware.validateBody, checkpadController.store);
router.put('/checkpad/change-all-status-available', checkpadController.changeAllStatusAvailable);
router.put('/checkpad/change-all-status-unavailable', checkpadController.changeAllStatusUnavailable);
router.put('/checkpad/:id', checkpadMiddleware.validateBody, checkpadController.update);
router.put('/checkpad/:id/delete', checkpadController.remove);
router.put('/checkpad/:id/change-status', checkpadController.changeCheckpadStatus);


router.get('/client-checkpad', clientCheckpadController.findAll);
router.get('/client-checkpad/:id', clientCheckpadController.findOrFail);
router.post('/client-checkpad', clientCheckpadController.store);
router.put('/client-checkpad/:id/new-item', clientCheckpadController.attTotalPrice);
router.put('/client-checkpad/:id/close', clientCheckpadController.closeCheckpad);
router.put('/client-checkpad/:id', clientCheckpadController.update);
router.put('/client-checkpad/:id/delete', clientCheckpadController.remove);

router.get('/client', clientController.findAll);
router.get('/client/:id', clientController.findOrFail);
router.post('/client', clientMiddleware.validateBody, clientController.store);
router.put('/client/:id', clientMiddleware.validateBody, clientController.update);
router.put('/client/:id/delete', clientController.remove);

router.get('/client-history', clientHistoryController.findAll);
router.get('/client-history/:id', clientHistoryController.findOrFail);
router.post('/client-history', clientHistoryController.store);
router.put('/client-history/:id', clientHistoryController.update);
router.put('/client-history/:id/delete', clientHistoryController.remove);

router.get('/food-category', foodCategoryController.findAll);
router.get('/food-category/:id', foodCategoryController.findOrFail);
router.post('/food-category', foodCategoryMiddleware.validateBody, foodCategoryController.store);
router.put('/food-category/:id', foodCategoryMiddleware.validateBody, foodCategoryController.update);
router.put('/food-category/:id/delete', foodCategoryController.remove);

router.get('/menu', menuController.findAll);
router.get('/menu/:id', menuController.findOrFail);
router.post('/menu', menuController.store);
router.put('/menu/:id', menuController.update);
router.put('/menu/:id/delete', menuController.remove);
router.get('/menu-filtered/:id', menuController.filter);

module.exports = router;