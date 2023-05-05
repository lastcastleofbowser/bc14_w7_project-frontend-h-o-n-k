/*
Plan:
- Create a component that will display the score
- If user answer is correct score +1
- How is the score going to be stored? 
- Display the score on the page 
- Keep track of level
- If score is === or < then level up
*/

import React, { useState } from "react";

function Score() {
    const [score, setScore] = useState(0)

  function updateScore(isCorrect) {
    if (isCorrect) {
      setScore(score + 1);
    }
  }

  return (
    <div>
      <h4>Score: {score}</h4>
    </div>
  );
}

export default Score;

// switch 
// case 1:
//     if score < 5
//     setLevel(2)
//     break;

