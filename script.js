const questions = [
    {
        question: "Which component is used to compile, debug and execute Java program?",
        answers: [
            { text: "JRE", correct: false },
            { text: "JIT", correct: false },
            { text: "JDK", correct: true },
            { text: "JVM", correct: false }
        ]
    },
    {
        question: "What is the extension of compiled Java classes?",
        answers: [
            { text: ".txt", correct: false },
            { text: ".class", correct: true },
            { text: ".java", correct: false },
            { text: ".js", correct: false }
        ]
    },
    {
        question: "Which of these is not a feature of OOP in Java?",
        answers: [
            { text: "Pointers", correct: true },
            { text: "Inheritance", correct: false },
            { text: "Polymorphism", correct: false },
            { text: "Encapsulation", correct: false }
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const scoreCard = document.getElementById("score-card");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    scoreCard.classList.add("hide");
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        if(answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    nextButton.classList.add("hide");
    while(answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("wrong");
    }
    Array.from(answerButtonsElement.children).forEach(button => {
        if(button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.classList.remove("hide");
}

function showScore() {
    resetState();
    questionElement.innerHTML = "Quiz Completed!";
    scoreCard.innerHTML = `Your Score: ${score} out of ${questions.length}!`;
    scoreCard.classList.remove("hide");
    nextButton.innerHTML = "Play Again";
    nextButton.classList.remove("hide");
}

function handleNextButton() {
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length) {
        showQuestion();
    } else if (nextButton.innerHTML === "Play Again") {
        startQuiz();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    handleNextButton();
});

startQuiz();
