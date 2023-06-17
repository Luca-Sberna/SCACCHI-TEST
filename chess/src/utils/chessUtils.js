// Funzione per verificare se il re di un giocatore è sotto scacco
export const isKingInCheck = (state, player) => {
    const kingPosition = findKingPosition(state, player);
    const opponentPieces = Object.values(state.pieces).filter((piece) => piece.player !== player);

    for (const piece of opponentPieces) {
        const piecePosition = Object.entries(state.pieces).find(([position, p]) => p === piece)[0];
        if (canMove(piece, piecePosition, kingPosition, state.pieces)) {
            return true;
        }
    }

    return false;
};

// Funzione per trovare la posizione del re di un giocatore
export const findKingPosition = (state, player) => {
    const king = Object.values(state.pieces).find((piece) => piece.type === 'king' && piece.player === player);
    return king ? Object.entries(state.pieces).find(([position, p]) => p === king)[0] : null;
};

// Funzione per verificare se il re di un giocatore è sotto scacco matto
export const isCheckmate = (state, player) => {
    const kingPosition = findKingPosition(state, player);
    const king = state.pieces[kingPosition];
    const opponentPieces = Object.values(state.pieces).filter((piece) => piece.player !== player);

    // Prova tutte le possibili mosse del re
    for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
            if (dx !== 0 || dy !== 0) {
                const targetPosition = [kingPosition[0] + dx, kingPosition[1] + dy];
                if (canMove(king, kingPosition, targetPosition, state.pieces) && !isKingInCheck(state, player)) {
                    return false; // Il re può muoversi in una posizione sicura
                }
            }
        }
    }

    // Prova tutte le possibili mosse delle altre pedine avversarie
    for (const piece of opponentPieces) {
        const piecePosition = Object.entries(state.pieces).find(([position, p]) => p === piece)[0];
        for (let rank = 0; rank < 8; rank++) {
            for (let file = 0; file < 8; file++) {
                const targetPosition = [rank, file];
                if (canMove(piece, piecePosition, targetPosition, state.pieces) && !isKingInCheck(state, player)) {
                    return false; // C'è almeno una mossa sicura disponibile
                }
            }
        }
    }

    return true; // Nessuna mossa sicura disponibile, scacco matto
};
// Funzione ausiliaria per determinare se una pedina può effettuare una mossa valida
const canMove = (piece, fromPosition, toPosition, pieces) => {
    const currentPlayer = pieces[fromPosition].player;

    // Implementa la logica per verificare la validità della mossa per la pedina specifica
    // Utilizza le funzioni canMovePawn, canMoveRook, canMoveKnight, canMoveBishop, canMoveQueen, canMoveKing, ecc.

    if (piece === 'pawn') {
        return canMovePawn(fromPosition, toPosition, pieces);
    } else if (piece === 'rook') {
        return canMoveRook(fromPosition, toPosition, pieces);
    } else if (piece === 'knight') {
        return canMoveKnight(fromPosition, toPosition, pieces);
    } else if (piece === 'bishop') {
        return canMoveBishop(fromPosition, toPosition, pieces);
    } else if (piece === 'queen') {
        return canMoveQueen(fromPosition, toPosition, pieces);
    } else if (piece === 'king') {
        return canMoveKing(fromPosition, toPosition, pieces);
    }

    return false;
};

const canMoveRook = (fromPosition, toPosition, board, currentPlayer) => {
    const [fromX, fromY] = fromPosition;
    const [toX, toY] = toPosition;

    if (fromX === toX || fromY === toY) {
        // Verifica che non ci siano pedine nel percorso orizzontale o verticale
        // Implementa la logica per controllare le pedine tra le due posizioni

        const pieceAtDestination = board[toX][toY];
        if (!pieceAtDestination || pieceAtDestination.player !== currentPlayer) {
            return true;
        }
    }
    return false;

};


const canMoveBishop = (fromPosition, toPosition, board, currentPlayer) => {
    const [fromX, fromY] = fromPosition;
    const [toX, toY] = toPosition;

    const dx = Math.abs(fromX - toX);
    const dy = Math.abs(fromY - toY);

    if (dx === dy) {
        // Verifica che non ci siano pedine nel percorso diagonale
        // Implementa la logica per controllare le pedine tra le due posizioni

        const pieceAtDestination = board[toX][toY];
        if (!pieceAtDestination || pieceAtDestination.player !== currentPlayer) {
            return true;
        }
    }
    return false;
};

const canMoveQueen = (fromPosition, toPosition, board, currentPlayer) => {
    if (canMoveRook(fromPosition, toPosition, board) || canMoveBishop(fromPosition, toPosition, board)) {
        const pieceAtDestination = board[toPosition[0]][toPosition[1]];
        if (!pieceAtDestination || pieceAtDestination.player !== currentPlayer) {
            return true;
        }
    }
    return false;
};

const canMoveKing = (fromPosition, toPosition, board, currentPlayer) => {
    const [fromX, fromY] = fromPosition;
    const [toX, toY] = toPosition;

    const dx = Math.abs(fromX - toX);
    const dy = Math.abs(fromY - toY);

    if ((dx === 1 && dy === 0) || (dx === 0 && dy === 1) || (dx === 1 && dy === 1)) {
        const pieceAtDestination = board[toX][toY];
        if (!pieceAtDestination || pieceAtDestination.player !== currentPlayer) {
            return true;
        }
    }
    return false;
};

const canMovePawn = (fromPosition, toPosition, board, currentPlayer) => {
    const [fromX, fromY] = fromPosition;
    const [toX, toY] = toPosition;

    const dx = toX - fromX;
    const dy = toY - fromY;

    if (dx === 1 && dy === 0) {
        const pieceAtDestination = board[toX][toY];
        if (!pieceAtDestination || pieceAtDestination.player !== currentPlayer) {
            return true;
        }
    }
    return false;
};

const canMoveKnight = (fromPosition, toPosition, board, currentPlayer) => {
    const [fromX, fromY] = fromPosition;
    const [toX, toY] = toPosition;

    const dx = Math.abs(fromX - toX);
    const dy = Math.abs(fromY - toY);

    if ((dx === 2 && dy === 1) || (dx === 1 && dy === 2)) {
        const pieceAtDestination = board[toX][toY];
        if (!pieceAtDestination || pieceAtDestination.player !== currentPlayer) {
            return true;
        }
    }
    return false;
};
