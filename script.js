const questions = [
  {
    question: "Which language is using for Styling?",
    answers: [
      { text: "HTML", correct: false },
      { text: "JS", correct: false },
      { text: "JSX", correct: false },
      { text: "CSS", correct: true },
    ],
  },
  {
    question: "HTML files are saved by default with the extension?",
    answers: [
      { text: ".html", correct: true },
      { text: ".ht", correct: false },
      { text: ".net", correct: false },
      { text: "None of the above", correct: false },
    ],
  },
  {
    question: "How to display preformatted text in HTML?",
    answers: [
      { text: "&lt;p&gt;", correct: false },
      { text: "&lt;pre&gt;", correct: true },
      { text: "&lt;br&gt;", correct: false },
      { text: "&lt;hr&gt;", correct: false },
    ],
  },
  {
    question:
      "Which attribute is used to provide a unique name to an HTML element?",
    answers: [
      { text: "id", correct: true },
      { text: "class", correct: false },
      { text: "type", correct: false },
      { text: "title", correct: false },
    ],
  },
  {
    question:
      "Which of the following is the correct syntax for using the HTML style attribute?",
    answers: [
      { text: '&lt;tagname style = "property : value;" &gt;', correct: true },
      { text: '&lt;tagname style = "property ;"&gt;', correct: false },
      { text: "&lt;tagname style&gt;", correct: false },
      { text: '&lt;tagname src="style.css"&gt;', correct: false },
    ],
  },
  {
    question: "What is the correct syntax to write an HTML comment?",
    answers: [
      { text: "/* Comment */", correct: false },
      { text: "//Comment", correct: false },
      { text: "&lt;!-- Comment --&gt;", correct: true },
      { text: "#Comment", correct: false },
    ],
  },
  {
    question: "Javascript is an _______ language?",
    answers: [
      { text: "Object-Based", correct: false },
      { text: "Object Oriented", correct: true },
      { text: "Procedural", correct: false },
      { text: "Library", correct: false },
    ],
  },
  {
    question:
      "Which function is used to serialize an object into a JSON string in Javascript?",
    answers: [
      { text: "convert()", correct: false },
      { text: "parse()", correct: false },
      { text: "stringify()", correct: true },
      { text: "None of the Above", correct: false },
    ],
  },
  {
    question: "How to stop an interval timer in Javascript?",
    answers: [
      { text: "clearInterval", correct: true },
      { text: "clearTimer", correct: false },
      { text: "intervalOver", correct: false },
      { text: "None of the above", correct: false },
    ],
  },
  {
    question: "Which of the following are not server-side Javascript objects?",
    answers: [
      { text: "Date", correct: false },
      { text: "FileUpload", correct: false },
      { text: "Function", correct: false },
      { text: "All of the Above", correct: true },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-button");
const nextButton = document.getElementById("next");
const final = document.getElementById("final");

let currentQIndex = 0;
let score = 0;

function startQuiz() {
  final.style="display:none;";
  currentQIndex = 0;
  score = 0;
  document.getElementById("previous").style="display:inline";
  nextButton.innerHTML = "Next";
  nextButton.style="display:inline;margin:0;";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQIndex];
  let questionNo = currentQIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButton.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  while (answerButton.firstChild) {
    answerButton.removeChild(answerButton.firstChild);
  }
}

function selectAnswer(e) { 
  const seletionBtn = e.target;
  const isCorrect = seletionBtn.dataset.correct === "true";
  if (isCorrect) {
    seletionBtn.classList.add("correct");
    score++;
  } else {
    seletionBtn.classList.add("incorrect");
  }
  Array.from(answerButton.children).forEach(button => {
    if(button.dataset.correct==="true"){
        button.classList.add("correct");
    }
    button.display=true;
  });
  nextButton.style.display="block";
}

function showScore(){
    resetState();
    questionElement.innerHTML =`Your Score is ${score} out of ${questions.length}`
    if(score>localStorage.getItem("score")){
        localStorage.setItem("score", score);
        final.style="display:block";
       final.innerHTML = "Congrats.... You Got a High Score..!";
    } else {
        final.style="display:block";
        final.innerHTML = "Try Again <br> High Score is " + localStorage.getItem("score");
    }
    nextButton.style="display:block;margin: 20px auto 0";
    document.getElementById("previous").style="display:none";
    nextButton.innerHTML='Play Again';
}

function handleNextButton(){
    currentQIndex++;
    if(currentQIndex<questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

function Previous(){
    if(currentQIndex>0){
        currentQIndex--;
    }
    if(currentQIndex<questions.length && currentQIndex>=0){
        showQuestion();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
})

startQuiz();
