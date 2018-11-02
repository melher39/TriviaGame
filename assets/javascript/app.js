$(document).ready(function(){
// declare global variables
// will contain the number of correct answers the user gets
var correctlyAnswered = 0;
// will contain the number of incorrect answers the user gets
var incorrectlyAnswered = 0;
// will contain the number of unanswered questions the user is left with due to a timeout
var unanswered = 0;
// will keep track of what question the user is on
var questionCounter = 0;
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

    {   
    question: "In what year did the show make its official debut?",
    possibleAnswers: ["1988", "1989", "1990", "1991"],
    correctAnswer: "1989",
    messageGif: "",
    },

    {   
    question: "Chief Wiggum is the local police klutz. What is his first name?",
    possibleAnswers: ["Jerry", "Chief", "Larry", "Clancy"],
    correctAnswer: "Clancy",
    messageGif: "",
    }
];

function listAnswers(){
for (var i=0;i<=3;i++) {

    var displayedAnswers = $("<button>");

    displayedAnswers.addClass("btn btn-danger answer-choices");

    displayedAnswers.attr("data-name", questionAndAnswers[questionCounter].possibleAnswers[i]);

    displayedAnswers.text(questionAndAnswers[questionCounter].possibleAnswers[i]);

    $("#answers-placeholder").append("<ul>",displayedAnswers);
    
}
console.log(questionAndAnswers[questionCounter].correctAnswer);


};

function displayQandAs(questionCounter) {
    $("#question-placeholder").text(questionAndAnswers[questionCounter].question);

    listAnswers();
};

function bridgeMessage(){
    var message = "This is the answer foo!<br>"+ questionAndAnswers[questionCounter].correctAnswer ;
    $("#answers-placeholder").html(message);
    setTimeoutID = setTimeout(nextQuestion,3000);
};

// will contain the timer for the entirety of the game
var timer = {
    initialTime: 5,
    start: function(){
        setIntervalID = setInterval(this.count,1000);
        
    },

    count: function(){
        if(timer.initialTime===0){
            bridgeMessage();
            clearInterval(setIntervalID);
            unanswered++;
            alert("D'oh!")
        };
        console.log(timer.initialTime);
        $("#timer").text("Time Remaining: " + timer.initialTime-- + " Seconds");
    },

    // bridge: function(){
    //     setTimeoutID = setTimeout()
    // }

}; 

function startGame(){
    correctlyAnswered = 0;
    incorrectlyAnswered = 0;
    unanswered = 0;
    questionCounter = 0;
    timer.start();
    displayQandAs(0);
    // clearTimeout(setIntervalID);

};

function nextQuestion(){
    timer.initialTime=5;
    timer.start();
    displayQandAs(questionCounter);

}



function playGame(){
    var buttonValue = $(this).attr("data-name");
    console.log(buttonValue);
    if(buttonValue===questionAndAnswers[questionCounter].correctAnswer){
        bridgeMessage();
        clearInterval(setIntervalID);
        alert("You are right!!!!");
        correctlyAnswered++;
        questionCounter++;
        

    }

    else{
        bridgeMessage();
        clearInterval(setIntervalID);
        alert("Try again!");
        incorrectlyAnswered++;
        questionCounter++;
    }

    console.log("correct"+ correctlyAnswered);
    console.log("incorrect"+ incorrectlyAnswered);
    console.log("blank"+ unanswered);

};

$("#start-button").on("click", function(){
    startGame();
    $(this).hide();
});



$(document).on("click", ".answer-choices", playGame);

});