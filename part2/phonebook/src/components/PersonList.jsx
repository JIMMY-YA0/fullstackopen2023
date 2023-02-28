import React from "react";

const PersonList = ({ persons }) => {
  return (
    <>
      {persons.map((person) => (
        <div>
          {" "}
          <p key={person.name}>
            {person.name} {person.number} <button>Delete</button>
          </p>
        </div>
      ))}
    </>
  );
};

export default PersonList;
