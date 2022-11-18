// Have this url for your tictactoe project
// http://play.tictactoe.com/

// 2D board array is not required only (Conversion from 1D index to 2D index below)
// 				   row = Math.trunc(index / 3)
// 				column = index % 3

const restart = document.querySelector(".restart");
const msgbox = document.querySelector(".message-box");

const BOARD = document.getElementsByTagName("board")[0];
const CELL = document.getElementsByTagName("cell");

const humanRadioButton = document.querySelector('.choiceHuman');
const computerRadioButton = document.querySelector('.choiceComputer');
const labelText_human = document.querySelector('.human > label');
const labelText_computer = document.querySelector('.computer > label');

const draw = `<span class="match-drawn">Match Drawn</span>`;

const xString = `<span style="color: deeppink" class="x-turn">
										<i class="fa-solid fa-x"></i>'s&nbsp;&nbsp;turn
								 </span>`;

const oString = `<span style="color: #7e06ed" class="o-turn">
									 <i class="fa-solid fa-o"></i>'s&nbsp;&nbsp;turn
								 </span>`;
								 
const xwin = `<span style="color: green; font-size: 1.5rem" class="x-win">
								<i class="fa-solid fa-x"></i>&nbsp;is&nbsp;winner
							</span>`;

const owin = `<span style="color: green; font-size: 1.5rem" class="o-win">
								<i class="fa-solid fa-o"></i>&nbsp;is&nbsp;winner
							</span>`;

const cross =  `<i style="font-size: 5.5rem;" class="cell-icons fa-solid fa-x"></i>`
const circle = `<i style="font-size: 6rem;" class="cell-icons fa-solid fa-o"></i>`;

const WINNING_STATES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let xTurn = true;

let gamestatus = {

  player: "",
  xHasWon: false,
  oHasWon: false,
  matchIsDraw: false,
  winning_line: -1,
	board: [".", ".", ".", ".", ".", ".", ".", ".", "."],

  gameover() {
    return this.xHasWon || this.oHasWon || this.matchIsDraw;
  },

	reset() {
		this.player = "X";
		this.xHasWon = false;
		this.oHasWon = false;
		this.matchIsDraw = false;
		this.winning_line = -1;
		this.board = [".", ".", ".", ".", ".", ".", ".", ".", "."];
	}
};

const playingWith = {
  human: true,
  computer: false,
};

function emptyCell() {
	for (let i = 0; i < CELL.length; ++i) {
		if (gamestatus.board[i] === '.') {
			return i;
		}
	}
	return -1;
}

function makeComputerPlayWithUser(e) {
	e.preventDefault();

	if (gamestatus.player === "X") {
		let k = emptyCell();
    CELL[k].click();
	}
};

function playWithComputer() {	
	BOARD.addEventListener("click", makeComputerPlayWithUser);
}

humanRadioButton.addEventListener("click", function (e) {

  // Add styling for human's radio button
  labelText_human.style.color = "black";
  labelText_human.style["text-decoration-line"] = "underline";
  labelText_human.style["text-decoration-thickness"] = "1px";
  labelText_human.style["text-underline-offset"] = "4px";
  labelText_human.style["text-decoration-color"] = "darkgray";

  // Remove styling from computer's radio button
  labelText_computer.style["text-decoration-line"] = "";
  labelText_computer.style["text-decoration-thickness"] = "";
  labelText_computer.style["text-underline-offset"] = "";
  labelText_computer.style["text-decoration-color"] = "";
  labelText_computer.style.color = "#9c9c9c";

	playingWith.human = true;
  playingWith.computer = false;	
  resetEverything();
	BOARD.removeEventListener("click", computerRadioButton);
  playgame();
});

computerRadioButton.addEventListener("click", function (e) {
  
  // Add styling for computer's radio button
  labelText_computer.style.color = "black";
  labelText_computer.style["text-decoration-line"] = "underline";
  labelText_computer.style["text-decoration-thickness"] = "1px";
  labelText_computer.style["text-underline-offset"] = "4px";
  labelText_computer.style["text-decoration-color"] = "#c0c0c0";

  // Remove styling styling human's radio button
  labelText_human.style["text-decoration-line"] = "";
  labelText_human.style["text-decoration-thickness"] = "";
  labelText_human.style["text-underline-offset"] = "";
  labelText_human.style["text-decoration-color"] = "";

  labelText_human.style.color = "#9c9c9c";

  resetEverything();
  BOARD.removeEventListener('click', makeComputerPlayWithUser, false);
  playingWith.computer = true;
	playingWith.human = false;
  BOARD.addEventListener('click', makeComputerPlayWithUser);
  playgame();
});

function resetEverything() {

  for (let i = 0; i < CELL.length; ++i) {
    CELL[i].style.cursor = "";
    CELL[i].innerHTML = "";
    CELL[i].style.color = "";
    CELL[i].style.backgroundColor = "";
  }

  xTurn = true;
  gamestatus.reset();

  msgbox.style.backgroundColor = "";
  msgbox.innerHTML = xString;
}

restart.addEventListener("click", function () {
  resetEverything();
  playgame();
  if ( playingWith.computer) {
    BOARD.removeEventListener("click", makeComputerPlayWithUser, false);
    BOARD.addEventListener("click", makeComputerPlayWithUser);
  }
});

function results() {

  if (gamestatus.gameover()) {

    if (gamestatus.xHasWon || gamestatus.oHasWon) {
			
      if (gamestatus.xHasWon) msgbox.innerHTML = xwin;
      if (gamestatus.oHasWon) msgbox.innerHTML = owin;

      BOARD.style.boxShadow = `rgba(0, 0, 0, 0.1) 0px 10px 50px`;

      setTimeout(() => {
        BOARD.style.boxShadow = "";
      }, 3000);

      for (let i = 0; i < 3; ++i) {
				
        let k = WINNING_STATES[gamestatus.winning_line][i];

				// highlight cells of the winning line on the board
        CELL[k].style.color = "#008000";
        CELL[k].style.backgroundColor = "#c4ffc4";
				msgbox.style.backgroundColor = "#c4ffc4";
      }

      BOARD.removeEventListener('click', makeComputerPlayWithUser, false);

    } else {

      msgbox.innerHTML = draw;

      // fade out all the cells since the match is drawn
      for (let i = 0; i < CELL.length; ++i) {
        CELL[i].style.color = "#909090";
      }

      BOARD.removeEventListener("click", makeComputerPlayWithUser, false);
    }
  }
}

function updateGameStatus() {

  gamestatus.matchIsDraw = gamestatus.board.every((p) => p === "X" || p === "O" );

	for (let i = 0; i < WINNING_STATES.length; ++i) {
		if (
			gamestatus.board[WINNING_STATES[i][0]] == gamestatus.player &&
			gamestatus.board[WINNING_STATES[i][1]] == gamestatus.player &&
			gamestatus.board[WINNING_STATES[i][2]] == gamestatus.player
		) {
			if (gamestatus.player == "X") {
				gamestatus.xHasWon = true;
			} else {
				gamestatus.oHasWon = true;
			}

			gamestatus.winning_line = i;
		}
	}
}

function showsymbol(cell) {
  if (gamestatus.player == "X") {
    cell.innerHTML = cross;
  } else {
    cell.innerHTML = circle;
  }
  cell.style.cursor = "not-allowed";
}

function playgame() {

	for (let t = 0; t < CELL.length; ++t) {

		CELL[t].addEventListener(
			"click",
			function handleclick(e) {
				
				if (xTurn) {
					if (gamestatus.gameover()) return;

					if ( playingWith.human ) msgbox.innerHTML = oString;

					gamestatus.player = "X";
					gamestatus.board[t] = "X";

					showsymbol.call(this, CELL[t]);
					updateGameStatus();
					results();

					xTurn = false;
				} else {
					if (gamestatus.gameover()) return;

					if (playingWith.human) msgbox.innerHTML = xString;

          gamestatus.player = "O";
          gamestatus.board[t] = "O";

					showsymbol.call(this, CELL[t]);
          updateGameStatus();
          results();

          xTurn = true;
				} 
			},
			{ once: true }
		);

		if (gamestatus.gameover()) break;
	}
}
playgame(); // start playing the game for the first time.

function utility_showBoardStatus() {
  let s = "";
  for (let i = 0; i < gamestatus.board.length; ++i) {
    s += `${gamestatus.board[i]} `;
    if ((i + 1) % 3 == 0) s += "\n";
  }
  console.log(s);
}