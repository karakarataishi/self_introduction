let quizData = [];
let currentQuestion = 0;
let correctCount = 0;
window.addEventListener("load", () => {
    const correctSound = document.getElementById("correct-sound");
    const incorrectSound = document.getElementById("incorrect-sound");

    if (correctSound) correctSound.load();
    if (incorrectSound) incorrectSound.load();
});

// JSONファイルからデータを取得
fetch("quiz.json")
    .then(response => response.json())
    .then(data => {
        quizData = data;
        console.log(quizData.length);
        loadQuestion();
    })
    .catch(error => {
        console.error("クイズデータの読み込みに失敗しました:", error);
    });

function loadQuestion() {
    document.getElementById("count").textContent = `第${currentQuestion + 1}問`;
    const question = quizData[currentQuestion];
    document.getElementById("question").textContent = question.question;

    const buttons = document.querySelectorAll(".choice-btn");
    buttons.forEach((btn, index) => {
        btn.textContent = question.choices[index];
        btn.disabled = false; // 再び有効化！
        // btn.style.display = "inline-block"; // ← 再表示！
        btn.onclick = () => checkAnswer(index);
    });
}

function checkAnswer(selectedIndex) {
    //重複防止の変数
    const buttons = document.querySelectorAll(".choice-btn");
    // //一次的にボタンを非表示に
    buttons.forEach(btn => btn.disabled = true);
    // buttons.forEach(btn => {
    //     btn.style.display = "none";
    // });
    const isCorrect = selectedIndex == quizData[currentQuestion].correct;

    const message = document.getElementById("judge-message");
    const img = document.getElementById("judge-image");

    if (isCorrect) {
        document.getElementById("correct-sound").play();
        document.getElementById("judge-image").src = "images/correct.png"; // ← 画像をセット！
        correctCount++;
    } else {
        document.getElementById("incorrect-sound").play();
        document.getElementById("judge-image").src = "images/incorrect.png"; // ← 画像をセット！
    }


    img.style.display = "block";

    setTimeout(() => {
        message.textContent = "";
        img.style.display = "none";   // 画像非表示に戻す

        currentQuestion++;

        if (currentQuestion < quizData.length) {
            loadQuestion();
        } else {
            localStorage.setItem("score", correctCount);
            location.href = "result.html";
        }
    }, 2000);
    check = 0;
}
