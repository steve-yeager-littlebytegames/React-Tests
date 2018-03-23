// TODO: Display alert if submit failed.
// TODO: Only submit if there is a change.
// TODO: Warn about leaving if there is a change.
// TODO: Prefill first match with last used characters.
// TODO: Get set id from url.
// TODO: Lock page while submitting.
// TODO: Change page after successful submit.

import React from 'react';
import Players from './Players.jsx'
import SetScore from './SetScore.jsx'
import AddMatch from './AddMatch.jsx'
import MatchForm from './MatchForm.jsx'
import MatchEdit from './MatchEdit.jsx'
import Match from '../src/match.js'
import Game from '../src/game.js'

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      score1: 0,
      score2: 0,
      canSubmit: false,
      matches: [],
      selectedMatch: null,
    };

    this.addMatch = this.addMatch.bind(this);
    this.deleteMatch = this.deleteMatch.bind(this);
    this.onMatchSelect = this.onMatchSelect.bind(this);
    this.acceptMatchChanges = this.acceptMatchChanges.bind(this);
    this.cancelMatchChanges = this.cancelMatchChanges.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.getSet();
  }

  render() {
    if (this.state.isLoading) {
      return <span>Loading...</span>
    } else if (this.state.selectedMatch != null) {
      const match = this.state.selectedMatch;
      return (
        <MatchEdit key={match.index} match={match} game={this.game}
          deleteMatch={this.deleteMatch}
          acceptChanges={this.acceptMatchChanges}
          cancelChanges={this.cancelMatchChanges}
        />
      );
    } else {
      return (
        <div style={{ textAlign: 'center' }}>
          <Players player1={this.player1} player2={this.player2} />
          <SetScore player1={this.state.score1} player2={this.state.score2} />
          <MatchForm matches={this.state.matches} game={this.game} id={this.setID}
            canSubmit={this.state.canSubmit}
            deleteMatch={this.deleteMatch}
            updateScore={this.updateScore}
            updateCharacter={this.updateCharacter}
            onMatchSelect={this.onMatchSelect}
            onSubmit={this.onSubmit}
          />
          <AddMatch onAdd={this.addMatch} />
        </div>
      );
    }
  }

  onMatchSelect(match) {
    this.matchBackup = Match.clone(match);

    this.setState({
      selectedMatch: match
    });
  }

  acceptMatchChanges() {
    this.update(this.state.matches);

    this.matchBackup = null;

    this.setState({
      selectedMatch: null
    });
  }

  cancelMatchChanges() {
    var matches = this.state.matches.splice(0);
    for (var i = 0; i < matches.length; ++i) {
      if (matches[i].index === this.matchBackup.index) {
        matches[i] = Match.clone(this.matchBackup);
        break;
      }
    }

    this.update(matches);

    this.setState({
      selectedMatch: null
    });

    this.matchBackup = null;
  }

  addMatch() {
    var matches = this.state.matches;
    var matchIndex = matches.length;
    var match = null;

    if (matches.length != 0) {
      var lastMatch = matches[matches.length - 1];
      match = Match.clone(lastMatch);
      match.index = matchIndex;
    } else {
      match = new Match(matchIndex);
      match.p1Characters.push(this.game.characters[0].id);
      match.p2Characters.push(this.game.characters[0].id);
      match.stage = this.game.stages[0].id;
    }

    matches.push(match);
    this.setState({
      matches: matches
    });

    this.onMatchSelect(match);
  }

  deleteMatch() {
    var matches = this.state.matches;
    var index = matches.findIndex(m => m.index === this.state.selectedMatch.index);
    matches.splice(index, 1);

    for (var i = 0; i < matches.length; ++i) {
      matches[i].index = i;
    }

    this.update(matches);

    this.matchBackup = null;

    this.setState({
      selectedMatch: null
    });
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

  getSet() {
    //fetch("https://localhost:44304/Sets/4")
    //fetch("https://localhost:44304/Sets/95")
    fetch("https://localhost:44304/Sets/64")
      .then(response => response.json())
      .then(json => {
        this.setID = json.id;
        this.player1 = json.player1;
        this.player2 = json.player2;

        var gameData = json.game;
        this.game = new Game(gameData.setRules,
          gameData.charactersPerMatch,
          gameData.maxMatchPoints,
          gameData.characters,
          gameData.stages);

        var matches = [];
        for (var i = 0; i < json.matches.length; ++i) {
          var matchData = json.matches[i];
          var match = new Match(matchData.index);
          match.p1Score = matchData.player1Score;
          match.p2Score = matchData.player2Score;
          match.stage = matchData.stageID;

          const player1ID = json.player1ID;
          for (var j = 0; j < matchData.matchCharacters.length; ++j) {
            const character = matchData.matchCharacters[j];
            if (character.leagueUserID === player1ID) {
              match.p1Characters.push(character.characterID);
            } else {
              match.p2Characters.push(character.characterID);
            }
          }

          matches.push(match);
        }

        matches.sort((a, b) => a.index > b.index);

        this.setState({
          isLoading: false,
          score1: json.player1Score,
          score2: json.player2Score,
          matches: matches
        });
      });
  }

  onSubmit(event) {
    event.preventDefault();

    if (!this.canSubmit) {
      return;
    }

    const data = new FormData(event.target);
    fetch("https://localhost:44304/Sets/Submit", {
      method: "POST",
      body: data
    });
  }
}
