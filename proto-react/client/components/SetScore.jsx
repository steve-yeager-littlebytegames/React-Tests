import React from 'react';
import '../css/set_score.css';

export default class SetScore extends React.Component {
    render() {
        return (
            <div id="set-score">
                <button onClick={() => this.props.scoreUpdate(1)}>+</button>
                <span className="player-score">{this.props.player1}</span>
                <span id="player-score-sep">-</span>
                <span className="player-score">{this.props.player2}</span>
                <button onClick={() => this.props.scoreUpdate(2)}>+</button>
            </div>
        );
    }
}
