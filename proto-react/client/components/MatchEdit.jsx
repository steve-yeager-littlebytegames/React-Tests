import React from 'react';
import Match from '../src/match.js';
import '../css/match.css';

export default class MatchEdit extends React.Component {
    render() {
        const game = this.props.game;
        const match = this.props.match;
        const index = match.index;

        const characters = game.characters.map(c => <option value={c.id} key={c.id}>{c.name}</option>);
        const stages = game.stages.map(s => <option value={s.id} key={s.id}>{s.name}</option>);

        const player1CharacterInputs = this.renderCharacterInputs(match, characters, game, 1, match.p1Characters);
        const player2CharacterInputs = this.renderCharacterInputs(match, characters, game, 2, match.p2Characters);
        const stageInput = this.renderStageInput(match, stages, game);

        return (
            <div className="match">
                <button type="button" onClick={this.props.deleteMatch}>Delete Match</button>
                <h4>Match {index + 1}</h4>
                <label className="match-input">
                    P1 Score
                    <input type="number" value={match.p1Score} onChange={event => this.props.updateScore(1, event.target.value)} />
                </label>
                <label className="match-input">
                    P1 Character
                    {player1CharacterInputs}
                </label>
                <div className="input-break" />
                <label className="match-input">
                    P2 Score
                    <input type="number" value={match.p2Score} onChange={event => this.props.updateScore(2, event.target.value)} />
                </label>
                <label className="match-input">
                    P2 Character
                    {player2CharacterInputs}
                </label>
                <div className="input-break" />
                {stageInput}
                <button type="button" onClick={this.props.cancelChanges}>Cancel</button>
                <button type="button" onClick={this.props.acceptChanges}>OK</button>
            </div >
        );
    }

    renderCharacterInputs(match, characters, game, playerNumber, playerCharacters) {
        const characterInputs = [];

        for (var i = 0; i < game.charactersPerMatch; i++) {
            var characterIndex = i;
            characterInputs.push(
                <select key={i} value={playerCharacters[i]} onChange={event => this.props.updateCharacter(playerNumber, event.target.value, characterIndex)}>
                    {characters}
                </select>
            );
        }

        return characterInputs;
    }

    renderStageInput(match, stages, game) {
        if (game.requiresStage) {
            return (
                <div>
                    <label className="match-input">
                        Stage
                        <select value={match.stage || ''} onChange={event => this.props.updateStage(event.target.value)}>
                            {stages}
                        </select>
                    </label>
                    <div className="input-break" />
                </div>
            )
        }
    }
}
