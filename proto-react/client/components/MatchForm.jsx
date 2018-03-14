import React from 'react';
import MatchComp from './MatchComp.jsx'

export default class MatchForm extends React.Component {
    render() {
        const matchComps = this.props.matches.map(m =>
            <MatchComp key={m.id} match={m} deleteMatch={this.props.deleteMatch} />
        );

        return (
            <form onSubmit={this.handleSubmit}>
                <input type="hidden" name="id" value="38" />
                {matchComps}
                <button disabled={this.props.matches.length === 0}>Submit</button>
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