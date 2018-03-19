import React from 'react';
import MatchComp from './MatchComp.jsx'

export default class MatchForm extends React.Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {
        const matchComps = this.props.matches.map(m =>
            <MatchComp key={m.index} match={m} game={this.props.game}
                deleteMatch={this.props.deleteMatch}
                updateScore={this.props.updateScore}
                updateStage={this.props.updateStage}
                updateCharacter={this.props.updateCharacter}
            />
        );

        return (
            <form onSubmit={this.handleSubmit}>
                <input type="hidden" name="id" value={this.props.id} />
                {matchComps}
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