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
// message that will be displayed on the result screen according to the user's answer selection
var resultMessage;
// prevents the clock from being sped up unnecessarily
// var clockRunning = false;
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
    messageGif: ""
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
    },

    {   
    question: "Mr. Burns, the town's pseudo-evil millionaire, has a popular catchphrase. What is it?",
    possibleAnswers: ["D'oh!", "Ay caramba!", "Maginificent...", "Excellent..."],
    correctAnswer: "Excellent...",
    messageGif: "",
    },

    {   
    question: "Bart Simpson's voice is played by a woman. Is this...",
    possibleAnswers: ["True", "False"],
    correctAnswer: "True",
    messageGif: "",
    },

    {   
    question: "What is Lisa's musical instrument of choice?",
    possibleAnswers: ["Triangle", "Saxaphone", "Flute", "Harmonica"],
    correctAnswer: "Saxaphone",
    messageGif: "",
    },

    {   
    question: "What is Homer Simpson's annoying next door neighbor's name?",
    possibleAnswers: ["Ned Flanders", "Ted Flanders", "Red Flanders", "Stupid Flanders"],
    correctAnswer: "Ned Flanders",
    messageGif: "",
    },
    {
    question: "Fill in the blank. 'Mmmmmm ________.'",
    possibleAnswers: ["Peanuts", "Candy", "Donuts", "Sweet Apple Pie"],
    correctAnswer: "Donuts",
    messageGif: "",
    },

    {
    question: "IF YOU GET THIS, YOU'RE A TRUE FAN! <br> Maggie Simpson's arch-nemesis is:",
    possibleAnswers: ["Stewie Griffin", "Gerald Samson", "Milhouse Van Houten", "Harold Samson", "Barney Gumble"],
    correctAnswer: "Gerald Samson",
    messageGif: "",
    }
];

// will contain the timer for the entirety of the game
var timer = {
    initialTime: 5,
    start: function(){
        setIntervalID = setInterval(this.count,1000);
        
    },

    count: function(){
        if(timer.initialTime===0){
            resultMessage = "Ay Caramba! You Ran Out Of Time!<br> The Correct Answer Was: " + questionAndAnswers[questionCounter].correctAnswer;
            bridgeMessage();
            clearInterval(setIntervalID);
            unanswered++;
            questionCounter++;
            // alert("D'oh!")
        };
        console.log(timer.initialTime);
        $("#timer").text("Time Remaining: " + timer.initialTime-- + " Seconds");
    },

    stop: function(){
        this.initialTime = 5;
        clearTimeout(setTimeoutID);
        clearInterval(setIntervalID);
    }
};

function listAnswers(){
for (var i=0;i<questionAndAnswers[questionCounter].possibleAnswers.length;i++) {
    
    var displayedAnswers = $("<button>");

    displayedAnswers.addClass("btn btn-danger answer-choices");

    displayedAnswers.attr("data-name", questionAndAnswers[questionCounter].possibleAnswers[i]);

    displayedAnswers.text(questionAndAnswers[questionCounter].possibleAnswers[i]);

    $("#answers-placeholder").append("<ul>",displayedAnswers);
    
}
console.log(questionAndAnswers[questionCounter].correctAnswer);


};

function displayQandAs(questionCounter) {
    $("#question-placeholder").html(questionAndAnswers[questionCounter].question);
    listAnswers();
};

function endGame(){
    timer.stop();
    alert("I'm here!!!!");

    var restartGame = $("<button>");

    restartGame.addClass("btn btn-success restart-button");
    restartGame.text("Start Over");

    $("#timer").empty();

    $("#question-placeholder").html("Correct: " + correctlyAnswered + "<br>Incorrent: " + incorrectlyAnswered + "<br>Unanswered: " + unanswered);

    $("#answers-placeholder").html(restartGame);

    $(".restart-button").on("click", function(){
        startGame();
        $(this).hide();
    });
    
};

function nextQuestion(){
    timer.initialTime=5;
    timer.start();
    $("#answers-placeholder").empty();
    displayQandAs(questionCounter);
};


function bridgeMessage(){

    if (questionCounter===questionAndAnswers.length-1){
        // var message = "This is the answer foo!<br>"+ questionAndAnswers[questionCounter].correctAnswer ;
        $("#answers-placeholder").html(resultMessage);
        setTimeoutID = setTimeout(endGame,3000);

    }

    else if(questionCounter<questionAndAnswers.length){
        // var message = "This is the answer foo!<br>"+ questionAndAnswers[questionCounter].correctAnswer ;
        $("#answers-placeholder").html(resultMessage);
        setTimeoutID = setTimeout(nextQuestion,3000);

    }
};


function startGame(){
    correctlyAnswered = 0;
    incorrectlyAnswered = 0;
    unanswered = 0;
    questionCounter = 0;
    timer.start();
    displayQandAs(questionCounter);
    // clearTimeout(setIntervalID);

};


function playGame(){
    var buttonValue = $(this).attr("data-name");
    console.log(buttonValue);
    if(buttonValue===questionAndAnswers[questionCounter].correctAnswer){
        resultMessage = "Whoo Hoo!";
        bridgeMessage();
        clearInterval(setIntervalID);
        // alert("You are right!!!!");
        correctlyAnswered++;
        questionCounter++;
    
    }
    

    else{
        resultMessage = "D'oh!<br> The Correct Answer Was: " + questionAndAnswers[questionCounter].correctAnswer;
        bridgeMessage();
        clearInterval(setIntervalID);
        // alert("Try again!");
        incorrectlyAnswered++;
        questionCounter++;
    }

    console.log("correct"+ correctlyAnswered);
    console.log("incorrect"+ incorrectlyAnswered);
    console.log("blank"+ unanswered);
    console.log("question"+ questionCounter);

};

$("#start-button").on("click", function(){
    startGame();
    $(this).hide();
});



$(document).on("click", ".answer-choices", playGame);

});