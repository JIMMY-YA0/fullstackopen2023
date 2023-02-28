import { useState } from "react";
import Search from "./components/Search";
import AddPerson from "./components/AddPerson";
import Filter from "./components/Filter";
import PersonList from "./components/PersonList";
import { useEffect } from "react";
import personService from "./services/persons";

// import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    personService.getAll().then((initialPerson) => {
      setPersons(initialPerson);
    });
  }, [persons]);

  const submitHandler = (event) => {
    event.preventDefault();
    if (persons.some((person) => person.name === newName.trim())) {
      alert(`${newName} is already added to phonbook`);
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      };
      personService
        .create(personObject)
        .then((returnedPerson) => setPersons(persons.concat(returnedPerson)));
      setNewName("");
    }
  };
  const nameInput = (event) => {
    setNewName(event.target.value);
  };
  const numberInput = (event) => {
    setNewNumber(event.target.value);
  };
  const serachInput = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <Search searchTerm={searchTerm} serachInput={serachInput} />
      <AddPerson
        submitHandler={submitHandler}
        newName={newName}
        nameInput={nameInput}
        newNumber={newNumber}
        numberInput={numberInput}
      />

      <h2>Numbers</h2>
      {searchTerm ? (
        <Filter persons={persons} searchTerm={searchTerm} />
      ) : (
        <PersonList persons={persons} setPersons={setPersons} />
      )}
    </div>
  );
};

export default App;
