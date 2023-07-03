import Promo from "../components/Promo/Promo"
import { PROMOARR } from "../env"
import Card from "../components/Card"
import { useContext } from "react"
import Context from "../context"

const Main = () => {
	const { saleSrvProd, newSrvProd, discountSrvProd, dogToken } = useContext(Context)
	return (<>
		<Promo {...PROMOARR[0]} />
		{newSrvProd?.map((e, i) => {

			if (i < 8) {
				return <Card img={e.pictures} key={e._id} {...e} dogToken={dogToken} />
			}
		}

		)}
		<div className="promoGroup"><Promo {...PROMOARR[1]} />
			<Promo {...PROMOARR[2]} />
		</div>
		{discountSrvProd?.map((e, i) => {
			if (i < 12) {
				return <Card img={e.pictures} key={e._id} {...e} dogToken={dogToken} />
			}
		})}
	</>
	);
}
//
export default Main;
