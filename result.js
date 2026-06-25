const score = localStorage.getItem("score") || 0;
document.getElementById("score").textContent = `あなたの正解数は ${score} 問です！`;