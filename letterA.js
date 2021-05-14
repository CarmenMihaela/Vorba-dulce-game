//lists of pictures and words for each letter.
var pictureListA = ["https://cdn.pixabay.com/photo/2018/04/18/20/15/sunset-3331503_1280.jpg",
"https://cdn.pixabay.com/photo/2018/08/07/21/09/atomium-3590775_1280.jpg",
"https://cdn.pixabay.com/photo/2015/07/30/11/05/pineapple-867245_1280.jpg",
"https://cdn.pixabay.com/photo/2015/03/26/09/43/dog-690176_1280.jpg",
"https://cdn.pixabay.com/photo/2017/02/02/23/36/magic-2034144_1280.jpg",
"https://cdn.pixabay.com/photo/2018/08/19/15/28/anemone-3616880_1280.jpg",
"https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1049&q=80",
"https://cdn.pixabay.com/photo/2017/03/28/10/26/train-2181576_1280.jpg",
"https://images.unsplash.com/photo-1529066576253-91dff6dbeba3?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
"https://images.unsplash.com/photo-1515536765-9b2a70c4b333?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8bGF1Z2h8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"]
var wordListA = ["APUS", "ATOM", "ANANAS", "AMĂRÂT", "ABRACADABRA", "ANEMONA", "AUTOCAR", "ABUR", "ADRESĂ", "AMUZANT"]

//creating the count to loop through images list
var nextPic = (function() {
  var count = -1;
  return function() {
    return pictureListA[++count % pictureListA.length];
  }
}());

//creating the count to loop through words lists
var nextWord = (function() {
  var indice = -1;
  return function() {
    return wordListA[++indice % wordListA.length];
  }
}());

var correctLetters = []; //the list with correct letters is empty in the beginning

function ready(){//the code that gets executed at page load
  var totalScore = sessionStorage.getItem("totalWins");//the score made by now is stored in totalScore
  winCount = Number(totalScore);//winCount is assigned the value of totalScore to continue the count
  if (winCount >50) {//if the score is bigger than 50, its short version is displayed
    document.querySelector(".score").innerHTML = "Your score: " + " 🍒 " + winCount;
  } else {
    document.querySelector(".score").innerHTML = "Your score: " + "🍒".repeat(winCount) + " " + winCount;
  }

  document.getElementById("mainbutton").innerHTML = "Next word"; //make the mainbutton show Next word message
  document.querySelector(".score").classList.remove("glowbox");//remove glow from score
  document.querySelector(".score").classList.remove("done"); //remove shadows animations score
  document.getElementById("kidspic").classList.remove("glowbox");//remove glow from image
  document.querySelector(".word").classList.remove("glowtext");//remove glow from word
  correctLetters = [];//remove elements from list of guessed letters
  var letter = document.getElementsByClassName('letter');
  for (var i=0; i<letter.length;i++){
    letter[i].classList.remove('bordered');//remove the border from letters when Next word is assigned
    letter[i].style.textDecoration = "none";//remove text decoration when Next word is assigned
  }
  document.getElementById("kidspic").src = nextPic(); //next image is shown
  var currentWord = nextWord();// the next word is stored in var currentWord
  var numberOfDashes =  currentWord.length * 1.48; // obtaining the width from currenWord length
  var wordWidth = numberOfDashes.toString() + "ch";
  document.querySelector(".word").style.width = wordWidth; //making the dashes for current word
  document.querySelector(".word").innerHTML = currentWord; //assign the currentWord to word
  document.querySelector(".word").style.color = "#303030";//make the word invisible;
  var cleanWord = currentWord.split("");//making an array of the letters in the word

  for (var i=0; i<letter.length;i++) {// looping through letter mainbuttons
    letter[i].onclick = function(event) {//when a letter mainbutton is clicked
      this.classList.add("bordered");//when clicked, the letter adds border
      var theLetter = this.innerHTML;//the value of the letter mainbutton is stored in var
      var styledLetter = '<span style="color: white;">' + theLetter + '</span>';//use var to make the second part of replace method
      if (currentWord.includes(theLetter) && !correctLetters.includes(theLetter)) {//if the letter is in the word
        currentWord = currentWord.replaceAll(theLetter, styledLetter);// the letter becomes visible in all places
        document.querySelector(".word").innerHTML = currentWord;//keep visibility of the letters already discovered
        correctLetters.push(theLetter);//all correct letters are added to the array
        const uniqueCorrectLetters = Array.from(new Set(correctLetters));//array of correct letters is reduced to unique correct letters
        const uniqueCleanWord = Array.from(new Set(cleanWord));//array made of unique letters in the current word
        if (uniqueCorrectLetters.length == uniqueCleanWord.length){//if the length of the 2 unique arrays is equal,the winning word has been found
          winCount+=1;//increasing score with every word won
          document.getElementById("kidspic").classList.add("glowbox");//makes the picture's border glow
          document.querySelector(".word").classList.add("glowtext");//add glow to word
          document.querySelector(".score").innerHTML = "Your score: " + "🍒".repeat(winCount) + " " + winCount;
          sessionStorage.setItem("totalWins", winCount);//add the new win to the storage

          document.querySelector(".score").classList.add("glowbox");//adding glow to score

          if (winCount >50) {//if the score is bigger than 50, its short version is displayed
            document.querySelector(".score").innerHTML = "Your score: " + " 🍒 " + winCount;
          }
        }
      } else {// if letter is not in the word
        this.style.textDecoration = "#DC143C 5px line-through";//cross the letter mainbuttons that are pushed but not part of the word
      }
    }
  }
}

function readybutton(){//the code that gets executed at button press
  if (winCount >50) {//if the score is bigger than 50, its short version is displayed
    document.querySelector(".score").innerHTML = "Your score: " + " 🍒 " + winCount;
  } else {
    document.querySelector(".score").innerHTML = "Your score: " + "🍒".repeat(winCount) + " " + winCount;
  }
  document.getElementById("mainbutton").innerHTML = "Next word"; //make the mainbutton show Next word message
  document.querySelector(".score").classList.remove("glowbox");//remove glow from score
  document.querySelector(".score").classList.remove("done"); //remove shadows animations score
  document.getElementById("kidspic").classList.remove("glowbox");//remove glow from image
  document.querySelector(".word").classList.remove("glowtext");//remove glow from word
  correctLetters = [];//remove elements from list of guessed letters
  var letter = document.getElementsByClassName('letter');
  for (var i=0; i<letter.length;i++){
    letter[i].classList.remove('bordered');//remove the border from letters when Next word is given
    letter[i].style.textDecoration = "none";//remove text decoration when Next word is given
  }
  document.getElementById("kidspic").src = nextPic(); //next image is shown
  var currentWord = nextWord();// the next word is stored in var currentWord
  var numberOfDashes =  currentWord.length * 1.48; // obtaining the width from currenWord length
  var wordWidth = numberOfDashes.toString() + "ch";
  document.querySelector(".word").style.width = wordWidth; //making the dashes for current word
  document.querySelector(".word").innerHTML = currentWord;//assign the currentWord to word
  document.querySelector(".word").style.color = "#303030";//make the word invisible;
  var cleanWord = currentWord.split("");//new array made of the letters of the correct word

  for (var i=0; i<letter.length;i++) {// looping through letter mainbuttons
    letter[i].onclick = function(event) {//when a letter mainbutton is clicked
      this.classList.add("bordered");//when clicked, the letter adds border
      var theLetter = this.innerHTML;//the value of the letter mainbutton is stored in var
      var styledLetter = '<span style="color: white;">' + theLetter + '</span>';//use var to make the second part of replace method
      if (currentWord.includes(theLetter) && !correctLetters.includes(theLetter)) {//if the letter is in the word
        currentWord = currentWord.replaceAll(theLetter, styledLetter);// the letter becomes visible in all places
        document.querySelector(".word").innerHTML = currentWord;//keep visibility of the letters already discovered
        correctLetters.push(theLetter);//all correct letters are added to the array
        const uniqueCorrectLetters = Array.from(new Set(correctLetters));//array of correct letters is reduced to unique correct letters
        const uniqueCleanWord = Array.from(new Set(cleanWord));//array made of unique letters in the current word

        if (uniqueCorrectLetters.length == uniqueCleanWord.length){//if the length of the 2 unique arrays is equal,the winning word has been found

          winCount+=1;
          document.getElementById("kidspic").classList.add("glowbox");//makes the picture's border glow
          document.querySelector(".word").classList.add("glowtext");//add glow to word
          document.querySelector(".score").innerHTML = "Your score: " +  "🍒".repeat(winCount) + " " + winCount;
          sessionStorage.setItem("totalWins", winCount);//the new score is added to the sorage

          //if the picture is the last picture shown
          if (document.getElementById("kidspic").src === "https://images.unsplash.com/photo-1515536765-9b2a70c4b333?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8bGF1Z2h8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60") {
            document.getElementById("mainbutton").innerHTML = "Play letter A again"//the mainbutton shows play again
          }
          document.querySelector(".score").classList.add("glowbox");//adding glow to score

          if (winCount >50) {//if the score is bigger than 50, its short version is displayed
            document.querySelector(".score").innerHTML = "Your score: " + " 🍒 " + winCount;
          }
        }
      } else {// if letter is not in the word
        this.style.textDecoration = "#DC143C 5px line-through";//cross the letter mainbuttons that are pushed but not part of the word
      }
    }
  }
}
document.addEventListener("DOMContentLoaded", ready); //when the page loads, the first word is to be guessed
document.getElementById("mainbutton").onclick = readybutton; // when the button is pressed, the next word is shown
