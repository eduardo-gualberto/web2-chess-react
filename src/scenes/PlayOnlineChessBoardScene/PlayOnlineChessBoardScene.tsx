import React, { useState } from "react";
import Chessboard from "chessboardjsx";
import { isMobile } from 'react-device-detect';
import Web2Chessboard from "../../common/components/Web2Chessboard/Web2Chessboard";
import "./PlayOnlineChessBoardScene.css";
import { useOnMount, useOnUnmount } from "../../common/helpers/functionalLifecycle";
import { useLocation } from "react-router-dom";
import NetworkWorker from "../../workers/networkWorker";
import UserChessboardCard from "../../common/components/UserChessboardCard/UserChessboardCard";

type PlayOnlineChessBoardSceneLocationState = {
    match_code: string,
    user_id: string,
    user_name: string,
    color: 'white' | 'black'
}

// TODO: acertar logica que permita melhor diferenciação entre brancas e pretas e suas conexoes com o server
export default function PlayOnlineChessBoardScene() {
    const location = useLocation()
    const networkWorker = NetworkWorker.getInstance()
    const { match_code, user_id, user_name, color } = location.state as PlayOnlineChessBoardSceneLocationState
    const [chessboardHeight, setChessboardHeight] = useState(0)
    const [oponent, setOponent] = useState({ user_id: '', user_name: 'Oponnent' })

    networkWorker.subscribeToGameCreated(user_id, match_code, ({ user_id, user_name }) => {
        networkWorker.unsubscribeToGameCreated(user_id)
        setOponent({ user_id, user_name })
    })

    networkWorker.subscribeToMove(user_id, match_code, (from, to) => {
        const event = new CustomEvent("move", { detail: { from, to } })
        document.dispatchEvent(event)
    })

    useOnMount(() => {
        if (isMobile) {
            setChessboardHeight((document.getElementById("chessboard")?.clientWidth as number) - 10)
        } else {
            setChessboardHeight((document.getElementById("chessboard")?.clientHeight as number) - 10)
        }
    })

    useOnUnmount(() => {
        networkWorker.unsubscribeToMove(user_id)
        networkWorker.unsubscribeToGameCreated(user_id)
    })

    const sendMove = ({ sourceSquare, targetSquare }: { sourceSquare: string, targetSquare: string }) => {
        networkWorker.sendMove(user_id, match_code, sourceSquare, targetSquare)
            .then(r => { })
            .catch(e => console.log(e))
    }

    const navBarIfDesktop = () => {
        return (
            !isMobile ?
                <div id="nav-bar-game">
                    <UserChessboardCard isCurrentUser={false} user_id={oponent.user_id} user_name={oponent.user_name} />
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
            {userChessboardCardIfMobile(false, oponent.user_id, oponent.user_name)}
            <div id="chessboard">
                <Web2Chessboard position="start" onFirstMove={() => { }}>
                    {({ position, onDrop }) => {
                        return (
                            <Chessboard position={position} onDrop={({ sourceSquare, targetSquare, piece }) => {
                                const playersColor = color[0], movedPieceColor = piece[0]
                                if (playersColor === movedPieceColor) {
                                    sendMove({ sourceSquare, targetSquare })
                                    onDrop({ sourceSquare, targetSquare })
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
