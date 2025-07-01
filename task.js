const questions = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "Paris", correct: true },
      { text: "Berlin", correct: false },
      { text: "Madrid", correct: false },
      { text: "Lisbon", correct: false }
    ]
  },
  {
    question: "Who wrote 'Hamlet'?",
    answers: [
      { text: "Charles Dickens", correct: false },
      { text: "William Shakespeare", correct: true },
      { text: "Leo Tolstoy", correct: false },
      { text: "Mark Twain", correct: false }
    ]
  },
  {
    question: "What is 2 + 2?",
    answers: [
      { text: "3", correct: false },
      { text: "4", correct: true },
      { text: "5", correct: false },
      { text: "22", correct: false }
    ]
  }
];

const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const scoreContainer = document.getElementById('score-container');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerText = 'Next';
  scoreContainer.innerHTML = '';
  showQuestion();
}

function showQuestion() {
  resetState();
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.innerText = currentQuestion.question;
  currentQuestion.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('btn');
    button.addEventListener('click', () => selectAnswer(answer, button));
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  nextButton.style.display = 'none';
  answerButtonsElement.innerHTML = '';
}

function selectAnswer(answer, button) {
  const isCorrect = answer.correct;
  if (isCorrect) {
    score++;
    button.classList.add('correct');
  } else {
    button.classList.add('wrong');
  }

  Array.from(answerButtonsElement.children).forEach(btn => {
    btn.disabled = true;
    if (btn.innerText === questions[currentQuestionIndex].answers.find(a => a.correct).text) {
      btn.classList.add('correct');
    }
  });

  nextButton.style.display = 'block';
}

nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
});

function showScore() {
  resetState();
  questionElement.innerText = 'Quiz Completed!';
  scoreContainer.innerHTML = `<h2>Your Score: ${score} / ${questions.length}</h2>`;
  nextButton.innerText = 'Restart';
  nextButton.style.display = 'block';
  nextButton.onclick = startQuiz;
}

startQuiz();
