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
// setInterval for every question
var setIntervalID;
// setTimeout in between questions
var setTimeoutID;
// will contain the question, possible answers, correct answer & gif displayed
var questionAndAnswers = [
    {
    question: "In what town do The Simpsons live in?",
    possibleAnswers: ["Quahog", "Springfield", "Capital City", "Shelbyville"],
    correctAnswer: "Springfield",
    messageGif: "<img src='assets/images/springfield-small.gif'/>",
    },

    {   
    question: "What is Homer Simpson's middle name?",
    possibleAnswers: ["Jody", "Junior", "Jay", "John"],
    correctAnswer: "Jay",
    messageGif: "<img src='assets/images/homer-j-small.gif'/>",
    },

    {   
    question: "In what year did the show make its official debut?",
    possibleAnswers: ["1988", "1989", "1990", "1991"],
    correctAnswer: "1989",
    messageGif: "<img src='assets/images/screaming-homer.gif'/>",
    },

    {   
    question: "Chief Wiggum is the local police klutz. What is his first name?",
    possibleAnswers: ["Jerry", "Chief", "Larry", "Clancy"],
    correctAnswer: "Clancy",
    messageGif: "<img src='assets/images/chiefwiggum.gif'/>",
    },

    {   
    question: "Mr. Burns, the town's pseudo-evil millionaire, has a popular catchphrase. What is it?",
    possibleAnswers: ["D'oh!", "Ay caramba!", "Maginificent...", "Excellent..."],
    correctAnswer: "Excellent...",
    messageGif: "<img src='assets/images/mrburns-excellent.gif'/>",
    },

    {   
    question: "Bart Simpson's voice is played by a woman. Is this...",
    possibleAnswers: ["True", "False"],
    correctAnswer: "True",
    messageGif: "<img src='assets/images/ay-caramba.gif'/>",
    },

    {   
    question: "What is Lisa's musical instrument of choice?",
    possibleAnswers: ["Triangle", "Saxaphone", "Flute", "Harmonica"],
    correctAnswer: "Saxaphone",
    messageGif: "<img src='assets/images/lisa-happy.gif'/>",
    },

    {   
    question: "What is Homer Simpson's annoying next door neighbor's name?",
    possibleAnswers: ["Ned Flanders", "Ted Flanders", "Red Flanders", "Stupid Flanders"],
    correctAnswer: "Ned Flanders",
    messageGif: "<img src='assets/images/flanders-small.gif'/>",
    },
    {
    question: "Fill in the blank. 'Mmmmmm ________.'",
    possibleAnswers: ["Peanuts", "Candy", "Donuts", "Sweet Apple Pie"],
    correctAnswer: "Donuts",
    messageGif: "<img src='assets/images/donuts.gif'/>",
    },

    {
    question: "IF YOU GET THIS, YOU'RE A TRUE FAN! <br> Maggie Simpson's arch-nemesis is:",
    possibleAnswers: ["Stewie Griffin", "Gerald Samson", "Milhouse Van Houten", "Harold Samson", "Barney Gumble"],
    correctAnswer: "Gerald Samson",
    messageGif: "<img src='assets/images/maggie.gif'/>",
    }
];

// will contain the timer for the entirety of the game
var timer = {
    // time the user is given to answer questions
    initialTime: 30,

    // starts the timer at intervals of 1 second and the timer.count method
    start: function(){
        setIntervalID = setInterval(this.count,1000);
    },

    // checks first to see if the timer is at 0, if it is then let the user know they are out time, show them the answer,
    // reset the timer, and increase the unanswered and question counter by 1 each
    count: function(){
        if(timer.initialTime===0){
            resultMessage = "Ay Caramba! You Ran Out Of Time!<br> The Correct Answer Was: " + questionAndAnswers[questionCounter].correctAnswer;
            bridgeMessage();
            clearInterval(setIntervalID);
            unanswered++;
            questionCounter++;
        };

        // decrement the timer by 1 and display it on screen
        $("#timer").html("Time Remaining: " + timer.initialTime-- + " Seconds");
    },

    // will be used to stop the timer
    stop: function(){
        this.initialTime = 30;
        clearTimeout(setTimeoutID);
        clearInterval(setIntervalID);
    }
};

//loop through the array of possible answers and display them as buttons
function listAnswers(){
for (var i=0;i<questionAndAnswers[questionCounter].possibleAnswers.length;i++) {
    
    // create a button element dynamically
    var displayedAnswers = $("<button>");

    // add certain classes to the new button div
    displayedAnswers.addClass("btn btn-danger btn-lg answer-choices text-center");

    //sets the answer information at index i in the attribute data-name to be accessed later
    displayedAnswers.attr("data-name", questionAndAnswers[questionCounter].possibleAnswers[i]);

    // writes the answer at index i to the button displayed
    displayedAnswers.text(questionAndAnswers[questionCounter].possibleAnswers[i]);

    // appends all the buttons after one another in separate lines and place it in the answers-placeholder div
    $("#answers-placeholder").append("<p>",displayedAnswers);
    
}


};

// display the questions and answers according to the questionCounter
function displayQandAs(questionCounter) {
    $("#question-placeholder").html(questionAndAnswers[questionCounter].question);
    listAnswers();
};

// at the end of the game....
function endGame(){
    // stop the timer
    timer.stop();

    // create a new button and assign it to the restartGame var
    var restartGame = $("<button>");

    // add class and text to the restartGame button
    restartGame.addClass("btn btn-success btn-lg restart-button");
    restartGame.text("Start Over");

    // empty the space where the timer is displayed
    $("#timer").empty();

    // display the results in the question-placeholder div
    $("#question-placeholder").html("That's it! Here's How You Did! <br><br>" + "Correct: " + correctlyAnswered + "<br>Incorrect: " + incorrectlyAnswered + "<br>Unanswered: " + unanswered + "<br>");

    // display the button we created to the answers-placeholder div
    $("#answers-placeholder").html(restartGame);

    // when this restart-button is clicked, call the startGame function and hide this button
    $(".restart-button").on("click", function(){
        startGame();
        $(this).hide();
    });
    
};

//this will be used to call the next question into display by restarting the timer and emptying out the answers and displaying
// the next set of questions and answers
function nextQuestion(){
    timer.initialTime=30;
    timer.start();
    $("#answers-placeholder").empty();
    displayQandAs(questionCounter);
};

// this will set the in-between question message the user sees on the screen before moving on to the next question
// without any user input
function bridgeMessage(){

    // create a new var with the matching gif as its value
    var messageImage = questionAndAnswers[questionCounter].messageGif;

    // if the user has answered the last question...
    if (questionCounter===questionAndAnswers.length-1){
        // show the right answer message
        $("#question-placeholder").html(resultMessage);
        // show the gif
        $("#answers-placeholder").html("<br>" + messageImage);
        // call the endGame function after 5 seconds
        setTimeoutID = setTimeout(endGame,6000);

    }

    // else if there are more questions left to answer...
    else if(questionCounter<questionAndAnswers.length){
        // show the right answer message
        $("#question-placeholder").html(resultMessage);
        // show the gif
        $("#answers-placeholder").html("<br>" + messageImage);
        // call the nextQuestion function after 5 seconds
        setTimeoutID = setTimeout(nextQuestion,6000);
    }
};

// this sets our global variables to default and...
function startGame(){
    // start the timer
    timer.start();
    correctlyAnswered = 0;
    incorrectlyAnswered = 0;
    unanswered = 0;
    questionCounter = 0;
    // display the questions and answers
    displayQandAs(questionCounter);

};

// this determines if the user is right or wrong when answering the question
function playGame(){

    // this refers to the document and its buttons' values stored in the data-name attribute
    var buttonValue = $(this).attr("data-name");

    // if this value the user clicks is the correct answer of the current question...
    if(buttonValue===questionAndAnswers[questionCounter].correctAnswer){

        // set the result message, show the brideMessage, clearInterval
        resultMessage = "Whoo Hoo!";
        bridgeMessage();
        clearInterval(setIntervalID);
        // and increase the number of correct answers and the questionCounter
        correctlyAnswered++;
        questionCounter++;
    }
    // else set the incorrect result message, show the bridgeMessage, clearInterval
    else{
        resultMessage = "D'oh!<br> The Correct Answer Was: " + questionAndAnswers[questionCounter].correctAnswer;
        bridgeMessage();
        clearInterval(setIntervalID);
        // and increase the number of incorrectly answered questions and the questionCounter
        incorrectlyAnswered++;
        questionCounter++;
    }
};

// when the start button is clicked
$("#start-button").on("click", function(){
    // run the start game function
    startGame();
    // hide this button
    $(this).hide();
});

// when the buttons that are created dynamically with the class .answer-choices
// are clicked, call the playGame function
$(document).on("click", ".answer-choices", playGame);

});