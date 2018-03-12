import React from 'react';

export default class AddMatch extends React.Component {
    render() {
        return (<button onClick={this.props.onAdd}>Add Match</button>);
    }
}
