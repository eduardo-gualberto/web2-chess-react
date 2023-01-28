import React, { useState } from "react";
import './HomeScene.css';
import Chessboard from "chessboardjsx";
import { isMobile } from 'react-device-detect';
import { Chess, Piece as ChessPiece, Square as ChessSquare } from "chess.js";
import { useOnMount } from "../../common/helpers/functionalLifecycle";

export default function HomeScene() {
    const game = new Chess();
    let [chessboardHeight, setChessboardHeight] = useState(0)

    useOnMount(() => {
        if (isMobile)
            setChessboardHeight((document.getElementById("chessboard")?.clientWidth as number) - 10)
        else
            setChessboardHeight((document.getElementById("chessboard")?.clientHeight as number) - 10)
    })

    return (
        <div id="content-body">
            <div id="chessboard">
                <Chessboard position='start' width={chessboardHeight} />
            </div>
            <div id="nav-bar">
                <a href="#" className="play-btn" id="alone">Jogar</a>
                <a href="/online" className="play-btn" id="online">Jogar Online</a>
            </div>
        </div>
    )
}