$(document).ready(function(){
// declare global variables
// will contain the number of correct answers the user gets
var correctlyAnswered = 0;
// will contain the number of incorrect answers the user gets
var incorrectlyAnswered = 0;
// will contain the number of unanswered questions the user is left with due to a timeout
var unanswered = 0;
// prevents the clock from being sped up unnecessarily
var clockRunning = false;
// setInterval for every question
var setIntervalID;
// timer in between questions
var setTimeoutID;
// will contain the question, possible answers, correct answer & confirm message displayed
var questionAndAnswers = [
    {
    question: "In what town do The Simpsons live in?",
    possibleAnswers: ["Quahog", "Springfield", "Capital City", "Shelbyville"],
    correctAnswer: "Springfield",
    messageGif: "",
    },

    {   
    question: "What is Homer's middle name?",
    possibleAnswers: ["Jody", "Junior", "Jay", "John"],
    correctAnswer: "Jay",
    messageGif: "",
    },
];

function listAnswers(){
for (var i=0;i<=3;i++) {

    var displayedAnswers = $("<button>");

    displayedAnswers.addClass("btn btn-danger answer-choices");

    displayedAnswers.attr("data-name", questionAndAnswers[0].possibleAnswers[i]);

    displayedAnswers.text(questionAndAnswers[0].possibleAnswers[i]);

    $("#answers-placeholder").append("<ul>",displayedAnswers);
    
}
console.log(questionAndAnswers[0].correctAnswer);


};

function displayQandAs() {
    $("#question-placeholder").text(questionAndAnswers[0].question);
    listAnswers();
};

// will contain the timer for every question
var timer = {
    initialTime: 5,
    start: function(){
        setIntervalID = setInterval(this.count,1000);
        
    },

    count: function(){
        if(timer.initialTime===0){
            clearInterval(setIntervalID);
            alert("D'oh!")
        };
        console.log(timer.initialTime);
        $("#timer").text("Time Remaining: " + timer.initialTime-- + " Seconds");
    },

}; 

function startGame(){
    timer.start();
    displayQandAs();

};



function playGame(){
    var buttonValue = $(this).attr("data-name");
    console.log(buttonValue);
    if(buttonValue===questionAndAnswers[0].correctAnswer){
        alert("You are right!!!!");
    }

    else{
        alert("Try again!");
    }

};

$("#start-button").on("click", function(){
    startGame();
    $(this).hide();
});

$(document).on("click", ".answer-choices", playGame);

});