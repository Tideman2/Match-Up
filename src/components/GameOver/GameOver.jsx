import './GameOver.css';

export default function({winner, restart}) {

    return <>
    <div className="GameOverBackdrop">
      <div className="GameOverContent">
        <h2>Game Over</h2>
        {winner ? <p>{winner} Won</p> : <p>Match is a draw</p>}
        <button onClick={restart}>Rematch</button>
      </div>
    </div>
    </>
}