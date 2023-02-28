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
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    personService.getAll().then((initialPerson) => {
      setPersons(initialPerson);
    });
  }, []);

  const serachInput = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <Search searchTerm={searchTerm} serachInput={serachInput} />
      <AddPerson persons={persons} setPersons={setPersons} />
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
