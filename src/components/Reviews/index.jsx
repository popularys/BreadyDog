import { useState, useEffect, useContext } from "react";
import { Row, Col, Form, Button, Card } from "react-bootstrap";
import Context from "../../context";
import ReviewsMap from "./ReviewsMap";
import { useParams } from "react-router-dom"


const ReviewsBlock = ({ product, setProduct }) => {
	const { dogToken } = useContext(Context)
	const [reviews, setReviews] = useState(product.reviews)
	const [textReviews, setTextReviews] = useState("")
	const [rate, setRate] = useState(5)
	const { id } = useParams()


	const textReview = (e) => {
		e.preventDefault()
		let val = e.target.value
		setTextReviews(val)
	}
	useEffect(() => {
		setReviews(product?.reviews)
	}, [product]);

	/* console.log(product.author._id); 
	console.log(product);
	console.log(dogToken);
	console.log(textReviews);
	console.log(reviews);*/


	const addReviews = async (e) => {
		e.preventDefault()
		if (textReviews.trim() !== "" && rate !== 0) {
			let body = { text: textReviews, rating: rate }

			let res = await fetch(`https://api.react-learning.ru/products/review/${id}`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						"Authorization": `Bearer ${dogToken}`
					},
					body: JSON.stringify(body)
				})
			let data = await res.json()
			setProduct(data)
			setTextReviews("")
			setRate(5)
			setReviews(data.reviews)
		}
		else {
			alert("Заполните поле отзыва, рейтинг не должен быть равен 0")
		}

	}

	return (
		<Row >
			{/* блок отзывов */}
			<Col xs={12} md={1}></Col>
			<Col xs={12} md={6}>
				<h3 className="d-flex justify-content-center justify-content-md-start" style={{ marginBottom: "20px" }}>Отзывы</h3>
				<Card style={{ padding: "0", marginBottom: "10px" }}>
					<Card.Header >Добавить отзыв</Card.Header>
					<Card.Body>
						<Form.Control as="textarea" rows={3} onChange={textReview} style={{ padding: "0", marginBottom: "10px" }} />
						<Form.Label >Поставьте рейтинг</Form.Label>
						<Row className="starRate d-flex justify-content-center">
							<Form.Control type="number" placeholder={5} value={rate} max={5} min={1} onChange={(e) => setRate(e.currentTarget.value)} />
						</Row>
						<Button variant="primary" onClick={addReviews}>Сохранить</Button>
					</Card.Body>
				</Card>
				<ReviewsMap reviews={reviews} product={product} setProduct={setProduct} />
			</Col>
		</Row >
	);
}

export default ReviewsBlock;
