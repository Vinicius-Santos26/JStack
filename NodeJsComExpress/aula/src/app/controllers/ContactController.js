const ContactRepository = require('../repositories/ContactRepository');

class ContactController {
  async index(request, response) {
    const { orderBy } = request.query;

    const contacts = await ContactRepository.findAll(orderBy);
    response.json(contacts);
  }

  async show(request, response) {
    const { id } = request.params;
    const contact = await ContactRepository.findById(id);

    if (!contact) {
      // 404: Not found
      return response.status(404).json({ error: 'Contact not found' });
    }

    response.json(contact);
  }

  async store(request, response) {
    const {
      name, email, phone, category_id,
    } = request.body;

    if (!name) {
      // 400: Bad Request
      return response.status(400).json({ error: 'Name is required' });
    }

    const contactExists = await ContactRepository.findByEmail(email);

    if (contactExists) {
      // 400: Bad Request
      return response.status(400).json({ error: 'This email is already in use' });
    }

    const contact = await ContactRepository.create({
      name,
      email,
      phone,
      category_id,
    });

    response.json(contact);
  }

  async update(request, response) {
    const { id } = request.params;
    const {
      name, email, phone, category_id,
    } = request.body;

    const contactExists = await ContactRepository.findById(id);

    if (!contactExists) {
      // 404: Not found
      return response.status(404).json({ error: 'User not found' });
    }

    if (!name) {
      // 400: Bad Request
      return response.status(400).json({ error: 'Name is required' });
    }

    const contactByEmail = await ContactRepository.findByEmail(email);

    if (contactByEmail && contactByEmail.id !== id) {
      // 400: Bad Request
      return response.status(400).json({ error: 'This email is already in use' });
    }

    const contact = await ContactRepository.update(id, {
      name,
      email,
      phone,
      category_id,
    });

    response.json(contact);
  }

  async delete(request, response) {
    const { id } = request.params;

    await ContactRepository.delete(id);
    // 204: No Content
    response.sendStatus(204);
  }
}

module.exports = new ContactController();