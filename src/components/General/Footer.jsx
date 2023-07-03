import { VK, TG } from "../../env"
import { Link } from "react-router-dom";
import pathIconVK from "../../assets/images/icons/vk.png"
import pathIconTG from "../../assets/images/icons/tg.png"

const Footer = ({ user }) => {
	return <footer>
		<div className="footerLink header__menu">
			{user && <>
				<Link to="/catalog" title="Каталог">
					<span>Каталог</span>
				</Link>&nbsp;
				<Link to="/" title="Избранное">
					<span>Избранное</span>
				</Link>&nbsp;
				<Link to="/" title="Корзина">
					<span>Корзина</span>
				</Link>&nbsp;
				<Link to="/profile" title="Профиль">
					<span>Профиль</span>
				</Link></>
			}
		</div>
		<div className="footerContact">
			<div className="tel"><Link to="tel:+79167779969">+7(916)7779969</Link></div>
			<div><Link to="mailto:info@breadydog.ru">info@breadydog.ru</Link></div>
			<div><Link to="#">г. Можайск, ул. Мира д. 12</Link></div>
		</div>
		<div className="footerInfo">
			СПАСИБО ОГРОМНОЕ ДИМЕ КИМУ ЗА ПОМОЩЬ!
			{/* @ Индивиуальный предприниматель<br />
			Ким Дмитрий Геннадьевич<br /> СПАСИБО ОГРОМНОЕ ДИМЕ КИМУ ЗА ПОМОЩЬ!
			ОГРНИП 317392600021067<br />
			ИНН 390407622970
			<div>
				<Link to={VK} target="_blank"><img width="25px" src={pathIconVK} alt="ВКонтакте" /></Link>
				<Link to={TG} target="_blank"><img width="28px" src={pathIconTG} alt="Телеграмм" /></Link>
			</div> */}
		</div>



	</footer>
}

export default Footer;