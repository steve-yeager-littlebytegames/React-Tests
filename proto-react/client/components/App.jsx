import React from 'react';
import Players from './Players.jsx'
import SetScore from './SetScore.jsx'
import AddMatch from './AddMatch.jsx'
import MatchForm from './MatchForm.jsx'
import Match from '../src/match.js'

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.count = 0;

    this.state = {
      score1: 0,
      score2: 0,
      canSubmit: false,
      matches: []
    }

    this.addMatch = this.addMatch.bind(this);
    this.deleteMatch = this.deleteMatch.bind(this);
    this.updateScore = this.updateScore.bind(this);
    this.updateStage = this.updateStage.bind(this);
    this.updateCharacter = this.updateCharacter.bind(this);
  }

  render() {
    return (
      <div style={{ textAlign: 'center' }}>
        <Players player1="boyBlue_" player2="MMFane" />
        <SetScore player1={this.state.score1} player2={this.state.score2} />
        <AddMatch onAdd={this.addMatch} />
        <MatchForm matches={this.state.matches}
          canSubmit={this.state.canSubmit}
          deleteMatch={this.deleteMatch}
          updateScore={this.updateScore}
          updateStage={this.updateStage}
          updateCharacter={this.updateCharacter}
        />
      </div>);
  }

  addMatch() {
    var matches = this.state.matches;
    var matchID = this.count;
    this.count++;
    var match = new Match(matchID);
    if (matches.length != 0) {
      var lastMatch = matches[matches.length - 1];
      match.p1Characters = lastMatch.p1Characters.splice(0);
      match.p2Characters = lastMatch.p2Characters.splice(0);
      match.stage = lastMatch.stage;
    }

    matches.push(match);
    this.setState({
      matches: matches
    });
  }

  deleteMatch(matchID) {
    var matches = this.state.matches;
    var index = matches.findIndex(m => m.id == matchID);
    matches.splice(index, 1);

    this.update(matches);

    this.setState({
      matches: matches
    });
  }

  updateScore(index, player, score) {
    var matches = this.state.matches.splice(0);
    var match = matches.find(m => m.id == index);

    if (player === 1) {
      match.p1Score = score;
    } else {
      match.p2Score = score;
    }

    this.update(matches);
  }

  updateStage(index, stage) {
    var matches = this.state.matches.splice(0);
    var match = matches.find(m => m.id == index);

    match.stage = stage;

    this.update(matches);
  }

  updateCharacter(index, player, character) {
    var matches = this.state.matches.splice(0);
    var match = matches.find(m => m.id == index);

    if (player === 1) {
      match.p1Characters[0] = character;
    } else {
      match.p2Characters[0] = character;
    }

    this.update(matches);
  }

  update(matches) {
    var p1Score = 0;
    var p2Score = 0;
    for (var i = 0; i < matches.length; i++) {
      if (matches[i].p1Score > matches[i].p2Score) {
        p1Score++;
      } else if (matches[i].p2Score > matches[i].p1Score) {
        p2Score++;
      }
    }

    const canSubmit = this.canSubmit(matches, p1Score, p2Score);

    this.setState({
      score1: p1Score,
      score2: p2Score,
      canSubmit: canSubmit,
      matches: matches
    });
  }

  canSubmit(matches, p1Score, p2Score) {
    const enoughSets = matches.length > 1;
    const hasWinner = p1Score != p2Score;
    const allMatchesComplete = matches.every(m => { return m.isComplete });
    return enoughSets && hasWinner && allMatchesComplete;
  }
}
