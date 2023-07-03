import { useContext, useState } from 'react';
import Context from "../context"
import { Row, Col, Button, } from 'react-bootstrap';
import BasketProducts from '../components/Basket';
import { Link, useNavigate } from 'react-router-dom';
import { EmojiDizzyFill } from 'react-bootstrap-icons';


const Basket = () => {
	const { basketArr, setBasketArr } = useContext(Context)
	const [sumPrice, setSumPrice] = useState(0)
	const navigate = useNavigate()

	return (
		<Row className="basket" style={{ minWidth: "527px", gridColumnStart: "span 4", marginLeft: "10px", justifyContent: "center" }}>
			{basketArr.length > 0 && <>
				<Row className='align-items-center mb-2'>
					<Col xs={12} style={{ fontWeight: "700", fontSize: "18px", textAlign: "start" }}>Корзина</Col>
				</Row>

				<Row className='align-items-center'>
					<Col xs={1} style={{ fontWeight: "500", fontSize: "11px", minWidth: "80px" }}>Изображение</Col>
					<Col xs={2} style={{ fontWeight: "500", fontSize: "11px", textAlign: "center" }}>Наименование</Col>
					<Col xs={1} style={{ fontWeight: "500", fontSize: "11px", textAlign: "center" }}>На складе</Col>
					<Col xs={1} style={{ fontWeight: "500", fontSize: "11px", textAlign: "center" }}>Цена</Col>
					<Col xs={1} style={{ fontWeight: "500", fontSize: "11px", textAlign: "center" }}>Скидка</Col>
					<Col xs={1} style={{ fontWeight: "500", fontSize: "11px", textAlign: "center" }}>Цена со скидкой</Col>
					<Col xs={2} style={{ fontWeight: "500", fontSize: "11px", textAlign: "center" }}>Количество</Col>
					<Col xs={1} style={{ fontWeight: "500", fontSize: "11px", textAlign: "center" }}>Сумма</Col>
					<Col xs={1} style={{ fontWeight: "500", fontSize: "11px", textAlign: "center" }}>Удалить</Col>
				</Row>
				{
					basketArr.map(e => {
						return (
							<BasketProducts {...e} setSumPrice={setSumPrice} />
						)
					})
				}
				<Row className='align-items-center mt-2'>

					<Col xs={4} style={{ fontWeight: "700", fontSize: "18px", textAlign: "start" }}><Button size='sm' variant='danger' onClick={
						(e) => {
							setBasketArr([])
							navigate("/catalog")
						}
					}>Удалить все из корзины</Button></Col>
					<Col xs={4} style={{ fontWeight: "700", fontSize: "18px", textAlign: "center" }}>{`Итого ${sumPrice} р.`}</Col>
					<Col xs={4} style={{ fontWeight: "700", fontSize: "18px", textAlign: "end" }}><Button size='sm' variant='success'>Перейти к оформлению</Button></Col>
				</Row>
			</>}
			{basketArr?.length === 0 && <>
				<Row className='align-items-center mt-2'>
					<EmojiDizzyFill style={{ color: "brown", fontSize: "40px" }} />
					<h4 style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>В корзине пусто</h4>
					<Link to="/catalog" title='перейти в каталог' style={{ display: "flex", justifyContent: "center" }} >нажмите, чтобы перейти в каталог</Link>
				</Row>

			</>}
		</Row >
	);
}

export default Basket;
