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
      matches: []
    }

    this.addMatch = this.addMatch.bind(this);
    this.deleteMatch = this.deleteMatch.bind(this);
    this.updateScore = this.updateScore.bind(this);
  }

  render() {
    return (
      <div style={{ textAlign: 'center' }}>
        <Players player1="boyBlue_" player2="MMFane" />
        <SetScore player1={this.state.score1} player2={this.state.score2} />
        <AddMatch onAdd={this.addMatch} />
        <MatchForm matches={this.state.matches}
          deleteMatch={this.deleteMatch}
          updateScore={this.updateScore} />
      </div>);
  }

  addMatch() {
    var matches = this.state.matches;
    var matchID = this.count;
    this.count++;
    var match = new Match(matchID);
    matches.push(match);
    this.setState({
      matches: matches
    })
  }

  deleteMatch(matchID) {
    var matches = this.state.matches;
    var index = matches.findIndex(m => m.id == matchID);
    matches.splice(index, 1);
    this.setState({
      matches: matches
    });
  }

  updateScore(index, player, score) {
    var matches = JSON.parse(JSON.stringify(this.state.matches));

    var match = matches.find(m => m.id == index);
    if (player === 1) {
      match.p1Score = score;
    } else {
      match.p2Score = score;
    }

    var p1Score = 0;
    var p2Score = 0;
    for (var i = 0; i < matches.length; i++) {
      if (matches[i].p1Score > matches[i].p2Score) {
        p1Score++;
      } else if (matches[i].p2Score > matches[i].p1Score) {
        p2Score++;
      }
    }

    this.setState({
      score1: p1Score,
      score2: p2Score,
      matches: matches
    });
  }
}
