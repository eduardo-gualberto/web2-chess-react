import React, { Component, useState } from "react";
import { Chess, Square } from "chess.js";

type Web2ChessboardChildrenProps = {
    position: string,
    onDrop: (obj: {
        sourceSquare: Square;
        targetSquare: Square;
    }) => void
}
type Web2ChessboardProps = {
    position: string,
    onFirstMove: () => void,
    children: (obj: Web2ChessboardChildrenProps) => React.ReactNode
}

type Web2ChessboardState = {
    position: string
}


export default class Web2Chessboard extends Component {
    game: Chess
    state: Web2ChessboardState
    isFirstMove: boolean

    constructor(public props: Web2ChessboardProps) {
        super(props)
        this.state = { position: props.position }
        this.game = new Chess()
        this.isFirstMove = true
    }

    onDrop = ({ sourceSquare, targetSquare }: { sourceSquare: Square, targetSquare: Square }) => {
        try {
            const move = this.game.move({
                from: sourceSquare,
                to: targetSquare,
                promotion: "q"
            });

            this.setState({ position: this.game.fen() })
            if (this.isFirstMove) {
                this.props.onFirstMove()
                this.isFirstMove = false
            }
        } catch (error) {
            return
        }
    }

    render(): React.ReactNode {
        const { position } = this.state, onDrop = this.onDrop
        return this.props.children({ position, onDrop })
    }
}