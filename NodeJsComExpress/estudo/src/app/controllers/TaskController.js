const TaskRepository = require('../repositories/TaskRepository');

class TaskController {
  async index(request, response) {
    const {orderBy} = request.query;
    const tasks = await TaskRepository.findAll(orderBy);
    response.json(tasks);
  }

  async show(request, response) {
    const {id} = request.params;

    const task = await TaskRepository.findById(id);

    if (!task) {
      return response.status(404).json({error: 'Task not found'});
    }

    response.json(task);
  }

  async store(request, response) {
    const {title, description, status_id} = request.body;

    if (!title) {
      return response.status(400).json({error: 'Title is required'});
    }

    const taskExists = await TaskRepository.findByTitle(title);

    if (taskExists) {
      return response.status(400).json({error: 'This title is already in use'});
    }

    const task = await TaskRepository.create({title, description, status_id});

    response.json(task);
  }

  async update(request, response) {
    const {id} = request.params;
    const {title, description, status_id} = request.body;

    const taskExists = await TaskRepository.findById(id);

    if (!taskExists) {
      return response.status(404).json({error: 'Task not found'});
    }

    if (!title) {
      return response.status(400).json({error: 'Title is required'});
    }

    const taskByTitle = await TaskRepository.findByTitle(title);

    if (taskByTitle) {
      return response.status(400).json({error: 'This title is already in use'});
    }

    const task = await TaskRepository.update(
        id,
        {title, description, status_id},
    );

    response.json(task);
  }

  async delete(request, response) {
    const {id} = request.params;

    const taskExists = await TaskRepository.findById(id);

    if (!taskExists) {
      return response.status(404).json({error: 'Task not found'});
    }

    await TaskRepository.delete(id);

    response.sendStatus(204);
  }
}

module.exports = new TaskController();