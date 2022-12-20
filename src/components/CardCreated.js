import './CardCreated.css';
import {
  Link
} from "react-router-dom";

/**
 * 
 * @param {*} props 
 * @returns Component that shows the card that the user made just now
 */
const CardCreated = (props) => {


  //stores textarea's lines separately in an array and turns them into list items
  let lines = props.cardInfo.text.split("\n");
  let lineItems = lines.map((line, index) => {
    return <li key={index}>{line}</li>
  });

  return (
    <div className="wrapwrap">
      <div className="cardContainer">
        <img src={props.cardInfo.src} alt={props.cardInfo.src} ></img>
        <p> Card sender: {props.cardInfo.user}</p>
        <p>Card text:</p>
        <ul>{lineItems}</ul>
      </div>
      <Link className="linky" to="../allcards">Show all cards</Link>
    </div>

  )
}

export default CardCreated;

