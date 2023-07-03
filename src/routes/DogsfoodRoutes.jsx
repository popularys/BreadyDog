import { Routes, Route } from "react-router-dom"

import Main from "../pages/Main"
import Catalog from "../pages/Catalog"
import Profile from "../pages/Profile"
import Product from "../pages/Product"
import ModalProd from "../components/Modal/ModalEdit"
import Favorites from "../pages/Favorites"
import Basket from "../pages/Basket"


const DogfoodRoutes = ({ products, user, setUser, setSrvProducts }) => {
	return (
		<main>
			<div className="containerGrid">
				<Routes>
					<Route path="/" element={<Main />} />
					<Route path="/catalog" element={<Catalog products={products} setSrvProducts={setSrvProducts} />} />
					<Route path="/profile" element={<Profile />} />
					<Route path="/prod_edit" element={<ModalProd />} />
					<Route path="/add" element={<ModalProd />} />
					<Route path="/product/:id" element={<Product />} />
					<Route path="/favorites" element={<Favorites />} />
					<Route path="/basket" element={<Basket />} />
				</Routes>
			</div>
		</main >
	);
}

export default DogfoodRoutes;
