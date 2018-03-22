import React from 'react';
import MatchSummary from './MatchSummary.jsx'

export default class MatchForm extends React.Component {
    render() {
        const matchSummaries = this.props.matches.map(m =>
            <MatchSummary key={m.index}
                match={m}
                game={this.props.game}
                onSelect={this.props.onMatchSelect} />
        );

        return (
            <form onSubmit={this.props.onSubmit}>
                <input type="hidden" name="id" value={this.props.id} />
                {matchSummaries}
                <button disabled={!this.props.canSubmit}>Submit</button>
            </form>
        );
    }


}