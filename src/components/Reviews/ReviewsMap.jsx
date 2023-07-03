import { React, useContext } from 'react';
import { Star, StarFill } from "react-bootstrap-icons";
import { Row, Button, Card } from "react-bootstrap";
import Context from "../../context";

const ReviewsMap = ({ reviews, product, setProduct }) => {
	const { userId, dogToken } = useContext(Context)


	return (
		<Row className="d-flex justify-content-center justify-content-md-start" style={{ padding: "10px", marginBottom: "10px" }}>
			{reviews?.map((e) => {
				return (<Card key={e._id}>
					<Row style={{ margin: "3px" }}>
						{e.rating === 5 ? <Row className="starRate"><StarFill /><StarFill /><StarFill /><StarFill /><StarFill /></Row> :
							e.rating === 4 ? <Row className="starRate"><StarFill /><StarFill /><StarFill /><StarFill /><Star /></Row> :
								e.rating === 3 ? <Row className="starRate"><StarFill /><StarFill /><StarFill /><Star /><Star /></Row> :
									e.rating === 2 ? <Row className="starRate"><StarFill /><StarFill /><Star /><Star /><Star /></Row> :
										e.rating === 1 ? <Row className="starRate"><StarFill /><Star /><Star /><Star /><Star /></Row> :
											<Row className="starRate"><Star /><Star /><Star /><Star /><Star /></Row>
						}
					</Row>
					<Row className="starAuthor" style={{ margin: "3px" }}>
						{e.author.name}&nbsp;&nbsp;&nbsp; от &nbsp;
						{e.updated_at.split("T")[0]}
					</Row >
					<Row style={{ margin: "3px" }}>
						{e.text}
					</Row>
					{e.author._id === userId &&
						<Button variant="danger" onClick={async (el) => {
							el.preventDefault()
							let res = await fetch(`https://api.react-learning.ru/products/review/${product._id}/${e._id}`,
								{
									method: "DELETE",
									headers: {
										"Content-Type": "application/json",
										"Authorization": `Bearer ${dogToken}`
									}
								})
							let data = await res.json()
							setProduct(data)
						}}>Удалить</Button>
					}
				</Card>)
			}
			)}
		</Row>
	);
}

export default ReviewsMap;
