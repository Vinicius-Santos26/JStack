const {Router} = require('express');
const TaskController = require('./app/controllers/TaskController');

const router = Router();

router.get('/tasks', TaskController.index);
router.get('/tasks/:id', TaskController.show);
router.post('/tasks', TaskController.store);
router.put('/tasks/:id', TaskController.update);
router.delete('/tasks/:id', TaskController.delete);

module.exports = router;