const db = require('../../database');

class StatusRepository {
  async findAll(orderBy = 'ASC') {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';

    const rows = await db.query(`
      SELECT * FROM status ORDER BY name ${direction}
    `);

    return rows;
  }

  async findById(id) {
    const [row] = await db.query(`
      SELECT * FROM status WHERE id = $1
    `, [id]);

    return row;
  }

  async findByName(name) {
    const [row] = await db.query(`
    SELECT * FROM status WHERE name = $1
    `, [name]);

    return row;
  }

  async create({name}) {
    const [row] = await db.query(`
      INSERT INTO status (name)
      VALUES ($1)
      RETURNING *
    `, [name]);

    return row;
  }

  async update(id, {name}) {
    const [row] = await db.query(`
    UPDATE status
    SET name = $1
    WHERE id = $2
    RETURNING *
  `, [name, id]);

    return row;
  }

  async delete(id) {
    const deleteOp = await db.query(`
    DELETE FROM status WHERE id = $1
    `, [id]);

    return deleteOp;
  }
}

module.exports = new StatusRepository();