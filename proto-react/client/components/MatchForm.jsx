import React from 'react';
import MatchSummary from './MatchSummary.jsx'

export default class MatchForm extends React.Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {
        const matchSummaries = this.props.matches.map(m =>
            <MatchSummary key={m.index}
                match={m}
                game={this.props.game}
                onSelect={this.props.onMatchSelect} />
        );

        return (
            <form onSubmit={this.handleSubmit}>
                <input type="hidden" name="id" value={this.props.id} />
                {matchSummaries}
                <button disabled={!this.props.canSubmit}>Submit</button>
            </form>
        );
    }

    handleSubmit(event) {
        event.preventDefault();

        if (!this.props.canSubmit) {
            return;
        }

        const data = new FormData(event.target);
        fetch("https://localhost:44304/Sets/Submit", {
            method: "POST",
            body: data,
            mode: "no-cors"
        });
    }
}