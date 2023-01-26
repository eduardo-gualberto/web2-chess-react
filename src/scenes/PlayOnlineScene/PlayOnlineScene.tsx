import React from "react";
import "./PlayOnlineScene.css"


export default function PlayOnlineScene() {

    const clickedCopyIcon = () => {
        navigator.clipboard.writeText("HY7X89C")
    };

    return (
        <div id="content-body-online">
            <div id="code-container-online">
                <div>
                    <span id="code-online">HY7X89C</span>
                    <span className="material-symbols-outlined copy-icon" onClick={clickedCopyIcon}>
                        content_copy
                    </span>
                </div>
                <div id="action-btns-online">
                    <button id="start-btn-online" className="action-btn-online">Começar</button>
                    <button id="new-btn-online" className="action-btn-online">Novo Código</button>
                </div>
            </div>
        </div>
    )
}