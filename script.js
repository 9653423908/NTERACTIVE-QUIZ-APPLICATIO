const questions = [
    {
        question: "What is the capital of France?",
        answers: [
            { text: "Berlin", correct: false },
            { text: "Madrid", correct: false },
            { text: "Paris", correct: true },
            { text: "Rome", correct: false }
        ]
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: [
            { text: "Earth", correct: false },
            { text: "Mars", correct: true },
            { text: "Jupiter", correct: false },
            { text: "Venus", correct: false }
        ]
    },
    {
        question: "What is 3+ 3?",
        answers: [
            { text: "3", correct: false},
            { text: "4", correct: false },
            { text: "5", correct: false },
            { text: "6", correct:  true }
        ]
    },
    {
        question: "When did india get independence?",
        answers: [
            { text: "1879", correct: false},
            { text: "1945", correct: false },
            { text: "1947", correct:  true },
            { text: "1765", correct:  false }
        ]
    },
    {
        question: "Which dish can be made in 2 minutes?",
        answers: [
            { text: "Dosa", correct: false},
            { text: "Maggie", correct: true},
            { text: "pizza", correct: false },
            { text: "milk", correct:  false }
        ]
    },
    {
      question: "what is the largest planet in our solar system?",
      answers:[
        { text:"pacific", correct:false},
        { text:"France", correct:false},
        { text:"Paris", correct:false},
        { text:"Jupiter", correct:true},
      ]
      },
    {
        question: "What is the largest ocean on Earth?",
        answers: [
            { text: "Atlantic Ocean", correct: false },
            { text: "Indian Ocean", correct: false },
            { text: "Arctic Ocean", correct: false },
            { text: "Pacific Ocean", correct: true }
        ]
    }
];

const questionDisplay = document.getElementById('question-display');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-button');
const feedbackDisplay = document.getElementById('feedback');
const scoreDisplay = document.getElementById('score-display');
const playAgainButton = document.getElementById('play-again-button');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    nextButton.style.display = "block";
    playAgainButton.style.display = "none";
    scoreDisplay.style.display = "none";
    feedbackDisplay.innerHTML = "";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionDisplay.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    feedbackDisplay.innerHTML = "";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    if (isCorrect) {
        selectedBtn.classList.add("correct");
        feedbackDisplay.innerHTML = "Correct!";
        feedbackDisplay.classList.remove("incorrect-feedback");
        feedbackDisplay.classList.add("correct-feedback");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
        feedbackDisplay.innerHTML = "Incorrect!";
        feedbackDisplay.classList.remove("correct-feedback");
        feedbackDisplay.classList.add("incorrect-feedback");
    }

    // Disable all answer buttons after selection
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct"); // Show the correct answer
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionDisplay.innerHTML = `You scored ${score} out of ${questions.length}!`;
    scoreDisplay.innerHTML = `Your final score: ${score}/${questions.length}`;
    scoreDisplay.style.display = "block";
    nextButton.style.display = "none";
    playAgainButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz(); // If quiz is over, clicking next will restart
    }
});

playAgainButton.addEventListener("click", startQuiz);

startQuiz();