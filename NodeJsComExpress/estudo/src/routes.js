const {Router} = require('express');
const TaskController = require('./app/controllers/TaskController');
const StatusController = require('./app/controllers/StatusController');

const router = Router();

// tasks
router.get('/tasks', TaskController.index);
router.get('/tasks/:id', TaskController.show);
router.post('/tasks', TaskController.store);
router.put('/tasks/:id', TaskController.update);
router.delete('/tasks/:id', TaskController.delete);

// status
router.get('/status', StatusController.index);
router.get('/status/:id', StatusController.show);
router.post('/status', StatusController.store);
router.put('/status/:id', StatusController.update);
router.delete('/status/:id', StatusController.delete);

module.exports = router;