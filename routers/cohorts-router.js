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

router.get("/", (req, res) => {
  cohortsdb("cohorts")
    .then(cohorts => {
      res.status(200).json(cohorts);
    })
    .catch(error => {
      res
        .status(500)
        .json({
          message: `The cohorts information could not be retrieved: ${error}`
        });
    });
  // res.send('get all cohort data here');
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  cohortsdb("cohorts")
    .where({ id })
    .first()
    .then(cohort => {
      res.status(200).json(cohort);
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: `Error occurred while retrieving cohort: ${error}` });
    });
});

router.post("/", (req, res) => {
  cohortsdb("cohorts")
    .insert(req.body)
    .then(ids => {
      const id = ids[0];
      cohortsdb("cohorts")
        .where({ id })
        .first()
        .then(cohort => {
          res.status(201).json(cohort);
        });
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: `A new cohort couldn't be made: ${error}` });
    });
});

router.put('/:id', (req, res) => {
    cohortsdb('cohorts').where({ id: req.params.id }).update(req.body).then(count => {
        if (count > 0) {
            res.status(200).json(count);
        } else {
            res.status(404).json({ message: 'Cohort does not exist' });
        }
    }).catch(error => {
        res.status(500).json({ message: `Error occurred while updating cohort: ${error}`});
    });
});

router.delete("/:id", async (req, res) => {
   try {
       const count = await cohortsdb('cohorts').where({ id: req.params.id }).del();
       if(count > 0) {
           res.status(204).end();
       } else {
           res.status(404).json({ message: 'Cohort not found' });
       }
   } catch(error) {}
});

module.exports = router;
