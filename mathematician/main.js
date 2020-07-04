//! Preloader
    const preloader = document.querySelector(".loading-container");
    const e_loadholder = document.querySelector(".e-loadholder");
    const m_loader = document.querySelector(".m-loader");
    const preloader_text = document.querySelector(".e-text");

window.onload = function () {
//! Changing properties of preloader when it loaded successfully
// Replacing text and change its color
preloader_text.innerHTML = "Success";
preloader_text.style.animationName = "textColourSuccess";

// green palettes for spinners
e_loadholder.style.borderColor = "#00c853";
m_loader.style.borderColor = "#00e676";
preloader_text.style.borderColor = "#b9f6ca";

setTimeout(() => {
    preloader.style.display = "none";
}, 1500);

//* Sounds
let correct_sound = new Audio();
let incorrect_sound = new Audio();
let time_bomb_sound = new Audio();
let get_ready_sound = new Audio();

// path for sounds
time_bomb_sound.src = "sounds/time_bomb.mp3";
correct_sound.src = "sounds/correct_sound.mp3";
incorrect_sound.src = "sounds/incorrect_sound.mp3";
get_ready_sound.src = "sounds/get_ready_sound.mp3";

//! Dom's elements
//* Menu items
const mainMenu = document.querySelector(".main-menu"); 
const playGameBtns = document.querySelectorAll(".play-btn");
const processedBlock = document.querySelector(".processed-block");
const processedInfoBlock = document.querySelector(".processed-info-block");
const menuBtns = document.querySelectorAll(".menu-btn");

// get reaady items
const getReadyBlock = document.querySelector(".get-ready-block-container");
const timeReadyContainer = document.querySelector(".get-ready-block__timer h5");

// high score container
const highScoreContainer = document.querySelector(".high-score");
const highScoreMediumContainer = document.querySelector(".high-score-medium");
const highScoreHardContainer = document.querySelector(".high-score-hard");
const highScoreEinsteinContainer = document.querySelector(".high-score-einstein");

// checkbox dom (level)
const mediumDifficult = document.querySelectorAll("input[name='difficulty']")[0];
const hardDifficult = document.querySelectorAll("input[name='difficulty']")[1];
const einsteinDifficult = document.querySelectorAll("input[name='difficulty']")[2];

//* game process items
const sampleContainer = document.querySelector(".sample h2");
const answerContainers = document.querySelectorAll(".answer");

// icons
const correctIcon =  document.querySelectorAll(".icon-container")[0];
const incorrectIcon =  document.querySelectorAll(".icon-container")[1];

//  info-bar elems
const timerContainer = document.querySelector(".timer .value");
const levelContainer = document.querySelector(".level .value");
const scoreContainer = document.querySelector(".score .value");

//* Game over menu
const gameOverMenu = document.querySelector(".game-over-menu");
const gameOverScore = document.querySelector(".game-over-score span");
const praisedMsgContainer = document.querySelector(".praised-msg");
const mainMenuBtn = document.querySelector(".main-menu-btn");

//* variables
let a,b,sampleStr,sampleNum,samplesStr,samplesNum,randomSample,randomAnswers,timeLeft,score = 0, j = 0,timeReady;

//* arrays
let tenAndFive = [5, 10];

// motivationed messages
let praisedMsgWeak = ["Not good!", "Bad, but no worries!Try to replay!", "Weakly!Play more this game!"];
let praisedMsgMedium = ["Good job!", "Well done!", "Excellent!", "Keep it up!", "You are improving!", "You are doing progress!"];
let praisedMsgHigh = ["Brilliant!", "Superb!" , "Fantastic!", "That's better than ever!"];
let praisedMsgFantastic = ["You are god in math!", "You have superb iq!", "You are genius!", "You are superman!", "Eistein would have been proud of you!"];

//! if our locale storage exists
if(localStorage.highScore){
    localStorage.highScore = localStorage.highScore;
}else{
    localStorage.highScore = 0;
}

//* high scores by levels
// medium
if(localStorage.highScoreMedium){
    localStorage.highScoreMedium = localStorage.highScoreMedium;
}else{
    localStorage.highScoreMedium = 0;
}

// hard
if(localStorage.highScoreHard){
    localStorage.highScoreHard = localStorage.highScoreHard;
}else{
    localStorage.highScoreHard = 0;
}

// Einstein
if(localStorage.highScoreEinstein){
    localStorage.highScoreEinstein = localStorage.highScoreEinstein;
}else{
    localStorage.highScoreEinstein = 0;
}

// appending high scores to dom's items
highScoreContainer.innerHTML = localStorage.highScore;
highScoreMediumContainer.innerHTML = localStorage.highScoreMedium;
highScoreHardContainer.innerHTML = localStorage.highScoreHard;
highScoreEinsteinContainer.innerHTML = localStorage.highScoreEinstein;

//! Functions
//* gets Random Integer
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

//* Timer
function timer() {
    timeLeft = 60;
    let t = setInterval(function(){
        timerContainer.innerHTML = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(t);
        }
        else{
            timeLeft--;
        }
    },1000);

    setTimeout(function () {
        time_bomb_sound.play();
    },56000)
}

//* Returns random answers to answer containers
function returnRandomAnswers(q) {
    randomAnswers = [sampleNum + q, 
        sampleNum - q];
}

//* sample component
function sampleComponent() {
    //* random nums
    if (mediumDifficult.checked == true) {
        levelContainer.innerHTML = "Medium";
        levelContainer.style.color = "lime";
        a = getRndInteger(10, 100);
        b = getRndInteger(5, a);
    }

    if (hardDifficult.checked == true) {
        levelContainer.innerHTML = "Hard";
        levelContainer.style.color = "orange";
        a = getRndInteger(100, 1000);
        b = getRndInteger(10, a);
    }

    if (einsteinDifficult.checked == true) {
        levelContainer.innerHTML = "Einstein";
        levelContainer.style.color = "red";
        a = getRndInteger(1000, 10000);
        b = getRndInteger(100, a);
    }
    
    j = 0;

    randomSample = Math.floor(Math.random() * 3);

    //* if our sample with sign *
    if (randomSample == 2 && b.toString().length > 1) {
        b = parseInt(b.toString().substr(0, 1));
        if (b == 1) {
            b += getRndInteger(1, 10);
        }
    }

    //* if our sample with sign -
    if (randomSample == 1 && b.toString().length > 1) {
        if (a <= b - 1) {
            a += b + Math.floor(Math.random() * 10);
        }
    }

    //* sample and its properties
    samplesStr = [a.toString() + " + " + b.toString(), a.toString() + " - " + b.toString(), a.toString() + " * " + b.toString()];
    samplesNum = [a + b, a - b, a * b];
    
    sampleStr = samplesStr[randomSample];
    sampleNum = samplesNum[randomSample];

    //* appending data in dom's elements
    sampleContainer.innerHTML = sampleStr;
    answerContainers[Math.floor(Math.random() * 4)].querySelector('span').innerHTML = sampleNum;
    
    // random answers 
    for (let i = 0; i < answerContainers.length; i++) {
        if (randomSample == 2) {
            j += tenAndFive[getRndInteger(0, 1)];
        }
        else if (randomSample == 1) {
            j += getRndInteger(1, 5);
        }
        else{
            j += Math.floor(Math.random() * 10);
        }

        if (answerContainers[i].querySelector('span').innerHTML != sampleNum) {
            returnRandomAnswers(j);
            answerContainers[i].querySelector('span').innerHTML = randomAnswers[Math.floor(Math.random() * 2)];
        }
    }

    //* adding scores
    scoreContainer.innerHTML = score;
    gameOverScore.innerHTML = score;
}

//// timer();

//! events
//* Clicking to play button
playGameBtns.forEach(function (playGameBtn) {
    playGameBtn.addEventListener("click", function (event) {
        event.preventDefault();
        gameOverMenu.style.display = "none";

        let timeLeft = 4;
        getReadyBlock.style.display = "flex";
        get_ready_sound.play();
    
        // Time for Prepare
        let readyTimeOut = setInterval(function () {
            timeReadyContainer.innerHTML = timeLeft;
            if (timeLeft == 0) {
                clearInterval(readyTimeOut);
            }
            else{
                timeLeft--;
            }
        },1000);
    
        //* when our Time for prepare will be out
        setTimeout(function(){
            // style some items 
            getReadyBlock.style.display = "none";
            processedBlock.style.display = "block";
            processedInfoBlock.style.display = "block";
            mainMenu.style.display = "none";
            sampleComponent();
    
            timer();
    
            //* when our time will be out it will transfer us to game over menu
            setTimeout(function () {
                gameOverMenu.style.display = "flex";
    
                if (score > localStorage.highScore) {
                    localStorage.highScore = score;
                    highScoreContainer.innerHTML = localStorage.highScore;
                }

                //* comparing scores on different levels
                // medium
                if (mediumDifficult.checked == true && score > localStorage.highScoreMedium) {
                    localStorage.highScoreMedium = score;
                    highScoreMediumContainer.innerHTML = localStorage.highScoreMedium;
                }
                // hard
                else if (hardDifficult.checked == true && score > localStorage.highScoreHard) {
                    localStorage.highScoreHard = score;
                    highScoreHardContainer.innerHTML = localStorage.highScoreHard;
                }
                // einstein
                else if (einsteinDifficult.checked == true && score > localStorage.highScoreEinstein){
                    localStorage.highScoreEinstein = score;
                    highScoreEinsteinContainer.innerHTML = localStorage.highScoreEinstein;
                }

                // activating praised messages
                if (score >= 10 && score <= 15) {
                    praisedMsgContainer.innerHTML = praisedMsgMedium[getRndInteger(0, praisedMsgMedium.length)];
                }
                else if (score > 15 && score < 25) {
                    praisedMsgContainer.innerHTML = praisedMsgHigh[getRndInteger(0, praisedMsgHigh.length)];
                }
                else if (score >= 25) {
                    praisedMsgContainer.innerHTML = praisedMsgFantastic[getRndInteger(0, praisedMsgFantastic.length)];
                }

                else{
                    praisedMsgContainer.innerHTML = praisedMsgWeak[getRndInteger(0, praisedMsgWeak.length)];
                }
    
                score = 0;
                scoreContainer.innerHTML = score;
            },61000);
        },5000);
    });
    
});

//* Clicking to main menu button
mainMenuBtn.addEventListener("click", function () {
    processedBlock.style.display = "none";
    processedInfoBlock.style.display = "none";
    gameOverMenu.style.display = "none";
    mainMenu.style.display = "flex";
});

//* Clicking to variants of answers
answerContainers.forEach(function (answerContainer) {
    answerContainer.addEventListener("click", function () {
        let answer = answerContainer.querySelector('span').innerHTML;

        if (answer == sampleNum) {
            score++;
            // consequences
            correct_sound.play();
            correctIcon.style.display = "block";
            setTimeout(() => {
                correctIcon.style.display = "none";
            }, 300);
        }
        else{
            if (score != 0) {
                score--;
            }
            // consequences
            incorrect_sound.play();
            incorrectIcon.style.display = "block";
            setTimeout(() => {
                incorrectIcon.style.display = "none";
            }, 300);
        }
        sampleComponent();
    });
});

menuBtns.forEach(function (menuBtn) {
    menuBtn.addEventListener("click", function () {
        event.preventDefault();
    });
});
}