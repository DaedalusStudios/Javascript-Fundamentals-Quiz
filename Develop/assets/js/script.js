var timerspan = document.querySelector("#timerspan");
var contentDiv = document.querySelector("#content");
var timer = 100;
var wrongAnswerPenalty = 5;


//I started the interval already.  Why?  So we don't have to clear the interval for any reason.
//Since I'm pausing and resetting the timer, just having this tick shouldn't do any harm.
setInterval(() => {
    tickTimer();
}, 1000);

//I'm going to make a pausable timer so I can animate the screen without using the available time
function ToggleTimer() {
    //grab the timer element
    console.log("Timer toggled");
    if(timerspan.getAttribute("data-state")=="started") {
        timerspan.setAttribute("data-state", "paused");
    } else if(timerspan.getAttribute("data-state")=="paused") { 
        timerspan.setAttribute("data-state", "started");
    }
}

//Dev Button Start the timer
var a = document.querySelector("#start").addEventListener("click", function(e) {
    console.log("Timer Started");
    e.preventDefault;
    ClearContent();
    ResetTimer(); //resets in the event that this is the end-game button
    GetQuestion();
    timerspan.setAttribute("data-state","started");
});


//This does the tick, if the state is not paused the clock is ticking
function tickTimer() {
    if(timerspan.getAttribute("data-state")!="paused") {
        timer--;
        timerspan.textContent = timer;
        if(timer<=0) {
            timer = 0;
            timerspan.textContent = timer;
            timerspan.setAttribute("data-state","paused");
            GameOver();
        }
    }

}

//Start over
function ResetTimer() {
    timer = 100;
    timerspan.textContent = timer;
    timerspan.setAttribute("data-state", "paused");
}

//End the game
function GameOver() {}

//get a new question
function GetQuestion() {
    var qnaLength = qna.length;
    var randomQuestion = Math.floor(Math.random() * qnaLength);
    var questionAsArray = qna.splice(randomQuestion,1);
    DisplayQuestion(questionAsArray); //I wanted to do a return here and assign the content to the div but I failed to use this correctly
}


function DisplayQuestion(questionAsArray) {
    //Since I've spliced the array, I have to double-tap it.  Maybe try to fix this later?
    var question = document.createElement("h3");
    question.innerHTML=questionAsArray["0"]["0"];
    var answersUl = document.createElement("ul");
    for(i=1; i<5; i++){
        var answer=document.createElement("li");
        answer.setAttribute("data-question", i);
        answer.setAttribute("data-correctAnswer",questionAsArray["0"]["5"]);
        answer.innerHTML=questionAsArray["0"][i];
        answer.addEventListener("click",function(e) {
            e.stopPropagation;
            if(e.target.getAttribute("data-question")===e.target.getAttribute("data-correctanswer")) {
                CorrectAnswer();
            }
            else {
                WrongAnswer(e);
            }
        })
        answersUl.appendChild(answer);
    };
        contentDiv.appendChild(question);
        contentDiv.appendChild(answersUl);
        

}

//clearContent
function ClearContent() {
    console.log("Content div cleared");
    contentDiv.innerHTML="";
}

//show high scores
function ShowScores() {}

//add score to localstore
function AddScore() {}

//CorrectAnswer!
function CorrectAnswer() {
    if(timerspan.getAttribute("data-state")!="paused") {
        ClearContent();
        GetQuestion();
    }
}

//remove time from Timer
function WrongAnswer(e) {
    if(timerspan.getAttribute("data-state")!="paused") {
        timer = timer - wrongAnswerPenalty;
        if(timer<=0) {
            timer = 0;
        }
        timerspan.textContent = timer;
        e.target.style.textDecoration  = "line-through";
        e.target.removeEventListener("click");
    }
}




///Data for questions.  I've decided to use a nested array of 50 questions. Source: https://www.interviewbit.com/javascript-mcq/
var qna = [
    ["Javascript is an _____ Language?","Object-Oriented","Object-Based","Procedural","None of the Above",1],
    ["Which of the following keywords is used to define a variable in Javascript?","var","let","var and let","dim",3],
    ["Which of the following methods is used to access HTML elements using Javascript?","getElementbyId()","getElementsByClassName()","Both A and B","None of the Above",3],
    ["Upon encountering empty statements, what does the Javascript Interpreter do?","Throws an Error","Ignores the Statements","Gives a warning","None of the Above",2],
    ["Which of the following methods can be used to display data in some form using Javascript?","document.write()","console.log()","window.alert()","All of the Above",4],
    ["How can a datatype be declared to be a constant type?","const","var","let","constant",1],
    ["When the switch statement matches the expression with the given labels, how is the comparison done?","Both the datatype and the result of the expression are compared","Only the datatype of the expression is compared","Only the value of the expression is compared","None of the Above",1],
    ["What keyword is used to check whether a given property is valid or not?","in","is in","exists","lies",1],
    ["What is the use of the <noscript> tag in Javascript?","The contents are disaplyed by non-JS-based browsers","Clears all the cookies and cache","Both A and B","None of the above", 1],
    ["When an operator’s value is NULL, the typeof returned by the unary operator is:","Boolean","Undefined","Object","Integer", 3],
    ["What does the Javascript “debugger” statement do?","It will debug all the errors in the program at runtime","It acts as a breakpoint in a program","It will debut error in the current statement if any","All of the Above",2],
    ["What is the output of the following code snippet?<br/><pre>print(NaN === NaN)</pre>","true","false","undefined","error",2],
    ["What will be the output of the following code snippet?<br/><pre>print(typeof(NaN));</pre>","Object","Number","String","None of the above",2],
    ["What does the ‘toLocateString()’ method do in JS?","Returns a localized object representation","Returns a parsed string","Returns a localized stringrepresentation of an object","None of the above",3],
    ["The process in which an object or data structure is translated into a format suitable for transferral over a network, or storage is called?","Object Serialization","Object Encapsulation","Object Inheritance","None of the above",1],
    ["Which function is used to serialize an object into a JSON string in Javascript?","stringify()","parse()","convert()","None of the above",1],
    ["The 3 basic object attributes in Javascript are:","Class, prototype, objects' parameters","Class, prototype, object's extensible flag","Class, parameters, object's extensible flag","Classes, Native object, and Interfaces and Object's extensible flag", 2],
    ["What will be the output of the following code snippet?<pre>let sum = 0;<br/>const a = [1, 2, 3];<br/>a.forEach(getSum);<br/>print(sum);<br/>function getSum(ele) {<br/> sum += ele;<br/>}","6","1","2","None of the above",1],
    ["What will be the output of the following code snippet?<br/><pre>a = [1, 2, 3, 4, 5];<br/>print(a.slice(2, 4));</pre>","3,4","2,3","3,4,5","2,3,4",1],
    ["What will be the output of the following code snippet?<br/><pre>print(parseInt('123Hello'));<br/>print(parseInt('Hello123'));</pre>","123 NaN","123Hello Hello123","NaN Nan","123 123", 1],
    ["Which of the following are closures in Javascript?","Variables","Functions","Objects","All of the above",4],
    ["Which of the following is not a Javascript framework?","Node","Vue","React","Cassandra",4],
    ["What will be the output of the following code snippet?<pre>var a = 'hello';<br/>var sum = 0;<br/>for(var i = 0; i < a.length; i++) {<br/>   sum += (a[i] - 'a');<br/>}<br/>print(sum);<br/></pre>","47","NaN","0","None of the above",2],
    ["What keyword is used to declare an asynchronous function in Javascript?","async","await","setTimeout","None of the above", 1],
    ["How to stop an interval timer in Javascript?","clearInterval","clearTimer","intervalOver","None of the above",1],
    ["How are objects compared when they are checked with the strict equality operator?","The contents of the objects are compared","Their references are compared","Both A and B","None of the above", 2],
    ["What does ... operator do in JS?","It's used to spread iterables to individual elements","It is used to describe a datatype of undefined size","No such operator exists","None of the above",1 ],
    ["How do we write a comment in javascript?","/**/","//","#","$ $",2],
    ["Which object in Javascript doesn’t have a prototype?","Base Object","All objects have a prototype","None of the object have a prototype","None of the above",1],
    ["Which of the following are not server-side Javascript objects?","Date","FileUpload","Function","All of the above",4]
]