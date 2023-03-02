import { useState } from "react";
import Search from "./components/Search";
import AddPerson from "./components/AddPerson";
import Filter from "./components/Filter";
import PersonList from "./components/PersonList";
import { useEffect } from "react";
import personService from "./services/persons";
import Notification from "./components/Notification";

// import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState(null);

  const hook = () => {
    personService.getAll().then((initialPerson) => {
      setPersons(initialPerson.data);
    });
  };

  useEffect(hook, []);

  const serachInput = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <Notification message={message} />
      <Search searchTerm={searchTerm} serachInput={serachInput} />
      <AddPerson persons={persons} setPersons={setPersons} setMessage={setMessage} />
      <h1>Numbers</h1>
      {searchTerm ? (
        <Filter persons={persons} searchTerm={searchTerm} />
      ) : (
        <PersonList persons={persons} setPersons={setPersons} setMessage={setMessage} />
      )}
    </div>
  );
};

export default App;
