import React, { useState } from "react";
import personService from "../services/persons";
const AddPerson = ({ persons, setPersons }) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const submitHandler = (event) => {
    event.preventDefault();
    const existPerson = persons.find(
      (person) => person.name.toLocaleLowerCase() === newName.trim().toLocaleLowerCase()
    );

    const newObject = { ...existPerson, number: newNumber };
    if (existPerson) {
      const confirmReplace = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );
      if (confirmReplace) {
        personService.update(existPerson.id, newObject).then((returnedPerson) => {
          setPersons(
            persons.map((person) => (person.id !== existPerson.id ? person : returnedPerson))
          );
        });
      }
    } else {
      //create
      const personObject = {
        name: newName,
        number: newNumber,
      };
      personService
        .create(personObject)
        .then((returnedPerson) => setPersons(persons.concat(returnedPerson)));
      setNewName("");
      setNewNumber("");
    }
  };

  const nameInput = (event) => {
    setNewName(event.target.value);
  };
  const numberInput = (event) => {
    setNewNumber(event.target.value);
  };
  return (
    <>
      <h2>Add new</h2>
      <form onSubmit={submitHandler}>
        <div>
          name: <input value={newName} onChange={nameInput} />
        </div>

        <div>
          number: <input value={newNumber} onChange={numberInput} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  );
};

export default AddPerson;
