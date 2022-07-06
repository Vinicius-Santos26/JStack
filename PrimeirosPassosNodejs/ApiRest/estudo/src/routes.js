const TaskController = require('./controllers/TaskController');

module.exports  = [
  {
    endpoint: '/tasks',
    method: 'GET',
    handler: TaskController.listAllTasks
  },
  {
    endpoint: '/tasks/:id',
    method: 'GET',
    handler: TaskController.getTaskById
  },
  {
    endpoint: '/tasks',
    method: 'POST',
    handler: TaskController.createTask
  },
  {
    endpoint: '/tasks/:id',
    method: 'PUT',
    handler: TaskController.updateTask
  },
  {
    endpoint: '/tasks/:id',
    method: 'DELETE',
    handler: TaskController.deleteTask
  },
];
