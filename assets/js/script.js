const questionsLists= [
    {
        question: 'What is string?',
        answersArray: [
            { answer: 'zero or more characters written outside qutoes', correct: false},  
            { answer: 'zero or more characters written inside qutoes', correct: true },
            { answer: 'zero or more characters written outside bracket', correct: false },
            { answer: 'zero or more characters written outside bracket', correct: false }]
    },

    {// Updated 1/30/21
        question: 'How many speical variable can array hold ?',
        answersArray: [
            { answer: '1', correct: false }, 
            { answer: '2', correct: false },
            { answer: '3', correct: false },
            { answer: 'B and C ', correct: true }]
    },

    { // Updated 1/30/21
        question: 'how does Javascript functions are defined`?',
        answersArray: [
            { answer: 'FUN', correct: false },  
            { answer: 'FUNCT', correct: false },
            { answer: 'function', correct: true },
            { answer: 'none of the above', correct: false }]
    },

    {
        question: 'what number does Math.random returns?',
        answersArray: [
            { answer: '1 and 2)', correct: false }, 
            { answer: '0 and 1', correct: true },
            { answer: '2 and 3', correct: false },
            { answer: '3 and 4', correct: false }]
    },

    {
        question: 'Does math object has constructor?',
        answersArray: [
            { answer: 'Yes', correct: false},  
            { answer: 'No', correct: true },
            { answer: '+Soemtimes', correct: false },
            { answer: 'Most of the times', correct: false }]
    }

];

function questionLists() {
    let questionBankClone = questionsLists;
    return questionBankClone;
}
const questionEl = document.getElementById('question');
const answerOne = document.getElementById('1');
const answerTwo = document.getElementById('2');
const answerThree = document.getElementById('3');
const answerFour = document.getElementById('4');
const timerEl = document.getElementById('timer');
const finalScoreEl = document.getElementById('final');
const initialsEl = document.getElementById('initials');
const highScoresListEl = document.getElementById('highscore')
const questionBank = questionLists();

let secondsLeft = 120;
let curScore = 0;
let currentQuestion = -1;
let finalScore;

function Div(curr, next) {
    document.getElementById(curr).classList.add('hide');
    document.getElementById(next).removeAttribute('class')
};

function startGame() {
   Div('starter', 'questions');
    nextQuestion();
    startTimer();
};

function startTimer() {
    timerEl.textContent = secondsLeft;
    let timerInterval = setInterval(
        () => {
            secondsLeft--;
            timerEl.textContent = secondsLeft;
            if (secondsLeft <= 0) {
                clearInterval(timerInterval);
                end();
            }
        }, 1000);
};

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion === questionBank.length) {
        secondsLeft = 0;
        en();
    } else {
        questionEl.textContent = questionBank[currentQuestion].question;
        let arr = [answerOne, answerTwo, answerThree, answerFour];
        let i = 0;
        arr.forEach(element => {
            element.textContent = questionBank[currentQuestion].answersArray[i].answer;
            i++
        }, i);
    };
};

function handleAnswerClick(event) {
    let correctAnswer = getCorrectAnswer(currentQuestion);
    if (event.target.textContent === correctAnswer) {
        curScore += 10;
        event.target.classList.add('correct')
    } else {
        secondsLeft -= 10;
        event.target.classList.add('wrong')
    }
    setTimeout(
        () => {
            event.target.className = 'btn';
            nextQuestion();
        }, 500);
};

function getCorrectAnswer(currentQuestion) {
    let arr = questionBank[currentQuestion].answersArray;
    for (let j = 0; j < arr.length; j++) {
        if (arr[j].correct) {
            // return correct answer.
            return arr[j].answer
        }
    }
};

function end() {
    timerEl.textContent = 0;
    Div('questions', 'results');
    final = curScore;
    finalScoreEl.textContent = final;
}

 