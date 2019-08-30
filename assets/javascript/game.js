var words = ["supreme", "Area51", "Bitcoin", "Rav4", "Juul", "Canada", "NewJersey", "Bootcamp", "Goodbyes"];

var word = '';
var guessedWord = [];

var guessesLeft = 0;

var lettersGuessed = '';

var guessedString = '';

var wins = 0;

var updateImage = true;

function startGame() {
    word = words[Math.floor(Math.random() * words.length)].toUpperCase();
    guessedWord = [];
    for (var i = 0; i < word.length; i++) {
        guessedWord[i] = "_";
        guessedString = guessedString + "_";
    }
    document.querySelector("#guess").innerHTML = guessedString;
    guessesLeft = 10;
    document.querySelector("#guesses").innerHTML = wins;
    lettersGuessed = '';
    console.log("Word has been selected: " + word);
    if (updateImage) {
        document.getElementById("image").src = "assets/images/hangman-1.jpg";
    }
}

function pauseMusic(audio, promise) {
    console.log('pausing music');
    promise.then(_ => {
        audio.pause();
    })
}

function guessLetter(letter) {
    if (!updateImage) {
        startGame();
        document.getElementById("image").src = "assets/images/hangman-1.jpg";
        updateImage = true;
    }
    letter = letter.toUpperCase();
    if (lettersGuessed.includes(letter)) {
        return;
    }
    if (letter === "SPACE") {
        letter = ' ';
    }
    var guess = false;
    for (var i = 0; i < word.length; i++) {
        if (word.charAt(i) === letter) {
            guessedWord[i] = letter;
            console.log("You guessed a letter!");
            guess = true;
        }
    }
    guessedString = '';
    for (var i = 0; i < guessedWord.length; i++) {
        guessedString = guessedString + guessedWord[i];
    }
    document.querySelector("#guess").innerHTML = guessedString;
    lettersGuessed = lettersGuessed + letter + ", ";
    document.querySelector("#letters").innerHTML = lettersGuessed;
    if (word === guessedString) {
        if (word === "GOODBYES") {
            var audio = new Audio("assets/javascript/Goodbyes.wav");
            var promise = audio.play();
            console.log('Starting music');
            setInterval(function () { pauseMusic(audio, promise); }, 15000);
        }
        document.getElementById("image").src = "assets/images/" + word + ".jpg";
        guessedString = '';
        document.querySelector("#guess").innerHTML = guessedString;
        updateImage = false;
        //alert("You guessed the word!");
        startGame();
        wins++;
        document.querySelector("#wins").innerHTML = wins;
    } else {
        if (!guess) {
            guessesLeft--;
            if (guessesLeft === 9) {
                document.getElementById("image").src = "assets/images/hangman-1.jpg";
            } else if (guessesLeft === 8) {
                document.getElementById("image").src = "assets/images/hangman-2.jpg";
            } else if (guessesLeft === 7) {
                document.getElementById("image").src = "assets/images/hangman-3.jpg";
            } else if (guessesLeft === 6) {
                document.getElementById("image").src = "assets/images/hangman-4.jpg";
            } else if (guessesLeft === 5) {
                document.getElementById("image").src = "assets/images/hangman-5.jpg";
            } else if (guessesLeft === 4) {
                document.getElementById("image").src = "assets/images/hangman-6.jpg";
            } else if (guessesLeft === 3) {
                document.getElementById("image").src = "assets/images/hangman-7.jpg";
            } else if (guessesLeft === 2) {
                document.getElementById("image").src = "assets/images/hangman-8.jpg";
            } else if (guessesLeft === 1) {
                document.getElementById("image").src = "assets/images/hangman-9.jpg";
            } else if (guessesLeft === 0) {
                document.getElementById("image").src = "assets/images/hangman-10.jpg";
            }
            document.querySelector("#guesses").innerHTML = guessesLeft;
            console.log("You guessed a incorrect letter!")
            if (guessesLeft === 0) {
                //alert("You ran out of guesses!");
                updateImage = false;
            }
        }
    }
}