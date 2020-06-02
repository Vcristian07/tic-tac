import React, { Component } from "react";

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        key={i}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    var rows = [];
    const rowsLength = 3,
      colLength = 3;
    let counter = 0;
    for (let i = 0; i < rowsLength; i++) {
      var rowsChilds = [];

      for (let j = 0; j < colLength; j++) {
        rowsChilds.push(this.renderSquare(counter));
        counter++;
      }
      rows.push(
        <div className="board-row" key={i}>
          {rowsChilds}
        </div>
      );
    }
    return <div>{rows}</div>;
  }
}

export default Board;
