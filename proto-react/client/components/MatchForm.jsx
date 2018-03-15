import React from 'react';
import MatchComp from './MatchComp.jsx'

export default class MatchForm extends React.Component {
    render() {
        const matchComps = this.props.matches.map(m =>
            <MatchComp key={m.id} match={m}
                deleteMatch={this.props.deleteMatch}
                updateScore={this.props.updateScore}
                updateStage={this.props.updateStage}
                updateCharacter={this.props.updateCharacter}
            />
        );

        return (
            <form onSubmit={this.handleSubmit}>
                <input type="hidden" name="id" value="38" />
                {matchComps}
                <button disabled={!this.props.canSubmit}>Submit</button>
            </form>
        );
    }

    handleSubmit(event) {
        event.preventDefault();

        const data = new FormData(event.target);
        fetch("https://localhost:44304/Sets/Submit", {
            method: "POST",
            body: data,
            mode: "no-cors"
        });
    }
}