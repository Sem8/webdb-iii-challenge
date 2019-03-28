const studentsRouter = require("express").Router();
const knex = require("knex");

const knexConfig = {
  client: "sqlite3",
  useNullAsDefault: true,
  connection: {
    filename: "./data/lambda.sqlite3"
  }
};

const studentsdb = knex(knexConfig);

studentsRouter.get("/", async (req, res) => {
  try {
    const students = await studentsdb("students");
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json(error);
  }
});

studentsRouter.get("/:id", async (req, res) => {
  try {
    const student = await studentsdb("students")
      .where({ id: req.params.id })
      .first();
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json(error);
  }
});

const errors = {
  "19": "Another record with that value exists"
};

studentsRouter.post("/", async (req, res) => {
  try {
    const [id] = await studentsdb("students").insert(req.body);

    const student = await studentsdb("students")
      .where({ id })
      .first();

    res.status(201).json(student);
  } catch (error) {
    const message = errors[error.errno] || "We ran into an error";
    res.status(500).json({ message, error });
  }
});

studentsRouter.put("/:id", async (req, res) => {
  try {
    const count = await studentsdb("students")
      .where({ id: req.params.id })
      .update(req.body);

    if (count > 0) {
      const student = await studentsdb("students")
        .where({ id: req.params.id })
        .first();

      res.status(200).json(student);
    } else {
      res.status(404).json({ message: "Record not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: `Error occurred while updating student: ${error}` });
  }
});

studentsRouter.delete("/:id", async (req, res) => {
  try {
    const count = await studentsdb("students")
      .where({ id: req.params.id })
      .del();

    if (count > 0) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Record not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: `Error occurred while deleting student: ${error}` });
  }
});

module.exports = studentsRouter;
