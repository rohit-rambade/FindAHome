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
              <Link to={`/listing/${listing._id}`}>
                <div className="popupContainer">
                  <img src={listing.images[0]} alt="" />
                  <div className="textContainer">
                    <p className="text-black flex flow-row space-x-1">
                      <span> {listing.city}</span>

                      <span>{listing.rent} Rs</span>
                    </p>
                  </div>
                </div>
              </Link>
            </Popup>
          </Marker>
        );
      })}
    </>
  );
}

export default Pin;
