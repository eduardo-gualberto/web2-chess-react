import React from "react";
import './Layout.css';

type LayoutProps = {
    header: JSX.Element,
    content: JSX.Element
}

export default function Layout(props: LayoutProps) {
    return (
        <div className="layout">
            <div className="header">{props.header}</div>
            <div className="content">{props.content}</div>
        </div>
    )
}