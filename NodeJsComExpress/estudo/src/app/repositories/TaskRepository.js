const db = require('../../database');

class TaskRepository {
  async findAll(orderBy = 'ASC') {
    const direction = orderBy.toUpperCase() === 'DESC'? 'DESC' : 'ASC';

    const rows = await db.query(`
      SELECT tasks.*, status.name as status_name
      FROM tasks
      LEFT JOIN status on status.id = tasks.status_id
      ORDER BY title ${direction}
    `);
    return rows;
  }

  async findById(id) {
    const [row] = await db.query(`
      SELECT tasks.*, status.name as status_name
      FROM tasks
      LEFT JOIN status on status.id = tasks.status_id
      WHERE tasks.id = $1
    `, [id]);
    return row;
  }

  async findByTitle(title) {
    const [row] = await db.query(`
      SELECT * FROM tasks WHERE title = $1
    `, [title]);
    return row;
  }

  async create({title, description, status_id}) {
    const [row] = await db.query(`
      INSERT INTO tasks (title, description, status_id)
      VALUES ($1, $2, $3)
      RETURNING *
      `, [title, description, status_id]);

    return row;
  }

  async update(id, {title, description, status_id}) {
    const [row] = await db.query(`
      UPDATE tasks
      SET title = $1, description = $2, status_id = $3
      WHERE id = $4
      RETURNING *
    `, [title, description, status_id, id]);

    return row;
  }

  async delete(id) {
    const deleteOp = await db.query(`
      DELETE FROM tasks WHERE id = $1
    `, [id]);
    return deleteOp;
  }
}

module.exports = new TaskRepository();