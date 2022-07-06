let tasks = require('../mocks/tasks');

module.exports = {
  listAllTasks(request, response) {
    const { order } = request.query;

    const sortedTasks = [...tasks].sort((a, b) => {
      if (order === 'desc') {
        return a.id < b.id ? 1 : -1;
      }
      return a.id > b.id ? 1 : -1;
    });

    response.send(200, sortedTasks);
  },
  getTaskById(request, response) {
    const { id } = request.params;

    const task = tasks.find((taskObj) => taskObj.id === Number(id));

    if (!task) {
      response.send(400, { error: 'Task not found' });
    } else {
      response.send(200, task);
    }
  },
  createTask(request, response) {
    const { title, status } = request.body;

    const lastTaskId = tasks[tasks.length - 1].id
    console.log(tasks[tasks.length - 1].id);
    console.log(tasks);
    const newTask = {
      id: lastTaskId + 1,
      title,
      status
    };

    tasks.push(newTask);

    response.send(201, newTask);
  },
  updateTask(request, response) {
    let { id } = request.params;
    id = Number(id);

    const taskExists = tasks.find((taskObj) => taskObj.id === id);

    if (!taskExists) {
      return response.send(400, { error: 'Task not found' });
    }

    const { title, status } = request.body;

    tasks = tasks.map((taskObj) => taskObj.id === id ? { ...taskObj, title, status } : taskObj);

    response.send(200, { id, title, status });
  },
  deleteTask(request, response) {
    let { id } = request.params;
    id = Number(id);

    const taskExists = tasks.find((taskObj) => taskObj.id === id);

    if (!taskExists) {
      return response.send(400, { error: 'Task not found' });
    }

    tasks = tasks.filter((taskObj) => taskObj.id !== id);

    response.send(204);
  }
}