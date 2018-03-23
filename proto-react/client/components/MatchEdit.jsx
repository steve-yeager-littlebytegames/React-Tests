import React from 'react';
import Match from '../src/match.js';
import '../css/match.css';

export default class MatchEdit extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            match: this.props.match,
            canAdd: this.canAdd(this.props.match),
        };
    }

    render() {
        const game = this.props.game;
        const match = this.state.match;
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
                    {this.renderScore(match.p1Score, 1)}
                </label>
                <label className="match-input">
                    P1 Character
                    {player1CharacterInputs}
                </label>
                <div className="input-break" />
                <label className="match-input">
                    P2 Score
                    {this.renderScore(match.p2Score, 2)}
                </label>
                <label className="match-input">
                    P2 Character
                    {player2CharacterInputs}
                </label>
                <div className="input-break" />
                {stageInput}
                <button type="button" onClick={this.props.cancelChanges}>Cancel</button>
                <button type="button" disabled={!this.state.canAdd} onClick={this.props.acceptChanges}>OK</button>
            </div >
        );
    }

    renderScore(score, player) {
        return <input type="number" value={score} min="0" max={this.props.game.maxMatchPoints} onChange={event => this.updateScore(player, event.target.value)} />
    }

    renderCharacterInputs(match, characters, game, playerNumber, playerCharacters) {
        const characterInputs = [];

        for (var i = 0; i < game.charactersPerMatch; i++) {
            var characterIndex = i;
            characterInputs.push(
                <select key={i} value={playerCharacters[i]} onChange={event => this.updateCharacter(playerNumber, event.target.value, characterIndex)}>
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
                        <select value={match.stage || ''} onChange={event => this.updateStage(event.target.value)}>
                            {stages}
                        </select>
                    </label>
                    <div className="input-break" />
                </div>
            )
        }
    }

    canAdd(match) {
        var maxPoints = this.props.game.maxPoints;
        return match.p1Score != match.p2Score
            && (match.p1Score === maxPoints || match.p2Score === maxPoints)
            && match.p1Score >= 0 && match.p2Score >= 0
            && match.p1Score <= maxPoints && match.p2Score <= maxPoints;
    }

    updateScore(player, score) {
        var match = this.state.match;

        if (score != '') {
            score = parseInt(score, 10);
        }

        if (player === 1) {
            match.p1Score = score;
        } else {
            match.p2Score = score;
        }

        this.setState({
            match: match,
            canAdd: this.canAdd(match),
        });
    }

    updateCharacter(player, character, characterIndex) {
        var match = this.state.match;
        character = parseInt(character);

        if (player === 1) {
            match.p1Characters[characterIndex] = character;
        } else {
            match.p2Characters[characterIndex] = character;
        }

        this.setState({
            match: match,
        });
    }

    updateStage(stage) {
        var match = this.state.match;
        stage = parseInt(stage);
        match.stage = stage;

        this.setState({
            match: match,
        });
    }
}
