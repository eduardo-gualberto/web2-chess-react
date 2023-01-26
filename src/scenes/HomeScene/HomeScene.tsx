import React from "react";
import './HomeScene.css';
import chessboard from './assets/chessboard.png';

export default function HomeScene() {

    return (
        <div id="content-body">
            <div id="chessboard">
                <img id="chessboard-img" src={chessboard} />
            </div>
            <div id="nav-bar">
                <a href="#" className="play-btn" id="alone">Jogar</a>
                <a href="/online" className="play-btn" id="online">Jogar Online</a>
            </div>
        </div>
    )
}