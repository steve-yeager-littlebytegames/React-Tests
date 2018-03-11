import React from 'react';
import Players from './Players.jsx'
import SetScore from './SetScore.jsx'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      score1: 0,
      score2: 0,
    }
    this.updateScore = this.updateScore.bind(this);
  }

  render() {
    return (
      <div style={{ textAlign: 'center' }}>
        <Players player1="boyBlue_" player2="MMFane"/>
        <SetScore player1={this.state.score1} player2={this.state.score2} scoreUpdate={this.updateScore}/>
      </div>);
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
