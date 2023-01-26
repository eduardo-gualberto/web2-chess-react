import React from "react";
import './Header.css';

type HeaderProps = {
    shouldShowBackIcon?: boolean
    backIconPath?: string
}

export default function Header(props: HeaderProps) {
    let backButton;
    if (props.shouldShowBackIcon) {
        backButton =
            <a href={props.backIconPath} id="back-icon">
                <span className="material-symbols-outlined">
                    arrow_back_ios
                </span>
            </a>
    } else {
        backButton = <></>
    }
    return (
        <div className="header">
            {backButton}
            Web2 Chess
        </div>
    )
}