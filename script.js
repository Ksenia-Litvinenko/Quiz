document.addEventListener('DOMContentLoaded', () => {

    const questions = [
    {
        question: "Який тег використовується для створення гіперпосилання в HTML?",
        answers: ["<link>", "<a>", "<href>", "<url>"],
        correct: 1
    },
    {
        question: "Який тег відповідає за створення маркованого (неоднорідного) списку?",
        answers: ["<ol>", "<ul>", "<li>", "<list>"],
        correct: 1
    },
    {
        question: "Яка властивість CSS використовується для зміни фонового кольору елемента?",
        answers: ["color", "bg-color", "background-color", "fill"],
        correct: 2
    },
    {
        question: "Який селектор в CSS використовується для вибору елемента за його унікальним id?",
        answers: [".", "#", "*", "id:"],
        correct: 1
    },
    {
        question: "Як правильно вивести повідомлення в консоль за допомогою JavaScript?",
        answers: ["print()", "window.print()", "log.console()", "console.log()"],
        correct: 3
    },
    {
        question: "Який оператор у JavaScript виконує суворе порівняння (значення і типу даних)?",
        answers: ["==", "=", "!=", "==="],
        correct: 3
    },
    {
        question: "Який метод у JavaScript використовується для пошуку першого елемента за селектором?",
        answers: ["getElementById()", "querySelector()", "querySelectorAll()", "getElementsByClassName()"],
        correct: 1
    },
    {
        question: "Який тип даних у JavaScript повертає логічне значення (true або false)?",
        answers: ["String", "Number", "Boolean", "Undefined"],
        correct: 2
    }
];
    const startScreen = document.querySelector('#start-screen');
    const quizScreen = document.querySelector('#quiz-screen');
    const resultScreen = document.querySelector('#result-screen');
    const startBtn = document.querySelector('#start-btn');
    const restartBtn = document.querySelector('#restart-btn');
    const resultText = document.querySelector('.result-text');
    const questionText = document.querySelector('#question-text');
    const answersContainer = document.querySelector('#answers-container');
    const timerDisplay = document.querySelector('#timer');
    const scoreDisplay = document.querySelector('#score-display'); // Елемент для відображення балів

    let questionIndex = 0;
    let score = 0;
    let timer = 30;
    let interval;

    
    function showQuestion(question) {
        clearInterval(interval);
        startTimer();

        answersContainer.innerHTML = '';
        questionText.innerText = question.question;
        for (let i = 0; i < question.answers.length; i++) {
            const button = document.createElement('button');
            button.innerText = question.answers[i];
            button.classList.add('answer-btn');
            button.addEventListener('click', () => checkAnswer(button, i));
            answersContainer.appendChild(button);
        }
    }

    function nextQuestion() {
        questionIndex++;
        if (questionIndex < questions.length) {
            showQuestion(questions[questionIndex]);
        } else {
            showResult();
        }
    }

    
    function checkAnswer(button, i) {
        clearInterval(interval); 
        const currentQuestion = questions[questionIndex];
        const allButtons = answersContainer.querySelectorAll('.answer-btn');

        if (i == currentQuestion.correct) {
            score += 10; 
            button.classList.add('correct');
        } else {
            button.classList.add('wrong');
           
            allButtons[currentQuestion.correct].classList.add('correct');
        }

        
        scoreDisplay.innerText = `Бали: ${score}`;

        
        allButtons.forEach(btn => {
            btn.disabled = true;
        });

        
        setTimeout(nextQuestion, 1200);
    }

    // Відображення результату і статистики
    function showResult() {
        const maxScore = questions.length * 10;
        const accuracy = Math.round((score / maxScore) * 100);
        resultText.innerText = `Твій результат: ${score} з ${maxScore} балів (${accuracy}%)`;
        
        quizScreen.classList.add('hide');
        resultScreen.classList.remove('hide');
    }

    // Керування екранами (Старт)
    function startGame() {
        startScreen.classList.add('hide');
        resultScreen.classList.add('hide');
        quizScreen.classList.remove('hide');
        
        questionIndex = 0;
        score = 0;
        scoreDisplay.innerText = `Бали: ${score}`; // Скидаємо бали на старті
        showQuestion(questions[questionIndex]);
    }

    startBtn.addEventListener('click', startGame);

    // Таймер
    function startTimer() {
        timer = 15;
        timerDisplay.innerText = `Час: ${timer}`;
        interval = setInterval(() => {
            timer--;
            timerDisplay.innerText = `Час: ${timer}`;
            if (timer <= 0) {
                clearInterval(interval);
                
                // Якщо час вийшов, автоматично підсвічуємо правильну відповідь і йдемо далі
                const currentQuestion = questions[questionIndex];
                const allButtons = answersContainer.querySelectorAll('.answer-btn');
                allButtons[currentQuestion.correct].classList.add('correct');
                
                allButtons.forEach(btn => btn.disabled = true);
                
                setTimeout(nextQuestion, 1200);
            }
        }, 1000);
    }

    restartBtn.addEventListener('click', () => {
        startGame();
        resultScreen.classList.add('hide');
    });

});