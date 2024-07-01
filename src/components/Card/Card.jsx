import './Card.css';


export default function Card({image}) {

    return (
        <div className='card'>
            <img src = {image} alt=""/>
        </div>
    )
}