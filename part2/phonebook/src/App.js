import { useState } from "react";
import Search from "./components/Search";
import AddPerson from "./components/AddPerson";
import Filter from "./components/Filter";
import PersonList from "./components/PersonList";
import { useEffect } from "react";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => setPersons(response.data));
  }, []);

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
