import React from 'react';
import Counter from './Counter.jsx'
import Players from './Players.jsx'

export default class App extends React.Component {
  render() {
    return (
      <div style={{ textAlign: 'center' }}>
        <Players player1="boyBlue_" player2="MMFane"/>
        <Counter />
      </div>);
  }
}
