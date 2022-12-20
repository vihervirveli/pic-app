import Frontpage from './components/Frontpage'
import CreateCard from './components/CreateCard';
import AllCards from './components/AllCards';
import ErrorPage from './components/ErrorPage';
import React, { useState, useEffect, useCallback } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";
import './App.css'


/**
 * App-component that holds the navigation and links to the pages.
 */
const App = () => {
  const [allCards, setAllCards] = useState([]);
  const [nimiInput, setNimiInput] = useState("");

  /**
     * adds one card to the state setAllCards and sets it to local storage
     * @param {object} onecard the card that is added. Includes src, text, and user 
     */
  const addCard = useCallback((onecard) => {
    setAllCards(oldCards => [...oldCards, onecard]);
    
  }, []);


  /**
   * Will only be run when the component is rendered and only once per session.
   * Gets the ready made cards and sets them to allCards state.
   */
  useEffect(() => {
    //let onkoKuvatStorage = sessionStorage.getItem("onkoKuvat");
    //console.log(onkoKuvatStorage);
    let readyCards = [{
      "src": "https://cdn.pixabay.com/photo/2018/04/09/16/30/nature-3304575_1280.jpg",
      "text": "Moi äiti!\nMiten menee",
      "user": "Maarit"
      },
      {
      "src": "https://cdn.pixabay.com/photo/2016/01/14/14/34/butterfly-1140062_1280.jpg",
      "text": "Moi iskä!\nHyvää Kuopiota!",
      "user": "Maarit"
      },
      
      {
      "src": "https://cdn.pixabay.com/photo/2018/04/09/16/30/nature-3304576_1280.jpg",
      "text": "Moi sisko!\n\nTerkkuja Kanarialle!",
      "user": "Maarit"
      }
      ];

      if (allCards.length < 1) {
          setAllCards(readyCards);
        }
  }, [allCards.length]);

  
  /**
      * When a user types their name into the name input field, it is set into state nimiInput
      * @param {*} e 
      */
  const handleNimiInputChange = (e) => {
    let inputtext = e.target.value;
    setNimiInput(inputtext);
  }


  return (
    //React-router to navigate between the pages.
    <div className="App">
      <BrowserRouter basename="/~p0033/harkka/">
        <ul className="LinkList">
          <li>
            <Link to="/">Front page</Link></li>
          <li><Link to="/createcard">CreateCard</Link></li>
          <li>
            <Link to="/allcards">AllCards</Link></li>
        </ul>
        <Routes>
          <Route path="/createcard" element={<CreateCard handleri={addCard} nimihandleri={handleNimiInputChange} nimi={nimiInput} />} />
          <Route path="/allcards" element={<AllCards getteri={allCards} setteri={addCard} />} />
          <Route path="/" element={<Frontpage nimihandleri={handleNimiInputChange} nimi={nimiInput} />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </div>

  );

}

export default App;
