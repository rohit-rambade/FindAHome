import { Marker, Popup } from "react-leaflet";

import { Link } from "react-router-dom";

function Pin({ item }) {
  return (
    <Marker position={[16.28551111, 73.68446111]}>
      <Popup>
        <div className="popupContainer">
          {/* <img src={item.images[0]} alt="" /> */}
          <div className="textContainer">
            {/* <Link to={`/${item.id}`}>{item.title}</Link> */}
            <span> bedroom</span>
            <b>$ test</b>
          </div>
        </div>
      </Popup>
    </Marker>
  );
}

export default Pin;
