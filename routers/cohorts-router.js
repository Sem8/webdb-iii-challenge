const router = require("express").Router();
const knex = require("knex");

const knexConfig = {
    client: "sqlite3",
    useNullAsDefault: true,
    connection: {
        filename: "./data/lambda.sqlite3"
    }
};

const cohortsdb = knex(knexConfig);

router.get('/', (req, res) => {
    // cohortsdb('cohorts')
    // .then(cohorts => {
    //     res.status(200).json(cohorts);
    // })
    // .catch(error => {
    //     res.status(500).json({ message: `The cohorts information could not be retrieved: ${error}`}):
    // });
    res.send('get all cohort data here');
});


module.exports = router;