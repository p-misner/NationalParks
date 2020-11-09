import React, { Component } from "react";
import style from "./style.css";
export default class Infobox extends Component {
	render() {
		const { info } = this.props;
		return (
			<div className={style.box}>
				<h1>{info.title} National Park</h1>
				<a href={info.nps_link}>Website</a>
				<p>{info.description}</p>
			</div>
		);
	}
}
