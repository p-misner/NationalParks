import React, { Component } from "react";

import style from "../style/stationary.css";
export default class StationaryBox extends Component {
	render() {
		const { info } = this.props;
		if (info != null) {
			console.log(info);
			return (
				<div className={style.stationary} id="stationaryBox">
					<div className={style.content}>
						<h1>{info.title} National Park</h1>

						<div className={style.row}>
							<h3> Date Established </h3>
							<p>{info.date_established_readable}</p>
						</div>
						<div className={style.row}>
							<h3> Size </h3>
							<p>{info.area.acres} acres</p>
						</div>
						<div className={style.row}>
							<h3> Yearly Visitors </h3>
							<p>{info.visitors} people</p>
						</div>
						<p>{info.description}</p>
						<a
							href={info.nps_link}
							target="_blank"
							rel="noreferrer"
						>
							<button>Website</button>
						</a>
					</div>
				</div>
			);
		} else {
			return (
				<div className={style.stationary} id="stationaryBox">
					<div className={style.content}>
						<h1> US National Parks</h1>
						<p className={style.quote}>
							"National parks are the best idea we ever had.
							Absolutely American, absolutely democratic."
						</p>
						<p className={style.author}>- Walter Steg</p>
						<h3>History</h3>
						<p>
							By the Act of March 1, 1872, Congress established
							Yellowstone National Park "as a public park or
							pleasuring-ground for the benefit and enjoyment of
							the people." The founding of Yellowstone National
							Park began a worldwide national park movement.
						</p>
						<h3>Navigation</h3>
						<p>
							Explore the nation's 62 national parks through this
							interactive map. Click to switch between natioanl
							parks, zoom in to see both terrain and elevation
							details and pan to view the map from a different
							angle.{" "}
						</p>
						<h3>Data</h3>
						<p>Collected from the National Park Service website</p>
					</div>
				</div>
			);
		}
	}
}
