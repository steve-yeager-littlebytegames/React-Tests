import React from 'react';
import Match from '../src/match.js';
import '../css/match-summary.css';

export default class MatchSummary extends React.Component {
    render() {
        const match = this.props.match;
        const game = this.props.game;

        const p1Characters = this.getCharacterImages(match.p1Characters);
        const p2Characters = this.getCharacterImages(match.p2Characters);

        return (
            <div className="match-container" onClick={() => this.props.onSelect(match)}>
                <span>Match {match.index + 1}</span>
                <div className="match-middle">
                    <div className="character-pics">
                        {p1Characters}
                    </div>
                    <div className="match-score-container">
                        <span className="match-score">{match.p1Score}</span>
                        <span className="match-score-sep">-</span>
                        <span className="match-score">{match.p2Score}</span>
                    </div>
                    <div className="character-pics">
                        {p2Characters}
                    </div>
                </div>
                {game.requiresStage &&
                    <span>{game.stages.find(s => s.id === match.stage).name}</span>
                }
            </div>
        );
    }

    getCharacterImages(characters) {
        return characters.map(c => {
            var url = this.props.game.characters.find(x => x.id === c).pic;
            return <img key={c} src={url} />
        });
    }
}