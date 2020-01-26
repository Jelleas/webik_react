import React from 'react';

class Board extends React.Component {
  constructor() {
    super();

    fetch('http://localhost:5000/api/register')
      .then(response => response.json())
      .then(json => this.setState({id: json}));

    this.state = {
      board: [[0,0,0], [0,0,0], [0,0,0]]
    }
  }

  tileClicked(row_index, col_index) {
    let board = this.state.board;
    board[row_index][col_index] = 1;

    fetch(`http://localhost:5000/api/move?id=${this.state.id}&x=${row_index}&y=${col_index}`)
      .then(response => response.json())
      .then(json => this.setState({
        board: json.board
      }));
  }

  renderRow(row_index) {
    return (
      <tr>
        {[...Array(3)].map((_, col_index) =>
          <td className="tile" onClick={() => this.tileClicked(row_index, col_index)}>
            {this.state.board[row_index][col_index] === 0 && " "}
            {this.state.board[row_index][col_index] === 1 && "X"}
            {this.state.board[row_index][col_index] === 2 && "O"}
          </td>
        )}
      </tr>
    )
  }

  render() {
    console.log(this.state.board)
    return (
      <table className="game">
        <tbody>
          {[...Array(3)].map((_, i) => this.renderRow(i))}
        </tbody>
      </table>
    )
  }
}

export default Board;
