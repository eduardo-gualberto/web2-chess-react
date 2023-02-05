import React, { Component, useEffect, useState } from "react";
import Chessboard from "chessboardjsx";
import { isMobile } from 'react-device-detect';
import Web2Chessboard from "../../common/components/Web2Chessboard/Web2Chessboard";
import "./PlayOnlineChessBoardScene.css";
import { useOnMount, useOnUnmount } from "../../common/helpers/functionalLifecycle";
import { useLocation } from "react-router-dom";
import axios from "axios";

type PlayOnlineChessBoardSceneLocationState = {
    match_code: string,
    user_id: string,
    user_name: string,
    color: 'white' | 'black'
}

const poolForOponentMove = (match_code: string, user_id: string, onMove: (move: { from: string, to: string, pomotion: string }) => void) => {
    // clearInterval(poolOponentMoveInterval)
    // poolOponentMoveInterval = setInterval(() => {
    const interval = setInterval(() => {
        // console.log("pooling for oponents move...");
        axios.get(`http://localhost:3001/pool/move?match_code=${match_code}&user_id=${user_id}`, {
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => {
                const move = res.data.move ? { from: res.data.move.from, to: res.data.move.to, promotion: res.data.move.promotion } : undefined
                if (move) {
                    
                    //@ts-ignore
                    onMove(move)
                    // clearInterval(interval)
                }
            })
            .catch(e => {
                console.log(e);
            })
    }, 5000)
}


const poolForGameCreated = (match_code: string, user_id: string, onCreated: (oponent: { user_id: string, user_name: string }) => void) => {
    // clearInterval(poolGameCreatedInterval)
    // poolGameCreatedInterval = setInterval(() => {
    const interval = setInterval(() => {
        axios.get(`http://localhost:3001/pool/gameCreated?match_code=${match_code}`, {
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => {
                if (res.data.is_game_created) {
                    // console.log("game created");
                    
                    clearInterval(interval)
                    onCreated(res.data.oponent)
                }
            })
            .catch(e => {
                // console.log(e);
            })
    }, 5000)
}

function blacksNetWorkSetUp(match_code: string, user_id: string, onMove: (move: { from: string, to: string, pomotion: string }) => void, onCreated: (oponent: { user_id: string, user_name: string }) => void) {
    // poolForGameCreated(match_code, user_id, ({ user_id, user_name }) => {
    //     onCreated({ user_id, user_name })
    // })
    poolForOponentMove(match_code, user_id, onMove)
}

function whitesNetWorkSetUp(match_code: string, user_id: string, onMove: (move: { from: string, to: string, pomotion: string }) => void, onCreated: (oponent: { user_id: string, user_name: string }) => void) {
    // poolForGameCreated(match_code, user_id, ({ user_id, user_name }) => {
    //     onCreated({ user_id, user_name })
    // })
    poolForOponentMove(match_code, user_id, onMove)
}


// TODO: acertar logica que permita melhor diferenciação entre brancas e pretas e suas conexoes com o server
export default function PlayOnlineChessBoardScene() {
    const location = useLocation()
    const { match_code, user_id, user_name, color } = location.state as PlayOnlineChessBoardSceneLocationState
    const [chessboardHeight, setChessboardHeight] = useState(0)
    const [gameCreated, setGameCreated] = useState(false)
    const [oponent, setOponent] = useState({ user_id: '', user_name: '' })
    let poolGameCreatedInterval: any
    let poolOponentMoveInterval: any
    let chessBoardRef: Web2Chessboard | null
    let isItMyTurn: boolean

    useOnMount(() => {
        if (isMobile) {
            setChessboardHeight((document.getElementById("chessboard")?.clientWidth as number) - 10)
        } else {
            setChessboardHeight((document.getElementById("chessboard")?.clientHeight as number) - 10)
        }

        if (color === 'white') {
            whitesNetWorkSetUp(match_code, user_id, ({ from, to }) => {
                const event = new CustomEvent("move", {detail: {from, to}})
                document.dispatchEvent(event)
                console.log("dispatched event move");

            }, ({ user_id, user_name }) => {
                console.log("game created");
                
            })
        } else {
            blacksNetWorkSetUp(match_code, user_id, ({ from, to }) => {                
                const event = new CustomEvent("move", {detail: {from, to}})
                document.dispatchEvent(event)
                console.log("dispatched event move");
                
            }, ({ user_id, user_name }) => {
                console.log("game created");
                
            })

        }
    })

    const sendMove = ({ sourceSquare, targetSquare }: { sourceSquare: string, targetSquare: string }) => {
        axios.post('http://localhost:3001/move', { match_code, user_id, from: sourceSquare, to: targetSquare }, {
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => {
                console.log(res.data);
            })
            .catch(e => {
                // console.log(e)
            })
    }

    return (
        <div id="content-body">
            <div id="chessboard">
                <Web2Chessboard position="start" onFirstMove={() => { }}>
                    {({ position, onDrop }) => {
                        return (
                            <Chessboard position={position} onDrop={({ sourceSquare, targetSquare, piece }) => {
                                sendMove({ sourceSquare, targetSquare })
                                onDrop({ sourceSquare, targetSquare })
                            }} width={chessboardHeight} orientation={color} />
                        )
                    }}
                </Web2Chessboard>
            </div>
            <div id="nav-bar">
                <a href="#" className="play-btn" id="alone">Jogar</a>
                <a href="/online" className="play-btn" id="online">Jogar Online</a>
            </div>
        </div>
    )

}
