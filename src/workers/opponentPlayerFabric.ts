import OnlineOpponentPlayerWorker from "./onlineOpponentPlayerWorker";
import OpponentPlayer from "./opponentPlayer";
import RandomOpponentPlayerWorker from "./randomOpponentPlayerWorker";

export default class OpponentPlayerFabric {
    static produce(type: string) : OpponentPlayer {
        if(type === 'online')
            return new OnlineOpponentPlayerWorker()
        else
            return new RandomOpponentPlayerWorker()
    }
}