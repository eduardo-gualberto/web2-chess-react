import OnlineOpponentPlayerWorker from "../../workers/OpponentPlayer/onlineOpponentPlayerWorker";
import OpponentPlayer from "../../workers/OpponentPlayer/opponentPlayer";
import RandomOpponentPlayerWorker from "../../workers/OpponentPlayer/randomOpponentPlayerWorker";

export default class OpponentPlayerFabric {
    static produce(type: string) : OpponentPlayer {
        if(type === 'online')
            return new OnlineOpponentPlayerWorker()
        else
            return new RandomOpponentPlayerWorker()
    }
}