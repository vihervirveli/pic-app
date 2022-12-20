import React, { useState } from 'react';
import axios from 'axios';
import Masonry from 'react-masonry-css';
import { Outlet } from 'react-router-dom';
import './CreateCard.css';
import CardCreated from './CardCreated';


/**
 * 
 * @param {*} props 
 * @returns Component that lets you create a card, including a form and an input field that lets you search for pictures from Pixabay. 
 */
const CreateCard = (props) => {
  const [pics, setPics] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [cardText, setCardText] = useState("");
  const [chosenPic, setChosenPic] = useState("");
  const [card, setCard] = useState("");


  /**
   * Fetches the pictures that the user searched for using axios and sets them to state pics
   */
  const bringPics = () => {

    axios.get(`https://pixabay.com/api/?key=${APIKEY}=${searchInput}&image_type=photo`)
      .then(res => {
        const picsSearch = res.data.hits;
        setPics(picsSearch);

      })
  }

  /**
   * When a card is sent by the user clicking the button "send card", an object containing certain attributes (src, text, user) 
   * is created, that object is set into state card and then sent back to App.js where all the cards are store 
   * @param {*} e 
   */
  const handleSendCard = (e) => {
    e.preventDefault();
    let myCard = {
      src: chosenPic,
      text: cardText,
      user: props.nimi
    };

    
    setCard(myCard);
    props.handleri(myCard);
  }

  /**
   * sets the state cardText to contain the value of the input field containing "card text" 
   * @param {*} e 
   */
  const handleCardTextInputChange = (e) => {
    let cardtextInput = e.target.value;
    setCardText(cardtextInput);
  }

  /**
   * When a user types something into the pic search input field, this function takes that and replaces the spaces with + signs
   * so when searchInput is set, it is ready to go into axios in the function bringPics
   * @param {*} e 
   */
  const handlePicSearchInputChange = (e) => {
    let inputtext = e.target.value;
    if (inputtext.indexOf(" ") >= 0) {
      inputtext.replace(" ", "+")
    }
    setSearchInput(inputtext);
  }


  /**
   * When a user clicks on an image, that image is "chosen" and set into the state chosenPic
   * @param {*} e 
   */
  const handleChoice = (e) => {
    let valitunPienKuva = e.target.src;
    let valitunIsoKuva;
    pics.forEach((picture) => {
      if (picture.webformatURL === valitunPienKuva) {
        valitunIsoKuva = picture.largeImageURL;

      }
    })
    setChosenPic(valitunIsoKuva);
  }


  /**
   * the pics state is mapped and divs are created with for each picture
   */
  let pictureAr = pics.map((image) => {
    return <div key={image.id} ><img onClick={handleChoice} alt="Alt-teksti" src={image.webformatURL} /> </div>
  });


  /**
   * If a card has been created, the program will show CardCreated component instead of this one.
   */
  if (card) {
    return (
      <CardCreated cardInfo={card} />
    )
  }

  return (
    <div className="CreateCard">
      <h1>
        Pixabay API kuvaproju
      </h1>
      <form className="f">
        {/* Enables the user to write a card */}
        <img className="valittu" src={chosenPic} alt={chosenPic}></img>
        <label>Kirjoita kortti</label>
        <textarea type="text" onChange={handleCardTextInputChange} maxLength="255" name="fcardtext" value={cardText}></textarea>
        <label>Please type your name</label>
        <input type="text" onChange={props.nimihandleri} name="finput" value={props.nimi}></input>
        <button className="picButton" onClick={handleSendCard} type="submit">Send Card</button>
      </form>

      {/* enables the user to choose a picture for the card */}
      <div className="picSearch">
        <label>Search for pictures and click one to choose a picture for your card</label>
        <input type="text" onChange={handlePicSearchInputChange} name="finput" value={searchInput}></input>
        <button className="picButton" onClick={bringPics}>Show pictures</button>
      </div>
      {/* displays the pictures the user has searched for */}
      <Masonry
        breakpointCols={3}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column">
        {pictureAr}
      </Masonry>
      <Outlet />

    </div>
  );
}

export default CreateCard;