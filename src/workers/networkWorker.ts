import axios from "axios";
import { Chess, Move } from "chess.js";

export default class NetworkWorker {

    static networkWorker: NetworkWorker | null = null
    static getInstance(): NetworkWorker {
        if (NetworkWorker.networkWorker)
            return NetworkWorker.networkWorker

        NetworkWorker.networkWorker = new NetworkWorker()
        return NetworkWorker.networkWorker
    }


    intervals: { [user_id: string]: NodeJS.Timer }

    constructor() {
        this.intervals = {}
    }

    public async joinOnlineMatch(user_id: string, user_name: string, match_code: string): Promise<void> {
        return new Promise((res, rej) => {
            axios.post('http://localhost:3001/join', { match_code, user_id, user_name }, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(r => res())
                .catch(e => rej(e))
        })
    }

    public async createOnlineMatch(user_id: string, user_name: string, match_code: string): Promise<void> {
        return new Promise((res, rej) => {
            axios.post('http://localhost:3001/game', { match_code, user_id, user_name }, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(r => res())
                .catch(e => rej(e))

        })
    }

    public async sendMove(user_id: string, match_code: string, from: string, to: string, piece: string): Promise<void> {
        return new Promise((res, rej) => {
            axios.post('http://localhost:3001/move', { match_code, user_id, from, to, piece }, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(r => {
                    res()
                })
                .catch(e => {
                    rej(e)
                })
        })
    }

    public async poolForMove(userId: number, currGame: Chess, matchCode: string): Promise<Move> {
        return new Promise((res, rej) => {
            const interval = setInterval(() => {

            }, 1000)
            this.intervals[userId] = interval
        })
    }

    public subscribeToMove(user_id: string, match_code: string, subscriber: (from: string, to: string, piece: string) => void) {
        if (this.intervals["move#" + user_id])
            return
        this.intervals["move#" + user_id] = setInterval(() => {
            axios.get(`http://localhost:3001/pool/move?match_code=${match_code}&user_id=${user_id}`, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(res => {
                    const move = res.data.move ? { from: res.data.move.from, to: res.data.move.to, promotion: res.data.move.promotion, piece: res.data.move.piece } : undefined
                    if (move) {
                        //@ts-ignore
                        subscriber(move.from, move.to, move.piece)
                    }
                })
                .catch(e => {
                    console.log(e);
                })
        }, 5000)
    }

    public subscribeToGameCreated(user_id: string, match_code: string, subscriber: (opponent: { user_id: string, user_name: string }) => void) {
        if (this.intervals["game#" + user_id])
            return
        this.intervals["game#" + user_id] = setInterval(() => {
            axios.get(`http://localhost:3001/pool/gameCreated?match_code=${match_code}&user_id=${user_id}`, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(res => {
                    if (res.data.is_game_created) {
                        console.log("from networkWorker", res.data.oponent);

                        subscriber(res.data.oponent)
                    }
                })
                .catch(e => {
                    console.log(e);
                })
        }, 5000)
    }

    public async unsubscribeToMove(user_id: string): Promise<void> {
        return new Promise((res, rej) => {
            if (this.intervals["move#" + user_id]) {
                clearInterval(this.intervals["move#" + user_id])
                delete this.intervals["move#" + user_id]
            }
            res()
        })
    }

    public async unsubscribeToGameCreated(user_id: string): Promise<void> {
        return new Promise((res, rej) => {
            if (this.intervals["game#" + user_id]) {
                clearInterval(this.intervals["game#" + user_id])
                delete this.intervals["game#" + user_id]
            }
            res()
        })
    }


}