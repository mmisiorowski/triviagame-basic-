"use strict";

let questionIndex = 0;
let points = 0;
let displayChoices = [];
const questions = [];
const correctAns = [];
const incorrectAns = [];
const questionParent = document.querySelector("#question");
const optionList = document.querySelector("#optionList");
const url = "https://opentdb.com/api.php?amount=50&category=15&type=boolean";
const submitBtn = document.querySelector("#answer");
const playAgainBtn = document.querySelector("#pressplay");
const questionAmount = 19;


fetch(url)
  .then(response => response.json())
  .then(data => {

    data.results.map(trivia => questions.push(trivia.question));

    data.results.map(trivia => correctAns.push(trivia.correct_answer));

    data.results.map(trivia => incorrectAns.push(...trivia.incorrect_answers));
    setQuestion();
    setChoices();


    function setQuestion() {
      questionParent.innerHTML = `<h2>${questions[questionIndex]}</h2>`;
      return questionParent.innerHTML;
    }

    function setChoices() {
      return (optionList.innerHTML = `
      <li class="item">
      <input value="True" name="option" type="radio">
      <p>True</p>
      
      <li class="item">
      <input value="False" name="option" type="radio">
      <p>False</p>`);
    }

    function checkAns() {
      let choice = document.querySelector("input[name=option]:checked").value;
      if (choice === correctAns[questionIndex]) {
        questionIndex++;
        points++;
        setQuestion();
      } else {
        questionIndex++;
        points <= 0 ? (points = 0) : points--;
        setQuestion();
      }

      gameStatus();
    }


    function gameStatus() {
      if (questionIndex > questionAmount) {
        questionParent.innerHTML = "<h2>Game over</h2>";
        optionList.innerHTML = `<h3 class="score">Your Score is ${points}</h3>`;
        submitBtn.style.display = "none";
        playAgainBtn.style.display = "block";
      }
    }

//hidden text because every game needs an easter egg, duh

    function restartGame() {
      window.location.reload(true);
    }


    submitBtn.addEventListener("click", checkAns);
    playAgainBtn.addEventListener("click", restartGame);
  })