import Logo from "./Logo"
import { Link } from "react-router-dom";
import {
	CardHeading,
	Star,
	Cart4,
	PersonSquare,
	BoxArrowInRight,
	FileEarmarkPlus
} from "react-bootstrap-icons";
import { useEffect, useState, useContext } from "react";
import Context from "../../context"


const Header = ({ user, setUser, setModalActive }) => {
	const [likeCnt, setLikeCnt] = useState(0);
	const [basketCnt, setBasketCnt] = useState(0);
	const { userId, serverProducts, basketArr } = useContext(Context)

	useEffect(() => {
		setLikeCnt(serverProducts?.filter(el => el.likes.includes(userId)).length)
	}, [serverProducts]);

	useEffect(() => {
		setBasketCnt(basketArr?.length)
	}, [basketArr]);

	const logIn = (e) => {
		e.preventDefault();
		setUser("dogUser")
		localStorage.setItem("dogUser", "userKey")
		setModalActive(true)
	}
	return <header>
		<Logo />
		<nav className="header__menu">
			{user && <>
				<Link to="/add" title="Каталог">
					<FileEarmarkPlus /> <span>Добавить</span>
				</Link>
				<Link to="/catalog" title="Каталог">
					<CardHeading /> <span>Каталог</span>
				</Link>
				<Link to="/favorites" title="Избранное" className="badge-el">
					<Star />
					<span className="badge-item">{likeCnt}</span>
				</Link>
				<Link to="/basket" title="Корзина" className="badge-el">
					<Cart4 />
					<span className="badge-item">{basketCnt}</span>
				</Link>
				<Link to="/profile" title="Профиль">
					<PersonSquare /> <span>Профиль</span>
				</Link>
			</>
			}
			{!user && <>
				<Link to="/profile" title="Войти" onClick={logIn}>
					<BoxArrowInRight /> <span>Войти</span>
				</Link></>
			}
		</nav>
	</header>
}

export default Header;
