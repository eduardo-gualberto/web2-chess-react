import React, { Component, useState } from "react";
import "./PlayOnlineScene.css"
import codeStringGenerationWorker from "../../workers/codeStringGenerationWorker"
import { useOnMount } from "../../common/helpers/functionalLifecycle";

type PlayOnlineSceneState = {
    codeString: string
}

export default class PlayOnlineScene extends Component {

    state: PlayOnlineSceneState = {
        codeString: ''
    }

    constructor(props: any) {
        super(props)
    }

    componentDidMount(): void {
        this.setState({ codeString: codeStringGenerationWorker() })
    }

    clickedNewCodeButton = () => {
        const generatedCodeString = codeStringGenerationWorker()
        this.setState({codeString: codeStringGenerationWorker()})
    }

    clickedCopyIcon = () => {
        navigator.clipboard.writeText(this.state.codeString)
    };


    render() {
        const { codeString } = this.state
        return (
            <div id="content-body-online">
                <div id="code-container-online">
                    <div>
                        <span id="code-online">{codeString}</span>
                        <span className="material-symbols-outlined copy-icon" onClick={this.clickedCopyIcon}>
                            content_copy
                        </span>
                    </div>
                    <div id="action-btns-online">
                        <button id="start-btn-online" className="action-btn-online">Começar</button>
                        <button id="new-btn-online" className="action-btn-online" onClick={this.clickedNewCodeButton}>Novo Código</button>
                    </div>
                    <div id="or-separator">ou</div>
                    <div id="play-code-container">
                        <input type="text" name="play-code" id="play-code-input" />
                        <button id="play-code-button"> Entrar</button>
                    </div>
                </div>
            </div>
        )
    }
}