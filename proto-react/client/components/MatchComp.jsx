import React from 'react';
import Match from '../src/match.js'
import '../css/match.css';

export default class MatchComp extends React.Component {
    render() {
        const game = this.props.game;
        const match = this.props.match;
        const index = match.index;
        const namePrefix = "matches[" + index + "].";
        const matchCharPrefix = namePrefix + "matchCharacters[";

        const characters = game.characters.map(c => {
            <option value={c.id}>{c.name}</option>
        });

        return (
            <div className="match">
                <h4>Match {index + 1}</h4>
                <input type="hidden" name={matchCharPrefix + "0].leagueUserID"} value="26" />
                <input type="hidden" name={matchCharPrefix + "1].leagueUserID"} value="1" />

                <label className="match-input">
                    P1 Score
                    <input type="number" name={namePrefix + "player1score"} value={match.p1Score} onChange={event => this.props.updateScore(index, 1, event.target.value)} />
                </label>
                <label className="match-input">
                    P1 Character
                    <select name={matchCharPrefix + "0].characterID"} value={match.p1Characters[0]} onChange={event => this.props.updateCharacter(index, 1, event.target.value)}>
                        {characters}
                    </select>
                </label>
                <div className="input-break" />
                <label className="match-input">
                    P2 Score
                    <input type="number" name={namePrefix + "player2score"} value={match.p2Score} onChange={event => this.props.updateScore(index, 2, event.target.value)} />
                </label>
                <label className="match-input">
                    P2 Character
                    <select name={matchCharPrefix + "1].characterID"} value={match.p2Characters[0]} onChange={event => this.props.updateCharacter(index, 2, event.target.value)}>
                        <option value="72">Mario</option>
                        <option value="73">Link</option>
                        <option value="93">Sonic</option>
                    </select>
                </label>
                <div className="input-break" />
                <label className="match-input">
                    Stage
                    <select name={namePrefix + "stageID"} value={match.stage || ''} onChange={event => this.props.updateStage(index, event.target.value)}>
                        <option value="1">Final Destination</option>
                        <option value="6">Battlefield</option>
                        <option value="2">Smashville</option>
                    </select>
                </label>
                <div className="input-break" />
                <button type="button" onClick={() => this.props.deleteMatch(index)}>Delete Match</button>
            </div>
        );
    }
}
