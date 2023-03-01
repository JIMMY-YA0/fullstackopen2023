const express = require("express");
const morgan = require("morgan");
const app = express();

app.use(express.json());

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

app.get("/api/person", (req, res) => {
  res.json(personData);
});

app.get("/info", (req, res) => {
  const totalEntries = personData.length;
  const time = new Date();
  res.send(`Phonebook has info for ${totalEntries} people <br/> ${time}`);
});

app.get("/api/person/:id", (req, res) => {
  const id = Number(req.params.id);
  const existPerson = personData.find((person) => person.id === id);
  if (existPerson) {
    res.json(existPerson);
  } else {
    res.status(404).end();
  }
});

app.delete("/api/person/:id", (req, res) => {
  const id = Number(req.params.id);
  const newPersonData = personData.filter((person) => person.id !== id);
  res.status(204).end();
});

const generatedId = () => {
  return Math.floor(Math.random() * 30000);
};

app.post("/api/person", (req, res) => {
  const body = req.body;

  const existName = personData.find(
    (person) => person.name.toLowerCase() === body.name.trim().toLowerCase()
  );
  if (!body.name || !body.number) {
    return res.status(400).json({ error: "The name or number is missing" });
  } else if (existName) {
    return res.status(400).json({ error: "Name must be unique" });
  }

  const newPerson = {
    id: generatedId(),
    name: body.name,
    number: body.number,
  };

  persons = personData.concat(newPerson);
  res.json(persons);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is run on Port: ${PORT}`);
});
