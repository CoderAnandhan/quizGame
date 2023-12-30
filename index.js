const questions = [
    {
        question : "Which is largest animal in the World?",
        answers : [
            { text: "Akshaya", correct :true},
            { text: "Blue Whale", correct :false},
            { text: "Kutty Yanai", correct :false},
            { text: "Giraffe", correct :false}
        ]
    },
    {
        question : "Which is nick name of akshaya?",
        answers : [
            { text: "Malamadu", correct :false},
            { text: "kutty Yanai", correct :false},
            { text: "Ashuuu", correct : true},
            { text: "Giraffe", correct :false}
        ]
    },
    {
        question : "Which is the smallest country in the world?",
        answers : [
            { text: "Vatican City", correct :true},
            { text: "Bhutan", correct :false},
            { text: "Nepal", correct :false},
            { text: "Sri Lanka", correct :false}
        ]
    },
    {
        question : "Which is largest Desert in the World?",
        answers : [
            { text: "kalahari", correct :false},
            { text: "Gopi", correct :true},
            { text: "sahara", correct :false},
            { text: "Antarctica", correct :true}
        ]
    },
    
]


const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-button");
const nextButton = document.getElementById("next-btn");

let currentQuestionsIndex = 0;
let score =0;

function startQuiz(){
    currentQuestionsIndex=0;
    score=0;
    nextButton.innerHTML="Next";
    showQuestion();
}

function  showQuestion(){

    resetState();
    let currentQuestion= questions[currentQuestionsIndex];
    let qestionNo= currentQuestionsIndex +1;
    questionElement.innerHTML = qestionNo+ ". "+ currentQuestion.question;

    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);

        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer)
    })

}

function resetState(){
    nextButton.style.display="none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }

}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct ==="true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;

    }else{
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;  
    });
    nextButton.style.display="block";  
}

function showScore(){
    resetState();
    questionElement.innerHTML= `You scored ${score} out of ${questions.length}!`; 
    nextButton.innerHTML="Play Again";
    nextButton.style.display="block";
}

function handleNextButton(){
    currentQuestionsIndex++
    if(currentQuestionsIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}



nextButton.addEventListener("click", () =>{
    if(currentQuestionsIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz(); 
    }
})

startQuiz();