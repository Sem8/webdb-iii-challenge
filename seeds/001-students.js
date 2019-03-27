
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        { name: 'Melinda'},
        { name: 'Adam'},
        { name: 'Katie'}
      ]);
    });
};