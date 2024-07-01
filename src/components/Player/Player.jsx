import './Player.css'; 
import { useState } from 'react';


export default function Player({playerSymbol, playerName, activePlayer}) {
 let [player, setPlayer] = useState(playerName);
 let [isEdit, setIsEdit] = useState(false);
 

 function handleEdit() {
    if(isEdit) {
      setIsEdit(false)
    }else {
      setIsEdit(true)
    }
 }

 function handleChange(event) {
  setPlayer(event.target.value)
 }
 

function checkActive() {
  if(activePlayer === playerSymbol) {
    return 'player-container'
  }else {
   return undefined
  }
 }

     return (
            <li className= {checkActive()}>
                <span className="player-name">{isEdit ? <input className='setName' type='text' value={player} onChange={handleChange} /> : player}</span>
                <button className="edit-button" onClick={handleEdit}>{isEdit? "Save": 'Edit'}</button>
            </li>       
             );
    
}