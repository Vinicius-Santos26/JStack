const StatusRepository = require('../repositories/StatusRepository');

class StatusController {
  async index(request, response) {
    const {orderBy} = request.query;

    const status = await StatusRepository.findAll(orderBy);

    response.json(status);
  }

  async show(request, response) {
    const {id} = request.params;

    const status = await StatusRepository.findById(id);

    if (!status) {
      return response.status(404).json({error: 'Status not found'});
    }

    response.json(status);
  }

  async store(request, response) {
    const {name} = request.body;

    if (!name) {
      return response.status(400).json({error: 'Name is required'});
    }

    const statusExists = await StatusRepository.findByName(name);

    if (statusExists) {
      return response.status(400).json({error: 'This name is already in use'});
    }

    const status = await StatusRepository.create({name});

    response.json(status);
  }

  async update(request, response) {
    const {id} = request.params;
    const {name} = request.body;

    const statusExists = await StatusRepository.findById(id);

    if (!statusExists) {
      return response.status(404).json({error: 'Status not found'});
    }

    if (!name) {
      return response.status(400).json({error: 'Name is required'});
    }

    const statusNyName = await StatusRepository.findByName(name);

    if (statusNyName && statusNyName.id !== id) {
      return response.status(400).json({error: 'This name is already in use'});
    }

    const status = await StatusRepository.update(id, {name});

    response.json(status);
  }

  async delete(request, response) {
    const {id} = request.params;
    await StatusRepository.delete(id);

    response.sendStatus(204);
  }
}

module.exports = new StatusController();