import React from 'react';
import Players from './Players.jsx'
import SetScore from './SetScore.jsx'
import AddMatch from './AddMatch.jsx'
import Match from '../src/match.js'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      score1: 0,
      score2: 0,
    }
    this.updateScore = this.updateScore.bind(this);
    this.matches = [
      new Match("match 1"),
      new Match("match 2"),
    ]
  }

  render() {
    const matchComps = this.matches.map(m => 
      <li key={m.message}>{m.message}</li>
    );

    return (
      <div style={{ textAlign: 'center' }}>
        <Players player1="boyBlue_" player2="MMFane"/>
        <SetScore player1={this.state.score1} player2={this.state.score2} scoreUpdate={this.updateScore}/>
        <AddMatch onAdd={this.addMatch}/>
        <ol>{matchComps}</ol>
      </div>);
  }

  addMatch() {
    console.log("adding match");
  }

  updateScore(playerNumber) {
    if(playerNumber == 1) {
      var score = this.state.score1 + 1;
      this.setState({score1: score});
    }else{
      var score = this.state.score2 + 1;
      this.setState({score2: score});
    }
  }
}
