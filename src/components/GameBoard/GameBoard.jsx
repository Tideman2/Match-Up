import cards from "../../data";
import cardBack from '../../assets/caesar.svg';
import Card from "../Card/Card";
import "./GameBoard.css"
import { useEffect, useState } from "react";

let shuffledCards = [];
let cardMatcher = [];
let logMessage = [<h1 className="highlight">Randomly select a pair of card to match them</h1>];

let duplicateCards = JSON.parse(JSON.stringify(cards));

let completeCards = [...duplicateCards, ...cards];
console.log(cards);

function getRandomIndex (arr) {
  let min = Math.ceil(0);
  let max = Math.floor(arr.length -1);

   return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function shuffle() {
    if(shuffledCards.length > 0) {
      shuffledCards.splice(0, shuffledCards.length)
    }
    let tempCards = [...completeCards];
    while (tempCards.length > 0) {
      let randomIndex = getRandomIndex(tempCards);
      shuffledCards.push(tempCards[randomIndex]);
      tempCards.splice(randomIndex, 1);
    }
  }

  shuffle()



export default function GameBoard({setActivePlayer, activePlayer, gameBoard,
   setGameBoard, setPlayerScore, setIsGameOver, isGameOver}) {
 let [playerTurn, setPlayerTurn] = useState(0);
 let [clickedCards, setClickedCard] = useState([]);

 function upDateGameBoard(rowIndex, colIndex) {
  if(gameBoard[rowIndex][colIndex] === null && shuffledCards.length > 0) {
    let updatedBoard = [...gameBoard];
    updatedBoard[rowIndex][colIndex] = shuffledCards.shift();
    setGameBoard(updatedBoard)
  }
  console.log('clicked', shuffledCards)
 }



function upDatePlayerTurn() {
 if(playerTurn < 1) {
  setPlayerTurn((prvCount) => {
    let currentCount = prvCount + 1
    return currentCount
  })
 }else {
  setPlayerTurn(0)
    setActivePlayer(activePlayer === 'o' ? 'x' : 'o');
 }
}


function cardMatch(rowIndex, colIndex) {
  cardMatcher.push(gameBoard[rowIndex][colIndex])
   if(cardMatcher.length === 2) {
     if(cardMatcher[0].identity === cardMatcher[1].identity) {
      logMessage[0] = (<><h1 className="highlight">Cards are a match</h1>
      <p className="highlight">{activePlayer}, selected {rowIndex}{colIndex}</p></>)
      setPlayerScore(prevScore => {
        let newScore = {...prevScore};
        if (newScore[activePlayer.toLowerCase()] !== undefined) {
          newScore[activePlayer.toLowerCase()] += 1;
        } else {
          newScore[activePlayer.toLowerCase()] = 1;
        }
        return newScore
      })
      cardMatcher = [];
     }else {
      logMessage[0] = (<><h1 className="highlight">Not a match</h1>
      <p className="highlight">{activePlayer}, selected {rowIndex}{colIndex}</p></>)
      cardMatcher = [];
     }
   }else {
    console.log('not yet time')
   }
}

function checkForGameOver() {
  let board =  gameBoard.map(arrays => [...arrays]);
  let flatBoard = board.flat()
  if(!flatBoard.includes(null)) {
    setIsGameOver(true)
  }
}



 function onSelectBox(rowIndex, colIndex) {
   if(!clickedCards.includes(`${rowIndex}${colIndex}`)) {
    logMessage[0] = (<><p className="highlight">{activePlayer}, selected {rowIndex}{colIndex}</p></>)
    upDateGameBoard(rowIndex, colIndex);
    cardMatch(rowIndex, colIndex)
    upDatePlayerTurn()
    checkForGameOver()
    setClickedCard((prevClickedCard) => {
    let newClickedCards = [...prevClickedCard, `${rowIndex}${colIndex}`];
    return newClickedCards
    })
   } 
 }

  function generateKey(index) {
   return Date.now() + index;
  }

  
    useEffect(() => {
      setPlayerTurn(0);
      setClickedCard([]);
      shuffle()
    }, [isGameOver])

  return (
  <> 
    {logMessage[0]}
    <div className="game-board">
      {gameBoard.map((row, rowIndex) => (
        <ul className="row" key={generateKey(rowIndex)}>
          {row.map((card, colIndex) => (
            <li className="col" key={generateKey(colIndex)} onClick={() => {onSelectBox(rowIndex, colIndex)}}>
              {card? ( <Card image={card.image} /> ):
               (<Card image={cardBack} />)}
            </li>
          ))}
        </ul>
      ))}
    </div>
    </> 
  );
}