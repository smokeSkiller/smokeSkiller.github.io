"use strict";

//! Preloader
var preloader = document.querySelector(".loading-container");
var e_loadholder = document.querySelector(".e-loadholder");
var m_loader = document.querySelector(".m-loader");
var preloader_text = document.querySelector(".e-text");

window.onload = function () {
    //! Changing properties of preloader when it loaded successfully
    // Replacing text and change its color
    preloader_text.innerHTML = "Success";
    preloader_text.style.animationName = "textColourSuccess";

    // green palettes for spinners
    e_loadholder.style.borderColor = "#00c853";
    m_loader.style.borderColor = "#00e676";
    preloader_text.style.borderColor = "#b9f6ca";

    setTimeout(function () {
        preloader.style.display = "none";
    }, 1500);

    //* Sounds
    var correct_sound = new Audio();
    var incorrect_sound = new Audio();
    var time_bomb_sound = new Audio();
    var get_ready_sound = new Audio();

    // path for sounds
    time_bomb_sound.src = "sounds/time_bomb.mp3";
    correct_sound.src = "sounds/correct_sound.mp3";
    incorrect_sound.src = "sounds/incorrect_sound.mp3";
    get_ready_sound.src = "sounds/get_ready_sound.mp3";

    //! Dom's elements
    //* Menu items
    var mainMenu = document.querySelector(".main-menu");
    var playGameBtns = document.querySelectorAll(".play-btn");
    var processedBlock = document.querySelector(".processed-block");
    var processedInfoBlock = document.querySelector(".processed-info-block");
    var menuBtns = document.querySelectorAll(".menu-btn");

    // get reaady items
    var getReadyBlock = document.querySelector(".get-ready-block-container");
    var timeReadyContainer = document.querySelector(".get-ready-block__timer h5");

    // high score container
    var highScoreContainer = document.querySelector(".high-score");
    var highScoreMediumContainer = document.querySelector(".high-score-medium");
    var highScoreHardContainer = document.querySelector(".high-score-hard");
    var highScoreEinsteinContainer = document.querySelector(".high-score-einstein");

    // checkbox dom (level)
    var mediumDifficult = document.querySelectorAll("input[name='difficulty']")[0];
    var hardDifficult = document.querySelectorAll("input[name='difficulty']")[1];
    var einsteinDifficult = document.querySelectorAll("input[name='difficulty']")[2];

    //* game process items
    var sampleContainer = document.querySelector(".sample h2");
    var answerContainers = document.querySelectorAll(".answer");

    // icons
    var correctIcon = document.querySelectorAll(".icon-container")[0];
    var incorrectIcon = document.querySelectorAll(".icon-container")[1];

    //  info-bar elems
    var timerContainer = document.querySelector(".timer .value");
    var levelContainer = document.querySelector(".level .value");
    var scoreContainer = document.querySelector(".score .value");

    //* Game over menu
    var gameOverMenu = document.querySelector(".game-over-menu");
    var gameOverScore = document.querySelector(".game-over-score span");
    var praisedMsgContainer = document.querySelector(".praised-msg");
    var mainMenuBtn = document.querySelector(".main-menu-btn");

    //* variables
    var a = void 0,
        b = void 0,
        sampleStr = void 0,
        sampleNum = void 0,
        samplesStr = void 0,
        samplesNum = void 0,
        randomSample = void 0,
        randomAnswers = void 0,
        timeLeft = void 0,
        score = 0,
        j = 0,
        timeReady = void 0;

    //* arrays
    var tenAndFive = [5, 10];

    // motivationed messages
    var praisedMsgWeak = ["Not good!", "Bad, but no worries!Try to replay!", "Weakly!Play more this game!"];
    var praisedMsgMedium = ["Good job!", "Well done!", "Excellent!", "Keep it up!", "You are improving!", "You are doing progress!"];
    var praisedMsgHigh = ["Brilliant!", "Superb!", "Fantastic!", "That's better than ever!"];
    var praisedMsgFantastic = ["You are god in math!", "You have superb iq!", "You are genius!", "You are superman!", "Eistein would have been proud of you!"];

    //! if our locale storage exists
    if (localStorage.highScore) {
        localStorage.highScore = localStorage.highScore;
    } else {
        localStorage.highScore = 0;
    }

    //* high scores by levels
    // medium
    if (localStorage.highScoreMedium) {
        localStorage.highScoreMedium = localStorage.highScoreMedium;
    } else {
        localStorage.highScoreMedium = 0;
    }

    // hard
    if (localStorage.highScoreHard) {
        localStorage.highScoreHard = localStorage.highScoreHard;
    } else {
        localStorage.highScoreHard = 0;
    }

    // Einstein
    if (localStorage.highScoreEinstein) {
        localStorage.highScoreEinstein = localStorage.highScoreEinstein;
    } else {
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
        return Math.floor(Math.random() * (max - min)) + min;
    }

    //* Timer
    function timer() {
        timeLeft = 60;
        var t = setInterval(function () {
            timerContainer.innerHTML = timeLeft;
            if (timeLeft <= 0) {
                clearInterval(t);
            } else {
                timeLeft--;
            }
        }, 1000);

        setTimeout(function () {
            time_bomb_sound.play();
        }, 56000);
    }

    //* Returns random answers to answer containers
    function returnRandomAnswers(q) {
        randomAnswers = [sampleNum + q, sampleNum - q];
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
        for (var i = 0; i < answerContainers.length; i++) {
            if (randomSample == 2) {
                j += tenAndFive[getRndInteger(0, 1)];
            } else if (randomSample == 1) {
                j += getRndInteger(1, 5);
            } else {
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

            var timeLeft = 4;
            getReadyBlock.style.display = "flex";
            get_ready_sound.play();

            // Time for Prepare
            var readyTimeOut = setInterval(function () {
                timeReadyContainer.innerHTML = timeLeft;
                if (timeLeft == 0) {
                    clearInterval(readyTimeOut);
                } else {
                    timeLeft--;
                }
            }, 1000);

            //* when our Time for prepare will be out
            setTimeout(function () {
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
                        else if (einsteinDifficult.checked == true && score > localStorage.highScoreEinstein) {
                                localStorage.highScoreEinstein = score;
                                highScoreEinsteinContainer.innerHTML = localStorage.highScoreEinstein;
                            }

                    // activating praised messages
                    if (score >= 10 && score <= 15) {
                        praisedMsgContainer.innerHTML = praisedMsgMedium[getRndInteger(0, praisedMsgMedium.length)];
                    } else if (score > 15 && score < 25) {
                        praisedMsgContainer.innerHTML = praisedMsgHigh[getRndInteger(0, praisedMsgHigh.length)];
                    } else if (score >= 25) {
                        praisedMsgContainer.innerHTML = praisedMsgFantastic[getRndInteger(0, praisedMsgFantastic.length)];
                    } else {
                        praisedMsgContainer.innerHTML = praisedMsgWeak[getRndInteger(0, praisedMsgWeak.length)];
                    }

                    score = 0;
                    scoreContainer.innerHTML = score;
                }, 61000);
            }, 5000);
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
            var answer = answerContainer.querySelector('span').innerHTML;

            if (answer == sampleNum) {
                score++;
                // consequences
                correct_sound.play();
                correctIcon.style.display = "block";
                setTimeout(function () {
                    correctIcon.style.display = "none";
                }, 300);
            } else {
                if (score != 0) {
                    score--;
                }
                // consequences
                incorrect_sound.play();
                incorrectIcon.style.display = "block";
                setTimeout(function () {
                    incorrectIcon.style.display = "none";
                }, 300);
            }
            sampleComponent();
        });
    });

    menuBtns.forEach(function (menuBtn) {
        menuBtn.addEventListener("click", function (event) {
            event.preventDefault();
        });
    });
};