
const question=[
    {
        question:"which is the largest animal in the world?",
        answer:[
            { text:"shark",correct:false },
            { text:"Blue whale",correct:true },
            { text:"Elephant",correct:false },
            { text:"Giraffe",correct:false }
        ]
    },{
        question:"What is the capital of Australia?",
        answer:[
            { text:"Sydney",correct:false },
            { text:"Melbourne",correct:false },
            { text:" Canberra",correct:true },
            { text:"perth",correct:false }
        ]
    },{
        question:"What is the largest ocean in the world?",
        answer:[
            { text:"Atlantic Ocean",correct:false },
            { text:"Indian Ocean",correct:false},
            { text:"Arctic Ocean",correct:false },
            { text:"Pacific Ocean",correct:true }
        ]
    },{
        question:"Which planet is known as the 'Red Planet'?",
        answer:[
            { text:"Venus",correct:false },
            { text:" Mars",correct:true },
            { text:"Jupiter",correct:false },
            { text:"saturn",correct:false }
        ]
    }
];

let questionElement=document.getElementById("question")
const answerButtons=document.getElementById("answer-button")
const nextButton=document.getElementById("next-btn")

let currentQuestionIndex=0;
let score=0;

function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML="Next"
    showQuestion()
}
function showQuestion(){
    resetState();
  let currentQuestion=question[currentQuestionIndex];
  let questionNo=currentQuestionIndex+1
  questionElement.innerHTML=questionNo+". " +currentQuestion.question

  currentQuestion.answer.forEach(answer=>{

    const button=document.createElement("button");
    button.innerHTML=answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button)

    if(answer.correct){
        button.dataset.correct=answer.correct;
    }
   button.addEventListener("click", selectAnswer)

  })
}

function resetState(){
    nextButton.style.display="none"
    while(answerButtons.firstChild){
     answerButtons.removeChild(answerButtons.firstChild)
    }

}

function selectAnswer(e){
    const selectedBtn=e.target;
    const isCorrect=selectedBtn.dataset.correct==="true";

    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button=>{
        if(button.dataset.correct==="true"){
            button.classList.add("correct");
        }
        button.disabled=true;
    });
    nextButton.style.display="block";
}
 function showScore(){
    resetState();
    questionElement.innerHTML=`you scored  ${score} out of ${question.length}!`;
    nextButton.innerHTML="Play Again"
    nextButton.style.display="block";
 }


function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex <question.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex <question.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})
startQuiz();