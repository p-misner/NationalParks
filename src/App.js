import * as React from "react";
import { Component } from "react";
import { render } from "react-dom";
import MapGL, {
  Popup,
  FlyToInterpolator,
  WebMercatorViewport,
  NavigationControl,
  Source,
  Layer,
} from "react-map-gl";
import Pins from "./Pins.js";
import Infobox from "./Infobox.js";
import StationaryBox from "./StationaryBox.js";
import CITIES from "../data/nationalparks.json";
import nav from "../style/nav.css";
import { dataLayer } from "./datastyle.js";
import { json as requestJson } from "d3-request";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoicG1pc25lciIsImEiOiJja2c3a2s1dXYwNWd1MzFvOGVmMmkzbGxmIn0.QDUppQ5yumFxlIrrAkRkIQ"; // Set your mapbox token here

export default class Root extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        latitude: 37,
        longitude: -118.4,
        zoom: 3,
        bearing: 0,
        pitch: 50,
      },
      hoverSettings: {
        doubleClickZoom: false,
        dragPan: false,
      },
      popupInfo: null,
      geojsondata: null,
    };

    this._map = React.createRef();

    this._onClickMarker = this._onClickMarker.bind(this);
    this.onClickMap = this.onClickMap.bind(this);
    // this.getGeo = this.getGeo.bind(this);
  }

  componentDidMount() {
    requestJson(
      "https://raw.githubusercontent.com/I1mran/National_Parks.Geo.JSON/master/US/Polygons/national_parks_polygons.geojson",
      (error, response) => {
        if (!error) {
          this._loadData(response);
        }
      }
    );
  }

  _loadData(d) {
    this.setState({
      geojsondata: d,
    });
  }

  _updateViewport(viewport) {
    this.setState({ viewport });
  }

  _onClickMarker(d) {
    this.setState({ popupInfo: d });
    // console.log(d);
    const [minLng, minLat, maxLng, maxLat] = [
      parseFloat(d.coordinates.longitude - 0.4),
      parseFloat(d.coordinates.latitude - 0.3),
      parseFloat(d.coordinates.longitude),
      parseFloat(d.coordinates.latitude + 0.3),
    ];
    const viewport = new WebMercatorViewport(this.state.viewport);
    const { longitude, latitude, zoom } = viewport.fitBounds(
      [
        [minLng, minLat],
        [maxLng, maxLat],
      ],
      {
        padding: 40,
      }
    );
    this.setState({
      viewport: {
        ...this.state.viewport,
        longitude,
        latitude,
        zoom,
        transitionInterpolator: new FlyToInterpolator({}),
        transitionDuration: 1000,
      },
    });
  }
  onClickMap(event) {
    console.log(`Lat: ${event.lngLat[1]}  Lng: ${event.lngLat[0]}`);
    // console.log(this.state.viewport.zoom);
    this.setState({ popupInfo: null });
  }

  _renderPopup() {
    const { popupInfo } = this.state;

    return (
      popupInfo && (
        <Popup
          tipSize={5}
          anchor="top"
          longitude={parseInt(popupInfo.coordinates.longitude)}
          latitude={parseInt(popupInfo.coordinates.latitude)}
          closeOnClick={false}
          onClose={() => this.setState({ popupInfo: null })}
        >
          <Infobox info={popupInfo} />
        </Popup>
      )
    );
  }

  getGeoJSON() {
    fetch("../data/maine.json")
      .then((response) => response.json())
      .then((jsonData) => {
        // jsonData is parsed json object received from url
        return jsonData;
      })
      .catch((error) => {
        // handle your errors here
        console.error(error);
      });
  }

  render() {
    // this.getGeoJSON();
    return (
      <div>
        <MapGL
          {...this.state.viewport}
          width="100vw"
          height="100vh"
          mapStyle="mapbox://styles/pmisner/ckh8nirdo1sng1bqdso2lzwle"
          // mapStyle="mapbox://styles/mapbox/terrain-v2"
          onViewportChange={(viewport) => this.setState({ viewport })}
          mapboxApiAccessToken={MAPBOX_TOKEN}
          onClick={this.onClickMap}
        >
          <Source type="geojson" data={this.state.geojsondata}>
            <Layer {...dataLayer} />
          </Source>
          <NavigationControl className={nav.control} />
          <Pins data={CITIES} onClick={this._onClickMarker} />
          <StationaryBox info={this.state.popupInfo} />
        </MapGL>
      </div>
    );
  }
}

document.body.style.margin = 0;
render(<Root />, document.body.appendChild(document.createElement("div")));
