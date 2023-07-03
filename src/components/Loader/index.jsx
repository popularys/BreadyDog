import { ArrowClockwise } from "react-bootstrap-icons";
import React from 'react';
import "./style.css"

const Loader = () => {
	return (
		<div className="loader">
			<span className="loader_image">
				<ArrowClockwise />
			</span>
			<h6>Загружаются данные...</h6>
		</div>
	);
}

export default Loader;
