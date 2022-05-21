
let que_no_ele = document.getElementById("question-number");
let que_txt_ele = document.getElementById("question-txt");
let opt1_ele = document.getElementById("option1");
let opt2_ele = document.getElementById("option2");
let opt3_ele = document.getElementById("option3");
let opt4_ele = document.getElementById("option4");
let nxt_btn = document.getElementById("nxt-btn");
let time_ele = document.getElementById("timer");

let que_no = 0;
let score = 0;
let intervalId;
const total_time = 10;
let time_left = total_time;


function displayScore(){
    que_no = 0;
    localStorage.setItem("score",score);
    location.href = "./scorePage.html";
}


// function to show que and opt
function showQuestion(){
    time_left = total_time;
    clearInterval(intervalId);
    timer();
    intervalId = setInterval(timer,1000);

    if(que_no >= quizDB.length) displayScore();

    //uncheck all option
    document.querySelectorAll("input[name = opt]").forEach(option => option.checked=false);

    que_no_ele.innerHTML = (que_no + 1) + ".";
    que_txt_ele.innerHTML = quizDB[que_no].question;
    opt1_ele.innerHTML = quizDB[que_no].opt1;
    opt2_ele.innerHTML = quizDB[que_no].opt2;
    opt3_ele.innerHTML = quizDB[que_no].opt3;
    opt4_ele.innerHTML = quizDB[que_no].opt4;
}

//handle timer
function timer(){
    time_ele.innerHTML = time_left;
    time_left--;

    if(time_left == 0){
        que_no++;
        showQuestion();
    }
}

function checkIfScore(){
    let option_selected = document.querySelector("input[name = opt]:checked");

    if(option_selected != null){
        let option_correct = quizDB[que_no].correct;
        if(option_selected.id == option_correct)    score++;
    }
}

// Handling event listener on next button
nxt_btn.addEventListener('click',()=>{
    checkIfScore();

    que_no++;

    if(que_no >= quizDB.length)     displayScore();
    else                            showQuestion();     //next question
       
});

let quizDB = [];
const URL = 'questions.json';

async function getData(){
    const response = await fetch(URL);
    const data = await response.json();
    quizDB = data;

    //console.log(quizDB);

    showQuestion();
}

getData();