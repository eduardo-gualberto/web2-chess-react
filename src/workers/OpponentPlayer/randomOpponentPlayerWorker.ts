import { Chess, Move } from "chess.js";
import OpponentPlayer from "./opponentPlayer";

export default class RandomOpponentPlayerWorker implements OpponentPlayer {
    playerCreds?: { match_code?: string; user_id: string; user_name: string; }
    onMoveHandler?: ((from: string, to: string, piece: string) => void)
    clientOnMoveHandler?: ((from: string, to: string, piece: string) => void)
    playerColor = 'w'
    game = new Chess()

    constructor() {
    }

    onConnected(handler: (opponent: { user_id: string; user_name: string; }) => void): void {
    }

    start(creds: { match_code?: string; user_id: string; user_name: string; }): void {
        if (!this.onMoveHandler)
            throw new Error("Method 'onMove' should be called before 'start'");
        document.addEventListener("__move", (e) => {
            //@ts-ignore
            const { sourceSquare: from, targetSquare: to, piece } = e.detail as { sourceSquare: string, targetSquare: string, piece: string }
            //@ts-ignore
            console.log(`RandomOpponentPlayerWorker received __move with ${e.detail}`);

            if (piece[0] == this.playerColor) {
                this.game.move({ from, to })
                this.makeMove(3000)
            }
        })
    }

    stop(): void {
    }

    onMove(handler: (from: string, to: string, piece: string) => void): void {
        this.onMoveHandler = handler
    }

    makeMove(afterMs: number) {
        const randomMove = this.getRandomMove()
        setTimeout(() => {
            this.game.move(randomMove)
            this.sendMoveEvent(randomMove)
        }, afterMs)
    }

    sendMoveEvent(move: Move) {
        const event = new CustomEvent("__move", { detail: { from: move.from, to: move.to, piece: move.color + move.piece } })
        document.dispatchEvent(event)
    }

    getRandomMove() {
        const moves = this.game.moves({ verbose: true })
        const rand = Math.floor(Math.random() * moves.length)
        return moves[rand]
    }

}