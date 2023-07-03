import Card from "../components/Card";
import { useEffect, useState, useContext } from "react";
import Context from "../context"


const Favorites = () => {
	const { userId, serverProducts, setSrvProducts, dogToken } = useContext(Context)
	return <>
		{serverProducts?.filter(el => el.likes.includes(userId)).map(e =>
			<Card img={e.pictures} key={e._id} {...e} dogToken={dogToken} setSrvProducts={setSrvProducts} />
		)}
	</>
}

export default Favorites;