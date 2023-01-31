import { Chess, Move } from "chess.js";

export default class networkWorker {

    intervals: {[userId: string]: NodeJS.Timer}

    constructor() {
        this.intervals = {}
    }

    public async joinOnlineMatch(userId: number, matchCode: string): Promise<void> {
        return new Promise((res, rej) => {
            // 1. ask server to join match
            // 2. if successful then resolve else reject
        })
    }

    public async createOnlineMatch(userId: number, matchCode: string): Promise<void> {
        return new Promise((res, rej) => {
            // 1. send matchCode so the server can create a game instance
            // 2. if successful then resolve else reject
            // fetch.post(server + endpoit, { matchCode }, result => if result.data.success then resolve else reject)
        })
    }

    public async sendMove(userId: number, move: Move, matchCode: string): Promise<void> {
        return new Promise((res, rej) => {
            // 1. send move to the server so it can be registered
            // 2. if successful, resolve promise, else reject
            // fetch.post(server + endpoint, { userId, move, matchCode }, result => if result.data.success then res() else rej() )
        })
    }

    public async poolForMove(userId: number, currGame: Chess, matchCode: string): Promise<Move> {
        return new Promise((res, rej) => {
            const interval = setInterval(() => {
                // 1. ask server for new move
                // 2. if theres a new move, resolve the promise and clearInterval
                // 3. if any error, reject the promise and clear the user's interval
                // fetch.get(server + endpoint, result =>
                // if (result.data.newMove and result.data.moveActor equals userId) then res(result.data.newMove)
                // if result.error then reject(result.data.error), stopPoolForMove(userId)
                //)
            }, 1000)
            this.intervals[userId] = interval
        })
    }

    public async stopPoolForMove(userId: string): Promise<void> {
        return new Promise((res, rej) => {
            // clearInterval(this.intervals[userId])
            // delete this.intervals[userId]
            // res()
        })
    }
}