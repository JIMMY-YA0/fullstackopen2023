import React from "react";

const Search = ({ searchTerm, serachInput }) => {
  return (
    <>
      <h2>Phonebook</h2>
      <div>
        filter shown with
        <input value={searchTerm} onChange={serachInput} />
      </div>
    </>
  );
};

export default Search;
