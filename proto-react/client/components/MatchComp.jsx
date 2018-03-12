import React from 'react';
import Match from '../src/match.js'

export default class MatchComp extends React.Component {
    render() {
        const id = this.props.match.id;
        const message = this.props.match.message();

        return (
            <div>
                <span>{message}</span>
                <button onClick={() => this.props.deleteMatch(id)}>x</button>
            </div>
        );
    }
}
