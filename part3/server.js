const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./mongo");
const personRoute = require("./routes/personRoutes");
const { errorHandler } = require("./utils/errorHandler");
const { unknownEndpoint } = require("./utils/unknownEndPoint");

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static("build"));

morgan.token("req-data", (req, res) => {
  return JSON.stringify(req.body);
});
app.use(morgan(":method :url :status :res[content-length] :req-data - :response-time ms"));

let personData = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/", (req, res) => {
  res.send("Hello World");
});

// app.get("/*", (req, res) => {
//   res.sendFile(path.join(__dirname, "build", "index.html"));
// });

app.get("/info", (req, res) => {
  const totalEntries = personData.length;
  const time = new Date();
  res.send(`Phonebook has info for ${totalEntries} people <br/> ${time}`);
});

// app.get("/api/person/:id", (req, res) => {
//   const id = Number(req.params.id);
//   const existPerson = personData.find((person) => person.id === id);
//   if (existPerson) {
//     res.json(existPerson);
//   } else {
//     res.status(404).end();
//   }
// });

// app.delete("/api/person/:id", (req, res) => {
//   const id = Number(req.params.id);
//   const newPersonData = personData.filter((person) => person.id !== id);
//   res.status(204).end();
// });

app.use("/api", personRoute);

//errorHandler must be the end of middleware
app.use(unknownEndpoint);
app.use(errorHandler);
const PORT = process.env.PORT || 3001;

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server is run on Port: ${PORT}`);
  });
};

startServer();
