import React, { useContext, useEffect, useState } from 'react';
import Context from "../../context"
import { Col, Row } from 'react-bootstrap';
import { XCircleFill } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';

const BasketProducts = ({ stockinBasket, _id, img, name, stock, price, discount, setSumPrice }) => {
	const { basketArr, setBasketArr } = useContext(Context)
	const [stockIn, setStockIn] = useState(stockinBasket)

	useEffect(() => {
		setSumPrice(0)
		basketArr?.map(e => {
			if (e.discount > 0) {
				setSumPrice((old) => (old + (e?.price * (100 - e.discount) / 100) * e.stockinBasket));
			}
			else {
				setSumPrice((old) => (old + (e?.price * e.stockinBasket)))
			}
		})
	}, [basketArr, stockIn]);

	return (

		<Row className='align-items-center' key={_id}>

			<Col xs={1} style={{ minWidth: "80px" }}><Link title='перейти в карточку продукта' to={`/product/${_id}`}> <img width="60px" src={img} alt='фото продукции' /></Link></Col>
			<Col xs={2} style={{ fontSize: "12px", textAlign: "center" }}><Link title='перейти в карточку продукта' style={{ color: "purple" }} to={`/product/${_id}`}>{name}</Link> </Col>
			<Col xs={1} style={{ fontSize: "12px", textAlign: "center" }}>{stock}</Col>
			<Col xs={1} style={{ fontSize: "12px", textAlign: "center" }}>{price}</Col>
			<Col xs={1} style={{ fontSize: "12px", textAlign: "center" }}>{discount}%</Col>
			<Col xs={1} style={{ fontSize: "12px", textAlign: "center" }}>{(price * (100 - discount)) / 100}</Col>
			<Col xs={2} style={{ fontSize: "12px", textAlign: "center" }}>
				<input type='number' style={{ width: "50px" }} value={stockIn}
					onChange={(y) => {
						if (stock >= parseInt(y.currentTarget.value) && y.currentTarget.value > 0) {
							setStockIn(parseInt(y.currentTarget.value))
							basketArr.map(x => {
								if (x._id === _id) {
									x.stockinBasket = parseInt(y.currentTarget.value)
								}
							})
						}
						else {
							setStockIn(1)
						}
					}} />
			</Col>
			<Col xs={1} style={{ fontSize: "12px", textAlign: "center" }}>{stockinBasket}</Col>
			<Col xs={1} style={{ fontSize: "16px", color: "crimson", textAlign: "center" }}><XCircleFill style={{ cursor: "pointer" }} onClick={
				x => {
					x.preventDefault()
					x.stopPropagation()
					setBasketArr(old => old.filter(y => y._id !== _id))
				}
			} /></Col>

		</Row>
	);
}

export default BasketProducts;
