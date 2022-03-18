const NONE = 0;
const YELLOW = 1;
const RED = 2;

let turn = YELLOW;

let YellowWin = 0;
let RedWin = 0;

let board = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
];

function nextTurn(turn) {
    if (turn == YELLOW) {
        return RED;
    }
    if (turn == RED) {
        return YELLOW;
    }
}

function listLegal(board) {
    l = [];
    for (let j = 0; j < 7; j++) {
        let i = 5;
        while (i > 0 && board[i][j] != 0) {
            i -= 1;
        }
        if (board[i][j] == 0) {
            l.push(7 * i + j);
        } else {
            l.push(50);
        }
    }
    return l;
}

function isLegal(board, move) {
    if (listLegal(board).includes(move)) {
        return true;
    } else {
        return false;
    }
}

function hasWon(board, color) {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 6; j++) {
            if (board[j][i] == color && board[j][i + 1] == color && board[j][i + 2] == color && board[j][i + 3] == color) {
                return true;
            }
        }
    }
    for (let i = 0; i < 7; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[j][i] == color && board[j + 1][i] == color && board[j + 2][i] == color && board[j + 3][i] == color) {
                return true;
            }
        }
    }
    for (let j = 0; j < 3; j++) {
        for (let i = 0; i < 4; i++) {
            if (board[j][i] == color && board[j + 1][i + 1] == color && board[j + 2][i + 2] == color && board[j + 3][i + 3] == color) {
                return true;
            }
            if (board[j][6 - i] == color && board[j + 1][5 - i] == color && board[j + 2][4 - i] == color && board[j + 3][3 - i] == color) {
                return true;
            }
        }
    }
    return false;
}

function play(board, move) {
    if (turn == 0 || !listLegal(board).includes(move)) {
        document.getElementById("status").innerHTML = "ERREUR";
        turn = NONE;
        return 99;
    } else {
        board[Math.trunc(move / 7)][move % 7] = turn;
        document.getElementById("cell" + move).style.background = "center / contain #FFFFFF " + (turn == YELLOW ? "url('yellow.png')" : "url('red.png')") + " no-repeat";
        if (hasWon(board, turn)) {
            document.getElementById("status").innerHTML = "Le joueur " + (turn == YELLOW ? "JAUNE" : "ROUGE") + " a gagné !";
            if (turn == YELLOW){
                YellowWin = YellowWin + 1;
                document.getElementById("winYellow").innerHTML = YellowWin;
            }
            else {
                RedWin = RedWin + 1;
                document.getElementById("winRed").innerHTML = RedWin;
            }
            return turn;
        } else if (listLegal(board)[0] == 50 && listLegal(board)[1] == 50 && listLegal(board)[2] == 50 && listLegal(board)[3] == 50
            && listLegal(board)[4] == 50 && listLegal(board)[5] == 50 && listLegal(board)[6] == 50) {
            document.getElementById("status").innerHTML = "EGALITE";
            turn = NONE;
            return 3;
        } else {
            document.getElementById("status").innerHTML = "Cest au joueur " + (turn == YELLOW ? "ROUGE" : "JAUNE") + " de jouer.";
            turn = nextTurn(turn);
            return 0;
        }
    }
}

function getColumn(column) {
    let l = listLegal(board);
    if (l[column] != 50 && !hasWon(board, turn) && !hasWon(board, nextTurn(turn))) {
        if (board[0][column] === 0) {
            play(board, l[column]);
        }
    }
}

function reset() {
    board = [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
    ];    
    for (let index = 0; index < 42; index++) {
        document.getElementById("cell"+index).style.background = "#FFFFFF";        
    }
    turn = YELLOW;     
    document.getElementById("status").innerHTML = "Cest au joueur " + (turn == YELLOW ? "JAUNE" : "ROUGE") + " de jouer.";
}