import React, { Component, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PlayOnlineScene.css"
import codeStringGenerationWorker from "../../workers/codeStringGenerationWorker"
import axios from "axios";
import { useOnMount } from "../../common/helpers/functionalLifecycle";

export default function PlayOnlineScene() {
    const navigate = useNavigate()
    let [codeString, setCodeString] = useState('')
    let [inputCodeString, setInputCodeString] = useState('')

    useOnMount(() => {
        const generatedCodeString = codeStringGenerationWorker()
        setCodeString(generatedCodeString)
    })

    const clickedNewCodeButton = () => {
        const generatedCodeString = codeStringGenerationWorker()
        setCodeString(generatedCodeString)
    }

    const clickedCopyIcon = () => {
        navigator.clipboard.writeText(codeString)
    };


    const clickedStart = async () => {
        const match_code = codeString
        const user_id = codeStringGenerationWorker()
        const user_name = `user${user_id}`

        const res = await axios.post('http://localhost:3001/game', { match_code, user_id, user_name }, {
            headers: {
                "Content-Type": "application/json"
            }
        })

        navigate('/onlineGame', {
            state: {
                match_code, user_id, user_name, color: 'white'
            }
        })
    }

    const clickedJoin = async () => {
        const match_code = inputCodeString
        const user_id = codeStringGenerationWorker()
        const user_name = `user${user_id}`

        const res = await axios.post('http://localhost:3001/join', { match_code, user_id, user_name }, {
            headers: {
                "Content-Type": "application/json"
            }
        })


        navigate('/onlineGame', {
            state: {
                match_code, user_id, user_name, color: 'black'
            }
        })        
    }


    return (
        <div id="content-body-online">
            <div id="code-container-online">
                <div>
                    <span id="code-online">{codeString}</span>
                    <span className="material-symbols-outlined copy-icon" onClick={clickedCopyIcon}>
                        content_copy
                    </span>
                </div>
                <div id="action-btns-online">
                    <button id="start-btn-online" className="action-btn-online" onClick={clickedStart}>Começar</button>
                    <button id="new-btn-online" className="action-btn-online" onClick={clickedNewCodeButton}>Novo Código</button>
                </div>
                <div id="or-separator">ou</div>
                <div id="play-code-container">
                    <input type="text" name="play-code" id="play-code-input" value={inputCodeString} onChange={(e) => { setInputCodeString(e.target.value) }} />
                    <button id="play-code-button" onClick={clickedJoin}> Entrar</button>
                </div>
            </div>
        </div>
    )

}