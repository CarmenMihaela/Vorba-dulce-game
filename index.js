
// sessionStorage.clear();
var totalScore = Number(sessionStorage.getItem("totalWins"));//extracting the score from storage
document.querySelector(".score").innerHTML = "Your score: " +  "🍒".repeat(totalScore) + " " + totalScore; //showing the score
if (totalScore > 50) {
  document.querySelector(".score").innerHTML = "Your score: " + " 🍒 " + totalScore;//showing the short score if over 50
}
