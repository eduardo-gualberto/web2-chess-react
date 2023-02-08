import NetworkWorker from "./networkWorker";
import OpponentPlayer from "./opponentPlayer";

export default class OnlineOpponentPlayerWorker implements OpponentPlayer {
    networkworker = NetworkWorker.getInstance()
    onGameCreatedHandler?: (opponent: { user_id: string, user_name: string }) => void
    onMoveHandler?: (from: string, to: string, piece: string) => void
    playerCreds?: { match_code: string, user_id: string, user_name: string }

    start(creds: { match_code: string, user_id: string, user_name: string }) {
        if (!this.onGameCreatedHandler || !this.onMoveHandler)
            throw Error("Both methods 'onConnected' and 'onMove' should be called before 'start'");
        this.playerCreds = creds
        this.networkworker.subscribeToGameCreated(creds.user_id, creds.match_code, this.onGameCreatedHandler)
        this.networkworker.subscribeToMove(creds.user_id, creds.match_code, this.onMoveHandler)
    }

    onConnected(handler: (opponent: { user_id: string, user_name: string }) => void) {
        this.onGameCreatedHandler = handler
    }

    onMove(handler: (from: string, to: string, piece: string) => void) {
        this.onMoveHandler = handler
    }

    stop() {
        if (!this.playerCreds)
            return
        this.networkworker.unsubscribeToGameCreated(this.playerCreds.user_id)
        this.networkworker.unsubscribeToMove(this.playerCreds.user_id)
    }
}