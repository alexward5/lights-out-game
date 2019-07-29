import React, {Component} from "react";
import Cell from "./Cell";
import './Board.css';


/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - hasWon: boolean, true when board is all off
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

class Board extends Component {

  constructor(props) {
    super(props);

    // set initial state
    this.state = {
      board: this.createBoard(),
      hasWon: false
    }
  }

  static defaultProps = {
    nrows: 5,
    ncols: 5,
    chanceLightStartsOn: .25
  }

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */

  createBoard = () => {
    let board = [];
    // create array-of-arrays of true/false values and add it to state
    for (let i=0; i<this.props.nrows; i++) {
      const newRow = [];
      for (let j = 0; j<this.props.ncols; j++) {
        if (Math.random() <= this.props.chanceLightStartsOn) {
          newRow.push(true);
        } else {
          newRow.push(false);
        }
      }
      board.push(newRow);
    }
    return board
  }

  /** handle changing a cell: update board & determine if winner */

  flipCellsAround = (coord) => {
    console.log(coord);
    const {ncols, nrows} = this.props;
    const board = this.state.board;
    const [y, x] = coord.split("-").map(Number);


    function flipCell(y, x) {
      // if this coord is actually on board, flip it
      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      }
    }

    flipCell(y, x);
    // flipCell(y-1,x);
    // flipCell(y, x+1);
    // flipCell(y+1, x);
    // flipCell(y, x-1);

    // win when every cell is turned off
    // determine is the game has been won
    let unlitCells = 0;
    for (let i=0; i<this.props.nrows; i++) {
      for (let j=0; j<this.props.ncols; j++) {
        if (!board[i][j]) {
          unlitCells += 1;
        }
      }
    }
  
    const hasWon = unlitCells > 0 ? false : true;

    this.setState({board, hasWon});
  }

  // generate jsx table elements
  generateCells = () => {
    const tableBoard = [];
    for (let i=0; i<this.props.nrows; i++) {
      const row = [];
      for (let j=0; j<this.props.ncols; j++) {
        const coord = `${i}-${j}`;
        row.push(<Cell key={coord} isLit={this.state.board[i][j]} flipCellsAroundMe={() => this.flipCellsAround(coord)} />);
      }
      tableBoard.push(<tr key={`row${i}`}>{row}</tr>);
    }
    return tableBoard;
  }


  /** Render game board or winning message. */
  render() {

    // if the game is won, just show a winning msg & render nothing else
    return (
      <div className="Board">
        <table className="Board__table">
          <tbody>
            {this.generateCells()}
          </tbody>
        </table>
      </div>
    )
  }
}

export default Board;

