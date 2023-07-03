import { Link } from "react-router-dom";
import { BoxArrowInLeft } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import Context from "../context";



const Profile = () => {
	const navigate = useNavigate();
	const { setDogToken,
		user,
		setUser,
		setUserId,
		setDiscountSrvProd,
		setNewSrvProd,
		setSaleSrvProd } = useContext(Context)
	const logOut = (e) => {
		e.preventDefault();
		setUser("")
		localStorage.removeItem("dogUser")
		setUserId("")
		localStorage.removeItem("dogUserId")
		setDogToken("")
		localStorage.removeItem("dogToken")
		setDiscountSrvProd([])
		localStorage.removeItem("discountProducts")
		setNewSrvProd([])
		localStorage.removeItem("newProducts")
		setSaleSrvProd([])
		localStorage.removeItem("saleProducts")
		navigate("/")
	}
	return (<div className="profile">
		<h1>
			Добро пожаловать,&nbsp;{user}!
		</h1>
		<Link to="/" title="Выйти" onClick={logOut}>
			<BoxArrowInLeft /> <span>Выйти</span>
		</Link>
	</div>
	);
}

export default Profile;
