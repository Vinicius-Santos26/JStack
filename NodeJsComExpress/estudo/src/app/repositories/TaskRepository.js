const {v4} = require('uuid');

let tasks = [
  {
    id: v4(),
    title: 'Estudar NodeJs',
    description: 'Praticar criacao de api com express',
    status_id: v4(),
  },
  {
    id: v4(),
    title: 'Estudar .NET',
    description: 'Praticar criacao de api com .Net',
    status_id: v4(),
  },
];

class TaskRepository {
  findAll() {
    return new Promise((resolve) => {
      resolve(tasks);
    });
  }

  findById(id) {
    return new Promise((resolve) => {
      const task = tasks.find((taskObj) => taskObj.id === id);
      resolve(task);
    });
  }

  findByTitle(title) {
    return new Promise((resolve) => {
      const task = tasks.find((taskObj) => taskObj.title === title);
      resolve(task);
    });
  }

  create({title, description, status_id}) {
    return new Promise((resolve) => {
      const newTask = {
        id: v4(),
        title,
        description,
        status_id,
      };

      tasks.push(newTask);

      resolve(newTask);
    });
  }

  update(id, {title, description, status_id}) {
    return new Promise((resolve) => {
      const updatedTask = {
        id: id,
        title,
        description,
        status_id,
      };

      tasks = tasks.map((task) => task.id === id ? updatedTask : task);

      resolve(updatedTask);
    });
  }

  delete(id) {
    return new Promise((resolve) => {
      tasks = tasks.filter((task) => task.id !== id);
      resolve();
    });
  }
}

module.exports = new TaskRepository();