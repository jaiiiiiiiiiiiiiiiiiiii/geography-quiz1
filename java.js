const quizData = [
    {
        question: "What is the capital of Australia?",
        options: ["Sydney", "Melbourne", "Canberra"],
        answer: 2 // Correct answer is "Canberra"
    },
    {
        question: "Which is the largest desert in the world?",
        options: ["Sahara", "Antarctica", "Gobi"],
        answer: 1 // Correct answer is "Antarctica"
    },
    {
        question: "Which river runs through Egypt?",
        options: ["Amazon", "Ganges", "Nile"],
        answer: 2 // Correct answer is "Nile"
    },
    {
        question: "Which continent is known as the 'Land Down Under'?",
        options: ["South America", "Australia", "Asia"],
        answer: 1 // Correct answer is "Australia"
    },
    {
        question: "What is the largest country in South America?",
        options: ["Argentina", "Brazil", "Chile"],
        answer: 1 // Correct answer is "Brazil"
    },
    {
        question: "What is the tallest mountain in the world?",
        options: ["K2", "Mount Everest", "Kangchenjunga"],
        answer: 1 // Correct answer is "Mount Everest"
    },
    {
        question: "Which country has the most population?",
        options: ["USA", "India", "China"],
        answer: 2 // Correct answer is "China"
    }
];

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 30; // 30 seconds timer
let selectedQuestions = [];

// Utility function to shuffle an array
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function selectRandomQuestions() {
    // Shuffle the quiz data and select a subset of questions
    shuffle(quizData);
    selectedQuestions = quizData.slice(0, 5); // Pick the first 5 shuffled questions
}

function loadQuestion() {
    const currentQuestion = selectedQuestions[currentQuestionIndex];
    let shuffledOptions = [...currentQuestion.options];
    
    // Shuffle the options for the current question
    shuffle(shuffledOptions);

    // Display the question and options in the HTML
    const quizElement = document.getElementById("quiz");
    quizElement.innerHTML = `
        <p>${currentQuestion.question}</p>
        ${shuffledOptions.map((option) => `
            <label>
                <input type="radio" name="answer" value="${option}">
                ${option}
            </label>
        `).join('')}
    `;
}

function nextQuestion() {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    if (!selectedOption) {
        alert("Please select an answer.");
        return;
    }

    // Check if the selected option is correct based on the original data
    const currentQuestion = selectedQuestions[currentQuestionIndex];
    const originalCorrectAnswer = currentQuestion.options[currentQuestion.answer];
    
    if (selectedOption.value === originalCorrectAnswer) {
        score++;
    }
    
    currentQuestionIndex++;
    if (currentQuestionIndex < selectedQuestions.length) {
        loadQuestion();
    } else {
        submitQuiz();
    }
}

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    timeLeft = 30;
    
    // Select random questions for this session
    selectRandomQuestions();
    
    // Load the first question
    loadQuestion();
    
    // Start the timer
    startTimer();
}

function submitQuiz() {
    document.getElementById('score').innerText =` You scored ${score} out of ${selectedQuestions.length}`;
    document.getElementById('result').classList.remove('hidden');
    stopTimer();
}

function startTimer() {
    const timerInterval = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            document.getElementById('time').innerText = timeLeft;
        } else {
            clearInterval(timerInterval);
            submitQuiz();
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(startTimer);
}

function restartQuiz() {
    document.getElementById('result').classList.add('hidden');
    startQuiz();  // Start a new quiz session
}

window.onload = function () {
    startQuiz();  // Start the quiz when the page loads
};