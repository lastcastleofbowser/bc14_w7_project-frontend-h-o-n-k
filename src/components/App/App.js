import "./App.css";
import correct from "../../Assets/correct.wav";
import incorrect from "../../Assets/incorrect.wav";
import React, { useState, useEffect } from "react";
import { questionDataJS, questionDataCSS } from "../../QuestionData";

function App() {
  const [categoryQ, setCategoryQ] = useState("Select a category!");
  const [categoryImg, setCategoryImg] = useState("");
  const [randomNumber, setRandomNumber] = useState(0);
  const [answer, setAnswer] = useState("");
  const [choices, setChoices] = useState([]);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState("");
  const [category, setCategory] = useState("");
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    const storedScore = localStorage.getItem("score");
    if (storedScore) {
      setScore(parseInt(storedScore));
    }
  }, []);

  function resetScore() {
    setScore(0);
    localStorage.setItem("score", 0);
  }
  function playsoundCorrect() {
    new Audio(correct).play();
  }

  function playsoundIncorrect() {
    new Audio(incorrect).play();
  }

  function randomiseNumber() {
    setRandomNumber(Math.floor(Math.random() * 10));
  }

  function nextQuestion() {
    let data;
    if (category === "CSS") {
      data = questionDataCSS[randomNumber];
    } else if (category === "JS") {
      data = questionDataJS[randomNumber];
    }
    randomiseNumber();
    setChoices([]);
    setMessage("");
    setClicked(false);
    setCategoryQ(data.question);
    setCategoryImg(data.image);
    setAnswer(data.answer);
    setChoices([data.choice1, data.choice2, data.choice3, data.choice4]);
  }

  function handleChoice(choice) {
    if (choice === answer) {
      setMessage("Well done! That is the correct answer!");
      setScore(score + 1);
      localStorage.setItem("score", score + 1);
      playsoundCorrect();
      setClicked(true);
      const image = document.getElementById("myImage"); // image is saved to local public folder

      image.src = "./coin.png"; // update the image source to reference the local file path
      image.classList.add("visible");
      image.classList.add("small");
      setTimeout(() => {
        image.classList.remove("visible"); // new function, found on w3
        image.classList.remove("small"); // have issues unless you remove this classlist
        image.src = "";
      }, 650);
    } else {
      setMessage(`Sorry, that's incorrect. The correct answer is ${answer}`);
      playsoundIncorrect();
      setClicked(true);
    }
  }

  function handleCategoryChange(event) {
    const value = event.target.value;
    setCategory(value);
    randomiseNumber();

    if (value === "CSS") {
      const data = questionDataCSS[randomNumber];
      setCategoryQ(data.question);
      setCategoryImg(data.image);
      setAnswer(data.answer);
      setChoices([data.choice1, data.choice2, data.choice3, data.choice4]);
      setMessage("");
      setClicked(false);
    } else if (value === "JS") {
      const data = questionDataJS[randomNumber];
      setCategoryQ(data.question);
      setCategoryImg(data.image);
      setAnswer(data.answer);
      setChoices([data.choice1, data.choice2, data.choice3, data.choice4]);
      setMessage("");
      setClicked(false);
    }
  }

  return (
    <>
      <select
        name="category"
        id="category"
        onChange={handleCategoryChange}
        className="drop-down"
      >
        <option value="" selected disabled>
          Select a category
        </option>
        <option value="HTML">HTML</option>
        <option value="CSS">CSS</option>
        <option value="JS">JS</option>
        <option value="React">React</option>
        <option value="API">API</option>
      </select>
      <div className="question-container">
        <h2 className="question">{categoryQ}</h2>
        {categoryImg && (
          <img
            src={categoryImg}
            onError={(event) => (event.target.style.display = "none")}
            alt="question"
          ></img>
        )}
      </div>
      <div className="button-container">
        {choices.map((choice, index) => (
          <button
            key={index}
            className="answer-option"
            onClick={() => handleChoice(choice)}
            disabled={clicked}
          >
            {choice}
          </button>
        ))}
      </div>
      {category && (
        <>
          <button className="next-qu-button" onClick={() => nextQuestion()}>
            Next Question
          </button>
          <h4> {message} </h4>
          <h4 className="score-container">Score: {score}</h4>
        </>
      )}
      <button className="reset-score-button" onClick={resetScore}></button>
    </>
  );
}

export default App;
