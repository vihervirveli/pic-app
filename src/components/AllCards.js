import './AllCards.css'
import { Outlet } from 'react-router-dom';
import Masonry from 'react-masonry-css';


/**
 * 
 * @param {*} props 
 * @returns Component that displays all the cards that are currently made
 */
const AllCards = (props) => {

  //Maps all the cards and stores it in the variable cardAr.
  let cardAr = props.getteri.map((image, index) => {
    return <div className="cardHolder" key={index} ><img alt="Alt-teksti" src={image.src} /><p>{image.user}</p><ul>{image.text.split("\n").map((line, index) => {
      return <li key={index}>{line}</li>
    })}</ul> </div>
  });
  return (
    <div className="AllCards">
      <h1>All Cards here</h1>
      <Outlet />
      <Masonry
        breakpointCols={3}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column">
        {cardAr}
      </Masonry>
    </div>//AllCards div
  );
}

export default AllCards;
