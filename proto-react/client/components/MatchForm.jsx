import React from 'react';
import MatchComp from './MatchComp.jsx'

export default class MatchForm extends React.Component {
    render() {
        const matchComps = this.props.matches.map(m =>
            <MatchComp key={m.id} match={m} deleteMatch={this.props.deleteMatch} />
        );

        return <ol>{matchComps}</ol>
    }
}