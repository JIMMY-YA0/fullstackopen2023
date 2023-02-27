import { useState } from "react";
import Search from "./components/Search";
import AddPerson from "./components/AddPerson";
import Filter from "./components/Filter";
import PersonList from "./components/PersonList";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const submitHandler = (event) => {
    event.preventDefault();
    if (persons.some((person) => person.name === newName.trim())) {
      alert(`${newName} is already added to phonbook`);
    } else {
      setPersons([...persons, { name: newName, number: newNumber }]);
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
        <PersonList persons={persons} />
      )}
    </div>
  );
};

export default App;
