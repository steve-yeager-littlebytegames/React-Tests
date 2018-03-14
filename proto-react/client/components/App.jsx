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

    this.updateScore = this.updateScore.bind(this);
    this.addMatch = this.addMatch.bind(this);
    this.deleteMatch = this.deleteMatch.bind(this);
  }

  render() {
    return (
      <div style={{ textAlign: 'center' }}>
        <Players player1="boyBlue_" player2="MMFane" />
        <SetScore player1={this.state.score1} player2={this.state.score2} scoreUpdate={this.updateScore} />
        <AddMatch onAdd={this.addMatch} />
        <MatchForm matches={this.state.matches} deleteMatch={this.deleteMatch} />
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

  updateScore(playerNumber) {
    if (playerNumber == 1) {
      var score = this.state.score1 + 1;
      this.setState({ score1: score });
    } else {
      var score = this.state.score2 + 1;
      this.setState({ score2: score });
    }
  }
}
