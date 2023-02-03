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
            isItMyTurn = true
            poolForGameCreated()
            console.log("sou brancas");
            
        } else {
            isItMyTurn = false
            poolForOponentMove()
            console.log("sou pretas");
            
        }
    })

    useOnUnmount(() => {
        clearInterval(poolOponentMoveInterval)
    })

    const poolForGameCreated = () => {
        clearInterval(poolGameCreatedInterval)
        poolGameCreatedInterval = setInterval(() => {
            axios.get(`http://localhost:3001/pool/gameCreated?match_code=${match_code}`, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(res => {
                    if (res.data.is_game_created) {
                        setGameCreated(true)
                        setOponent(res.data.oponent)
                        clearInterval(poolGameCreatedInterval)
                    }
                })
                .catch(e => {
                    // console.log(e);
                })
        }, 1000)
    }

    const poolForOponentMove = () => {
        clearInterval(poolOponentMoveInterval)
        poolOponentMoveInterval = setInterval(() => {
            console.log("pooling for oponents move...");
            axios.get(`http://localhost:3001/pool/move?match_code=${match_code}&user_id=${user_id}`, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(res => {
                    const move = res.data.move ? { from: res.data.move.from, to: res.data.move.to, promotion: res.data.move.promotion } : undefined
                    if (move) {
                        chessBoardRef?.onDrop({ sourceSquare: move.from, targetSquare: move.to })
                    }
                })
                .catch(e => {
                    // console.log(e);
                })
        }, 1000)
    }

    const sendMove = ({ sourceSquare, targetSquare }: { sourceSquare: string, targetSquare: string }) => {
        axios.post('http://localhost:30001/move', { match_code, user_id, from: sourceSquare, to: sourceSquare }, {
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => {
                console.log(res.data.gameOver);
            })
            .catch(e => {
                // console.log(e)
            })
    }

    return (
        <div id="content-body">
            <div id="chessboard">
                <Web2Chessboard position="start" onFirstMove={() => {
                        poolForOponentMove()
                }} ref={el => chessBoardRef = el}>
                    {({ position, onDrop }) => {
                        return (
                            <Chessboard position={position} onDrop={({ sourceSquare, targetSquare, piece }) => {
                                if (isItMyTurn)
                                    sendMove({ sourceSquare, targetSquare })
                                isItMyTurn = !isItMyTurn
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
