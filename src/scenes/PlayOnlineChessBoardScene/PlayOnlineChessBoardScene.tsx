import React, { useState } from "react";
import Chessboard from "chessboardjsx";
import { isMobile } from 'react-device-detect';
import Web2Chessboard from "../../common/components/Web2Chessboard/Web2Chessboard";
import "./PlayOnlineChessBoardScene.css";
import { useOnMount, useOnUnmount } from "../../common/helpers/functionalLifecycle";
import { useLocation } from "react-router-dom";
import NetworkWorker from "../../workers/networkWorker";
import UserChessboardCard from "../../common/components/UserChessboardCard/UserChessboardCard";
import OpponentPlayerFabric from "../../common/helpers/opponentPlayerFabric";
import moveSenderOfType from "../../common/helpers/moveSenderOfType";

type PlayOnlineChessBoardSceneLocationState = {
    match_code?: string,
    user_id: string,
    user_name: string,
    color: 'white' | 'black',
    type: 'online' | 'random'
}

export default function PlayOnlineChessBoardScene() {
    const location = useLocation()
    const { match_code, user_id, user_name, color, type } = location.state as PlayOnlineChessBoardSceneLocationState
    const opponentPlayer = OpponentPlayerFabric.produce(type)
    const networkWorker = NetworkWorker.getInstance()
    const [chessboardHeight, setChessboardHeight] = useState(0)
    const [opponent, setOpponent] = useState({ user_id: '', user_name: 'Oponnent' })
    const moveSender = moveSenderOfType(type, user_id, match_code!)


    opponentPlayer.onMove((from, to, piece) => {
        const event = new CustomEvent("move", { detail: { from, to, piece } })
        document.dispatchEvent(event)
    })

    opponentPlayer.onConnected(({ user_id, user_name }) => {
        networkWorker.unsubscribeToGameCreated(user_id)
        setOpponent({ user_id, user_name })
    })

    opponentPlayer.start({ match_code, user_id, user_name })

    useOnMount(() => {
        if (isMobile) {
            setChessboardHeight((document.getElementById("chessboard")?.clientWidth as number) - 10)
        } else {
            setChessboardHeight((document.getElementById("chessboard")?.clientHeight as number) - 10)
        }
    })

    useOnUnmount(() => {
        opponentPlayer.stop()
    })

    const navBarIfDesktop = () => {
        return (
            !isMobile ?
                <div id="nav-bar-game">
                    <UserChessboardCard isCurrentUser={false} user_id={opponent.user_id} user_name={opponent.user_name} />
                    <UserChessboardCard isCurrentUser={true} user_id={user_id} user_name={user_name} />
                </div>
                : <></>
        )
    }

    const userChessboardCardIfMobile = (isCurrentUser: boolean, user_id: string, user_name: string) => {
        return (
            isMobile ?
                <UserChessboardCard isCurrentUser={isCurrentUser} user_id={user_id} user_name={user_name} />
                : <></>
        )
    }


    return (
        <div id="content-body">
            {userChessboardCardIfMobile(false, opponent.user_id, opponent.user_name)}
            <div id="chessboard">
                <Web2Chessboard position="start" onFirstMove={() => { }}>
                    {({ position, onDrop }) => {
                        return (
                            <Chessboard position={position} onDrop={({ sourceSquare, targetSquare, piece }) => {
                                const playersColor = color[0], movedPieceColor = piece[0]
                                if (playersColor === movedPieceColor) {
                                    moveSender({ sourceSquare, targetSquare, piece })
                                    onDrop({ sourceSquare, targetSquare, piece })
                                }
                            }} width={chessboardHeight} orientation={color} />
                        )
                    }}
                </Web2Chessboard>
            </div>
            {userChessboardCardIfMobile(true, user_id, user_name)}
            {navBarIfDesktop()}

        </div>
    )
}
