import React, { Component } from "react";
import Chessboard from "chessboardjsx";
import { isMobile } from 'react-device-detect';
import Web2Chessboard from "../../common/components/Web2Chessboard/Web2Chessboard";
import "./PlayOnlineChessBoardScene.css";

type PlayOnlineChessBoardSceneState = {
    chessboardHeight: number
}

export default class PlayOnlineChessBoardScene extends Component {

    state: PlayOnlineChessBoardSceneState = {
        chessboardHeight: 0
    };

    componentDidMount(): void {
        this.setState({ chessboardHeight: (document.getElementById("chessboard")?.clientWidth as number) - 10 })
    }

    render(): React.ReactNode {
        const { chessboardHeight } = this.state
        return (
            <div id="content-body">
                <div id="chessboard">
                    <Web2Chessboard>
                        {({ position, onDrop }) => (
                            <Chessboard position={position} onDrop={onDrop} width={chessboardHeight} />
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
}
