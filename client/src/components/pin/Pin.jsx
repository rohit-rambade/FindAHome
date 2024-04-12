import { Marker, Popup } from "react-leaflet";
import { useSelector } from "react-redux";

import { Link } from "react-router-dom";

function Pin() {
  const listings = useSelector((state) => state.listings.listings);
  console.log(listings);
  return (
    <>
      {listings.map((listing) => {
        return (
          <Marker position={listing.coordinates}>
            <Popup>
              <div className="popupContainer">
                <img src={listing.images[0]} alt="" />
                <div className="textContainer">
                  {/* <Link to={`/${item.id}`}>{item.title}</Link> */}
                  <span> {listing.landlord}</span>
                  <b>{listing.rent} Rs</b>
                </div>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </>
  );
}

export default Pin;
