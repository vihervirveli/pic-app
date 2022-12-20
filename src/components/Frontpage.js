import { Outlet, Link } from 'react-router-dom';
import './Frontpage.css'

/**
 * 
 * @returns Component that displays the front page. Welcomes you into the app, asks you for your name. 
 * Displays links to pages CreateCard and show AllCards
 */
const Frontpage = (props) => {
  
  return (
    <div className="Frontpage">
      <h1>Front page of my cool app</h1>
      <h2>Welcome {props.nimiInput}</h2>
      <label>Please type your name to begin</label>
      <div className="fpagecontent">
        <input type="text" onChange={props.nimihandleri} name="finput" value={props.nimi}></input>
        <Outlet />
        <Link className="linky" to="/createcard">
          <button className="navbutton">Create a card</button>
        </Link>
        <Link className="linky" to="/allcards">
          <button className="navbutton">See all cards</button>
        </Link>
      </div>
    </div >//front page
  );
}

export default Frontpage;
