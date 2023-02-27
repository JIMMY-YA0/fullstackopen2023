import React from "react";

const AddPerson = ({ submitHandler, newName, nameInput, newNumber, numberInput }) => {
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
