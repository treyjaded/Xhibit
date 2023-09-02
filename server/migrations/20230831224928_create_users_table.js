exports.up = function (knex) {
  return knex.schema.createTable('users', function (table) {
    table.increments('id').primary();
    table.string('firstName').notNullable();
    table.string('lastName').notNullable();
    table.string('email').notNullable().unique();
    table.string('password').notNullable();
    table.string('picturePath').defaultTo('');
    table.json('friends').defaultTo('[]');
    table.string('location');
    table.string('occupation');
    table.integer('viewedProfile');
    table.integer('impressions');
    table.timestamps(true, true);
  }).then(function () {
    // Add a raw update query to correct invalid JSON data
    return knex.raw(`
      UPDATE users
      SET friends = '[]'  -- Replace invalid JSON with an empty array
      WHERE friends IS NULL OR friends = '' OR friends = 'null'
    `);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('users');
};
