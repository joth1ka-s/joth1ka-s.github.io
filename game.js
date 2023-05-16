const question= document.getElementById("question");
const choices=Array.from(document.getElementsByClassName("choice-text"));
//console.log(choices);
const progressText= document.getElementById("progressText");
const scoreText= document.getElementById("score");
const progressBarFull= document.getElementById("progressBarFull");
const loader= document.getElementById("loader");
const game= document.getElementById("game");

let currentQuestion={};
let acceptingAnswers= true;
let score=0;
let questionCounter=0;
let availableQuestions=[];

let questions= [
    {
        question:" Who is the father of Artificial Intelligence?",
        choice1:"Geoffrey Hinton",
        choice2:"Andrew Ng",
        choice3:"John McCarthy",
        choice4:"Jürgen Schmidhuber",
        answer: 3
    },
    {
        question:"Which of the given language is commonly used for AI?",
        choice1:"Java",
        choice2:"PHP",
        choice3:"Python",
        choice4:"Perl",
        answer: 3
    },
    {
        question:"Which AI technique enables the computers to understand the associations and relationships between objects and events?",
        choice1:"Heuristic Processing",
        choice2:"Cognitive Science",
        choice3:"Relative Symbolism",
        choice4:"Pattern Matching",
        answer: 4
    },
    {
        question:"Which of the following search method takes less memory space?",
        choice1:"Depth First Search",
        choice2:"Breadth First Search",
        choice3:"Linear Search",
        choice4:"Optimal Search",
        answer: 1
    },
    {
        question:"If a machine can change its course of action based on the external environment on its own, the machine is called?",
        choice1:"Mobile",
        choice2:"Intelligent",
        choice3:"Both A & B",
        choice4:"None",
        answer: 2
    },
    {
        question:"The process of breaking an image into parts is called?",
        choice1:"Segmentation",
        choice2:"Processing",
        choice3:"Smoothing",
        choice4:"Break down",
        answer: 1
    },
    {
        question:"For external action selection, which element is used in the agent?",
        choice1:"Perceive",
        choice2:"Actuator",
        choice3:"Performance",
        choice4:"None of the above",
        answer: 3
    },
    {
        question:"Exploratory Learning is another name for?",
        choice1:"Supervised learning",
        choice2:"Unsupervised learning",
        choice3:"Reinforced learning",
        choice4:"None of the above",
        answer: 2
    },
    {
        question:"Which of the following are valid Machine Learning algorithms?",
        choice1:"Naive bayes",
        choice2:"K Means Clustering",
        choice3:"Linear regression",
        choice4:"All of the above",
        answer: 4
    },
    {
        question:"Machines that try to imitate human intuition while handling vague information lie in the field of AI called?",
        choice1:"Functional logic",
        choice2:"Fuzzy logic",
        choice3:"Boolean logic",
        choice4:"Human logic",
        answer: 2
    },
    {
        question:"What is the work of Task Environment and Rational Agents?",
        choice1:"Problem and solution",
        choice2:"Solution and problem",
        choice3:"Observation and problem",
        choice4:"Observation and solution",
        answer: 1
    },
    {
        question:"‘The Imitation Game’ was the original name of?",
        choice1:"Turing test",
        choice2:"LISP",
        choice3:"The halting problem",
        choice4:"None of the above",
        answer: 1
    },
    {
        question:"Which of the following symbols in AI are logical symbols?",
        choice1:"BACON",
        choice2:"SIMP",
        choice3:"STUDENT",
        choice4:"HOPE",
        answer: 3
    },
    {
        question:"Which of the following symbols in AI are logical symbols?",
        choice1:"Conjuction",
        choice2:"Negation",
        choice3:"Implication",
        choice4:"All of the above",
        answer: 4
    },
    {
        question:"Which of the following is not an application of artificial intelligence?",
        choice1:"Computer vision",
        choice2:"Natural language processing",
        choice3:"Database management system",
        choice4:"Digital assistants",
        answer: 3
    }
];

const correct_bonus=10;
const max_questions=15;

startGame  = () => {
    questionCounter=0;
    score=0;
    availableQuestions=[...questions];
    //console.log(availableQuestions);
    getNextQuestion();
    game.classList.remove("hidden");
    loader.classList.add("hidden");
};

getNextQuestion  = () => {
    if(availableQuestions.length == 0 || questionCounter >= max_questions){
        localStorage.setItem("mostRecentScore", score);
        //end page
        return window.location.assign("/end.html");
    }
    
    questionCounter++;
    progressText.innerText= `Question ${questionCounter}/ ${max_questions}`;
    progressBarFull.style.width= `${(questionCounter/ max_questions) *100}%`;

    const questionIndex= Math.floor(Math.random() * availableQuestions.length);    
    currentQuestion = availableQuestions[questionIndex];
    question.innerText= currentQuestion.question;
    
    choices.forEach(choice =>{
        const number=choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];
    });

    availableQuestions.splice(questionIndex, 1);
    //console.log(availableQuestions);
    acceptingAnswers = true; 
    
};

choices.forEach(choice=> {
    choice.addEventListener("click", e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];      
        
        
        const classToApply = 
            selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
        
        if(classToApply=="correct"){
            incrementScore(correct_bonus);
        }
        selectedChoice.parentElement.classList.add(classToApply);
        
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNextQuestion();
        }, 1000);
    });
});

incrementScore = num => {
    score +=num;
    scoreText.innerText = score;
}

startGame();