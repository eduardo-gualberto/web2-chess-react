import React, { useState } from "react";
import './HomeScene.css';
import Chessboard from "chessboardjsx";
import { isMobile } from 'react-device-detect';
import { useOnMount } from "../../common/helpers/functionalLifecycle";
import Web2Chessboard from "../../common/components/Web2Chessboard/Web2Chessboard";

export default function HomeScene() {
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
                <Web2Chessboard>
                    {({ position, onDrop }) => (
                        <Chessboard position={position} onDrop={onDrop} width={chessboardHeight}/>
                    )}
                </Web2Chessboard>
            </div>
            <div id="nav-bar">
                <a href="#" className="play-btn" id="alone">Jogar</a>
                <a href="/online" className="play-btn" id="online">Jogar Online</a>
            </div>
        </div>
    )
}