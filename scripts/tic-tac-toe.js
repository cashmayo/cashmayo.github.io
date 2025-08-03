// Javascript Project 2 - 8/2/24
"use strict";

//constants & classes
const X_CHAR = "X";
const O_CHAR = "O";
const UNPLAYABLE_CLASSNAME = "unplayable";

const NO_CPU = 0;
const SIMPLE_CPU = 1;
const INTERMEDIATE_CPU = 2;
const TRYHARD_CPU = 3;
const WIN_COMBOS = [
    [0, 1, 2], //0 rows
    [3, 4, 5], //1
    [6, 7, 8], //2
    [0, 3, 6], //3 columns
    [1, 4, 7], //4
    [2, 5, 8], //5
    [0, 4, 8], //6 diagonals
    [2, 4, 6]  //7 
];
class Fork {
    constructor(comboDuo) { //combos, overlap, points, issVFork, baitCell
        this.combos = comboDuo;
        this.points = [];
        let i, z;

        //maybe i should have avoided writing most of this constructor code, and just hardcoded values instead... but i didnt

        //overlap
        overlapLoop:
        for (i = 0; i < WIN_COMBOS[this.combos[1]].length; i += 2) //0,2
            for (z = 0; z < WIN_COMBOS[this.combos[0]].length; z += 2) //0,2
                if (WIN_COMBOS[this.combos[0]][z] === WIN_COMBOS[this.combos[1]][i]) {
                    this.overlapCell = WIN_COMBOS[this.combos[0]][z];
                    break overlapLoop;
                }

        //points
        for (i = 0; i < this.combos.length; i++) //0-2
            for (z = 0; z < WIN_COMBOS[this.combos[i]].length; z += 2) //0,2
                if (WIN_COMBOS[this.combos[i]][z] !== this.overlapCell) {
                    this.points.push(WIN_COMBOS[this.combos[i]][z]);
                    break;
                }

        //isVfork & baitCell
        if (this.combos.includes(6) || this.combos.includes(7)) {
            this.isVFork = true;
            this.baitCell = (this.points[0] + this.points[1]) / 2;
        } else
            this.isVFork = false;
    }
    getNextMove() {
        if (boardState[this.points[0]] === undefined)
            return this.points[0];
        if (boardState[this.points[1]] === undefined)
            return this.points[1];
        return this.overlapCell;
    }
    isPossible() {
        let i, z;
        switch (turnCount) {
            case 3:
                if (boardState[this.points[0]] !== O_CHAR && boardState[this.points[1]] !== O_CHAR)
                    return false;
                if (this.isVFork && boardState[this.baitCell] !== undefined)
                    return false;
                break;
            case 5:
                if (!(boardState[this.points[0]] === O_CHAR && boardState[this.points[1]] === O_CHAR))
                    return false;
            //case 7 not needed because it is a win, so is force played
        }
        for (i = 0; i < this.combos.length; i++) //0,1
            for (z = 0; z < WIN_COMBOS[this.combos[i]].length; z++) //0-2
                if (boardState[WIN_COMBOS[this.combos[i]][z]] === X_CHAR)
                    return false;
        return true;
    }
}
const V_FORKS = [
    new Fork([0, 6]),
    new Fork([0, 7]),
    new Fork([2, 6]),
    new Fork([2, 7]),
    new Fork([3, 6]),
    new Fork([3, 7]),
    new Fork([5, 6]),
    new Fork([5, 7]), // S & T forks arent worth using as a winning strategy; they win in the same turncount & are less consistent (& X fork is done when necessary by the win block check)
];
const L_FORKS = [
    new Fork([0, 3]), // L forks (only necessary as last ditch for when opponent owns center cell)
    new Fork([0, 5]),
    new Fork([2, 3]),
    new Fork([2, 5])
];

//elements
let tbodyElement;
let cellElements;
let matchInfoElement;
let winnerElement;
let restartButton;
let playAgainButton;
let gameClockSpan;

//variables
let isGameActive;
let isOsTurn;
let turnCount;
let boardState;
let oCells;
let xCells;

let isAwaitingCpu;
let cpuMode;
let cpuTurnTimeout;

let gameClockDuration;
let gameClockInterval;

//functions
function activateCell(cellId, isPlayer) {
    if (!isGameActive || (isAwaitingCpu && isPlayer) || boardState[cellId] !== undefined) return; //bounce invalid plays
    //get player symbol
    let player, ownedCells;
    if (isOsTurn) {
        player = O_CHAR;
        ownedCells = oCells;
    } else {
        player = X_CHAR;
        ownedCells = xCells;
    }
    //update gamestate
    boardState[cellId] = player;
    ownedCells.push(cellId);
    //update DOM
    cellElements[cellId].textContent = player;
    cellElements[cellId].className = UNPLAYABLE_CLASSNAME;

    //check for win/draw
    console.log(`turn${turnCount}: ${(isOsTurn && cpuMode !== NO_CPU) ? "CPU" + cpuMode : player} played cell ${cellId}`);
    if (turnCount >= 5)
        if (playerHasWon(ownedCells)) {
            endGame(player);
            return;
        } else if (turnCount === 9) {
            endGame("The Cat");
            return;
        }

    updateTurn();
}
function updateTurn() { //update turn vars/info/UI & call CPU to play if necessary
    turnCount++;
    isOsTurn = !isOsTurn;
    if (isOsTurn) {
        matchInfoElement.textContent = "It is O's turn.";
        switch (cpuMode) {
            case SIMPLE_CPU:
                isAwaitingCpu = true;
                cpuTurnTimeout = setTimeout(() => activateCell(getCpuMoveSimple(), false), 777);
                break;
            case INTERMEDIATE_CPU:
                isAwaitingCpu = true;
                cpuTurnTimeout = setTimeout(() => activateCell(getCpuMoveIntermediate(), false), 555);
                break;
            case TRYHARD_CPU:
                isAwaitingCpu = true;
                cpuTurnTimeout = setTimeout(() => activateCell(getCpuMoveTryhard(), false), 333);
        }
    } else {
        matchInfoElement.textContent = "It is X's turn.";
        isAwaitingCpu = false;
    }
}
function playerHasWon(cellsOwned) { //returns true if the list of moves include a winning combination, otherwise false
    let i, z;
    for (i = 0; i < WIN_COMBOS.length; i++)
        if (cellsOwned.includes(WIN_COMBOS[i][0]) && cellsOwned.includes(WIN_COMBOS[i][1]) && cellsOwned.includes(WIN_COMBOS[i][2])) {
            for (z = 0; z < WIN_COMBOS[i].length; z++)
                cellElements[WIN_COMBOS[i][z]].className = "winning";
            return true;
        }
    return false;
}
function endGame(winner) {
    //stops game
    isGameActive = false;
    isAwaitingCpu = false;
    clearTimeout(cpuTurnTimeout);
    clearInterval(gameClockInterval);

    //update UI
    tbodyElement.className = UNPLAYABLE_CLASSNAME;

    console.log(`WINNER: ${winner} — GAME OVER`);
    if (winner === undefined) {
        matchInfoElement.textContent = "Match was ended.";
        restartButton.textContent = "Start";
    } else {
        matchInfoElement.textContent = `${winner} has won the match!`;
        winnerElement.textContent = winner;
        playAgainButton.hidden = false;
        restartButton.disabled = true;
        playAgainButton.focus();
    }
}
function startGame() {
    //wipe board content/styles
    tbodyElement.className = "";
    for (let i = 0; i < cellElements.length; i++) {
        cellElements[i].textContent = "";
        cellElements[i].className = "";
    }

    //game setup
    isOsTurn = Math.random() < 0.5;
    isGameActive = true;
    turnCount = 0;

    boardState = new Array(9);
    oCells = [];
    xCells = [];

    gameClockDuration = 0;
    gameClockInterval = setInterval(gameClockTick, 1000);

    //update UI
    restartButton.textContent = "Restart";
    playAgainButton.hidden = true;
    restartButton.disabled = false;

    gameClockSpan.textContent = "0:00:00";

    updateTurn();
}
function gameClockTick() {
    const ZERO_CHAR = "0";
    gameClockDuration++;
    let mins = gameClockDuration / 60 | 0;
    gameClockSpan.textContent = `${mins / 60 | 0}:${String(mins % 60).padStart(2, ZERO_CHAR)}:${String(gameClockDuration % 60).padStart(2, ZERO_CHAR)}`;
}
function handleRadioClick(event) {
    if (isGameActive) endGame();
    cpuMode = parseInt(event.target.dataset.number);
}

//cpu
function getCpuMoveSimple() { //returns a random playable cell
    let playableCells = [];
    for (let i = 0; i < boardState.length; i++)
        if (boardState[i] === undefined)
            playableCells.push(i);
    return playableCells[getRandomInteger(playableCells.length)];
}
function getCpuMoveIntermediate() { //returns a reasonably intelligent move
    const UNPLAYABLE_SCORE = -1;
    let cellScores = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    let cellId;
    let score;
    let i, z;

    for (i = 0; i < WIN_COMBOS.length; i++) {

        score = 0;
        for (z = 0; z < WIN_COMBOS[i].length; z++)
            switch (boardState[WIN_COMBOS[i][z]]) {
                case O_CHAR:
                    score += 100;
                    cellScores[WIN_COMBOS[i][z]] = UNPLAYABLE_SCORE;
                    break;
                case X_CHAR:
                    score++;
                    cellScores[WIN_COMBOS[i][z]] = UNPLAYABLE_SCORE;
                    break;
                default: //undefined/empty cell
                    score += 10;
                    cellId = WIN_COMBOS[i][z];
            }

        switch (score) {
            case 210: // O can WIN!!!!
                if (Math.random() < 0.05) //5% chance that CPU2 misses a chance to win
                    score = 0;
                else
                    return cellId;
                break;

            case 12: //imminent X win to block
                score = (Math.random() < 0.15) ? 0 : 1000; //15% chance that CPU2 misses an X win to block
                break;

            case 120: //O can set up win
                score = 100;
                break;
            case 21: //X can set up win
                score = 10;
                break;
            case 30: //empty combo
                score = 1;
                break;

            default://201,111,102
                continue;
        }

        for (z = 0; z < WIN_COMBOS[i].length; z++)
            if (cellScores[WIN_COMBOS[i][z]] !== UNPLAYABLE_SCORE)
                cellScores[WIN_COMBOS[i][z]] += score;

    }

    score = UNPLAYABLE_SCORE;
    for (let i = 0; i < cellScores.length; i++)
        if (cellScores[i] > score) {
            score = cellScores[i];
            cellId = i;
        }
    return cellId;
}
function getCpuMoveTryhard() { //returns a sweaty tryhard move (cant be won against)
    let forcedMove;
    let i;
    let possibleForks = [];

    switch (turnCount) {
        //turns 1,2,&9
        case 1:
            return getRandomCornerCell();
        case 2:
            if (xCells[0] === 4)
                return getRandomCornerCell();
            else
                return 4;
        case 9:
            for (i = 0; i < boardState.length; i++)
                if (boardState[i] === undefined)
                    return i;

        //win condition checks for turns 4&5-8
        case 5:
        case 6:
        case 7:
        case 8:
            forcedMove = findWinningMove(O_CHAR);
            if (forcedMove !== undefined)
                return forcedMove;
        //no break: fall-through
        case 4:
            forcedMove = findWinningMove(X_CHAR)
            if (forcedMove !== undefined)
                return forcedMove;
    }

    switch (turnCount) {
        case 3:
        case 5:
            let forks = (xCells[0] === 4) ? L_FORKS : V_FORKS;
            for (i = 0; i < forks.length; i++)
                if (forks[i].isPossible())
                    possibleForks.push(i);
            return forks[possibleForks[getRandomInteger(possibleForks.length)]].getNextMove();

        //as player 2, cpu3 plays to spitefully prevent X from setting up a win
        case 4: //if X attempts to fork, then force a cat's game
            if (oCells[0] === 4 && xCells[0] % 2 === 0 && xCells[1] % 2 === 0)
                return getRandomInteger(4) * 2 + 1; //(plays random odd cell)
        //no break: fall-through
        case 6:
            return getCpuMoveIntermediate(); //cpu2 conveniently prioritizes the perfect things for this scenario
        case 8: //no one can win, play at random
            return getCpuMoveSimple();
    }
}

//cpu util.
function getRandomInteger(bound) { //returns random integer between zero (inclusive) and bound (exclusive)
    return Math.random() * bound | 0;
}
function getRandomCornerCell() { //returns a random corner cell
    let cellId = getRandomInteger(4) * 2;
    return (cellId === 4) ? 8 : cellId;
}
function findWinningMove(player) { //returns a move that will win for the specified player, otherwise undefined
    let cellId;
    let score;
    let i, z;

    combosLoop:
    for (i = 0; i < WIN_COMBOS.length; i++) {

        score = 0
        for (z = 0; z < WIN_COMBOS[i].length; z++)
            switch (boardState[WIN_COMBOS[i][z]]) {
                case player:
                    score++;
                    break;
                case undefined:
                    cellId = WIN_COMBOS[i][z];
                    break;
                default:
                    continue combosLoop;
            }

        if (score === 2)
            return cellId;
    }

    return undefined;
}

//load event
document.addEventListener("DOMContentLoaded", () => {
    const CLICK_EVENT = "click";
    const RAD_INPUTS = document.querySelectorAll("input");

    tbodyElement = document.querySelector("tbody");
    cellElements = document.querySelectorAll("td");
    matchInfoElement = document.getElementById("match_info");
    winnerElement = document.getElementById("winner");
    restartButton = document.getElementById("restart_button");
    playAgainButton = document.getElementById("play_again_button");
    gameClockSpan = document.getElementById("game_clock");

    for (let i = 0; i < RAD_INPUTS.length; i++) { //rad inputs
        RAD_INPUTS[i].addEventListener(CLICK_EVENT, handleRadioClick)
        if (RAD_INPUTS[i].checked) cpuMode = parseInt(RAD_INPUTS[i].dataset.number);
    }
    for (let i = 0; i < cellElements.length; i++) //cell click events
        cellElements[i].addEventListener(CLICK_EVENT, () => activateCell(i, true));

    restartButton.addEventListener(CLICK_EVENT, () => {
        if (isGameActive) endGame();
        else startGame();
    });
    playAgainButton.addEventListener(CLICK_EVENT, startGame);
});