import React from 'react';
import Match from '../src/match.js'

export default class MatchComp extends React.Component {
    render() {
        const index = this.props.match.id;
        const namePrefix = "matches[" + index + "].";
        const matchCharPrefix = namePrefix + "matchCharacters[";

        return (
            <div>
                <div>
                    <label>
                        P1 Score
                    <input type="number" name={namePrefix + "player1score"} />
                    </label>
                </div>
                <div>
                    <input type="hidden" name={matchCharPrefix + "0].leagueUserID"} value="26" />
                    <span>P1 Character</span>
                    <select name={matchCharPrefix + "0].characterID"}>
                        <option value="72">Mario</option>
                        <option value="73">Link</option>
                        <option value="93">Sonic</option>
                    </select>
                </div>

                <div>
                    <span>P2 Score</span>
                    <input type="number" name={namePrefix + "player2score"} />
                </div>
                <div>
                    <input type="hidden" name={matchCharPrefix + "1].leagueUserID"} value="1" />
                    <span>P2 Character</span>
                    <select name={matchCharPrefix + "1].characterID"}>
                        <option value="72">Mario</option>
                        <option value="73">Link</option>
                        <option value="93">Sonic</option>
                    </select>
                </div>

                <div>
                    <label>
                        Stage
                        <select name={namePrefix + "stageID"} >
                            <option value="1">Final Destination</option>
                            <option value="6">Battlefield</option>
                            <option value="2">Smashville</option>
                        </select>
                    </label>
                </div>

                <button onClick={() => this.props.deleteMatch(index)}>Delete Match</button>
            </div >
        );
    }
}
