import Card from "../components/Card";
import { useContext, useState } from "react";
import Context from "../context";
import { Button, Nav } from "react-bootstrap";
const Catalog = ({ products }) => {
	const { dogToken, userId, setSrvProducts, serverProducts } = useContext(Context)
	const [origSrvProd, setOrigSrvProd] = useState(serverProducts)

	const myProds = () => {
		setOrigSrvProd(serverProducts)
		const arr = serverProducts.filter(el => el.author._id === userId)
		setSrvProducts(arr);
	}
	const AllProds = () => {
		setSrvProducts(origSrvProd);
	}

	return (
		<>
			<Nav style={{ gridColumn: "1/5" }}>
				<Button variant="outline-secondary" size="sm" className="m-1" onClick={myProds}>МОИ ТОВАРЫ</Button>
				<Button variant="outline-secondary" size="sm" className="m-1" onClick={AllProds}>ВСЕ ТОВАРЫ</Button>
			</Nav >

			{products?.map((e, i) => <Card img={e.pictures} key={e._id} {...e} dogToken={dogToken} setSrvProducts={setSrvProducts} />)}
		</>
	);
}

export default Catalog;
