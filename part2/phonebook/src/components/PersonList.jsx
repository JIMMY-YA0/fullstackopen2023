import React from "react";
import personService from "../services/persons";

const PersonList = ({ persons, setPersons }) => {
  const handleRemove = (person) => {
    const personID = person.id;
    const confirmRemove = window.confirm(
      `Are you sure you want to delete ${person.name} from the phonebook?`
    );
    if (confirmRemove) {
      personService.remove(personID).then((response) => {
        setPersons(persons.filter((person) => person.id !== personID));
        return response;
      });
    }
  };
  return (
    <>
      {persons.map((person) => (
        <div key={person.name}>
          <p>
            {person.name} {person.number}
            <button onClick={() => handleRemove(person)}>Delete</button>
          </p>
        </div>
      ))}
    </>
  );
};

export default PersonList;
