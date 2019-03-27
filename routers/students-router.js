const studentsRouter = require('express').Router();
const knex = require('knex');

const knexConfig = {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
        filename: './data/lambda.sqlite3'
    }
};

const studentsdb = knex(knexConfig);

studentsRouter.get('/', async (req, res) => {
    try {
        const students = await studentsdb('students');
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = studentsRouter;