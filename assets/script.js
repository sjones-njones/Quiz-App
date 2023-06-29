const answerBtns = document.getElementById("answer-btns");
const questionText = document.getElementById("question-text");
const nextBtn = document.getElementById("next");
var currentQuestion = 0;
const startEl = document.getElementById("start");
var instructionsEl = document.getElementById("instructions");
var againEl = document.getElementById("again");
var initialsEl = document.querySelector("#initials");
var enterEl = document.getElementById("enter");
enterEl.style.display = "none";
initialsEl.style.display = "none";
let questionIndex = 0;
let score = 0;
let questions = [
  {
    question: "What is a positive ion called?",
    answer: [
      { text: "anion", correct: false },
      { text: "atom", correct: false },
      { text: "cation", correct: true },
      { text: "monatomic", correct: false },
    ]
  },
  {
    question: "An anion has lost a ____. This gives it a charge = to the number of ___ lost.",
    answer: [
      { text: "proton", correct: false },
      { text: "electron", correct: true },
      { text: "neutron", correct: false },
      { text: "quark", correct: false },
    ]
  },
  {
    question: "What is the atomic number of an atom equal to?",
    answer: [
      { text: "Number of electrons", correct: false },
      { text: "Number of protons", correct: true },
      { text: "Number of neutrons", correct: false },
      { text: "Number of all three combined", correct: false },
    ]
  },
  {
    question: "What does the nucleus of an atom consist of?",
    answer: [
      { text: "Protons", correct: false },
      { text: "Neutrons", correct: false },
      { text: "Protons and Electrons", correct: false },
      { text: "Protons and Neutrons", correct: true },
    ]
  }
];

questionText.style.display = "none";
answerBtns.style.display = "none";
secondsLeft = 90;
var timeEl = document.querySelector(".time");
startEl.addEventListener("click", function () {
  timeEl.textContent = "90 Seconds Left";
  var timerInterval = setInterval(function () {
    secondsLeft--;
    timeEl.textContent = secondsLeft + " Seconds Left";
    if (secondsLeft === 1) {
      timeEl.textContent = secondsLeft + " Second Left";
    }
    if (secondsLeft < 0 && currentQuestion < questions.length) {
      clearInterval(timerInterval);
      timeEl.style.display = "none";
      sendMessage();
    }
  }, 1000);
  instructionsEl.style.display = "none";
  questionIndex = 0;
  startEl.style.display = "none";
  nextBtn.style.display = "block";
  showQuestions();
});

function sendMessage() {
  var timeup = document.getElementById("timeup");
  timeup.style.display = "block";
  timeEl.style.display = "none";
  outOfTime();
}

function showQuestions() {
  answerBtns.innerHTML = "";
  questionText.style.display = "block";
  answerBtns.style.display = "block";
  let thisQuestion = questions[currentQuestion];
  questionText.innerHTML = thisQuestion.question;
  thisQuestion.answer.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add('btn');
    answerBtns.appendChild(button);

    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function selectAnswer(event) {
  const selectedBtn = event.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    var correct = document.getElementById("correct");
    correct.style.display = "block";
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
    var incorrect = document.getElementById("incorrect");
    incorrect.style.display = "block";
    secondsLeft -= 15;
    timeEl.textContent = secondsLeft + " Seconds Left";
  }

  Array.from(answerBtns.children).forEach(button => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  })
  nextBtn.style.display = "block";
}

function outOfTime() {
  nextBtn.style.display = "none";
  correct.style.display = "none";
  incorrect.style.display = "none";
  timeEl.style.display = "none";
  againEl.style.display = "none";
  answerBtns.style.display = "none";
  nextBtn.style.display = "none";
  enterEl.style.display = "none";
  initialsEl.style.display = "none";
  questionText.innerHTML = "Game Over!";
}

var finalScoreEl = document.getElementById("finalScore");
function showScore() {
  var percentEl = 100 * score / questions.length;
  questionText.innerHTML = "You scored " + score + " out of " + questions.length + " ! (" + percentEl + "%)";
  nextBtn.style.display = "none";
  correct.style.display = "none";
  incorrect.style.display = "none";
  timeEl.style.display = "none";
  againEl.style.display = "none";
  answerBtns.style.display = "none";
  nextBtn.style.display = "none";
  enterEl.style.display = "block";
  initialsEl.style.display = "block";
  finalScoreEl.style.display = "none";
}
var highestEl = document.getElementById("highest");
var finalScoreEl = document.getElementById("finalScore");

var highScoresListEl = document.getElementById("highScoresList");
var highscore = JSON.parse(localStorage.getItem("highscore")) || [];

initialsEl.addEventListener("keyup", () => {
  console.log(initialsEl.value);
  enterEl.disabled = !initialsEl.value;
});
enterEl.addEventListener("click", function (event) {
  event.preventDefault();
  var percentEl = (100 * score) / questions.length;
  var scoreName = {
    scores: percentEl,
    name: initialsEl.value,
  };
  highscore.push(scoreName);
  enterEl.style.display = "none";
  initialsEl.style.display = "none";
  againEl.style.display = "block";
  localStorage.setItem("highscore", JSON.stringify(highscore));
  highestEl.style.display = "block";
  mkListfor();
});

function mkListfor() {
  for (let i = 0; i < highscore.length; i++) {
    var listItem = document.createElement("li");
    console.log(highscore[i].scores);
    console.log(highscore[i].name);
    listItem.innerHTML = "Initials: " + highscore[i].name + "               &nbsp                 " + "Score: " + highscore[i].scores + "%";
    document.getElementById("highScoresList").appendChild(listItem);
  }
}

againEl.addEventListener("click", function () {
  nextBtn.style.display = "none";
  againEl.style.display = "none";
  location.reload();
});

function handleNextButton() {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestions();
  } else {
    showScore();
    timeup.style.display = "none";
  }
  correct.style.display = "none";
  incorrect.style.display = "none";
}

nextBtn.addEventListener("click", () => {
  if (questionIndex < questions.length) {
    handleNextButton();
  }
});
