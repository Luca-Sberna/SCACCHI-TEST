
export function getKingPosition(board, color) {
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const piece = board[row][col];
            if (piece !== null && piece.type === "king" && piece.color === color) {
                return { row, col };
            }
        }
    }
    return null;
}

export function getAllOpponentMoves(board, color) {
    const opponentColor = color === "white" ? "black" : "white";
    let moves = [];

    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const piece = board[row][col];
            if (piece !== null && piece.color === opponentColor) {
                const pieceMoves = getPieceMoves(board, { row, col });
                moves = moves.concat(pieceMoves);
            }
        }
    }

    return moves;
}

export function getKingMoves(board, position) {
    const moves = [];
    const { row, col } = position;

    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            const newRow = row + i;
            const newCol = col + j;

            if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
                const piece = board[newRow][newCol];
                if (piece === null || piece.color !== board[row][col].color) {
                    moves.push({ from: position, to: { row: newRow, col: newCol } });
                }
            }
        }
    }

    return moves;
}

export function makeMove(board, move) {
    const { from, to } = move;
    const piece = board[from.row][from.col];

    board[to.row][to.col] = piece;
    board[from.row][from.col] = null;

    return board;
}

export function undoMove(board, move) {
    const { from, to } = move;
    const piece = board[to.row][to.col];

    board[from.row][from.col] = piece;
    board[to.row][to.col] = null;

    return board;
}

function getPieceMoves(board, position) {
    // Implementa la logica per ottenere i possibili movimenti di una specifica pedina
    // Questa funzione dovrebbe gestire i movimenti di tutti i tipi di pezzi (re, regina, torre, alfiere, cavallo, pedone)
}




// Funzione per verificare se il re è in scacco
export function isCheck() {
    // Ottieni la posizione del re
    const kingPosition = getKingPosition(); // Funzione da implementare

    // Ottieni tutte le possibili mosse dell'avversario
    const opponentMoves = getAllOpponentMoves(); // Funzione da implementare

    // Verifica se una delle mosse dell'avversario minaccia la posizione del re
    for (let move of opponentMoves) {
        if (move.to === kingPosition) {
            // Il re è in scacco
            return true;
        }
    }

    // Il re non è in scacco
    return false;
}
// Funzione per verificare se il re è in scacco matto
export function isCheckmate() {
    // Verifica se il re è in scacco
    if (isCheck()) {
        // Ottieni tutte le possibili mosse del re
        const kingMoves = getKingMoves(); // Funzione da implementare

        // Verifica se il re può spostarsi in una posizione sicura
        for (let move of kingMoves) {
            // Simula la mossa del re
            makeMove(move); // Funzione da implementare

            // Verifica se il re è ancora in scacco dopo la mossa
            if (!isCheck()) {
                // Il re ha una mossa sicura disponibile, quindi non è scacco matto
                undoMove(); // Annulla la mossa simulata
                return false;
            }

            // Annulla la mossa simulata per testare le altre possibili mosse
            undoMove();
        }

        // Se il re non può spostarsi in una posizione sicura, allora è scacco matto
        return true;
    }

    // Se il re non è in scacco, non può essere scacco matto
    return false;
}

