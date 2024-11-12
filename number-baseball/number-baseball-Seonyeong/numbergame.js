// 컴퓨터가 랜덤으로 세자리 숫자 생성
function createRandomNumber() {
    const numbers = new Set();
    
    while (numbers.size < 3) {
        const digit = Math.floor(Math.random() * 9) + 1;
        numbers.add(digit);
    }
    
    return [...numbers].join(''); // 숫자들을 배열->문자열로 반환
}

let secretNumber = createRandomNumber(); 
let attempts = []; 

// 입력 비교 함수
function evaluateGuess(playerInput, secret) {
    let strikeCount = 0;
    let ballCount = 0;

    playerInput.split('').forEach((digit, index) => {
        if (digit === secret[index]) {
            strikeCount++;
        } else if (secret.includes(digit)) {
            ballCount++;
        }
    });

    return { strikes: strikeCount, balls: ballCount };
}

// 게임 진행 함수
function runGame() {
    const userGuess = document.getElementById("user-input").value;

    if (new Set(userGuess).size !== 3 || userGuess.length !== 3 || /[^1-9]/.test(userGuess)) {
        alert("1~9까지 서로 다른 숫자 3개를 입력해 주세요!");
        return;
    }

    const result = evaluateGuess(userGuess, secretNumber);
    attempts.push({ guess: userGuess, result });

    if (result.strikes === 3) {
        alert("정답입니다! 게임을 종료합니다.");
        displayHistory(); // 시도한 기록
        resetGame();
    } else {
        displayFeedback(result);
        displayHistory();
    }
}

// 결과를 화면에 표시하는 함수
function displayFeedback({ strikes, balls }) {
    const feedback = strikes === 0 && balls === 0 ? "아웃" : `${balls}볼 ${strikes}스트라이크`;
    document.getElementById("result").innerText = feedback;
}

// 사용자의 시도 기록을 표시하는 함수
function displayHistory() {
    const historyContainer = document.getElementById("history");
    historyContainer.innerHTML = "<h3>시도 기록</h3>";
    
    attempts.forEach((attempt, index) => {
        const attemptElement = document.createElement("p");
        attemptElement.innerText = `시도 ${index + 1}: ${attempt.guess} - ${attempt.result.balls}볼 ${attempt.result.strikes}스트라이크`;
        historyContainer.appendChild(attemptElement);
    });
}

// 게임 초기화 함수
function resetGame() {
    secretNumber = createRandomNumber();
    attempts = [];
    document.getElementById("result").innerText = "";
    document.getElementById("user-input").value = "";
    document.getElementById("history").innerHTML = "";
}

// 이벤트 리스너 설정
document.getElementById("submit-btn").addEventListener("click", runGame);
document.getElementById("restart-btn").addEventListener("click", resetGame);
