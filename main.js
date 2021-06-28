const problemElement=document.querySelector(".problem")
const ourForm=document.querySelector(".our-form")
const ourField=document.querySelector(".our-field")
const pointsNeeded=document.querySelector(".points-needed")
const mistakesAllowed=document.querySelector(".mistakes-allowed")
const progressBar=document.querySelector('.progress-inner')
const endMessage=document.querySelector(".end-message")
const resetButton=document.querySelector(".reset-btn")

let state={
    score:0,
    wrongAnswers:0
}
resetButton.addEventListener("click",resetGame)
function updateProblem() {
    state.currentProblem=generateProblem();
    problemElement.innerHTML=`${state.currentProblem.num1} ${state.currentProblem.operator} ${state.currentProblem.num2}`
    ourField.value=""
    ourField.focus()
}
updateProblem();
function generateNumer(max){
    return Math.floor(Math.random()*(max+1));
}

function generateProblem() {
    return {
        num1:generateNumer(10),
        num2:generateNumer(10),
        operator:['+','-','*'][generateNumer(2)]
    };
}
ourForm.addEventListener("submit",handleSubmit);
function handleSubmit(e){
e.preventDefault()
let correctAnswer;
const p=state.currentProblem;
if(p.operator=='+')correctAnswer=p.num1+p.num2
if(p.operator=='-')correctAnswer=p.num1-p.num2
if(p.operator=='*')correctAnswer=p.num1*p.num2
if (parseInt(ourField.value,10)===correctAnswer) {
    state.score++
    pointsNeeded.textContent=10-state.score
    problemElement.classList.add("animate-correct")
    setTimeout(()=>problemElement.classList.remove("animate-correct"),331)
    updateProblem()
    progressBar.style.transform=`scaleX(${state.score/10})`
} else {
    state.wrongAnswers++;
    mistakesAllowed.textContent=2-state.wrongAnswers
    problemElement.classList.add("animate-wrong")
    setTimeout(()=>problemElement.classList.remove("animate-wrong"),331)
    updateProblem()
}
checkLogic()
}
function checkLogic() {
    if(state.score===10){
        endMessage.textContent="congrats! You Won"
        document.body.classList.add("overlay-is-open")

        setTimeout(()=>resetButton.focus(),331)
    }
    if(state.wrongAnswers===3){
        endMessage.textContent="Sorry! You lost"
        document.body.classList.add("overlay-is-open")
    }
}
checkLogic()
function resetGame(){
updateProblem()
document.body.classList.remove("overlay-is-open")
state.score=0
state.wrongAnswers=0
pointsNeeded.textContent=10
mistakesAllowed.textContent=2
progressBar.style.transform=`scaleX(0)`
}