
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        { name: 'Melinda', cohort_id: 1 },
        { name: 'Adam', cohort_id: 1 },
        { name: 'Katie', cohort_id: 1 }
      ]);
    });
};
