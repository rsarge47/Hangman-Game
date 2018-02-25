// create array of words
var wordChoices = ["Broccoli", "Endive", "Radicchio", "Celeriac", "Eggplant", "Fennel", "Artichoke", "Parsnip", "Rutabaga"];
// choose random word
var rngWord = (wordChoices[Math.floor(Math.random() * wordChoices.length)]).toLowerCase();
console.log(rngWord + " this is the random word");

var guessChoices = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var guessedLetters = [];
var guessNum = 10;
// make underscores based on length of word
var pos = [];
var empty = [];

var blanks = function(){
    for( i = 0; i < rngWord.length; i ++){
        empty.push('_');
    }
    return empty;
}

var showWord = function(){
    var partWord = empty.join(" ");
    document.getElementById("current").innerHTML = partWord;
}

var showGuesses = function(){
    var showLetters = guessedLetters.join(" ");
    document.getElementById("guesses").innerHTML = showLetters;
}

// updates guess remainder
var updateGuessNum = function(){
    document.getElementById("guessNumber").innerHTML = guessNum;
}    
window.onload = updateGuessNum(), blanks(), showWord();

// get user guess
document.onkeyup = function(blammo){
    var userGuess = blammo.key.toLowerCase();
    console.log(userGuess + " this is userGuess");    

    // if guess is in guessChoices and not in guessed then proceed else pick a letter that you haven't picked
    if ((guessChoices.indexOf(userGuess) > -1) && (guessedLetters.indexOf(userGuess) < 0)) {
        guessedLetters.push(userGuess);
        console.log(guessedLetters + " this should be array of guessed letters");
        guessNum --;
        updateGuessNum();
        
        if (rngWord.indexOf(userGuess) > -1){

            // finds positions in rngWord that are equal to userGuess
            var duplicates = function() {
                for ( i = 0; i < rngWord.length; i ++) {
                    if (rngWord[i] === userGuess) {
                        pos.push(i);
                    }         
                }
                return pos;
            }     
            duplicates();       
            
            // replaces underscores in current word with correctly guessed letters
            var fill = function() {
                for ( i = 0; i < pos.length; i ++) {
                    empty[pos[i]] = userGuess;
                }
                return empty;
            }
            fill();
            
            console.log(empty + " this is the empty word");
        }
        else {
            console.log(false + " letter is not in word");        
        }

        // showGuesses();
        showWord();
        showGuesses();
        pos = [];
    }
    else {
        alert("You must select a different letter!");
    }
}



var wins = 0;
var losses = 0;



// display user guesses

// update guess remainder
// select new rng word
// start next round

