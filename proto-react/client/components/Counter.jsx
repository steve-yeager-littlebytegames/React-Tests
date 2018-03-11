import React from 'react';

export default class Counter extends React.Component {
    helloWorld() {
        console.log("sup babay?");
    }

    render() {
        return (
            <div style={{ textAlign: 'center' }}>
                <h2>Counter</h2>
                <button onClick={this.helloWorld}>Click Me</button>
            </div>);
    }
}
