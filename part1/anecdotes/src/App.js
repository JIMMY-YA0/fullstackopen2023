import { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients",
  ];
  const points = Array(7).fill(0);

  const [selected, setSelected] = useState(0);
  const [vote, setVote] = useState(points);
  const randomNumber = () => setSelected(Math.floor(Math.random() * anecdotes.length));
  const voteHandler = () => {
    const copy = [...vote];
    copy[selected] += 1;
    setVote(copy);
  };

  const getMaxVotes = () => {
    const maxVotes = Math.max(...vote);
    const idx = vote.indexOf(maxVotes);
    return idx;
  };
  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <br />
      has {vote[selected]} votes
      <br />
      <button onClick={() => voteHandler()}>vote</button>
      <button onClick={() => randomNumber()}>next anecdote</button>
      <h1>Anecdote with most votes</h1>
      {anecdotes[getMaxVotes()]}
      <br />
      has {vote[getMaxVotes()]} votes
    </div>
  );
};

export default App;
