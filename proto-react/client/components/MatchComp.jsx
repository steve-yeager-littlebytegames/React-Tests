import React from 'react';
import Match from '../src/match.js'

export default class MatchComp extends React.Component {
    render() {
        const id = this.props.match.id;

        return (
            <div>
                <div>
                    <span>P1 Score</span>
                    <input type="number" />
                </div>
                <div>
                    <span>P1 Character</span>
                    <select defaultValue="1" onChange={event => console.log(event.target.value)}>
                        <option value="0">Mario</option>
                        <option value="1">Link</option>
                        <option>Sonic</option>
                    </select>
                </div>

                <div>
                    <span>P2 Score</span>
                    <input type="number" />
                </div>
                <div>
                    <span>P2 Character</span>
                    <select>
                        <option>Mario</option>
                        <option>Link</option>
                        <option>Sonic</option>
                    </select>
                </div>

                <div>
                    <span>Stage</span>
                    <select>
                        <option>Final Destination</option>
                        <option>Battlefield</option>
                        <option>Smashville</option>
                    </select>
                </div>

                <button onClick={() => this.props.deleteMatch(id)}>Delete Match</button>
            </div>
        );
    }
}
