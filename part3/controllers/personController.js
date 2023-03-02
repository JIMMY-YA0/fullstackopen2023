const Person = require("../models/personModel");

// GET all People data
const getAllPerson = async (req, res) => {
  try {
    const person = await Person.find(
      {},
      {
        __v: 0,
      }
    );
    res.status(200).json({
      status: "success",
      data: person,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

//GET person by ID
const getOnePerson = async (req, res) => {
  const id = req.params.id;
  try {
    //The second argument is an optional projection object that specifies which fields to include or exclude from the query results. In this case, the _id and __v fields are being excluded from the results.
    const person = await Person.findById(id, {
      _id: 0,
      __v: 0,
    });
    if (person) {
      res.status(200).json({
        status: "success",
        data: person,
      });
    } else {
      res.status(404).json({ error: "Person Not Found" });
    }
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

//ADD new person info
const addNewPerson = async (req, res) => {
  const { name, number } = req.body;
  try {
    const newPerson = await Person.create({
      name,
      number,
    });
    res.status(201).json({
      status: "success",
      data: newPerson,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//DELETE a person info
const deletePerson = async (req, res) => {
  const id = req.params.id;
  try {
    const person = await Person.findByIdAndRemove(id);
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

//Update person's info
const updatePerson = async (req, res) => {
  const id = req.params.id;
  try {
    // new: If true, return the modified document rather than the original. Defaults to false.
    const person = await Person.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({
      status: "success",
      data: person,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

module.exports = { getAllPerson, getOnePerson, addNewPerson, deletePerson, updatePerson };
