import React from "react";

const Filter = ({ persons, searchTerm }) => {
  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <>
      {filteredPersons.length ? (
        filteredPersons.map((person) => (
          <p key={person.name}>
            {person.name} {person.number}
          </p>
        ))
      ) : (
        <p>Result Not Found</p>
      )}
    </>
  );
};

export default Filter;
