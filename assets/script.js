const answerBtns = document.getElementById("answer-btns");
const questionText = document.getElementById("question-text");
const nextBtn= document.getElementById("next");
var currentQuestion = 0;
const startEl = document.getElementById("start");
var instructionsEl = document.getElementById("instructions");
var againEl = document.getElementById("again");

let questionIndex = 0;
let score = 0;

let questions = [
  {
    question: "What is a positive ion called?",
    answer: [
      {text: "anion", correct: false},
      {text: "atom", correct: false},
      {text: "cation", correct: true},
      {text: "monatomic", correct: false},
    ]},
  {
    question: "An anion has lost a ____. This gives it a charge = to the number of ___ lost.",
    answer: [
      {text: "proton", correct: false},
      {text: "electron", correct: true},
      {text: "neutron", correct: false},
      {text: "quark", correct: false},
]},
  {
    question: "What is the atomic number of an atom equal to?",
    answer: [
      {text: "Number of electrons", correct: false},
      {text: "Number of protons", correct: true},
      {text: "Number of neutrons", correct: false},
      {text: "Number of all three combined", correct: false},
]},
{
  question: "What does the nucleus of an atom consist of?",
  answer: [
    {text: "Protons", correct: false},
    {text: "Neutrons", correct: false},
    {text: "Protons and Electrons", correct: false},
    {text: "Protons and Neutrons", correct: true},
]}
];

questionText.style.display = "none";
answerBtns.style.display = "none";
secondsLeft = 90;
var timeEl = document.querySelector(".time");
// function addListenerStart () {
  startEl.addEventListener("click", function() {
    timeEl.textContent = "90 Seconds Left";
    var timerInterval = setInterval (function () {
      secondsLeft --;
      timeEl.textContent = secondsLeft + " Seconds Left";
      if (secondsLeft === 1) {
        timeEl.textContent = secondsLeft + " Second Left";
      }
      if(secondsLeft < 0 && currentQuestion < questions.length) {
        clearInterval(timerInterval);
        questionText.innerHTML = "Game Over!";
        // timeup.style.display = "block";
  timeEl.style.display = "none";
  //  showScore()
        sendMessage();
      }
    }, 1000);
    instructionsEl.style.display = "none";
  questionIndex = 0;
  score = 0;
  startEl.style.display = "none";
  nextBtn.style.display = "block";
  showQuestions();
});

function sendMessage() {
  var timeup = document.getElementById("timeup");
  timeup.style.display = "block";
  timeEl.style.display = "none";
  showScore()
}

function showQuestions(){
  answerBtns.innerHTML="";
  questionText.style.display = "block";
  answerBtns.style.display = "block";
    let thisQuestion = questions[currentQuestion];
  questionText.innerHTML = thisQuestion.question;
  // questionText.setAttribute("display", "block");
  

  thisQuestion.answer.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add('btn');
    answerBtns.appendChild(button);
    
  // answerBtns.setAttribute("display", "block");
if(answer.correct){
  button.dataset.correct = answer.correct;
}
button.addEventListener("click", selectAnswer);
});
}

againEl.addEventListener("click", function(){
  nextBtn.style.display = "none";
  againEl.style.display = "none";
  location.reload();
  });


function selectAnswer(event) {
  const selectedBtn = event.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if(isCorrect){
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
  // isIncorrect(event);
}

Array.from(answerBtns.children).forEach(button => {
  if(button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  })
  nextBtn.style.display = "block";
  
}


function showScore(){
  questionText.innerHTML = "You scored " + score + " out of " + questions.length + " !";
  nextBtn.style.display = "none";
  correct.style.display = "none";
  incorrect.style.display = "none";
  timeEl.style.display = "none";
  againEl.style.display = "block";
  answerBtns.style.display = "none";
  nextBtn.style.display = "none";
  
}


function handleNextButton() {
  currentQuestion++;
  if(currentQuestion < questions.length){
    showQuestions();
  } else {
    showScore();
    clearInterval(timerInterval);
    timeup.style.display = "none";
  }
  correct.style.display = "none";
  incorrect.style.display = "none";
}

nextBtn.addEventListener("click", ()=> {
  if(questionIndex < questions.length){
    handleNextButton();
  } else{
    // addListenerStart();
  }
});


















// if(thisQuestion < questions.length && secondsLeft >0) {
//   clearInterval(timerInterval);
//   showScore();
// }
// function isIncorrect(event){
  // const selectedBtn = event.target;
  // const isIncorrect = selectedBtn.dataset.correct === "false";
  // clearInterval(timerInterval);
// secondsLeftIncorrect = secondsLeft;
// var timerIntervalIncorrect = setInterval (function () {
 
  // secondsLeftIncorrect --;
//   if(secondsLeft === 0) {
//     clearInterval(timerIntervalIncorrect);
//     sendMessage();
//   }
//   if(currentQuestion < questions.length && secondsLeft >0) {
//     clearInterval(timerIntervalIncorrect);
//     showScore();
//   }
// //  }, 1000);
// }
    // resetState();
    // nextBtn.innerHTML = "Play Again";
    
    // function resetState(event){
    //   // event.preventDefault();
    // //  nextBtn.addEventListener('click', function() {
    //   // location.reload();
    
    //   while(answerBtns.firstChild){
    //     answerBtns.removeChild(answerBtns.firstChild);
    //       }
    // }
    // function startQuiz() {
    //   questionIndex = 0;
    // score = 0;
    // nextBtn.innerHTML = "Next";
    // showQuestions();}
    // function startQuiz() {
    //   questionIndex = 0;
    // score = 0;
    //   // nextBtn.innerHTML = "Next";
    //   // showQuestions();}
    // nextBtn.addEventListener("click", ()=> {
      //   if(questionIndex < questions.length){
        //     currentQuestion++;
        //         showQuestions();
        //   } else{
          //     showScore();
          //       // addListenerStart();
          //     }
          // });
          

  // if(currentQuestion < questions.length){
    //  } else {
      //   }
  // }
  // addListenerStart();
// for (var i = 0; i<currentQuestion.answer.length; i++){

  
  
  // }};






//     nextQuestion();








// // need eventlistener on start button
// // need setinterval for timer
// // need function to grade questions, if question is correct, then next question, if question is incorrect,  then next question and minus 15 seconds from the timer
// // need to use local storage to store scores between questions and then get the total and store high scores
// // how do I make the screens change, meaning press start, then that button goes away and the 1st question appears...


// // html toggle diplay none and block