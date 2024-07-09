import React, { Component } from 'react';
import Hangman from './Hangman';
import { randomWord } from './words';
import './Game.css';
import Button from './Button';

class Game extends Component {
    static defaultProps = {
        keyboardLetters: Array.from({ length: 26 }, (el, i) => String.fromCharCode(97 + i)),
    };
    constructor(props) {
        super(props);
        const org = randomWord().split('');
        this.state = {
            numWrong: 0,
            word: [...org],
            lettersGuessed: [],
            remWord: [...org],
        };
        this.replay = this.replay.bind(this);
        this.guessLetter = this.guessLetter.bind(this);
    }
    replay() {
        const org = randomWord().split('');
        this.setState(st => ({
            numWrong: 0,
            word: [...org],
            lettersGuessed: [],
            remWord: [...org],
        }));
    }
    guessLetter(evt) {
        // const guessedLetter = letter;
        const guessedLetter = evt.target.innerText;
        const { word, lettersGuessed } = this.state;
        const isGuessed = lettersGuessed.includes(guessedLetter);
        const isCorrect = word.includes(guessedLetter);
        // console.log(letter);

        if (isGuessed) return null;
        if (isCorrect) {
            this.setState(st => ({
                numWrong: st.numWrong,
                remWord: st.remWord.filter(el => el !== guessedLetter),
                lettersGuessed: [...st.lettersGuessed, guessedLetter],
                word: st.word,
            }));
        } else {
            this.setState(st => ({
                numWrong: st.numWrong + 1,
                remWord: st.remWord,
                lettersGuessed: [...st.lettersGuessed, guessedLetter],
                word: st.word,
            }));
        }
    }
    render() {
        const { keyboardLetters } = this.props;
        const { numWrong, remWord, word, lettersGuessed } = this.state;
        let msg;
        if (numWrong > 5) msg = <h2>You lose! The word is "{word}".</h2>;
        if (remWord.length === 0 && numWrong < 6) msg = <h2>You win! Nice!</h2>;

        return (
            <div className="Game">
                <h1>Hangman Game!</h1>
                <Hangman numWrong={this.state.numWrong} />
                <div className="Game-word-container">
                    {word.map((letter, i) => (
                        <div className="Game-word-letter-container">
                            <h1 key={i} className={remWord.includes(letter) ? 'Game-word-letter-hide' : 'Game-word-letter'}>
                                {letter}
                            </h1>
                        </div>
                    ))}
                </div>
                <div className="Game-button-keys-container">
                    {keyboardLetters.map((letter, i) => (
                        <button key={i} onClick={this.guessLetter} className="Game-button-keys" disabled={lettersGuessed.includes(letter) || word.length === 0}>
                            {letter}
                        </button>
                    ))}
                </div>
                <div className="Game-message-container">{msg}</div>
                <button onClick={this.replay} className="Game-button-replay">
                    New game?
                </button>
            </div>
        );
    }
}

export default Game;
