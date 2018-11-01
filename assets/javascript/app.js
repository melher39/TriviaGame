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
];

function ask() {
    $("#question-placeholder").text(questionAndAnswers[0].question);
};

ask();

// will contain the timer for every question
var timer = {
    initialTime: 5,
    start: function(){
            setIntervalID = setInterval(this.count,1000);
        
    },

    count: function(){
        if(timer.initialTime===0){
            clearInterval(setIntervalID);
        };
        console.log(timer.initialTime);
        $("#timer").html("Time Remaining: " + timer.initialTime-- + " Seconds");
    },

}; 

timer.start();




});