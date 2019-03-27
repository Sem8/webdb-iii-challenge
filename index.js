const express = require("express");
const helmet = require("helmet");

const cohortsRouter = require('./routers/cohorts-router');
const studentsRouter = require('./routers/students-router');

const server = express();

server.use(express.json());
server.use(helmet());

server.get("/", (req, res) => {
    res.send(
        `Navigate to /api/cohorts on the URL to get all cohorts and navigate to /api/students to get all students`
    );
});

server.use('/api/cohorts', cohortsRouter);
server.use('/api/students', studentsRouter);


const port = process.env.PORT || 5000;
server.listen(port, function() {
    console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});