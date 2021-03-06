import React from 'react';
import '../css/players.css';

export default class Players extends React.Component {
    render() {
        return (
            <div id="player-names">
                <span className="player-name">{this.props.player1}</span>
                <span className="player-versus">vs</span>
                <span className="player-name">{this.props.player2}</span>
            </div>);
    }
}
