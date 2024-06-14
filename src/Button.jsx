import React, { Component } from "react";
import "./Button.css"

class Button extends Component {
    constructor(props) {
        super(props);
        this.handleGuessLetter = this.handleGuessLetter.bind(this);
    }
    handleGuessLetter(evt) {
        this.props.whenClicked(evt.target.innerText);
    }
    render() {
        return (
            <button onClick={this.handleGuessLetter}>{ this.props.value}</button>
        )
    }
}

export default Button;