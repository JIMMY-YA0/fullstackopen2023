import React from "react";
import personService from "../services/persons";

const PersonList = ({ persons, setPersons }) => {
  console.log("id", persons);
  const handleRemove = (person) => {
    const personID = person._id;
    const confirmRemove = window.confirm(
      `Are you sure you want to delete ${person.name} from the phonebook?`
    );
    if (confirmRemove) {
      personService
        .remove(personID)
        .then((response) => {
          setPersons(persons.filter((person) => person._id !== personID));
          return response.data;
        })
        .catch((error) => console.log(error));
    }
  };
  return (
    <>
      {persons.map((person) => (
        <div key={person._id}>
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
