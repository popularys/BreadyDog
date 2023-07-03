import "./style.css"
import React from 'react';

const Promo = (props) => {
	let classNameSize = "promoCard"
	if (props.size === "big") {
		classNameSize += " bigPromoCard"
	}
	else {
		classNameSize += " smallPromoCard"
	}
	return (
		<div className={classNameSize} >
			<div className="backgroundImg" style={{ backgroundImage: `URL(${props.bgImages})`, height: `${props.heightPromoCard}` }}>
				<div className="infoPromo">
					<h3 className="titlePromo">{props.title}</h3>
					<div className="bodyPromo" style={{ color: `${props.colorBody}`, fontSize: `${props.fontSizeBody}` }} >{props.body}</div>
				</div>
				<div className="promoImg" style={{ backgroundImage: `URL(${props.images})` }}>
				</div>
				<div className="footerPromo">{props.footer}</div>
			</div>
		</div >
	);
}

export default Promo;
