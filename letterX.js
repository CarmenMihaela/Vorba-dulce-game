//lists of pictures and words for each letter.
var pictureListX = ["https://cdn.pixabay.com/photo/2020/05/20/06/31/toys-5194951_1280.jpg",
"https://cdn.pixabay.com/photo/2017/07/26/01/42/hiking-2540188_1280.jpg",
"https://cdn.pixabay.com/photo/2020/05/14/02/07/office-5169618_1280.jpg",
"https://images.unsplash.com/photo-1591117207239-788bf8de6c3b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80",
"https://cdn.pixabay.com/photo/2017/06/04/04/16/warming-2370285_1280.jpg",
"https://cdn.pixabay.com/photo/2017/09/01/21/53/blue-2705642_1280.jpg",
"https://cdn.pixabay.com/photo/2014/10/22/17/52/taxicabs-498436_1280.jpg",
"https://cdn.pixabay.com/photo/2014/08/08/21/32/food-mixer-413737_1280.jpg",
"https://cdn.pixabay.com/photo/2019/07/31/07/47/welder-expert-4374635_1280.jpg",
"https://cdn.pixabay.com/photo/2017/06/30/18/09/headlight-2459090_1280.jpg"]
var wordListX = ["XILOFON", "EXCURSIE", "XEROX", "BOX", "TOXIC", "XENIA", "TAXI", "MIXER", "EXPERT", "XENON"]

//creating the count to loop through images list
var nextPic = (function() {
  var count = -1;
  return function() {
    return pictureListX[++count % pictureListX.length];
  }
}());

//creating the count to loop through words lists
var nextWord = (function() {
  var indice = -1;
  return function() {
    return wordListX[++indice % wordListX.length];
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
          if (document.getElementById("kidspic").src === "https://cdn.pixabay.com/photo/2017/06/30/18/09/headlight-2459090_1280.jpg") {
            document.getElementById("mainbutton").innerHTML = "Play letter X again"//the mainbutton shows play again
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
