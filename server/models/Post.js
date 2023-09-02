const knex = require('../knex');
const { Model } = require('objection');

class Post extends Model {
  static get tableName() {
    return 'posts';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['userId', 'firstName', 'lastName'],
      properties: {
        id: { type: 'integer' },
        userId: { type: 'string' },
        firstName: { type: 'string' },
        lastName: { type: 'string' },
        location: { type: 'string' },
        description: { type: 'string' },
        picturePath: { type: 'string' },
        userPicturePath: { type: 'string' },
        likes: { type: 'jsonb' }, // Assuming JSONB column type for likes
        comments: { type: 'jsonb' }, // Assuming JSONB column type for comments
        // You can define more properties here
      },
    };
  }

  static get relationMappings() {
    // Define your relations here if needed
  }
}

module.exports = Post;
