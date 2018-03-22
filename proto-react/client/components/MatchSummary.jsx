import React from 'react';
import Match from '../src/match.js';
import '../css/match-summary.css';

export default class MatchSummary extends React.Component {
    render() {
        const match = this.props.match;
        const game = this.props.game;

        const p1CharacterImages = this.getCharacterImages(match.p1Characters);
        const p2CharacterImages = this.getCharacterImages(match.p2Characters);

        const index = match.index;
        const namePrefix = "matches[" + index + "].";
        const p1CharacterInputs = match.p1Characters.map((c, i) => <input key={i} type="hidden" name={`${namePrefix}p1characters[${i}]`} value={c} />);
        const p2CharacterInputs = match.p2Characters.map((c, i) => <input key={i} type="hidden" name={`${namePrefix}p2characters[${i}]`} value={c} />);

        return (
            <div className="match-container" onClick={() => this.props.onSelect(match)}>
                <input type="hidden" name={namePrefix + "p1score"} value={match.p1Score} />
                <input type="hidden" name={namePrefix + "p2score"} value={match.p2Score} />
                <input type="hidden" name={namePrefix + "stage"} value={match.stage || ''} />
                {p1CharacterInputs}
                {p2CharacterInputs}

                <span>Match {match.index + 1}</span>
                <div className="match-middle">
                    <div className="character-pics">
                        {p1CharacterImages}
                    </div>
                    <div className="match-score-container">
                        <span className="match-score">{match.p1Score}</span>
                        <span className="match-score-sep">-</span>
                        <span className="match-score">{match.p2Score}</span>
                    </div>
                    <div className="character-pics">
                        {p2CharacterImages}
                    </div>
                </div>
                {game.requiresStage &&
                    <span>{game.stages.find(s => s.id === match.stage).name}</span>
                }
            </div>
        );
    }

    getCharacterImages(playerCharacters) {
        return playerCharacters.map(pc => {
            var url = this.props.game.characters.find(c => c.id === pc).pic;
            return <img key={pc} src={url} />
        });
    }
}