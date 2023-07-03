import './style.css';
import { Search } from 'react-bootstrap-icons';
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import Context from "../../context"
const SearchProd = () => {
	const navigate = useNavigate()
	const click = () => { navigate("/catalog") }
	const [text, setText] = useState("")
	const { products, setProducts, serverProducts } = useContext(Context)

	useEffect(() => {
		if (text) {
			let result = serverProducts.filter(e => e.name.toLowerCase().includes(text.toLowerCase()))
			setProducts(result);
		}
		else {
			setProducts(serverProducts)
		}
	}, [products]);

	const searchByText = (e) => {
		let val = e.target.value
		setText(val)
		let result = products.filter(e => e.name.toLowerCase().includes(val.toLowerCase()))
		setProducts(result);
	}
	return (
		<div className="search_block">
			<input className="input_search" type="search" placeholder='найти' value={text} onChange={searchByText} />
			<button className="btn_search" onClick={click}><Search /></button>
		</div>
	);
}

export default SearchProd;
