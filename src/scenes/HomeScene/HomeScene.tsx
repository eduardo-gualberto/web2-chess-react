import React, { useState } from "react";
import './HomeScene.css';
import Chessboard from "chessboardjsx";
import { isMobile } from 'react-device-detect';
import { useOnMount } from "../../common/helpers/functionalLifecycle";
import Web2Chessboard from "../../common/components/Web2Chessboard/Web2Chessboard";
import { useNavigate } from "react-router-dom";
import codeStringGenerationWorker from "../../workers/codeStringGenerationWorker";

export default function HomeScene() {
    const navigate = useNavigate()
    let [chessboardHeight, setChessboardHeight] = useState(0)

    useOnMount(() => {
        if (isMobile)
            setChessboardHeight((document.getElementById("chessboard")?.clientWidth as number) - 10)
        else
            setChessboardHeight((document.getElementById("chessboard")?.clientHeight as number) - 10)
    })

    const clickedPlay = () => {
        const user_id = codeStringGenerationWorker()
        const user_name = `user${user_id}`
        navigate('/onlineGame', {
            state: {
                user_id, user_name, color: 'white', type: 'random'
            }
        })
    }

    return (
        <div id="content-body">
            <div id="chessboard">
                <Web2Chessboard position="start" onFirstMove={() => { }}>
                    {({ position, onDrop }) => (
                        <Chessboard position={position} onDrop={onDrop} width={chessboardHeight} />
                    )}
                </Web2Chessboard>
            </div>
            <div id="nav-bar">
                <button className="play-btn" id="alone" onClick={clickedPlay}>Jogar</button>
                <a href="/online" className="play-btn" id="online">Jogar Online</a>
            </div>
        </div>
    )
}