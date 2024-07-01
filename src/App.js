import Header from './components/Header/Header';
import Player from './components/Player/Player';
import GameBoard from './components/GameBoard/GameBoard';
import GameOver from './components/GameOver/GameOver';
import { useState } from 'react';
import './App.css';

let initialGameBoard = [
  [ null, null, null ],
  [ null, null, null ],
  [ null, null, null ],
  [ null, null, null ],
]

let INITIAL_PLAYER_SCORE = {
  o: 0,
  x: 0
};

function checkForWinner(playerScore) {
  
  if(playerScore.o === playerScore.x) {
   return null
  }else if(playerScore.o > playerScore.x) {
    return 'o'
  }else {
    return 'x'
  }
 }

//  checkForWinner()

 let initialPlayer = 'o';

 function clearValuesFromNewBoard(board, index = 0) {
 while (index < board.length) {
   if(Array.isArray(board[index])) {
   clearValuesFromNewBoard(board[index])
   }else if(board[index] != null){
      board[index] = null 
   }
   index++
 }
}

function getBoardStructure() {
  let newBoard = initialGameBoard.map(arrays => [...arrays]);
  clearValuesFromNewBoard(newBoard);
  return newBoard
}
  
function App() {
  let [gameBoard, setGameBoard] = useState(initialGameBoard);
 let [activePlayer, setActivePlayer] = useState(initialPlayer);
 let [playerScore, setPlayerScore] = useState(INITIAL_PLAYER_SCORE);
 let [isGameOver, setIsGameOver] = useState(false);

 function restratGame() {
  setGameBoard(getBoardStructure());
  setActivePlayer(initialPlayer);
  setPlayerScore(INITIAL_PLAYER_SCORE);
  setIsGameOver(false);
 }


let winner = isGameOver? checkForWinner(playerScore): null;
 console.log(playerScore.o, playerScore.x)
  return (
      <>
        <Header/>
        <ul id='player-menu'>
          <Player playerName = 'player 1'
           playerSymbol={'o'}
           activePlayer = {activePlayer}/>
          <Player playerName = 'player 2'
          playerSymbol={'x'}
          activePlayer = {activePlayer}
          playerScore = {playerScore}/>
        </ul>
         <section>

         {isGameOver && <GameOver winner={winner}
         restart = {restratGame}/>}
         <GameBoard
         activePlayer = {activePlayer}
         setActivePlayer = {setActivePlayer}
         setPlayerScore = {setPlayerScore}
         gameBoard = {gameBoard}
         setGameBoard = {setGameBoard}
         setIsGameOver = {setIsGameOver}
         isGameOver = {isGameOver}/>
         </section>
      </>
  );
}

export default App;
