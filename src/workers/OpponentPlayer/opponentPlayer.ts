export default interface OpponentPlayer {
    onMoveHandler?: (from: string, to: string, piece: string) => void,
    playerCreds?: { match_code?: string, user_id: string, user_name: string },
    start(creds: { match_code?: string, user_id: string, user_name: string }): void,
    stop(): void,
    onMove(handler: (from: string, to: string, piece: string) => void): void,
    onConnected(handler: (opponent: { user_id: string, user_name: string }) => void) : void
}