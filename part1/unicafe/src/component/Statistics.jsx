import React from "react";
import StatisticLine from "./StatisticLine";

const Statistics = ({ good, neutral, bad }) => {
  return (
    <>
      <h1>statistics</h1>
      {good || neutral || bad ? (
        <div>
          <table>
            <tbody>
              <StatisticLine text={"good"} value={good} />
              <StatisticLine text={"neutral"} value={neutral} />
              <StatisticLine text={"bad"} value={bad} />
              <StatisticLine text={"all"} value={good + neutral + bad} />
              <StatisticLine
                text={"average"}
                value={(good * 1 + bad * -1) / (good + neutral + bad)}
              />
              <StatisticLine
                text={"positive"}
                value={(good / (good + neutral + bad)) * 100 + " %"}
              />
            </tbody>
          </table>
        </div>
      ) : (
        <p>No feedback given</p>
      )}
    </>
  );
};

export default Statistics;
