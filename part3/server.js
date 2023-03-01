const express = require("express");
const app = express();

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

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is run on Port: ${PORT}`);
});
