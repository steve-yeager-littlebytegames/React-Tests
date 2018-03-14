import React from 'react';
import Match from '../src/match.js'
import '../css/match.css';

export default class MatchComp extends React.Component {
    render() {
        const index = this.props.match.id;
        const namePrefix = "matches[" + index + "].";
        const matchCharPrefix = namePrefix + "matchCharacters[";

        return (
            <div className="match">
                <h4>Match {index + 1}</h4>
                <input type="hidden" name={matchCharPrefix + "0].leagueUserID"} value="26" />
                <input type="hidden" name={matchCharPrefix + "1].leagueUserID"} value="1" />

                <label className="match-input">
                    P1 Score
                    <input type="number" name={namePrefix + "player1score"} />
                </label>
                <label className="match-input">
                    P1 Character
                        <select name={matchCharPrefix + "0].characterID"}>
                        <option value="72">Mario</option>
                        <option value="73">Link</option>
                        <option value="93">Sonic</option>
                    </select>
                </label>
                <div className="input-break" />
                <label className="match-input">
                    P2 Score
                    <input type="number" name={namePrefix + "player2score"} />
                </label>
                <label className="match-input">
                    P2 Character
                        <select name={matchCharPrefix + "1].characterID"}>
                        <option value="72">Mario</option>
                        <option value="73">Link</option>
                        <option value="93">Sonic</option>
                    </select>
                </label>
                <div className="input-break" />
                <label className="match-input">
                    Stage
                    <select name={namePrefix + "stageID"} >
                        <option value="1">Final Destination</option>
                        <option value="6">Battlefield</option>
                        <option value="2">Smashville</option>
                    </select>
                </label>
                <button onClick={() => this.props.deleteMatch(index)}>Delete Match</button>
            </div >
        );
    }
}
