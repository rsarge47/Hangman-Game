// create array of words
var wordChoices = ["Broccoli", "Endive", "Radicchio", "Celeriac", "Eggplant", "Fennel", "Artichoke","Parsnip",
    "Rutabaga", "Tomatillo", "Rhubarb", "Asparagus", "Cauliflower", "Zucchini", "Watercress", "Jicama", "Salsify"];
// choose random word
var rngWord = (wordChoices[Math.floor(Math.random() * wordChoices.length)]).toLowerCase();
console.log(rngWord + " is the answer!");

var guessChoices = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r",
    "s", "t", "u", "v", "w", "x", "y", "z"];
var guessedLetters = [];
var guessNum = 12;
var pos = [];
var empty = [];
var wins = 0;
var losses = 0;

// make underscores based on length of word
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

var newCompGuess = function(){
    rngWord = (wordChoices[Math.floor(Math.random() * wordChoices.length)]).toLowerCase();
}
// resets data for next round
var nextRound = function(){
    guessNum = 10;
    guessedLetters = [];
    updateGuessNum();
    showGuesses();
    blanks();
    newCompGuess();
    empty = [];
    blanks();
    console.log(rngWord + " is the answer!");
}

// get user guess
document.onkeyup = function(blammo){
    var userGuess = blammo.key.toLowerCase();   

    // if guess is in guessChoices and not in guessed then proceed otherwise pick a letter that you haven't picked
    if ((guessChoices.indexOf(userGuess) > -1) && (guessedLetters.indexOf(userGuess) < 0)) {

        guessedLetters.push(userGuess);

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
        }
        //sets win when word is solved
        if (rngWord === empty.join("")){
            wins++
            document.getElementById("win").innerHTML = wins;
            alert("You won this round, Congratulations!");
            nextRound();
        }
        // sets loss when all guesses are used
        if (guessNum < 1){
            losses++;
            alert("You lost this round, better luck next time!");
            document.getElementById("loss").innerHTML = losses;
            nextRound();
        }
        // updates word and guesses
        showWord();
        showGuesses();
        pos = [];
    }
    else{
        alert("You must select a different letter!");
    }
}