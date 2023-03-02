import React, { useState } from "react";
import personService from "../services/persons";

const AddPerson = ({ persons, setPersons, setMessage }) => {
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
        personService
          .update(existPerson._id, newObject)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person._id !== existPerson._id ? person : returnedPerson.data
              )
            );
          })
          .catch((error) => {
            setMessage(`${existPerson.name} has already been removed from phonbook.`);
          });
        setMessage(`${newObject.name}'s phone number: ${newObject.number} has been updated.`);
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      }
    } else {
      //create
      const personObject = {
        name: newName,
        number: newNumber,
      };
      personService
        .create(personObject)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson.data));
        })
        .catch((error) => setMessage("Failed to create"));
      setNewName("");
      setNewNumber("");
      setMessage(`${personObject.name} with number: ${personObject.number} has been added.`);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
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
