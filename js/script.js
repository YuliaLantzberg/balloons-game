const colors = ["yellow", "green", "blue", "fiolet", "red"];
const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;
const body = document.body;
const scores = document.querySelectorAll(".score");
const totalShadow = document.querySelector(".total-shadow");
const startBtn = document.querySelector(".start-game-button");
let num = 0;
const TOTAL = 100;
let gameOver = false;
let currentBalloon = 0;

function createBalloon() {
	const div = document.createElement("div");
	let rand = Math.floor(Math.random() * colors.length);
	div.className = `balloon balloon-${colors[rand]}`;

	rand = Math.floor(Math.random() * (windowWidth - 100));
	div.style.left = `${rand}px`;
	div.dataset.number = currentBalloon++;

	body.appendChild(div);
	animateBalloon(div);
}

function animateBalloon(el) {
	let pos = 0;
	let random = Math.floor(Math.random() * 6 - 3);
	const interval = setInterval(frame, 12 - Math.floor(num / 10) + random); // Speed of balloon's movement

	function frame() {
		if (
			pos >= windowHeight + 200 &&
			document.querySelector(`[data-number="${el.dataset.number}"]`) !== null
		) {
			clearInterval(interval);
			el.remove();
			gameOver = true;
		} else {
			pos++;
			el.style.top = `${windowHeight - pos}px`;
		}
	}
}

function deleteBalloon(el) {
	el.remove();
	num++;
	updateScore();
	playBallSound();
}

function playBallSound() {
	let audio = document.createElement("audio");
	audio.src = "sounds/pop.mp3";
	audio.play();
}

function updateScore() {
	for (let i = 0; i < scores.length; i++) {
		scores[i].textContent = num;
	}
}

function startGame() {
	restartGame();
	let timeout = 0;

	const loop = setInterval(function () {
		timeout = Math.floor(Math.random() * 600 - 100); // range from -100 to 500
		if (!gameOver && num !== TOTAL) createBalloon();
		else if (num !== TOTAL) {
			clearInterval(loop);
			totalShadow.style.display = "flex";
			totalShadow.querySelector(".lose").style.display = "block";
		} else {
			clearInterval(loop);
			totalShadow.style.display = "flex";
			totalShadow.querySelector(".win").style.display = "block";
		}
	}, 800 + timeout); // range from 700 to 1300 ms of interval for appearance of new balloons
}

function restartGame() {
	const balloons = document.querySelectorAll(".balloon");
	for (let i = 0; i < balloons.length; i++) {
		balloons[i].remove();
	}
	gameOver = false;
	num = 0;
	updateScore();
}

document.addEventListener("click", function (e) {
	if (e.target.classList.contains("balloon")) {
		deleteBalloon(e.target);
	}
});

document.querySelector(".restart").addEventListener("click", function () {
	totalShadow.style.display = "none";
	totalShadow.querySelector(".win").style.display = "none";
	totalShadow.querySelector(".lose").style.display = "none";
	startGame();
});

document.querySelector(".cancel").addEventListener("click", function () {
	totalShadow.style.display = "none";
});

startBtn.addEventListener("click", function () {
	startGame();
	document.querySelector(".bg-music").play();
	document.querySelector(".start-game-window").style.display = "none";
});

// TODO: Add options menu;
// TODO: Add button to switch off music (regulate volume);
// TODO: Add sounds switcher
// TODO: Pause game, when open the options menu
// TODO: Rewrite game in react-native mode
// TODO: Add different levels of game: 1. Shred all balloons 2. Hit balloons of one color 3. Hit balloons of 2 colors and so on
