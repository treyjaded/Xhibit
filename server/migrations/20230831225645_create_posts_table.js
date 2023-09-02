exports.up = function (knex) {
  return knex.schema.createTable('posts', function (table) {
    table.increments('id').primary();
    table.integer('userId');
    // table.foreign('userId').references('id').inTable('users');
    table.string('firstName').notNullable();
    table.string('lastName').notNullable();
    table.string('location');
    table.string('description');
    table.string('picturePath');
    table.string('userPicturePath');
    table.json("likes"); // Initialize as an empty object
    ; // Use JSON data type for a map-like structure
    table.json("comments"); // Initialize as an empty array
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('posts');
};
