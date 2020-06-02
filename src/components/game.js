import React from "react";
import Board from "./Board.js";
import InfoComponent from "./infoComponent.jsx";
import "../App.css";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
          position: 0,
        },
      ],
      stepNumber: 0,
      xIsNext: true,
    };
  }
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }
  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";

    this.setState({
      history: history.concat([
        {
          squares: squares,
          position: i,
        },
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }
  getStatusGame = (squares, xIsNext, step) => {
    const winner = calculateWinner(squares);
    if (winner) {
      return "Winner: " + winner;
    } else if (step < 9) {
      return "Next player: " + (xIsNext ? "X" : "O");
    } else {
      return "No winner";
    }
  };
  getDescRowColPosition = (position, move) => {
    const correctDescription =
      "row: " + parseInt(position / 3 + 1) + " col:" + ((position % 3) + 1);

    return move
      ? "Go to move #" + move + " " + correctDescription
      : "Go to game start";
  };
  getBoldClass = (move, stepNumber) => {
    let boldItemClassName = "";
    if (move === stepNumber) {
      boldItemClassName = "itemBold";
    }

    return boldItemClassName;
  };

  getMovesHistoryItems = (history, stepNumber) => {
    return history.map((step, move) => {
      const desc = this.getDescRowColPosition(step.position, move);
      return (
        <li className={() => this.getBoldClass(move, stepNumber)} key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });
  };
  render() {
    const { history, xIsNext, stepNumber } = this.state;
    const current = history[stepNumber];

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <InfoComponent
            status={this.getStatusGame(current.squares, xIsNext, stepNumber)}
            moves={this.getMovesHistoryItems(history, stepNumber)}
          />
        </div>
      </div>
    );
  }
}
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
export default Game;
