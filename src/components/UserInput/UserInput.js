import { useState } from "react";

const UserInput = (props) => {
  //using only one bigger state instead of multiple state slices
  const initialUserInput = {
    "current-savings": 10000,
    "yearly-contribution": 1200,
    "expected-return": 7,
    duration: 10,
  };

  const [userInput, setuserInput] = useState(initialUserInput);
  const submitHandler = (event) => {
    event.preventDefault();

    props.onCalculate(userInput);
  };

  const resetHandler = () => {
    setuserInput(initialUserInput);
  };

  // call the setUserInput whenever inputChangeHandler is called because there we want to update the states
  //and store the latest enetered value in the object

  const inputChangeHandler = (input, value) => {
    // we want to use the old values that we are not changing ...and so for that we pass a function to state updating function
    //this function automatically receives the latest state values(previous)
    setuserInput((prevInput) => {
      return {
        ...prevInput,
        [input]: value,
      };
    });
  };

  return (
    <form className="form" onSubmit={submitHandler}>
      <div className="input-group">
        <p>
          <label htmlFor="current-savings">Current Savings ($)</label>
          <input
            type="number"
            onChange={(event) =>
              inputChangeHandler("current-savings", event.target.value)
            }
            value={userInput['current-savings']}
            id="current-savings"
          />
        </p>
        <p>
          <label htmlFor="yearly-contribution">Yearly Savings ($)</label>
          <input
            type="number"
            onChange={(event) =>
              inputChangeHandler("yearly-contribution", event.target.value)
            }
            value={userInput['yearly-contribution']}
            id="yearly-contribution"
          />
        </p>
      </div>
      <div className="input-group">
        <p>
          <label htmlFor="expected-return">
            Expected Interest (%, per year)
          </label>
          <input
            type="number"
            onChange={(event) =>
              inputChangeHandler("expected-return", event.target.value)
            }
            value={userInput['expected-return']}
            id="expected-return"
          />
        </p>
        <p>
          <label htmlFor="duration">Investment Duration (years)</label>
          <input
            type="number"
            onChange={(event) =>
              inputChangeHandler("duration", event.target.value)
            }
            id="duration"
            value={userInput.duration}
          />
        </p>
      </div>
      <p className="actions">
        <button type="reset" className="buttonAlt" onClick={resetHandler}>
          Reset
        </button>
        <button type="submit" className="button">
          Calculate
        </button>
      </p>
    </form>
  );
};

export default UserInput;
