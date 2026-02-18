const db = require('../config/db');

const NotificationModel = {
  async create(userId, message, type = 'info') {
    const [result] = await db.query(
      'INSERT INTO notifications (user_id, message, type) VALUES (?, ?, ?)',
      [userId, message, type]
    );
    return result.insertId;
  },

  async getByUserId(userId) {
    const [rows] = await db.query(
      'SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC',
      [userId]
    );
    return rows;
  },

  async markAsRead(id) {
    await db.query('UPDATE notifications SET is_read = TRUE WHERE id = ?', [id]);
  },

  async sendToMultiple(userIds, message, type = 'info') {
    const promises = userIds.map(userId => this.create(userId, message, type));
    await Promise.all(promises);
  }
};

module.exports = NotificationModel;
